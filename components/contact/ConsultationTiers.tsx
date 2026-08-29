import BookingTierCard from "@/components/ui/BookingTierCard";
import { CONSULTATION_TIERS } from "@/lib/constants";
import type { ConsultationTier } from "@/lib/types";

export default function ConsultationTiers({
  onSelect,
}: {
  onSelect: (tier: ConsultationTier) => void;
}) {
  return (
    <div className="rv flex flex-col gap-5">
      <span className="mono text-[var(--dim)]">Select your consultation type</span>
      <div className="grid grid-cols-1 border-l border-t border-[var(--line)] lg:grid-cols-3">
        {CONSULTATION_TIERS.map((tier) => (
          <BookingTierCard key={tier.id} tier={tier} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
