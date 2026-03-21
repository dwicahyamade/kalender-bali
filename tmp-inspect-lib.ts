import { BalineseDate as BaliDate } from "balinese-date-js-lib";

const d = new BaliDate(new Date('2026-03-03T12:00:00Z'));
console.log('BaliDate properties:');
const obj: any = {};
for (const k of Object.keys(d)) {
  obj[k] = d[k as keyof typeof d];
}
console.log(JSON.stringify(obj, null, 2));

const lib = require('balinese-date-js-lib');
console.log('Exports:', Object.keys(lib));
