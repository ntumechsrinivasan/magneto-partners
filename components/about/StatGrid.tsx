import type { Credential } from "@/lib/types";

export default function StatGrid({ stats }: { stats: Credential[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[11px] bg-[var(--border)]">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 bg-[var(--card)] p-5">
          <span className="font-[family-name:var(--font-heading)] text-[26px] font-extrabold tracking-[-0.8px] text-white">
            {stat.value}
          </span>
          <span className="text-[11.5px] font-light leading-[1.5] text-[var(--text2)]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
