"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import type { ValueCardData } from "@/lib/types";

export default function ValueCard({ value, index }: { value: ValueCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex gap-4 border-l-2 border-transparent py-1 pl-5 transition-colors duration-300 hover:border-[var(--accent)]"
    >
      <Icon name={value.icon} className="mt-1 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.6} />
      <div className="flex flex-col gap-1.5">
        <h3 className="font-[family-name:var(--font-heading)] text-[16px] font-medium text-[var(--ink)]">
          {value.title}
        </h3>
        <p className="text-[13px] font-light leading-[1.7] text-[var(--text2)]">{value.description}</p>
      </div>
    </motion.div>
  );
}
