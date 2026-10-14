#!/usr/bin/env node
/**
 * Prints a changed-facts markdown table for PR bodies.
 *
 * Usage:
 *   node scripts/facts-diff.mjs
 *   node scripts/facts-diff.mjs origin/main
 *   node scripts/facts-diff.mjs --sample
 *
 * Compares `src/data/facts/<slug>.ts` files (excluding types, helpers,
 * and fixtures) between the base ref and the working tree.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const factsDir = join(root, "src/data/facts");
const SKIP = new Set([
  "types.ts",
  "index.ts",
  "registry.ts",
  "walk.ts",
  "audit.ts",
  "overlay.ts",
  "diff.ts",
  "retired-terms.ts",
  "facts.test.ts",
  "_template.ts",
]);
const FACT_KEYS = [
  "lifecycle",
  "verdict",
  "freeTier",
  "plans",
  "platforms",
  "apps",
  "models",
  "privacy",
];

const args = process.argv.slice(2);
if (args.includes("--sample")) {
  process.stdout.write(`${sampleTable()}\n`);
  process.exit(0);
}

const base = args.find((arg) => !arg.startsWith("-")) || defaultBase();

const slugs = new Set([
  ...listWorkingSlugs(),
  ...listGitSlugs(base),
]);

const rows = [];
for (const slug of [...slugs].sort()) {
  const oldFacts = loadFromGit(base, slug);
  const newFacts = loadFromWorkingTree(slug);
  rows.push(...diffFacts(slug, oldFacts, newFacts));
}

if (rows.length === 0) {
  process.stdout.write("No fact-file changes.\n");
  process.exit(0);
}

process.stdout.write(
  [
    "| slug | field | old → new | source | verifier |",
    "|---|---|---|---|---|",
    ...rows.map(formatRow),
    "",
  ].join("\n"),
);

function defaultBase() {
  try {
    return execFileSync("git", ["merge-base", "HEAD", "origin/main"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    return "origin/main";
  }
}

function listWorkingSlugs() {
  if (!existsSync(factsDir)) return [];
  return readdirSync(factsDir)
    .filter((name) => name.endsWith(".ts") && !SKIP.has(name))
    .map((name) => name.replace(/\.ts$/, ""));
}

function listGitSlugs(ref) {
  try {
    const out = execFileSync(
      "git",
      ["ls-tree", "-r", "--name-only", ref, "--", "src/data/facts"],
      { cwd: root, encoding: "utf8" },
    );
    return out
      .split("\n")
      .map((path) => path.trim())
      .filter((path) => path.startsWith("src/data/facts/") && path.endsWith(".ts"))
      .map((path) => path.slice("src/data/facts/".length))
      .filter((name) => !name.includes("/") && !SKIP.has(name))
      .map((name) => name.replace(/\.ts$/, ""));
  } catch {
    return [];
  }
}

function loadFromWorkingTree(slug) {
  const path = join(factsDir, `${slug}.ts`);
  if (!existsSync(path)) return undefined;
  return parseToolFacts(readFileSync(path, "utf8"));
}

function loadFromGit(ref, slug) {
  try {
    const source = execFileSync(
      "git",
      ["show", `${ref}:src/data/facts/${slug}.ts`],
      { cwd: root, encoding: "utf8" },
    );
    return parseToolFacts(source);
  } catch {
    return undefined;
  }
}

function parseToolFacts(source) {
  const match = source.match(/export default\s+([\s\S]+?)\s+satisfies\s+ToolFacts/);
  if (!match) {
    const named = source.match(
      /export const \w+\s*=\s*([\s\S]+?)\s+satisfies\s+ToolFacts/,
    );
    if (!named) return undefined;
    return evalObject(named[1]);
  }
  return evalObject(match[1]);
}

function evalObject(literal) {
  try {
    return Function(`"use strict"; return (${literal});`)();
  } catch {
    return undefined;
  }
}

function snapshot(facts) {
  if (!facts) return {};
  const rows = {
    lifecycle: { value: String(facts.lifecycle ?? ""), source: "", verifier: "" },
  };
  for (const key of FACT_KEYS) {
    if (key === "lifecycle") continue;
    const fact = facts[key];
    if (!fact || typeof fact !== "object") continue;
    rows[key] = {
      value: stringify(fact.value),
      source: fact.sourceUrl ?? "",
      verifier: fact.verifiedBy ?? "",
    };
  }
  return rows;
}

function diffFacts(slug, oldFacts, newFacts) {
  const before = snapshot(oldFacts);
  const after = snapshot(newFacts);
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const out = [];
  for (const field of keys) {
    const prev = before[field];
    const next = after[field];
    if ((prev?.value ?? "—") === (next?.value ?? "—")) continue;
    out.push({
      slug: newFacts?.slug ?? oldFacts?.slug ?? slug,
      field,
      oldValue: prev?.value ?? "—",
      newValue: next?.value ?? "—",
      source: next?.source || prev?.source || "—",
      verifier: next?.verifier || prev?.verifier || "—",
    });
  }
  return out;
}

function stringify(value) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function escapeCell(value) {
  return String(value).replace(/\r?\n/g, " ").replace(/\|/g, "\\|");
}

function formatRow(row) {
  const change = `${escapeCell(row.oldValue)} → ${escapeCell(row.newValue)}`;
  return `| ${escapeCell(row.slug)} | ${escapeCell(row.field)} | ${change} | ${escapeCell(row.source)} | ${escapeCell(row.verifier)} |`;
}

function sampleTable() {
  return [
    "| slug | field | old → new | source | verifier |",
    "|---|---|---|---|---|",
    "| fixture-valid | freeTier | Limited daily messages on the Free plan. → Updated free-tier summary. | https://example.com/fixture-valid/pricing | cos |",
    "| fixture-valid | plans | [{\"name\":\"Free\",\"price\":\"$0\"}] → [{\"name\":\"Free\",\"price\":\"$0\"},{\"name\":\"Plus\",\"price\":\"$20\"}] | https://example.com/fixture-valid/pricing | cos |",
  ].join("\n");
}
