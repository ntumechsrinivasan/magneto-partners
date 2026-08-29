"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Runs the scroll-reveal effect without forcing the whole page to be a client
 * component — pages stay server components so they can export `metadata`.
 */
export default function Reveal() {
  useReveal();
  return null;
}
