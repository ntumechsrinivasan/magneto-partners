"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import type { Industry } from "@/lib/types";

export default function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      className="group flex flex-col gap-3 border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-[var(--border2)] hover:shadow-[0_12px_28px_rgba(23,20,15,0.06)]"
    >
      <Icon name={industry.icon} className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.6} />
      <h3 className="font-[family-name:var(--font-heading)] text-[16px] font-medium text-[var(--ink)]">
        {industry.name}
      </h3>
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
        {industry.cagr}
      </span>
      <div className="flex h-7 items-end gap-[3px]">
        {industry.bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[1px] bg-[var(--accent)] opacity-30 transition-opacity duration-500 group-hover:opacity-90"
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>
      <p className="text-[12px] font-light leading-[1.6] text-[var(--text2)]">
        {industry.description}
      </p>
    </motion.div>
  );
}
