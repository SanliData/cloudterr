/**
 * Liderlik zaman çizelgesi — veri sürücülü.
 * Timeline bileşeni bu veriyi kullanır.
 */
export interface LiderlikZamanCizelgesiItem {
  yil: number;
  baslik: string;
  aciklama: string;
}

export const liderlikZamanCizelgesi: LiderlikZamanCizelgesiItem[] = [
  {
    yil: 1977,
    baslik: "OSP Supervisor",
    aciklama:
      "On-Site Installation (OSP) Supervisor — cable installation, network expansion, and commissioning of critical telecommunications infrastructure. Outdoor installation construction, field teams.",
  },
  {
    yil: 1985,
    baslik: "Large-scale operations",
    aciklama:
      "Experience expanded through large-scale operations, contractor supervision, and complex infrastructure environments. Disciplined on-site management, operational accountability.",
  },
  {
    yil: 1995,
    baslik: "Security & infrastructure leadership",
    aciklama:
      "Security leadership and complex infrastructure environments. Core principles: on-site management, operational accountability, on-site results.",
  },
  {
    yil: 2010,
    baslik: "Operational foundation",
    aciklama:
      "Principles established in 1977 continue to define approach: on-site leadership, infrastructure precision, security-focused implementation, contractor and team discipline, budget and timeline control.",
  },
  {
    yil: 2020,
    baslik: "Cloud Telecommunications",
    aciklama:
      "Continuation of an infrastructure career proven in the field for over forty years. Not a theoretical telecommunications venture — operational foundation proven on-site.",
  },
];

export const liderlikOzet = {
  ad: "Terry Dickman",
  unvan: "General Manager / Founder",
  deneyimYil: 45,
  ozet:
    "The Leadership Journey: From Outdoor Installation Supervisor to Founder of Cloud Telecommunications. Terry Dickman's infrastructure career began in 1977 as an On-Site Installation (OSP) Supervisor, overseeing field teams responsible for cable installation, network expansion, and commissioning of critical telecommunications infrastructure. This journey, starting with outdoor installation construction, evolved into a lifelong commitment to on-site focused infrastructure implementation. Over the decades, his experience expanded through large-scale operations, contractor supervision, security leadership, and complex infrastructure environments. However, the core principles remained unchanged: disciplined on-site management, operational accountability, and on-site results. Today, that same operational foundation continues through Cloud Telecommunications; the principles established in 1977 still define the company's approach: On-site leadership, infrastructure precision, security-focused implementation, contractor and team discipline, and budget and timeline control. Cloud Telecommunications is not a theoretical telecommunications venture. It is the continuation of an infrastructure career proven in the field for over forty years.",
} as const;
