import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-8 pb-7 pt-9">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 sm:flex-row">
        <span className="font-[family-name:var(--font-heading)] text-[14px] font-extrabold text-white">
          MAGNETO<span className="text-[var(--accent)]">.</span>
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11.5px] text-[var(--text3)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-[11px] text-[var(--text3)]">
          © 2025 Magneto Partners. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
