import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import IndustryCard from "@/components/ui/IndustryCard";
import InsightCard from "@/components/ui/InsightCard";
import { SERVICES, INDUSTRIES, INSIGHTS } from "@/lib/constants";

export default function HomePage() {
  const featuredServices = SERVICES.slice(0, 4);
  const featuredIndustries = INDUSTRIES.slice(0, 4);
  const featuredInsight = INSIGHTS[0];

  return (
    <main>
      <Hero />

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            tag="SERVICES"
            title="Strategic Consulting for Critical Materials"
            description="From supply-chain intelligence to advanced manufacturing strategy — operating at the intersection of geopolitics, materials science, and industrial AI."
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/services"
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader tag="INDUSTRIES" title="Sectors We Power" />
          <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
            {featuredIndustries.map((industry, i) => (
              <IndustryCard key={industry.name} industry={industry} index={i} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/industries"
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] hover:underline"
            >
              Explore all industries →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader tag="INSIGHTS" title="Industrial Intelligence & Market Research" />
          <div className="grid grid-cols-1 gap-[14px]">
            <InsightCard insight={featuredInsight} index={0} />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/insights"
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] hover:underline"
            >
              Read all insights →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 rounded-[16px] border border-[var(--gold2)] bg-[var(--card)] p-12 text-center">
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-tight tracking-[-1px] text-white">
            Speak Directly With Dr R Gopalan
          </h2>
          <p className="max-w-[480px] text-[14px] font-light leading-[1.7] text-[var(--text2)]">
            INAE Fellow. PhD IIT Madras. 35+ years. 200+ publications. One of India&apos;s foremost
            authorities on rare-earth permanent magnets.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[6px] bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] px-[22px] py-[13px] font-[family-name:var(--font-heading)] text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
