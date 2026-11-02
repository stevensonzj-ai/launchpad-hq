import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { AUDIT_30_HIDDEN, AUDIT_30_NO_CHANGE, AUDIT_30_PATCHES } from "@/data/catalog-audits/audit-30";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform } from "@/lib/catalog-visibility";

type Row = { slug: string };
const snapshot = JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as { rows: Row[]; hidden_rows: string[]; built_from: string };
const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("catalog audit 30: hedra hidden at the vendor's request", () => {
  it("has one hidden outcome, no database patches and an https source", () => {
    assert.equal(AUDIT_30_PATCHES.length, 0);
    assert.deepEqual(AUDIT_30_NO_CHANGE.map((r) => [r.slug, r.outcome, r.source]), [["hedra", "hidden", "https://www.hedra.com"]]);
  });

  it("hides hedra with a single-hop 301 to a listed page and keeps its facts", () => {
    const moves = catalogRedirects();
    for (const [slug, to] of Object.entries(AUDIT_30_HIDDEN)) {
      assert.equal(isHiddenPlatform(slug), true, slug);
      assert.ok(hiddenPlatformSlugs().includes(slug), slug);
      assert.equal(getToolFacts(slug)?.visibility, "hidden", slug);
      assert.equal(getToolFacts(slug)?.lifecycle, "active", slug);
      assert.equal(HIDDEN_PAGE_REDIRECTS[slug], to);
      assert.equal(slug in PLATFORM_REDIRECTS, false);
      for (const source of [`/platform/${slug}`, `/platform/${slug}/:path*`]) {
        const hits = moves.filter((m) => m.source === source);
        assert.equal(hits.length, 1, source);
        assert.equal(hits[0].destination, to, source);
        assert.equal(hits[0].statusCode, 301);
      }
    }
  });

  it("retires the guide so /platform/hedra/guide does not chain", () => {
    assert.equal(RETIRED_GUIDE_SLUGS.includes("hedra"), false);
    assert.equal(getStaticTutorialForPlatform("hedra"), undefined);
    assert.match(read("src/data/tutorials/retired/hedra-getting-started.ts"), /platformSlug: "hedra"/);
    assert.equal(existsSync(join(process.cwd(), "src/data/tutorials/hedra-getting-started.ts")), false);
  });

  it("is out of the snapshot's searchable rows and listed under hidden_rows", () => {
    assert.equal(snapshot.rows.some((r) => r.slug === "hedra"), false);
    assert.ok(snapshot.hidden_rows.includes("hedra"));
    assert.match(snapshot.built_from, /audit 30/);
  });

  it("has no logo entry or image file", () => {
    assert.doesNotMatch(read("src/lib/platform-logo-assets.json"), /hedra/i);
    assert.doesNotMatch(read("public/images/platforms/catalog-logos.json"), /hedra/i);
    assert.equal(existsSync(join(process.cwd(), "public/images/platforms/hedra.png")), false);
  });

  it("the runner defaults to dry-run, uses the prod guard and never deletes or creates", () => {
    const source = read("scripts/update-catalog-audit-30.ts");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
  });
});
