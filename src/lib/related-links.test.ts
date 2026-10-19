import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { SponsorPlacement } from "@/data/sponsors";
import {
  pickRelatedPlatforms,
  RELATED_PLATFORM_MAX,
  sponsorExcludedSlugs,
  workflowPlatformSlugs,
  workflowsMentioningPlatform,
} from "@/lib/related-links";
import { getWorkflowBySlug } from "@/data/workflows";

const candidates = [
  { slug: "chatgpt", name: "ChatGPT", categorySlug: "text" },
  { slug: "claude", name: "Claude", categorySlug: "text" },
  { slug: "grok", name: "Grok", categorySlug: "text" },
  { slug: "gemini", name: "Gemini", categorySlug: "text" },
  { slug: "perplexity-ai", name: "Perplexity", categorySlug: "text" },
  { slug: "midjourney", name: "Midjourney", categorySlug: "image" },
  { slug: "leonardo-ai", name: "Leonardo", categorySlug: "image" },
];

describe("related platform helper", () => {
  it("keeps the same category, never self-links, and caps at 5", () => {
    const related = pickRelatedPlatforms("chatgpt", "text", [
      ...candidates,
      { slug: "extra-1", name: "Extra 1", categorySlug: "text" },
      { slug: "extra-2", name: "Extra 2", categorySlug: "text" },
    ]);
    assert.equal(related.some((item) => item.slug === "chatgpt"), false);
    assert.ok(related.every((item) => item.categorySlug === "text"));
    assert.ok(related.length <= RELATED_PLATFORM_MAX);
    assert.equal(related.length, 5);
  });

  it("drops sponsored names from related links", () => {
    const placements = [
      {
        id: "test",
        slot: "discover",
        startDate: "2020-01-01",
        endDate: "2099-01-01",
        sponsorName: "Claude",
        logoUrl: "/sponsors/example-logo.png",
        headline: "x",
        blurb: "y",
        ctaUrl: "https://example.com",
        ctaLabel: "Visit",
      },
    ] satisfies SponsorPlacement[];
    const excluded = sponsorExcludedSlugs(candidates, placements);
    const related = pickRelatedPlatforms("chatgpt", "text", candidates, {
      excludeSlugs: excluded,
    });
    assert.equal(related.some((item) => item.slug === "claude"), false);
  });

  it("finds workflows that already mention a platform slug", () => {
    const blog = getWorkflowBySlug("blog-post-generator");
    assert.ok(blog);
    assert.ok(workflowPlatformSlugs(blog).includes("chatgpt"));
    const hits = workflowsMentioningPlatform("chatgpt");
    assert.ok(hits.some((item) => item.slug === "blog-post-generator"));
  });
});
