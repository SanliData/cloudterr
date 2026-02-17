import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { footerSections } from "@/data/nav";
import { company } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
              aria-label="Cloud Communication LLC – Home"
            >
              <Image
                src="/logo.png"
                alt="Cloud Communication LLC – Fiber Infrastructure & Construction"
                width={200}
                height={72}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-2 text-sm text-slate-600">
              Fiber infrastructure & construction. Dallas/DFW and Texas expansion.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {company.contact.email}
            </p>
            <p className="text-sm text-slate-600">{company.contact.phone}</p>
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
        <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Cloud Communication LLC. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
