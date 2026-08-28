"use client";

import { Check } from "lucide-react";
import type { ConsultationTier } from "@/lib/types";

interface BookingTierCardProps {
  tier: ConsultationTier;
  onSelect: (tier: ConsultationTier) => void;
}

const variantStyles: Record<string, string> = {
  standard: "border border-[var(--border)] bg-[var(--card)]",
  featured: "border-2 border-[var(--accent)] bg-[var(--card)]",
  gold: "border border-[var(--gold2)] bg-[var(--card2)]",
};

const priceColor: Record<string, string> = {
  standard: "text-[var(--success)]",
  featured: "text-[var(--ink)]",
  gold: "text-[var(--gold)]",
};

const checkColor: Record<string, string> = {
  standard: "text-[var(--accent)]",
  featured: "text-[var(--accent)]",
  gold: "text-[var(--gold)]",
};

const buttonStyles: Record<string, string> = {
  standard:
    "border border-[var(--border2)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  featured: "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)]",
  gold: "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold2)]",
};

export default function BookingTierCard({ tier, onSelect }: BookingTierCardProps) {
  return (
    <div className={`relative flex flex-col gap-5 p-7 ${variantStyles[tier.variant]}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text3)]">
          {tier.badge}
        </span>
        {tier.featuredBadge && (
          <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
            {tier.featuredBadge}
          </span>
        )}
      </div>

      <div>
        <div
          className={`font-[family-name:var(--font-heading)] font-medium tracking-[-0.5px] ${priceColor[tier.variant]} ${
            tier.variant === "standard" ? "text-[24px]" : "text-[32px]"
          }`}
        >
          {tier.price}
        </div>
        <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--text3)]">
          {tier.sub}
        </div>
      </div>

      <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-medium text-[var(--ink)]">
        {tier.name}
      </h3>

      <ul className="flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-[12.5px] font-light leading-[1.5] text-[var(--text2)]"
          >
            <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${checkColor[tier.variant]}`} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(tier)}
        className={`mt-auto rounded-[4px] px-5 py-3 text-[12px] font-semibold transition-colors duration-200 ${buttonStyles[tier.variant]}`}
      >
        {tier.buttonLabel}
      </button>
    </div>
  );
}
