import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

const styles: Record<string, string> = {
  primary:
    "rounded-[2px] bg-[var(--nd)] px-6 py-[14px] text-[13px] font-semibold text-[var(--void)] hover:bg-[var(--nd-hi)]",
  ghost:
    "border-b border-[var(--line2)] pb-1 text-[13.5px] font-medium text-[var(--bone)] hover:border-[var(--nd)] hover:text-[var(--nd)]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  showArrow = false,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${styles[variant]} ${className}`;
  const body = (
    <>
      {children}
      {showArrow && <ArrowRight className="h-[15px] w-[15px]" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
