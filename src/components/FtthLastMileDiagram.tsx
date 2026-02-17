/**
 * Original schematic: FTTH/FTTP & Last-Mile distribution.
 * Drawn from scratch — no third-party assets. Use for illustration only.
 */
export function FtthLastMileDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FTTH/FTTP and last-mile distribution schematic"
    >
      {/* Central office / OLT */}
      <rect x="24" y="120" width="80" height="80" rx="6" fill="#1e293b" />
      <text x="64" y="158" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">
        OLT
      </text>
      <text x="64" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">
        Central
      </text>

      {/* Feeder fiber (single line from OLT to splitter) */}
      <line x1="104" y1="160" x2="220" y2="160" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" />
      <text x="162" y="150" textAnchor="middle" fill="#64748b" fontSize="10">Feeder</text>

      {/* Distribution / splitter */}
      <circle cx="260" cy="160" r="28" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
      <text x="260" y="156" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="600">1:N</text>
      <text x="260" y="168" textAnchor="middle" fill="#94a3b8" fontSize="8">Split</text>

      {/* Distribution fiber segments (from splitter to each drop) */}
      <line x1="288" y1="160" x2="340" y2="120" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <line x1="288" y1="160" x2="340" y2="160" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <line x1="288" y1="160" x2="340" y2="200" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

      {/* Last-mile / drop label */}
      <text x="314" y="138" textAnchor="middle" fill="#64748b" fontSize="9">Drop</text>
      <text x="314" y="178" textAnchor="middle" fill="#64748b" fontSize="9">Drop</text>

      {/* Premises 1 - Home */}
      <g transform="translate(360, 80)">
        <path d="M0 40 L20 0 L40 40 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
        <rect x="4" y="40" width="32" height="28" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
        <text x="20" y="72" textAnchor="middle" fill="#cbd5e1" fontSize="8">ONT</text>
        <text x="20" y="92" textAnchor="middle" fill="#64748b" fontSize="9">FTTH</text>
      </g>

      {/* Premises 2 - Home */}
      <g transform="translate(360, 120)">
        <path d="M0 40 L20 0 L40 40 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
        <rect x="4" y="40" width="32" height="28" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
        <text x="20" y="72" textAnchor="middle" fill="#cbd5e1" fontSize="8">ONT</text>
        <text x="20" y="92" textAnchor="middle" fill="#64748b" fontSize="9">FTTH</text>
      </g>

      {/* Premises 3 - Building (FTTP) */}
      <g transform="translate(360, 160)">
        <rect x="0" y="0" width="48" height="40" rx="3" fill="#334155" stroke="#475569" strokeWidth="1" />
        <rect x="4" y="4" width="8" height="10" fill="#475569" />
        <rect x="16" y="4" width="8" height="10" fill="#475569" />
        <rect x="28" y="4" width="8" height="10" fill="#475569" />
        <rect x="40" y="4" width="4" height="10" fill="#475569" />
        <text x="24" y="58" textAnchor="middle" fill="#64748b" fontSize="9">FTTP</text>
      </g>

      {/* Legend / title strip */}
      <rect x="24" y="240" width="592" height="56" rx="6" fill="#f1f5f9" />
      <text x="320" y="262" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
        Last-mile distribution &amp; drop deployment
      </text>
      <text x="320" y="278" textAnchor="middle" fill="#64748b" fontSize="10">
        Feeder → splitter → drop to premises (FTTH / FTTP)
      </text>
    </svg>
  );
}
