import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import IndustryCard from "@/components/ui/IndustryCard";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { INDUSTRIES, PLATES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors we power: electric vehicles, aerospace, industrial robotics, renewable energy, defence manufacturing, industrial automation, and consumer electronics.",
};

export default function IndustriesPage() {
  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="Industries" title="Sectors we power" />
        <div className="mb-14">
          <Plate plate={PLATES.rotor} className="h-[300px] lg:h-[440px]" />
        </div>
        <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((n) => (
            <IndustryCard key={n.name} industry={n} />
          ))}
        </div>
        <div className="mt-20">
          <Plate plate={PLATES.terrain} className="h-[280px] lg:h-[400px]" />
        </div>
      </div>
    </main>
  );
}
