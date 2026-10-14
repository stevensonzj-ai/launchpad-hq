import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chicagoCalendarDate,
  getActivePlacement,
  PLACEMENTS,
} from "./index";
import { TEST_ONLY_EXAMPLE_PLACEMENT } from "./test-fixture";
import {
  discoverOrderBy,
  sortDiscoverCatalog,
  type DiscoverSortable,
} from "../../lib/discover-filters";
import {
  rankScoredPlatforms,
  scorePlatform,
  type ScoreablePlatform,
} from "../../lib/recommendations-score";
import type { SponsorPlacement } from "./types";

function platform(
  partial: Partial<ScoreablePlatform> & { primaryUse: string },
): ScoreablePlatform {
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

function withLivePlacement<T>(placement: SponsorPlacement, fn: () => T): T {
  const saved = PLACEMENTS.splice(0, PLACEMENTS.length);
  PLACEMENTS.push(placement);
  try {
    return fn();
  } finally {
    PLACEMENTS.splice(0, PLACEMENTS.length);
    PLACEMENTS.push(...saved);
  }
}

function quizSnapshot(candidates: ScoreablePlatform[]) {
  const input = {
    goals: ["content_creation"],
    budget: "under_20",
    experienceLevel: "beginner",
    priorities: [] as string[],
  };
  return {
    scores: candidates.map((c) => {
      const parts = scorePlatform(c, input);
      return {
        primaryUse: c.primaryUse,
        featured: c.featured,
        score: parts.score,
        goalScore: parts.goalScore,
      };
    }),
    ranked: rankScoredPlatforms(candidates, input).map((row) => ({
      primaryUse: row.primaryUse,
      featured: row.featured,
      matchScore: row.matchScore,
    })),
  };
}

describe("sponsor placements stay off ranking surfaces", () => {
  it("keeps the live placement list empty by default", () => {
    assert.equal(PLACEMENTS.length, 0);
    assert.equal(getActivePlacement("discover", new Date("2026-10-14T17:00:00Z")), null);
  });

  it("Discover orderBy contract has no sponsor fields", () => {
    assert.deepEqual(discoverOrderBy("popular"), [
      { featured: "desc" },
      { name: "asc" },
    ]);
    assert.deepEqual(discoverOrderBy("alpha"), [{ name: "asc" }]);
    assert.deepEqual(discoverOrderBy("recent"), [{ createdAt: "desc" }]);
  });

  it("Discover sort is identical with and without an active live placement", () => {
    const catalog: DiscoverSortable[] = [
      { name: "Zed Tool", featured: true, createdAt: new Date("2026-01-01") },
      { name: "Alpha Tool", featured: false, createdAt: new Date("2026-06-01") },
      {
        name: TEST_ONLY_EXAMPLE_PLACEMENT.sponsorName,
        featured: false,
        createdAt: new Date("2026-03-01"),
      },
    ];

    for (const sort of ["popular", "alpha", "recent"] as const) {
      const without = sortDiscoverCatalog(catalog, sort);
      assert.equal(
        getActivePlacement("discover", new Date("2026-10-14T17:00:00Z")),
        null,
      );
      const withPlacement = withLivePlacement(TEST_ONLY_EXAMPLE_PLACEMENT, () => {
        assert.ok(
          getActivePlacement("discover", new Date("2026-10-14T17:00:00Z")),
        );
        return sortDiscoverCatalog(catalog, sort);
      });
      assert.deepEqual(withPlacement, without, `sort ${sort} changed under a live placement`);
    }
  });

  it("quiz scoring is identical with and without an active live placement", () => {
    const candidates = [
      platform({ primaryUse: "writing blog content", featured: false }),
      platform({
        primaryUse: TEST_ONLY_EXAMPLE_PLACEMENT.headline,
        featured: true,
      }),
      platform({ primaryUse: "image art design", featured: false }),
    ];

    const without = quizSnapshot(candidates);
    assert.equal(
      getActivePlacement("discover", new Date("2026-10-14T17:00:00Z")),
      null,
    );
    const withPlacement = withLivePlacement(TEST_ONLY_EXAMPLE_PLACEMENT, () => {
      assert.ok(getActivePlacement("discover", new Date("2026-10-14T17:00:00Z")));
      return quizSnapshot(candidates);
    });
    assert.deepEqual(withPlacement, without);
  });

  it("uses America/Chicago calendar dates for windows", () => {
    assert.equal(chicagoCalendarDate(new Date("2026-10-14T04:30:00Z")), "2026-10-13");
    assert.equal(chicagoCalendarDate(new Date("2026-10-14T12:00:00Z")), "2026-10-14");
  });
});
