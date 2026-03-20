import { getBalineseDate } from "./engine";

/**
 * Comprehensive test for Balinese Calendar calculations.
 * All expected values verified from kalenderbali.org
 *
 * Run: npx tsx lib/bali-phala/test.ts
 */

interface TestCase {
  date: Date;
  label: string;
  expected: {
    saptawara: string;
    pancawara: string;
    wuku: string;
    triwara?: string;
    holiday?: string | null;
  };
}

const tests: TestCase[] = [
  // Reference date
  {
    date: new Date(2000, 0, 1), // Jan 1, 2000
    label: "Reference: 1 Jan 2000",
    expected: { saptawara: "Saniscara", pancawara: "Umanis", wuku: "Sungsang", triwara: "Pasah" },
  },
  // Today
  {
    date: new Date(2026, 2, 20), // Mar 20, 2026
    label: "Today: 20 Mar 2026",
    expected: { saptawara: "Sukra", pancawara: "Umanis", wuku: "Kelawu" },
  },
  // Saraswati 2025 #1
  {
    date: new Date(2025, 1, 8), // Feb 8, 2025
    label: "Saraswati: 8 Feb 2025",
    expected: { saptawara: "Saniscara", pancawara: "Umanis", wuku: "Watugunung", holiday: "Saraswati" },
  },
  // Saraswati 2025 #2
  {
    date: new Date(2025, 8, 6), // Sep 6, 2025
    label: "Saraswati: 6 Sep 2025",
    expected: { saptawara: "Saniscara", pancawara: "Umanis", wuku: "Watugunung", holiday: "Saraswati" },
  },
  // Galungan 2025 #1
  {
    date: new Date(2025, 3, 23), // Apr 23, 2025
    label: "Galungan: 23 Apr 2025",
    expected: { saptawara: "Buda", pancawara: "Kliwon", wuku: "Dungulan", holiday: "Galungan" },
  },
  // Kuningan 2025 #1
  {
    date: new Date(2025, 4, 3), // May 3, 2025
    label: "Kuningan: 3 May 2025",
    expected: { saptawara: "Saniscara", pancawara: "Kliwon", wuku: "Kuningan", holiday: "Kuningan" },
  },
  // Galungan 2025 #2
  {
    date: new Date(2025, 10, 19), // Nov 19, 2025
    label: "Galungan: 19 Nov 2025",
    expected: { saptawara: "Buda", pancawara: "Kliwon", wuku: "Dungulan", holiday: "Galungan" },
  },
  // Kuningan 2025 #2
  {
    date: new Date(2025, 10, 29), // Nov 29, 2025
    label: "Kuningan: 29 Nov 2025",
    expected: { saptawara: "Saniscara", pancawara: "Kliwon", wuku: "Kuningan", holiday: "Kuningan" },
  },
  // Nyepi 2026
  {
    date: new Date(2026, 2, 19), // Mar 19, 2026
    label: "Nyepi: 19 Mar 2026",
    expected: { saptawara: "Wrespati", pancawara: "Kliwon", wuku: "Kelawu", holiday: "Hari Raya Nyepi" },
  },
  // Saraswati 2026 #1
  {
    date: new Date(2026, 3, 4), // Apr 4, 2026
    label: "Saraswati: 4 Apr 2026",
    expected: { saptawara: "Saniscara", pancawara: "Umanis", wuku: "Watugunung", holiday: "Saraswati" },
  },
  // Galungan 2026
  {
    date: new Date(2026, 5, 17), // Jun 17, 2026
    label: "Galungan: 17 Jun 2026",
    expected: { saptawara: "Buda", pancawara: "Kliwon", wuku: "Dungulan", holiday: "Galungan" },
  },
  // Kuningan 2026
  {
    date: new Date(2026, 5, 27), // Jun 27, 2026
    label: "Kuningan: 27 Jun 2026",
    expected: { saptawara: "Saniscara", pancawara: "Kliwon", wuku: "Kuningan", holiday: "Kuningan" },
  },
  // Tumpek Landep 2025
  {
    date: new Date(2025, 1, 22), // Feb 22, 2025
    label: "Tumpek Landep: 22 Feb 2025",
    expected: { saptawara: "Saniscara", pancawara: "Kliwon", wuku: "Landep", holiday: "Tumpek Landep" },
  },
  // Saraswati 2026 #2
  {
    date: new Date(2026, 9, 31), // Oct 31, 2026
    label: "Saraswati: 31 Oct 2026",
    expected: { saptawara: "Saniscara", pancawara: "Umanis", wuku: "Watugunung", holiday: "Saraswati" },
  },
  // Tumpek Wariga 2025 (Oct 25, not Mar 29 which coincides with Nyepi)
  {
    date: new Date(2025, 9, 25), // Oct 25, 2025
    label: "Tumpek Wariga: 25 Oct 2025",
    expected: { saptawara: "Saniscara", pancawara: "Kliwon", wuku: "Wariga" },
  },
];

// ============================================================
// RUN TESTS
// ============================================================

let passed = 0;
let failed = 0;

for (const t of tests) {
  const res = getBalineseDate(t.date);
  const errors: string[] = [];

  if (res.saptawara !== t.expected.saptawara) {
    errors.push(`Saptawara: got "${res.saptawara}", expected "${t.expected.saptawara}"`);
  }
  if (res.pancawara !== t.expected.pancawara) {
    errors.push(`Pancawara: got "${res.pancawara}", expected "${t.expected.pancawara}"`);
  }
  if (res.wuku !== t.expected.wuku) {
    errors.push(`Wuku: got "${res.wuku}", expected "${t.expected.wuku}"`);
  }
  if (t.expected.triwara && res.triwara !== t.expected.triwara) {
    errors.push(`Triwara: got "${res.triwara}", expected "${t.expected.triwara}"`);
  }
  if (t.expected.holiday !== undefined && res.holiday !== t.expected.holiday) {
    errors.push(`Holiday: got "${res.holiday}", expected "${t.expected.holiday}"`);
  }

  if (errors.length === 0) {
    console.log(`✅ PASS: ${t.label} → ${res.saptawara} ${res.pancawara} ${res.wuku}${res.holiday ? ` [${res.holiday}]` : ""}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${t.label}`);
    for (const e of errors) {
      console.log(`   ${e}`);
    }
    failed++;
  }
}

console.log(`\n${"=".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed out of ${tests.length}`);
if (failed === 0) {
  console.log("🎉 ALL TESTS PASSED!");
} else {
  console.log("⚠️  Some tests failed. Please check the output above.");
}
