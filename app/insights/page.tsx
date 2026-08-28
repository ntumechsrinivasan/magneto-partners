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
    <main className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="INSIGHTS" title="Industrial Intelligence & Market Research" />
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          {INSIGHTS.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
