interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
}

/** Mono index label in the margin, technical-drawing style. */
export default function SectionHeader({ tag, title, description }: SectionHeaderProps) {
  return (
    <div className="rv mb-[72px] grid grid-cols-1 gap-6 lg:grid-cols-[180px_1fr] lg:gap-10">
      <div className="mono pt-0 text-[var(--nd)] lg:pt-2.5">{tag}</div>
      <div className="flex max-w-[640px] flex-col gap-5">
        <h2 className="display text-[clamp(30px,3.6vw,46px)]">{title}</h2>
        {description && (
          <p className="text-[19.5px] font-light leading-[1.65] text-[var(--mute)]">{description}</p>
        )}
      </div>
    </div>
  );
}
