import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import IndustryCard from "@/components/ui/IndustryCard";
import InsightCard from "@/components/ui/InsightCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Button from "@/components/ui/Button";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import {
  SERVICES,
  INDUSTRIES,
  INSIGHTS,
  ARRIVAL_SIGNALS,
  TESTIMONIALS,
  PLATES,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <main>
      <Reveal />
      <Hero />

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            tag="Who we work with"
            title="You are in the right place if&hellip;"
          />
          <div className="grid grid-cols-1 border-t border-[var(--line)] md:grid-cols-2">
            {ARRIVAL_SIGNALS.map((signal, i) => (
              <div
                key={signal}
                className={`rv grid grid-cols-[42px_1fr] gap-3 border-b border-[var(--line)] py-6 md:pr-10 ${
                  i % 2 === 1 ? "md:border-l md:pl-10" : ""
                }`}
              >
                <span className="mono pt-[3px] text-[var(--nd)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[18.5px] font-light leading-[1.6] text-[var(--mute)]">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] pb-20">
        <Plate plate={PLATES.foundry} className="h-[46vh] min-h-[320px]" showCaption={false} />
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="mono mt-4 flex justify-between gap-5 text-[var(--dim)]">
            <span>{PLATES.foundry.caption}</span>
            <span>Fig. 02</span>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-20 lg:px-10" data-nav="/services">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            tag="Services"
            title="Strategic consulting for critical materials"
            description="From grade selection and processing routes to sourcing strategy — operating at the intersection of materials science, manufacturing economics, and industrial AI."
          />
          <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
          <div className="mt-11">
            <Button href="/services" variant="ghost" showArrow>
              All ten services
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-20 lg:px-10" data-nav="/industries">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader tag="Industries" title="Sectors we power" />
          <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.slice(0, 4).map((n) => (
              <IndustryCard key={n.name} industry={n} />
            ))}
          </div>
          <div className="mt-11">
            <Button href="/industries" variant="ghost" showArrow>
              All seven sectors
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader tag="Field notes" title="What clients say when the pressure is on" />
          <div className="grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.attribution} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-6 py-20 lg:px-10" data-nav="/insights">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader tag="Insights" title="Industrial intelligence & market research" />
          <div className="flex flex-col">
            {INSIGHTS.slice(0, 2).map((a) => (
              <InsightCard key={a.title} insight={a} />
            ))}
          </div>
          <div className="mt-11">
            <Button href="/insights" variant="ghost" showArrow>
              All research
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--panel)] px-6 py-28 lg:px-10" data-nav="/contact">
        <div className="absolute inset-0 z-0 opacity-[0.16]">
          <Plate
            plate={PLATES.boardroom}
            className="absolute inset-0"
            showCaption={false}
            cropInset={40}
          />
        </div>
        <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[180px_1fr]">
          <div className="mono rv text-[var(--nd)]">Engage</div>
          <div className="rv">
            <h2 className="display max-w-[15ch] text-[clamp(30px,3.8vw,50px)]">
              Speak directly with Dr R Gopalan.
            </h2>
            <p className="mt-6 max-w-[48ch] text-[19px] font-light leading-[1.7] text-[var(--mute)]">
              INAE Fellow. PhD IIT Madras. 35+ years across DRDO, NIMS Japan and ARCI. 200+
              publications, 14 patents, and 22 years on national mission programmes.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-[var(--nd)] px-6 py-[14px] text-[16.5px] font-semibold text-[var(--void)] transition-colors duration-200 hover:bg-[var(--nd-hi)]"
            >
              Book a consultation
              <ArrowRight className="h-[15px] w-[15px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
