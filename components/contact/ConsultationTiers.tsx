import BookingTierCard from "@/components/ui/BookingTierCard";
import { CONSULTATION_TIERS } from "@/lib/constants";
import type { ConsultationTier } from "@/lib/types";

export default function ConsultationTiers({
  onSelect,
}: {
  onSelect: (tier: ConsultationTier) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text3)]">
        Select Your Consultation Type
      </span>
      <div className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
        {CONSULTATION_TIERS.map((tier) => (
          <BookingTierCard key={tier.id} tier={tier} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
