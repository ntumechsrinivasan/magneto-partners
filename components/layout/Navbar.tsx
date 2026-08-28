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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(247,244,238,0.92)] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon />
          <span className="font-[family-name:var(--font-heading)] text-[17px] font-semibold tracking-[-0.3px] text-[var(--ink)]">
            Magneto<span className="text-[var(--accent)]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] font-medium transition-colors duration-200 ${
                  active ? "text-[var(--ink)]" : "text-[var(--text2)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center justify-center rounded-[4px] bg-[var(--accent)] px-5 py-[10px] text-[12.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--accent-dark)] lg:inline-flex"
        >
          Speak to an Expert
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-[var(--ink)] lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[76px] flex flex-col gap-1 border-b border-[var(--border)] bg-[var(--bg-alt)] p-5 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-[4px] px-3 py-3 text-[15px] font-medium ${
                pathname === link.href ? "text-[var(--accent)]" : "text-[var(--text2)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[4px] bg-[var(--accent)] px-5 py-3 text-center text-[13px] font-semibold text-white"
          >
            Speak to an Expert
          </Link>
        </div>
      )}
    </header>
  );
}
