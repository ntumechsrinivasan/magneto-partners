"use client";

import { useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import ChatWindow, { type ChatWindowHandle } from "@/components/advisor/ChatWindow";
import QuickQueryButton from "@/components/advisor/QuickQueryButton";
import { ADVISOR_CAPABILITIES, QUICK_QUERIES } from "@/lib/constants";

export default function AdvisorPage() {
  const chatRef = useRef<ChatWindowHandle>(null);

  return (
    <main className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="AI MAGNET ADVISOR"
          title="Intelligent Materials Recommendation Engine"
          description="Ask about magnet grades, supply-chain alternatives, cost sensitivity, or recycling feasibility — or book directly with Dr Gopalan for strategic depth."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-[14.5px] font-bold text-white">
                Capabilities
              </h3>
              <ul className="flex flex-col gap-3">
                {ADVISOR_CAPABILITIES.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-[12.5px] text-[var(--text2)]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--accent)]" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-4 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--text3)]">
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

            <div className="relative overflow-hidden rounded-[14px] border border-[rgba(200,169,110,0.2)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d1a3a,#162f62)] text-lg">
                  🎓
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-white">
                    Dr R Gopalan
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-[var(--gold)]">
                    INAE Fellow · PhD IIT Madras · h-index 31
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] font-light leading-[1.6] text-[var(--text2)]">
                Technology Advisor & INAE Chair Professor, ARCI. For complex strategic challenges,
                book directly with Dr Gopalan.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-[6px] border border-[rgba(200,169,110,0.4)] px-5 py-3 font-[family-name:var(--font-heading)] text-[11.5px] font-bold uppercase tracking-[0.06em] text-[var(--gold)] transition-colors hover:bg-[var(--gold2)]"
              >
                Book with Dr Gopalan →
              </Link>
            </div>
          </div>

          <ChatWindow ref={chatRef} />
        </div>
      </div>
    </main>
  );
}
