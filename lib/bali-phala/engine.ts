import {
  WEWARAN, WUKU, URIP_SAPTA, URIP_PANCA,
  getDaysSinceRef, type BalineseDate
} from "./constants";

// ============================================================
// MAIN FUNCTION: Get Balinese date for any Gregorian date
// ============================================================

export function getBalineseDate(targetDate: Date): BalineseDate {
  const daysSinceRef = getDaysSinceRef(targetDate);

  // -- Position within the 210-day Pawukon cycle (0-209) --
  // Reference (2000-01-01) = Sungsang(9) day 6 (Saniscara = 7th day of wuku week)
  // Accumulation: (9 * 7) + 6 = 69
  const dayInPawukon = (((daysSinceRef + 69) % 210) + 210) % 210;

  // 1. Wuku (30 wuku × 7 days = 210)
  const wukuIndex = Math.floor(dayInPawukon / 7);
  const wukuName = WUKU[wukuIndex];

  // 2. Saptawara (7-day cycle)
  // Ref was Saniscara (index 6)
  const saptaIndex = ((daysSinceRef % 7) + 7 + 6) % 7;
  const saptaName = WEWARAN.sapta[saptaIndex];

  // 3. Pancawara (5-day cycle)
  // Ref was Umanis (index 0)
  const pancaIndex = ((daysSinceRef % 5) + 5 + 0) % 5;
  const pancaName = WEWARAN.panca[pancaIndex];

  // 4. Sadwara (6-day cycle) — simple modulo, 6 divides 210 evenly (35×6)
  // Ref (2000-01-01) was Paniron (index 3)
  const sadIndex = ((daysSinceRef % 6) + 6 + 3) % 6;
  const sadName = WEWARAN.sad[sadIndex];

  // 5. Triwara — simple cycle, 3 divides 210 evenly (70 repetitions)
  // dayInPawukon 0 = Pasah (first day of pawukon cycle)
  const triIndex = dayInPawukon % 3;
  const triName = WEWARAN.tri[triIndex];

  // 6. Caturwara (4-day cycle with leap at day 71-73)
  // Days 71, 72, 73 (0-indexed: 70, 71, 72) repeat the value of day 70
  let caturIndex: number;
  if (dayInPawukon < 71) {
    caturIndex = dayInPawukon % 4;
  } else {
    caturIndex = (dayInPawukon - 3) % 4;
  }
  const caturName = WEWARAN.catur[caturIndex];

  // 7. Astawara (8-day cycle with leap at day 71-73)
  // Same leap insertion point as caturwara
  let astaIndex: number;
  if (dayInPawukon < 71) {
    astaIndex = dayInPawukon % 8;
  } else {
    astaIndex = (dayInPawukon - 3) % 8;
  }
  const astaName = WEWARAN.asta[astaIndex];

  // 8. Sangawara (9-day cycle with leap at start)
  // Days 0-3 (first 4 days) are all "Dangu", then regular cycle from day 4
  let sangaIndex: number;
  if (dayInPawukon < 4) {
    sangaIndex = 0; // Dangu
  } else {
    sangaIndex = (dayInPawukon - 3) % 9;
  }
  const sangaName = WEWARAN.sanga[sangaIndex];

  // 9. Ekawara & Dwiwara (derived from urip values)
  const uripSapta = URIP_SAPTA[saptaName];
  const uripPanca = URIP_PANCA[pancaName];
  let uripSum = uripSapta + uripPanca + 1;
  if (uripSum > 10) uripSum -= 10;
  const isOdd = uripSum % 2 !== 0;
  const ekaName = isOdd ? "Luang" : "-";
  const dwiName = isOdd ? "Menga" : "Pepet";

  // 10. Dasawara (derived from urip values)
  const dasaCalc = (uripSapta + uripPanca) % 10;
  const dasaName = WEWARAN.dasa[dasaCalc];

  // 11. Saka Year (Transitions at Nyepi)
  const gregorianYear = targetDate.getFullYear();
  let yearSaka = gregorianYear - 78;
  const nyepiDateStr = NYEPI_DATES[gregorianYear];
  if (nyepiDateStr) {
    const [nyYear, nyMonth, nyDay] = nyepiDateStr.split("-").map(Number);
    const nyDateLocal = new Date(nyYear, nyMonth - 1, nyDay);
    const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    if (targetMidnight < nyDateLocal) {
      yearSaka -= 1;
    }
  }

  // 12. Holiday Detection (Rerainan)
  const holiday = getHoliday(saptaName, pancaName, wukuName, triName, targetDate);

  return {
    dateMasehi: targetDate.toLocaleDateString("id-ID"),
    saptawara: saptaName,
    pancawara: pancaName,
    wuku: wukuName,
    triwara: triName,
    sadwara: sadName,
    ekawara: ekaName,
    dwiwara: dwiName,
    caturwara: caturName,
    astawara: astaName,
    sangawara: sangaName,
    dasawara: dasaName,
    yearSaka: yearSaka,
    holiday: holiday,
  };
}

// ============================================================
// NYEPI DATES (Lunar-based, must be hardcoded)
// ============================================================

const NYEPI_DATES: Record<number, string> = {
  2000: "2000-04-04",
  2001: "2001-03-25",
  2002: "2002-03-13",
  2003: "2003-04-02",
  2004: "2004-03-22",
  2005: "2005-03-11",
  2006: "2006-03-30",
  2007: "2007-03-19",
  2008: "2008-03-07",
  2009: "2009-03-26",
  2010: "2010-03-16",
  2011: "2011-03-05",
  2012: "2012-03-23",
  2013: "2013-03-12",
  2014: "2014-03-31",
  2015: "2015-03-21",
  2016: "2016-03-09",
  2017: "2017-03-28",
  2018: "2018-03-17",
  2019: "2019-03-07",
  2020: "2020-03-25",
  2021: "2021-03-14",
  2022: "2022-03-03",
  2023: "2023-03-22",
  2024: "2024-03-11",
  2025: "2025-03-29",
  2026: "2026-03-19",
  2027: "2027-03-08",
  2028: "2028-03-27",
  2029: "2029-03-16",
  2030: "2030-03-06",
};

// ============================================================
// HOLIDAY DETECTION (Rerainan / Rahinan)
// ============================================================

export function getHoliday(
  sapta: string,
  panca: string,
  wuku: string,
  tri: string,
  targetDate: Date
): string | null {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const localDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // --- A. Nyepi (Lunar-based, hardcoded) ---
  if (NYEPI_DATES[year] === localDateStr) return "Hari Raya Nyepi";

  // --- B. Major Pawukon holidays (210-day cycle) ---

  // Saraswati: Saniscara Umanis Watugunung
  if (wuku === "Watugunung" && sapta === "Saniscara" && panca === "Umanis") return "Saraswati";

  // Banyu Pinaruh: Redite Paing Sinta (day after Saraswati / first day of new pawukon)
  if (wuku === "Sinta" && sapta === "Redite" && panca === "Paing") return "Banyu Pinaruh";

  // Soma Ribek: Soma Pon Sinta
  if (wuku === "Sinta" && sapta === "Soma" && panca === "Pon") return "Soma Ribek";

  // Sabuh Mas: Anggara Wage Sinta
  if (wuku === "Sinta" && sapta === "Anggara" && panca === "Wage") return "Sabuh Mas";

  // Pagerwesi: Buda Kliwon Sinta
  if (wuku === "Sinta" && sapta === "Buda" && panca === "Kliwon") return "Pagerwesi";

  // Galungan: Buda Kliwon Dungulan
  if (wuku === "Dungulan" && sapta === "Buda" && panca === "Kliwon") return "Galungan";

  // Manis Galungan: Wrespati Umanis Dungulan (day after Galungan)
  if (wuku === "Dungulan" && sapta === "Wrespati" && panca === "Umanis") return "Manis Galungan";

  // Kuningan: Saniscara Kliwon Kuningan
  if (wuku === "Kuningan" && sapta === "Saniscara" && panca === "Kliwon") return "Kuningan";

  // Manis Kuningan: Redite Umanis Langkir (day after Kuningan)
  if (wuku === "Langkir" && sapta === "Redite" && panca === "Umanis") return "Manis Kuningan";

  // Penampahan Galungan: Anggara Wage Dungulan (day before Galungan)
  if (wuku === "Dungulan" && sapta === "Anggara" && panca === "Wage") return "Penampahan Galungan";

  // Penyekeban: Redite Pon Dungulan (3 days before Galungan)
  if (wuku === "Dungulan" && sapta === "Redite" && panca === "Pon") return "Penyekeban";

  // Penyajaan: Soma Wage Dungulan (2 days before Galungan)
  if (wuku === "Dungulan" && sapta === "Soma" && panca === "Wage") return "Penyajaan";

  // Sugihan Jawa: Sukra Kliwon Sungsang
  if (wuku === "Sungsang" && sapta === "Sukra" && panca === "Kliwon") return "Sugihan Jawa";

  // Sugihan Bali: Saniscara Umanis Sungsang
  if (wuku === "Sungsang" && sapta === "Saniscara" && panca === "Umanis") return "Sugihan Bali";

  // --- C. Tumpek: ALL Saniscara Kliwon ---
  if (sapta === "Saniscara" && panca === "Kliwon") {
    if (wuku === "Landep") return "Tumpek Landep";
    if (wuku === "Wariga") return "Tumpek Wariga (Uduh)";
    if (wuku === "Kuningan") return "Tumpek Kuningan";
    if (wuku === "Krulut") return "Tumpek Krulut";
    if (wuku === "Uye") return "Tumpek Uye (Kandang)";
    if (wuku === "Wayang") return "Tumpek Wayang";
    return "Tumpek";
  }

  // --- D. Recurring Rarahinan ---
  // Kajeng Kliwon: every 15 days
  if (tri === "Kajeng" && panca === "Kliwon") return "Kajeng Kliwon";

  // Anggara Kasih: Anggara Kliwon
  if (sapta === "Anggara" && panca === "Kliwon") return "Anggara Kasih";

  // Buda Kliwon (generic, after specific wuku checks)
  if (sapta === "Buda" && panca === "Kliwon") return "Buda Kliwon";

  // Buda Wage (Buda Cemeng)
  if (sapta === "Buda" && panca === "Wage") return "Buda Wage";

  return null;
}

// ============================================================
// DEWASA AYU (Auspicious Date Finder)
// ============================================================

export function findDewasaAyu(month: number, year: number, category: string) {
  const results = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const baliDate = getBalineseDate(date);

    if (category === "nikah") {
      if (
        (baliDate.saptawara === "Soma" && baliDate.pancawara === "Paing") ||
        (baliDate.saptawara === "Buda" && baliDate.pancawara === "Wage")
      ) {
        results.push({
          day: d,
          info: `${baliDate.saptawara} ${baliDate.pancawara}, ${baliDate.wuku}`,
          quality: "Sangat Baik",
        });
      }
    }
    // Add more categories...
  }
  return results;
}
