import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pb-10 pt-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-11 sm:grid-cols-[1fr_auto]">
          <div>
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-flex">
              <Image
                src="/brand/lockup-dark.png"
                alt={SITE.name}
                width={1000}
                height={215}
                className="h-[56px] w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[34ch] text-[15px] font-light leading-[1.65] text-[var(--mute)]">
              {SITE.description}
            </p>
          </div>

          <nav className="flex flex-wrap items-start gap-7">
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mono text-[var(--mute)] transition-colors duration-200 hover:text-[var(--nd)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mono flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-6 text-[var(--dim)] sm:flex-row">
          <span>© 2025 {SITE.name}</span>
          <span>Illustrative advisory content · not investment advice</span>
        </div>
      </div>
    </footer>
  );
}
