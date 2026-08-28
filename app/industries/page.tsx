import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import IndustryCard from "@/components/ui/IndustryCard";
import { INDUSTRIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors we power: electric vehicles, aerospace, industrial robotics, renewable energy, defence manufacturing, industrial automation, and consumer electronics.",
};

export default function IndustriesPage() {
  return (
    <main className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader tag="Industries" title="Sectors we power" align="left" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
