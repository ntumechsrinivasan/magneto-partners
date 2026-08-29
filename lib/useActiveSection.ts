"use client";

import { useEffect, useState } from "react";

/**
 * Reports which `data-nav` section is currently under the header, so the top
 * bar can show where the reader is rather than only where they clicked.
 *
 * Sections declare the nav href they belong to, so the mapping lives with the
 * markup instead of in a list here that would quietly go stale when a section
 * is added or moved.
 *
 * Geometry each frame rather than IntersectionObserver: a jump-scroll can skip
 * an element entirely and the observer then never reports it, which is the
 * same failure the reveal animation hit.
 */
export function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Deferred a frame: setting state in the effect body would cascade a
      // render, and the value is the same either way.
      const id = requestAnimationFrame(() => setActive(null));
      return () => cancelAnimationFrame(id);
    }

    let ticking = false;

    const check = () => {
      ticking = false;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
      if (!nodes.length) return;

      // The line just under the sticky header — what the reader is looking at,
      // not what happens to be at the top of the document.
      const line = 170;
      let current: string | null = null;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.dataset.nav ?? null;
      }

      // At the very bottom the last section may never cross the line, so give
      // it to whatever ends the page.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = nodes[nodes.length - 1].dataset.nav ?? current;
      }
      setActive(current);
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
  }, [enabled]);

  return active;
}
