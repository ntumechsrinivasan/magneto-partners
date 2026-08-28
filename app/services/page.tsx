import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategic consulting for critical materials — magnet strategy, supply intelligence, due diligence, EV materials, recycling, localisation, research, and AI-driven insights.",
};

export default function ServicesPage() {
  return (
    <main className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="SERVICES"
          title="Strategic Consulting for Critical Materials"
          description="From supply-chain intelligence to advanced manufacturing strategy — operating at the intersection of geopolitics, materials science, and industrial AI."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
