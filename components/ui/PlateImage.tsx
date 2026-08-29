"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Renders the plate image and reports upward if it cannot be shown, so the
 * caller can fall back to the reserved frame.
 *
 * `onError` alone is not enough on a prerendered page: the browser starts
 * fetching during HTML parse, so a missing file has usually already failed
 * by the time React hydrates and attaches the handler — the event is gone and
 * the slot would sit there blank. The mount check below catches that case by
 * asking the element what happened rather than waiting to be told.
 */
export default function PlateImage({
  src,
  alt,
  natural,
  onFail,
}: {
  src: string;
  alt: string;
  natural?: boolean;
  onFail: () => void;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [dead, setDead] = useState(false);

  const fail = useCallback(() => {
    setDead(true);
    onFail();
  }, [onFail]);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) {
      const id = requestAnimationFrame(fail);
      return () => cancelAnimationFrame(id);
    }
  }, [fail]);

  if (dead) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className={`settle ${natural ? "plate-natural" : ""}`}
      src={src}
      alt={alt}
      decoding="async"
      onError={fail}
    />
  );
}
