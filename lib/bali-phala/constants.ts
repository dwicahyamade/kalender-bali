/**
 * Balinese Calendar Constants (Bali-Phala / Pawukon System)
 *
 * Reference Date: January 1, 2000 (Saturday)
 * Verified from kalenderbali.org:
 *   Saptawara: Saniscara (index 6)
 *   Pancawara: Umanis   (index 0)
 *   Wuku:      Sungsang  (index 9)
 *   Triwara:   Pasah     (index 0)
 *   Sadwara:   Paniron   (index 3)
 */

// ============================================================
// WEWARAN (Concurrent Week Cycles)
// ============================================================

export const WEWARAN = {
  eka: ["Luang"],
  dwi: ["Menga", "Pepet"],
  tri: ["Pasah", "Beteng", "Kajeng"],
  catur: ["Sri", "Laba", "Jaya", "Menala"],
  panca: ["Umanis", "Paing", "Pon", "Wage", "Kliwon"],
  sad: ["Tungleh", "Aryang", "Urukung", "Paniron", "Was", "Maulu"],
  sapta: ["Redite", "Soma", "Anggara", "Buda", "Wrespati", "Sukra", "Saniscara"],
  asta: ["Sri", "Indra", "Guru", "Yama", "Ludra", "Brahma", "Kala", "Uma"],
  sanga: ["Dangu", "Jangur", "Gigis", "Nohan", "Ogan", "Erangan", "Urungan", "Tulus", "Dadi"],
  dasa: ["Pandita", "Pati", "Suka", "Duka", "Sri", "Manuh", "Manusa", "Raja", "Dewa", "Raksasa"]
};

// ============================================================
// URIP VALUES (Spiritual values used for calculating Ekawara, Dwiwara, Dasawara)
// ============================================================

export const URIP_SAPTA: Record<string, number> = {
  Redite: 5,
  Soma: 4,
  Anggara: 3,
  Buda: 7,
  Wrespati: 8,
  Sukra: 6,
  Saniscara: 9,
};

export const URIP_PANCA: Record<string, number> = {
  Umanis: 5,
  Paing: 9,
  Pon: 7,
  Wage: 4,
  Kliwon: 8,
};

// ============================================================
// WUKU (30 weeks of 7 days = 210-day Pawukon cycle)
// ============================================================

export const WUKU = [
  "Sinta", "Landep", "Ukir", "Kulantir", "Tolu", "Gumbreg",
  "Wariga", "Warigadean", "Julungwangi", "Sungsang", "Dungulan", "Kuningan",
  "Langkir", "Medangsia", "Pujut", "Pahang", "Krulut", "Merakih",
  "Tambir", "Medangkungan", "Matal", "Uye", "Menail", "Prangbakat",
  "Bala", "Ugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
];

// ============================================================
// SASIH (Balinese Lunar Months)
// ============================================================

export const SASIH = [
  "Kasa", "Karo", "Katiga", "Kapat", "Kalima", "Kanem",
  "Kapitu", "Kawulu", "Kasanga", "Kadasa", "Jiyestha", "Sadha"
];

// ============================================================
// REFERENCE DATE & HELPER
// ============================================================

// Reference: 2000-01-01 = Saniscara(6) Umanis(0) Sungsang(9) Pasah
const REF_DATE = new Date(2000, 0, 1);

export function getDaysSinceRef(targetDate: Date): number {
  // Normalize both dates to midnight to avoid DST/timezone issues
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const ref = new Date(REF_DATE.getFullYear(), REF_DATE.getMonth(), REF_DATE.getDate());
  const diffTime = target.getTime() - ref.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================================
// TYPE
// ============================================================

export type BalineseDate = {
  dateMasehi: string;
  wuku: string;
  saptawara: string;
  pancawara: string;
  triwara: string;
  sadwara: string;
  ekawara: string;
  dwiwara: string;
  caturwara: string;
  astawara: string;
  sangawara: string;
  dasawara: string;
  yearSaka: number;
  holiday: string | null;
};
