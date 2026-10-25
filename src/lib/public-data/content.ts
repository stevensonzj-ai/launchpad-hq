/**
 * /data/v1 content records: guides, workflows, models and the quiz.
 *
 * Tool mentions resolve through the serializer (`citedToolSummary`), so a
 * tool's price here is always the one /data/v1/tools/{slug}.json serves.
 * Hidden and discontinued tools are dropped, as in the feed's
 * `alternatives`. Editorial prose goes through `proseCleaner`, which drops
 * sentences that quote a price. Workflow cost fields (costRange,
 * estMonthlyCost, note) are hand-typed price summaries and are left out.
 *
 * Model API prices are the exception: no catalog row carries them. They
 * come from the model registry (src/data/models), the same values and
 * formatter the /models pages render, and are null unless verified.
 */
import { listModelFamilies, getModelFamilyBySlug, type ModelVersion, type PlatformModelFamily } from "@/data/models";
import { CLAUDE_VS_GPT, CLAUDE_VS_GPT_PATH } from "@/data/models/claude-vs-gpt";
import type { PriceFact, TokenFact } from "@/data/models/types";
import {
  getStaticTutorialForPlatform,
  listRegisteredTutorials,
  tutorialGuidePath,
  type PlatformTutorialData,
} from "@/data/tutorials";
import { PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { isHiddenPlatform } from "@/lib/catalog-visibility";
import type { WorkflowTemplate, WorkflowTier } from "@/data/workflows/types";
import { formatPriceFact } from "@/lib/model-facts";
import { QUIZ_MAX_GOALS, QUIZ_QUESTION_COUNT, quizToRecommendationInput, type QuizAnswers } from "@/lib/quiz-map";
import { QUIZ_QUESTIONS } from "@/lib/quiz-options";
import { costTiersForBudget, goalKeywords } from "@/lib/recommendations-score";
import { absoluteUrl } from "@/lib/site";
import { dataUrl } from "./compare";
import { PRICING_NOTE, proseCleaner, type ProseCleaner } from "./prose";
import {
  SCHEMA_VERSION,
  type PublicGuideIndexT,
  type PublicGuideT,
  type PublicModelCompareT,
  type PublicModelFamilyT,
  type PublicModelsIndexT,
  type PublicModelVersionT,
  type PublicQuizT,
  type PublicToolSummaryT,
  type PublicWorkflowIndexT,
  type PublicWorkflowT,
} from "./schema";
import {
  FEED_ATTRIBUTION,
  FEED_LICENSE,
  citableRow,
  citedToolSummary,
  isExcludedSlug,
  type FeedTools,
} from "./serialize";

const footer = (feed: FeedTools) => ({
  generated_at: feed.ctx.generatedAt,
  sponsored: false as const,
  attribution: FEED_ATTRIBUTION,
});

const priced = (prose: ProseCleaner) => ({ prices_removed: prose.removed, pricing_note: PRICING_NOTE });

// ---------------------------------------------------------------- guides

/** Guides the feed lists: the tool's guide_url is set (registered, not retired, listed, not discontinued). */
export function feedGuides(feed: FeedTools, tutorials: PlatformTutorialData[] = listRegisteredTutorials()) {
  return tutorials
    .filter((t) => citableRow(t.platformSlug, feed) && feed.ctx.hasGuide(t.platformSlug))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export type GuideSlugResolution =
  | { kind: "guide"; slug: string }
  | { kind: "redirect"; slug: string }
  | { kind: "not_found" };

/**
 * `/data/v1/guides/{slug}.json`: a registered guide, a duplicate slug that
 * 301s to its canonical tool's guide (as /data/v1/tools does), or nothing.
 * Retired guides 404 here; their HTML 301s to the platform page instead.
 */
export function resolveGuideSlug(slug: string | null): GuideSlugResolution {
  if (!slug) return { kind: "not_found" };
  const moved = PLATFORM_REDIRECTS[slug];
  if (moved) return getStaticTutorialForPlatform(moved) ? { kind: "redirect", slug: moved } : { kind: "not_found" };
  if (isHiddenPlatform(slug) || RETIRED_GUIDE_SLUGS.includes(slug)) return { kind: "not_found" };
  return getStaticTutorialForPlatform(slug) ? { kind: "guide", slug } : { kind: "not_found" };
}

/** A whereToNext / internal link, or null if it points at a hidden or discontinued tool. */
function guideLink(item: PlatformTutorialData["whereToNext"][number], feed: FeedTools) {
  const href = item.categorySlug ? `/discover?category=${item.categorySlug}` : item.href;
  if (!href) return null;
  const platform = /^\/platform\/([^/?#]+)/.exec(href)?.[1];
  if (platform && isExcludedSlug(platform, feed)) return null;
  return { label: item.label, url: href.startsWith("/") ? absoluteUrl(href) : href };
}

export function toPublicGuide(tutorial: PlatformTutorialData, feed: FeedTools): PublicGuideT | null {
  const tool = citedToolSummary(tutorial.platformSlug, feed);
  if (!tool || !feed.ctx.hasGuide(tutorial.platformSlug)) return null;
  const prose = proseCleaner();
  const setup = tutorial.gettingSetUpSafely;
  const guide: Omit<PublicGuideT, "prices_removed" | "pricing_note" | "generated_at" | "sponsored" | "attribution"> = {
    schema_version: SCHEMA_VERSION,
    slug: tutorial.platformSlug,
    url: absoluteUrl(tutorialGuidePath(tutorial.platformSlug)),
    data_url: dataUrl(`/guides/${tutorial.platformSlug}.json`),
    title: tutorial.title,
    tagline: prose.text(tutorial.tagline) ?? "",
    archetype: tutorial.archetype,
    last_reviewed_at: tutorial.lastReviewedAt,
    changelog_url: tutorial.changelogUrl ?? null,
    how_it_works: prose.text(tutorial.howItWorks),
    what_it_is: prose.list(tutorial.whatItIs),
    before_you_start: prose.list(tutorial.beforeYouStart),
    getting_set_up_safely: setup
      ? {
          official_source: setup.officialSource,
          body: prose.list(setup.body),
          vendor_docs_url: setup.vendorDocsUrl ?? null,
        }
      : null,
    security: tutorial.security.flatMap((block): PublicGuideT["security"] => {
      if (block.kind === "text") {
        const text = prose.text(block.text);
        return text ? [{ kind: "text" as const, text }] : [];
      }
      const items = prose.list(block.items);
      return items.length ? [{ kind: "list" as const, label: block.label, items }] : [];
    }),
    triad: {
      best_at: prose.list(tutorial.triad.bestAt),
      okay_at: prose.list(tutorial.triad.okayAt),
      avoid: prose.list(tutorial.triad.avoid),
    },
    starter_actions: tutorial.starterActions.map((action) => ({
      title: prose.text(action.title) ?? "",
      what_it_does: prose.text(action.whatItDoes),
      why_here: prose.text(action.whyHere),
      tweak: prose.text(action.tweak),
      prompt: prose.text(action.prompt),
    })),
    pitfalls: prose.list(tutorial.pitfalls),
    where_to_next: tutorial.whereToNext.flatMap((item) => guideLink(item, feed) ?? []),
    tool,
  };
  return { ...guide, ...priced(prose), ...footer(feed) };
}

export function toPublicGuideIndex(feed: FeedTools): PublicGuideIndexT {
  const guides = feedGuides(feed).map((t) => {
    const tool = citedToolSummary(t.platformSlug, feed)!;
    return {
      slug: t.platformSlug,
      title: t.title,
      tool_name: tool.name,
      category: tool.category,
      last_reviewed_at: t.lastReviewedAt,
      url: absoluteUrl(tutorialGuidePath(t.platformSlug)),
      data_url: dataUrl(`/guides/${t.platformSlug}.json`),
    };
  });
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: feed.ctx.generatedAt,
    url: absoluteUrl("/tutorials"),
    count: guides.length,
    guides,
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}

// ------------------------------------------------------------- workflows

function workflowTier(tier: WorkflowTier, feed: FeedTools, prose: ProseCleaner): PublicWorkflowT["tiers"][number] {
  return {
    id: tier.id,
    name: tier.name,
    tagline: prose.text(tier.tagline) ?? "",
    time_estimate: tier.timeEstimate ?? null,
    result: prose.text(tier.result),
    tools: tier.tools
      .filter((tool) => !(tool.slug && isExcludedSlug(tool.slug, feed)))
      .map((tool) => ({
        name: tool.name,
        rationale: prose.text(tool.rationale),
        tool: citedToolSummary(tool.slug, feed),
      })),
    steps: (tier.steps ?? [])
      .filter((step) => !(step.toolSlug && isExcludedSlug(step.toolSlug, feed)))
      .map((step) => ({
        order: step.order,
        label: step.label,
        name: step.name ?? null,
        action: prose.text(step.action),
        prompt: prose.text(step.prompt),
        tool: citedToolSummary(step.toolSlug, feed),
      })),
  };
}

export function toPublicWorkflow(workflow: WorkflowTemplate, feed: FeedTools): PublicWorkflowT {
  const prose = proseCleaner();
  const tiers = (["optimal", "hybrid", "budget"] as const).map((id) => workflowTier(workflow.tiers[id], feed, prose));
  return {
    schema_version: SCHEMA_VERSION,
    slug: workflow.slug,
    url: absoluteUrl(`/workflows/${workflow.slug}`),
    data_url: dataUrl(`/workflows/${workflow.slug}.json`),
    title: workflow.title,
    description: prose.text(workflow.description) ?? "",
    tags: [...workflow.tags],
    tiers,
    ...priced(prose),
    ...footer(feed),
  };
}

export function toPublicWorkflowIndex(workflows: WorkflowTemplate[], generatedAt: string): PublicWorkflowIndexT {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: generatedAt,
    url: absoluteUrl("/workflows"),
    count: workflows.length,
    workflows: workflows.map((w) => ({
      slug: w.slug,
      title: w.title,
      description: proseCleaner().text(w.description) ?? "",
      tags: [...w.tags],
      url: absoluteUrl(`/workflows/${w.slug}`),
      data_url: dataUrl(`/workflows/${w.slug}.json`),
    })),
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}

// ---------------------------------------------------------------- models

function tokenFact(fact: TokenFact) {
  return { tokens: fact.verified ? fact.tokens : null, verified: fact.verified, note: fact.note ?? null };
}

/** The models page's value and text; the note qualifies this price, so it stays. */
function priceFact(fact: PriceFact) {
  return {
    usd_per_million: fact.verified ? fact.usdPerMillion : null,
    price_text: formatPriceFact(fact),
    verified: fact.verified,
    note: fact.note ?? null,
  };
}

export function toPublicModelVersion(version: ModelVersion, prose: ProseCleaner): PublicModelVersionT {
  return {
    id: version.id,
    name: version.name,
    api_id: version.apiId ?? null,
    release_date: version.releaseDate,
    release_date_verified: version.releaseDateVerified,
    status: version.status,
    role: version.role,
    context_window: tokenFact(version.contextWindow),
    max_output: tokenFact(version.maxOutput),
    api_price_input: priceFact(version.apiPriceInput),
    api_price_output: priceFact(version.apiPriceOutput),
    // Consumer plans are tool prices: those live in the tool records.
    consumer_access: { summary: prose.text(version.consumerAccess.summary), verified: version.consumerAccess.verified },
    strengths: prose.list(version.strengths),
    best_for: prose.text(version.bestFor),
    caveats: prose.list(version.caveats),
    sources: version.sourceUrls.map((s) => ({ label: s.label, url: s.url })),
  };
}

function familyTools(family: PlatformModelFamily, feed: FeedTools): PublicToolSummaryT[] {
  return family.platformSlugs.flatMap((slug) => citedToolSummary(slug, feed) ?? []);
}

export function toPublicModelFamily(family: PlatformModelFamily, feed: FeedTools): PublicModelFamilyT {
  const prose = proseCleaner();
  return {
    schema_version: SCHEMA_VERSION,
    slug: family.familySlug,
    url: absoluteUrl(`/models/${family.familySlug}`),
    data_url: dataUrl(`/models/${family.familySlug}.json`),
    name: family.displayName,
    vendor: family.vendor,
    last_verified_at: family.lastVerifiedAt,
    which_to_use: prose.list(family.whichToUse),
    versions: family.versions.map((v) => toPublicModelVersion(v, prose)),
    sources: family.sources.map((s) => ({ label: s.label, url: s.url })),
    tools: familyTools(family, feed),
    ...priced(prose),
    ...footer(feed),
  };
}

export function toPublicModelsIndex(generatedAt: string): PublicModelsIndexT {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: generatedAt,
    url: absoluteUrl("/models"),
    families: listModelFamilies().map((family) => ({
      slug: family.familySlug,
      name: family.displayName,
      vendor: family.vendor,
      last_verified_at: family.lastVerifiedAt,
      url: absoluteUrl(`/models/${family.familySlug}`),
      data_url: dataUrl(`/models/${family.familySlug}.json`),
    })),
    compare: [
      {
        slug: CLAUDE_VS_GPT.slug,
        title: CLAUDE_VS_GPT.title,
        description: CLAUDE_VS_GPT.description,
        url: absoluteUrl(CLAUDE_VS_GPT_PATH),
        data_url: dataUrl(`/models/compare/${CLAUDE_VS_GPT.slug}.json`),
      },
    ],
    attribution: FEED_ATTRIBUTION,
    license: FEED_LICENSE,
  };
}

/** Claude vs GPT, the same rows the page renders. Null if a family or version is missing. */
export function toPublicClaudeVsGpt(feed: FeedTools): PublicModelCompareT | null {
  const claude = getModelFamilyBySlug(CLAUDE_VS_GPT.families.claude);
  const gpt = getModelFamilyBySlug(CLAUDE_VS_GPT.families.gpt);
  if (!claude || !gpt) return null;
  const prose = proseCleaner();
  const rows: PublicModelCompareT["rows"] = [];
  for (const row of CLAUDE_VS_GPT.rows) {
    const c = claude.versions.find((v) => v.id === row.claudeId);
    const g = gpt.versions.find((v) => v.id === row.gptId);
    if (!c || !g) continue; // the page skips the row too
    rows.push({ label: row.label, claude: toPublicModelVersion(c, prose), gpt: toPublicModelVersion(g, prose) });
  }
  const slugs = [...new Set([...claude.platformSlugs, ...gpt.platformSlugs])];
  return {
    schema_version: SCHEMA_VERSION,
    slug: CLAUDE_VS_GPT.slug,
    url: absoluteUrl(CLAUDE_VS_GPT_PATH),
    data_url: dataUrl(`/models/compare/${CLAUDE_VS_GPT.slug}.json`),
    title: CLAUDE_VS_GPT.title,
    description: CLAUDE_VS_GPT.description,
    last_verified_at: { claude: claude.lastVerifiedAt, gpt: gpt.lastVerifiedAt },
    rows,
    families: [claude, gpt].map((f) => ({
      slug: f.familySlug,
      name: f.displayName,
      url: absoluteUrl(`/models/${f.familySlug}`),
      data_url: dataUrl(`/models/${f.familySlug}.json`),
    })),
    tools: slugs.flatMap((slug) => citedToolSummary(slug, feed) ?? []),
    ...priced(prose),
    ...footer(feed),
  };
}

// ------------------------------------------------------------------ quiz

/** Priorities one answer adds, computed by the real mapping (not restated). */
function prioritiesFor(patch: Partial<QuizAnswers>): string[] {
  // A neutral baseline: no option here adds a priority on its own.
  const base: QuizAnswers = { goal: "content_creation", experience: "intermediate", budget: "under_50", runtime: "cloud" };
  return quizToRecommendationInput({ ...base, ...patch }).priorities ?? [];
}

const optionsOf = (id: (typeof QUIZ_QUESTIONS)[number]["id"]) =>
  QUIZ_QUESTIONS.find((q) => q.id === id)?.options ?? [];

/** Questions, options and scoring map only. No answers, results or users. */
export function toPublicQuiz(): PublicQuizT {
  return {
    schema_version: SCHEMA_VERSION,
    url: absoluteUrl("/quiz"),
    data_url: dataUrl("/quiz.json"),
    results_url: absoluteUrl("/quiz/results"),
    question_count: QUIZ_QUESTION_COUNT,
    max_goals: QUIZ_MAX_GOALS,
    questions: QUIZ_QUESTIONS.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      hint: q.hint ?? null,
      multiple: q.id === "goals",
      options: q.options.map((o) => ({ id: o.id, label: o.label })),
    })),
    mapping: {
      note:
        "How answers become recommendation inputs: goals match tools by these keywords, budget limits the cost tiers considered, and the other answers add ranking priorities. Scoring also weighs each tool's difficulty against the experience answer, plus an editorial featured flag that is not a sponsor flag.",
      goals: Object.fromEntries(optionsOf("goals").map((o) => [o.id, { keywords: [...(goalKeywords[o.id] ?? [])] }])),
      experience: Object.fromEntries(
        optionsOf("experience").map((o) => [o.id, { priorities: prioritiesFor({ experience: o.id }) }]),
      ),
      budget: Object.fromEntries(
        optionsOf("budget").map((o) => [
          o.id,
          { cost_tiers: [...costTiersForBudget(o.id)], priorities: prioritiesFor({ budget: o.id }) },
        ]),
      ),
      runtime: Object.fromEntries(optionsOf("runtime").map((o) => [o.id, { priorities: prioritiesFor({ runtime: o.id }) }])),
    },
    sponsored: false,
    attribution: FEED_ATTRIBUTION,
  };
}
