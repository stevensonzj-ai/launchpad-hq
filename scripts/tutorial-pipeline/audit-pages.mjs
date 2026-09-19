#!/usr/bin/env node
// Structural guard for tutorial pages. Catches what typecheck cannot:
//
//   1. A starter card carrying BOTH `prompt` and `whatItDoes` — the renderer
//      suppresses whatItDoes whenever prompt is present, so that text ships nowhere.
//   2. A starter card carrying NEITHER — a card with no instruction for the reader.
//   3. A `whereToNext.categorySlug` outside the live category list — the field is a
//      plain string in types.ts, so an invented slug typechecks clean and 404s at runtime.
//      (The 2026-09-12 run caught nine of these by hand.)
//   4. A page file that is not registered in index.ts — registration is manual and
//      two-step, and an unregistered page silently never renders.
//   5. `howItWorks` over the 60-word cap in writing-standard.md § 5.
//
// Plain .mjs on purpose: no tsx, no esbuild. node_modules carries Windows-native
// esbuild binaries and the nightly Linux shell cannot run them. Pages are parsed by
// stripping the import/export wrapper and evaluating the object literal in a vm.
//
// Category slugs come from the CATEGORIES array in scripts/restructure-categories-2026-05.ts,
// the file that defines the live taxonomy. Pass --live to read them from Neon instead
// (read-only, DATABASE_URL from .env) and cross-check the static list.
//
// Usage:  npm run audit:tutorials          (exit 1 on any finding)
//         node scripts/tutorial-pipeline/audit-pages.mjs --live

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const DIR = "src/data/tutorials";
const CATEGORY_SOURCE = "scripts/restructure-categories-2026-05.ts";
const HOW_IT_WORKS_CAP = 60;

function staticCategorySlugs() {
  const src = fs.readFileSync(CATEGORY_SOURCE, "utf8");
  const slugs = [...src.matchAll(/sortOrder:\s*\d+,\s*name:\s*"[^"]*",\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) throw new Error(`no CATEGORIES entries parsed from ${CATEGORY_SOURCE}`);
  return new Set(slugs);
}

async function liveCategorySlugs() {
  const { default: pg } = await import("pg");
  const env = fs.readFileSync(".env", "utf8");
  const conn = env.match(/^\s*DATABASE_URL\s*=\s*"?([^"\r\n]+)"?\s*$/m)?.[1]?.trim();
  if (!conn) throw new Error("DATABASE_URL not found in .env");
  const c = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  await c.connect();
  const rows = (await c.query("SELECT slug FROM categories ORDER BY slug")).rows;
  await c.end();
  return new Set(rows.map((r) => r.slug));
}

function loadPage(file) {
  let src = fs.readFileSync(path.join(DIR, file), "utf8");
  src = src
    .replace(/^import[^\n]*\n/gm, "")
    .replace(/export const (\w+): PlatformTutorialData =/, "globalThis.__t =");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: file });
  return ctx.__t;
}

async function main() {
  const live = process.argv.includes("--live");
  const staticSlugs = staticCategorySlugs();
  let categories = staticSlugs;
  if (live) {
    const liveSlugs = await liveCategorySlugs();
    const onlyStatic = [...staticSlugs].filter((s) => !liveSlugs.has(s));
    const onlyLive = [...liveSlugs].filter((s) => !staticSlugs.has(s));
    if (onlyStatic.length || onlyLive.length) {
      console.log(`category list drift — static-only: [${onlyStatic}] live-only: [${onlyLive}]`);
    }
    categories = liveSlugs;
  }

  const indexSrc = fs.readFileSync(path.join(DIR, "index.ts"), "utf8");
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");

  const findings = [];
  const seenPlatformSlugs = new Map();
  for (const file of files) {
    let t;
    try {
      t = loadPage(file);
    } catch (e) {
      findings.push(`${file}: could not parse — ${e.message}`);
      continue;
    }
    const id = t.platformSlug;

    if (seenPlatformSlugs.has(id)) {
      findings.push(`${file}: platformSlug "${id}" is also used by ${seenPlatformSlugs.get(id)}`);
    }
    seenPlatformSlugs.set(id, file);

    const stem = file.slice(0, -".ts".length);
    const importedName = indexSrc.match(new RegExp(`import \\{\\s*(\\w+)\\s*\\} from "\\./${stem}"`));
    if (!importedName) {
      findings.push(`${file}: not imported in index.ts (registration is manual and two-step)`);
    } else if (!new RegExp(`\\[${importedName[1]}\\.platformSlug\\]:\\s*${importedName[1]}`).test(indexSrc)) {
      findings.push(`${file}: imported in index.ts but missing from the registry map`);
    }

    (t.starterActions ?? []).forEach((a, i) => {
      const p = typeof a.prompt === "string";
      const w = typeof a.whatItDoes === "string";
      if (p && w) findings.push(`${id} card ${i + 1}: has BOTH prompt and whatItDoes — whatItDoes will not render`);
      if (!p && !w) findings.push(`${id} card ${i + 1}: has NEITHER prompt nor whatItDoes`);
    });

    (t.whereToNext ?? []).forEach((w, i) => {
      if (w.categorySlug !== undefined && !categories.has(w.categorySlug)) {
        findings.push(`${id} whereToNext[${i}]: categorySlug "${w.categorySlug}" is not a live category — will 404`);
      }
    });

    const n = String(t.howItWorks ?? "").trim().split(/\s+/).filter(Boolean).length;
    if (n > HOW_IT_WORKS_CAP) findings.push(`${id}: howItWorks is ${n} words (cap ${HOW_IT_WORKS_CAP})`);
  }

  console.log(`audited ${files.length} pages against ${categories.size} categories${live ? " (live)" : ""}`);
  if (findings.length) {
    console.log(`\n${findings.length} finding(s):`);
    for (const f of findings) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log("clean: every card has exactly one action body, every categorySlug is live, every page is registered, howItWorks within cap");
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
