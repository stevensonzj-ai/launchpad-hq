import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { CostTier, Difficulty } from "@prisma/client";
import {
  costTiersForBudget,
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
