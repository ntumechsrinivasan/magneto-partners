import Link from "next/link";
import LogoIcon from "@/components/ui/LogoIcon";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)] px-6 pb-10 pt-14 lg:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-[300px] flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <LogoIcon size={22} />
              <span className="font-[family-name:var(--font-heading)] text-[16px] font-semibold text-[var(--ink)]">
                Magneto<span className="text-[var(--accent)]">.</span>
              </span>
            </div>
            <p className="text-[13px] font-light leading-[1.6] text-[var(--text2)]">
              Strategic advisory for rare-earth magnets, EV supply chains, and advanced
              manufacturing intelligence.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-[var(--text2)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-[11.5px] text-[var(--text3)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 Magneto Partners. All rights reserved.</span>
          <span>Advisory content is illustrative and does not constitute financial advice.</span>
        </div>
      </div>
    </footer>
  );
}
