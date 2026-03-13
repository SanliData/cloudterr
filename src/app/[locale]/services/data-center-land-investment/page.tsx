import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

// Local hero images (Gemini logo cropped via clip-path in wrapper)
const HERO_IMAGE_1 = "/images/data-center-land-hero-1.png";
const HERO_IMAGE_2 = "/images/data-center-land-hero-2.png";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("DataCenterLandInvestment");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/services/data-center-land-investment`,
  });
}

export default async function DataCenterLandInvestmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DataCenterLandInvestment");

  return (
    <>
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
            {t("cta")}
          </Button>
        </Section>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-2xl aspect-video opacity-20 xl:opacity-30"
            style={{ clipPath: "inset(0 72px 72px 0)" }}
          >
            <Image
              src={HERO_IMAGE_2}
              alt={t("heroImageAlt2")}
              fill
              className="object-cover object-left"
              sizes="(max-width: 1280px) 0px, 672px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hero images - full width, Gemini logo cropped via clip-path */}
      <Section className="!py-0">
        <div
          className="relative w-full aspect-[21/9] min-h-[200px] max-h-[360px] rounded-xl overflow-hidden bg-slate-200"
          style={{ clipPath: "inset(0 72px 72px 0)" }}
        >
          <Image
            src={HERO_IMAGE_1}
            alt={t("heroImageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>
        <div
          className="relative w-full aspect-[21/9] min-h-[180px] max-h-[280px] rounded-xl overflow-hidden bg-slate-100 mt-4"
          style={{ clipPath: "inset(0 72px 72px 0)" }}
        >
          <Image
            src={HERO_IMAGE_2}
            alt={t("heroImageAlt2")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
            priority
          />
        </div>
      </Section>

      {/* The Opportunity */}
      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t("opportunityTitle")}
          </h2>
          <p className="text-slate-600 mb-4">{t("opportunityText1")}</p>
          <p className="text-slate-600">{t("opportunityText2")}</p>
        </div>
      </Section>

      {/* Partnership Models */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          {t("partnershipTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              {t("model1Title")}
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("model1a")}</li>
              <li>{t("model1b")}</li>
              <li>{t("model1c")}</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              {t("model2Title")}
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("model2a")}</li>
              <li>{t("model2b")}</li>
              <li>{t("model2c")}</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              {t("model3Title")}
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("model3a")}</li>
              <li>{t("model3b")}</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Development Process */}
      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {t("processTitle")}
          </h2>
          <p className="text-slate-600 mb-4">{t("processSubtitle")}</p>
          <ul className="space-y-2 text-slate-700" role="list">
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process3")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process4")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process5")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-medium" aria-hidden>•</span>
              {t("process6")}
            </li>
          </ul>
        </div>
      </Section>

      {/* Who Should Partner */}
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t("whoTitle")}
          </h2>
          <p className="text-slate-600 mb-4">{t("whoIntro")}</p>
          <ul className="space-y-2 text-slate-700" role="list">
            <li className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>•</span>
              {t("who1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>•</span>
              {t("who2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>•</span>
              {t("who3")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>•</span>
              {t("who4")}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>•</span>
              {t("who5")}
            </li>
          </ul>
          <Button href="/contact" variant="primary" className="mt-8">
            {t("cta")}
          </Button>
        </div>
      </Section>
    </>
  );
}
