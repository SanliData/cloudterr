import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

const HERO_IMAGE = "/images/turnkey-hyperscale-campus-liquid.png";
const CAMPUS_GEOTHERMAL_IMAGE = "/images/turnkey-hyperscale-campus-geothermal.png";
const OPERATIONS_INTERIOR_IMAGE = "/images/data-center-operations-interior.png";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("TurnkeyDataCenter");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/services/turnkey-data-center-development`,
  });
}

export default async function TurnkeyDataCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TurnkeyDataCenter");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28 overflow-hidden">
        <Section containerClassName="max-w-3xl relative z-10">
          <Link href="/services" className="text-slate-300 hover:text-white font-medium text-sm">
            {t("backToServices")}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight mt-2">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            {t("heroSubtitle")}
          </p>
          <Button href="/contact" variant="primary" size="lg" className="mt-10 bg-accent hover:bg-accent/90 text-white">
            {t("cta")}
          </Button>
        </Section>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-full max-w-3xl aspect-video opacity-25 xl:opacity-35">
            <Image
              src={HERO_IMAGE}
              alt={t("heroImageAlt")}
              fill
              className="object-cover object-right-bottom"
              sizes="(max-width: 1280px) 0px, 672px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hero graphic */}
      <Section className="!py-0">
        <div className="relative w-full aspect-video max-h-[420px] rounded-xl overflow-hidden bg-slate-200">
          <Image src={HERO_IMAGE} alt={t("heroImageAlt")} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" priority />
        </div>
      </Section>

      {/* Second campus visual — geothermal / power / fiber */}
      <Section className="!py-0">
        <div className="relative w-full aspect-video max-h-[400px] rounded-xl overflow-hidden bg-slate-100">
          <Image src={CAMPUS_GEOTHERMAL_IMAGE} alt={t("campusGeothermalAlt")} fill className="object-contain object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" />
        </div>
      </Section>

      {/* Full Lifecycle Development */}
      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t("lifecycleTitle")}
          </h2>
          <p className="text-slate-600 mb-4">{t("lifecycleText1")}</p>
          <p className="text-slate-600 mb-6">{t("lifecycleText2")}</p>
          <ul className="space-y-2 text-slate-700" role="list">
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle1")}</li>
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle2")}</li>
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle3")}</li>
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle4")}</li>
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle5")}</li>
            <li className="flex items-center gap-2"><span className="text-accent font-medium" aria-hidden>•</span>{t("lifecycle6")}</li>
          </ul>
        </div>
      </Section>

      {/* Operations / facility interior */}
      <Section className="!py-0">
        <div className="relative w-full aspect-[21/9] max-h-[380px] rounded-xl overflow-hidden bg-slate-200">
          <Image src={OPERATIONS_INTERIOR_IMAGE} alt={t("operationsInteriorAlt")} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" />
        </div>
      </Section>

      {/* Development Capabilities */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          {t("capabilitiesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{t("siteDevTitle")}</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("siteDev1")}</li>
              <li>{t("siteDev2")}</li>
              <li>{t("siteDev3")}</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{t("powerTitle")}</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("power1")}</li>
              <li>{t("power2")}</li>
              <li>{t("power3")}</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{t("coolingTitle")}</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("cooling1")}</li>
              <li>{t("cooling2")}</li>
              <li>{t("cooling3")}</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{t("fiberTitle")}</h3>
            <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside">
              <li>{t("fiber1")}</li>
              <li>{t("fiber2")}</li>
              <li>{t("fiber3")}</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Deployment Models */}
      <Section className="bg-slate-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("deploymentTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("model1Title")}</h3>
            <p className="text-slate-600 text-sm">{t("model1Text")}</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("model2Title")}</h3>
            <p className="text-slate-600 text-sm">{t("model2Text")}</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("model3Title")}</h3>
            <p className="text-slate-600 text-sm">{t("model3Text")}</p>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t("model5Title")}</h3>
            <p className="text-slate-600 text-sm">{t("model5Text")}</p>
          </Card>
        </div>
      </Section>

      {/* Target Clients */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {t("targetTitle")}
        </h2>
        <p className="text-slate-600 mb-4">{t("targetIntro")}</p>
        <ul className="space-y-2 text-slate-700" role="list">
          <li className="flex items-center gap-2"><span className="text-accent" aria-hidden>•</span>{t("target1")}</li>
          <li className="flex items-center gap-2"><span className="text-accent" aria-hidden>•</span>{t("target2")}</li>
          <li className="flex items-center gap-2"><span className="text-accent" aria-hidden>•</span>{t("target3")}</li>
          <li className="flex items-center gap-2"><span className="text-accent" aria-hidden>•</span>{t("target4")}</li>
          <li className="flex items-center gap-2"><span className="text-accent" aria-hidden>•</span>{t("target5")}</li>
        </ul>
        <Button href="/contact" variant="primary" className="mt-8">
          {t("cta")}
        </Button>
      </Section>
    </>
  );
}
