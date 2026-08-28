export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border2)] bg-[rgba(0,184,255,0.05)] px-[14px] py-[6px] font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.15em] text-[var(--accent)]">
      <span className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  );
}
