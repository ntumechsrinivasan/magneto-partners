"use client";

import { useCallback, useState } from "react";
import PlateImage from "./PlateImage";
import type { Plate as PlateData } from "@/lib/constants";

interface PlateProps {
  plate: PlateData;
  className?: string;
  showCaption?: boolean;
  cropInset?: number;
}

/**
 * A photographic slot. When `plate.src` resolves it renders the image under
 * the archival duotone; when it is unset — or fails to load — it renders a
 * reserved frame with registration marks, so an empty slot reads as
 * deliberate rather than as a broken or invented image.
 */
export default function Plate({
  plate,
  className = "",
  showCaption = true,
  cropInset = 22,
}: PlateProps) {
  const [failed, setFailed] = useState(false);
  const filled = Boolean(plate.src) && !failed;
  const handleFail = useCallback(() => setFailed(true), []);

  return (
    <figure className="m-0">
      <div className={`plate wipe ${className}`}>
        {plate.src && !failed && (
          <div className="absolute inset-0">
            <PlateImage
              src={plate.src}
              remote={plate.remote}
              alt={plate.caption}
              natural={plate.treatment === "natural"}
              onFail={handleFail}
            />
          </div>
        )}

        {!filled && (
          <span
            className="pointer-events-none absolute z-[3]"
            style={{ inset: cropInset }}
            aria-hidden="true"
          >
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((pos) => (
              <i key={pos} className={`absolute h-4 w-4 border-[rgba(148,105,254,0.55)] ${pos}`} />
            ))}
            <b className="mono absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-center font-normal leading-[2] text-[var(--dim)]">
              {plate.subject}
            </b>
          </span>
        )}
      </div>

      {showCaption && (
        <figcaption className="mono mt-3.5 flex justify-between gap-5 text-[var(--dim)]">
          <span>{plate.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
