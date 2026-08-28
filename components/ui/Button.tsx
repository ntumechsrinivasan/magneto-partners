import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gold";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] font-[family-name:var(--font-heading)] font-bold text-[11.5px] uppercase tracking-[0.06em] px-[18px] py-[10px] transition-all duration-200 cursor-pointer";

const variants: Record<string, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,184,255,0.25)]",
  secondary:
    "text-[var(--text)] bg-transparent border border-[var(--border2)] hover:border-[var(--accent)] hover:-translate-y-0.5",
  ghost:
    "text-[var(--accent)] bg-transparent border border-[var(--border2)] hover:bg-[rgba(0,184,255,0.06)]",
  gold: "text-[var(--gold)] bg-transparent border border-[rgba(200,169,110,0.35)] hover:bg-[var(--gold2)]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
