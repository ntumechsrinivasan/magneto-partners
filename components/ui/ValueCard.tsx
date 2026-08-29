import Icon from "./Icon";
import type { ValueCardData } from "@/lib/types";

export default function ValueCard({ value }: { value: ValueCardData; index?: number }) {
  return (
    <div className="rv flex gap-5 border-t border-[var(--line)] py-[26px] last:border-b">
      <Icon name={value.icon} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--nd)]" strokeWidth={1.5} />
      <div>
        <h3 className="mb-2 text-[17.5px] font-semibold">{value.title}</h3>
        <p className="text-[15.5px] font-light leading-[1.7] text-[var(--mute)]">{value.description}</p>
      </div>
    </div>
  );
}
