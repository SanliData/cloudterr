"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            aria-label="Cloud Communication LLC – Ana sayfa"
          >
            <Image
              src="/logo.png"
              alt="Cloud Communication LLC – Fiber Infrastructure & Construction"
              width={280}
              height={100}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 hover:text-accent font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button href="/contact" variant="primary" size="sm">
                Request RFQ
              </Button>
            </li>
          </ul>
          <div className="flex items-center gap-2 md:hidden">
            <Button href="/contact" variant="primary" size="sm">
              Request RFQ
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            mobileOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
          aria-hidden={!mobileOpen}
        >
          <ul className="flex flex-col gap-2 border-t border-slate-200 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-slate-600 hover:text-accent font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  );
}
