import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import {
  compareSitemapLastModified,
  factCheckedAts,
  guideSitemapLastModified,
  latestContentDate,
  parseContentDate,
  platformSitemapLastModified,
} from "@/lib/sitemap-lastmod";

function isoDay(date: Date | undefined): string | undefined {
  return date ? date.toISOString().slice(0, 10) : undefined;
}

describe("sitemap lastmod", () => {
  it("uses the latest real content date and ignores blanks", () => {
    const latest = latestContentDate([
      "2026-09-15",
      "not-a-date",
      "",
      null,
      new Date("2026-11-20T00:00:00.000Z"),
      "2026-10-29",
    ]);
    assert.equal(isoDay(latest), "2026-11-20");
    assert.equal(latestContentDate([null, "", "nope"]), undefined);
    assert.equal(parseContentDate("   "), undefined);
  });

  it("does not stamp lastmod with the time the sitemap is built", () => {
    const sitemap = readFileSync("src/app/sitemap.ts", "utf8");
    const helper = readFileSync("src/lib/sitemap-lastmod.ts", "utf8");
    assert.equal(sitemap.includes("new Date()"), false);
    assert.equal(helper.includes("new Date()"), false);
    const old = latestContentDate(["2020-01-01"]);
    assert.equal(isoDay(old), "2020-01-01");
    assert.ok(old && old.getUTCFullYear() === 2020);
  });

  it("moves a guide's lastmod when the guide or its fact file is newer", () => {
    const tutorial = listRegisteredTutorials().find((item) => item.platformSlug === "otter-ai");
    assert.ok(tutorial);
    const checked = factCheckedAts(getToolFacts("otter-ai"));
    const lastmod = guideSitemapLastModified(tutorial);
    assert.equal(isoDay(lastmod), isoDay(latestContentDate([tutorial.lastReviewedAt, ...checked])));
    assert.ok(isoDay(lastmod)! > tutorial.lastReviewedAt);
    assert.equal(tutorialGuidePath("research-rabbit"), "/platform/research-rabbit/guide");
  });

  it("uses a snippet revision date when it is newer than the guide and the facts", () => {
    const tutorial = listRegisteredTutorials().find((item) => item.platformSlug === "research-rabbit");
    assert.ok(tutorial);
    const lastmod = guideSitemapLastModified(tutorial);
    assert.equal(isoDay(lastmod), "2026-11-26");
    assert.ok(isoDay(lastmod)! > tutorial.lastReviewedAt);
  });

  it("moves a platform lastmod when the fact file or snippet is newer than the row", () => {
    const rowUpdated = new Date("2026-01-01T00:00:00.000Z");
    const overridden = platformSitemapLastModified({ slug: "research-rabbit", updatedAt: rowUpdated });
    assert.equal(isoDay(overridden), "2026-11-26");
    const plain = platformSitemapLastModified({ slug: "otter-ai", updatedAt: rowUpdated });
    const checked = factCheckedAts(getToolFacts("otter-ai"));
    assert.equal(isoDay(plain), isoDay(latestContentDate([rowUpdated, ...checked])));
    assert.ok(plain && plain.getTime() > rowUpdated.getTime());
  });

  it("dates a comparison from the tools it renders, not from build time", () => {
    const lastmod = compareSitemapLastModified(["cursor", "github-copilot"]);
    const checked = [
      ...factCheckedAts(getToolFacts("cursor")),
      ...factCheckedAts(getToolFacts("github-copilot")),
    ].sort();
    assert.equal(isoDay(lastmod), checked[checked.length - 1]);
    assert.equal(compareSitemapLastModified(["not-a-real-slug"]), undefined);
  });
});
