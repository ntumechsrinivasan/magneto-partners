"use client";

import { Check, CalendarClock } from "lucide-react";
import { SCHEDULING } from "@/lib/constants";
import type { ConsultationTier } from "@/lib/types";

interface BookingTierCardProps {
  tier: ConsultationTier;
  onSelect: (tier: ConsultationTier) => void;
}

const priceColor: Record<string, string> = {
  standard: "text-[var(--flux)] text-[27px]",
  featured: "text-[var(--bone)] text-[34px]",
  gold: "text-[var(--nd)] text-[34px]",
};

export default function BookingTierCard({ tier, onSelect }: BookingTierCardProps) {
  const featured = tier.variant === "featured";
  const bookable = Boolean(SCHEDULING[tier.id]);

  return (
    <div
      className={`flex flex-col gap-[22px] border-b border-r border-[var(--line)] px-7 py-8 ${
        featured ? "bg-[var(--panel)] shadow-[inset_0_2px_0_var(--nd)]" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="mono text-[var(--dim)]">{tier.badge}</span>
        {tier.featuredBadge && (
          <span className="mono bg-[var(--nd)] px-2.5 py-1 text-[9.5px] text-[var(--void)]">
            {tier.featuredBadge}
          </span>
        )}
      </div>

      <div>
        <div className={`display num font-bold ${priceColor[tier.variant]}`}>{tier.price}</div>
        <div className="mono mt-1.5 text-[var(--dim)]">{tier.sub}</div>
      </div>

      <h3 className="text-[17px] font-semibold">{tier.name}</h3>

      <ul className="flex flex-col">
        {tier.features.map((f) => (
          <li
            key={f}
            className="grid grid-cols-[20px_1fr] gap-1.5 border-t border-[var(--line)] py-[9px] text-[12.5px] font-light leading-[1.5] text-[var(--mute)] first:border-t-0 first:pt-0"
          >
            <Check className="mt-[3px] h-[13px] w-[13px] text-[var(--nd)]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(tier)}
        className={`mt-auto inline-flex items-center justify-center gap-2 rounded-[2px] px-[18px] py-[13px] text-[12.5px] font-semibold transition-colors duration-200 ${
          featured
            ? "border border-[var(--nd)] bg-[var(--nd)] text-[var(--void)] hover:border-[var(--nd-hi)] hover:bg-[var(--nd-hi)]"
            : "border border-[var(--line2)] text-[var(--bone)] hover:border-[var(--nd)] hover:text-[var(--nd)]"
        }`}
      >
        {bookable && <CalendarClock className="h-[14px] w-[14px]" />}
        {bookable ? "Book a time" : tier.buttonLabel}
      </button>
    </div>
  );
}
