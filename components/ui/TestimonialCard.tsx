import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial; index?: number }) {
  return (
    <figure className="rv m-0 flex flex-col gap-[22px] border-b border-l border-[var(--line)] px-8 pb-9 pt-10 first:border-l-0 first:pl-0">
      <div className="font-[family-name:var(--font-jetbrains)] text-[22px] leading-none text-[var(--nd)]">&ldquo;</div>
      <blockquote className="display-tight m-0 text-[17px] font-normal leading-[1.5]">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-auto flex flex-col gap-[3px]">
        <span className="text-[12.5px] font-semibold">{testimonial.attribution}</span>
        <span className="mono text-[var(--dim)]">{testimonial.role}</span>
      </figcaption>
    </figure>
  );
}
