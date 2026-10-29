import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { isPublishedVerified } from "@/data/facts/walk";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { saysTrialOnly } from "@/lib/mcp/label-consistency";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { audit10Slugs } from "./audit-10";
import { AUDIT_11_PATCHES, audit11Slugs } from "./audit-11";
import { AUDIT_17_BATCH } from "./audit-17";
import {
  AUDIT_18_BATCH,
  AUDIT_18_PATCHES,
  CHECKED_AT,
  audit18GuardSkips,
  audit18PatchData,
  type Audit18Row,
} from "./audit-18";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const s = readFileSync(join(process.cwd(), file), "utf8");
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

const row = (over: Partial<Audit18Row> = {}): Audit18Row => ({
  company: "Old Co",
  website: "https://old.example",
  primaryUse: null,
  currentPricing: null,
  freeTierFeatures: null,
  usageLimits: null,
  costTier: "FREE",
  apiAvailable: false,
  ...over,
});

describe("catalog audit 18: stale facts batch 2", () => {
  it("covers exactly the 23 batch-2 slugs, each with a fact file", () => {
    assert.equal(AUDIT_18_BATCH.length, 23);
    assert.equal(new Set(AUDIT_18_BATCH).size, 23);
    for (const slug of AUDIT_18_BATCH) {
      const facts = getToolFacts(slug);
      assert.ok(facts, `${slug}: fact file registered`);
    }
    for (const patch of AUDIT_18_PATCHES) assert.ok(AUDIT_18_BATCH.includes(patch.slug), patch.slug);
    assert.equal(new Set(AUDIT_18_PATCHES.map((p) => p.slug)).size, AUDIT_18_PATCHES.length);
  });

  it("skips the rows done in #115/#116 and batch 1 (audit 17)", () => {
    for (const slug of AUDIT_17_BATCH) assert.equal(AUDIT_18_BATCH.includes(slug), false, slug);
    for (const slug of ["tabnine", "clarifai", "hermes-agent", "canva-ai-magic-studio", "lindy-ai", "scite", "activepieces"]) {
      assert.equal(AUDIT_18_BATCH.includes(slug), false, slug);
    }
  });

  it("touches no slug that audit 10 patches, so re-running it cannot revert this one", () => {
    const earlier = new Set(audit10Slugs());
    for (const slug of AUDIT_18_BATCH) assert.equal(earlier.has(slug), false, slug);
  });

  it("shares only squarespace-ai with audit 11, and never writes the one field audit 11 owns there", () => {
    const shared = AUDIT_18_BATCH.filter((slug) => audit11Slugs().includes(slug));
    assert.deepEqual(shared, ["squarespace-ai"]);
    const a11 = AUDIT_11_PATCHES.find((p) => p.slug === "squarespace-ai")!;
    assert.equal(a11.fields, undefined, "audit 11 is tier-only on squarespace-ai");
    assert.ok(a11.guarded?.costTier);
    const a18 = AUDIT_18_PATCHES.find((p) => p.slug === "squarespace-ai")!;
    assert.equal(a18.guarded?.costTier, undefined, "audit 18 leaves squarespace-ai costTier to audit 11");
    assert.equal(snap("squarespace-ai")?.costTier, a11.guarded!.costTier!.to);
  });

  it("stamps every fact checked today, with vendor sources and no affiliate links", () => {
    for (const slug of AUDIT_18_BATCH) {
      const facts = getToolFacts(slug)!;
      for (const [key, fact] of Object.entries(facts)) {
        if (!fact || typeof fact !== "object" || !("sourceUrl" in fact)) continue;
        assert.equal(fact.checkedAt, CHECKED_AT, `${slug}.${key}`);
        assert.match(fact.sourceUrl, /^https:\/\//, `${slug}.${key}`);
        assert.doesNotMatch(fact.sourceUrl, /via=|ref=|affiliate|utm_|\/\/(?:www\.)?x\.com|twitter\.com/i, `${slug}.${key}`);
        if (fact.status === "verified") assert.ok(isPublishedVerified(fact), `${slug}.${key}: second reader recorded`);
      }
    }
  });

  it("writes dated text that never claims to be official and never says trial-only under a free tier", () => {
    for (const patch of AUDIT_18_PATCHES) {
      assert.equal(patch.checkedAt, CHECKED_AT, patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      const tier = patch.guarded?.costTier?.to ?? snap(patch.slug)?.costTier;
      for (const [field, text] of Object.entries(patch.fields)) {
        if (field !== "primaryUse") assert.match(text, new RegExp(`as of ${CHECKED_AT}`), `${patch.slug}.${field}`);
        assert.equal(claimsOfficial(text), false, `${patch.slug}.${field}`);
        assert.doesNotMatch(text, /via=|affiliate|referral|sponsor|utm_/i, `${patch.slug}.${field}`);
        if (tier === "FREE" || tier === "FREEMIUM") assert.equal(saysTrialOnly(text), false, `${patch.slug}.${field}`);
      }
    }
  });

  it("matches each cost tier to the fact file's free tier", () => {
    for (const slug of AUDIT_18_BATCH) {
      const patch = AUDIT_18_PATCHES.find((p) => p.slug === slug);
      const tier = patch?.guarded?.costTier?.to ?? snap(slug)?.costTier;
      const free = getToolFacts(slug)?.freeTier?.value;
      if (!free) continue;
      if (free.available) assert.ok(tier === "FREE" || tier === "FREEMIUM" || tier === "ENTERPRISE", `${slug}: ${tier}`);
      else assert.ok(tier === "PAID" || tier === "ENTERPRISE", `${slug}: ${tier}`);
    }
  });

  it("dry run against the pre-audit row reports changes; a re-run against the patched row reports 0", () => {
    let changed = 0;
    for (const patch of AUDIT_18_PATCHES) {
      const before = snap(patch.slug);
      assert.ok(before, patch.slug);
      const pre: Audit18Row = {
        company: before.company ?? null,
        website: before.website ?? null,
        primaryUse: before.primaryUse ?? null,
        currentPricing: before.currentPricing ?? null,
        freeTierFeatures: before.freeTierFeatures ?? null,
        usageLimits: before.usageLimits ?? null,
        costTier: before.costTier,
        apiAvailable: before.apiAvailable,
      };
      // The committed snapshot already has audit 18 applied, so start from the pre-audit guard values.
      const g = patch.guarded ?? {};
      if (g.company) pre.company = g.company.from[0];
      if (g.website) pre.website = g.website.from[0];
      if (g.costTier) pre.costTier = g.costTier.from;
      if (g.apiAvailable) pre.apiAvailable = g.apiAvailable.from;
      for (const field of Object.keys(patch.fields) as (keyof typeof patch.fields)[]) pre[field] = "stale";
      const data = audit18PatchData(pre, patch);
      if (Object.keys(data).length) changed += 1;
      const after = { ...pre, ...data } as Audit18Row;
      assert.deepEqual(audit18PatchData(after, patch), {}, `${patch.slug}: re-run is a no-op`);
      assert.deepEqual(audit18GuardSkips(after, patch), [], patch.slug);
    }
    assert.equal(changed, AUDIT_18_PATCHES.length);
  });

  it("matches the expected dry run: 21 rows, 6 websites, 6 cost tiers, 1 company", () => {
    const withWrites = AUDIT_18_PATCHES.filter((p) => Object.keys(p.fields).length > 0 || p.guarded);
    assert.equal(withWrites.length, 21);
    const count = (k: "website" | "costTier" | "company" | "apiAvailable") => AUDIT_18_PATCHES.filter((p) => p.guarded?.[k]).length;
    assert.equal(count("website"), 6);
    assert.equal(count("costTier"), 6);
    assert.equal(count("company"), 1);
    assert.equal(count("apiAvailable"), 0);
    assert.equal(AUDIT_18_PATCHES.reduce((n, p) => n + Object.keys(p.fields).length, 0), 54);
  });

  it("leaves a hand-edited guarded field alone and reports it", () => {
    const patch = {
      slug: "x",
      finding: "",
      sources: ["https://example.com"],
      checkedAt: CHECKED_AT,
      fields: {},
      guarded: {
        company: { from: ["Old Co"], to: "New Co" },
        website: { from: ["https://old.example"], to: "https://new.example" },
        costTier: { from: "FREE", to: "PAID" },
        apiAvailable: { from: false, to: true },
      },
    };
    assert.deepEqual(audit18PatchData(row(), patch), {
      company: "New Co",
      website: "https://new.example",
      costTier: "PAID",
      apiAvailable: true,
    });
    const edited = row({ company: "Hand Co", website: "https://hand.example", costTier: "FREEMIUM", apiAvailable: undefined });
    assert.deepEqual(audit18PatchData(edited, patch), {});
    assert.deepEqual(audit18GuardSkips(edited, patch), ["company", "website", "costTier", "apiAvailable"]);
  });
});

describe("catalog audit 18: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-18.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, updates only, never creates or deletes", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.update\(/g)?.length, 1);
    assert.match(source, /if \(dryRun\) continue;\n\s+await prisma\.platform\.update\(\{ where: \{ slug: patch\.slug \}, data \}\)/);
    assert.doesNotMatch(source, /\.(create|updateMany|createMany|delete|deleteMany|upsert)\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit18: \$\{rows\} rows \/ \$\{fields\} patched fields/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-18"], "tsx scripts/update-catalog-audit-18.ts");
  });

  it("shares the prod guard of audits 15-17 byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-18.ts");
    assert.ok(guard.length > 0);
    assert.equal(guard, guardSection("scripts/update-catalog-audit-15.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-16.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-17.ts"));
  });
});
