"use client";

import { useEffect, useRef, useState } from "react";

const W = 560;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const SX = 190;
const SY = 150;
const HC = 0.62;
const A = 0.3;
const BS = 1.0;

function branch(sign: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 220; i++) {
    const h = -1.6 + (3.2 * i) / 220;
    const b = BS * Math.tanh((h + sign * HC) / A);
    pts.push(`${(CX + (h * SX) / 1.6).toFixed(1)} ${(CY - b * SY).toFixed(1)}`);
  }
  return pts;
}

const UPPER = `M ${branch(1).join(" L ")}`;
const LOWER = `M ${branch(-1).reverse().join(" L ")}`;
const BR_Y = CY - BS * Math.tanh(HC / A) * SY;
const HC_X = CX - (HC * SX) / 1.6;

/**
 * The demagnetisation curve, drawn as the section scrolls through. The second
 * quadrant is shaded because that is the part a magnet actually operates in.
 */
export default function Hysteresis() {
  const secRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<SVGPathElement>(null);
  const loRef = useRef<SVGPathElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const sec = secRef.current;
    const up = upRef.current;
    const lo = loRef.current;
    if (!sec || !up || !lo) return;

    const lU = up.getTotalLength();
    const lL = lo.getTotalLength();
    up.style.strokeDasharray = String(lU);
    lo.style.strokeDasharray = String(lL);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      up.style.strokeDashoffset = "0";
      lo.style.strokeDashoffset = "0";
      const id = requestAnimationFrame(() => setT(1));
      return () => cancelAnimationFrame(id);
    }

    up.style.strokeDashoffset = String(lU);
    lo.style.strokeDashoffset = String(lL);

    let ticking = false;
    const draw = () => {
      const r = sec.getBoundingClientRect();
      const raw =
        (window.innerHeight - r.top) / (window.innerHeight * 0.55 + r.height * 0.5);
      const p = Math.max(0, Math.min(1, raw));
      up.style.strokeDashoffset = String(lU * (1 - Math.min(1, p / 0.62)));
      lo.style.strokeDashoffset = String(lL * (1 - Math.max(0, Math.min(1, (p - 0.28) / 0.55))));
      setT(p);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(draw);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    draw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const grid: React.ReactNode[] = [];
  for (let g = -1.5; g <= 1.51; g += 0.5) {
    grid.push(
      <line
        key={`v${g}`}
        x1={CX + (g * SX) / 1.6}
        y1={30}
        x2={CX + (g * SX) / 1.6}
        y2={H - 30}
        stroke="rgba(138,160,196,0.07)"
      />,
    );
  }
  for (let g = -1; g <= 1.01; g += 0.5) {
    grid.push(
      <line
        key={`h${g}`}
        x1={30}
        y1={CY - g * SY}
        x2={W - 30}
        y2={CY - g * SY}
        stroke="rgba(138,160,196,0.07)"
      />,
    );
  }

  const note = (on: boolean) =>
    `transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={secRef}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label="Magnetic hysteresis loop showing remanence, coercivity and the second-quadrant demagnetisation curve"
      >
        {grid}
        <rect x={CX - SX} y={CY - SY - 6} width={SX} height={SY + 6} fill="rgba(148,105,254,0.055)" />
        <line x1={30} y1={CY} x2={W - 30} y2={CY} stroke="rgba(138,160,196,0.3)" />
        <line x1={CX} y1={30} x2={CX} y2={H - 30} stroke="rgba(138,160,196,0.3)" />
        <path ref={upRef} d={UPPER} fill="none" stroke="#9469FE" strokeWidth={2} />
        <path ref={loRef} d={LOWER} fill="none" stroke="#9469FE" strokeWidth={2} opacity={0.42} />

        <g className={note(t > 0.42)}>
          <circle cx={CX} cy={BR_Y} r={3.5} fill="#E8ECF4" />
          <text x={CX + 12} y={BR_Y - 10} fill="#E8ECF4" fontSize={12} className="mono">
            Br
          </text>
        </g>
        <g className={note(t > 0.55)}>
          <circle cx={HC_X} cy={CY} r={3.5} fill="#E8ECF4" />
          <text x={HC_X - 34} y={CY + 22} fill="#E8ECF4" fontSize={12} className="mono">
            Hc
          </text>
        </g>
        <g className={note(t > 0.68)}>
          <text x={CX - SX + 12} y={CY - 22} fill="#9469FE" fontSize={11} letterSpacing={1.4}>
            BH MAX
          </text>
          <text x={CX - SX + 12} y={CY - 6} fill="#7B879C" fontSize={9.5} letterSpacing={1.2}>
            2ND QUADRANT
          </text>
        </g>

        <text x={W - 34} y={CY - 12} textAnchor="end" fill="#4A5569" fontSize={10} letterSpacing={1.2}>
          H (kA/m)
        </text>
        <text x={CX + 12} y={42} fill="#4A5569" fontSize={10} letterSpacing={1.2}>
          B (T)
        </text>
      </svg>
    </div>
  );
}
