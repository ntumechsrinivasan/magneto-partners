"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      className="group relative flex flex-col gap-4 border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-300 hover:border-[var(--border2)] hover:shadow-[0_12px_28px_rgba(23,20,15,0.06)]"
    >
      <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
        <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--text3)]">
        {service.tag}
      </span>
      <h3 className="font-[family-name:var(--font-heading)] text-[19px] font-medium leading-snug text-[var(--ink)]">
        {service.title}
      </h3>
      <p className="text-[13.5px] font-light leading-[1.65] text-[var(--text2)]">
        {service.description}
      </p>
    </motion.div>
  );
}
