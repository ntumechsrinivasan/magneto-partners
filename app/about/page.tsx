import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import ValueCard from "@/components/ui/ValueCard";
import StatGrid from "@/components/about/StatGrid";
import NarrativePillar from "@/components/ui/NarrativePillar";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_STATS, VALUE_CARDS, PLATES, NARRATIVE_PILLARS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "The intelligence layer for strategic materials — Twin Pole Partners, anchored by Dr Raghavan Gopalan, INAE Chair Professor and rare-earth magnet authority.",
};

export default function AboutPage() {
  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader tag="About" title="The intelligence layer for strategic materials" />
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div className="rv flex flex-col gap-[22px] text-[19.5px] font-light leading-[1.75] text-[var(--mute)]">
              <p>
                Twin Pole Partners was founded on a single conviction: that the future of industrial
                civilisation is gated by access to advanced magnetic materials — and that most
                organisations making decisions about that future lack the specialised intelligence to
                make them well.
              </p>
              <p>
                We sit at the intersection of materials science, manufacturing economics, and
                industrial AI — helping EV manufacturers, defence contractors, energy companies, and
                private equity navigate a supply landscape that is simultaneously the most critical
                and least well-understood in the global economy.
              </p>
              <p>
                Our advisory is anchored by{" "}
                <strong className="font-medium text-[var(--bone)]">Dr Raghavan Gopalan</strong> —
                INAE Fellow, INAE Chair Professor at the Indian National Academy of Engineering, and
                Adjunct Professor at IISc Bangalore. With over 35 years spanning DRDO&rsquo;s Defence
                Metallurgical Research Laboratory, NIMS Japan, and ARCI (DST), he brings unmatched
                depth in rare-earth permanent magnets, EV energy materials, and critical minerals
                strategy.
              </p>
            </div>
            <div className="rv mt-11">
              <StatGrid stats={ABOUT_STATS} />
            </div>
          </div>

          <div>
            <div className="mb-10">
              <Plate plate={PLATES.lab} className="h-[460px]" />
            </div>
            <div className="flex flex-col">
              {VALUE_CARDS.map((v) => (
                <ValueCard key={v.title} value={v} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-3">
          {NARRATIVE_PILLARS.map((pillar, i) => (
            <NarrativePillar key={pillar.eyebrow} pillar={pillar} index={i} />
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Plate plate={PLATES.foundry} className="h-[240px] lg:h-[300px]" />
          <Plate plate={PLATES.bench} className="h-[240px] lg:h-[300px]" />
          <Plate plate={PLATES.terrain} className="h-[240px] lg:h-[300px]" />
        </div>
      </div>
    </main>
  );
}
