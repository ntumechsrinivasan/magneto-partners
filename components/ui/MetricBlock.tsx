"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "@/lib/types";

interface MetricBlockProps {
  metric: Metric;
  delay?: number;
  index?: number;
}

export default function MetricBlock({ metric, delay = 0, index = 0 }: MetricBlockProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred a frame: setting state synchronously in an effect body would
      // cascade a render, and the value is identical either way.
      const id = requestAnimationFrame(() => setDisplay(metric.value));
      return () => cancelAnimationFrame(id);
    }

    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const run = () => {
      if (started.current) return;
      started.current = true;
      timeout = setTimeout(() => {
        const steps = 58;
        let step = 0;
        interval = setInterval(() => {
          step += 1;
          const k = Math.min(step / steps, 1);
          setDisplay(metric.value * (1 - Math.pow(1 - k, 3)));
          if (step >= steps) clearInterval(interval);
        }, 1500 / steps);
      }, delay + 200);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    // A hero metric is on screen at load; fire regardless of observer timing.
    if (el.getBoundingClientRect().top < window.innerHeight) run();

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay, metric.value]);

  const formatted =
    metric.decimals !== undefined
      ? display.toFixed(metric.decimals)
      : Math.round(display).toString();

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 border-[var(--line)] px-0 py-[26px] sm:px-7 ${
        index > 0 ? "sm:border-l" : ""
      } ${index >= 2 ? "border-t sm:border-t-0" : ""}`}
    >
      <span className="mono text-[var(--dim)]">{metric.label}</span>
      <span className="display num text-[36px] font-bold">
        {metric.prefix}
        {formatted}
        {metric.suffix}
      </span>
      <span className="text-[16.5px] text-[var(--mute)]">
        {metric.sub}
      </span>
    </div>
  );
}
