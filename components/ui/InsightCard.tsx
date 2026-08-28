"use client";

import { motion } from "framer-motion";
import type { Insight } from "@/lib/types";

export default function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className={`group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border2)] ${
        insight.featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent),var(--accent2))] transition-transform duration-500 group-hover:scale-x-100" />
      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--accent)]">
        {insight.featured ? `FEATURED · ${insight.category}` : insight.category}
      </span>
      <h3
        className={`font-[family-name:var(--font-heading)] font-bold leading-snug text-white ${
          insight.featured ? "text-[24px]" : "text-[17px]"
        }`}
      >
        {insight.title}
      </h3>
      <p className="text-[13.5px] font-light leading-[1.7] text-[var(--text2)]">{insight.excerpt}</p>
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--text3)]">
        {insight.source} · {insight.date} · {insight.readTime}
      </span>
    </motion.article>
  );
}
