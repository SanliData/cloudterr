/**
 * Marka bilgileri — tek kaynak.
 * Başlık, meta, altbilgi buradan beslenir.
 */
export const marka = {
  publicName: "Cloud Telecommunications",
  legalName: "Cloud Telecommunications",
  slogan: "Altyapı Liderliği. Saha Uygulaması. Kanıtlanmış Deneyim.",
} as const;

export type Marka = typeof marka;
