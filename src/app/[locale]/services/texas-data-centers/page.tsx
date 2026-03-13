import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TexasInfrastructureMap } from "@/components/TexasInfrastructureMap";
import { buildMetadata } from "@/lib/seo";

const HERO_IMAGE = "/images/data-center-land-hero-1.png";
const baseUrl = "https://www.cloudtelc.com";

/** Schema from docs/seo-data.json — Texas "Expert" positioning for Google */
const TEXAS_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Data Center Infrastructure & Development",
  provider: {
    "@type": "Organization",
    name: "CloudTelc",
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
    },
  },
  areaServed: "Texas, USA",
  description:
    "Specializing in the 48GW expansion of Texas's data center market, focusing on power, fiber, and site preparation.",
};

type Props = { params: Promise<{ locale: string }> };

function TexasDataCentersSchema({
  faq,
}: {
  faq: { question: string; answer: string }[];
}) {
  const serviceSchema = TEXAS_SERVICE_SCHEMA;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("TexasDataCenters");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/services/texas-data-centers`,
  });
}

export default async function TexasDataCentersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TexasDataCenters");

  const faq = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
  ];

  return (
    <>
      <TexasDataCentersSchema faq={faq} />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28">
        <Section containerClassName="max-w-3xl">
          <Link
            href="/services"
            className="text-slate-300 hover:text-white font-medium text-sm"
          >
            {t("backToServices")}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight mt-2">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            {t("heroSubtitle")}
          </p>
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="mt-10 bg-accent hover:bg-accent/90 text-white"
          >
            {t("ctaButton")}
          </Button>
        </Section>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-2xl aspect-video opacity-20 xl:opacity-30">
            <Image
              src={HERO_IMAGE}
              alt={t("heroImageAlt")}
              fill
              className="object-cover object-left"
              sizes="(max-width: 1280px) 0px, 672px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hero image - full width, alt per SEO format */}
      <Section className="!py-0">
        <div className="relative w-full aspect-[21/9] min-h-[200px] max-h-[360px] rounded-xl overflow-hidden bg-slate-200">
          <Image
            src={HERO_IMAGE}
            alt={t("heroImageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>
      </Section>

      {/* Texas by the Numbers: 2026 Projections — SEO content section */}
      <Section className="bg-slate-50" aria-labelledby="texas-stats">
        <h2 id="texas-stats" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("statsTitle")}
        </h2>
        <ul className="space-y-3 text-slate-700 max-w-3xl" role="list">
          <li className="flex items-start gap-2">
            <span className="text-accent font-medium shrink-0" aria-hidden>•</span>
            {t("statTotalCapacity")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-medium shrink-0" aria-hidden>•</span>
            {t("statMarketDominance")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-medium shrink-0" aria-hidden>•</span>
            {t("statEnergyOutlook")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-medium shrink-0" aria-hidden>•</span>
            {t("statEconomicImpact")}
          </li>
        </ul>
      </Section>

      {/* Interactive map: ERCOT zones + fiber backbone */}
      <Section aria-labelledby="texas-map-heading">
        <h2 id="texas-map-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {t("mapTitle")}
        </h2>
        <p className="text-slate-600 mb-4 max-w-2xl">{t("mapCaption")}</p>
        <TexasInfrastructureMap height="420px" className="w-full" />
      </Section>

      {/* Regional Infrastructure Specialization — H2 + articles */}
      <Section aria-labelledby="texas-regions">
        <h2 id="texas-regions" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          {t("regionsTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("regionDallasTitle")}</h3>
            <p className="text-slate-600 text-sm">{t("regionDallasText")}</p>
          </article>
          <article>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("regionHoustonSanAntonioTitle")}</h3>
            <p className="text-slate-600 text-sm">{t("regionHoustonSanAntonioText")}</p>
          </article>
        </div>
      </Section>

      {/* FAQ - ERCOT, water, tax incentives */}
      <Section className="bg-slate-50" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("faqTitle")}
        </h2>
        <dl className="space-y-6 max-w-3xl">
          {faq.map((item, i) => (
            <div key={i}>
              <dt className="text-lg font-semibold text-slate-900">{item.question}</dt>
              <dd className="mt-2 text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* CTA - Conversion-focused */}
      <Section>
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-slate-600 mb-6">{t("ctaText")}</p>
          <Button href="/contact" variant="primary" size="lg">
            {t("ctaButton")}
          </Button>
        </div>
      </Section>
    </>
  );
}
