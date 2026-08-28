import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import InsightCard from "@/components/ui/InsightCard";
import { INSIGHTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Industrial intelligence and market research on rare-earth geopolitics, EV strategy, recycling economics, industrial AI, and magnet market pricing.",
};

export default function InsightsPage() {
  return (
    <main className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader tag="Insights" title="Industrial intelligence & market research" align="left" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {INSIGHTS.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
