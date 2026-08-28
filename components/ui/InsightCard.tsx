"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/types";

export default function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      className={`group flex cursor-pointer flex-col gap-4 border-t border-[var(--border2)] pt-7 transition-colors duration-300 ${
        insight.featured ? "sm:col-span-2 sm:border-t-0 sm:border-b sm:pb-10" : ""
      }`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        {insight.featured ? `Featured · ${insight.category}` : insight.category}
      </span>
      <h3
        className={`font-[family-name:var(--font-heading)] font-medium leading-[1.2] text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--accent)] ${
          insight.featured ? "text-[28px]" : "text-[18px]"
        }`}
      >
        {insight.title}
      </h3>
      <p className="text-[13.5px] font-light leading-[1.7] text-[var(--text2)]">{insight.excerpt}</p>
      <div className="mt-1 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.08em] text-[var(--text3)]">
        <span>
          {insight.source} · {insight.date} · {insight.readTime}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}
