export default function QuickQueryButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--border2)] bg-[var(--bg-alt)] px-3.5 py-[7px] text-[12px] text-[var(--text2)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {label}
    </button>
  );
}
