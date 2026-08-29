import type { Credential } from "@/lib/types";

export default function StatGrid({ stats }: { stats: Credential[] }) {
  return (
    <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-2 border-b border-r border-[var(--line)] px-6 py-[26px]"
        >
          <b className="display num text-[30px] font-bold">{stat.value}</b>
          <span className="text-[12px] font-light leading-[1.5] text-[var(--mute)]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
