"use client";

import { useState, useRef, useEffect } from "react";
import { MapFallbackCard } from "@/components/MapFallbackCard";

const IFRAME_LOAD_TIMEOUT_MS = 4000;

const US_MAP_SOURCES = [
  {
    id: "fcc",
    label: "FCC Broadband Map",
    url: "https://broadbandmap.fcc.gov/",
    domain: "broadbandmap.fcc.gov",
    embedBlocked: true,
  },
  {
    id: "peeringdb",
    label: "Internet Exchange Points Map (US)",
    url: "https://www.peeringdb.com/map",
    domain: "www.peeringdb.com",
    embedBlocked: false,
  },
] as const;

export function UsInternetMap() {
  const [activeTab, setActiveTab] = useState<"fcc" | "peeringdb">("fcc");
  const [peeringLoaded, setPeeringLoaded] = useState(false);
  const [peeringFallback, setPeeringFallback] = useState(false);
  const peeringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fccSource = US_MAP_SOURCES[0];
  const peeringSource = US_MAP_SOURCES[1];

  useEffect(() => {
    peeringTimeoutRef.current = setTimeout(() => {
      if (!peeringLoaded) setPeeringFallback(true);
    }, IFRAME_LOAD_TIMEOUT_MS);
    return () => {
      if (peeringTimeoutRef.current) clearTimeout(peeringTimeoutRef.current);
    };
  }, [peeringLoaded]);

  const activeSource = US_MAP_SOURCES.find((s) => s.id === activeTab)!;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-2" id="us-map-heading">
        United States Internet Infrastructure
      </h2>
      <p className="text-slate-600 text-sm mb-4">
        U.S. infrastructure is characterized by metro fiber concentration in major markets, Internet Exchange Points (IXPs) that aggregate traffic, and long-haul fiber corridors linking regions. Hyperscale data center clusters are concentrated in Virginia, Dallas, Chicago, and Silicon Valley, driving demand for backbone and last-mile construction.
      </p>

      <div
        role="tablist"
        aria-label="US map source"
        className="flex gap-2 mb-4 border-b border-slate-200"
      >
        {US_MAP_SOURCES.map((source) => (
          <button
            key={source.id}
            type="button"
            role="tab"
            aria-selected={activeTab === source.id}
            aria-controls={`us-map-panel-${source.id}`}
            id={`us-tab-${source.id}`}
            onClick={() => setActiveTab(source.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors -mb-px ${
              activeTab === source.id
                ? "bg-slate-100 text-slate-900 border border-slate-200 border-b-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {source.label}
          </button>
        ))}
      </div>

      <div
        id="us-map-panel-fcc"
        role="tabpanel"
        aria-labelledby="us-tab-fcc"
        hidden={activeTab !== "fcc"}
        className={activeTab !== "fcc" ? "hidden" : ""}
      >
        {activeTab === "fcc" && (
          <MapFallbackCard
            sourceUrl={fccSource.url}
            sourceLabel={fccSource.label}
            variant="us"
            reason="Harita bu sayfada gömülemiyor. Görmek için tıklayın."
          />
        )}
      </div>

      <div
        id="us-map-panel-peeringdb"
        role="tabpanel"
        aria-labelledby="us-tab-peeringdb"
        hidden={activeTab !== "peeringdb"}
        className={activeTab !== "peeringdb" ? "hidden" : ""}
      >
        {activeTab === "peeringdb" && (
          <>
            {peeringFallback ? (
              <MapFallbackCard
                sourceUrl={peeringSource.url}
                sourceLabel={peeringSource.label}
                variant="us"
                reason="Harita bu sayfada gömülemiyor. Görmek için tıklayın."
              />
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                <iframe
                  title="PeeringDB Map – Internet Exchange Points"
                  src="https://www.peeringdb.com/map"
                  className="absolute inset-0 w-full h-full"
                  onLoad={() => {
                    setPeeringLoaded(true);
                    if (peeringTimeoutRef.current) {
                      clearTimeout(peeringTimeoutRef.current);
                      peeringTimeoutRef.current = null;
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={activeSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent font-medium hover:underline"
        >
          Open {activeSource.label} in new tab
        </a>
        <span className="text-slate-400">|</span>
        <p className="text-xs text-slate-500">
          Source: {activeSource.domain} (third-party; not affiliated with Cloud Communication LLC)
        </p>
      </div>
    </div>
  );
}
