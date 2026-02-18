import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { footerSections } from "@/data/nav";
import { company } from "@/data/company";
import { marka } from "@/data/veri/marka";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
              aria-label="Cloud Telecommunications – Home"
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
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-accent"
                    >
                      {link.label}
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
          <span>© {new Date().getFullYear()} {marka.legalName}. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
