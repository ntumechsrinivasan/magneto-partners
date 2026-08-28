"use client";

import { motion } from "framer-motion";
import type { NarrativePillar as NarrativePillarData } from "@/lib/types";

export default function NarrativePillar({
  pillar,
  index,
}: {
  pillar: NarrativePillarData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col gap-4"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        {pillar.eyebrow}
      </span>
      <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-medium leading-[1.25] tracking-[-0.3px] text-[var(--ink)]">
        {pillar.headline}
      </h3>
      <p className="text-[14px] font-light leading-[1.7] text-[var(--text2)]">{pillar.copy}</p>
    </motion.div>
  );
}
