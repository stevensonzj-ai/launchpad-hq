import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { TASK_TAGS, TASK_TAGS_WITHHELD, TASKS, taskTagsFor } from "@/data/task-tags";
import { renderToolMarkdown } from "@/lib/markdown/render";
import { renderLlmsFull } from "@/lib/public-data/llms-full";
import { PublicTool } from "@/lib/public-data/schema";
import { buildFeedContext, toPublicCatalog, toPublicTool } from "@/lib/public-data/serialize";
import { row } from "./fixtures";
import { CAREER_FIXTURE_ROWS, SEARCH_FIXTURE_ROWS } from "./search-fixtures";
import { detectPriceIntent, matchText, nameKey, namedToolCandidates, stem, words } from "./search-text";
import { findFreeAlternatives, findRow, getPricingFacts, searchTools, type CatalogRow } from "./tools";

/**
 * Search-relevance regressions (2026-10-26). Rows carry the real catalog text
 * (search-fixtures.ts), facts come from the real registry. Fixtures only.
 */

const ROWS = SEARCH_FIXTURE_ROWS;
const facts = getToolFacts;

/** Tools that used to surface on stray substrings ("discover", clinical "letters", "alternative"). */
const STRAY = [
  "connected-papers",
  "semantic-scholar",
  "litmaps",
  "doximity-gpt",
  "evenup",
  "hugging-face",
  "activepieces",
  "together-ai",
  "writesonic-chatsonic",
  "wispr-flow",
];

const search = (task: string, extra: Partial<Parameters<typeof searchTools>[0]> = {}) =>
  searchTools({ task, ...extra }, ROWS, facts);
const slugs = (out: ReturnType<typeof searchTools>) => out.results.map((r) => r.slug);

function assertNoStray(out: ReturnType<typeof searchTools>) {
  for (const slug of STRAY) assert.ok(!slugs(out).includes(slug), `${slug} in ${out.query}: ${slugs(out).join(", ")}`);
}

const WRITERS = new Set(["chatgpt", "claude", "gemini", "microsoft-copilot", "grammarly"]);

describe("search text helpers", () => {
  it("matches whole words with light plural and accent folding", () => {
    assert.ok(!matchText("Discover related papers").set.has("cover"));
    assert.ok(matchText("Clinical letters").set.has("letter"));
    assert.deepEqual(words("Résumés and CV"), ["resume", "and", "cv"]);
    assert.equal(stem("summaries"), "summary");
    assert.equal(stem("boxes"), "box");
    assert.equal(stem("class"), "class");
  });

  it("reads free and cheap intent from the text", () => {
    for (const t of ["write a cover letter for free", "free alternative to X", "no cost resume help", "without paying", "a $0 logo"]) {
      assert.equal(detectPriceIntent(t), "free", t);
    }
    for (const t of ["cheap logo maker", "low-cost slides", "budget transcription"]) {
      assert.equal(detectPriceIntent(t), "cheap", t);
    }
    assert.equal(detectPriceIntent("hands-free dictation"), null);
    assert.equal(detectPriceIntent("freemium tools"), null);
  });

  it("finds the named tool in alternative-style searches", () => {
    assert.ok(namedToolCandidates("free alternative to Grammarly").includes("Grammarly"));
    assert.ok(namedToolCandidates("something like ChatGPT but free").includes("ChatGPT"));
    assert.ok(namedToolCandidates("Canva alternatives").includes("Canva"));
    assert.ok(namedToolCandidates("use this instead of Notion AI").includes("Notion AI"));
    assert.equal(nameKey("Perplexity AI"), "perplexity");
    assert.equal(nameKey("perplexity.ai"), "perplexity");
  });
});

describe("search_tools relevance regressions", () => {
  it('"cover letter": writing tools, none of the stray matches', () => {
    const out = search("cover letter");
    assertNoStray(out);
    assert.ok(out.results.length >= 3);
    for (const slug of slugs(out).slice(0, 3)) assert.ok(WRITERS.has(slug), slug);
    assert.ok(out.results[0].match_reasons.some((r) => r.includes("task: cover letters")));
  });

  it('"write a cover letter" with budget free', () => {
    const out = search("write a cover letter", { budget: "free" });
    assertNoStray(out);
    for (const slug of slugs(out).slice(0, 3)) assert.ok(WRITERS.has(slug), slug);
    for (const r of out.results) assert.ok(["FREE", "FREEMIUM"].includes(r.cost_tier), r.slug);
  });

  it("the full natural-language prompt", () => {
    const out = search("what AI tools help me write a cover letter for free");
    assertNoStray(out);
    for (const slug of slugs(out).slice(0, 3)) assert.ok(WRITERS.has(slug), slug);
    assert.ok(out.results[0].match_reasons.some((r) => /free plan .*"free" in your request/.test(r)));
  });

  it('"job application writing"', () => {
    const out = search("job application writing");
    assertNoStray(out);
    for (const slug of slugs(out).slice(0, 3)) assert.ok(WRITERS.has(slug), slug);
  });

  it('"resume" now returns resume writers instead of nothing', () => {
    const out = search("resume");
    assert.ok(out.results.length >= 3);
    assertNoStray(out);
    for (const r of out.results) assert.ok(r.match_reasons.some((m) => m.includes("resumes and CVs")), r.slug);
  });

  it('"logo" and "make a logo" (budget low)', () => {
    for (const out of [search("logo"), search("make a logo", { budget: "low" })]) {
      assertNoStray(out);
      const top = slugs(out).slice(0, 3);
      for (const slug of ["ideogram", "canva-ai-magic-studio", "recraft"]) assert.ok(top.includes(slug), `${slug} in ${top}`);
    }
  });

  it('"free alternative to Grammarly" returns grammar and writing tools, not Grammarly', () => {
    const out = search("free alternative to Grammarly");
    assertNoStray(out);
    assert.ok(!slugs(out).includes("grammarly"));
    const top3 = slugs(out).slice(0, 3);
    assert.ok(top3.includes("quillbot"), top3.join(", "));
    for (const slug of top3) assert.ok(["quillbot", "trinka-ai", "paperpal"].includes(slug), slug);
    assert.ok(out.results[0].match_reasons.some((r) => r.startsWith("same tasks as Grammarly")));
  });

  it("free intent in the text favors free and freemium tools without filtering", () => {
    const paidWriter = row({
      slug: "paidwriter",
      name: "PaidWriter",
      primaryUse: "Cover letter and resume writing",
      costTier: "PAID",
      category: { name: "Text & Conversational AI", slug: "text-conversational-ai" },
    });
    const rows = [...ROWS, paidWriter];
    const plain = searchTools({ task: "cover letter", limit: 10 }, rows, facts);
    const free = searchTools({ task: "cover letter for free", limit: 10 }, rows, facts);
    // Without "free" it ranks on its own phrase match ("cover letter" in primary use).
    const plainOrder = slugs(plain);
    assert.ok(plainOrder.includes("paidwriter"));
    assert.ok(plain.results.find((r) => r.slug === "paidwriter")?.match_reasons.includes('"cover letter" in primary use'));
    // With "free" it drops below the free and freemium matches, but is not filtered out.
    const order = slugs(free);
    assert.ok(order.includes("paidwriter"));
    assert.equal(order[order.length - 1], "paidwriter");
    const paid = free.results.find((r) => r.slug === "paidwriter");
    assert.ok(paid?.match_reasons.some((r) => r.startsWith("no free plan listed")));
    // budget:"free" still hard-filters.
    assert.ok(!slugs(searchTools({ task: "cover letter", budget: "free" }, rows, facts)).includes("paidwriter"));
  });

  it("a task-tag match outranks a stray single-word hit", () => {
    const out = search("cover letter", { limit: 10 });
    const lastTagged = out.results.findLastIndex((r) => r.match_reasons.some((m) => m.startsWith("task:")));
    const firstUntagged = out.results.findIndex((r) => !r.match_reasons.some((m) => m.startsWith("task:")));
    assert.ok(firstUntagged === -1 || firstUntagged > lastTagged);
  });

  it("weak words alone fall back to loose matches and say so", () => {
    const out = search("alternative");
    assert.match(out.note ?? "", /loose word matches/);
    for (const r of out.results) assert.ok(r.match_reasons.some((m) => m.includes("(loose match)")), r.slug);
  });

  it("stays deterministic", () => {
    assert.deepEqual(search("cover letter for free"), search("cover letter for free"));
  });
});

describe("search_tools with the new Career & Job Search rows (catalog audit 9)", () => {
  const WITH_CAREER = [...ROWS, ...CAREER_FIXTURE_ROWS];
  const CAREER = new Set(CAREER_FIXTURE_ROWS.map((r) => r.slug));
  const searchAll = (task: string, extra: Partial<Parameters<typeof searchTools>[0]> = {}) =>
    searchTools({ task, ...extra }, WITH_CAREER, facts);

  it('"resume" puts the three resume builders first', () => {
    const out = searchAll("resume");
    assertNoStray(out);
    assert.deepEqual(new Set(slugs(out).slice(0, 3)), CAREER);
  });

  it("cover-letter and job-application searches keep career and writing tools on top, never stray matches", () => {
    for (const [task, extra] of [
      ["cover letter", {}],
      ["write a cover letter", { budget: "free" as const }],
      ["what AI tools help me write a cover letter for free", {}],
      ["job application writing", {}],
    ] as const) {
      const out = searchAll(task, extra);
      assertNoStray(out);
      const top5 = slugs(out).slice(0, 5);
      for (const slug of top5) assert.ok(CAREER.has(slug) || WRITERS.has(slug), `${task}: ${slug}`);
      assert.ok(top5.some((s) => CAREER.has(s)), `${task}: ${top5.join(", ")}`);
    }
  });

  it("resume builder alternatives are the other career tools", () => {
    const alts = findFreeAlternatives({ platform: "Teal", limit: 5 }, WITH_CAREER, facts).alternatives.map((a) => a.slug);
    assert.deepEqual(new Set(alts.slice(0, 2)), new Set(["kickresume", "rezi"]));
  });
});

describe("findRow name resolution", () => {
  it("accepts aliases, display names and a conservative normalization", () => {
    assert.equal(findRow("Perplexity", ROWS, facts)?.slug, "perplexity-ai");
    assert.equal(findRow("perplexity.ai", ROWS, facts)?.slug, "perplexity-ai");
    assert.equal(findRow("Canva", ROWS, facts)?.slug, "canva-ai-magic-studio");
    assert.equal(findRow("canva-magic-studio", ROWS, facts)?.slug, "canva-ai-magic-studio"); // feed alias
    assert.equal(findRow("Writesonic", ROWS, facts)?.slug, "writesonic-chatsonic");
    assert.equal(getPricingFacts({ platform: "Perplexity" }, ROWS, facts).platform.slug, "perplexity-ai");
  });

  it("never guesses: unknown and ambiguous inputs are not found", () => {
    assert.equal(findRow("FakeToolXYZ", ROWS, facts), undefined);
    assert.equal(findRow("Perplex", ROWS, facts), undefined);
    assert.equal(findRow("AI", ROWS, facts), undefined);
    const dupes: CatalogRow[] = [
      ...ROWS,
      row({ slug: "jasper", name: "Jasper" }),
      row({ slug: "jasper-ai", name: "Jasper AI" }),
    ];
    // Exact names still resolve; the folded key "jasper" matches two tools.
    assert.equal(findRow("Jasper", dupes, facts)?.slug, "jasper");
    assert.equal(findRow("Jasper app", dupes, facts), undefined);
  });
});

describe("find_free_alternatives uses task tags", () => {
  it("Grammarly's alternatives are writing and grammar tools, not paper finders", () => {
    const out = findFreeAlternatives({ platform: "Grammarly", limit: 10 }, ROWS, facts);
    const alts = out.alternatives.map((a) => a.slug);
    assert.ok(alts.slice(0, 3).includes("quillbot"), alts.join(", "));
    for (const slug of ["connected-papers", "semantic-scholar", "litmaps", "research-rabbit", "elicit", "consensus", "scite", "scispace", "scholarcy"]) {
      assert.ok(!alts.includes(slug), slug);
    }
    for (const a of out.alternatives.filter((x) => ["quillbot", "trinka-ai", "paperpal"].includes(x.slug))) {
      assert.match(a.why, /same tasks as Grammarly/);
    }
    // A gathered-but-unchecked free-tier fact is never called verified.
    for (const a of out.alternatives) {
      const fact = facts(a.slug)?.freeTier;
      if (fact?.status === "unverified") assert.match(a.why, /^sourced free tier \(unverified\): /, a.slug);
      if (a.why.startsWith("verified free tier")) assert.equal(fact?.status, "verified", a.slug);
    }
  });
});

describe("task tags", () => {
  it("are known tasks on catalog slugs, with no writing or career tags on narrow tools", () => {
    const known = new Set(Object.keys(TASKS));
    for (const [slug, tags] of Object.entries(TASK_TAGS)) {
      assert.ok(tags.length > 0, slug);
      assert.equal(new Set(tags).size, tags.length, `${slug} has duplicate tags`);
      for (const tag of tags) assert.ok(known.has(tag), `${slug}: ${tag}`);
    }
    for (const slug of Object.keys(TASK_TAGS_WITHHELD)) {
      for (const tag of taskTagsFor(slug) ?? []) {
        assert.ok(!["writing", "cover-letter", "resume", "job-search", "academic-writing", "email-writing"].includes(tag), `${slug}: ${tag}`);
      }
    }
    for (const slug of ["connected-papers", "semantic-scholar", "litmaps", "doximity-gpt", "evenup"]) {
      assert.ok(!(taskTagsFor(slug) ?? []).includes("cover-letter"), slug);
    }
  });

  it("feed, MCP, Markdown and llms-full.txt carry the same tasks", () => {
    const ctx = buildFeedContext(ROWS, facts, { generatedAt: "2026-10-26T00:00:00.000Z" });
    const touched = ["grammarly", "quillbot", "chatgpt", "claude", "ideogram", "canva-ai-magic-studio", "perplexity-ai", "connected-papers"];
    const llms = renderLlmsFull({
      generatedAt: ctx.generatedAt,
      catalog: toPublicCatalog(ROWS.filter((r) => touched.includes(r.slug)), facts, ctx),
      compare: [],
      guides: [],
      workflows: [],
      models: [],
      modelCompare: null,
    });
    for (const slug of touched) {
      const r = ROWS.find((x) => x.slug === slug)!;
      const feed = PublicTool.parse(JSON.parse(JSON.stringify(toPublicTool(r, facts(slug), ctx))));
      const mcp = getPricingFacts({ platform: slug }, ROWS, facts).platform;
      assert.deepEqual(mcp.tasks ?? null, feed.tasks, slug);
      assert.deepEqual(feed.tasks, taskTagsFor(slug), slug);
      const md = renderToolMarkdown(feed);
      if (feed.tasks) {
        assert.ok(md.includes(`Tasks: ${feed.tasks.join(", ")}`), `${slug} markdown`);
        assert.ok(llms.includes(`Tasks: ${feed.tasks.join(", ")}`), `${slug} llms-full`);
      }
    }
    assert.equal(PublicTool.parse(toPublicTool(ROWS.find((r) => r.slug === "hugging-face")!, facts("hugging-face"), ctx)).tasks, null);
  });
});
