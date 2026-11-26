import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";

describe("new guides, 2026-11-26", () => {
  it("registers MAGI-2 without typing the per-second rate", () => {
    const guide = getStaticTutorialForPlatform("magi-2");
    assert.ok(guide);
    assert.equal(guide.platformSlug, "magi-2");
    assert.equal(guide.lastReviewedAt, "2026-11-26");
    const text = JSON.stringify(guide);
    assert.match(text, /30 seconds/);
    assert.match(text, /1080p/);
    assert.match(text, /25 frames a second/);
    assert.match(text, /Top-up is not supported for the time being/);
    assert.match(text, /opening Top up/);
    assert.doesNotMatch(text, /0\.08/);
    assert.equal(getToolFacts("magi-2")?.plans, undefined);
    assert.equal(getToolFacts("hedra")?.visibility, "hidden");
  });

  it("registers MiniMax and does not call the weights open source", () => {
    const guide = getStaticTutorialForPlatform("minimax");
    assert.ok(guide);
    assert.equal(guide.platformSlug, "minimax");
    assert.equal(guide.lastReviewedAt, "2026-11-26");
    const text = JSON.stringify(guide);
    assert.match(text, /MiniMax Community License/);
    assert.match(text, /H3-Image/);
    assert.match(text, /not an image generator/);
    assert.doesNotMatch(text, /open source/i);
    assert.equal(getToolFacts("minimax")?.plans, undefined);
  });
});
