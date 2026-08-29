import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import Hysteresis from "@/components/sections/Hysteresis";
import ServiceCard from "@/components/ui/ServiceCard";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { SERVICES, PLATES, CURVE_PARAMS } from "@/lib/constants";

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
          description="From grade selection and processing routes to sourcing strategy — operating at the intersection of materials science, manufacturing economics, and industrial AI."
        />
        <div className="mb-14">
          <Plate plate={PLATES.bench} className="h-[300px] lg:h-[440px]" />
        </div>
        <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
        <section className="border-t border-[var(--line)] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            tag="Fig. 01 — Demagnetisation"
            title="Every grade decision comes back to one curve."
            description="The hysteresis loop is how a permanent magnet declares what it can survive. Its second quadrant is where procurement, thermal design, and sourcing risk actually get decided."
          />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div className="rv">
              <Hysteresis />
            </div>
            <div className="flex flex-col">
              {CURVE_PARAMS.map((p) => (
                <div
                  key={p.symbol}
                  className="rv grid grid-cols-[76px_1fr] gap-6 border-t border-[var(--line)] py-[22px] last:border-b"
                >
                  <div className="pt-0.5 font-[family-name:var(--font-jetbrains)] text-[19px] text-[var(--nd)]">
                    {p.symbol}
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[17px] font-semibold">{p.name}</h3>
                    <p className="text-[15.5px] font-light leading-[1.65] text-[var(--mute)]">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>


        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Plate plate={PLATES.foundry} className="h-[260px] lg:h-[340px]" />
          <Plate plate={PLATES.gap} className="h-[260px] lg:h-[340px]" />
        </div>
      </div>
    </main>
  );
}
