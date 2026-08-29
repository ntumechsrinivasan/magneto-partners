"use client";

import { useEffect, useRef } from "react";

interface Vec {
  x: number;
  y: number;
}

/**
 * Continuous dipole streamlines rather than a grid of dashes: fewer, longer,
 * quieter marks, erased back on the left so the headline sits on clean ground.
 * The cursor acts as an opposing pole, so the field bends as you move.
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
    const RINGS = [24, 44, 70, 104, 148];
    const SPOKES = 6;
    const STEP = 6;
    const MAXSTEP = 340;

    let W = 0;
    let H = 0;
    let raf = 0;
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
    }

    function poles() {
      return { mx: W * 0.72, my: H * 0.47, ux: 1, uy: 0, s: Math.min(W, H) * 34 };
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
      if (mouse.on > 0.01) addDipole(x, y, mouse.tx, mouse.ty, -p.s * 0.5 * mouse.on, 0, o);
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
        if (x < -260 || x > W + 260 || y < -260 || y > H + 260) break;
        pts.push(x, y);
      }
      return pts;
    }

    function paint(progress: number) {
      const g = ctx!;
      g.clearRect(0, 0, W, H);
      const p = poles();
      g.lineCap = "round";
      g.lineJoin = "round";

      for (let ri = 0; ri < RINGS.length; ri++) {
        const alpha = (0.3 - ri * 0.045) * progress;
        if (alpha <= 0) continue;
        g.strokeStyle = `rgba(148,105,254,${alpha.toFixed(3)})`;
        g.lineWidth = ri < 2 ? 1.05 : 0.85;
        for (let si = 0; si < SPOKES; si++) {
          const ang = ((si + 0.5) / SPOKES) * Math.PI * 2;
          const pts = trace(p.mx + Math.cos(ang) * RINGS[ri], p.my + Math.sin(ang) * RINGS[ri]);
          const n = Math.floor((pts.length / 2) * progress);
          if (n < 2) continue;
          g.beginPath();
          g.moveTo(pts[0], pts[1]);
          for (let k = 1; k < n; k++) g.lineTo(pts[k * 2], pts[k * 2 + 1]);
          g.stroke();
        }
      }

      // The twin poles themselves
      const bw = 92;
      const bh = 13;
      g.globalAlpha = progress;
      g.fillStyle = "#E8ECF4";
      g.fillRect(p.mx - bw / 2, p.my - bh / 2, bw / 2 - 1, bh);
      g.fillStyle = "#9469FE";
      g.fillRect(p.mx + 1, p.my - bh / 2, bw / 2 - 1, bh);
      g.font = "500 10px var(--font-jetbrains), ui-monospace, monospace";
      g.fillStyle = "#4A5569";
      g.textAlign = "center";
      g.fillText("S", p.mx - bw / 2 - 13, p.my + 4);
      g.fillText("N", p.mx + bw / 2 + 13, p.my + 4);
      g.globalAlpha = 1;

      // Erase the left side so the headline never fights the field
      const grad = g.createLinearGradient(0, 0, W * 0.62, 0);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(0.55, "rgba(0,0,0,0.92)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.globalCompositeOperation = "destination-out";
      g.fillStyle = grad;
      g.fillRect(0, 0, W * 0.62, H);
      g.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      const boot = Math.min(1, (now - born) / 2200);
      mouse.on += ((mouse.want ? 1 : 0) - mouse.on) * 0.06;
      mouse.tx += (mouse.x - mouse.tx) * 0.12;
      mouse.ty += (mouse.y - mouse.ty) * 0.12;
      paint(1 - Math.pow(1 - boot, 3));
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
      if (reduce) paint(1);
    }

    size();
    if (reduce) {
      paint(1);
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
