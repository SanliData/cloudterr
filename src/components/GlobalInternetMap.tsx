"use client";

import { useState } from "react";
import { MapFallbackCard } from "@/components/MapFallbackCard";

const MAP_SOURCES = [
  {
    id: "submarine",
    label: "Submarine Cable Map",
    url: "https://www.submarinecablemap.com/",
    domain: "www.submarinecablemap.com",
    note: null,
  },
  {
    id: "cloudflare",
    label: "Cloudflare Radar (Global Traffic)",
    url: "https://radar.cloudflare.com/",
    domain: "radar.cloudflare.com",
    note: "Use the map navigation to view Internet traffic & outages.",
  },
] as const;

export function GlobalInternetMap() {
  const [activeTab, setActiveTab] = useState<"submarine" | "cloudflare">("submarine");

  const submarineSource = MAP_SOURCES[0];
  const cloudflareSource = MAP_SOURCES[1];
  const activeSource = MAP_SOURCES.find((s) => s.id === activeTab)!;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-2" id="global-map-heading">
        Global Internet Infrastructure
      </h2>
      <p className="text-slate-600 text-sm mb-3">
        The global internet backbone relies on submarine cable systems that carry the majority of intercontinental traffic. These cables connect continents along defined routes; terrestrial fiber and data center interconnects complete the path. Redundancy across multiple cable systems and diverse routing supports reliability and resilience.
      </p>

      <div
        role="tablist"
        aria-label="Global map source"
        className="flex gap-2 mb-4 border-b border-slate-200"
      >
        {MAP_SOURCES.map((source) => (
          <button
            key={source.id}
            type="button"
            role="tab"
            aria-selected={activeTab === source.id}
            aria-controls={`global-map-panel-${source.id}`}
            id={`global-tab-${source.id}`}
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
        id="global-map-panel-submarine"
        role="tabpanel"
        aria-labelledby="global-tab-submarine"
        hidden={activeTab !== "submarine"}
        className={activeTab !== "submarine" ? "hidden" : ""}
      >
        {activeTab === "submarine" && (
          <MapFallbackCard
            sourceUrl={submarineSource.url}
            sourceLabel={submarineSource.label}
            variant="global"
            reason="Bu harita gömülmeye izin vermiyor. Görmek için tıklayın."
          />
        )}
      </div>

      <div
        id="global-map-panel-cloudflare"
        role="tabpanel"
        aria-labelledby="global-tab-cloudflare"
        hidden={activeTab !== "cloudflare"}
        className={activeTab !== "cloudflare" ? "hidden" : ""}
      >
        {activeTab === "cloudflare" && (
          <>
            <MapFallbackCard
              sourceUrl={cloudflareSource.url}
              sourceLabel={cloudflareSource.label}
              variant="global"
              reason="Bu harita gömülmeye izin vermiyor. Görmek için tıklayın."
            />
            {cloudflareSource.note && (
              <p className="mt-2 text-xs text-slate-500">{cloudflareSource.note}</p>
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
          Source: {activeSource.domain} (third-party; not affiliated with Cloud Telecommunications)
        </p>
      </div>
    </div>
  );
}
