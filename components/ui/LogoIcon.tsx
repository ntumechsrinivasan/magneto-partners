export default function LogoIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="10" height="20" rx="3" stroke="var(--accent)" strokeWidth="2" />
      <rect x="18" y="4" width="10" height="20" rx="3" stroke="var(--accent2)" strokeWidth="2" />
      <circle cx="9" cy="26" r="1.6" fill="var(--accent3)" />
      <circle cx="23" cy="26" r="1.6" fill="var(--accent3)" />
    </svg>
  );
}
