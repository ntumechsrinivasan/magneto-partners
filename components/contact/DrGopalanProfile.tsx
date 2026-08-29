import { BadgeCheck } from "lucide-react";
import Plate from "@/components/ui/Plate";
import {
  CREDENTIAL_GRID,
  AWARDS,
  FELLOWSHIP_TAGS,
  RESEARCH_DOMAIN_TAGS,
  GOVERNMENT_ROLES,
  DR_GOPALAN_BIO,
  PLATES,
} from "@/lib/constants";

export default function DrGopalanProfile() {
  const bio = DR_GOPALAN_BIO.split("\n\n");

  return (
    <div className="rv border border-[var(--line)]">
      <div className="grid grid-cols-1 border-b border-[var(--line)] lg:grid-cols-[248px_1fr]">
        <div className="flex flex-col items-start gap-4 border-b border-[var(--line)] p-8 lg:border-b-0 lg:border-r">
          <div className="relative">
            <Plate
              plate={PLATES.portrait}
              className="h-[224px] w-[180px] border border-[var(--nd-line)]"
              showCaption={false}
              cropInset={10}
            />
            <span className="absolute -bottom-[3px] -right-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-[var(--void)] bg-[var(--nd)] text-[var(--void)]">
              <BadgeCheck className="h-[13px] w-[13px]" strokeWidth={2.2} />
            </span>
          </div>
          <span className="mono leading-[1.7] text-[var(--nd)]">
            ARCI · DST
            <br />
            Govt of India
          </span>
        </div>

        <div className="flex flex-col gap-3.5 p-8">
          <span className="mono text-[var(--nd)]">Chief Advisor · Twin Pole Partners</span>
          <h2 className="display text-[34px]">Dr Raghavan Gopalan</h2>
          <p className="text-[17px] font-light leading-[1.6] text-[var(--mute)]">
            Technology Advisor &amp; INAE Chair Professor, Indian National Academy of Engineering ·
            Adjunct Professor, IISc Bangalore
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 border-b border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIAL_GRID.map((c, i) => (
          <div
            key={c.label}
            className={`flex flex-col gap-2 p-6 ${i > 0 ? "border-t border-[var(--line)] sm:border-t-0 sm:border-l" : ""}`}
          >
            <b className="display num text-[28px] font-bold text-[var(--nd)]">{c.value}</b>
            <span className="text-[15px] font-light leading-[1.5] text-[var(--mute)]">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-[15px] text-[18px] font-light leading-[1.75] text-[var(--mute)]">
          {bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div>
          <div className="mono mb-4 text-[var(--dim)]">Selected honours &amp; awards</div>
          <ul className="flex flex-col">
            {AWARDS.map((a) => (
              <li
                key={`${a.year}-${a.text}`}
                className="grid grid-cols-[60px_1fr] gap-5 border-t border-[var(--line)] py-[11px] first:border-t-0"
              >
                <span className="num font-[family-name:var(--font-jetbrains)] text-[15.5px] text-[var(--nd)]">
                  {a.year}
                </span>
                <span className="text-[17px] font-light leading-[1.5] text-[var(--mute)]">
                  {a.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono mb-4 text-[var(--dim)]">Fellowships &amp; appointments</div>
          <div className="flex flex-wrap gap-[7px]">
            {FELLOWSHIP_TAGS.map((t) => (
              <span
                key={t.label}
                className="mono border border-[var(--line2)] px-[11px] py-1.5 text-[var(--mute)]"
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mono mb-4 text-[var(--dim)]">Research domains</div>
          <div className="flex flex-wrap gap-[7px]">
            {RESEARCH_DOMAIN_TAGS.map((t) => (
              <span
                key={t}
                className="mono border border-[var(--nd-line)] bg-[var(--nd-soft)] px-[11px] py-1.5 text-[var(--nd)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mono mb-4 text-[var(--dim)]">Government advisory roles</div>
          <ul className="flex flex-col">
            {GOVERNMENT_ROLES.map((r) => (
              <li
                key={r.role}
                className="border-t border-[var(--line)] py-2.5 text-[16.5px] font-light leading-[1.55] text-[var(--mute)] first:border-t-0"
              >
                {r.role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
