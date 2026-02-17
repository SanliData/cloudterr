"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { glossaryCategories } from "@/data/glossary";

function getFirstLetter(term: string): string {
  const match = term.match(/^[A-Za-z]/);
  return match ? match[0].toUpperCase() : "#";
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GlossaryClient() {
  const [search, setSearch] = useState("");
  const [letterFilter, setLetterFilter] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byLetter = (term: string) =>
      letterFilter === null || getFirstLetter(term) === letterFilter;
    const bySearch = (term: string, def: string) =>
      !q ||
      term.toLowerCase().includes(q) ||
      def.toLowerCase().includes(q);

    return glossaryCategories
      .map((cat) => ({
        ...cat,
        terms: cat.terms.filter(
          (t) => byLetter(t.term) && bySearch(t.term, t.definition)
        ),
      }))
      .filter((cat) => cat.terms.length > 0);
  }, [search, letterFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Search glossary terms"
          />
        </div>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-end">
          <button
            type="button"
            onClick={() => setLetterFilter(null)}
            className={`min-w-[2rem] rounded px-2 py-1 text-sm font-medium transition-colors ${
              letterFilter === null
                ? "bg-accent text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {LETTERS.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setLetterFilter(letter)}
              className={`min-w-[2rem] rounded px-2 py-1 text-sm font-medium transition-colors ${
                letterFilter === letter
                  ? "bg-accent text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <p className="text-slate-600 text-center py-8">
          No terms match your search or filter.
        </p>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-24"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.terms.map((item) => {
                  const id = `${category.id}-${item.term.replace(/\s+/g, "-")}`;
                  const isOpen = openId === id;
                  return (
                    <li
                      key={id}
                      className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : id)}
                        className="w-full flex items-center justify-between gap-4 text-left px-4 py-3 hover:bg-slate-50 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`${id}-def`}
                        id={`${id}-btn`}
                      >
                        <span className="font-medium text-slate-900">
                          {item.term}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        id={`${id}-def`}
                        role="region"
                        aria-labelledby={`${id}-btn`}
                        className={`overflow-hidden transition-all duration-200 ${
                          isOpen ? "max-h-48" : "max-h-0"
                        }`}
                      >
                        <div className="px-4 pb-3 pt-0 text-slate-600 border-t border-slate-100">
                          <p className="pt-3">{item.definition}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
