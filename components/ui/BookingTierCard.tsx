"use client";

import { Check } from "lucide-react";
import type { ConsultationTier } from "@/lib/types";

interface BookingTierCardProps {
  tier: ConsultationTier;
  onSelect: (tier: ConsultationTier) => void;
}

const variantStyles: Record<string, string> = {
  standard: "border border-[var(--border)] bg-[var(--card)]",
  featured:
    "border border-[var(--accent2)] bg-[linear-gradient(160deg,rgba(58,111,255,0.08),var(--card))]",
  gold: "border border-[rgba(200,169,110,0.3)] bg-[linear-gradient(160deg,var(--gold2),var(--card))]",
};

const priceColor: Record<string, string> = {
  standard: "text-[var(--accent3)]",
  featured: "text-white",
  gold: "text-[var(--gold)]",
};

const checkColor: Record<string, string> = {
  standard: "text-[var(--accent)]",
  featured: "text-[var(--accent)]",
  gold: "text-[var(--gold)]",
};

const buttonStyles: Record<string, string> = {
  standard:
    "border border-[var(--border2)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  featured:
    "bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] text-white hover:-translate-y-0.5",
  gold: "border border-[rgba(200,169,110,0.4)] text-[var(--gold)] hover:bg-[var(--gold2)]",
};

export default function BookingTierCard({ tier, onSelect }: BookingTierCardProps) {
  return (
    <div className={`relative flex flex-col gap-5 rounded-[14px] p-7 ${variantStyles[tier.variant]}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.1em] ${
            tier.variant === "gold"
              ? "bg-[var(--gold2)] text-[var(--gold)]"
              : tier.variant === "featured"
                ? "bg-[rgba(0,184,255,0.1)] text-[var(--accent)]"
                : "bg-[rgba(0,255,184,0.07)] text-[var(--accent3)]"
          }`}
        >
          {tier.badge}
        </span>
        {tier.featuredBadge && (
          <span className="rounded-full bg-[var(--accent)] px-3 py-1 font-[family-name:var(--font-mono)] text-[8.5px] uppercase tracking-[0.1em] text-black">
            {tier.featuredBadge}
          </span>
        )}
      </div>

      <div>
        <div
          className={`font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.5px] ${priceColor[tier.variant]} ${
            tier.variant === "standard" ? "text-[22px]" : "text-[30px]"
          }`}
        >
          {tier.price}
        </div>
        <div className="mt-1 font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.15em] text-[var(--text3)]">
          {tier.sub}
        </div>
      </div>

      <h3 className="font-[family-name:var(--font-heading)] text-[17px] font-bold text-white">
        {tier.name}
      </h3>

      <ul className="flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[12.5px] font-light leading-[1.5] text-[var(--text2)]">
            <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${checkColor[tier.variant]}`} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(tier)}
        className={`mt-auto rounded-[6px] px-5 py-3 font-[family-name:var(--font-heading)] text-[11.5px] font-bold uppercase tracking-[0.06em] transition-all duration-200 ${buttonStyles[tier.variant]}`}
      >
        {tier.buttonLabel}
      </button>
    </div>
  );
}
