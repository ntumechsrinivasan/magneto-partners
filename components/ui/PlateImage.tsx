"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Renders the plate image, falling back through the sources it is given
 * before telling the caller to show the reserved frame instead.
 *
 * The local file under /public/plates/ is preferred — it is same-origin,
 * cached with the rest of the site, and survives the image host going away.
 * `remote` is the origin that file is mirrored from: if the mirror step did
 * not run (or ran against a builder that could not reach the host) the local
 * path 404s, and rather than leaving a hole in the page we fetch the original
 * directly. Only when both are gone does the slot admit it is empty.
 *
 * `onError` alone is not enough on a prerendered page: the browser starts
 * fetching during HTML parse, so a missing file has usually already failed by
 * the time React hydrates and attaches the handler — the event is gone and the
 * slot would sit there blank. The mount check below catches that case by
 * asking the element what happened rather than waiting to be told.
 */
export default function PlateImage({
  src,
  remote,
  alt,
  natural,
  onFail,
}: {
  src: string;
  remote?: string;
  alt: string;
  natural?: boolean;
  onFail: () => void;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [stage, setStage] = useState(0);

  const sources = remote && remote !== src ? [src, remote] : [src];
  const current = sources[stage];
  const exhausted = stage >= sources.length;

  const fail = useCallback(() => {
    setStage((s) => {
      if (s + 1 >= sources.length) onFail();
      return s + 1;
    });
  }, [onFail, sources.length]);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) {
      const id = requestAnimationFrame(fail);
      return () => cancelAnimationFrame(id);
    }
  }, [fail, stage]);

  if (exhausted) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // Keying on the source forces a genuine reload rather than React
      // patching the src on an element the browser already marked broken.
      key={current}
      ref={ref}
      className={`settle ${natural ? "plate-natural" : ""}`}
      src={current}
      alt={alt}
      decoding="async"
      onError={fail}
    />
  );
}
