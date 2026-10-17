import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { PLACEMENTS } from "./placements";
import { TEST_ONLY_EXAMPLE_PLACEMENT } from "./test-fixture";
import { SPONSOR_COPY_LIMITS, type SponsorPlacement } from "./types";
import { validatePlacements } from "./validate";

function placement(partial: Partial<SponsorPlacement> = {}): SponsorPlacement {
  return {
    ...TEST_ONLY_EXAMPLE_PLACEMENT,
    id: "valid-discover",
    slot: "discover",
    startDate: "2026-10-19",
    endDate: "2026-10-25",
    logoUrl: "/sponsors/example-logo.png",
    spotlightImageUrl: undefined,
    heroImageUrl: undefined,
    headline: "A valid headline",
    blurb: "A valid blurb.",
    ctaUrl: "https://example.com/offer",
    featureBody: undefined,
    ...partial,
  };
}

function aotwWords(count: number): string {
  return Array.from({ length: count }, (_, i) => `word${i}`).join(" ");
}

function withAssets() {
  const dir = mkdtempSync(path.join(tmpdir(), "lp-sponsors-"));
  writeFileSync(path.join(dir, "example-logo.png"), "x");
  return dir;
}

describe("sponsor placement validation", () => {
  it("passes when PLACEMENTS is empty", () => {
    assert.equal(PLACEMENTS.length, 0);
    assert.deepEqual(validatePlacements(), []);
  });

  it("accepts a well-formed placement with a local asset", () => {
    assert.deepEqual(validatePlacements([placement()], withAssets()), []);
  });

  it("rejects copy that exceeds types.ts limits", () => {
    const issues = validatePlacements(
      [
        placement({
          headline: "h".repeat(SPONSOR_COPY_LIMITS.headlineMax + 1),
          blurb: "b".repeat(SPONSOR_COPY_LIMITS.blurbMax + 1),
          bullets: [
            "a".repeat(SPONSOR_COPY_LIMITS.bulletMax + 1),
            "two",
            "three",
            "four",
          ],
        }),
      ],
      withAssets(),
    );
    assert.ok(issues.some((issue) => issue.message.includes("headline")));
    assert.ok(issues.some((issue) => issue.message.includes("blurb")));
    assert.ok(issues.some((issue) => issue.message.includes("bullets")));
    assert.ok(issues.some((issue) => issue.message.includes("bullet")));
  });

  it("requires https CTA URLs", () => {
    const issues = validatePlacements(
      [placement({ ctaUrl: "http://insecure.example/offer" })],
      withAssets(),
    );
    assert.ok(issues.some((issue) => issue.message.includes("https")));
  });

  it("rejects inverted or impossible dates", () => {
    const inverted = validatePlacements(
      [placement({ startDate: "2026-10-26", endDate: "2026-10-19" })],
      withAssets(),
    );
    const fake = validatePlacements(
      [placement({ startDate: "2026-02-30", endDate: "2026-02-30" })],
      withAssets(),
    );
    assert.ok(inverted.some((issue) => issue.message.includes("on or before")));
    assert.ok(fake.some((issue) => issue.message.includes("real YYYY-MM-DD")));
  });

  it("rejects overlapping bookings on the same slot", () => {
    const issues = validatePlacements(
      [
        placement({ id: "first", startDate: "2026-10-19", endDate: "2026-10-25" }),
        placement({ id: "second", startDate: "2026-10-25", endDate: "2026-11-01" }),
      ],
      withAssets(),
    );
    assert.ok(issues.some((issue) => issue.message.includes("overlaps")));
  });

  it("allows the same week on different slots", () => {
    const issues = validatePlacements(
      [
        placement({ id: "discover-week", slot: "discover" }),
        placement({
          id: "aotw-week",
          slot: "ai-of-the-week",
          featureBody: aotwWords(SPONSOR_COPY_LIMITS.featureBodyMinWords),
        }),
      ],
      withAssets(),
    );
    assert.deepEqual(issues, []);
  });

  it("fails when a /sponsors/ asset is missing", () => {
    const issues = validatePlacements(
      [placement({ logoUrl: "/sponsors/missing-logo.png" })],
      withAssets(),
    );
    assert.ok(issues.some((issue) => issue.message.includes("missing")));
  });
});
