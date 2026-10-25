import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COMPARE_PAGES,
  compareRedirects,
  comparePageDataPath,
  comparePagePath,
  resolveCompareSlug,
  type ComparePage,
} from "@/data/compare/pages";
import { comparePageLoadSlugs } from "@/data/compare/view";
import { listModelFamilies } from "@/data/models";
import { CLAUDE_VS_GPT } from "@/data/models/claude-vs-gpt";
import { getStaticTutorialForPlatform, listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { discontinuedPlatformSlugs, hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { row } from "@/lib/mcp/fixtures";
import type { CatalogRow } from "@/lib/mcp/tools";
import { formatPriceFact } from "@/lib/model-facts";
import { QUIZ_BUDGET_OPTIONS, QUIZ_GOAL_OPTIONS, QUIZ_QUESTIONS } from "@/lib/quiz-options";
import { costTiersForBudget } from "@/lib/recommendations-score";
import { buildTutorialMetadata, withFeedAlternate } from "@/lib/seo-metadata";
import { SITE_URL } from "@/lib/site";
import { feedComparePages, toPublicCompareIndex, toPublicComparePage } from "./compare";
import {
  feedGuides,
  resolveGuideSlug,
  toPublicClaudeVsGpt,
  toPublicGuide,
  toPublicGuideIndex,
  toPublicModelFamily,
  toPublicModelsIndex,
  toPublicQuiz,
  toPublicWorkflow,
  toPublicWorkflowIndex,
} from "./content";
import { FEED_ROWS, GENERATED_AT, HIDDEN_NAME, feedFacts } from "./fixtures";
import { llmsFullInput, renderLlmsFull } from "./llms-full";
import { hasPriceText, proseCleaner } from "./prose";
import {
  PublicCompareIndex,
  PublicComparePage,
  PublicGuide,
  PublicGuideIndex,
  PublicIndex,
  PublicModelCompare,
  PublicModelFamily,
  PublicModelsIndex,
  PublicQuiz,
  PublicWorkflow,
  PublicWorkflowIndex,
} from "./schema";
import {
  buildFeedContext,
  jsonFileSlug,
  toPublicCatalog,
  toPublicIndex,
  toPublicTool,
  toPublicToolSummary,
  type FeedTools,
} from "./serialize";

/**
 * Feed fixture rows plus a synthetic row for every slug the compare pages,
 * guides, workflows and model families cite, so every content record
 * builds. Hidden and discontinued fact files keep their rows (as a raw DB
 * would); the feed context must drop them.
 */
function contentRows(): CatalogRow[] {
  const have = new Set(FEED_ROWS.map((r) => r.slug));
  const cited = new Set<string>([
    ...COMPARE_PAGES.flatMap(comparePageLoadSlugs),
    ...listRegisteredTutorials().map((t) => t.platformSlug),
    ...WORKFLOWS.flatMap((w) =>
      Object.values(w.tiers).flatMap((tier) => [
        ...tier.tools.flatMap((t) => (t.slug ? [t.slug] : [])),
        ...(tier.steps ?? []).flatMap((s) => (s.toolSlug ? [s.toolSlug] : [])),
      ]),
    ),
    ...listModelFamilies().flatMap((f) => f.platformSlugs),
  ]);
  const extra = [...cited]
    .filter((slug) => !have.has(slug))
    .sort()
    .map((slug) =>
      row({
        slug,
        name: slug.replace(/-/g, " "),
        costTier: "FREEMIUM",
        currentPricing: "Free; Pro $12/mo (official, as of 2026-10-25)",
        freeTierFeatures: "Free plan with daily limits (official, as of 2026-10-25)",
        category: { slug: "chat-assistants", name: "Chat assistants" },
      }),
    );
  return [...FEED_ROWS, ...extra];
}

const ROWS = contentRows();
const ctx = buildFeedContext(ROWS, feedFacts, {
  generatedAt: GENERATED_AT,
  hasGuide: (slug) => Boolean(getStaticTutorialForPlatform(slug)) && !RETIRED_GUIDE_SLUGS.includes(slug),
});
const feed: FeedTools = { rows: ROWS, facts: feedFacts, ctx };
const rowOf = (slug: string) => ROWS.find((r) => r.slug === slug)!;
/** What /data/v1/tools/{slug}.json serves for this slug. */
const toolRecord = (slug: string) => toPublicTool(rowOf(slug), feedFacts(slug), ctx);

const EXCLUDED = new Set([...hiddenPlatformSlugs(), ...discontinuedPlatformSlugs()]);

const comparePages = () => COMPARE_PAGES.map((page) => toPublicComparePage(page, feed)!);
const guides = () => feedGuides(feed).map((t) => toPublicGuide(t, feed)!);
const workflows = () => WORKFLOWS.map((w) => toPublicWorkflow(w, feed));
const families = () => listModelFamilies().map((f) => toPublicModelFamily(f, feed));

/** Every object in a JSON value that is a tool record or summary. */
function toolObjects(value: unknown, out: { slug: string }[] = []): { slug: string }[] {
  if (Array.isArray(value)) {
    for (const item of value) toolObjects(item, out);
  } else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.slug === "string" && "cost_tier" in obj) out.push(obj as { slug: string });
    for (const child of Object.values(obj)) toolObjects(child, out);
  }
  return out;
}

/**
 * Every string in a content record outside the serializer's tool objects
 * and the model registry's structured price facts.
 */
function proseStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) proseStrings(item, out);
  else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("cost_tier" in obj || "usd_per_million" in obj) return out;
    for (const child of Object.values(obj)) proseStrings(child, out);
  }
  return out;
}

const SECRET_RES: RegExp[] = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, // email address
  /\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]+/, // Stripe keys
  /\bwhsec_[A-Za-z0-9]+/,
  /\bpostgres(?:ql)?:\/\//i,
  /\bDATABASE_URL\b|\bDIRECT_URL\b|\bCLERK_SECRET_KEY\b|\bSTRIPE_SECRET_KEY\b|\bRESEND_API_KEY\b/,
  /\bep-[a-z]+-[a-z]+-[a-z0-9]{6,}\b/, // Neon compute host
  /\bBearer\s+[A-Za-z0-9._-]{12,}/,
  /gatheredBy|verifiedBy|claude-subagent/, // reviewer identity
];

function assertNoSecrets(label: string, text: string) {
  for (const re of SECRET_RES) assert.ok(!re.test(text), `${label} matches ${re}: ${re.exec(text)?.[0]}`);
}

describe("compare JSON routing", () => {
  it("resolves every registry page by its own slug", () => {
    for (const page of COMPARE_PAGES) {
      const hit = resolveCompareSlug(page.slug);
      assert.equal(hit.kind, "page", page.slug);
      assert.equal(comparePageDataPath(page), `/compare/${page.slug}.json`);
    }
  });

  it("301s each reverse-order head-to-head to the canonical JSON, mirroring the HTML redirects", () => {
    const redirects = compareRedirects();
    assert.ok(redirects.length > 0);
    for (const redirect of redirects) {
      const reverse = redirect.source.replace("/compare/", "");
      const canonical = redirect.destination.replace("/compare/", "");
      assert.deepEqual(resolveCompareSlug(reverse), { kind: "redirect", slug: canonical });
      assert.equal(resolveCompareSlug(canonical).kind, "page");
    }
  });

  it("404s unknown slugs, free-alternatives reversals and files without .json", () => {
    for (const slug of ["nope", "otter-ai-vs-fathom", "alternatives-otter-ai-free", ""]) {
      assert.equal(resolveCompareSlug(slug).kind, "not_found", slug);
    }
    assert.equal(jsonFileSlug("heygen-vs-synthesia"), null);
    assert.equal(jsonFileSlug("heygen-vs-synthesia.json"), "heygen-vs-synthesia");
    assert.equal(jsonFileSlug("a/b.json"), null);
  });
});

describe("compare JSON pages", () => {
  it("builds every page against the schema with canonical and data URLs", () => {
    for (const page of comparePages()) {
      PublicComparePage.parse(page);
      const source = COMPARE_PAGES.find((p) => p.slug === page.slug)!;
      assert.equal(page.url, `${SITE_URL}${comparePagePath(source)}`);
      assert.equal(page.data_url, `${SITE_URL}/data/v1/compare/${page.slug}.json`);
      assert.equal(page.sponsored, false);
      for (const item of page.faq) assert.ok(item.question.endsWith("?"), item.question);
    }
  });

  it("serves each tool exactly as /data/v1/tools/{slug}.json does (price parity)", () => {
    for (const page of comparePages()) {
      assert.ok(page.tools.length >= 2, page.slug);
      for (const entry of page.tools) {
        assert.deepEqual(entry.tool, toolRecord(entry.tool.slug), `${page.slug}: ${entry.tool.slug}`);
      }
      for (const summary of page.also_consider) {
        assert.deepEqual(summary, toPublicToolSummary(toolRecord(summary.slug)));
      }
    }
  });

  it("carries no number or currency in its own copy (prices only in tool records)", () => {
    for (const page of comparePages()) {
      for (const text of [page.description, ...page.intro, ...page.hit_first, ...page.faq.flatMap((f) => [f.question, f.answer])]) {
        assert.ok(!hasPriceText(text), `${page.slug}: ${text}`);
      }
    }
  });

  it("lists every page in the compare index, plus Claude vs GPT under models", () => {
    const index = toPublicCompareIndex(feed);
    PublicCompareIndex.parse(index);
    assert.deepEqual(index.pages.map((p) => p.slug), COMPARE_PAGES.map((p) => p.slug));
    assert.deepEqual(index.models.map((m) => m.data_url), [
      `${SITE_URL}/data/v1/models/compare/claude-vs-gpt.json`,
    ]);
  });

  it("drops hidden and discontinued tools, and 404s a page that needs one", () => {
    const hidden = "relay-app";
    const gone = "play-ht";
    assert.ok(hiddenPlatformSlugs().includes(hidden));
    assert.ok(discontinuedPlatformSlugs().includes(gone));
    const alternatives: ComparePage = {
      kind: "free-alternatives",
      slug: "free-test-alternatives",
      title: "Test",
      description: "Test page",
      baseline: "chatgpt",
      alternatives: [{ slug: hidden }, { slug: gone }, { slug: "gemini" }],
      intro: [],
      picks: [],
      hitFirst: [],
      faq: [],
      alsoConsider: [hidden, "sora-2", "claude"],
    };
    const out = toPublicComparePage(alternatives, feed)!;
    assert.deepEqual(out.tools.map((t) => t.tool.slug), ["chatgpt", "gemini"]);
    assert.deepEqual(out.also_consider.map((t) => t.slug), ["claude"]);
    assert.ok(!JSON.stringify(out).includes(HIDDEN_NAME));

    for (const [a, b] of [["chatgpt", hidden], [gone, "gemini"], ["chatgpt", "no-such-row"]]) {
      const h2h: ComparePage = { ...alternatives, kind: "head-to-head", slug: `${a}-vs-${b}`, a, b };
      assert.equal(toPublicComparePage(h2h, feed), null, `${a} vs ${b}`);
    }
    const listed = feedComparePages(feed, [alternatives, { ...alternatives, slug: "x", baseline: hidden }]);
    assert.deepEqual(listed.map((p) => p.slug), ["free-test-alternatives"]);
  });
});

describe("guides JSON", () => {
  it("builds every listed guide against the schema, with the tool summary from the serializer", () => {
    const all = guides();
    assert.ok(all.length > 100);
    for (const guide of all) {
      PublicGuide.parse(guide);
      assert.equal(guide.url, `${SITE_URL}/platform/${guide.slug}/guide`);
      assert.equal(guide.data_url, `${SITE_URL}/data/v1/guides/${guide.slug}.json`);
      assert.deepEqual(guide.tool, toPublicToolSummary(toolRecord(guide.slug)));
    }
    const index = toPublicGuideIndex(feed);
    PublicGuideIndex.parse(index);
    assert.equal(index.count, all.length);
  });

  it("never lists a hidden, discontinued or retired guide", () => {
    const slugs = new Set(guides().map((g) => g.slug));
    for (const slug of [...EXCLUDED, ...RETIRED_GUIDE_SLUGS]) assert.ok(!slugs.has(slug), slug);
    for (const tutorial of listRegisteredTutorials()) {
      if (EXCLUDED.has(tutorial.platformSlug)) assert.equal(toPublicGuide(tutorial, feed), null, tutorial.platformSlug);
    }
  });

  it("drops every sentence that typed a price, and says so", () => {
    let removed = 0;
    for (const guide of guides()) {
      for (const text of proseStrings(guide)) assert.ok(!hasPriceText(text), `${guide.slug}: ${text}`);
      removed += guide.prices_removed;
    }
    assert.ok(removed > 0, "some guides quoted prices");
  });

  it("resolves guide slugs: registered, duplicate (301), hidden, retired and unknown", () => {
    const registered = listRegisteredTutorials()[0].platformSlug;
    assert.deepEqual(resolveGuideSlug(registered), { kind: "guide", slug: registered });
    for (const [from, to] of Object.entries(PLATFORM_REDIRECTS)) {
      const hit = resolveGuideSlug(from);
      if (getStaticTutorialForPlatform(to)) assert.deepEqual(hit, { kind: "redirect", slug: to });
      else assert.equal(hit.kind, "not_found");
    }
    for (const slug of [...hiddenPlatformSlugs().filter((s) => !PLATFORM_REDIRECTS[s]), ...RETIRED_GUIDE_SLUGS, "nope", null]) {
      assert.equal(resolveGuideSlug(slug).kind, "not_found", String(slug));
    }
  });
});

describe("workflows JSON", () => {
  it("builds every workflow against the schema; tool summaries come from the serializer", () => {
    for (const workflow of workflows()) {
      PublicWorkflow.parse(workflow);
      for (const tool of toolObjects(workflow)) {
        assert.deepEqual(tool, toPublicToolSummary(toolRecord(tool.slug)), `${workflow.slug}: ${tool.slug}`);
      }
    }
    PublicWorkflowIndex.parse(toPublicWorkflowIndex(WORKFLOWS, GENERATED_AT));
  });

  it("leaves out hand-typed cost fields and every sentence that typed a price", () => {
    for (const workflow of workflows()) {
      const json = JSON.stringify(workflow);
      for (const key of ["costRange", "estMonthlyCost", "cost_range", "est_monthly_cost", '"note"']) {
        assert.ok(!json.includes(key), `${workflow.slug} carries ${key}`);
      }
      for (const text of proseStrings(workflow)) assert.ok(!hasPriceText(text), `${workflow.slug}: ${text}`);
    }
  });

  it("drops discontinued tools (PlayHT) rather than recommending them", () => {
    const voice = WORKFLOWS.find((w) => JSON.stringify(w).includes('"play-ht"'));
    assert.ok(voice, "a workflow still names play-ht in its source data");
    const out = toPublicWorkflow(voice, feed);
    assert.ok(!JSON.stringify(out).includes("play-ht"));
    assert.ok(!out.tiers.some((tier) => tier.tools.some((t) => t.name === "PlayHT")));
  });
});

describe("models JSON", () => {
  it("builds every family and Claude vs GPT against the schema", () => {
    for (const family of families()) PublicModelFamily.parse(family);
    PublicModelsIndex.parse(toPublicModelsIndex(GENERATED_AT));
    const cvg = toPublicClaudeVsGpt(feed);
    assert.ok(cvg);
    PublicModelCompare.parse(cvg);
    assert.equal(cvg.rows.length, CLAUDE_VS_GPT.rows.length);
    assert.equal(cvg.data_url, `${SITE_URL}/data/v1/models/compare/claude-vs-gpt.json`);
    assert.equal(cvg.url, `${SITE_URL}/models/compare/claude-vs-gpt`);
  });

  it("uses the registry values and the page's formatter for API prices, null unless verified", () => {
    for (const source of listModelFamilies()) {
      const family = families().find((f) => f.slug === source.familySlug)!;
      for (const version of source.versions) {
        const out = family.versions.find((v) => v.id === version.id)!;
        for (const [fact, pub] of [
          [version.apiPriceInput, out.api_price_input],
          [version.apiPriceOutput, out.api_price_output],
        ] as const) {
          assert.equal(pub.price_text, formatPriceFact(fact));
          assert.equal(pub.usd_per_million, fact.verified ? fact.usdPerMillion : null);
        }
      }
      for (const text of proseStrings(family)) assert.ok(!hasPriceText(text), `${family.slug}: ${text}`);
      for (const tool of family.tools) assert.deepEqual(tool, toPublicToolSummary(toolRecord(tool.slug)));
    }
  });
});

describe("quiz JSON", () => {
  it("publishes the quiz's own questions, options and mapping, and nothing about users", () => {
    const quiz = toPublicQuiz();
    PublicQuiz.parse(quiz);
    assert.deepEqual(
      quiz.questions.map((q) => [q.id, q.prompt, q.options.map((o) => o.id)]),
      QUIZ_QUESTIONS.map((q) => [q.id, q.prompt, q.options.map((o) => o.id)]),
    );
    assert.deepEqual(Object.keys(quiz.mapping.goals), QUIZ_GOAL_OPTIONS.map((o) => o.id));
    for (const option of QUIZ_BUDGET_OPTIONS) {
      assert.deepEqual(quiz.mapping.budget[option.id].cost_tiers, costTiersForBudget(option.id));
    }
    assert.deepEqual(quiz.mapping.budget.free.priorities, ["free"]);
    assert.deepEqual(quiz.mapping.runtime.local.priorities, ["offline"]);
    assert.deepEqual(quiz.mapping.experience.beginner.priorities, ["ease_of_use"]);
    const json = JSON.stringify(quiz);
    for (const word of ["quizAnswers", "userId", "answers\"", "email", "clerk"]) assert.ok(!json.includes(word), word);
  });
});

describe("feed index and alternates", () => {
  it("links every new collection from /data/v1/index.json", () => {
    const index = toPublicIndex(toPublicCatalog(ROWS, feedFacts, ctx));
    PublicIndex.parse(index);
    assert.equal(index.links.compare, `${SITE_URL}/data/v1/compare/index.json`);
    assert.equal(index.links.compare_page, `${SITE_URL}/data/v1/compare/{slug}.json`);
    assert.equal(index.links.guides, `${SITE_URL}/data/v1/guides/index.json`);
    assert.equal(index.links.workflows, `${SITE_URL}/data/v1/workflows/index.json`);
    assert.equal(index.links.models, `${SITE_URL}/data/v1/models/index.json`);
    assert.equal(index.links.models_compare, `${SITE_URL}/data/v1/models/compare/claude-vs-gpt.json`);
    assert.equal(index.links.quiz, `${SITE_URL}/data/v1/quiz.json`);
    assert.equal(index.links.llms_full, `${SITE_URL}/llms-full.txt`);
  });

  it("adds a JSON alternate link; guides link the guide and the tool records", () => {
    const meta = withFeedAlternate({ title: "x" }, "/compare/heygen-vs-synthesia.json");
    assert.equal(meta.alternates?.types?.["application/json"], `${SITE_URL}/data/v1/compare/heygen-vs-synthesia.json`);
    const guide = buildTutorialMetadata({ platformSlug: "chatgpt", name: "ChatGPT", tagline: "t", lastReviewedAt: "2026-10-01" });
    assert.deepEqual(guide.alternates?.types?.["application/json"], [
      { url: `${SITE_URL}/data/v1/guides/chatgpt.json` },
      { url: `${SITE_URL}/data/v1/tools/chatgpt.json` },
    ]);
    const hidden = buildTutorialMetadata({ platformSlug: "relay-app", name: "Relay", tagline: "t", lastReviewedAt: "2026-10-01" });
    assert.equal(hidden.alternates?.types, undefined);
    const gone = buildTutorialMetadata({ platformSlug: "play-ht", name: "PlayHT", tagline: "t", lastReviewedAt: "2026-10-01" });
    assert.equal(gone.alternates?.types?.["application/json"], `${SITE_URL}/data/v1/tools/play-ht.json`);
  });
});

describe("llms-full.txt", () => {
  const text = renderLlmsFull(llmsFullInput(feed));
  const catalog = toPublicCatalog(ROWS, feedFacts, ctx);

  it("has an as-of date and a canonical URL for the file and every section", () => {
    assert.match(text, /As of 2026-10-25\./);
    assert.ok(text.includes(`Canonical: ${SITE_URL}/llms-full.txt`));
    for (const [heading, url] of [
      ["## Catalog", "/discover"],
      ["## Comparisons", "/compare"],
      ["## Guides", "/tutorials"],
      ["## Workflows", "/workflows"],
      ["## Models", "/models"],
    ]) {
      const at = text.indexOf(heading);
      assert.ok(at >= 0, heading);
      assert.ok(text.slice(at, at + 200).includes(`Canonical: ${SITE_URL}${url}`), heading);
    }
  });

  it("prints every listed tool with its canonical URL, serializer price and a source", () => {
    for (const tool of catalog.tools) {
      const start = text.indexOf(`### ${tool.name}\n\nCanonical: ${tool.url}\n`);
      assert.ok(start >= 0, tool.slug);
      const block = text.slice(start, text.indexOf("\n### ", start + 4));
      if (tool.starting_price) assert.ok(block.includes(`Starting price: ${tool.starting_price}`), tool.slug);
      for (const plan of tool.plans) assert.ok(block.includes(`- ${plan.name}: ${plan.price_text}`), tool.slug);
      assert.match(block, /Sources:\n- \S+/, tool.slug);
      if (tool.lifecycle === "discontinued") {
        assert.ok(block.includes("Status: discontinued"), tool.slug);
        assert.ok(!block.includes("Plans:"), tool.slug);
      }
    }
  });

  it("includes every compare page, guide, workflow and model family by canonical URL", () => {
    for (const page of comparePages()) assert.ok(text.includes(`Canonical: ${page.url}\n`), page.slug);
    for (const guide of guides()) assert.ok(text.includes(`Canonical: ${guide.url}\n`), guide.slug);
    for (const workflow of workflows()) assert.ok(text.includes(`Canonical: ${workflow.url}\n`), workflow.slug);
    for (const family of families()) assert.ok(text.includes(`Canonical: ${family.url}\n`), family.slug);
    assert.ok(text.includes(`Canonical: ${SITE_URL}/models/compare/claude-vs-gpt\n`));
  });

  it("redacts an email address even when it comes from catalog text", () => {
    const rows = [...ROWS, row({ slug: "mailer", name: "Mailer", description: "Write to help@mailer.example.com for access." })];
    const mailFeed: FeedTools = { rows, facts: feedFacts, ctx: buildFeedContext(rows, feedFacts, { generatedAt: GENERATED_AT }) };
    const out = renderLlmsFull(llmsFullInput(mailFeed));
    assert.ok(out.includes("### Mailer"));
    assert.ok(!out.includes("help@mailer.example.com"));
  });

  it("never shows a hidden tool", () => {
    assert.ok(!text.includes(`### ${HIDDEN_NAME}\n`));
    for (const slug of hiddenPlatformSlugs()) {
      assert.ok(!text.includes(`/platform/${slug}\n`), slug);
      assert.ok(!text.includes(`/data/v1/tools/${slug}.json`), slug);
    }
  });
});

describe("visibility across every content record", () => {
  it("never cites a hidden or discontinued tool in compare pages, guides, workflows or models", () => {
    const records = [...comparePages(), ...guides(), ...workflows(), ...families(), toPublicClaudeVsGpt(feed)];
    for (const record of records) {
      for (const tool of toolObjects(record)) assert.ok(!EXCLUDED.has(tool.slug), tool.slug);
      const json = JSON.stringify(record);
      for (const slug of EXCLUDED) {
        assert.ok(!json.includes(`/data/v1/tools/${slug}.json`), slug);
        assert.ok(!json.includes(`/platform/${slug}"`), slug);
      }
    }
  });
});

describe("no private data in any output", () => {
  it("has no email address, secret, connection string or reviewer identity", () => {
    const outputs: Array<[string, unknown]> = [
      ["compare index", toPublicCompareIndex(feed)],
      ...comparePages().map((p): [string, unknown] => [`compare ${p.slug}`, p]),
      ["guide index", toPublicGuideIndex(feed)],
      ...guides().map((g): [string, unknown] => [`guide ${g.slug}`, g]),
      ["workflow index", toPublicWorkflowIndex(WORKFLOWS, GENERATED_AT)],
      ...workflows().map((w): [string, unknown] => [`workflow ${w.slug}`, w]),
      ["models index", toPublicModelsIndex(GENERATED_AT)],
      ...families().map((f): [string, unknown] => [`model ${f.slug}`, f]),
      ["claude vs gpt", toPublicClaudeVsGpt(feed)],
      ["quiz", toPublicQuiz()],
    ];
    for (const [label, value] of outputs) assertNoSecrets(label, JSON.stringify(value));
    assertNoSecrets("llms-full.txt", renderLlmsFull(llmsFullInput(feed)));
  });

  it("the scanner itself catches what it should", () => {
    for (const bad of ["mail me at someone@example.com", "postgresql://u:p@h/db", "sk_live_abc123", "verifiedBy"]) {
      assert.ok(SECRET_RES.some((re) => re.test(bad)), bad);
    }
  });
});

describe("prose cleaner", () => {
  it("drops only the sentences that quote a price", () => {
    const prose = proseCleaner();
    assert.equal(prose.text("Great for notes. Pro is $10/mo. Try it free."), "Great for notes. Try it free.");
    assert.equal(prose.text("Costs €19.90 a month."), null);
    assert.equal(prose.text("Use **bold** and `code`."), "Use bold and code.");
    assert.deepEqual(prose.list(["Keep me", "Only US$ 5 here."]), ["Keep me"]);
    assert.equal(prose.removed, 3);
    assert.equal(prose.text("Invite fred@fireflies.ai to the call."), "Invite [email address on the web page] to the call.");
    assert.equal(hasPriceText("25% off any paid plan"), false);
    assert.equal(hasPriceText("20 USD per seat"), true);
  });
});
