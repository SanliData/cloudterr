"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { marka } from "@/data/veri/marka";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const footerStructure = [
  {
    titleKey: "services" as const,
    links: [
      { href: "/services", labelKey: "overview" as const },
      { href: "/services/backbone-longhaul", labelKey: "backboneLonghaul" as const },
      { href: "/services/data-center", labelKey: "dataCenter" as const },
      { href: "/services/ftth-fttp", labelKey: "ftthFttp" as const },
      { href: "/services/aerial", labelKey: "aerial" as const },
      { href: "/services/underground", labelKey: "underground" as const },
      { href: "/services/splicing-testing", labelKey: "splicingTesting" as const },
      { href: "/services/restoration-closeout", labelKey: "restorationCloseout" as const },
    ],
  },
  {
    titleKey: "company" as const,
    links: [
      { href: "/about", labelKey: "about" as const },
      { href: "/capabilities", labelKey: "capabilities" as const },
      { href: "/projects", labelKey: "projects" as const },
      { href: "/coverage", labelKey: "coverage" as const },
      { href: "/safety-quality", labelKey: "safetyQuality" as const },
      { href: "/international-cooperation", labelKey: "internationalCooperation" as const },
      { href: "/internet-world", labelKey: "internetWorld" as const },
      { href: "/glossary", labelKey: "glossary" as const },
      { href: "/careers", labelKey: "careers" as const },
      { href: "/contact", labelKey: "contact" as const },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const tCommon = useTranslations("Common");

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
              aria-label={t("homeAria")}
            >
              <Image
                src="/logo.png"
                alt="Cloud Telecommunications"
                width={320}
                height={115}
                className="h-24 sm:h-28 w-auto object-contain"
              />
            </Link>
          </div>
          {footerStructure.map((section) => (
            <div key={section.titleKey}>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                {tFooter(section.titleKey)}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-accent"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <a href={`tel:${company.contact.phone.replace(/\D/g, "")}`} className="hover:text-accent">
              {company.contact.phone}
            </a>
            <a href={`mailto:${company.contact.email}`} className="hover:text-accent">
              {company.contact.email}
            </a>
          </div>
          <span>© {new Date().getFullYear()} {marka.legalName}. {tCommon("allRightsReserved")}</span>
        </div>
      </Container>
    </footer>
  );
}
