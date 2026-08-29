import Icon from "./Icon";
import type { Industry } from "@/lib/types";

export default function IndustryCard({ industry }: { industry: Industry; index?: number }) {
  return (
    <article className="rv group flex flex-col gap-3 border-b border-r border-[var(--line)] px-7 pb-9 pt-8 transition-colors duration-300 hover:bg-[var(--panel)]">
      <Icon name={industry.icon} className="h-[18px] w-[18px] text-[var(--nd)]" strokeWidth={1.5} />
      <h3 className="display-tight text-[17px]">{industry.name}</h3>
      <span className="num font-[family-name:var(--font-jetbrains)] text-[12px] tracking-[0.04em] text-[var(--flux)]">
        {industry.cagr}
      </span>
      <div className="flex h-[34px] items-end gap-[3px]">
        {industry.bars.map((bar, i) => (
          <span
            key={i}
            className="flex-1 bg-[var(--nd)] opacity-[0.28] transition-opacity duration-500 group-hover:opacity-[0.85]"
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>
      <p className="text-[13px] font-light leading-[1.65] text-[var(--mute)]">{industry.description}</p>
    </article>
  );
}
