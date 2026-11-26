import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SNIPPET_OVERRIDES } from "@/data/seo/snippet-overrides";
import { getToolFacts } from "@/data/facts";
import { listRegisteredTutorials } from "@/data/tutorials";
import { buildPlatformMetadata, buildTutorialMetadata, composeTutorialTitle } from "@/lib/seo-metadata";
import { SITE_URL } from "@/lib/site";

describe("snippet overrides", () => {
  it("keeps every rewritten title and description inside the length targets", () => {
    const paths = Object.keys(SNIPPET_OVERRIDES);
    assert.ok(paths.length >= 16);
    for (const path of paths) {
      const snippet = SNIPPET_OVERRIDES[path];
      assert.equal(snippet.revisedAt, "2026-11-26", path);
      assert.ok(snippet.title.length >= 50 && snippet.title.length <= 60, `${path} title ${snippet.title.length}`);
      assert.ok(
        snippet.description.length >= 140 && snippet.description.length <= 155,
        `${path} description ${snippet.description.length}`,
      );
      assert.equal(snippet.title.endsWith("| Launchpad HQ"), true, path);
    }
  });

  it("replaces the generated guide and platform snippets", () => {
    const guide = buildTutorialMetadata({
      platformSlug: "granola",
      name: "Granola",
      tagline: "short tagline that should not be used",
      lastReviewedAt: "2026-10-23",
    });
    assert.equal(guide.title, SNIPPET_OVERRIDES["/platform/granola/guide"].title);
    assert.equal(guide.description, SNIPPET_OVERRIDES["/platform/granola/guide"].description);
    assert.notEqual(guide.title, composeTutorialTitle("Granola"));
    assert.equal(guide.alternates?.canonical, `${SITE_URL}/platform/granola/guide`);

    const overview = buildPlatformMetadata({
      slug: "research-rabbit",
      name: "Research Rabbit",
      categoryName: "Research & academic tools",
      primaryUse: "Paper recommendations",
      facts: getToolFacts("research-rabbit"),
    });
    assert.equal(overview.title, SNIPPET_OVERRIDES["/platform/research-rabbit"].title);
    assert.equal(overview.description, SNIPPET_OVERRIDES["/platform/research-rabbit"].description);
    assert.equal(overview.alternates?.canonical, `${SITE_URL}/platform/research-rabbit`);

    const untouched = buildTutorialMetadata({
      platformSlug: "cursor",
      name: "Cursor",
      tagline: "An AI-first code editor.",
      lastReviewedAt: "2026-10-29",
    });
    assert.equal(untouched.title, composeTutorialTitle("Cursor"));
  });

  it("only overrides pages that have a registered guide or a fact file", () => {
    const guides = new Set(listRegisteredTutorials().map((tutorial) => tutorial.platformSlug));
    for (const path of Object.keys(SNIPPET_OVERRIDES)) {
      const slug = path.split("/")[2];
      assert.ok(slug, path);
      if (path.endsWith("/guide")) assert.ok(guides.has(slug), slug);
      else assert.ok(getToolFacts(slug), slug);
    }
  });
});
