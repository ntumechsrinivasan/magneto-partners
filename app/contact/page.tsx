"use client";

import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DrGopalanProfile from "@/components/contact/DrGopalanProfile";
import ConsultationTiers from "@/components/contact/ConsultationTiers";
import BookingForm from "@/components/contact/BookingForm";
import type { ConsultationTier } from "@/lib/types";

export default function ContactPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelect = (tier: ConsultationTier) => {
    setSelectedPlanId(tier.id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="px-8 py-24">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-14">
        <SectionHeader
          tag="SPEAK TO AN EXPERT"
          title="Book Time with Dr R Gopalan"
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
