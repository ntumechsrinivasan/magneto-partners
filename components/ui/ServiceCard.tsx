import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service; index?: number }) {
  return (
    <article className="rv group relative flex flex-col gap-[18px] border-b border-r border-[var(--line)] px-7 pb-9 pt-8 transition-colors duration-300 hover:bg-[var(--panel)]">
      <ArrowUpRight className="absolute right-[26px] top-[30px] h-[13px] w-[13px] text-[var(--nd)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      <Icon name={service.icon} className="h-[18px] w-[18px] text-[var(--nd)]" strokeWidth={1.5} />
      <span className="mono text-[var(--dim)]">{service.tag}</span>
      <h3 className="display-tight text-[20px] leading-[1.25]">{service.title}</h3>
      <p className="text-[15px] font-light leading-[1.65] text-[var(--mute)]">{service.description}</p>
    </article>
  );
}
