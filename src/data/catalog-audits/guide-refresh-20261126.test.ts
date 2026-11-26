import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";

describe("guide accuracy refresh, 2026-11-26", () => {
  it("lists Kling Image 4.0 and drops Image 3.0 and the October rollout line", () => {
    const models = getToolFacts("kling-ai")!.models!;
    assert.equal(models.checkedAt, "2026-11-26");
    const listed = models.value.join(" ");
    assert.match(listed, /Kling Image 4\.0/);
    assert.doesNotMatch(listed, /Image 3\.0/);
    const guide = JSON.stringify(getStaticTutorialForPlatform("kling-ai"));
    assert.match(guide, /Kling Image 4\.0/);
    assert.doesNotMatch(guide, /Image 3\.0/);
    assert.doesNotMatch(guide, /coming in October 2026/);
  });

  it("does not list Sora 2 as a current Higgsfield model", () => {
    const models = getToolFacts("higgsfield")!.models!;
    assert.equal(models.checkedAt, "2026-11-26");
    assert.doesNotMatch(models.value.join(" "), /Sora 2/);
    assert.match(models.note ?? "", /still names Sora 2/);
    assert.match(models.note ?? "", /retired/);
  });
});
