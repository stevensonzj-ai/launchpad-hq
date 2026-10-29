import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  CHECKED_AT,
  HERMES_ALTERNATIVES,
  HERMES_CATEGORY_SLUG,
  HERMES_ROW,
  HERMES_SLUG,
  HERMES_SOURCES,
  hermesCreateData,
  hermesCurrentPricing,
} from "./audit-16";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug);

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const s = readFileSync(join(process.cwd(), file), "utf8");
  return s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
};

describe("catalog audit 16: Hermes Agent row (create only)", () => {
  it("is not in the snapshot yet, so the dry run reports 1 create; a re-run reports 0", () => {
    assert.equal(snap(HERMES_SLUG), undefined);
    assert.ok(hermesCreateData(false, "cat-id"));
    assert.equal(hermesCreateData(true, "cat-id"), null);
    assert.equal(hermesCreateData(false, null), null);
  });

  it("uses an existing category slug, the one the closest agent rows sit in", () => {
    assert.ok(snapshotRows().some((r) => r.category?.slug === HERMES_CATEGORY_SLUG));
    assert.equal(snap("manus")?.category?.slug, HERMES_CATEGORY_SLUG);
    assert.equal(snap("lindy-ai")?.category?.slug, HERMES_CATEGORY_SLUG);
    assert.equal(hermesCreateData(false, "agents-cat")!.categoryId, "agents-cat");
  });

  it("names only alternatives that have rows (no OpenClaw)", () => {
    const names = new Set(snapshotRows().map((r) => r.name));
    for (const name of HERMES_ALTERNATIVES) assert.ok(names.has(name), name);
    assert.deepEqual([...HERMES_ROW.directAlternatives], HERMES_ALTERNATIVES);
    assert.equal(snapshotRows().some((r) => /openclaw/i.test(`${r.slug} ${r.name}`)), false);
  });

  it("has the same fields as an existing row, points at Nous's own site, no affiliate or \"official\"", () => {
    const keys = Object.keys(snap("manus")!).filter((k) => !["updatedAt", "category", "iosAppUrl", "androidAppUrl"].includes(k));
    for (const key of keys) assert.ok(key in HERMES_ROW, key);
    assert.equal(HERMES_ROW.website, "https://hermes-agent.nousresearch.com");
    assert.equal(HERMES_ROW.company, "Nous Research");
    const json = JSON.stringify(HERMES_ROW);
    assert.doesNotMatch(json, /via=|affiliate|referral|sponsor|utm_/i);
    for (const key of ["description", "currentPricing", "freeTierFeatures"] as const) {
      assert.match(HERMES_ROW[key], new RegExp(`as of ${CHECKED_AT}`), key);
      assert.equal(claimsOfficial(HERMES_ROW[key]), false, key);
    }
    for (const url of HERMES_SOURCES) assert.match(url, /^https:\/\/(hermes-agent\.nousresearch\.com|portal\.nousresearch\.com|github\.com\/NousResearch)\//);
  });

  it("states the Portal pricing exactly, built from the fact file", () => {
    assert.equal(
      hermesCurrentPricing(),
      "Free and open source (MIT). Optional Nous Portal plans: Free $0, Plus $20/mo, Super $100/mo, Ultra $200/mo. Paid plans include Hermes Agent usage within limits that reset daily, weekly and monthly, and one cloud agent; API keys use pay-as-you-go credits. Annual pricing and free trial: not stated (as of 2026-10-29)",
    );
    assert.equal(HERMES_ROW.currentPricing, hermesCurrentPricing());
    const facts = getToolFacts(HERMES_SLUG)!;
    for (const key of ["plans", "freeTier"] as const) {
      assert.equal(facts[key]!.status, "verified", key);
      assert.equal(facts[key]!.verifiedBy, "owner", key);
      assert.equal(facts[key]!.sourceUrl, "https://portal.nousresearch.com/", key);
    }
    assert.deepEqual(
      facts.plans!.value.map((p) => `${p.name} ${p.price}`),
      ["Free $0", "Plus $20", "Super $100", "Ultra $200"],
    );
    const [free, plus, superPlan, ultra] = facts.plans!.value;
    assert.match(free.limits, /Free models only; standard rate limits; \$0 monthly credits/);
    for (const p of [plus, superPlan, ultra]) {
      assert.match(p.limits, /Hermes Agent usage included, within limits that reset daily, weekly and monthly/, p.name);
    }
    assert.match(plus.limits, /one cloud agent \(4 GB RAM, 25 GB disk\)/);
    assert.match(superPlan.limits, /one cloud agent \(4 GB RAM, 100 GB disk\)/);
    assert.match(ultra.limits, /one cloud agent \(8 GB RAM, 100 GB disk\)/);
    const note = facts.plans!.note!;
    for (const re of [
      /large models have their own monthly limit/,
      /API keys always use pay-as-you-go credits, not included usage/,
      /Bigger cloud-agent sizes and extra agents use credits/,
      /Credit top-ups from \$10 to \$200, or a custom amount/,
      /Tool Gateway \(web search, scraping, image generation, browser use, speech\) is priced per use from credits/,
      /300\+ models are priced per 1M tokens/,
      /Cloud hosting provider and region: not stated/,
    ]) {
      assert.match(note, re);
    }
    assert.match(facts.freeTier!.value.summary, /eligible ChatGPT account.*without a paid Nous subscription; tools and Hermes Cloud hosting are charged separately/);
  });

  it("never mentions the bonus or rollover caps, and never links Portal's /pricing (a 404)", () => {
    const facts = getToolFacts(HERMES_SLUG)!;
    const texts = [
      JSON.stringify(HERMES_ROW),
      JSON.stringify(facts),
      JSON.stringify(getStaticTutorialForPlatform(HERMES_SLUG)),
      JSON.stringify(HERMES_SOURCES),
    ];
    for (const text of texts) {
      assert.doesNotMatch(text, /bonus|rollover|roll over|10\s?%|\$22|\$110|\$220/i);
      assert.doesNotMatch(text, /portal\.nousresearch\.com\/pricing/);
      // The only credit amount stated is the Free plan's "$0 monthly credits".
      assert.doesNotMatch(text.replace(/\$0 monthly credits/g, ""), /\d+(\.\d+)?\s*(monthly )?credits/i);
    }
  });

  it("states the privacy facts and the not-stated items", () => {
    assert.match(HERMES_ROW.description, /Privacy Mode/);
    assert.match(HERMES_ROW.description, /stay on your machine/);
    assert.equal(HERMES_ROW.privacyLevel, "MEDIUM");
    const facts = getToolFacts(HERMES_SLUG)!;
    assert.equal(facts.privacy!.value.retention, "Not stated");
    assert.match(facts.platforms!.note!, /region or host: not stated/);
    assert.ok(facts.features!.value.some((f) => /API: not stated/.test(f)));
    assert.match(facts.plans!.note!, /Annual pricing: not stated\. Free trial: not stated\./);
  });

  it("has a registered guide reviewed today", () => {
    const guide = getStaticTutorialForPlatform(HERMES_SLUG)!;
    assert.equal(guide.lastReviewedAt, CHECKED_AT);
    assert.equal(guide.disclosure, undefined);
  });
});

describe("catalog audit 16: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-16.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, creates only hermes-agent, never updates or deletes", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.equal(source.match(/\.create\(/g)?.length, 1);
    assert.match(source, /if \(!dryRun\) await prisma\.platform\.create\(\{ data \}\)/);
    assert.doesNotMatch(source, /\.(update|updateMany|createMany|delete|deleteMany|upsert)\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /`audit16: \$\{created\} created/);
    assert.match(source, /cache:revalidate/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-16"], "tsx scripts/update-catalog-audit-16.ts");
  });

  it("shares audit 15's prod guard byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-16.ts");
    assert.ok(guard.length > 0);
    assert.equal(guard, guardSection("scripts/update-catalog-audit-15.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-13.ts"));
  });
});
