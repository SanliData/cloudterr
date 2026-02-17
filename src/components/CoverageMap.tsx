"use client";

export function CoverageMap() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 overflow-hidden">
      <p className="text-sm font-medium text-slate-600 mb-4">Service areas (conceptual)</p>
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto max-h-64 text-slate-300"
        aria-hidden="true"
      >
        {/* Simplified Texas outline */}
        <path
          fill="currentColor"
          fillOpacity={0.15}
          stroke="currentColor"
          strokeWidth={1.5}
          d="M 120 40 L 320 50 L 350 120 L 340 220 L 200 270 L 80 220 L 60 120 Z"
        />
        {/* DFW blob */}
        <ellipse
          cx="180"
          cy="100"
          rx="45"
          ry="35"
          fill="#0369a1"
          fillOpacity={0.25}
          stroke="#0369a1"
          strokeWidth={2}
        />
        <text x="165" y="105" className="fill-slate-600 text-xs font-medium">DFW</text>
        {/* Houston */}
        <circle cx="240" cy="180" r="18" fill="#0ea5e9" fillOpacity={0.2} stroke="#0ea5e9" strokeWidth={1} />
        <text x="225" y="185" className="fill-slate-600 text-xs">Houston</text>
        {/* Austin */}
        <circle cx="200" cy="150" r="14" fill="#0ea5e9" fillOpacity={0.2} stroke="#0ea5e9" strokeWidth={1} />
        <text x="188" y="155" className="fill-slate-600 text-xs">Austin</text>
        {/* San Antonio */}
        <circle cx="190" cy="195" r="14" fill="#0ea5e9" fillOpacity={0.2} stroke="#0ea5e9" strokeWidth={1} />
        <text x="172" y="200" className="fill-slate-600 text-xs">SA</text>
      </svg>
      <p className="mt-3 text-xs text-slate-500">
        Map placeholder. No real map API. Crews available for statewide deployments.
      </p>
    </div>
  );
}
