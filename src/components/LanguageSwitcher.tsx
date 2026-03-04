"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

const locales = [
  { code: "en" as const, label: "EN", flag: "🇺🇸", title: "English (USA)" },
  { code: "de" as const, label: "DE", flag: "🇩🇪", title: "Deutsch" },
  { code: "tr" as const, label: "TR", flag: "🇹🇷", title: "Türkçe" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      {locales.map((loc) => {
        const isActive = locale === loc.code;
        return (
          <Link
            key={loc.code}
            href={pathname || "/"}
            locale={loc.code}
            className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              isActive
                ? "bg-accent text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            title={loc.title}
            aria-label={loc.title}
            aria-current={isActive ? "true" : undefined}
          >
            <span aria-hidden>{loc.flag}</span>
          </Link>
        );
      })}
    </div>
  );
}
