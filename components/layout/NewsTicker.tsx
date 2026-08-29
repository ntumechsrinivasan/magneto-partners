"use client";

import { useEffect, useState } from "react";
import { INSIGHTS } from "@/lib/constants";

export interface Headline {
  category: string;
  title: string;
  source: string;
}

/**
 * The running headline band.
 *
 * Items are fetched from /data/headlines.json at load, so the band can be
 * driven by a real feed without touching this component: whatever writes that
 * file — a scheduled rebuild, a Worker route, an editor updating it by hand —
 * becomes the source. Until something does, it falls back to Twin Pole's own
 * published research, which is why every seeded item is credited to the
 * research desk rather than to an outside newsroom. Nothing here should ever
 * carry a third party's byline unless it genuinely came from them.
 */
const FALLBACK: Headline[] = INSIGHTS.map((i) => ({
  category: i.category,
  title: i.title,
  source: i.source,
}));

export default function NewsTicker() {
  const [items, setItems] = useState<Headline[]>(FALLBACK);

  useEffect(() => {
    let live = true;
    fetch("/data/headlines.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const next = Array.isArray(data?.headlines) ? data.headlines : null;
        // Ignore an empty or malformed file rather than blanking the band.
        if (live && next?.length) setItems(next);
      })
      .catch(() => {
        /* offline, or no feed wired up yet — the fallback already shows */
      });
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
        <div className="ticker-track flex w-max items-center">
          {run.map((h, i) => (
            <span key={`${h.title}-${i}`} className="mono flex items-center whitespace-nowrap">
              <i className="mx-5 h-[3px] w-[3px] rounded-full bg-[var(--nd)] not-italic" aria-hidden />
              <b className="font-normal text-[var(--nd)]">{h.category}</b>
              <span className="mx-2.5 text-[var(--dim)]">/</span>
              <span className="normal-case tracking-normal text-[var(--bone)]">{h.title}</span>
              <span className="ml-3 text-[var(--dim)]">— {h.source}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
