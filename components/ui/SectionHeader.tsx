"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  inverse?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  description,
  align = "center",
  inverse = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-16 flex max-w-2xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : "items-start text-left"}`}
    >
      <SectionTag inverse={inverse}>{tag}</SectionTag>
      <h2
        className={`text-[clamp(28px,4vw,44px)] font-medium leading-[1.12] tracking-[-0.5px] ${
          inverse ? "text-[var(--ink-band-text)]" : "text-[var(--ink)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-[16px] font-light leading-[1.7] ${
            inverse ? "text-[var(--ink-band-text2)]" : "text-[var(--text2)]"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
