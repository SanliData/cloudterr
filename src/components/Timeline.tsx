"use client";

import { liderlikZamanCizelgesi, type LiderlikZamanCizelgesiItem } from "@/data/veri/liderlik";

function TimelineItem({ item, isLast }: { item: LiderlikZamanCizelgesiItem; isLast: boolean }) {
  return (
    <li className="relative flex gap-6">
      {!isLast && (
        <span
          className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-slate-200"
          aria-hidden
        />
      )}
      <span
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white"
        aria-hidden
      >
        {item.yil}
      </span>
      <div className="pb-10">
        <p className="font-semibold text-slate-900">{item.baslik}</p>
        <p className="mt-1 text-sm text-slate-600">{item.aciklama}</p>
      </div>
    </li>
  );
}

export function Timeline() {
  return (
    <ul className="space-y-0" role="list">
      {liderlikZamanCizelgesi.map((item, i) => (
        <TimelineItem
          key={`${item.yil}-${i}`}
          item={item}
          isLast={i === liderlikZamanCizelgesi.length - 1}
        />
      ))}
    </ul>
  );
}
