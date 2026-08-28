import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionTag from "@/components/ui/SectionTag";
import ServiceCard from "@/components/ui/ServiceCard";
import IndustryCard from "@/components/ui/IndustryCard";
import InsightCard from "@/components/ui/InsightCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import NarrativePillar from "@/components/ui/NarrativePillar";
import Button from "@/components/ui/Button";
import { SERVICES, INDUSTRIES, INSIGHTS, NARRATIVE_PILLARS, TESTIMONIALS } from "@/lib/constants";

export default function HomePage() {
  const featuredServices = SERVICES.slice(0, 4);
  const featuredIndustries = INDUSTRIES.slice(0, 4);
  const featuredInsight = INSIGHTS[0];

  return (
    <main>
      <Hero />

      <section className="border-b border-[var(--border)] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {NARRATIVE_PILLARS.map((pillar, i) => (
            <NarrativePillar key={pillar.eyebrow} pillar={pillar} index={i} />
          ))}
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader
            tag="Services"
            title="Strategic consulting for critical materials"
            description="From supply-chain intelligence to advanced manufacturing strategy — operating at the intersection of geopolitics, materials science, and industrial AI."
            align="left"
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services" variant="ghost" showArrow>
              View all services
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-alt)] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader tag="Industries" title="Sectors we power" align="left" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featuredIndustries.map((industry, i) => (
              <IndustryCard key={industry.name} industry={industry} index={i} />
            ))}
          </div>
          <div className="mt-10">
            <Button href="/industries" variant="ghost" showArrow>
              Explore all industries
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader tag="Testimonials" title="Trusted by materials-critical teams" align="left" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={testimonial.attribution} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-alt)] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader tag="Insights" title="Industrial intelligence & market research" align="left" />
          <div className="grid grid-cols-1 gap-10">
            <InsightCard insight={featuredInsight} index={0} />
          </div>
          <div className="mt-10">
            <Button href="/insights" variant="ghost" showArrow>
              Read all insights
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink-band)] px-6 py-24 lg:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-6">
          <SectionTag inverse>Speak to an Expert</SectionTag>
          <h2 className="max-w-[560px] font-[family-name:var(--font-heading)] text-[clamp(28px,4vw,44px)] font-medium leading-[1.15] tracking-[-0.5px] text-[var(--ink-band-text)]">
            Speak directly with Dr R Gopalan.
          </h2>
          <p className="max-w-[480px] text-[15px] font-light leading-[1.7] text-[var(--ink-band-text2)]">
            INAE Fellow. PhD IIT Madras. 35+ years. 200+ publications. One of India&apos;s foremost
            authorities on rare-earth permanent magnets.
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-[4px] bg-[var(--accent)] px-6 py-[13px] text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--accent-dark)]"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
