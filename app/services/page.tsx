import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategic consulting for critical materials — magnet strategy, supply intelligence, due diligence, EV materials, recycling, localisation, research, and AI-driven insights.",
};

export default function ServicesPage() {
  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="Services"
          title="Strategic consulting for critical materials"
          description="From supply-chain intelligence to advanced manufacturing strategy — operating at the intersection of geopolitics, materials science, and industrial AI."
        />
        <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </main>
  );
}
