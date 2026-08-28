const OFFSETS = [26, 54, 84, 116, 150];

export default function FieldLines() {
  return (
    <svg
      viewBox="0 0 480 520"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {OFFSETS.map((offset, i) => (
        <g key={offset}>
          <path
            d={`M 240 90 C ${240 - offset} 190, ${240 - offset} 330, 240 430`}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity={0.55 - i * 0.09}
          />
          <path
            d={`M 240 90 C ${240 + offset} 190, ${240 + offset} 330, 240 430`}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity={0.55 - i * 0.09}
          />
        </g>
      ))}
      <circle cx="240" cy="90" r="7" fill="var(--ink)" className="drift" />
      <circle cx="240" cy="430" r="7" fill="var(--accent)" />
      <text
        x="240"
        y="65"
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-body)"
        fill="var(--text3)"
        letterSpacing="0.1em"
      >
        N
      </text>
      <text
        x="240"
        y="465"
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-body)"
        fill="var(--text3)"
        letterSpacing="0.1em"
      >
        S
      </text>
    </svg>
  );
}
