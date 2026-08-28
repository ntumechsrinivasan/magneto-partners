import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-inverse";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  showArrow?: boolean;
}

const base = "inline-flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer";

const variants: Record<string, string> = {
  primary:
    "rounded-[4px] bg-[var(--accent)] text-white text-[13px] font-semibold px-6 py-[13px] hover:bg-[var(--accent-dark)] hover:-translate-y-px",
  ghost:
    "text-[var(--ink)] text-[13.5px] font-medium border-b border-[var(--border2)] pb-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]",
  "ghost-inverse":
    "text-[var(--ink-band-text)] text-[13.5px] font-medium border-b border-[rgba(239,233,221,0.3)] pb-0.5 hover:border-[var(--ink-band-text)]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  fullWidth = false,
  showArrow = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="h-[15px] w-[15px]" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
