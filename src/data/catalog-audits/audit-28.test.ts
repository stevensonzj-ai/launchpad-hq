import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { AUDIT_28_HIDDEN, AUDIT_28_NO_CHANGE, AUDIT_28_PATCHES, audit28UpdateData, planAudit28 } from "@/data/catalog-audits/audit-28";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, PLATFORM_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform } from "@/lib/catalog-visibility";

type Row = Record<string, string | null> & { slug: string };
const snapshot = JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as { rows: Row[]; hidden_rows: string[] };
const rows = snapshot.rows;
const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("catalog audit 28: rows audit 27 left open", () => {
  it("covers 7 distinct rows with the planned outcome counts", () => {
    const all = [...AUDIT_28_PATCHES, ...AUDIT_28_NO_CHANGE];
    assert.equal(all.length, 7);
    assert.equal(new Set(all.map((r) => r.slug)).size, 7);
    const count = (o: string) => all.filter((r) => r.outcome === o).length;
    assert.deepEqual({ v: count("verified"), c: count("corrected"), h: count("hidden") }, { v: 2, c: 2, h: 3 });
    for (const r of all) assert.match(r.source, /^https:\/\//, r.slug);
  });

  it("new text is dated, changes something and carries no promo or 'official' wording", () => {
    for (const p of AUDIT_28_PATCHES) {
      for (const [field, { from, to }] of Object.entries(p.fields)) {
        assert.notEqual(from, to, `${p.slug}.${field}`);
        assert.doesNotMatch(to, /official|first[- ]month|limited[- ]time|flash sale/i, `${p.slug}.${field}`);
        assert.match(to, /\(as of 2026-11-01\)$/, `${p.slug}.${field}`);
      }
    }
  });

  it("is applied to the snapshot and a re-run is a no-op", () => {
    for (const p of AUDIT_28_PATCHES) {
      const row = rows.find((r) => r.slug === p.slug);
      assert.ok(row, p.slug);
      const plans = planAudit28(row as never, p);
      assert.ok(plans.every((x) => x.action === "already"), p.slug);
      assert.deepEqual(audit28UpdateData(plans), {});
    }
    const patch = { slug: "s", outcome: "corrected" as const, source: "https://e.example", fields: { currentPricing: { from: "x", to: "y" } } };
    assert.deepEqual(audit28UpdateData(planAudit28({ currentPricing: "x" }, patch)), { currentPricing: "y" });
    assert.deepEqual(audit28UpdateData(planAudit28({ currentPricing: "z" }, patch)), {});
  });

  it("mem carries the get.mem.ai plan ladder and limits", () => {
    const mem = rows.find((r) => r.slug === "mem")!;
    assert.match(mem.currentPricing ?? "", /Mem Plus \$9\/mo.*Pro 20× \$199/);
    assert.match(mem.usageLimits ?? "", /Free 25, Plus 50, Pro 100, Pro 2× 200, Pro 5× 500, Pro 10× 1,000, Pro 20× 2,000/);
    assert.match(mem.usageLimits ?? "", /Free 3 hours, Plus 10 hours/);
  });

  it("hides naver and genspark with single-hop 301s to listed pages and keeps their facts", () => {
    const moves = catalogRedirects();
    for (const [slug, to] of Object.entries(AUDIT_28_HIDDEN)) {
      assert.equal(isHiddenPlatform(slug), true, slug);
      assert.ok(hiddenPlatformSlugs().includes(slug), slug);
      assert.equal(getToolFacts(slug)?.visibility, "hidden", slug);
      assert.equal(HIDDEN_PAGE_REDIRECTS[slug], to, slug);
      const target = to.replace("/platform/", "");
      assert.equal(isHiddenPlatform(target), false, target);
      assert.equal(target in PLATFORM_REDIRECTS, false, target);
      assert.ok(rows.some((r) => r.slug === target), target);
      assert.equal(rows.some((r) => r.slug === slug), false, `${slug} moved to hidden_rows`);
      assert.ok(snapshot.hidden_rows.includes(slug), slug);
      for (const source of [`/platform/${slug}`, `/platform/${slug}/:path*`]) {
        const hits = moves.filter((m) => m.source === source);
        assert.equal(hits.length, 1, source);
        assert.equal(hits[0].destination, to, source);
        assert.equal(hits[0].statusCode, 301);
      }
      assert.equal(slug in PLATFORM_REDIRECTS, false, slug);
      assert.equal(RETIRED_GUIDE_SLUGS.includes(slug), false, `${slug} guide must not chain`);
      assert.equal(getStaticTutorialForPlatform(slug), undefined, slug);
      assert.match(read(`src/data/tutorials/retired/${slug}-getting-started.ts`), new RegExp(`platformSlug: "${slug}"`));
    }
  });

  it("naver is discontinued with a dated what-happened notice; genspark stays active", () => {
    const naver = getToolFacts("naver-hyperclova-x-cue")!;
    assert.equal(naver.lifecycle, "discontinued");
    assert.equal(naver.status?.checkedAt, "2026-11-01");
    assert.match(naver.status!.value.headline, /April 9, 2026/);
    assert.equal(naver.status!.sourceUrl, "https://cue.search.naver.com");
    for (const a of naver.status!.value.alternatives ?? []) assert.ok(rows.some((r) => r.slug === a.slug), a.slug);
    assert.equal(getToolFacts("genspark")?.lifecycle, "active");
    assert.equal(isHiddenPlatform("clarifai"), true);
  });

  it("fact files re-read by audit 28 carry the 2026-11-01 date and a changelog line", () => {
    for (const slug of ["duolingo-max", "speak-language-ai", "zillow-ai-zestimate"]) {
      assert.equal(getToolFacts(slug)!.changelog?.[0].date, "2026-11-01", slug);
    }
    assert.equal(getToolFacts("duolingo-max")!.features!.checkedAt, "2026-11-01");
    assert.equal(getToolFacts("speak-language-ai")!.plans!.checkedAt, "2026-11-01");
    assert.equal(getToolFacts("zillow-ai-zestimate")!.features!.checkedAt, "2026-11-01");
  });

  it("the runner defaults to dry-run, uses the prod guard and prints no values", () => {
    const source = read("scripts/update-catalog-audit-28.ts");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /select: \{ currentPricing: true, freeTierFeatures: true, usageLimits: true \}/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
  });
});
