"use client";

import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DrGopalanProfile from "@/components/contact/DrGopalanProfile";
import ConsultationTiers from "@/components/contact/ConsultationTiers";
import BookingForm from "@/components/contact/BookingForm";
import Reveal from "@/components/ui/Reveal";
import { SCHEDULING } from "@/lib/constants";
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
        <SectionHeader
          tag="Engage"
          title="Book time with Dr R Gopalan"
          description="INAE Fellow. PhD IIT Madras. 35+ years. 200+ publications. h-index 31. One of India's foremost authorities on rare-earth permanent magnets and EV energy materials."
        />
        <DrGopalanProfile />
        <ConsultationTiers onSelect={handleSelect} />
        <div ref={formRef}>
          <BookingForm selectedPlanId={selectedPlanId} />
        </div>
      </div>
    </main>
  );
}
