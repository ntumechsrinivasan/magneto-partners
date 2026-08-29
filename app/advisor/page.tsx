"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ChatWindow, { type ChatWindowHandle } from "@/components/advisor/ChatWindow";
import QuickQueryButton from "@/components/advisor/QuickQueryButton";
import Reveal from "@/components/ui/Reveal";
import { ADVISOR_CAPABILITIES, QUICK_QUERIES } from "@/lib/constants";

export default function AdvisorPage() {
  const chatRef = useRef<ChatWindowHandle>(null);

  return (
    <main className="px-6 py-32 lg:px-10">
      <Reveal />
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          tag="AI Magnet Advisor"
          title="Intelligent materials recommendation engine"
          description="Ask about magnet grades, supply-chain alternatives, cost sensitivity, or recycling feasibility — or book directly with Dr Gopalan for strategic depth."
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rv flex flex-col">
            <div className="border border-[var(--line)] p-[26px]">
              <h3 className="mb-[18px] text-[15px] font-semibold">Capabilities</h3>
              <ul className="flex flex-col">
                {ADVISOR_CAPABILITIES.map((c, i) => (
                  <li
                    key={c}
                    className="grid grid-cols-[30px_1fr] gap-1 border-t border-[var(--line)] py-[9px] text-[13px] font-light text-[var(--mute)] first:border-t-0 first:pt-0"
                  >
                    <i className="pt-[3px] font-[family-name:var(--font-jetbrains)] text-[10px] not-italic text-[var(--nd)]">
                      {String(i + 1).padStart(2, "0")}
                    </i>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-t-0 border-[var(--line)] p-[26px]">
              <div className="mono mb-[18px] text-[var(--dim)]">Quick queries</div>
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

            <div className="border border-t-0 border-[var(--nd-line)] bg-[var(--nd-soft)] p-[26px]">
              <div className="flex items-center gap-3.5">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[var(--nd-line)] text-[var(--nd)]">
                  <GraduationCap className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold">Dr R Gopalan</h3>
                  <div className="mono text-[var(--nd)]">
                    INAE Fellow · PhD IIT Madras · h-index 31
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] font-light leading-[1.65] text-[var(--mute)]">
                Technology Advisor &amp; INAE Chair Professor, ARCI. For complex strategic
                challenges, book directly with Dr Gopalan.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 border-b border-[var(--line2)] pb-1 text-[13px] font-medium text-[var(--bone)] transition-colors hover:border-[var(--nd)] hover:text-[var(--nd)]"
              >
                Book with Dr Gopalan
                <ArrowRight className="h-[15px] w-[15px]" />
              </Link>
            </div>
          </div>

          <div className="rv">
            <ChatWindow ref={chatRef} />
          </div>
        </div>
      </div>
    </main>
  );
}
