import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import InsightCard from "@/components/ui/InsightCard";
import Reveal from "@/components/ui/Reveal";
import { INSIGHTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Industrial intelligence and market research on rare-earth geopolitics, EV strategy, recycling economics, industrial AI, and magnet market pricing.",
};

export default function InsightsPage() {
  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="Insights" title="Industrial intelligence & market research" />
        <div className="flex flex-col">
          {INSIGHTS.map((a) => (
            <InsightCard key={a.title} insight={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
