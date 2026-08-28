"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col gap-4 overflow-hidden bg-[var(--card)] p-6 transition-colors duration-300 hover:bg-[var(--card2)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,184,255,0.06),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[rgba(0,184,255,0.08)] text-xl">
        {service.icon}
      </div>
      <span className="font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.15em] text-[var(--accent)]">
        {service.tag}
      </span>
      <h3 className="font-[family-name:var(--font-heading)] text-[17px] font-bold leading-snug text-white">
        {service.title}
      </h3>
      <p className="text-[13px] font-light leading-[1.65] text-[var(--text2)]">{service.description}</p>
    </motion.div>
  );
}
