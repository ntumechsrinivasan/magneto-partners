"use client";

import { useEffect, useRef, useState } from "react";
import PlateImage from "@/components/ui/PlateImage";
import { PLATES, STAGES } from "@/lib/constants";

/**
 * A pinned scroll sequence: the viewport is held while the reader scrolls
 * through three stages, each with its own photograph and one idea.
 *
 * The section is deliberately tall and the inner frame is sticky, so scroll
 * distance becomes narrative time rather than page length — the reader travels
 * three screens' worth of story through one screen of layout.
 *
 * Progress is read from the section's own position each frame rather than from
 * a scroll offset, so it stays correct regardless of what sits above it and
 * however the reader arrived — a jump-scroll included.
 */
export default function ScrollStage() {
  const host = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No pinning when motion is unwelcome: the stages simply stack.
      const id = requestAnimationFrame(() => setPinned(false));
      return () => cancelAnimationFrame(id);
    }

    let ticking = false;
    const check = () => {
      ticking = false;
      const el = host.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Travel available once the frame is pinned, in pixels.
      const travel = r.height - window.innerHeight;
      if (travel <= 0) return;
      setProgress(Math.min(1, Math.max(0, -r.top / travel)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!pinned) {
    return (
      <section className="border-t border-[var(--line)]">
        {STAGES.map((stage) => (
          <div key={stage.headline} className="border-b border-[var(--line)]">
            <div className="plate relative h-[52vh]">
              <PlateImage
                src={PLATES[stage.plate].src!}
                remote={PLATES[stage.plate].remote}
                alt={PLATES[stage.plate].caption}
                onFail={() => {}}
              />
            </div>
            <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10">
              <div className="eyebrow eyebrow--rule mono">{stage.eyebrow}</div>
              <h2 className="display mt-5 max-w-[16ch] text-[clamp(32px,4.4vw,60px)]">
                {stage.headline}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[19px] font-light leading-[1.7] text-[var(--mute)]">
                {stage.copy}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Each stage owns an equal share of the travel.
  const span = 1 / STAGES.length;
  const current = Math.min(STAGES.length - 1, Math.floor(progress / span));

  return (
    <section
      ref={host}
      className="relative border-t border-[var(--line)]"
      style={{ height: `${STAGES.length * 100 + 40}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {STAGES.map((stage, i) => {
          const local = (progress - i * span) / span;

          // Stages stack, so a later one simply paints over the one before it.
          // Fading both ends of a crossfade instead would leave a moment where
          // neither is opaque and the ground shows through as a dark flash.
          const FADE = 0.15;
          const opacity =
            i === 0 ? 1 : Math.max(0, Math.min(1, (progress - (i * span - 0.1)) / FADE));

          return (
            <div
              key={stage.headline}
              className="plate absolute inset-0"
              style={{ opacity }}
              aria-hidden={i !== current}
            >
              <PlateImage
                src={PLATES[stage.plate].src!}
                remote={PLATES[stage.plate].remote}
                alt={PLATES[stage.plate].caption}
                onFail={() => {}}
              />
              {/* Ground the type sits on, so the copy holds over any frame. */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--void)] via-[rgba(10,13,18,0.82)] to-[rgba(10,13,18,0.35)]" />
              <div className="absolute inset-0 flex items-center">
                <div
                  className="mx-auto w-full max-w-[1280px] px-6 lg:px-10"
                  style={{
                    // Copy drifts up slightly as its stage advances.
                    transform: `translateY(${(1 - Math.max(0, Math.min(1, local))) * 26}px)`,
                  }}
                >
                  <div className="eyebrow eyebrow--rule mono">{stage.eyebrow}</div>
                  <h2 className="display mt-5 max-w-[14ch] text-[clamp(38px,5.6vw,76px)]">
                    {stage.headline}
                  </h2>
                  <p className="mt-7 max-w-[46ch] text-[19px] font-light leading-[1.7] text-[var(--mute)]">
                    {stage.copy}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Where the reader is in the sequence. */}
        <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 gap-2.5">
          {STAGES.map((stage, i) => (
            <span
              key={stage.headline}
              className="h-[3px] w-11 overflow-hidden bg-[var(--line2)]"
            >
              <span
                className="block h-full bg-[var(--nd)] transition-none"
                style={{
                  width: `${Math.max(0, Math.min(1, (progress - i * span) / span)) * 100}%`,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
