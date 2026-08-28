import type { Credential } from "@/lib/types";

export default function StatGrid({ stats }: { stats: Credential[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)]">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 bg-[var(--card)] p-6">
          <span className="font-[family-name:var(--font-heading)] text-[28px] font-medium tracking-[-0.5px] text-[var(--ink)]">
            {stat.value}
          </span>
          <span className="text-[12px] font-light leading-[1.5] text-[var(--text2)]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
