"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col gap-5 border border-[var(--border)] bg-[var(--card)] p-8"
    >
      <Quote className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.5} />
      <blockquote className="font-[family-name:var(--font-heading)] text-[17px] font-normal italic leading-[1.5] text-[var(--ink)]">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-auto flex flex-col gap-0.5 text-[12.5px]">
        <span className="font-semibold text-[var(--ink)]">{testimonial.attribution}</span>
        <span className="text-[var(--text2)]">{testimonial.role}</span>
      </figcaption>
    </motion.figure>
  );
}
