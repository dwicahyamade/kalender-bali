import {
  WEWARAN, WUKU, URIP_SAPTA, URIP_PANCA,
  getDaysSinceRef, type BalineseDate
} from "./constants";
import { BalineseDate as BaliDate, BalineseDateUtil } from "balinese-date-js-lib";

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

  // -- Integration with balinese-date-js-lib --
  const bDate = new BaliDate(targetDate);
  
  // Saka Year from library
  const yearSakaValue = bDate.saka;
  
  // Holiday Detection (Rerainan) using the library
  const rahinans = BalineseDateUtil.getRahinan(bDate);
  const holiday = rahinans.length > 0 ? rahinans.map(r => r.name).join(", ") : null;

  // Purnama/Tilem check from library
  const isPurnama = bDate.sasihDayInfo.name === "Purnama";
  const isTilem = bDate.sasihDayInfo.name === "Tilem";

  // Sasih Info
  const sasihName = bDate.sasih.name;
  const sasihDay = `${bDate.sasihDayInfo.name} ${bDate.sasihDay[0]}`; // e.g., "Penanggal 5" or "Purnama 15"

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
    yearSaka: yearSakaValue,
    holiday: holiday,
    isPurnama: isPurnama,
    isTilem: isTilem,
    sasih: sasihName,
    sasihDay: sasihDay,
  };
}

// ============================================================
// LUNAR PHASE (PURNAMA / TILEM APPROXIMATION)
// ============================================================

export function getPurnamaTilem(date: Date): "Purnama" | "Tilem" | null {
  const bDate = new BaliDate(date);
  const dayInfo = bDate.sasihDayInfo;  // enum: PURNAMA, TILEM, PENANGGAL, PANGELONG
  
  if (dayInfo.name === "Purnama") return "Purnama";
  if (dayInfo.name === "Tilem")   return "Tilem";
  return null;
}

// ============================================================
// REMOVED: NYEPI DATES (Now handled by balinese-date-js-lib)
// ============================================================

// ============================================================
// REMOVED: GET HOLIDAY (Now handled by balinese-date-js-lib)
// ============================================================

export function findDewasaAyu(month: number, year: number, category: string) {
  const results = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const bDate = new BaliDate(date);
    const bali = getBalineseDate(date);

    let isAyu = false;
    let score = 0;
    let resonName = "";

    if (category === "nikah") {
      // Nikah: Avoid Ingkel Wong, check Panca Suda & Dasa Wara
      const badIngkel = bDate.ingkel.name === "Wong";
      const goodPancaSuda = ["Wisesa Segara", "Satria Wibawa", "Sumur Sinaba"].includes(bDate.pancaSuda.name);
      const goodDasaWara = ["Pandita", "Dewa", "Raja", "Suka"].includes(bDate.dasaWara.name);
      
      if (!badIngkel && (goodPancaSuda || goodDasaWara)) {
        isAyu = true;
        score = goodPancaSuda && goodDasaWara ? 100 : 80;
        resonName = bDate.pancaSuda.name;
      }
    } else if (category === "rumah") {
      // Bangun Rumah: Avoid Ingkel Taru & Suku, check Panca Suda
      const badIngkel = ["Taru", "Suku"].includes(bDate.ingkel.name);
      const goodPancaSuda = ["Bumi Kapetak", "Satria Wibawa", "Sumur Sinaba"].includes(bDate.pancaSuda.name);
      
      if (!badIngkel && goodPancaSuda) {
        isAyu = true;
        score = 85;
        resonName = bDate.pancaSuda.name;
      }
    } else if (category === "dagang") {
      // Buka Usaha: Focus on Wisesa Segara or Sumur Sinaba (Rejeki)
      const goodPancaSuda = ["Wisesa Segara", "Sumur Sinaba"].includes(bDate.pancaSuda.name);
      const goodLaku = ["Laku Bintang", "Laku Bulan", "Laku Surya"].includes(bDate.pararasan.name);
      
      if (goodPancaSuda || (goodLaku && !["Buta", "Kala"].includes(bDate.watekMadya.name))) {
        isAyu = true;
        score = goodPancaSuda ? 95 : 80;
        resonName = goodPancaSuda ? bDate.pancaSuda.name : bDate.pararasan.name;
      }
    } else if (category === "karya") {
      // Upacara/Karya: Avoid Watek Buta/Kala, check Panca Suda
      const badWatek = ["Buta", "Kala"].includes(bDate.watekMadya.name);
      const goodPancaSuda = ["Satria Wibawa", "Wisesa Segara"].includes(bDate.pancaSuda.name);
      
      if (!badWatek && (goodPancaSuda || bDate.dasaWara.name === "Pandita")) {
        isAyu = true;
        score = 90;
        resonName = bDate.dasaWara.name === "Pandita" ? "Dasa Wara Pandita" : bDate.pancaSuda.name;
      }
    }

    if (isAyu) {
      results.push({
        day: d,
        info: `${bali.saptawara} ${bali.pancawara}, ${bali.wuku}`,
        quality: score >= 90 ? "Sangat Baik" : "Baik",
        reason: resonName,
        bali: bali // include for UI
      });
    }
  }

  // Sort by day
  return results.sort((a, b) => a.day - b.day);
}