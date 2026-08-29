import type { Plate as PlateData } from "@/lib/constants";

interface PlateProps {
  plate: PlateData;
  className?: string;
  showCaption?: boolean;
  depth?: number;
  cropInset?: number;
}

/**
 * A photographic slot. When `plate.src` is set it renders the image under the
 * archival duotone; until then it renders a reserved frame with registration
 * marks, so an empty slot reads as deliberate rather than as a broken or
 * invented image.
 */
export default function Plate({
  plate,
  className = "",
  showCaption = true,
  cropInset = 22,
}: PlateProps) {
  const filled = Boolean(plate.src);

  return (
    <figure className="m-0">
      <div className={`plate wipe ${className}`}>
        {filled ? (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`settle ${plate.treatment === "natural" ? "plate-natural" : ""}`}
              src={plate.src}
              alt={plate.caption}
            />
          </div>
        ) : (
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
            <b className="mono absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-center font-normal leading-[2] text-[var(--mute)]">
              {plate.subject}
              <br />
              <span className="text-[var(--nd)]">Image slot · photograph to be placed</span>
            </b>
          </span>
        )}
      </div>

      {showCaption && (
        <figcaption className="mono mt-3.5 flex justify-between gap-5 text-[var(--dim)]">
          <span>{plate.caption}</span>
          {!filled && <span className="text-[var(--nd)]">Awaiting archival photograph</span>}
        </figcaption>
      )}
    </figure>
  );
}
