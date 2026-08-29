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
      className="rounded-[2px] border border-[var(--line2)] px-[13px] py-2 text-[15.5px] text-[var(--mute)] transition-colors duration-200 hover:border-[var(--nd)] hover:text-[var(--nd)]"
    >
      {label}
    </button>
  );
}
