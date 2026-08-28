import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import ValueCard from "@/components/ui/ValueCard";
import StatGrid from "@/components/about/StatGrid";
import { ABOUT_STATS, VALUE_CARDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "The intelligence layer for strategic materials — Magneto Partners, anchored by Dr Raghavan Gopalan, INAE Chair Professor and rare-earth magnet authority.",
};

export default function AboutPage() {
  return (
    <main className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="ABOUT"
          title="The Intelligence Layer for Strategic Materials"
          align="left"
        />
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 text-[15px] font-light leading-[1.76] text-[var(--text2)]">
              <p>
                Magneto Partners was founded on a single conviction: that the future of industrial
                civilisation is gated by access to advanced magnetic materials — and that most
                organisations making decisions about that future lack the specialised intelligence
                to make them well.
              </p>
              <p>
                We sit at the intersection of geopolitical intelligence, materials science, and
                industrial AI — helping EV manufacturers, defence contractors, energy companies,
                and private equity navigate a supply landscape that is simultaneously the most
                critical and least well-understood in the global economy.
              </p>
              <p>
                Our advisory is anchored by Dr Raghavan Gopalan — INAE Fellow, INAE Chair
                Professor at the Indian National Academy of Engineering, and Adjunct Professor at
                IISc Bangalore. With over 35 years spanning DRDO&apos;s Defence Metallurgical
                Research Laboratory, NIMS Japan, and ARCI (DST), he brings unmatched depth in
                rare-earth permanent magnets, EV energy materials, and critical minerals strategy.
              </p>
            </div>
            <StatGrid stats={ABOUT_STATS} />
          </div>

          <div className="flex flex-col gap-6">
            {VALUE_CARDS.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
