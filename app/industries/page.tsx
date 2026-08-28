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
    <main className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="INDUSTRIES" title="Sectors We Power" />
        <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
