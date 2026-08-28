"use client";

import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeader({ tag, title, description, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 flex max-w-2xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : "items-start text-left"}`}
    >
      <SectionTag>{tag}</SectionTag>
      <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-1px] text-white">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] font-light leading-[1.7] text-[var(--text2)]">{description}</p>
      )}
    </motion.div>
  );
}
