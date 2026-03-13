"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// React-Leaflet uses window; load only on client to avoid SSR/hydration issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((m) => m.Polygon),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((m) => m.CircleMarker),
  { ssr: false }
);

/** Texas center for default view */
const TEXAS_CENTER: [number, number] = [31.0, -99.5];
const DEFAULT_ZOOM = 6;

/** Simplified ERCOT-style zones (conceptual): North, South, West, Houston area */
const ERCOT_ZONES: { name: string; color: string; positions: [number, number][] }[] = [
  {
    name: "North (ERCOT North)",
    color: "#0ea5e9",
    positions: [
      [33.6, -97.8],
      [33.6, -96.2],
      [32.2, -96.0],
      [32.0, -97.8],
      [33.6, -97.8],
    ],
  },
  {
    name: "Houston (ERCOT Houston)",
    color: "#0369a1",
    positions: [
      [30.5, -95.0],
      [30.5, -96.2],
      [29.2, -96.0],
      [29.2, -95.0],
      [30.5, -95.0],
    ],
  },
  {
    name: "South (ERCOT South)",
    color: "#0284c7",
    positions: [
      [29.8, -98.8],
      [29.8, -97.2],
      [26.8, -97.4],
      [26.8, -99.2],
      [29.8, -98.8],
    ],
  },
  {
    name: "West (ERCOT West)",
    color: "#38bdf8",
    positions: [
      [32.2, -96.0],
      [32.0, -97.8],
      [29.8, -98.8],
      [29.5, -103.0],
      [31.8, -106.2],
      [33.2, -101.0],
      [33.6, -97.8],
      [32.2, -96.0],
    ],
  },
];

/** Major fiber backbone routes (conceptual): [from, to] city coordinates */
const FIBER_BACKBONE: { from: [number, number]; to: [number, number]; label: string }[] = [
  { from: [32.78, -96.8], to: [32.75, -97.33], label: "Dallas – Fort Worth" },
  { from: [32.78, -96.8], to: [29.76, -95.37], label: "Dallas – Houston" },
  { from: [32.78, -96.8], to: [30.27, -97.74], label: "Dallas – Austin" },
  { from: [30.27, -97.74], to: [29.42, -98.49], label: "Austin – San Antonio" },
  { from: [29.76, -95.37], to: [29.42, -98.49], label: "Houston – San Antonio" },
  { from: [32.75, -97.33], to: [30.27, -97.74], label: "Fort Worth – Austin" },
];

/** Major city markers for labels */
const CITIES: { name: string; position: [number, number] }[] = [
  { name: "Dallas", position: [32.78, -96.8] },
  { name: "Fort Worth", position: [32.75, -97.33] },
  { name: "Houston", position: [29.76, -95.37] },
  { name: "Austin", position: [30.27, -97.74] },
  { name: "San Antonio", position: [29.42, -98.49] },
];

export function TexasInfrastructureMap({
  className = "",
  showErcotZones = true,
  showFiberBackbone = true,
  height = "400px",
}: {
  className?: string;
  showErcotZones?: boolean;
  showFiberBackbone?: boolean;
  height?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={`rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center ${className}`}
        style={{ height, minHeight: "320px" }}
        aria-label="Texas altyapı haritası yükleniyor"
      >
        <span className="text-slate-500 text-sm">Harita yükleniyor…</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-slate-200 overflow-hidden ${className}`}>
      <MapContainer
        center={TEXAS_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        style={{ height, minHeight: "320px" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showErcotZones &&
          ERCOT_ZONES.map((zone) => (
            <Polygon
              key={zone.name}
              positions={zone.positions}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.2,
                weight: 2,
              }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setStyle({ fillOpacity: 0.35 });
                  e.target.bringToFront();
                },
                mouseout: (e) => {
                  e.target.setStyle({ fillOpacity: 0.2 });
                },
              }}
            >
              <Popup>{zone.name}</Popup>
            </Polygon>
          ))}
        {showFiberBackbone &&
          FIBER_BACKBONE.map((route, i) => (
            <Polyline
              key={`${route.label}-${i}`}
              positions={[route.from, route.to]}
              pathOptions={{
                color: "#0f766e",
                weight: 3,
                opacity: 0.9,
                dashArray: "6 4",
              }}
            >
              <Popup>Fiber omurga: {route.label}</Popup>
            </Polyline>
          ))}
        {CITIES.map((city) => (
          <CircleMarker
            key={city.name}
            center={city.position}
            radius={8}
            pathOptions={{
              color: "#0f172a",
              fillColor: "#f59e0b",
              fillOpacity: 1,
              weight: 2,
            }}
          >
            <Popup>{city.name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="flex flex-wrap gap-4 p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        {showErcotZones && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-sky-400/50 border border-sky-500" aria-hidden />
            ERCOT bölgeleri (kavramsal)
          </span>
        )}
        {showFiberBackbone && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-0.5 border-t-2 border-teal-700 border-dashed" aria-hidden />
            Fiber optik omurga (ana güzergâhlar)
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden />
          Ana şehirler
        </span>
      </div>
    </div>
  );
}
