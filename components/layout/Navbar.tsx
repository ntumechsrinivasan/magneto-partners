"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoIcon from "@/components/ui/LogoIcon";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[62px] border-b border-[var(--border)] bg-[rgba(3,4,12,0.90)] backdrop-blur-[24px]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="font-[family-name:var(--font-heading)] text-[15px] font-extrabold tracking-[-0.5px] text-white">
            MAGNETO<span className="text-[var(--accent)]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-[6px] border border-transparent px-3 py-2 font-[family-name:var(--font-body)] text-[12.5px] font-medium transition-colors duration-200 ${
                  active
                    ? "border-[rgba(0,184,255,0.14)] bg-[rgba(0,184,255,0.06)] text-[var(--accent)]"
                    : "text-[var(--text2)] hover:text-[var(--text)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-[6px] bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] px-[18px] py-2 font-[family-name:var(--font-heading)] text-[11.5px] font-bold uppercase tracking-[0.06em] text-white transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
        >
          Speak to an Expert
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-[var(--text)] lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[62px] flex flex-col gap-1 border-b border-[var(--border)] bg-[rgba(3,4,12,0.98)] p-5 backdrop-blur-[24px] lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-[6px] px-3 py-3 text-[14px] font-medium ${
                pathname === link.href ? "text-[var(--accent)]" : "text-[var(--text2)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[6px] bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] px-[18px] py-3 text-center font-[family-name:var(--font-heading)] text-[12px] font-bold uppercase tracking-[0.06em] text-white"
          >
            Speak to an Expert
          </Link>
        </div>
      )}
    </header>
  );
}
