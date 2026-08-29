import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FieldCanvas from "./FieldCanvas";
import MetricBlock from "@/components/ui/MetricBlock";
import Plate from "@/components/ui/Plate";
import { HERO_METRICS, PLATES, SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden border-b border-[var(--line)]">
      <div className="absolute inset-0 z-0 opacity-[0.2]">
        <Plate plate={PLATES.hero} className="absolute inset-0" showCaption={false} cropInset={40} />
      </div>
      <FieldCanvas />

      <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1280px] px-6 pt-24 lg:px-10 lg:pt-[148px]">
        <div className="pointer-events-auto">
          <div className="eyebrow eyebrow--rule mono">Strategic materials advisory</div>

          <h1 className="display mt-[26px] max-w-[15ch] text-[clamp(40px,5.4vw,80px)]">
            Every high-performance motor comes down to{" "}
            <span className="text-[var(--nd)]">one magnet decision</span>.
          </h1>

          <p className="mt-7 max-w-[46ch] text-[18.5px] font-light leading-[1.7] text-[var(--mute)]">
            {SITE.short} Partners advises the engineering and procurement teams making it — grade
            selection, processing routes, sourcing strategy, localisation and recycling economics —
            with direct counsel from Dr R Gopalan.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--nd)] px-6 py-[14px] text-[15px] font-semibold text-[var(--void)] transition-colors duration-200 hover:bg-[var(--nd-hi)]"
            >
              Explore solutions
              <ArrowRight className="h-[15px] w-[15px]" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-[var(--line2)] pb-1 text-[15.5px] font-medium text-[var(--bone)] transition-colors duration-200 hover:border-[var(--nd)] hover:text-[var(--nd)]"
            >
              Speak to an expert
              <ArrowRight className="h-[15px] w-[15px]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mt-16 border-t border-[var(--line)] bg-[rgba(10,13,18,0.55)] backdrop-blur-[6px] lg:mt-[104px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-6 sm:grid-cols-4 lg:px-10">
          {HERO_METRICS.map((metric, i) => (
            <MetricBlock key={metric.label} metric={metric} delay={i * 120} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
