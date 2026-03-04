"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navKeys = [
  "home",
  "about",
  "capabilities",
  "services",
  "projects",
  "coverage",
  "safetyQuality",
  "internationalCooperation",
  "internetWorld",
  "glossary",
  "careers",
  "contact",
] as const;

const navHrefs: Record<(typeof navKeys)[number], string> = {
  home: "/",
  about: "/about",
  capabilities: "/capabilities",
  services: "/services",
  projects: "/projects",
  coverage: "/coverage",
  safetyQuality: "/safety-quality",
  internationalCooperation: "/international-cooperation",
  internetWorld: "/internet-world",
  glossary: "/glossary",
  careers: "/careers",
  contact: "/contact",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <nav
          className="flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            aria-label={t("homeAria")}
          >
            <Image
              src="/logo.png"
              alt="Cloud Telecommunications – Fiber Infrastructure & Construction"
              width={560}
              height={200}
              className="h-16 md:h-28 lg:h-44 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <ul className="flex items-center gap-8">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={navHrefs[key]}
                    className="text-slate-600 hover:text-accent font-medium transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Button href="/contact" variant="primary" size="sm">
                  {t("requestRfq")}
                </Button>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button href="/contact" variant="primary" size="sm">
              {t("requestRfq")}
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            mobileOpen ? "max-h-[70vh] pb-4" : "max-h-0"
          }`}
          aria-hidden={!mobileOpen}
        >
          <ul className="flex flex-col gap-0 border-t border-slate-200 pt-2 overflow-y-auto max-h-[65vh]">
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={navHrefs[key]}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-2 text-slate-600 hover:text-accent hover:bg-slate-50 font-medium min-h-[44px] flex items-center"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  );
}
