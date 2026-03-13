import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { LandEvaluationForm } from "@/components/forms/LandEvaluationForm";

const HERO_IMAGE = "/images/texas-data-center-land-hero.png";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("LandEvaluation");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/land-evaluation`,
  });
}

export default async function LandEvaluationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LandEvaluation");

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <Section containerClassName="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{t("heroTitle")}</h1>
          <p className="mt-4 text-lg text-slate-600">{t("heroSubtitle")}</p>
          <Button href="#form" variant="primary" size="lg" className="mt-6">
            {t("cta")}
          </Button>
        </Section>
      </section>

      <Section className="!py-0">
        <div className="relative w-full aspect-video max-h-[420px] rounded-xl overflow-hidden bg-slate-200">
          <Image
            src={HERO_IMAGE}
            alt={t("heroImageAlt")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{t("whatWeEvaluateTitle")}</h2>
            <ul className="space-y-2 text-slate-600 mb-8" role="list">
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("eval1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("eval2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("eval3")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("eval4")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-medium" aria-hidden>•</span>
                {t("eval5")}
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t("whoShouldApplyTitle")}</h2>
            <p className="text-slate-600 mb-4">{t("whoShouldApplyText")}</p>
            <ul className="space-y-2 text-slate-700 mb-8" role="list">
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>•</span>
                {t("qualify1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>•</span>
                {t("qualify2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>•</span>
                {t("qualify3")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>•</span>
                {t("qualify4")}
              </li>
            </ul>
          </div>
          <div id="form" className="lg:col-span-1 scroll-mt-6">
            <div className="sticky top-6 p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">{t("cta")}</h2>
              <LandEvaluationForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
