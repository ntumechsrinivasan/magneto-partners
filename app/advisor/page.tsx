"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ChatWindow, { type ChatWindowHandle } from "@/components/advisor/ChatWindow";
import QuickQueryButton from "@/components/advisor/QuickQueryButton";
import { ADVISOR_CAPABILITIES, QUICK_QUERIES } from "@/lib/constants";

export default function AdvisorPage() {
  const chatRef = useRef<ChatWindowHandle>(null);

  return (
    <main className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader
          tag="AI Magnet Advisor"
          title="Intelligent materials recommendation engine"
          description="Ask about magnet grades, supply-chain alternatives, cost sensitivity, or recycling feasibility — or book directly with Dr Gopalan for strategic depth."
          align="left"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
            <div className="border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-[16px] font-medium text-[var(--ink)]">
                Capabilities
              </h3>
              <ul className="flex flex-col gap-3">
                {ADVISOR_CAPABILITIES.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-[13px] text-[var(--text2)]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--accent)]" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text3)]">
                Quick Queries
              </h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUERIES.map((q) => (
                  <QuickQueryButton
                    key={q.label}
                    label={q.label}
                    onClick={() => chatRef.current?.sendMessage(q.query)}
                  />
                ))}
              </div>
            </div>

            <div className="border border-[var(--gold2)] bg-[var(--card2)] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold2)] text-[var(--gold)]">
                  <GraduationCap className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-medium text-[var(--ink)]">
                    Dr R Gopalan
                  </h3>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]">
                    INAE Fellow · PhD IIT Madras · h-index 31
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13px] font-light leading-[1.6] text-[var(--text2)]">
                Technology Advisor &amp; INAE Chair Professor, ARCI. For complex strategic
                challenges, book directly with Dr Gopalan.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--gold)] transition-colors hover:text-[var(--accent-dark)]"
              >
                Book with Dr Gopalan
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <ChatWindow ref={chatRef} />
        </div>
      </div>
    </main>
  );
}
