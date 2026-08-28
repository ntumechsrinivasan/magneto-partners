import { GraduationCap, BadgeCheck } from "lucide-react";
import {
  CREDENTIAL_GRID,
  AWARDS,
  FELLOWSHIP_TAGS,
  RESEARCH_DOMAIN_TAGS,
  GOVERNMENT_ROLES,
  DR_GOPALAN_BIO,
} from "@/lib/constants";

export default function DrGopalanProfile() {
  const bioParagraphs = DR_GOPALAN_BIO.split("\n\n");

  return (
    <div className="border border-[var(--border)] bg-[var(--card)] p-9">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--gold2)] bg-[var(--card2)] text-[var(--gold)]">
              <GraduationCap className="h-9 w-9" strokeWidth={1.4} />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--accent)] text-white">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--gold)]">
            ARCI · DST / Govt of India
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="w-fit text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">
              Chief Advisor · Magneto Partners
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] font-medium tracking-[-0.5px] text-[var(--ink)]">
              Dr Raghavan Gopalan
            </h2>
            <p className="text-[13px] text-[var(--text2)]">
              Technology Advisor &amp; INAE Chair Professor, Indian National Academy of Engineering
              · Adjunct Professor, IISc Bangalore
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
            {CREDENTIAL_GRID.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 bg-[var(--card2)] p-4">
                <span className="font-[family-name:var(--font-heading)] text-[22px] font-medium text-[var(--gold)]">
                  {c.value}
                </span>
                <span className="text-[11.5px] font-light leading-[1.5] text-[var(--text2)]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-[14px] font-light leading-[1.75] text-[var(--text2)]">
            {bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text3)]">
              Selected Honours &amp; Awards
            </h4>
            <ul className="flex flex-col gap-2.5">
              {AWARDS.map((award) => (
                <li key={`${award.year}-${award.text}`} className="flex items-start gap-3">
                  <span className="min-w-[36px] text-[12px] font-semibold text-[var(--gold)]">
                    {award.year}
                  </span>
                  <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--gold)]" />
                  <span className="text-[13px] font-light leading-[1.55] text-[var(--text2)]">
                    {award.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {FELLOWSHIP_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="border border-[var(--border2)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text2)]"
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {RESEARCH_DOMAIN_TAGS.map((tag) => (
              <span
                key={tag}
                className="bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text3)]">
              Government Advisory Roles
            </h4>
            <ul className="flex flex-col gap-2">
              {GOVERNMENT_ROLES.map((r) => (
                <li
                  key={r.role}
                  className="flex items-start gap-2 text-[12.5px] font-light leading-[1.55] text-[var(--text2)]"
                >
                  <span className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--text3)]" />
                  {r.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
