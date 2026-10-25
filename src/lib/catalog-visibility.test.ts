import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts, listRegisteredToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { catalogRedirects, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform, listedPlatformWhere } from "@/lib/catalog-visibility";
import { buildPlatformMetadata, buildTutorialMetadata } from "@/lib/seo-metadata";

describe("catalog visibility", () => {
  it("hides the dead-and-obscure pages and the duplicate rows", () => {
    for (const slug of ["relay-app", "kakao-brain-karlo", "canva-magic-studio", "adobe-sensei-firefly-in-cc"]) {
      assert.equal(isHiddenPlatform(slug), true, slug);
    }
    // "What happened" pages stay listed and indexed.
    for (const slug of ["sora-2", "play-ht", "clarifai", "beatoven-ai"]) {
      assert.equal(isHiddenPlatform(slug), false, slug);
    }
    assert.deepEqual(listedPlatformWhere(), { slug: { notIn: hiddenPlatformSlugs() } });
  });

  it("never redirects a duplicate to another hidden or redirected slug", () => {
    for (const [from, to] of Object.entries(PLATFORM_REDIRECTS)) {
      assert.notEqual(from, to);
      assert.equal(to in PLATFORM_REDIRECTS, false, `${from} -> ${to} chains`);
      assert.equal(isHiddenPlatform(to), false, `${from} -> hidden ${to}`);
    }
  });

  it("301s the Canva and Adobe Sensei duplicates to their guided, listed entries", () => {
    const moves = catalogRedirects();
    for (const [from, to] of [
      ["canva-magic-studio", "canva-ai-magic-studio"],
      ["adobe-sensei-firefly-in-cc", "adobe-firefly"],
    ]) {
      assert.equal(PLATFORM_REDIRECTS[from], to);
      assert.ok(moves.some((m) => m.source === `/platform/${from}` && m.destination === `/platform/${to}`), from);
      assert.ok(
        moves.some((m) => m.source === `/platform/${from}/:path*` && m.destination === `/platform/${to}/:path*`),
        from,
      );
      // A registered guide only renders when its Platform row exists, so the target is a live page.
      assert.ok(getStaticTutorialForPlatform(to), `${to} has no guide`);
      assert.equal(isHiddenPlatform(to), false, to);
    }
  });

  it("emits 301s (not 308s) for every catalog move", () => {
    const moves = catalogRedirects();
    assert.ok(moves.length > 0);
    for (const move of moves) {
      assert.equal(move.statusCode, 301);
      assert.notEqual(move.source, move.destination);
    }
    assert.ok(
      moves.some(
        (m) => m.source === "/platform/kakao-brain-karlo/guide" && m.destination === "/platform/kakao-brain-karlo",
      ),
    );
  });

  it("keeps retired guides out of the tutorial registry", () => {
    for (const slug of RETIRED_GUIDE_SLUGS) {
      assert.equal(getStaticTutorialForPlatform(slug), undefined, slug);
    }
  });

  it("gives every non-active product a sourced status notice", () => {
    for (const facts of listRegisteredToolFacts()) {
      if (facts.lifecycle === "active" || facts.lifecycle === "beta") continue;
      assert.ok(facts.status, `${facts.slug} is ${facts.lifecycle} without a status`);
      assert.ok(facts.status.sourceUrl.startsWith("https://"), facts.slug);
    }
  });

  it("points status alternatives at listed pages only", () => {
    for (const facts of listRegisteredToolFacts()) {
      for (const alt of facts.status?.value.alternatives ?? []) {
        assert.equal(isHiddenPlatform(alt.slug), false, `${facts.slug} -> ${alt.slug}`);
        assert.notEqual(alt.slug, facts.slug);
      }
      assert.ok((facts.status?.value.alternatives?.length ?? 0) <= 3, facts.slug);
    }
  });
});

describe("status metadata", () => {
  it("titles a discontinued product as a what-happened page", () => {
    const meta = buildPlatformMetadata({
      slug: "sora-2",
      name: "Sora 2",
      categoryName: "Video Creation & Editing",
      facts: getToolFacts("sora-2"),
    });
    assert.match(String(meta.title), /^What Happened to Sora 2\?/);
    assert.match(String(meta.description), /April 26, 2026/);
    assert.equal(meta.robots, undefined);
  });

  it("noindexes hidden platform and guide pages", () => {
    const page = buildPlatformMetadata({ slug: "relay-app", name: "Relay.app", facts: getToolFacts("relay-app") });
    assert.deepEqual(page.robots, { index: false, follow: false });
    const guide = buildTutorialMetadata({
      platformSlug: "relay-app",
      name: "Relay.app",
      tagline: "x",
      lastReviewedAt: "2026-10-20",
      index: false,
    });
    assert.deepEqual(guide.robots, { index: false, follow: false });
  });

  it("uses the verified new name for renamed products", () => {
    const meta = buildPlatformMetadata({ slug: "windsurf", name: "Windsurf", facts: getToolFacts("windsurf") });
    assert.match(String(meta.title), /^Devin Desktop/);
  });
});
