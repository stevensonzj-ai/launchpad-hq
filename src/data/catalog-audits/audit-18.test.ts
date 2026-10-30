import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts as getRegisteredFacts } from "@/data/facts";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { isPublishedVerified } from "@/data/facts/walk";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { saysTrialOnly } from "@/lib/mcp/label-consistency";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { audit10Slugs } from "./audit-10";
import { AUDIT_11_PATCHES, audit11Slugs } from "./audit-11";
import { AUDIT_17_BATCH, AUDIT_17_PATCHES } from "./audit-17";
import {
  AUDIT_18_BATCH,
  AUDIT_18_BATCH1_RECHECK,
  AUDIT_18_PATCHES,
  CHECKED_AT,
  audit18GuardSkips,
  audit18PatchData,
  type Audit18Row,
} from "./audit-18";
import { CHECKED_AT as AUDIT_22_CHECKED_AT } from "./audit-22";
const AUDIT_22_FACT_KEYS = new Set(["displayName", "officialUrl", "status"]);
/** Batch-2 slugs renamed later (catalog audit 22) keep their fact file under the new slug. */
const getToolFacts = (slug: string) => getRegisteredFacts(PLATFORM_REDIRECTS[slug] ?? slug);

const snap = (slug: string) => snapshotRows().find((r) => r.slug === (PLATFORM_REDIRECTS[slug] ?? slug));

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
  privacyLevel: "HIGH",
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
    for (const patch of AUDIT_18_PATCHES) {
      assert.ok(AUDIT_18_BATCH.includes(patch.slug) || AUDIT_18_BATCH1_RECHECK.includes(patch.slug), patch.slug);
    }
    assert.equal(new Set(AUDIT_18_PATCHES.map((p) => p.slug)).size, AUDIT_18_PATCHES.length);
  });

  it("re-checks 18 batch-1 rows from the browser check, all of them audit-17 slugs with fact files", () => {
    assert.equal(AUDIT_18_BATCH1_RECHECK.length, 18);
    assert.equal(new Set(AUDIT_18_BATCH1_RECHECK).size, 18);
    for (const slug of AUDIT_18_BATCH1_RECHECK) {
      assert.ok(AUDIT_17_BATCH.includes(slug), slug);
      assert.ok(getToolFacts(slug), slug);
    }
  });

  it("agrees with audit 17 on every field both write, so re-running either cannot revert the other", () => {
    for (const patch of AUDIT_18_PATCHES.filter((p) => AUDIT_18_BATCH1_RECHECK.includes(p.slug))) {
      const a17 = AUDIT_17_PATCHES.find((p) => p.slug === patch.slug);
      if (!a17) continue;
      for (const [field, text] of Object.entries(patch.fields)) {
        const other: string | undefined = a17.fields[field as keyof typeof a17.fields];
        if (other !== undefined) assert.equal(other, text, `${patch.slug}.${field}`);
      }
      const t17 = a17.guarded?.costTier?.to;
      const t18 = patch.guarded?.costTier?.to;
      if (t17 && t18) assert.equal(t17, t18, `${patch.slug}.costTier`);
    }
  });

  it("follows the browser check on the rows named in the brief", () => {
    const p = (slug: string) => AUDIT_18_PATCHES.find((x) => x.slug === slug)!;
    // Relevance AI: Enterprise only, custom pricing.
    assert.deepEqual(p("relevance-ai").guarded?.costTier, { from: "PAID", to: "ENTERPRISE" });
    assert.equal(snap("relevance-ai")?.costTier, "ENTERPRISE");
    assert.deepEqual(getToolFacts("relevance-ai")?.plans?.value.map((x) => x.name), ["Enterprise"]);
    // Gumloop: self-serve content may train its models (policy section 21).
    assert.deepEqual(p("gumloop").guarded?.privacyLevel, { from: "HIGH", to: "LOW" });
    assert.equal(snap("gumloop")?.privacyLevel, "LOW");
    const gumPrivacy = getToolFacts("gumloop")?.privacy;
    assert.equal(gumPrivacy?.value.trainsOnData, true);
    assert.ok(gumPrivacy && isPublishedVerified(gumPrivacy));
    // Litmaps Free: 2 Litmaps.
    assert.match(snap("litmaps")?.freeTierFeatures ?? "", /^Free: 2 Litmaps/);
    // Ludo: no free plan, no sign-up credit claim.
    assert.equal(snap("ludo-ai")?.costTier, "PAID");
    assert.equal(getToolFacts("ludo-ai")?.freeTier?.value.available, false);
    for (const f of ["currentPricing", "freeTierFeatures", "usageLimits"] as const) {
      assert.doesNotMatch(snap("ludo-ai")?.[f] ?? "", /30 (free )?credits/, f);
    }
    // Meshy: monthly prices only.
    assert.doesNotMatch(snap("meshy")?.currentPricing ?? "", /20% off|annual/i);
    // ChatGPT / GPT Image: chatgpt.com, no numeric image caps.
    assert.equal(snap("gpt-image-1-5-dall-e-successor")?.website, "https://chatgpt.com");
    assert.equal(getToolFacts("gpt-image-1-5-dall-e-successor")?.officialUrl?.value, "https://chatgpt.com");
    assert.doesNotMatch(snap("gpt-image-1-5-dall-e-successor")?.freeTierFeatures ?? "", /\d+ images/);
    // Fireworks: no starting-credit claim in the row or the fact file.
    const fw = getToolFacts("fireworks-ai")!;
    assert.doesNotMatch(`${fw.freeTier?.value.summary} ${snap("fireworks-ai")?.freeTierFeatures}`, /\$\d+ (sign-up |starting )?credit|free credit/i);
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
    for (const slug of [...AUDIT_18_BATCH, ...AUDIT_18_BATCH1_RECHECK]) {
      const facts = getToolFacts(slug)!;
      for (const [key, fact] of Object.entries(facts)) {
        if (!fact || typeof fact !== "object" || !("sourceUrl" in fact)) continue;
        // Catalog audit 22 (2026-10-30) adds displayName / officialUrl / status to renamed rows.
        if (AUDIT_22_FACT_KEYS.has(key) && fact.checkedAt === AUDIT_22_CHECKED_AT) continue;
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
    for (const slug of [...AUDIT_18_BATCH, ...AUDIT_18_BATCH1_RECHECK]) {
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
        privacyLevel: before.privacyLevel ?? null,
      };
      // The committed snapshot already has audit 18 applied, so start from the pre-audit guard values.
      const g = patch.guarded ?? {};
      if (g.company) pre.company = g.company.from[0];
      if (g.website) pre.website = g.website.from[0];
      if (g.costTier) pre.costTier = g.costTier.from;
      if (g.apiAvailable) pre.apiAvailable = g.apiAvailable.from;
      if (g.privacyLevel) pre.privacyLevel = g.privacyLevel.from;
      for (const field of Object.keys(patch.fields) as (keyof typeof patch.fields)[]) pre[field] = "stale";
      const data = audit18PatchData(pre, patch);
      if (Object.keys(data).length) changed += 1;
      const after = { ...pre, ...data } as Audit18Row;
      assert.deepEqual(audit18PatchData(after, patch), {}, `${patch.slug}: re-run is a no-op`);
      assert.deepEqual(audit18GuardSkips(after, patch), [], patch.slug);
    }
    assert.equal(changed, AUDIT_18_PATCHES.length);
  });

  it("matches the expected dry run: batch 2 21 rows / 67 fields, batch-1 re-check 16 rows / 32 fields", () => {
    const part = (slugs: string[]) => AUDIT_18_PATCHES.filter((p) => slugs.includes(p.slug));
    const tally = (patches: typeof AUDIT_18_PATCHES) => {
      const count = (k: "website" | "costTier" | "company" | "apiAvailable" | "privacyLevel") =>
        patches.filter((p) => p.guarded?.[k]).length;
      return {
        rows: patches.filter((p) => Object.keys(p.fields).length > 0 || p.guarded).length,
        text: patches.reduce((n, p) => n + Object.keys(p.fields).length, 0),
        website: count("website"),
        costTier: count("costTier"),
        company: count("company"),
        apiAvailable: count("apiAvailable"),
        privacyLevel: count("privacyLevel"),
      };
    };
    assert.deepEqual(tally(part(AUDIT_18_BATCH)), { rows: 21, text: 54, website: 6, costTier: 6, company: 1, apiAvailable: 0, privacyLevel: 0 });
    assert.deepEqual(tally(part(AUDIT_18_BATCH1_RECHECK)), { rows: 16, text: 29, website: 1, costTier: 1, company: 0, apiAvailable: 0, privacyLevel: 1 });
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
        privacyLevel: { from: "HIGH", to: "LOW" },
      },
    };
    assert.deepEqual(audit18PatchData(row(), patch), {
      company: "New Co",
      website: "https://new.example",
      costTier: "PAID",
      apiAvailable: true,
      privacyLevel: "LOW",
    });
    const edited = row({ company: "Hand Co", website: "https://hand.example", costTier: "FREEMIUM", apiAvailable: undefined, privacyLevel: "MEDIUM" });
    assert.deepEqual(audit18PatchData(edited, patch), {});
    assert.deepEqual(audit18GuardSkips(edited, patch), ["company", "website", "costTier", "apiAvailable", "privacyLevel"]);
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
