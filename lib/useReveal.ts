"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.rv` / `.wipe` / `.settle` inside the page once it has
 * entered the viewport.
 *
 * Deliberately geometry-based rather than IntersectionObserver: a jump-scroll
 * (in-page anchor, scroll restoration, programmatic scrollTo) can skip an
 * element entirely, and the observer then never fires for it — leaving the
 * element stuck at opacity 0. Re-checking positions each frame cannot miss one.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".rv, .wipe, .settle").forEach((n) => n.classList.add("in"));
      return;
    }

    let nodes = Array.from(document.querySelectorAll<HTMLElement>(".rv, .wipe, .settle"));
    let ticking = false;

    const check = () => {
      const vh = window.innerHeight;
      nodes = nodes.filter((n) => {
        if (n.getBoundingClientRect().top < vh - 60) {
          n.classList.add("in");
          return false;
        }
        return true;
      });
      ticking = false;
      if (!nodes.length) teardown();
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    function teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return teardown;
  }, []);
}
