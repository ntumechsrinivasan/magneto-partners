"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "@/lib/types";

interface MetricBlockProps {
  metric: Metric;
  delay?: number;
}

export default function MetricBlock({ metric, delay = 0 }: MetricBlockProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const timeout = setTimeout(() => {
            const steps = 60;
            const duration = 1400;
            let step = 0;
            const interval = setInterval(() => {
              step += 1;
              const progress = step / steps;
              setDisplay(metric.value * Math.min(progress, 1));
              if (step >= steps) clearInterval(interval);
            }, duration / steps);
          }, delay);
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, metric.value]);

  const formatted =
    metric.decimals !== undefined ? display.toFixed(metric.decimals) : Math.round(display).toString();

  return (
    <div ref={ref} className="flex flex-col gap-1.5 py-4 sm:px-6 sm:py-0">
      <span className="font-[family-name:var(--font-heading)] text-[30px] font-medium tracking-[-0.5px] text-[var(--ink)]">
        {metric.prefix}
        {formatted}
        {metric.suffix}
      </span>
      <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--text2)]">
        {metric.label}
      </span>
      <span className="text-[12px] text-[var(--accent)]">{metric.sub}</span>
    </div>
  );
}
