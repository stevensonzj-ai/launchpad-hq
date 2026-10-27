import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { row } from "./fixtures";
import {
  AUTO_RESOLVE_MAX_EDITS,
  AUTO_RESOLVE_MIN_LENGTH,
  compactKey,
  compactKeysFor,
  correctWord,
  editDistance,
  matchName,
  NAME_ALIASES,
} from "./names";
import { snapshotRows } from "./snapshot";
import { compare, findFreeAlternatives, getPricingFacts, resolveTool, searchTools, ToolInputError } from "./tools";

/** Fix plan P1.1: compact key, aliases, fuzzy did-you-mean, safe auto-resolve, query spelling. */

const ROWS = snapshotRows();
const facts = getToolFacts;
const resolve = (q: string) => resolveTool(q, ROWS, facts);

describe("edit distance", () => {
  it("counts insertions, deletions, substitutions and adjacent swaps as one edit", () => {
    assert.equal(editDistance("midjourney", "midjurney"), 1);
    assert.equal(editDistance("chatgpt", "chatgtp"), 1); // swap
    assert.equal(editDistance("grok", "groq"), 1);
    assert.equal(editDistance("kitten", "sitting"), 3);
    assert.equal(editDistance("abc", "abcdef", 1), 2); // capped: max + 1
  });
});

describe("compact key and aliases", () => {
  it("folds spaces, hyphens and case", () => {
    for (const q of ["chat gpt", "Chat-GPT", "CHATGPT"]) assert.equal(compactKey(q), "chatgpt", q);
    assert.equal(resolve("chat gpt").row?.slug, "chatgpt");
    assert.equal(resolve("chat gpt").resolution, "compact");
    assert.equal(resolve("mid journey").row?.slug, "midjourney");
    assert.equal(resolve("eleven labs").row?.slug, "elevenlabs");
  });

  it("resolves curated aliases, and every alias points at a real catalog row", () => {
    const slugs = new Set(ROWS.map((r) => r.slug));
    for (const [alias, target] of Object.entries(NAME_ALIASES)) {
      for (const slug of typeof target === "string" ? [target] : target) assert.ok(slugs.has(slug), `${alias} -> ${slug}`);
    }
    for (const q of ["DALL-E", "dalle", "Dall E 3"]) {
      assert.equal(resolve(q).row?.slug, "gpt-image-1-5-dall-e-successor", q);
      assert.equal(resolve(q).resolution, "alias", q);
    }
    assert.equal(resolve("gpt").row?.slug, "chatgpt");
  });

  it("ambiguous 'copilot' is never resolved; both tools are suggested", () => {
    const r = resolve("copilot");
    assert.equal(r.row, undefined);
    assert.deepEqual(r.suggestions.map((s) => s.slug).sort(), ["github-copilot", "microsoft-copilot"]);
    assert.throws(() => getPricingFacts({ platform: "copilot" }, ROWS, facts), /Did you mean: GitHub Copilot \(github-copilot\), Microsoft Copilot \(microsoft-copilot\)\?/);
  });
});

describe("fuzzy names: auto-resolve only a unique 6+ character name within 1 edit", () => {
  it("auto-resolves a unique long name and echoes the input", () => {
    for (const [q, slug] of [["midjurney", "midjourney"], ["chatgtp", "chatgpt"], ["grammerly", "grammarly"], ["perplexty", "perplexity-ai"]] as const) {
      assert.equal(resolve(q).row?.slug, slug, q);
      assert.equal(resolve(q).resolution, "spelling", q);
    }
    const alt = findFreeAlternatives({ platform: "midjurney" }, ROWS, facts);
    assert.equal(alt.for?.slug, "midjourney");
    assert.equal(alt.for?.resolved_from, "midjurney");
    assert.equal(alt.for?.resolution, "spelling");
  });

  it("exact names never get swapped: grok is grok, groq is groq", () => {
    assert.equal(resolve("grok").row?.slug, "grok");
    assert.equal(resolve("grok").resolution, null);
    assert.equal(resolve("groq").row?.slug, "groq");
    assert.equal(resolve("Groq").resolution, null);
  });

  it("short names (under 6 characters) only ever get did-you-mean", () => {
    for (const q of ["grokk", "grock", "groc"]) {
      const r = resolve(q);
      assert.equal(r.row, undefined, q);
      assert.ok(r.suggestions.some((s) => s.slug === "grok"), q);
    }
    assert.deepEqual(resolve("groc").suggestions.map((s) => s.slug).sort(), ["grok", "groq"]);
    assert.throws(() => getPricingFacts({ platform: "grokk" }, ROWS, facts), /Did you mean: Grok \(grok\)\?/);
    assert.equal(resolve("Gamm").row, undefined);
  });

  it("two names within 1 edit of the input: suggestions, never a pick", () => {
    const tools = [
      { slug: "notely", names: ["Notely"] },
      { slug: "notary", names: ["Notary"] },
    ];
    const m = matchName("notaly", tools);
    assert.equal(m.kind, "none");
    assert.deepEqual(m.kind === "none" && m.suggestions.map((s) => s.slug).sort(), ["notary", "notely"]);
    assert.equal(matchName("notelyy", tools).kind, "spelling");
  });

  it("no two catalog names sit within the auto-resolve threshold of each other (snapshot, pairwise)", () => {
    const keyed = ROWS.flatMap((r) =>
      compactKeysFor({ slug: r.slug, names: [facts(r.slug)?.displayName?.value ?? r.name, r.name] }).map((k) => ({ slug: r.slug, k })),
    );
    const close: string[] = [];
    for (let i = 0; i < keyed.length; i++) {
      for (let j = i + 1; j < keyed.length; j++) {
        const [a, b] = [keyed[i], keyed[j]];
        if (a.slug === b.slug || Math.max(a.k.length, b.k.length) < AUTO_RESOLVE_MIN_LENGTH) continue;
        if (editDistance(a.k, b.k, AUTO_RESOLVE_MAX_EDITS) <= AUTO_RESOLVE_MAX_EDITS) close.push(`${a.slug}:${a.k} ~ ${b.slug}:${b.k}`);
      }
    }
    assert.deepEqual(close, []);
  });

  it("unknown names stay not-found with the original message", () => {
    assert.throws(
      () => getPricingFacts({ platform: "Zyxtrol" }, ROWS, facts),
      (e: unknown) => e instanceof ToolInputError && /^Not in the Launchpad HQ catalog: "Zyxtrol"\. Try search_tools/.test(e.message),
    );
  });

  it("compare resolves tolerant names and adds did_you_mean for the rest (additive)", () => {
    const out = compare({ platforms: ["Midjourney", "DALL-E", "copilot", "Zyxtrol"] }, ROWS, facts);
    assert.deepEqual(out.items.map((i) => i.slug), ["midjourney", "gpt-image-1-5-dall-e-successor"]);
    assert.equal(out.items[1].resolved_from, "DALL-E");
    assert.equal(out.items[0].resolved_from, undefined);
    assert.deepEqual(out.not_found, ["copilot", "Zyxtrol"]);
    assert.deepEqual(out.did_you_mean?.map((d) => d.input), ["copilot"]);
  });
});

describe("query spelling (search_tools)", () => {
  it("corrects only unmatched words toward the task vocabulary, and says so", () => {
    const out = searchTools({ task: "grammer cheker" }, ROWS, facts);
    assert.equal(out.corrected_query, "grammar checker");
    assert.ok(out.results.slice(0, 3).some((r) => r.slug === "grammarly"));
    assert.ok(out.results[0].match_reasons.includes("spelling: grammer → grammar"));
    assert.match(out.note ?? "", /Spelling corrected: grammer → grammar, cheker → checker\./);
  });

  it("leaves real words, short words and catalog words alone", () => {
    const vocab = new Set(["grammer"]);
    assert.equal(correctWord("grammer", vocab), null); // the catalog has it
    assert.equal(correctWord("logs", new Set()), null); // under 5 letters
    assert.equal(correctWord("grammar", new Set()), null); // already a vocabulary word
    assert.equal(searchTools({ task: "make slides" }, ROWS, facts).corrected_query, null);
  });

  it("works on hand-built rows too (no snapshot dependency)", () => {
    const rows = [row({ slug: "proofy", name: "Proofy", primaryUse: "Grammar checker" })];
    assert.equal(searchTools({ task: "grammer" }, rows, () => undefined).results[0]?.slug, "proofy");
  });
});
