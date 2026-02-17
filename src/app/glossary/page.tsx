import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { GlossaryClient } from "@/components/GlossaryClient";
import { allGlossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Fiber Infrastructure Glossary",
  description:
    "Industry terminology and technical reference for U.S. fiber infrastructure construction: backbone, underground, aerial, FTTH, splicing, testing, and compliance standards.",
  openGraph: {
    title: "Fiber Infrastructure Glossary | Cloud Telecommunications",
    description:
      "Technical glossary for fiber infrastructure: OSP, HDD, FTTH, OTDR, 811, ROW, and more.",
  },
};

function GlossarySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Fiber Infrastructure Glossary",
    description:
      "Commonly used technical terminology in U.S. fiber infrastructure construction.",
    hasDefinedTerm: allGlossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: "Fiber Infrastructure Glossary",
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function GlossaryPage() {
  return (
    <>
      <GlossarySchema />
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Fiber Infrastructure Glossary
          </h1>
          <p className="mt-2 text-lg text-slate-600 font-medium">
            Industry Terminology & Technical Reference
          </p>
          <p className="mt-4 text-slate-600">
            This glossary provides commonly used technical terminology in U.S.
            fiber infrastructure construction, including backbone, underground,
            aerial, FTTH, splicing, testing, and compliance standards.
          </p>
        </Section>
      </section>

      <Section>
        <GlossaryClient />
      </Section>
    </>
  );
}
