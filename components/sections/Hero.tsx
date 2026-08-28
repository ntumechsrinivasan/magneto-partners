"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import MetricBlock from "@/components/ui/MetricBlock";
import { HERO_METRICS } from "@/lib/constants";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-62px)] items-center overflow-hidden">
      <div className="hero-grid-bg absolute inset-0" />
      <HeroCanvas />

      {[
        "left-6 top-6 border-l border-t",
        "right-6 top-6 border-r border-t",
        "left-6 bottom-6 border-l border-b",
        "right-6 bottom-6 border-r border-b",
      ].map((pos) => (
        <div key={pos} className={`absolute h-5 w-5 border-[var(--accent)]/40 ${pos}`} />
      ))}

      <div className="scan-line absolute inset-x-0" />

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-7 px-6 py-24 text-center">
        <motion.span
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,184,255,0.18)] bg-[rgba(0,184,255,0.05)] px-4 py-[6px] font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.15em] text-[var(--accent)]"
        >
          <span className="pulse-dot h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
          Strategic Materials Intelligence Platform
        </motion.span>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[clamp(32px,5.5vw,68px)] font-extrabold leading-[1.04] tracking-[-2.5px] text-white"
        >
          Engineering the Future of
          <br />
          <span className="gradient-shimmer">Strategic Magnet Intelligence</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-[560px] text-base font-light leading-[1.72] text-[var(--text2)]"
        >
          Helping global industries navigate rare-earth magnet sourcing, materials strategy,
          supply-chain geopolitics, and industrial AI.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-[10px]"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-[6px] bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] px-[22px] py-[13px] font-[family-name:var(--font-heading)] text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,184,255,0.25)]"
          >
            Explore Solutions
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[6px] border border-[var(--border2)] bg-transparent px-[22px] py-[13px] font-[family-name:var(--font-heading)] text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            Speak to an Expert
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="grid w-full max-w-[820px] grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-[var(--border)] sm:grid-cols-4"
        >
          {HERO_METRICS.map((metric, i) => (
            <MetricBlock key={metric.label} metric={metric} delay={i * 120} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
