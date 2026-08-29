"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INSIGHTS } from "@/lib/constants";

export interface Headline {
  category: string;
  title: string;
  source: string;
  url?: string;
}

/**
 * The running headline band.
 *
 * Live items come from /api/headlines, which merges free public RSS feeds on
 * the edge — see worker/index.js. Feeds send no CORS headers, so the fetch
 * cannot happen in the browser; this only ever talks to our own origin.
 *
 * Two fallbacks sit behind it: a static file that can be edited by hand, and
 * finally Twin Pole's own published research. That last one is why every
 * seeded item is credited to the research desk — nothing in this band should
 * carry an outside newsroom's name unless it genuinely came from them.
 */
const FALLBACK: Headline[] = INSIGHTS.map((i) => ({
  category: i.category,
  title: i.title,
  source: i.source,
}));

/** Feed text is external input: keep it to one line of plain text. */
function clean(items: unknown): Headline[] | null {
  if (!Array.isArray(items)) return null;
  const out = items
    .filter((i): i is Headline => Boolean(i && typeof i === "object"))
    .map((i) => ({
      category: String(i.category ?? "NEWS").slice(0, 40),
      title: String(i.title ?? "").slice(0, 180),
      source: String(i.source ?? "").slice(0, 60),
      url: typeof i.url === "string" && /^https:\/\//.test(i.url) ? i.url : undefined,
    }))
    .filter((i) => i.title.length > 8 && i.source);
  return out.length ? out : null;
}

/**
 * Reading speed, in pixels per second.
 *
 * The CSS animation takes a duration, not a speed, so a fixed duration makes
 * the band scroll faster the more headlines arrive — five seeded items crawl,
 * twenty live ones race past. Measuring the track and deriving the duration
 * keeps the pace identical whatever the feed returns.
 */
const PIXELS_PER_SECOND = 42;

export default function NewsTicker() {
  const [items, setItems] = useState<Headline[]>(FALLBACK);
  const track = useRef<HTMLDivElement>(null);

  const pace = useCallback(() => {
    const el = track.current;
    if (!el) return;
    // The track holds two copies, so one lap is half its width.
    const lap = el.scrollWidth / 2;
    if (lap > 0) el.style.animationDuration = `${(lap / PIXELS_PER_SECOND).toFixed(1)}s`;
  }, []);

  // Re-paced when the headlines change and when a resize reflows them.
  useEffect(() => {
    pace();
    window.addEventListener("resize", pace);
    return () => window.removeEventListener("resize", pace);
  }, [pace, items]);

  useEffect(() => {
    let live = true;

    async function load() {
      for (const src of ["/api/headlines", "/data/headlines.json"]) {
        try {
          const res = await fetch(src);
          if (!res.ok) continue;
          const next = clean((await res.json())?.headlines);
          if (next) {
            if (live) setItems(next);
            return;
          }
        } catch {
          /* try the next source */
        }
      }
      // Nothing answered — the seeded fallback is already on screen.
    }

    load();
    return () => {
      live = false;
    };
  }, []);

  // The track is rendered twice so the loop meets itself with no visible seam.
  const run = [...items, ...items];

  return (
    <div className="ticker relative flex items-stretch border-b border-[var(--line)] bg-[var(--panel)]">
      <div className="z-[2] flex shrink-0 items-center gap-2.5 border-r border-[var(--line)] bg-[var(--panel)] px-5">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--nd)] opacity-70" />
          <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--nd)]" />
        </span>
        <span className="mono whitespace-nowrap font-semibold text-[var(--nd)]">Market watch</span>
      </div>

      <div className="ticker-mask relative flex-1 overflow-hidden py-[11px]">
        <div ref={track} className="ticker-track flex w-max items-center">
          {run.map((h, i) => {
            const body = (
              <>
                <b className="font-normal text-[var(--nd)]">{h.category}</b>
                <span className="mx-2.5 text-[var(--dim)]">/</span>
                <span className="text-[14px] normal-case tracking-normal text-[var(--bone)] group-hover:text-[var(--nd-hi)]">
                  {h.title}
                </span>
                <span className="ml-3 text-[var(--dim)]">— {h.source}</span>
              </>
            );
            return (
              <span key={`${h.title}-${i}`} className="mono flex items-center whitespace-nowrap">
                <i
                  className="mx-5 h-[3px] w-[3px] rounded-full bg-[var(--nd)] not-italic"
                  aria-hidden
                />
                {h.url ? (
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center transition-colors"
                    // The duplicated half of the track is decorative.
                    aria-hidden={i >= items.length}
                    tabIndex={i >= items.length ? -1 : undefined}
                  >
                    {body}
                  </a>
                ) : (
                  <span className="group flex items-center">{body}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
