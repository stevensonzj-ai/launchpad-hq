import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import type { FactsLookup } from "./tools";
import { row } from "./fixtures";
import type { SearchToolsInput } from "./schemas";
import { snapshotRows } from "./snapshot";
import { searchTools } from "./tools";

/**
 * Relevance cutoff (2026-10-30): a multi-word search that only hits stray
 * words in other tools' descriptions returns nothing, with a clear note,
 * instead of unrelated tools.
 */

const rows = snapshotRows();
const search = (task: string, extra: Partial<SearchToolsInput> = {}) => searchTools({ task, ...extra }, rows, getToolFacts);
const top5 = (task: string, extra: Partial<SearchToolsInput> = {}) => search(task, extra).results.slice(0, 5).map((r) => r.slug);
const none: FactsLookup = () => undefined;

describe("search_tools relevance cutoff", () => {
  for (const task of ["book me a flight to Paris", "book a flight", "book a hotel in Rome"]) {
    it(`off-topic "${task}" returns nothing relevant`, () => {
      const out = search(task);
      assert.equal(out.results.length, 0, out.results.map((r) => r.slug).join(", "));
      assert.equal(out.total_matches, 0);
      assert.equal(out.fallback, null);
      assert.match(out.note ?? "", /^Nothing relevant:/);
    });
  }

  it("learn a language: only tools whose name or primary use names the job", () => {
    const s = top5("learn a language");
    assert.ok(!s.includes("deepgram"), s.join(", "));
    assert.deepEqual(s.slice(0, 3), ["speak-language-ai", "sarvam-ai", "duolingo-max"]);
  });

  it("on-topic searches are unchanged", () => {
    const meeting = ["read-ai", "fathom", "fireflies-ai", "otter-ai", "tactiq"];
    assert.deepEqual(top5("transcribe my Zoom meetings", { budget: "free", skill_level: "beginner" }), meeting);
    assert.deepEqual(top5("free AI tool to transcribe my Zoom meetings", { skill_level: "beginner" }), meeting);
    assert.deepEqual(top5("transcribe meetings"), meeting);
    assert.deepEqual(top5("make slides", { budget: "low" }), ["gamma", "genspark", "canva-ai-magic-studio", "napkin-ai"]);
    assert.deepEqual(top5("Grammarly alternatives"), ["paperpal", "trinka-ai", "quillbot", "chatgpt", "gemini"]);
    assert.deepEqual(top5("write a cover letter", { budget: "free" }), ["kickresume", "rezi", "teal", "chatgpt", "claude"]);
  });

  it("keeps best effort for single words, named tasks and write searches", () => {
    const fx = [
      row({ slug: "pics", name: "Pics", primaryUse: "Image generation", primaryUseCases: "Book covers" }),
      row({ slug: "lingo", name: "Lingo", primaryUse: "AI language learning", primaryUseCases: "Grammar explanations" }),
    ];
    // A single-word search is never cut.
    assert.deepEqual(searchTools({ task: "book" }, fx, none).results.map((r) => r.slug), ["pics"]);
    // Stray word only, no named task: cut.
    const off = searchTools({ task: "book a flight" }, fx, none);
    assert.equal(off.results.length, 0);
    assert.match(off.note ?? "", /^Nothing relevant:/);
    // A named task ("grammar") keeps the side mention as best effort.
    assert.deepEqual(searchTools({ task: "fix grammar in my essays" }, fx, none).results.map((r) => r.slug), ["lingo"]);
    // "write a book" keeps its labelled writing top-up on the snapshot.
    assert.ok(search("write a book").results.some((r) => r.slug === "chatgpt"));
  });
});
