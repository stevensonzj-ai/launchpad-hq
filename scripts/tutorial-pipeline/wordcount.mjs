#!/usr/bin/env node
// Counts shipped prose in a tutorial page: words inside string literals,
// excluding slugs, URLs, category slugs and enum-ish short values.
import fs from "node:fs"; import path from "node:path";
const DIR = "src/data/tutorials";
const SKIP_KEYS = /^(slug|platformSlug|archetype|accessTier|lastReviewedAt|changelogUrl|categorySlug|vendorDocsUrl|href)$/;
function count(file) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  let words = 0;
  // strip key: "value" pairs whose key we skip
  const cleaned = src.replace(/\b([A-Za-z]+)\s*:\s*(["'`])(?:\\.|(?!\2)[\s\S])*\2/g,
    (m, k) => (SKIP_KEYS.test(k) ? "" : m));
  for (const m of cleaned.matchAll(/(["'`])((?:\\.|(?!\1)[\s\S])*)\1/g)) {
    const s = m[2];
    if (/^https?:\/\//.test(s)) continue;
    if (!/\s/.test(s) && s.length < 30) continue;   // single tokens / slugs
    words += s.replace(/\*\*|`/g, " ").split(/\s+/).filter(Boolean).length;
  }
  return words;
}
const files = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(DIR).filter(f => f.endsWith("-getting-started.ts"));
const rows = files.map(f => [f.replace("-getting-started.ts",""), count(f)]).sort((a,b)=>b[1]-a[1]);
for (const [n,w] of rows) {
  const flag = w > 1100 ? "  OVER(>1100)" : w > 900 ? "  over 900" : w < 600 ? "  thin" : "";
  console.log(String(w).padStart(5) + "  " + n + flag);
}
const nums = rows.map(r=>r[1]);
console.log("---"); console.log("pages "+nums.length+" | median "+nums.sort((a,b)=>a-b)[Math.floor(nums.length/2)]+" | max "+Math.max(...nums)+" | min "+Math.min(...nums));
