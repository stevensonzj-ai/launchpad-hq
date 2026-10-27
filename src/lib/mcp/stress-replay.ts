import * as fs from "fs";
import * as path from "path";
import { getToolFacts } from "@/data/facts";
import { runTool, TOOL_SPECS } from "./server";
import type { CatalogRow } from "./tools";

/**
 * TESTS ONLY. Offline replay of the 2026-10-26 live stress test
 * (stress-1026/cases.json, 67 calls; graded in docs/planning/.../sessions/
 * 2026-10-26-mcp-stress-test-results.md). Each case runs through the same
 * runTool path the /mcp route uses, on the catalog snapshot, and is graded
 * by a written-down version of the grader's PASS rule. E20 (unknown tool
 * name) is a JSON-RPC routing error the SDK raises before runTool; server.test.ts covers it.
 */

export type Grade = "PASS" | "WEAK" | "FAIL";
export type StressCase = { id: string; prompt: string; tool: string; args: Record<string, unknown> };

/** The live grades (results doc, per-call table). */
export const LIVE_GRADES: Record<string, Grade> = {
  A01: "PASS", A02: "WEAK", A03: "PASS", A04: "PASS", A05: "PASS", A06: "PASS", A07: "PASS", A08: "PASS",
  A09: "WEAK", A10: "PASS", A11: "PASS", A12: "WEAK", A13: "WEAK", A14: "WEAK", A15: "PASS", A16: "PASS",
  A17: "WEAK", A18: "WEAK", A19: "WEAK", A20: "WEAK", A21: "WEAK", A22: "PASS", A23: "WEAK", A24: "WEAK",
  A25: "PASS",
  B01: "PASS", B02: "PASS", B03: "PASS", B04: "FAIL", B05: "PASS", B06: "PASS", B07: "WEAK", B08: "WEAK",
  B09: "FAIL", B10: "WEAK", B11: "WEAK",
  C01: "PASS", C02: "PASS", C03: "PASS", C04: "WEAK", C05: "WEAK",
  D01: "PASS", D02: "PASS", D03: "PASS", D04: "PASS", D05: "PASS", D06: "PASS",
  E01: "WEAK", E02: "WEAK", E03: "WEAK", E04: "PASS", E05: "PASS", E06: "PASS", E07: "WEAK", E08: "PASS",
  E09: "PASS", E10: "WEAK", E11: "PASS", E12: "PASS", E13: "PASS", E14: "PASS", E15: "PASS", E16: "PASS",
  E17: "PASS", E18: "PASS", E19: "PASS", E20: "PASS",
};

/** The 10 head-to-head prompts (results doc, Part B), all among the 67 calls. */
export const HEAD_TO_HEAD = ["B01", "B04", "B07", "B08", "B09", "D01", "D02", "A05", "A14", "C05"];

export function stressCases(): StressCase[] {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "lib", "mcp", "stress-1026", "cases.json"), "utf8"),
  ) as StressCase[];
}

export type CallResult = { error: string | null; data: Record<string, any> | null }; // eslint-disable-line @typescript-eslint/no-explicit-any

export async function replayCall(c: StressCase, rows: CatalogRow[]): Promise<CallResult> {
  const spec = TOOL_SPECS.find((s) => s.name === c.tool);
  if (!spec) return { error: "Tool not found", data: null };
  const result = await runTool(spec, c.args, { loadCatalog: async () => rows, facts: getToolFacts, log: () => {} });
  if ("isError" in result && result.isError) return { error: result.content[0].text, data: null };
  return { error: null, data: (result as { structuredContent: Record<string, unknown> }).structuredContent };
}

type Item = { slug: string; verification: string; difficulty: string; tasks?: string[] | null; stale?: boolean; fallback?: boolean; free_tier: { available: boolean | null } };
type Verdict = { grade: Grade; why: string };

const top = (r: CallResult, n = 5): Item[] => ((r.data?.results ?? []) as Item[]).slice(0, n);
const slugsOf = (items: Item[]) => items.map((i) => i.slug);
const direct = (items: Item[]) => items.filter((i) => !i.fallback);
const has = (items: Item[], slug: string) => slugsOf(items).includes(slug);
const count = (items: Item[], slugs: string[]) => slugs.filter((s) => has(items, s)).length;
const pass = (ok: boolean, why: string, otherwise: Grade = "WEAK"): Verdict => ({ grade: ok ? "PASS" : otherwise, why });
const isValidationError = (r: CallResult) => Boolean(r.error && /invalid|expected|too (small|big)/i.test(r.error));
const tagged = (items: Item[], task: string) => items.filter((i) => i.tasks?.includes(task));
const GENERAL = ["chatgpt", "claude", "gemini", "microsoft-copilot"];

/** One PASS rule per case, written from the grader's note. */
export const RULES: Record<string, (r: CallResult) => Verdict> = {
  A01: (r) => pass(top(r, 1)[0]?.slug === "grammarly", "Grammarly first"),
  A02: (r) => {
    const t = direct(top(r));
    const first = (r.data?.results?.[0] ?? null) as (Item & { cost_tier: string; starting_price?: string | null; match_reasons: string[] }) | null;
    const cheapFirst = Boolean(first && !/paid fits budget/.test(first.match_reasons.join(" ")) && first.slug !== "jasper");
    return pass(t.length >= 3 && cheapFirst && count(t, GENERAL) >= 1, "low budget: an affordable writer first, a general assistant in the top 5");
  },
  A03: (r) => pass(count(top(r), ["kickresume", "rezi", "teal"]) === 3, "Kickresume, Rezi, Teal"),
  A04: (r) => pass(count(top(r), ["kickresume", "rezi", "teal"]) === 3, "Rezi, Teal, Kickresume"),
  A05: (r) => pass(count(top(r), ["ideogram", "canva-ai-magic-studio", "recraft"]) === 3, "Ideogram, Canva, Recraft"),
  A06: (r) => pass(tagged(top(r), "image-generation").length >= 4, "4+ image generators"),
  A07: (r) => pass(count(top(r), ["captions", "capcut"]) >= 1 && !has(top(r, 3), "midjourney"), "a mobile video editor; Midjourney not top 3"),
  A08: (r) => pass(count(top(r), ["heygen", "synthesia", "hedra"]) >= 2, "avatar video tools"),
  A09: (r) => pass(direct(top(r)).length >= 3 && has(top(r), "descript"), "3+ podcast tools incl. Descript (catalog lacks Riverside/Podcastle)"),
  A10: (r) => pass(tagged(top(r), "transcription").length >= 4, "4+ transcription tools"),
  A11: (r) => pass(tagged(top(r, 10), "meeting-notes").length >= 8, "8+ meeting-notes tools in 10"),
  A12: (r) => {
    const t = direct(top(r, 3));
    return pass(t.length >= 3 && t.every((i) => ["BEGINNER", "INTERMEDIATE"].includes(i.difficulty)) && !has(t, "cline"), "beginner+free: no advanced agent in the top 3");
  },
  A13: (r) => pass(has(top(r), "github-copilot"), "GitHub Copilot in the top 5"),
  A14: (r) => pass(direct(top(r)).length >= 3 && count(top(r), ["khan-academy-khanmigo", "chatgpt", "gemini", "quizlet-q-chat", "notebooklm"]) >= 2, "3+ direct study tools"),
  A15: (r) => pass(tagged(top(r), "research-papers").length >= 4, "research-paper tools"),
  A16: (r) => pass(has(top(r, 3), "gamma"), "Gamma top 3"),
  A17: (r) => pass(direct(top(r)).length >= 3 && has(top(r), "julius-ai") && count(top(r), GENERAL) >= 1, "Julius plus a general assistant"),
  A18: (r) => {
    const first = top(r, 1)[0];
    return pass(Boolean(first) && first.slug !== "pika" && !has(top(r, 3), "pika"), "a writing tool first, not Pika");
  },
  A19: (r) => pass(direct(top(r)).length >= 2 && has(top(r), "deepl"), "DeepL plus another translator"),
  A20: (r) => pass(count(top(r, 3), ["chatgpt", "claude", "gemini"]) >= 1, "ChatGPT/Claude/Gemini top 3"),
  A21: (r) => pass(direct(top(r)).length >= 3, "3+ direct matches"),
  A22: (r) => pass(count(top(r), ["gemini", "grammarly", "microsoft-copilot", "chatgpt"]) >= 3, "email writers"),
  A23: (r) => pass(has(top(r), "suno"), "Suno in the top 5"),
  A24: (r) => pass(!has(top(r), "cline") && count(top(r, 3), ["wix-ai", "squarespace-ai", "framer-ai", "durable"]) >= 1, "a website builder top 3, no Cline"),
  A25: (r) => pass(count(top(r), ["speechify", "elevenlabs"]) === 2, "Speechify and ElevenLabs"),

  B01: (r) => pass(r.data?.platform?.slug === "chatgpt" && r.data?.verification === "verified", "verified ChatGPT plans"),
  B02: (r) => pass(r.data?.platform?.slug === "claude" && r.data?.verification === "verified", "verified Claude plans"),
  B03: (r) => pass(r.data?.platform?.slug === "gemini" && r.data?.verification === "verified", "verified Gemini plans"),
  // Data rules (fix plan P1.3): fact files and catalog audit 10.
  B04: (r) => pass(Boolean(r.data?.plans), "Canva plans fact (P1.3)", "FAIL"),
  B05: (r) => pass(r.data?.platform?.slug === "grammarly" && r.data?.verification === "verified", "verified Grammarly"),
  B06: (r) => pass(r.data?.platform?.slug === "notion-ai" && r.data?.verification === "verified", "verified Notion AI"),
  B07: (r) => pass(r.data?.verification === "verified" && r.data?.platform?.cost_tier !== "ENTERPRISE", "Midjourney facts + tier (P1.3/P1.4)"),
  B08: (r) => pass(!/slack/i.test(r.data?.plans?.source_url ?? ""), "Perplexity plans source (P1.3)"),
  B09: (r) => pass(!/\$24\b/.test(r.data?.catalog_pricing_text ?? ""), "Otter Business annual (P1.3)", "FAIL"),
  B10: (r) => pass(!(r.data?.verification === "verified" && /unverified/i.test(r.data?.platform?.description ?? "")), "QuillBot label vs text (P1.3)"),
  B11: (r) => pass(!(r.data?.verification === "catalog_only" && /official/i.test(r.data?.catalog_pricing_text ?? "")), "Copilot label vs text (P1.3)"),

  C01: (r) => pass(r.data?.items?.length === 2, "both resolve"),
  C02: (r) => pass(r.data?.items?.length === 3, "all three resolve"),
  C03: (r) => pass(r.data?.items?.length === 2, "both resolve"),
  C04: (r) => {
    const items = (r.data?.items ?? []) as Item[];
    return pass(items.length === 3 && items.every((i) => i.verification !== "catalog_only" || i.stale !== undefined), "DALL-E resolves; old catalog rows labelled");
  },
  C05: (r) => pass(((r.data?.items ?? []) as Item[]).every((i) => i.verification === "verified"), "Otter facts (P1.3)"),

  D01: (r) => pass(has(r.data?.alternatives ?? [], "quillbot"), "QuillBot"),
  D02: (r) => pass(count(r.data?.alternatives ?? [], ["ideogram", "canva-ai-magic-studio", "krea"]) >= 2, "Ideogram / Canva / Krea"),
  D03: (r) => pass((r.data?.alternatives ?? []).length === 3, "limit 3 honoured"),
  D04: (r) => pass(count(r.data?.alternatives ?? [], ["fathom", "fireflies-ai", "granola"]) >= 2, "Fathom / Fireflies / Granola"),
  D05: (r) => pass(count(r.data?.alternatives ?? [], ["claude", "gemini", "microsoft-copilot"]) >= 2, "Claude / Gemini / Copilot"),
  D06: (r) => pass((r.data?.alternatives ?? []).length >= 3, "3+ coding alternatives"),

  E01: (r) => pass(has(top(r, 3), "grammarly"), "typo corrected to grammar checkers"),
  E02: (r) => pass(r.data?.platform?.slug === "chatgpt", "'chat gpt' resolves"),
  E03: (r) => pass(r.data?.for?.slug === "midjourney" || /midjourney/i.test(r.error ?? ""), "'midjurney' resolves or suggests Midjourney"),
  E04: (r) => pass(Boolean(r.error && /Not in the Launchpad HQ catalog/.test(r.error)), "clear not-found", "FAIL"),
  E05: (r) => pass(Boolean(r.error && /Not in the Launchpad HQ catalog/.test(r.error)), "clear not-found", "FAIL"),
  E06: (r) => pass(!r.error && (top(r).length === 0 ? Boolean(r.data?.note) : top(r).every((i) => i.fallback)), "empty + note, or a labelled starter set", "FAIL"),
  E07: (r) => pass(top(r).length >= 3 && top(r).every((i) => i.fallback), "labelled starter set"),
  E08: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E09: (r) => pass(isValidationError(r) || (!r.error && top(r).length > 0), "rejected cleanly or truncated and answered", "FAIL"),
  E10: (r) => pass(tagged(direct(top(r)), "logo-design").length >= 2, "logo tools for es/de"),
  E11: (r) => pass(tagged(top(r), "logo-design").length >= 2, "injection text harmless, logo tools"),
  E12: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E13: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E14: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E15: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E16: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E17: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E18: (r) => pass(r.data?.items?.length === 1 && (r.data?.not_found ?? []).includes("Zyxtrol"), "partial + not_found", "FAIL"),
  E19: (r) => pass(isValidationError(r), "validation error", "FAIL"),
  E20: (r) => pass(Boolean(r.error), "unknown tool rejected", "FAIL"),
};

export async function replayAll(rows: CatalogRow[]) {
  const out: { id: string; grade: Grade; live: Grade; why: string; top: string[] }[] = [];
  for (const c of stressCases()) {
    const r = await replayCall(c, rows);
    const v = RULES[c.id](r);
    const items = (r.data?.results ?? r.data?.items ?? r.data?.alternatives ?? []) as Item[];
    out.push({ id: c.id, grade: v.grade, live: LIVE_GRADES[c.id], why: v.why, top: r.error ? [`error: ${r.error.slice(0, 80)}`] : slugsOf(items.slice(0, 5)) });
  }
  return out;
}
