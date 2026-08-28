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
    <div className="relative overflow-hidden rounded-[16px] border border-[rgba(200,169,110,0.25)] bg-[var(--card)] p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.15),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />

      <div className="relative flex flex-col gap-8 md:flex-row">
        <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(200,169,110,0.35)] bg-[linear-gradient(135deg,#0d1a3a,#162f62)] text-4xl">
              🎓
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[linear-gradient(135deg,var(--accent2),var(--accent))] text-[11px] text-white">
              ✓
            </div>
          </div>
          <span className="rounded-full bg-[var(--gold2)] px-3 py-1 font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.12em] text-[var(--gold)]">
            ARCI · DST / GOVT OF INDIA
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-transparent font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.12em] text-[var(--gold)]">
              Chief Advisor · Magneto Partners
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-extrabold tracking-[-0.8px] text-white">
              Dr Raghavan Gopalan
            </h2>
            <p className="text-[12px] text-[var(--text2)]">
              Technology Advisor &amp; INAE Chair Professor, Indian National Academy of Engineering
              · Adjunct Professor, IISc Bangalore
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[10px] bg-[var(--border)] sm:grid-cols-2">
            {CREDENTIAL_GRID.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 bg-[var(--card2)] p-4">
                <span className="font-[family-name:var(--font-heading)] text-[20px] font-extrabold text-[var(--gold)]">
                  {c.value}
                </span>
                <span className="text-[11px] font-light leading-[1.5] text-[var(--text2)]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-[13.5px] font-light leading-[1.72] text-[var(--text2)]">
            {bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <h4 className="mb-3 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--text3)]">
              Selected Honours &amp; Awards
            </h4>
            <ul className="flex flex-col gap-2.5">
              {AWARDS.map((award) => (
                <li key={`${award.year}-${award.text}`} className="flex items-start gap-3">
                  <span className="min-w-[36px] font-[family-name:var(--font-mono)] text-[11px] font-medium text-[var(--gold)]">
                    {award.year}
                  </span>
                  <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--gold)]" />
                  <span className="text-[12.5px] font-light leading-[1.55] text-[var(--text2)]">
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
                className="rounded-full border border-[var(--border2)] px-3 py-1 font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.08em] text-[var(--text2)]"
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {RESEARCH_DOMAIN_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[rgba(0,184,255,0.06)] px-3 py-1 font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.08em] text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h4 className="mb-3 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--text3)]">
              Government Advisory Roles
            </h4>
            <ul className="flex flex-col gap-2">
              {GOVERNMENT_ROLES.map((r) => (
                <li key={r.role} className="flex items-start gap-2 text-[12px] font-light leading-[1.55] text-[var(--text2)]">
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
