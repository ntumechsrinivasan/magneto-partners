import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import InsightCard from "@/components/ui/InsightCard";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { INSIGHTS, PLATES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Industrial intelligence and market research on rare-earth supply strategy, EV materials, recycling economics, industrial AI, and magnet market pricing.",
};

export default function InsightsPage() {
  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="Insights" title="Industrial intelligence & market research" />
        <div className="mb-14">
          <Plate plate={PLATES.archive} className="h-[300px] lg:h-[440px]" />
        </div>
        <div className="flex flex-col">
          {INSIGHTS.map((a) => (
            <InsightCard key={a.title} insight={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
