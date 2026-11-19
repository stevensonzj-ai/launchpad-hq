import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { CostTier, Difficulty } from "@prisma/client";
import {
  costTiersForBudget,
  goalKeywords,
  keywordMatches,
  rankScoredPlatforms,
  scorePlatform,
  type ScoreablePlatform,
} from "./recommendations-score";
import { quizToRecommendationInput } from "./quiz-map";

function platform(partial: Partial<ScoreablePlatform> & { primaryUse: string }): ScoreablePlatform {
  return {
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    apiAvailable: false,
    offlineCapable: false,
    featured: false,
    freeTierFeatures: "limited",
    hasMobileApp: false,
    mobileWebFriendly: true,
    primaryUseCases: null,
    ...partial,
  };
}

describe("costTiersForBudget", () => {
  it("keeps free budget on FREE + FREEMIUM", () => {
    assert.deepEqual(costTiersForBudget("free"), ["FREE", "FREEMIUM"]);
  });

  it("includes FREE/FREEMIUM/PAID for under_20 and under_50", () => {
    assert.deepEqual(costTiersForBudget("under_20"), [
      "FREE",
      "FREEMIUM",
      "PAID",
    ]);
    assert.deepEqual(costTiersForBudget("under_50"), [
      "FREE",
      "FREEMIUM",
      "PAID",
    ]);
  });

  it("includes every tier for enterprise", () => {
    assert.deepEqual(costTiersForBudget("enterprise"), [
      "FREE",
      "FREEMIUM",
      "PAID",
      "ENTERPRISE",
    ]);
  });
});

describe("priority scoring", () => {
  const videoMobile = platform({
    primaryUse: "AI video editing on a phone",
    hasMobileApp: true,
    mobileWebFriendly: true,
    costTier: "FREE" as CostTier,
    difficultyLevel: "BEGINNER" as Difficulty,
  });

  it("boosts hasMobileApp and mobileWebFriendly for mobile runtime", () => {
    const input = quizToRecommendationInput({
      goal: "video",
      experience: "beginner",
      budget: "free",
      runtime: "mobile",
    });
    const withMobile = scorePlatform(videoMobile, input);
    const without = scorePlatform(
      { ...videoMobile, hasMobileApp: false, mobileWebFriendly: false },
      input,
    );
    assert.ok(withMobile.score > without.score);
    assert.ok(withMobile.matchReasons.includes("Works on mobile"));
    assert.ok(!without.matchReasons.includes("Works on mobile"));
  });

  it("boosts mobileWebFriendly for browser runtime", () => {
    const input = quizToRecommendationInput({
      goal: "video",
      experience: "beginner",
      budget: "free",
      runtime: "browser",
    });
    const friendly = scorePlatform(videoMobile, input);
    const notFriendly = scorePlatform(
      { ...videoMobile, mobileWebFriendly: false, hasMobileApp: false },
      input,
    );
    assert.ok(friendly.score > notFriendly.score);
    assert.ok(friendly.matchReasons.includes("Works in the browser"));
    assert.ok(!friendly.matchReasons.includes("Works on mobile"));
  });

  it("does not add ease_of_use points for advanced users on beginner tools", () => {
    const beginnerInput = quizToRecommendationInput({
      goal: "coding",
      experience: "beginner",
      budget: "under_50",
      runtime: "cloud",
    });
    const advancedInput = quizToRecommendationInput({
      goal: "coding",
      experience: "advanced",
      budget: "under_50",
      runtime: "cloud",
    });
    const tool = platform({
      primaryUse: "code development ide",
      difficultyLevel: "BEGINNER",
    });
    const beginnerScore = scorePlatform(tool, beginnerInput);
    const advancedScore = scorePlatform(tool, advancedInput);
    assert.ok(beginnerScore.score > advancedScore.score);
    assert.ok(beginnerScore.matchReasons.includes("Beginner-friendly"));
    assert.ok(!advancedScore.matchReasons.includes("Beginner-friendly"));
  });

  it("does not use featured as a sponsor path beyond the editorial +5", () => {
    const input = quizToRecommendationInput({
      goal: "coding",
      experience: "advanced",
      budget: "under_50",
      runtime: "cloud",
    });
    const plain = platform({ primaryUse: "code development" });
    const featured = platform({ primaryUse: "code development", featured: true });
    assert.equal(
      scorePlatform(featured, input).score - scorePlatform(plain, input).score,
      5,
    );
  });
});

describe("sample answer sets (fixture catalog — live catalog unverified)", () => {
  const catalog: ScoreablePlatform[] = [
    platform({
      primaryUse: "mobile video clip editing",
      hasMobileApp: true,
      costTier: "FREE",
      difficultyLevel: "BEGINNER",
      freeTierFeatures: "watermark",
    }),
    platform({
      primaryUse: "code development programming",
      costTier: "PAID",
      difficultyLevel: "ADVANCED",
      hasMobileApp: false,
      mobileWebFriendly: false,
      freeTierFeatures: null,
    }),
    platform({
      primaryUse: "code development ide",
      costTier: "FREEMIUM",
      difficultyLevel: "BEGINNER",
    }),
    platform({
      primaryUse: "research papers citations",
      costTier: "ENTERPRISE",
      difficultyLevel: "EXPERT",
    }),
  ];

  it("mobile beginner video free prefers the free mobile video tool", () => {
    const ranked = rankScoredPlatforms(
      catalog,
      quizToRecommendationInput({
        goal: "video",
        experience: "beginner",
        budget: "free",
        runtime: "mobile",
      }),
    );
    assert.equal(ranked[0]?.primaryUse, "mobile video clip editing");
    assert.ok(ranked[0]?.matchReasons.includes("Works on mobile"));
    assert.ok(!ranked.some((r) => r.costTier === "PAID"));
  });

  it("advanced coding under_50 includes PAID and does not drop FREEMIUM", () => {
    const ranked = rankScoredPlatforms(
      catalog.filter((p) => costTiersForBudget("under_50").includes(p.costTier)),
      quizToRecommendationInput({
        goal: "coding",
        experience: "advanced",
        budget: "under_50",
        runtime: "cloud",
      }),
    );
    assert.ok(ranked.some((r) => r.costTier === "PAID"));
    assert.ok(ranked.some((r) => r.costTier === "FREEMIUM"));
    assert.ok(!ranked.some((r) => r.costTier === "ENTERPRISE"));
  });

  it("browser research under_20 includes freemium and not enterprise", () => {
    const allowed = costTiersForBudget("under_20");
    assert.ok(!allowed.includes("ENTERPRISE"));
    const ranked = rankScoredPlatforms(
      catalog.filter((p) => allowed.includes(p.costTier)),
      quizToRecommendationInput({
        goal: "research",
        experience: "intermediate",
        budget: "under_20",
        runtime: "browser",
      }),
    );
    assert.ok(ranked.every((r) => r.costTier !== "ENTERPRISE"));
  });

  it("enterprise budget can include ENTERPRISE tools", () => {
    const allowed = costTiersForBudget("enterprise");
    const ranked = rankScoredPlatforms(
      catalog.filter((p) => allowed.includes(p.costTier)),
      quizToRecommendationInput({
        goal: "research",
        experience: "advanced",
        budget: "enterprise",
        runtime: "cloud",
      }),
    );
    assert.ok(ranked.some((r) => r.costTier === "ENTERPRISE"));
  });
});

describe("goal keywords match words, not substrings (START-HERE 4.41)", () => {
  it("a keyword of three characters or fewer must be a whole word", () => {
    assert.equal(keywordMatches("A desktop IDE with AI", "ide"), true);
    assert.equal(keywordMatches("Study guide creation", "ide"), false);
    assert.equal(keywordMatches("image and video generation", "ide"), false);
    assert.equal(keywordMatches("concept art for games", "art"), true);
    assert.equal(keywordMatches("artificial intelligence", "art"), false);
    assert.equal(keywordMatches("smart replies", "art"), false);
  });

  it("a longer keyword must start a word", () => {
    assert.equal(keywordMatches("Language learning", "learn"), true);
    assert.equal(keywordMatches("learn a language", "learn"), true);
    assert.equal(keywordMatches("Voice cloning", "voice"), true);
    assert.equal(keywordMatches("invoice parsing", "voice"), false);
    assert.equal(keywordMatches("text-to-speech", "speech"), true);
  });

  it("is case-insensitive", () => {
    assert.equal(keywordMatches("VIDEO EDITING", "video"), true);
    assert.equal(keywordMatches("Ide", "ide"), true);
  });

  it("coding lists \"ides\", so a tool that names IDEs in the plural still matches coding", () => {
    assert.ok(goalKeywords.coding.includes("ides"));
    const input = quizToRecommendationInput({ goal: "coding", experience: "beginner", budget: "free", runtime: "cloud" });
    const jetbrainsLike = platform({ primaryUse: "AI assistant inside JetBrains IDEs" });
    assert.equal(scorePlatform(jetbrainsLike, input).goalScore, 10);
  });

  it("the 2026-11-12 false positives no longer match coding", () => {
    const input = quizToRecommendationInput({ goal: "coding", experience: "beginner", budget: "free", runtime: "cloud" });
    const notebook = platform({ primaryUse: "AI Q&A grounded in your uploaded documents", primaryUseCases: "Study guide creation; source-grounded Q&A" });
    const comfy = platform({ primaryUse: "Node-based image and video generation" });
    assert.equal(scorePlatform(notebook, input).goalScore, 0);
    assert.equal(scorePlatform(comfy, input).goalScore, 0);
    assert.ok(!scorePlatform(comfy, input).matchReasons.includes("Matches goal"));
  });
});

describe("each chosen goal counts once (START-HERE 4.40)", () => {
  const input = quizToRecommendationInput({ goal: "research", experience: "beginner", budget: "free", runtime: "cloud" });

  it("many keywords for one goal score the same as one keyword", () => {
    const dense = platform({ primaryUse: "research papers with citations for academic analysis" });
    const terse = platform({ primaryUse: "research assistant" });
    assert.equal(scorePlatform(dense, input).goalScore, 10);
    assert.equal(scorePlatform(dense, input).score, scorePlatform(terse, input).score);
  });

  it("two chosen goals that both match score 10 each", () => {
    const tool = platform({ primaryUse: "video editing with music" });
    const both = scorePlatform(tool, { goals: ["video", "audio"], budget: "free", experienceLevel: "beginner", priorities: [] });
    assert.equal(both.goalScore, 20);
  });
});
