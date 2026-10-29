import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import klapFacts from "@/data/facts/klap";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { KLAP_ROW } from "./audit-13";
import {
  AUDIT_14_CATEGORY_SLUGS,
  CATEGORY_FROM,
  CATEGORY_TO,
  KLAP_DESCRIPTION,
  KLAP_PRIVACY_POLICY,
  diffAudit14Category,
  diffAudit14KlapDescription,
} from "./audit-14";

const ROOT = process.cwd();
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");

/** The prod-guard section every audit script shares, from getDirectUrl up to the Prisma client. */
const guardSection = (file: string) => {
  const text = read(file);
  return text.slice(text.indexOf("function getDirectUrl"), text.indexOf("  const prisma = new PrismaClient"));
};

describe("catalog audit 14: category move", () => {
  it("moves klap and opus-clip from Gaming & Creative AI to Video Creation & Editing", () => {
    assert.deepEqual([...AUDIT_14_CATEGORY_SLUGS], ["klap", "opus-clip"]);
    assert.equal(CATEGORY_FROM, "gaming-creative-ai");
    assert.equal(CATEGORY_TO, "video-creation-editing");
  });

  it("uses category slugs that exist in the category list", () => {
    const categories = read("scripts/restructure-categories-2026-05.ts");
    assert.match(categories, /slug: "gaming-creative-ai"/);
    assert.match(categories, /slug: "video-creation-editing"/);
  });

  it("starts from where the snapshot has opus-clip today", () => {
    const opus = snapshotRows().find((r) => r.slug === "opus-clip")!;
    assert.equal((opus as { category?: { slug: string } }).category?.slug, CATEGORY_FROM);
  });

  it("moves only rows still in the old category, so a re-run changes nothing", () => {
    assert.equal(diffAudit14Category(CATEGORY_FROM), "move");
    assert.equal(diffAudit14Category(CATEGORY_TO), "already");
    assert.equal(diffAudit14Category("writing-content"), "differs");
    assert.equal(diffAudit14Category(null), "differs");
  });
});

describe("catalog audit 14: Klap privacy reason", () => {
  it("adds OpenRouter beside OpenAI and changes nothing else", () => {
    assert.equal(KLAP_DESCRIPTION.from, KLAP_ROW.description);
    assert.notEqual(KLAP_DESCRIPTION.to, KLAP_DESCRIPTION.from);
    assert.equal(KLAP_DESCRIPTION.to.replace("OpenRouter and ", ""), KLAP_DESCRIPTION.from);
    assert.match(KLAP_DESCRIPTION.to, /including OpenRouter and OpenAI, to find and score clips\.$/);
    assert.deepEqual([...KLAP_DESCRIPTION.sources], [KLAP_PRIVACY_POLICY]);
  });

  it("writes only over audit 13's text and is idempotent", () => {
    assert.equal(diffAudit14KlapDescription({ description: KLAP_DESCRIPTION.from }), KLAP_DESCRIPTION.to);
    assert.equal(diffAudit14KlapDescription({ description: KLAP_DESCRIPTION.to }), null);
    assert.equal(diffAudit14KlapDescription({ description: "Edited by hand." }), null);
    assert.equal(diffAudit14KlapDescription({ description: null }), null);
  });

  it("keeps the privacy level at MEDIUM and records the reason in the fact file", () => {
    assert.equal(KLAP_ROW.privacyLevel, "MEDIUM");
    const privacy = klapFacts.privacy!;
    assert.equal(privacy.sourceUrl, KLAP_PRIVACY_POLICY);
    assert.equal(privacy.value.policyUrl, KLAP_PRIVACY_POLICY);
    assert.match(privacy.note ?? "", /^Rated Medium because/);
    assert.match(privacy.note ?? "", /OpenRouter, the model providers it routes to, and OpenAI receive your transcripts/);
  });

  it("never writes affiliate or tracking text", () => {
    assert.doesNotMatch(JSON.stringify(KLAP_DESCRIPTION), /via=|zach-stevenson|affiliate|referral|utm_|% off/i);
  });
});

describe("catalog audit 14: operator script", () => {
  const script = read("scripts/update-catalog-audit-14.ts");

  it("shares audit 11 and 13's prod guard byte for byte", () => {
    const guard = guardSection("scripts/update-catalog-audit-14.ts");
    assert.ok(guard.length > 0);
    assert.equal(guard, guardSection("scripts/update-catalog-audit-13.ts"));
    assert.equal(guard, guardSection("scripts/update-catalog-audit-11.ts"));
  });

  it("is a dry run unless --apply, and documents the production override", () => {
    assert.match(script, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\);/);
    assert.match(script, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(script, /CONFIRM_PROD_HOST='ep-odd-mud-ajdk8f99'/);
    assert.match(script, /--confirm-production --apply/);
    assert.match(script, /OPERATOR ONLY/);
  });

  it("never deletes or creates rows", () => {
    assert.doesNotMatch(script, /\.(delete|deleteMany|create|createMany|upsert)\(/);
  });

  it("is wired to an npm script", () => {
    assert.match(read("package.json"), /"db:update-catalog-audit-14": "tsx scripts\/update-catalog-audit-14\.ts"/);
  });
});
