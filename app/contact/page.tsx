"use client";

import { useRef, useState } from "react";
import { Mail } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import DrGopalanProfile from "@/components/contact/DrGopalanProfile";
import ConsultationTiers from "@/components/contact/ConsultationTiers";
import BookingForm from "@/components/contact/BookingForm";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { SCHEDULING, SITE, PLATES } from "@/lib/constants";
import { openCalendly } from "@/lib/calendly";
import type { ConsultationTier } from "@/lib/types";

export default function ContactPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const toForm = (tierId: string) => {
    setSelectedPlanId(tierId);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelect = async (tier: ConsultationTier) => {
    const url = SCHEDULING[tier.id];
    // A tier with a link books in the Calendly overlay. If it is not
    // configured — or the widget is blocked — fall through to the request
    // form rather than leaving the button dead.
    if (url && (await openCalendly(url))) return;
    toForm(tier.id);
  };

  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto flex max-w-[1040px] flex-col gap-16">
        {/* Someone arriving here has already decided to talk to us. Lead with
            how to do that; the credentials that justify the rate sit further
            down, for the reader who still wants them. */}
        <SectionHeader
          tag="Engage"
          title="Book a consultation"
          description="Choose the engagement that fits the decision in front of you. Every session is led personally by Dr R Gopalan."
        />

        <ConsultationTiers onSelect={handleSelect} />

        <div ref={formRef}>
          <BookingForm selectedPlanId={selectedPlanId} />
        </div>

        <div className="rv flex flex-col items-start gap-4 border border-[var(--line)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[20.5px] font-semibold">Not sure which to book?</h3>
            <p className="mt-1.5 text-[17.5px] font-light leading-[1.6] text-[var(--mute)]">
              Write to us and we will point you at the right one — or tell you if you do not need us.
            </p>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex shrink-0 items-center gap-2.5 border-b border-[var(--line2)] pb-1 text-[17.5px] font-medium text-[var(--bone)] transition-colors hover:border-[var(--nd)] hover:text-[var(--nd)]"
          >
            <Mail className="h-[17px] w-[17px]" strokeWidth={1.6} />
            {SITE.email}
          </a>
        </div>

        <Plate plate={PLATES.boardroom} className="h-[280px] lg:h-[380px]" />

        <div className="rv border-t border-[var(--line)] pt-16">
          <div className="eyebrow eyebrow--rule mono mb-8">Who you will be speaking with</div>
          <DrGopalanProfile />
        </div>
      </div>
    </main>
  );
}
