"use client";

import { motion } from "framer-motion";
import type { ValueCardData } from "@/lib/types";

export default function ValueCard({ value, index }: { value: ValueCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col gap-2 border-l-2 border-transparent py-2 pl-5 transition-colors duration-300 hover:border-[var(--accent)]"
    >
      <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-white">
        {value.icon} {value.title}
      </h3>
      <p className="text-[13px] font-light leading-[1.7] text-[var(--text2)]">{value.description}</p>
    </motion.div>
  );
}
