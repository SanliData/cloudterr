import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

const HERO_IMAGE = "/images/datacenter-energy-optimization.png";
const MODEL_IMAGE = "/images/data-center-energy-optimization-model.png";
const VISUAL_IMAGE = "/images/data-center-energy-optimization-visual.png";
const ENERGY_OPT_IMAGES = [
  "/images/energy-opt-isometric.png",
  "/images/energy-opt-aerial.png",
  "/images/energy-opt-two-systems.png",
  "/images/energy-opt-3d.png",
  "/images/energy-opt-cutaway.png",
];
const ENERGY_VIDEO = "/videos/grok-video-c7ffc9e0-e40d-4ee3-b9a9-78e62fdc48eb.mp4";
const MODEL_VOICEOVER_VIDEO = "/videos/2ff3901d-a0b3-4a11-aa14-b2b4236b17cd.mp4";
const NARRATION_AUDIO = "/audio/energy-optimization-narration.mp3";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("DataCenterEnergyOptimization");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: `/${locale}/services/data-center-energy-optimization`,
  });
}

export default async function DataCenterEnergyOptimizationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DataCenterEnergyOptimization");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28 overflow-hidden">
        <Section containerClassName="max-w-3xl relative z-10">
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

      {/* Hero graphic - full width */}
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

      {/* The Challenge */}
      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t("challengeTitle")}
          </h2>
          <p className="text-slate-600 mb-4">{t("challengeText1")}</p>
          <p className="text-slate-600">{t("challengeText2")}</p>
        </div>
      </Section>

      {/* Narration — listen to overview */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {t("narrationTitle")}
        </h2>
        <div className="max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-6">
          <audio
            src={NARRATION_AUDIO}
            controls
            className="w-full max-w-md"
            aria-label={t("narrationTitle")}
          >
            Your browser does not support the audio element.
          </audio>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed" role="region" aria-label="Transcript">
            {t("narrationTranscript")}
          </p>
        </div>
      </Section>

      {/* Model visualization — two optimization systems */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {t("modelTitle")}
        </h2>
        <div className="relative w-full aspect-video max-h-[500px] rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={MODEL_IMAGE}
            alt={t("modelImageAlt")}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          />
        </div>
        <p className="mt-3 text-center text-sm font-medium text-slate-600">
          {t("modelCaption")}
        </p>

        <div className="mt-8 relative w-full aspect-video max-h-[500px] rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={VISUAL_IMAGE}
            alt={t("modelImageAlt")}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          />
        </div>

        {/* Additional visualizations gallery */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{t("moreVisualsTitle")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENERGY_OPT_IMAGES.map((src, i) => (
              <div key={src} className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={src}
                  alt={t("modelImageAlt")}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Voiceover video — how the model improves energy efficiency */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("modelVoiceoverVideoTitle")}</h3>
          <div className="relative w-full aspect-video max-h-[480px] rounded-xl overflow-hidden bg-slate-900">
            <video
              src={MODEL_VOICEOVER_VIDEO}
              controls
              playsInline
              className="w-full h-full object-contain"
              aria-label={t("modelVoiceoverVideoTitle")}
              title={t("modelVoiceoverVideoCaption")}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-2 text-center text-sm text-slate-600">{t("modelVoiceoverVideoCaption")}</p>
        </div>

        {/* Video */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("videoTitle")}</h3>
          <div className="relative w-full aspect-video max-h-[480px] rounded-xl overflow-hidden bg-slate-900">
            <video
              src={ENERGY_VIDEO}
              controls
              playsInline
              className="w-full h-full object-contain"
              aria-label={t("videoTitle")}
              title={t("videoCaption")}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-2 text-center text-sm text-slate-600">{t("videoCaption")}</p>
        </div>
      </Section>

      {/* Solution 1 */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("solution1Title")}
        </h2>
        <div className="max-w-3xl space-y-4 text-slate-600 mb-6">
          <p>{t("solution1Text1")}</p>
          <p>{t("solution1Text2")}</p>
          <p>{t("solution1Text3")}</p>
        </div>
        <ul className="flex flex-wrap gap-2 text-slate-700" role="list">
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution1Benefit1")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution1Benefit2")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution1Benefit3")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution1Benefit4")}
          </li>
        </ul>
      </Section>

      {/* Solution 2 */}
      <Section className="bg-slate-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("solution2Title")}
        </h2>
        <div className="max-w-3xl space-y-4 text-slate-600 mb-6">
          <p>{t("solution2Text1")}</p>
          <p>{t("solution2Text2")}</p>
          <p>{t("solution2Text3")}</p>
        </div>
        <ul className="flex flex-wrap gap-2 text-slate-700" role="list">
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution2Benefit1")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution2Benefit2")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution2Benefit3")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent font-medium" aria-hidden>•</span>
            {t("solution2Benefit4")}
          </li>
        </ul>
      </Section>

      {/* Benefits */}
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          {t("benefitsTitle")}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-700" role="list">
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden>•</span>
            {t("benefit1")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden>•</span>
            {t("benefit2")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden>•</span>
            {t("benefit3")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden>•</span>
            {t("benefit4")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden>•</span>
            {t("benefit5")}
          </li>
        </ul>
        <Button href="/contact" variant="primary" className="mt-8">
          {t("cta")}
        </Button>
      </Section>
    </>
  );
}
