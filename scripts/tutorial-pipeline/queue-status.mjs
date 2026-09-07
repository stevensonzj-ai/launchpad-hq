#!/usr/bin/env node
// Derives tutorial pipeline state from the filesystem. No checkbox file, no drift.
// DONE = platformSlug values actually present in src/data/tutorials/*.ts
// Usage: node scripts/tutorial-pipeline/queue-status.mjs [--next N] [--json]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TUT = path.join(ROOT, "src/data/tutorials");
const PIPE = path.join(ROOT, "scripts/tutorial-pipeline");

const exportFile = fs.readdirSync(path.join(ROOT, "tmp"))
  .filter(f => /^platforms-export-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().pop();
if (!exportFile) { console.error("FATAL: no tmp/platforms-export-YYYY-MM-DD.json found."); process.exit(1); }
const platforms = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp", exportFile), "utf8"));

// --- source of truth: what is actually on disk ---
const done = new Map();   // platformSlug -> { file, binding }
for (const f of fs.readdirSync(TUT).filter(f => f.endsWith("-getting-started.ts"))) {
  const src = fs.readFileSync(path.join(TUT, f), "utf8");
  const m = src.match(/platformSlug:\s*["']([^"']+)["']/);
  const b = src.match(/export\s+const\s+([A-Za-z0-9_$]+)\s*[:=]/);
  if (m) done.set(m[1], { file: f, binding: b ? b[1] : null });
  else console.error(`WARN: no platformSlug in ${f}`);
}
// registered in index.ts?
const idx = fs.readFileSync(path.join(TUT, "index.ts"), "utf8");

const exclusions = JSON.parse(fs.readFileSync(path.join(PIPE, "exclusions.json"), "utf8"));
const priority = fs.existsSync(path.join(PIPE, "priority.json"))
  ? JSON.parse(fs.readFileSync(path.join(PIPE, "priority.json"), "utf8")).order : [];

// live enum from types.ts - never hardcode
const types = fs.readFileSync(path.join(TUT, "types.ts"), "utf8");
const ARCH = [...types.match(/TutorialArchetype\s*=\s*([^;]+);/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
const RECIPES = new Set(["workflow-automation","ai-plugins-business-software","meetings-notes"]);
const PICK = new Set(["local-open-source-ai","ai-apis-developer-services"]);
const guessArchetype = c => RECIPES.has(c) ? "recipes" : PICK.has(c) ? "pick-and-setup" : "prompts";

const remaining = platforms
  .filter(p => !done.has(p.slug) && !(p.slug in exclusions))
  .map(p => ({
    platformSlug: p.slug, name: p.name, categorySlug: p.categorySlug,
    archetypeGuess: guessArchetype(p.categorySlug),
    costTier: p.costTier, privacyLevel: p.privacyLevel, website: p.website || null,
    flags: [!p.website && "EMPTY_WEBSITE", p.costTier === "ENTERPRISE" && p.difficultyLevel === "BEGINNER" && "SUSPECT_COST_TIER"].filter(Boolean),
  }));

const rank = s => { const i = priority.indexOf(s); return i === -1 ? 9999 : i; };
remaining.sort((a,b) => rank(a.platformSlug) - rank(b.platformSlug)
  || a.categorySlug.localeCompare(b.categorySlug) || a.name.localeCompare(b.name));

// index.ts registers via computed key [xTutorial.platformSlug], so the slug string
// never appears there. Verify the export BINDING is both imported and mapped.
const unregistered = [...done.entries()]
  .filter(([, v]) => !v.binding
    || !new RegExp(`import\\s*\\{\\s*${v.binding}\\s*\\}`).test(idx)
    || !new RegExp(`\\[\\s*${v.binding}\\.platformSlug\\s*\\]`).test(idx))
  .map(([k]) => k);
const n = process.argv.includes("--next") ? Number(process.argv[process.argv.indexOf("--next")+1]) : 0;
const out = {
  generatedAt: new Date().toISOString(), sourceExport: `tmp/${exportFile}`,
  archetypeEnum: ARCH, totalPlatforms: platforms.length,
  done: done.size, excluded: Object.keys(exclusions).filter(k => k !== "_note").length,
  remaining: remaining.length, prioritySeeded: priority.length,
  warnings: unregistered.length ? [`tutorial files whose platformSlug is absent from index.ts: ${unregistered.join(", ")}`] : [],
  nextBatch: n ? remaining.slice(0, n) : undefined,
};
if (process.argv.includes("--json")) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }
console.log(`export     : ${out.sourceExport}`);
console.log(`archetypes : ${ARCH.join(" | ")}   <- live enum from types.ts`);
console.log(`total ${out.totalPlatforms} | done ${out.done} | excluded ${out.excluded} | remaining ${out.remaining}`);
if (out.warnings.length) console.log(`WARNINGS   : ${out.warnings.join("; ")}`);
if (n) { console.log(`\nnext ${n}:`); for (const r of out.nextBatch) console.log(`  ${r.platformSlug.padEnd(28)} ${r.archetypeGuess.padEnd(15)} ${r.flags.join(",")}`); }
