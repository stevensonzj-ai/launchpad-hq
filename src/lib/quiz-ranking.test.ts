import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { CostTier, Difficulty } from "@prisma/client";
import { discontinuedPlatformSlugs } from "@/lib/catalog-visibility";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { QUIZ_GOAL_OPTIONS } from "@/lib/quiz-options";
import { NEVER_ALLOWED_CATEGORIES, QUIZ_DEFAULTS } from "@/data/quiz-defaults";
import { quizToRecommendationInput, type QuizAnswers } from "./quiz-map";
import {
  allowedCategories,
  localRuntimeNotice,
  orderedDefaultPicks,
  rankQuizRecommendations,
  type RankableCandidate,
} from "./quiz-ranking";
import { costTiersForBudget, rankScoredPlatforms, type RecommendationInput } from "./recommendations-score";

type Candidate = RankableCandidate & { category: { slug: string; name: string } };

/**
 * The recommendation candidate pool, rebuilt from the catalog snapshot the
 * same way recommendations-core reads it: listed rows (the snapshot holds no
 * hidden rows), minus discontinued, within the budget's cost tiers. The
 * snapshot has no featured / mobileWebFriendly columns; both read false.
 */
function candidatesFor(budget: string): Candidate[] {
  const tiers = new Set<string>(costTiersForBudget(budget));
  const discontinued = new Set(discontinuedPlatformSlugs());
  return snapshotRows()
    .filter((r) => tiers.has(r.costTier) && !discontinued.has(r.slug) && r.category)
    .map((r) => ({
      slug: r.slug,
      name: r.name,
      category: r.category!,
      costTier: r.costTier as CostTier,
      difficultyLevel: r.difficultyLevel as Difficulty,
      privacyLevel: r.privacyLevel,
      apiAvailable: r.apiAvailable,
      offlineCapable: r.offlineCapable,
      featured: false,
      freeTierFeatures: r.freeTierFeatures,
      hasMobileApp: r.hasMobileApp,
      mobileWebFriendly: false,
      primaryUseCases: r.primaryUseCases,
      primaryUse: r.primaryUse,
    }));
}

const answers = (patch: Partial<QuizAnswers> & { goal: string }): QuizAnswers => ({
  experience: "beginner",
  budget: "free",
  runtime: "cloud",
  ...patch,
});

function rank(a: QuizAnswers) {
  const input = quizToRecommendationInput(a);
  return { input, out: rankQuizRecommendations(candidatesFor(input.budget!), input) };
}

describe("quiz ranking: golden beginner / free / cloud cases", () => {
  for (const { id: goal } of QUIZ_GOAL_OPTIONS) {
    it(`${goal}: leads with the first eligible beginner pick; top three are defaults or guard-approved`, () => {
      const { input, out } = rank(answers({ goal }));
      const pool = new Set(candidatesFor("free").map((c) => c.slug));
      const firstEligible = QUIZ_DEFAULTS[goal as keyof typeof QUIZ_DEFAULTS].beginner.find((p) => pool.has(p.slug));
      assert.ok(firstEligible, `${goal}: no eligible default`);
      assert.equal(out[0]?.slug, firstEligible.slug);
      assert.equal(out[0]?.defaultPick, true);
      const allowed = allowedCategories(input);
      for (const r of out.slice(0, 3)) {
        assert.ok(r.defaultPick || allowed.has(r.category.slug), `${goal}: ${r.slug} (${r.category.slug})`);
      }
    });
  }
});

describe("quiz ranking: Zach's list corrections (2026-11-12)", () => {
  const slugs = (goal: keyof typeof QUIZ_DEFAULTS, level: "beginner" | "experienced") =>
    QUIZ_DEFAULTS[goal][level].map((p) => p.slug);

  it("the corrected default lists, exactly", () => {
    assert.deepEqual(slugs("education", "beginner"), ["quizlet-q-chat", "gemini-notebook", "chatgpt"]);
    assert.deepEqual(slugs("education", "experienced"), ["magicschool", "brisk-teaching", "quizlet-q-chat", "gemini-notebook", "chatgpt"]);
    assert.deepEqual(slugs("video", "beginner"), ["capcut", "veed", "heygen"]);
    assert.deepEqual(slugs("video", "experienced"), ["runway", "google-veo-3-1"]);
    assert.deepEqual(slugs("business", "experienced"), ["otter-ai", "gamma"]);
    assert.deepEqual(slugs("data_analysis", "beginner"), ["chatgpt", "gemini"]);
    assert.deepEqual(slugs("data_analysis", "experienced"), ["julius-ai", "chatgpt", "gemini"]);
  });

  it("removed picks are no longer defaults anywhere", () => {
    const all = Object.values(QUIZ_DEFAULTS).flatMap((g) => [...g.beginner, ...g.experienced]).map((p) => p.slug);
    for (const gone of ["khan-academy-khanmigo", "invideo-ai", "notion-ai"]) assert.ok(!all.includes(gone), gone);
    assert.ok(!slugs("data_analysis", "beginner").includes("microsoft-copilot"));
    assert.ok(!slugs("data_analysis", "experienced").includes("microsoft-copilot"));
  });

  it("goldens: education leads with Quizlet, video with CapCut, data with ChatGPT then Gemini", () => {
    assert.equal(rank(answers({ goal: "education" })).out[0]?.slug, "quizlet-q-chat");
    assert.equal(rank(answers({ goal: "video" })).out[0]?.slug, "capcut");
    assert.deepEqual(rank(answers({ goal: "data_analysis" })).out.slice(0, 2).map((r) => r.slug), ["chatgpt", "gemini"]);
    assert.equal(rank(answers({ goal: "education", experience: "intermediate" })).out[0]?.slug, "magicschool");
  });

  it("removed picks can still appear as ordinary scored results, never as defaults", () => {
    for (const goal of ["education", "video", "business", "data_analysis"]) {
      for (const experience of ["beginner", "intermediate"]) {
        for (const r of rank(answers({ goal, experience })).out) {
          if (["khan-academy-khanmigo", "invideo-ai", "notion-ai"].includes(r.slug)) assert.equal(r.defaultPick, false, r.slug);
        }
      }
    }
  });
});

describe("quiz ranking: runtime=local (preview bug 2026-11-12)", () => {
  it("golden: coding / beginner / free / local leads with ollama, lm-studio, jan and contains no cloud tool", () => {
    const { input, out } = rank(answers({ goal: "coding", runtime: "local" }));
    assert.deepEqual(out.slice(0, 3).map((r) => r.slug), ["ollama", "lm-studio", "jan"]);
    for (const r of out) assert.equal(r.category.slug, "local-open-source-ai", r.slug);
    assert.equal(localRuntimeNotice(input), null);
  });

  it("goals with local picks return only local-open-source-ai tools", () => {
    for (const goal of ["content_creation", "coding", "research", "image_generation", "business", "education", "data_analysis"]) {
      for (const experience of ["beginner", "advanced"]) {
        const { input, out } = rank(answers({ goal, experience, runtime: "local" }));
        assert.deepEqual([...allowedCategories(input)], ["local-open-source-ai"], goal);
        for (const r of out) assert.equal(r.category.slug, "local-open-source-ai", `${goal}: ${r.slug}`);
      }
    }
  });

  it("golden: video / beginner / free / local shows the notice, then cloud results", () => {
    const { input, out } = rank(answers({ goal: "video", runtime: "local" }));
    assert.equal(
      localRuntimeNotice(input),
      "We don't list any beginner-friendly tools for Video that run on your own computer, so these results are cloud tools.",
    );
    assert.ok(out.length > 0);
    assert.ok(out.some((r) => r.category.slug === "video-creation-editing"));
  });

  it("audio and automation show the notice too; cloud runtime never does", () => {
    for (const goal of ["audio", "automation"]) {
      assert.ok(localRuntimeNotice(quizToRecommendationInput(answers({ goal, runtime: "local" }))), goal);
    }
    for (const { id: goal } of QUIZ_GOAL_OPTIONS) {
      assert.equal(localRuntimeNotice(quizToRecommendationInput(answers({ goal }))), null, goal);
    }
  });
});

describe("quiz ranking: the production failure (2026-11-12)", () => {
  it("content_creation / beginner / free / cloud keeps HubSpot, Doximity, InVideo and HeyGen out of the top five", () => {
    const { out } = rank(answers({ goal: "content_creation" }));
    const top5 = out.slice(0, 5).map((r) => r.slug);
    for (const bad of ["hubspot-ai", "doximity-gpt", "invideo-ai", "heygen"]) assert.ok(!top5.includes(bad), `${bad} in ${top5}`);
    assert.deepEqual(top5.slice(0, 3), ["chatgpt", "claude", "gemini"]);
  });
});

describe("quiz ranking: rules", () => {
  it("default picks are never marked above level (claude-code for an intermediate coder)", () => {
    const { out } = rank(answers({ goal: "coding", experience: "intermediate", budget: "under_20" }));
    const cc = out.find((r) => r.slug === "claude-code");
    assert.ok(cc?.defaultPick);
    assert.equal(cc.aboveDifficulty, false);
    assert.deepEqual(out.slice(0, 3).map((r) => r.slug), ["cursor", "github-copilot", "claude-code"]);
  });

  it("a pick that fails the budget filter is skipped and the next one moves up", () => {
    const { out } = rank(answers({ goal: "image_generation", experience: "advanced", budget: "free" }));
    const defaults = out.filter((r) => r.defaultPick).map((r) => r.slug);
    assert.deepEqual(defaults, ["leonardo-ai", "krea"]); // midjourney is PAID
  });

  it("two goals alternate their picks and de-duplicate", () => {
    const input: RecommendationInput = { goals: ["business", "data_analysis"], experienceLevel: "beginner", budget: "free" };
    const pool = new Set(candidatesFor("free").map((c) => c.slug));
    assert.deepEqual(
      orderedDefaultPicks(input, pool).map((p) => p.slug),
      ["chatgpt", "microsoft-copilot", "gemini", "fathom"],
    );
  });

  it("runtime=local leads chat goals with local apps, image with ComfyUI, and gives other goals no defaults", () => {
    assert.deepEqual(rank(answers({ goal: "research", runtime: "local" })).out.slice(0, 3).map((r) => r.slug), ["ollama", "lm-studio", "jan"]);
    assert.equal(rank(answers({ goal: "image_generation", runtime: "local" })).out[0]?.slug, "comfyui");
    assert.equal(rank(answers({ goal: "video", runtime: "local" })).out.some((r) => r.defaultPick), false);
  });

  it("local-open-source-ai is allowed for every goal when runtime=local and for none otherwise", () => {
    for (const { id: goal } of QUIZ_GOAL_OPTIONS) {
      for (const experience of ["beginner", "advanced"]) {
        const cloud = quizToRecommendationInput(answers({ goal, experience }));
        const local = quizToRecommendationInput(answers({ goal, experience, runtime: "local" }));
        assert.equal(allowedCategories(cloud).has("local-open-source-ai"), false, goal);
        assert.equal(allowedCategories(local).has("local-open-source-ai"), true, goal);
      }
    }
  });

  it("coding allows ai-apis-developer-services only for intermediate and advanced", () => {
    const of = (experience: string) => allowedCategories(quizToRecommendationInput(answers({ goal: "coding", experience })));
    assert.equal(of("beginner").has("ai-apis-developer-services"), false);
    assert.equal(of("intermediate").has("ai-apis-developer-services"), true);
    assert.equal(of("advanced").has("ai-apis-developer-services"), true);
    const { out } = rank(answers({ goal: "coding" }));
    assert.equal(out.some((r) => r.category.slug === "ai-apis-developer-services"), false);
  });

  it("no result ever comes from a never-allowed category", () => {
    for (const { id: goal } of QUIZ_GOAL_OPTIONS) {
      for (const budget of ["free", "enterprise"]) {
        const { out } = rank(answers({ goal, budget, experience: "advanced" }));
        for (const r of out) assert.ok(!(NEVER_ALLOWED_CATEGORIES as readonly string[]).includes(r.category.slug), `${goal}: ${r.slug}`);
      }
    }
  });

  it("returns at most twelve results", () => {
    for (const { id: goal } of QUIZ_GOAL_OPTIONS) assert.ok(rank(answers({ goal, budget: "enterprise" })).out.length <= 12);
  });
});

describe("quiz ranking: ties break by name, never by row order", () => {
  const base = candidatesFor("free")[0]!;
  const twin = (slug: string, name: string): Candidate => ({
    ...base,
    slug,
    name,
    category: { slug: "text-conversational-ai", name: "Text & Conversational AI" },
    primaryUse: "writing helper",
    primaryUseCases: null,
  });
  const input: RecommendationInput = { goals: ["content_creation"], experienceLevel: "beginner", budget: "free" };

  it("equal scores come back in name order whatever order they arrive in", () => {
    const rows = [twin("z-tool", "Zeta"), twin("a-tool", "alpha"), twin("m-tool", "Mu")];
    const forward = rankQuizRecommendations(rows, input).map((r) => r.slug);
    const reversed = rankQuizRecommendations([...rows].reverse(), input).map((r) => r.slug);
    assert.deepEqual(forward, ["a-tool", "m-tool", "z-tool"]);
    assert.deepEqual(reversed, forward);
  });

  it("the real catalog gives the same order however the rows are shuffled", () => {
    const rows = candidatesFor("free");
    const a = rankQuizRecommendations(rows, quizToRecommendationInput(answers({ goal: "content_creation" }))).map((r) => r.slug);
    const b = rankQuizRecommendations([...rows].reverse(), quizToRecommendationInput(answers({ goal: "content_creation" }))).map((r) => r.slug);
    assert.deepEqual(b, a);
  });
});

describe("quiz ranking: the optional runtime field", () => {
  it("a caller that sends no runtime gets exactly the cloud ordering", () => {
    for (const { id: goal } of QUIZ_GOAL_OPTIONS) {
      const withRuntime = quizToRecommendationInput(answers({ goal }));
      const { runtime, ...without } = withRuntime;
      assert.equal(runtime, "cloud");
      const rows = candidatesFor("free");
      assert.deepEqual(rankQuizRecommendations(rows, without), rankQuizRecommendations(rows, withRuntime), goal);
    }
  });

  it("the keyword scorer ignores runtime: rankScoredPlatforms is unchanged by it", () => {
    const rows = candidatesFor("free");
    const input: RecommendationInput = { goals: ["research"], budget: "free", experienceLevel: "beginner", priorities: ["offline"] };
    assert.deepEqual(rankScoredPlatforms(rows, { ...input, runtime: "local" }), rankScoredPlatforms(rows, input));
  });

  it("quizToRecommendationInput passes runtime through and omits it when absent", () => {
    assert.equal(quizToRecommendationInput(answers({ goal: "video", runtime: "local" })).runtime, "local");
    const legacy = quizToRecommendationInput({ goal: "video", experience: "beginner", budget: "free", runtime: "" });
    assert.equal("runtime" in legacy, false);
  });
});
