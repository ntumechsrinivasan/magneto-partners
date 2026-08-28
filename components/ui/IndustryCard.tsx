"use client";

import { motion } from "framer-motion";
import type { Industry } from "@/lib/types";

export default function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-[11px] border border-[var(--border)] p-5 transition-all duration-300 hover:-translate-y-[3px] hover:border-[var(--border2)]"
    >
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[linear-gradient(90deg,var(--accent),var(--accent2))] transition-all duration-500 group-hover:w-full" />
      <div className="text-2xl">{industry.icon}</div>
      <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-white">
        {industry.name}
      </h3>
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--accent3)]">
        {industry.cagr}
      </span>
      <div className="flex h-7 items-end gap-[3px]">
        {industry.bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-[linear-gradient(180deg,var(--accent),var(--accent2))] opacity-40 transition-all duration-500 group-hover:opacity-100"
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>
      <p className="text-[11.5px] font-light leading-[1.6] text-[var(--text2)]">{industry.description}</p>
    </motion.div>
  );
}
