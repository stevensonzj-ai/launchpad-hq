import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { AUDIT_34_HIDDEN, AUDIT_34_NO_CHANGE, AUDIT_34_PATCHES } from "@/data/catalog-audits/audit-34";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform } from "@/lib/catalog-visibility";

type Row = { slug: string };
const snapshot = JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as {
  rows: Row[];
  hidden_rows: string[];
  built_from: string;
};

/** Catalog audit 34 (2026-11-06): play-ht and kakao-brain-karlo hidden with whole-tree 301s. */
describe("catalog audit 34: play-ht and kakao-brain-karlo hidden and redirected", () => {
  it("has two hidden outcomes, no database patches and https sources", () => {
    assert.equal(AUDIT_34_PATCHES.length, 0);
    assert.deepEqual(
      AUDIT_34_NO_CHANGE.map((r) => [r.slug, r.outcome, r.source]),
      [
        ["play-ht", "hidden", "https://www.bloomberg.com/news/articles/2025-07-11/meta-acquires-voice-ai-startup-playai-continuing-to-add-talent"],
        ["kakao-brain-karlo", "hidden", "https://devtalk.kakao.com/t/kogpt-karlo-api-notice-end-of-support-for-kogpt-karlo-apis/139024"],
      ],
    );
  });

  it("hides both rows without deleting their facts", () => {
    for (const slug of Object.keys(AUDIT_34_HIDDEN)) {
      assert.equal(isHiddenPlatform(slug), true, slug);
      assert.ok(hiddenPlatformSlugs().includes(slug), slug);
      const facts = getToolFacts(slug);
      assert.ok(facts, slug);
      assert.equal(facts.visibility, "hidden", slug);
      assert.equal(facts.lifecycle, "discontinued", slug);
      assert.equal(facts.status?.checkedAt, "2026-11-06", slug);
      assert.equal(facts.status?.verifiedAt, "2026-11-06", slug);
      assert.equal(facts.changelog?.[0]?.date, "2026-11-06", slug);
      assert.equal(facts.changelog?.[0]?.field, "visibility", slug);
    }
    assert.equal(
      getToolFacts("play-ht")!.status!.sourceUrl,
      "https://www.bloomberg.com/news/articles/2025-07-11/meta-acquires-voice-ai-startup-playai-continuing-to-add-talent",
    );
    assert.equal(getToolFacts("play-ht")!.status!.value.sourceKind, "secondary");
    assert.equal(
      getToolFacts("kakao-brain-karlo")!.status!.sourceUrl,
      "https://devtalk.kakao.com/t/kogpt-karlo-api-notice-end-of-support-for-kogpt-karlo-apis/139024",
    );
  });

  it("301s each whole /platform tree to a live listing page, with no chains", () => {
    const moves = catalogRedirects();
    const sources = new Set(moves.map((m) => m.source));
    for (const [slug, to] of Object.entries(AUDIT_34_HIDDEN)) {
      assert.equal(HIDDEN_PAGE_REDIRECTS[slug], to);
      for (const source of [`/platform/${slug}`, `/platform/${slug}/:path*`]) {
        const hits = moves.filter((m) => m.source === source);
        assert.equal(hits.length, 1, source);
        assert.equal(hits[0].destination, to, source);
        assert.equal(hits[0].statusCode, 301);
      }
      assert.equal(slug in PLATFORM_REDIRECTS, false, slug);
      assert.equal(RETIRED_GUIDE_SLUGS.includes(slug), false, slug);
      assert.equal(
        moves.some((m) => m.source === `/platform/${slug}/guide` && m.destination === `/platform/${slug}`),
        false,
        `${slug} guide must not chain`,
      );
      assert.equal(sources.has(to), false, `${to} is itself redirected`);
      assert.equal(to.startsWith("/platform/"), false, to);
    }
  });

  it("has no live guide registered for either slug", () => {
    for (const slug of Object.keys(AUDIT_34_HIDDEN)) {
      assert.equal(getStaticTutorialForPlatform(slug), undefined, slug);
      assert.equal(existsSync(join(process.cwd(), `src/data/tutorials/${slug}-getting-started.ts`)), false, slug);
    }
  });

  it("is out of the snapshot's searchable rows and listed under hidden_rows", () => {
    for (const slug of Object.keys(AUDIT_34_HIDDEN)) {
      assert.equal(snapshot.rows.some((r) => r.slug === slug), false, slug);
      assert.ok(snapshot.hidden_rows.includes(slug), slug);
    }
    assert.match(snapshot.built_from, /audit 34/);
  });
});
