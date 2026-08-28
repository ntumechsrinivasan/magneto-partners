export default function SectionTag({
  children,
  inverse = false,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] ${
        inverse ? "text-[var(--ink-band-text2)]" : "text-[var(--accent)]"
      }`}
    >
      <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  );
}
