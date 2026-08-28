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
    <div
      ref={ref}
      className="flex flex-col gap-2 bg-[rgba(7,9,26,0.92)] px-5 py-[18px] backdrop-blur-[8px]"
    >
      <span className="font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.15em] text-[var(--metric-label)]">
        {metric.label}
      </span>
      <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-[-0.8px] text-[var(--metric-value)]">
        {metric.prefix}
        {formatted}
        {metric.suffix}
      </span>
      <span className="text-[10.5px] text-[var(--metric-sub)]">{metric.sub}</span>
    </div>
  );
}
