import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { AUDIT_27_NO_CHANGE, AUDIT_27_PATCHES, audit27UpdateData, planAudit27 } from "@/data/catalog-audits/audit-27";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { isHiddenPlatform } from "@/lib/catalog-visibility";

type Row = Record<string, string | null> & { slug: string };
const rows = (JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as { rows: Row[] }).rows;

describe("catalog audit 27: rows audit 25 left catalog_only", () => {
  it("covers 27 distinct rows with the planned outcome counts", () => {
    const all = [...AUDIT_27_PATCHES, ...AUDIT_27_NO_CHANGE];
    assert.equal(all.length, 27);
    assert.equal(new Set(all.map((r) => r.slug)).size, 27);
    const count = (o: string) => all.filter((r) => r.outcome === o).length;
    assert.deepEqual(
      { v: count("verified"), c: count("corrected"), r: count("renamed"), h: count("hidden"), u: count("still_unverifiable") },
      { v: 8, c: 6, r: 2, h: 3, u: 8 },
    );
    for (const r of all) assert.match(r.source, /^https:\/\//, r.slug);
  });

  it("new text is dated, changes something and carries no promo or 'official' wording", () => {
    for (const p of AUDIT_27_PATCHES) {
      for (const [field, { from, to }] of Object.entries(p.fields)) {
        assert.notEqual(from, to, `${p.slug}.${field}`);
        assert.doesNotMatch(to, /official|first[- ]month|limited[- ]time|promo|flash sale/i, `${p.slug}.${field}`);
        if (field !== "website" && field !== "name") assert.match(to, /\(as of 2026-10-30\)$/, `${p.slug}.${field}`);
      }
    }
  });

  it("is applied to the snapshot and a re-run is a no-op", () => {
    for (const p of AUDIT_27_PATCHES) {
      const row = rows.find((r) => r.slug === p.slug);
      if (p.slug === "sora-2") {
        assert.equal(row, undefined, "sora-2 moved to hidden_rows");
        continue;
      }
      assert.ok(row, p.slug);
      const plans = planAudit27(row as never, p);
      assert.ok(plans.every((x) => x.action === "already"), p.slug);
      assert.deepEqual(audit27UpdateData(plans), {});
    }
    assert.deepEqual(audit27UpdateData(planAudit27({ currentPricing: "x" }, { slug: "s", outcome: "corrected", source: "https://e.example", fields: { currentPricing: { from: "x", to: "y" } } })), { currentPricing: "y" });
    assert.deepEqual(audit27UpdateData(planAudit27({ currentPricing: "z" }, { slug: "s", outcome: "corrected", source: "https://e.example", fields: { currentPricing: { from: "x", to: "y" } } })), {});
  });

  it("hides sora-2 with a single-hop 301 to a listed page and keeps its facts", () => {
    assert.equal(isHiddenPlatform("sora-2"), true);
    assert.equal(getToolFacts("sora-2")?.visibility, "hidden");
    assert.equal(getToolFacts("sora-2")?.lifecycle, "discontinued");
    const to = HIDDEN_PAGE_REDIRECTS["sora-2"];
    assert.equal(to, "/platform/google-veo-3-1");
    assert.equal(isHiddenPlatform("google-veo-3-1"), false);
    assert.equal("google-veo-3-1" in PLATFORM_REDIRECTS, false);
    assert.ok(rows.some((r) => r.slug === "google-veo-3-1"));
    for (const source of ["/platform/sora-2", "/platform/sora-2/:path*"]) {
      const hits = catalogRedirects().filter((m) => m.source === source);
      assert.equal(hits.length, 1, source);
      assert.equal(hits[0].destination, to);
      assert.equal(hits[0].statusCode, 301);
    }
  });

  it("keeps slugs on the renames and already-hidden rows stay hidden", () => {
    for (const slug of ["wonder-dynamics-wonder-studio", "aleph-alpha-luminous"]) {
      assert.equal(slug in PLATFORM_REDIRECTS, false, slug);
      assert.equal(isHiddenPlatform(slug), false, slug);
    }
    for (const slug of ["adobe-sensei-firefly-in-cc", "canva-magic-studio", "clarifai"]) assert.equal(isHiddenPlatform(slug), true, slug);
  });

  it("the runner defaults to dry-run, uses the prod guard and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-27.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /usageLimits: true, website: true, name: true/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
  });
});
