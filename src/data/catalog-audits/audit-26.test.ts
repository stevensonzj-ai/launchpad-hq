import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform } from "@/lib/catalog-visibility";

/** Catalog audit 26 (2026-10-30): relay-app (shut down) and tabnine (absorbed by Tricentis) hidden with 301s. */
describe("catalog audit 26: relay-app and tabnine hidden and redirected", () => {
  it("hides both rows without deleting their facts", () => {
    for (const slug of ["relay-app", "tabnine"]) {
      assert.equal(isHiddenPlatform(slug), true, slug);
      assert.ok(hiddenPlatformSlugs().includes(slug), slug);
      const facts = getToolFacts(slug);
      assert.ok(facts, slug);
      assert.equal(facts.visibility, "hidden", slug);
      assert.equal(facts.lifecycle, "discontinued", slug);
      assert.equal(facts.status?.checkedAt, "2026-10-30", slug);
    }
    assert.equal(getToolFacts("relay-app")!.status!.sourceUrl, "https://relay.app/");
    assert.equal(getToolFacts("tabnine")!.status!.sourceUrl, "https://www.tricentis.com/news/tricentis-acquires-tabnine");
  });

  it("301s each whole /platform tree to a live listing page, with no chains", () => {
    const moves = catalogRedirects();
    for (const [slug, to] of [
      ["relay-app", "/alternatives/free-zapier-alternatives"],
      ["tabnine", "/compare/cursor-vs-github-copilot"],
    ]) {
      assert.equal(HIDDEN_PAGE_REDIRECTS[slug], to);
      for (const source of [`/platform/${slug}`, `/platform/${slug}/:path*`]) {
        const hits = moves.filter((m) => m.source === source);
        assert.equal(hits.length, 1, source);
        assert.equal(hits[0].destination, to, source);
        assert.equal(hits[0].statusCode, 301);
      }
      assert.equal(slug in PLATFORM_REDIRECTS, false, slug);
      assert.equal(RETIRED_GUIDE_SLUGS.includes(slug), false, slug);
    }
  });
});
