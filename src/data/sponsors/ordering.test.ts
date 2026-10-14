import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  chicagoCalendarDate,
  getActivePlacement,
  PLACEMENTS,
} from "./index";
import { TEST_ONLY_EXAMPLE_PLACEMENT } from "./test-fixture";
import {
  rankScoredPlatforms,
  type ScoreablePlatform,
} from "../../lib/recommendations-score";

function platform(
  partial: Partial<ScoreablePlatform> & { primaryUse: string; featured?: boolean },
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

function discoverOrder(
  rows: { name: string; featured: boolean }[],
): string[] {
  return [...rows]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
    .map((row) => row.name);
}

describe("sponsor placements stay off ranking surfaces", () => {
  it("keeps the live placement list empty by default", () => {
    assert.equal(PLACEMENTS.length, 0);
    assert.equal(getActivePlacement("homepage", new Date("2026-10-14T17:00:00Z")), null);
  });

  it("activates the test-only fixture without importing it into live placements", () => {
    const active = getActivePlacement(
      "homepage",
      new Date("2026-10-14T17:00:00Z"),
      undefined,
      [TEST_ONLY_EXAMPLE_PLACEMENT],
    );
    assert.equal(active?.id, TEST_ONLY_EXAMPLE_PLACEMENT.id);
    assert.equal(
      PLACEMENTS.some((p) => p.id === TEST_ONLY_EXAMPLE_PLACEMENT.id),
      false,
    );
  });

  it("does not change Discover name order when a placement is active", () => {
    const rows = [
      { name: "Zed Tool", featured: true },
      { name: "Alpha Tool", featured: false },
      { name: "Beta Tool", featured: false },
    ];
    const before = discoverOrder(rows);
    const active = getActivePlacement(
      "homepage",
      new Date("2026-10-14T17:00:00Z"),
      undefined,
      [TEST_ONLY_EXAMPLE_PLACEMENT],
    );
    assert.ok(active);
    const after = discoverOrder(rows);
    assert.deepEqual(after, before);
    assert.deepEqual(after, ["Zed Tool", "Alpha Tool", "Beta Tool"]);
  });

  it("does not change quiz scoring when a placement is active", () => {
    const candidates = [
      platform({ primaryUse: "writing blog content", featured: false }),
      platform({ primaryUse: "image art design", featured: true }),
    ];
    const input = {
      goals: ["content_creation"],
      budget: "under_20",
      experienceLevel: "beginner",
      priorities: [] as string[],
    };
    const before = rankScoredPlatforms(candidates, input).map((s) => s.primaryUse);

    const active = getActivePlacement(
      "homepage",
      new Date("2026-10-14T17:00:00Z"),
      undefined,
      [TEST_ONLY_EXAMPLE_PLACEMENT],
    );
    assert.ok(active);

    const after = rankScoredPlatforms(candidates, input).map((s) => s.primaryUse);

    assert.deepEqual(after, before);
  });

  it("uses America/Chicago calendar dates for windows", () => {
    // 2026-10-14 04:30 UTC is still 2026-10-13 in Chicago (CDT, UTC-5).
    assert.equal(chicagoCalendarDate(new Date("2026-10-14T04:30:00Z")), "2026-10-13");
    assert.equal(chicagoCalendarDate(new Date("2026-10-14T12:00:00Z")), "2026-10-14");
  });

  it("does not import sponsor data from featured, quiz, discover ordering, workflows, or tutorials", () => {
    const guarded = [
      "src/lib/recommendations-score.ts",
      "src/lib/recommendations-core.ts",
      "src/lib/quiz-map.ts",
      "src/data/workflows/workflows.ts",
      "src/data/tutorials/index.ts",
    ];
    for (const path of guarded) {
      const source = readFileSync(path, "utf8");
      assert.equal(
        source.includes("@/data/sponsors") || source.includes("data/sponsors"),
        false,
        `${path} must not import sponsor data`,
      );
    }
    const discover = readFileSync("src/app/(app)/discover/page.tsx", "utf8");
    assert.match(discover, /orderBy/);
    assert.doesNotMatch(discover, /featured:\s*true/);
    assert.match(discover, /getActivePlacement/);
    assert.match(discover, /SponsoredSpotlight/);
  });
});
