"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MetricBlock from "@/components/ui/MetricBlock";
import SectionTag from "@/components/ui/SectionTag";
import FieldLines from "./FieldLines";
import { HERO_METRICS } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-7">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0 }}>
            <SectionTag>Strategic Materials Advisory</SectionTag>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(34px,5vw,58px)] font-medium leading-[1.08] tracking-[-1.2px] text-[var(--ink)]"
          >
            The magnets behind
            <br />
            <span className="italic text-[var(--accent)]">what moves the world.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[480px] text-[17px] font-light leading-[1.7] text-[var(--text2)]"
          >
            Helping global industries navigate rare-earth magnet sourcing, materials strategy,
            supply-chain geopolitics, and industrial AI — with direct counsel from one of India&apos;s
            foremost authorities on permanent magnets.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-7"
          >
            <Button href="/services" showArrow>
              Explore Solutions
            </Button>
            <Button href="/contact" variant="ghost">
              Speak to an Expert
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 grid grid-cols-2 divide-x divide-y divide-[var(--border)] border-y border-[var(--border)] sm:grid-cols-4 sm:divide-y-0"
          >
            {HERO_METRICS.map((metric, i) => (
              <MetricBlock key={metric.label} metric={metric} delay={i * 120} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto hidden w-full max-w-[420px] lg:block"
        >
          <FieldLines />
        </motion.div>
      </div>
    </section>
  );
}
