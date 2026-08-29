"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/lib/useActiveSection";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Only the homepage carries previews of the other sections to track.
  const section = useActiveSection(pathname === "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(10,13,18,0.82)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[88px] max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" aria-label={`${SITE.name} home`} className="flex items-center">
          <Image
            src="/brand/lockup-dark.png"
            alt={SITE.name}
            width={1000}
            height={215}
            priority
            className="h-[40px] w-auto lg:h-[52px]"
          />
        </Link>

        <nav className="hidden items-center gap-[30px] lg:flex">
          {NAV_LINKS.map((link) => {
            // On a section page the current page is the answer; on the
            // homepage it is whichever preview the reader has scrolled to,
            // falling back to Home above the first of them.
            const active =
              pathname === "/"
                ? (section ?? "/") === link.href
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mono relative transition-colors duration-200 ${
                  active
                    ? "text-[var(--bone)] after:absolute after:inset-x-0 after:-bottom-8 after:h-[2px] after:bg-[var(--nd)]"
                    : "text-[var(--mute)] hover:text-[var(--bone)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="mono hidden rounded-[2px] bg-[var(--nd)] px-[18px] py-[10px] font-semibold text-[var(--void)] transition-colors duration-200 hover:bg-[var(--nd-hi)] lg:inline-flex"
        >
          Speak to an Expert
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-[var(--bone)] lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col border-b border-[var(--line)] bg-[var(--panel)] px-6 pb-6 pt-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`mono border-t border-[var(--line)] py-[13px] first:border-t-0 ${
                pathname === link.href ? "text-[var(--nd)]" : "text-[var(--mute)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mono mt-4 rounded-[2px] bg-[var(--nd)] px-5 py-3 text-center font-semibold text-[var(--void)]"
          >
            Speak to an Expert
          </Link>
        </div>
      )}
    </header>
  );
}
