"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { REFERENCE, REFERENCE_GROUPS, findEntry } from "@/lib/reference";
import type { ReferenceEntry } from "@/lib/types";

/** Bold spans and bullet lines, which is all the entries use. */
function Body({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return null;
        const bullet = line.startsWith("•");
        return (
          <p
            key={i}
            className={`text-[18px] font-light leading-[1.72] text-[var(--mute)] ${
              bullet ? "-mt-2.5 pl-5 -indent-5" : ""
            }`}
          >
            {line
              .split(/(\*\*[^*]+\*\*)/g)
              .filter(Boolean)
              .map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="font-semibold text-[var(--bone)]">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
          </p>
        );
      })}
    </div>
  );
}

export default function ReferenceBrowser() {
  const [selected, setSelected] = useState<ReferenceEntry>(REFERENCE[0]);
  const [query, setQuery] = useState("");
  const [missed, setMissed] = useState<string | null>(null);

  // Typing filters the index; submitting jumps to the best match.
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return REFERENCE;
    return REFERENCE.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.keywords.some((k) => k.includes(q) || q.includes(k)),
    );
  }, [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const hit = findEntry(query);
    if (hit) {
      setSelected(hit);
      setMissed(null);
    } else if (query.trim()) {
      // Saying so is the honest answer. Guessing at the nearest entry is how
      // the old version answered questions nobody asked.
      setMissed(query.trim());
    }
  };

  const open = (entry: ReferenceEntry) => {
    setSelected(entry);
    setMissed(null);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
      <div className="rv flex flex-col lg:sticky lg:top-[150px]">
        <form onSubmit={submit} className="relative mb-7">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[var(--dim)]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Clearing the box means the reader has moved on; leaving the
              // "not covered" panel up would strand them there.
              if (!e.target.value.trim()) setMissed(null);
            }}
            placeholder="Search the reference…"
            aria-label="Search the reference"
            className="w-full rounded-[2px] border border-[var(--line)] bg-[var(--void)] py-[14px] pl-11 pr-4 text-[17px] text-[var(--bone)] transition-colors focus:border-[var(--nd)]"
          />
        </form>

        <div className="flex flex-col gap-7">
          {REFERENCE_GROUPS.map((group) => {
            const entries = filtered.filter((e) => e.group === group);
            if (!entries.length) return null;
            return (
              <div key={group}>
                <div className="mono mb-3 text-[var(--dim)]">{group}</div>
                <ul className="flex flex-col border-t border-[var(--line)]">
                  {entries.map((entry) => (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => open(entry)}
                        className={`w-full cursor-pointer border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-left text-[16.5px] leading-[1.4] transition-colors ${
                          selected.id === entry.id && !missed
                            ? "text-[var(--nd)]"
                            : "text-[var(--mute)] hover:text-[var(--bone)]"
                        }`}
                      >
                        {entry.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {!filtered.length && (
            <p className="text-[16.5px] font-light text-[var(--mute)]">
              Nothing here matches &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>

      <div className="rv min-h-[420px] border border-[var(--line)] bg-[var(--panel)] p-8 lg:p-12">
        {missed ? (
          <>
            <div className="eyebrow eyebrow--rule mono">Not covered here</div>
            <h2 className="display-tight mt-5 text-[28px]">
              We haven&rsquo;t written this one up yet.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[18px] font-light leading-[1.72] text-[var(--mute)]">
              This reference covers {REFERENCE.length} topics, and &ldquo;{missed}&rdquo; is not one
              of them. Rather than answer a question you did not ask, here is the direct route:
              send it to us and Dr Gopalan will answer it himself.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-[2px] bg-[var(--nd)] px-6 py-[14px] text-[16.5px] font-semibold text-[var(--void)] transition-colors hover:bg-[var(--nd-hi)]"
            >
              Put the question to Dr Gopalan
              <ArrowRight className="h-[15px] w-[15px]" />
            </Link>
          </>
        ) : (
          <>
            <div className="eyebrow eyebrow--rule mono">{selected.group}</div>
            <h2 className="display-tight mt-5 text-[clamp(26px,3vw,36px)]">{selected.title}</h2>
            <p className="mb-9 mt-4 max-w-[56ch] text-[19px] font-light leading-[1.6] text-[var(--nd)]">
              {selected.summary}
            </p>
            <Body text={selected.body} />
            <div className="mt-11 border-t border-[var(--line)] pt-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-b border-[var(--line2)] pb-1 text-[16.5px] font-medium text-[var(--bone)] transition-colors hover:border-[var(--nd)] hover:text-[var(--nd)]"
              >
                Discuss this against your own application
                <ArrowRight className="h-[15px] w-[15px]" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
