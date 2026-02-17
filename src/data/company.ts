/**
 * Şirket + liderlik tek export — geriye dönük uyumluluk.
 * Veri kaynağı: veri/marka, veri/sirket, veri/liderlik
 */
import { sirket } from "@/data/veri/sirket";
import { liderlikOzet } from "@/data/veri/liderlik";

export const company = {
  name: sirket.legalName,
  tagline: sirket.tagline,
  description: sirket.description,
  experienceYears: sirket.experienceYears,
  leadership: {
    name: liderlikOzet.ad,
    title: liderlikOzet.unvan,
    experienceYears: liderlikOzet.deneyimYil,
    bio: liderlikOzet.ozet,
  },
  values: sirket.values,
  contact: sirket.contact,
} as const;
