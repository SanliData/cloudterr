/**
 * Veri katmanı — tek giriş noktası.
 * Marka, şirket, liderlik, hizmetler buradan export edilir.
 */
export { marka } from "./marka";
export { sirket } from "./sirket";
export {
  liderlikZamanCizelgesi,
  liderlikOzet,
  type LiderlikZamanCizelgesiItem,
} from "./liderlik";
export { hizmetlerListe } from "./hizmetler";
export {
  companyOverview,
  coreCompetencies,
  differentiators,
  leadership,
  companyData,
} from "./capabilities";
