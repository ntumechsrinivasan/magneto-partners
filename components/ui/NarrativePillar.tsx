import type { NarrativePillar as PillarData } from "@/lib/types";

export default function NarrativePillar({ pillar, index = 0 }: { pillar: PillarData; index?: number }) {
  return (
    <div
      className={`rv flex flex-col gap-4 border-t border-[var(--line)] py-7 sm:border-l sm:border-t-0 sm:px-9 sm:py-0 ${
        index === 0 ? "sm:border-l-0 sm:pl-0" : ""
      }`}
    >
      <span className="mono text-[var(--nd)]">{pillar.eyebrow}</span>
      <h3 className="display-tight text-[25px] leading-[1.22]">{pillar.headline}</h3>
      <p className="text-[17.5px] font-light leading-[1.7] text-[var(--mute)]">{pillar.copy}</p>
    </div>
  );
}
