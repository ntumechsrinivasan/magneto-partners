/**
 * Archival duotone: desaturate, then map black to graphite and white to the
 * brand violet tint. Referenced from CSS as `filter: url(#duotone)`.
 */
export default function Duotone() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.043 0.580" />
            <feFuncG type="table" tableValues="0.055 0.412" />
            <feFuncB type="table" tableValues="0.075 0.996" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
