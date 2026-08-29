"use client";

import { useEffect, useRef } from "react";

interface Vec {
  x: number;
  y: number;
}

/**
 * The dipole field, drawn as continuous streamlines with flux running along
 * them. The cursor acts as an opposing pole, so the whole field bends as you
 * move across it.
 *
 * Tracing 70-odd streamlines through the field integral is far too expensive
 * to redo every frame, but it only needs redoing when the field itself
 * changes — that is, while the cursor is moving or the opening sweep is still
 * running. So geometry is cached and re-traced on demand, and each frame only
 * repaints it and advances the travelling flux pulses. That is what buys the
 * density: the line count is limited by how much we can draw, not by how much
 * we can solve.
 */
export default function FieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Eight shells, nine spokes each: dense enough near the poles to read as
    // a field rather than as a diagram, thinning out toward the edges.
    const RINGS = [20, 31, 45, 63, 85, 112, 145, 184];
    const SPOKES = 9;
    const STEP = 7;
    const MAXSTEP = 300;
    const PULSE_LEN = 34; // points of polyline lit per travelling pulse

    let W = 0;
    let H = 0;
    let raf = 0;
    let lines: Float32Array[] = [];
    let dirty = true;
    const born = performance.now();
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, on: 0, want: 0 };

    function size() {
      const host = cv!.parentElement;
      const r = host ? host.getBoundingClientRect() : { width: 0, height: 0 };
      W = r.width;
      H = r.height;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    }

    function poles() {
      // Sits right of centre and scales with the viewport, so the field reads
      // as one large object rather than a motif parked in the corner.
      return { mx: W * 0.76, my: H * 0.52, ux: 1, uy: 0, s: Math.min(W, H) * 46 };
    }

    function addDipole(x: number, y: number, mx: number, my: number, ux: number, uy: number, o: Vec) {
      const rx = x - mx;
      const ry = y - my;
      let r2 = rx * rx + ry * ry;
      if (r2 < 300) r2 = 300;
      const r = Math.sqrt(r2);
      const r5 = r2 * r2 * r;
      const r3 = r2 * r;
      const dot = ux * rx + uy * ry;
      o.x += (3 * rx * dot) / r5 - ux / r3;
      o.y += (3 * ry * dot) / r5 - uy / r3;
    }

    const tmp: Vec = { x: 0, y: 0 };
    function fieldAt(x: number, y: number, o: Vec) {
      const p = poles();
      o.x = 0;
      o.y = 0;
      addDipole(x, y, p.mx, p.my, p.ux * p.s, p.uy * p.s, o);
      if (mouse.on > 0.01) addDipole(x, y, mouse.tx, mouse.ty, -p.s * 0.55 * mouse.on, 0, o);
      return o;
    }

    function trace(sx: number, sy: number) {
      const pts: number[] = [sx, sy];
      let x = sx;
      let y = sy;
      for (let k = 0; k < MAXSTEP; k++) {
        fieldAt(x, y, tmp);
        const m = Math.sqrt(tmp.x * tmp.x + tmp.y * tmp.y);
        if (!m || !isFinite(m)) break;
        x += (tmp.x / m) * STEP;
        y += (tmp.y / m) * STEP;
        if (x < -300 || x > W + 300 || y < -300 || y > H + 300) break;
        pts.push(x, y);
      }
      return Float32Array.from(pts);
    }

    function retrace() {
      const p = poles();
      const out: Float32Array[] = [];
      for (let ri = 0; ri < RINGS.length; ri++) {
        for (let si = 0; si < SPOKES; si++) {
          // Half-step each shell so the spokes interleave instead of forming
          // visible radial spikes through the whole field.
          const ang = ((si + (ri % 2 ? 0.5 : 0)) / SPOKES) * Math.PI * 2;
          out.push(trace(p.mx + Math.cos(ang) * RINGS[ri], p.my + Math.sin(ang) * RINGS[ri]));
        }
      }
      lines = out;
      dirty = false;
    }

    function paint(progress: number, phase: number) {
      const g = ctx!;
      g.clearRect(0, 0, W, H);
      const p = poles();
      g.lineCap = "round";
      g.lineJoin = "round";

      // Halo: the field is brightest where the flux density is highest.
      const halo = g.createRadialGradient(p.mx, p.my, 0, p.mx, p.my, Math.min(W, H) * 0.52);
      halo.addColorStop(0, `rgba(148,105,254,${(0.19 * progress).toFixed(3)})`);
      halo.addColorStop(0.45, `rgba(148,105,254,${(0.05 * progress).toFixed(3)})`);
      halo.addColorStop(1, "rgba(148,105,254,0)");
      g.fillStyle = halo;
      g.fillRect(0, 0, W, H);

      // Standing field
      for (let i = 0; i < lines.length; i++) {
        const pts = lines[i];
        const n = pts.length >> 1;
        if (n < 2) continue;
        const shell = Math.floor(i / SPOKES);
        const alpha = (0.42 - shell * 0.034) * progress;
        if (alpha <= 0.005) continue;
        // Lavender-white rather than saturated violet: the plate behind the
        // hero gives the lines something to compete with, and a near-white
        // stroke separates from a photograph where the brand violet does not.
        g.strokeStyle = `rgba(214,206,255,${alpha.toFixed(3)})`;
        g.lineWidth = shell < 3 ? 1.15 : 0.8;
        const drawn = Math.floor(n * progress);
        if (drawn < 2) continue;
        g.beginPath();
        g.moveTo(pts[0], pts[1]);
        for (let k = 1; k < drawn; k++) g.lineTo(pts[k * 2], pts[k * 2 + 1]);
        g.stroke();
      }

      // Flux travelling along the lines. Additive so overlapping pulses build
      // brightness where the field crowds together, the way flux actually does.
      if (progress > 0.5) {
        g.globalCompositeOperation = "lighter";
        g.lineCap = "butt";
        for (let i = 0; i < lines.length; i++) {
          const pts = lines[i];
          const n = pts.length >> 1;
          if (n < PULSE_LEN + 4) continue;
          const shell = Math.floor(i / SPOKES);
          // Offsetting by index keeps the pulses from marching in lockstep.
          const t = (phase + (i % SPOKES) / SPOKES + shell * 0.17) % 1;
          const head = Math.floor(t * (n - 1));
          const tail = Math.max(0, head - PULSE_LEN);
          const bright = (0.5 - shell * 0.045) * (progress - 0.5) * 2;
          if (bright <= 0.01) continue;
          for (let k = tail + 1; k < head; k++) {
            // Fade in along the pulse so it reads as a comet, not a dash.
            const f = (k - tail) / PULSE_LEN;
            g.strokeStyle = `rgba(240,238,255,${(bright * f * f).toFixed(3)})`;
            g.lineWidth = 1.5 * f + 0.4;
            g.beginPath();
            g.moveTo(pts[(k - 1) * 2], pts[(k - 1) * 2 + 1]);
            g.lineTo(pts[k * 2], pts[k * 2 + 1]);
            g.stroke();
          }
        }
        g.globalCompositeOperation = "source-over";
        g.lineCap = "round";
      }

      // The twin poles themselves
      const bw = 128;
      const bh = 17;
      g.globalAlpha = progress;
      const core = g.createRadialGradient(p.mx, p.my, 0, p.mx, p.my, bw);
      core.addColorStop(0, "rgba(148,105,254,0.32)");
      core.addColorStop(1, "rgba(148,105,254,0)");
      g.fillStyle = core;
      g.fillRect(p.mx - bw, p.my - bw, bw * 2, bw * 2);
      g.fillStyle = "#E8ECF4";
      g.fillRect(p.mx - bw / 2, p.my - bh / 2, bw / 2 - 1.5, bh);
      g.fillStyle = "#9469FE";
      g.fillRect(p.mx + 1.5, p.my - bh / 2, bw / 2 - 1.5, bh);
      g.font = "500 12px var(--font-jetbrains), ui-monospace, monospace";
      g.fillStyle = "#7B879C";
      g.textAlign = "center";
      g.fillText("S", p.mx - bw / 2 - 16, p.my + 4.5);
      g.fillText("N", p.mx + bw / 2 + 16, p.my + 4.5);
      g.globalAlpha = 1;

      // Hold the field back off the headline. Softer than a hard wipe, so the
      // lines still read faintly behind the type rather than stopping dead.
      const grad = g.createLinearGradient(0, 0, W * 0.52, 0);
      grad.addColorStop(0, "rgba(0,0,0,0.94)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.78)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.globalCompositeOperation = "destination-out";
      g.fillStyle = grad;
      g.fillRect(0, 0, W * 0.52, H);
      g.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      const boot = Math.min(1, (now - born) / 2400);
      const prevOn = mouse.on;
      mouse.on += ((mouse.want ? 1 : 0) - mouse.on) * 0.06;
      const px = mouse.tx;
      const py = mouse.ty;
      mouse.tx += (mouse.x - mouse.tx) * 0.12;
      mouse.ty += (mouse.y - mouse.ty) * 0.12;

      // Re-solve only while the field is actually moving.
      if (
        boot < 1 ||
        Math.abs(mouse.on - prevOn) > 0.001 ||
        Math.abs(mouse.tx - px) > 0.4 ||
        Math.abs(mouse.ty - py) > 0.4
      ) {
        dirty = true;
      }
      if (dirty) retrace();

      paint(1 - Math.pow(1 - boot, 3), (now / 7000) % 1);
      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const r = cv!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (mouse.want !== 1) {
        mouse.tx = x;
        mouse.ty = y;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.want = x > 0 && x < W && y > 0 && y < H ? 1 : 0;
    }
    function onLeave() {
      mouse.want = 0;
    }
    function onResize() {
      size();
      if (reduce) {
        retrace();
        paint(1, 0);
      }
    }

    size();
    if (reduce) {
      retrace();
      paint(1, 0);
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
      cv.parentElement?.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      cv.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-[1] h-full w-full" aria-hidden="true" />;
}
