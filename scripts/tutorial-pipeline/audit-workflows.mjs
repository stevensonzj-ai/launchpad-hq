#!/usr/bin/env node
// Flags workflow toolSlug / tool.slug values that are not in a known catalog
// list compiled from seed/export scripts, tutorial platformSlug fields, and
// exclusions.json. Does not query the database.
//
// Usage: npm run audit:workflows
// Exit 1 on unknown slugs.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const WORKFLOWS_FILE = path.join(ROOT, "src/data/workflows/workflows.ts");
const TUTORIAL_DIR = path.join(ROOT, "src/data/tutorials");
const EXCLUSIONS = path.join(ROOT, "scripts/tutorial-pipeline/exclusions.json");

const SCRIPT_GLOBS = [
  "scripts/seed-missing-platforms.ts",
  "scripts/seed-phase1-batch1-platforms.ts",
  "scripts/seed-batch2-platforms.ts",
  "scripts/seed-batch3-platforms.ts",
  "scripts/update-catalog-audit-1.ts",
  "scripts/update-catalog-audit-2.ts",
  "scripts/update-platform-mobile-fields.ts",
  "scripts/restructure-categories-2026-05.ts",
  "scripts/import-platforms-legacy.ts",
];

function collectFromScripts() {
  const slugs = new Set();
  const slugRe = /\b(?:slug|platformSlug)\s*:\s*"([^"]+)"/g;
  const arrayRe = /slugs:\s*\[([^\]]+)\]/g;
  for (const rel of SCRIPT_GLOBS) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const src = fs.readFileSync(abs, "utf8");
    for (const m of src.matchAll(slugRe)) slugs.add(m[1]);
    for (const m of src.matchAll(arrayRe)) {
      for (const inner of m[1].matchAll(/"([^"]+)"/g)) slugs.add(inner[1]);
    }
  }
  return slugs;
}

function collectFromTutorials() {
  const slugs = new Set();
  for (const file of fs.readdirSync(TUTORIAL_DIR)) {
    if (!file.endsWith(".ts") || file === "index.ts" || file === "types.ts") continue;
    const src = fs.readFileSync(path.join(TUTORIAL_DIR, file), "utf8");
    const m = src.match(/platformSlug:\s*"([^"]+)"/);
    if (m) slugs.add(m[1]);
  }
  return slugs;
}

function collectFromExclusions() {
  const slugs = new Set();
  if (!fs.existsSync(EXCLUSIONS)) return slugs;
  const json = JSON.parse(fs.readFileSync(EXCLUSIONS, "utf8"));
  for (const key of Object.keys(json)) slugs.add(key);
  return slugs;
}

function loadWorkflows() {
  let src = fs.readFileSync(WORKFLOWS_FILE, "utf8");
  src = src
    .replace(/^import[^\n]*\n/gm, "")
    .replace(/export const WORKFLOWS: WorkflowTemplate\[] =/, "globalThis.__w =")
    .replace(/export function[\s\S]*$/, "");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: "workflows.ts" });
  return ctx.__w;
}

function workflowSlugs(workflows) {
  const found = [];
  for (const w of workflows) {
    for (const key of ["optimal", "hybrid", "budget"]) {
      const t = w.tiers[key];
      for (const tool of t.tools ?? []) {
        if (tool.slug) found.push({ workflow: w.slug, tier: key, where: "tools", slug: tool.slug });
      }
      for (const step of t.steps ?? []) {
        if (step.toolSlug) {
          found.push({ workflow: w.slug, tier: key, where: "steps", slug: step.toolSlug });
        }
      }
    }
  }
  return found;
}

function main() {
  const known = new Set([
    ...collectFromScripts(),
    ...collectFromTutorials(),
    ...collectFromExclusions(),
  ]);
  if (known.size < 50) {
    console.error(`known slug list too small (${known.size}); parser probably broke`);
    process.exit(1);
  }

  const workflows = loadWorkflows();
  const used = workflowSlugs(workflows);
  const unknown = used.filter((u) => !known.has(u.slug));
  const uniqueUnknown = [...new Set(unknown.map((u) => u.slug))].sort();

  console.log(`known catalog slugs (static): ${known.size}`);
  console.log(`workflow slug references: ${used.length}`);
  if (uniqueUnknown.length) {
    console.error("Unknown workflow slugs (not in seed/tutorial/exclusion lists):");
    for (const slug of uniqueUnknown) {
      const hits = unknown.filter((u) => u.slug === slug);
      console.error(`  ${slug}  (${hits.map((h) => `${h.workflow}/${h.tier}/${h.where}`).join(", ")})`);
    }
    process.exit(1);
  }
  console.log("all workflow slugs are in the known static list");
}

main();
