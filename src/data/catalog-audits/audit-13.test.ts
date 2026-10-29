import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { AFFILIATE_LINKS } from "@/data/affiliates";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  AUDIT_13_DESCRIPTIONS,
  CHECKED_AT,
  KLAP_ROW,
  KLAP_SOURCES,
  OPUS_CLIP_FIELDS,
  OPUS_CLIP_SOURCES,
  audit13DescriptionSlugs,
  diffAudit13Description,
  diffAudit13Opus,
  filledDescription,
  heldAudit12Notes,
  klapCreateData,
  type Audit13OpusRow,
} from "./audit-13";
import { AUDIT_12_PATCHES, audit12Slugs, audit12UpdateData, diffAudit12Row, type Audit12Row } from "./audit-12";
import { diffAudit10Row } from "./audit-10";
import { diffAudit11Row } from "./audit-11";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug)!;
const SLUGS = ["gemini", "chatgpt", "openai-api", "github-copilot", "runway", "suno", "notion-ai", "mistral-vibe"];

/** Row with audit 12 applied (as in production), then audit 13's description fill. */
function afterAudits(slug: string, opts: { audit12First: boolean }) {
  const row = { ...snap(slug) } as Record<string, unknown>;
  if (opts.audit12First) Object.assign(row, audit12UpdateData(diffAudit12Row(slug, row as Audit12Row)));
  const description = diffAudit13Description(slug, row as { description: string | null });
  if (description !== null) row.description = description;
  return row;
}

describe("catalog audit 13: descriptions", () => {
  it("covers exactly the eight empty-description rows, each sourced from an https vendor page", () => {
    assert.deepEqual(audit13DescriptionSlugs(), SLUGS);
    for (const d of AUDIT_13_DESCRIPTIONS) {
      assert.ok(d.sources.length > 0, d.slug);
      for (const url of d.sources) assert.match(url, /^https:\/\//, d.slug);
      assert.equal(snap(d.slug).description, null, `${d.slug} is empty in the snapshot`);
    }
  });

  it("reads like a beginner description: 1-3 sentences, no prices, no \"official\", no tracking links", () => {
    for (const { slug, text } of AUDIT_13_DESCRIPTIONS) {
      assert.ok(text.length >= 150 && text.length <= 420, `${slug}: ${text.length} chars`);
      assert.doesNotMatch(text, /[$€£]|\d+\s*(credits|songs|messages)|\?/, slug);
      assert.equal(claimsOfficial(text), false, slug);
      assert.doesNotMatch(text, /sponsor|affiliate|referral|utm_|via=/i, slug);
    }
  });

  it("fills only empty or whitespace descriptions and never overwrites one", () => {
    for (const description of [null, "", "  \n\t "]) {
      assert.equal(diffAudit13Description("gemini", { description }), filledDescription("gemini"));
    }
    assert.equal(diffAudit13Description("gemini", { description: "Hand-written." }), null);
    assert.equal(diffAudit13Description("not-in-audit-13", { description: null }), null);
  });

  it("appends audit 12's held description notes verbatim after the new text", () => {
    for (const slug of SLUGS) {
      const filled = filledDescription(slug)!;
      const base = AUDIT_13_DESCRIPTIONS.find((d) => d.slug === slug)!.text;
      assert.ok(filled.startsWith(base), slug);
      const notes = heldAudit12Notes(slug);
      assert.equal(notes.length, 1, slug);
      const original = AUDIT_12_PATCHES.find((p) => p.slug === slug)!.appends.find((a) => a.field === "description")!;
      assert.equal(filled, `${base} ${original.note}`, slug);
    }
  });

  it("snapshot with empty descriptions: 8 fills (with notes); a re-run is 0", () => {
    const changed = SLUGS.filter((slug) => diffAudit13Description(slug, snap(slug)) !== null);
    assert.deepEqual(changed, SLUGS);
    for (const slug of SLUGS) {
      assert.equal(diffAudit13Description(slug, afterAudits(slug, { audit12First: true }) as never), null, slug);
    }
  });

  it("an audit 12 re-run after audit 13 reports 0", () => {
    for (const slug of audit12Slugs()) {
      assert.deepEqual(diffAudit12Row(slug, afterAudits(slug, { audit12First: true }) as Audit12Row), [], slug);
    }
    // Even if audit 12 had never run, it would find nothing left to add to these descriptions.
    for (const slug of SLUGS) {
      const diffs = diffAudit12Row(slug, afterAudits(slug, { audit12First: false }) as Audit12Row);
      assert.equal(diffs.some((d) => d.field === "description"), false, slug);
    }
  });

  it("audit 10 and 11 re-runs leave the new descriptions alone", () => {
    for (const slug of SLUGS) {
      const row = afterAudits(slug, { audit12First: true });
      assert.equal(diffAudit10Row(slug, row as never).some((d) => d.field === "description"), false, slug);
      assert.equal(diffAudit11Row(slug, row as never).some((d) => d.field === "description"), false, slug);
    }
  });
});

describe("catalog audit 13: Klap row (create only)", () => {
  it("is not in the snapshot yet, so the dry run reports 1 create", () => {
    assert.equal(snapshotRows().some((r) => r.slug === "klap"), false);
    assert.ok(klapCreateData(false, "cat-id"));
    assert.equal(klapCreateData(true, "cat-id"), null);
    assert.equal(klapCreateData(false, null), null);
  });

  it("copies opus-clip's category and points at klap.app, never the affiliate link", () => {
    const data = klapCreateData(false, "opus-category")!;
    assert.equal(data.categoryId, "opus-category");
    assert.equal(data.website, "https://klap.app");
    const json = JSON.stringify(data);
    assert.doesNotMatch(json, /via=|zach-stevenson|NOTGFXEG|affiliate|referral|utm_/i);
    assert.equal(json.includes(AFFILIATE_LINKS.klap.href), false);
  });

  it("has the same fields as an existing row, and dated facts without \"official\"", () => {
    const opusKeys = Object.keys(snap("opus-clip")).filter((k) => !["updatedAt", "category", "iosAppUrl", "androidAppUrl"].includes(k));
    for (const key of opusKeys) assert.ok(key in KLAP_ROW, key);
    for (const key of ["currentPricing", "freeTierFeatures", "usageLimits", "description"] as const) {
      assert.match(KLAP_ROW[key], /as of 2026-10-29/, key);
      assert.equal(claimsOfficial(KLAP_ROW[key]), false, key);
    }
    assert.doesNotMatch(KLAP_ROW.description, /watermark|branding on Basic/i);
    for (const url of KLAP_SOURCES) assert.match(url, /^https:\/\/klap\.app\//);
  });

  it("prices and clip caps match the CTO fact pack", () => {
    const prices = KLAP_ROW.currentPricing.match(/\$\d+(,\d{3})*(\.\d+)?/g);
    assert.deepEqual(prices, ["$29", "$14", "$79", "$39", "$189", "$94"]);
    assert.match(KLAP_ROW.usageLimits, /100 clips\/mo; Pro 300 clips\/mo; Pro\+ 1,000 clips\/mo/);
  });
});

describe("catalog audit 13: Opus Clip pricing text", () => {
  const opusRow = (): Audit13OpusRow => {
    const r = snap("opus-clip");
    return { currentPricing: r.currentPricing, freeTierFeatures: r.freeTierFeatures, usageLimits: r.usageLimits, upgradeTriggers: r.upgradeTriggers };
  };

  it("expects the snapshot's current text as `from` and changes all four fields", () => {
    const { diffs, skipped } = diffAudit13Opus(opusRow());
    assert.deepEqual(diffs.map((d) => d.field), ["currentPricing", "freeTierFeatures", "usageLimits", "upgradeTriggers"]);
    assert.deepEqual(skipped, []);
  });

  it("is 0 on a re-run, and leaves a hand edit alone", () => {
    const after = { ...opusRow(), ...Object.fromEntries(diffAudit13Opus(opusRow()).diffs.map((d) => [d.field, d.to])) };
    assert.deepEqual(diffAudit13Opus(after), { diffs: [], skipped: [] });
    const edited = { ...opusRow(), usageLimits: "Hand edit" };
    assert.deepEqual(diffAudit13Opus(edited).skipped, ["usageLimits"]);
  });

  it("matches opus.pro facts (fact pack), dated, no \"official\"", () => {
    assert.match(OPUS_CLIP_FIELDS.currentPricing.to, /Pro \$29\/mo or \$14\.50\/mo billed yearly \(300 credits\/mo\)/);
    assert.match(OPUS_CLIP_FIELDS.freeTierFeatures.to, /watermark; no editing; clips stop being exportable after 3 days/);
    assert.match(OPUS_CLIP_FIELDS.usageLimits.to, /roll over for 2 months/);
    for (const { to } of Object.values(OPUS_CLIP_FIELDS)) assert.equal(claimsOfficial(to), false);
    assert.deepEqual(OPUS_CLIP_SOURCES, ["https://www.opus.pro/pricing"]);
  });

  it("known interaction: an audit 10 re-run would revert the three pricing fields (do not re-run audit 10)", () => {
    const after = { ...snap("opus-clip"), ...Object.fromEntries(diffAudit13Opus(opusRow()).diffs.map((d) => [d.field, d.to])) };
    assert.deepEqual(diffAudit10Row("opus-clip", after as never).map((d) => d.field).sort(), ["currentPricing", "freeTierFeatures", "usageLimits"]);
    assert.deepEqual(diffAudit11Row("opus-clip", after as never), []);
  });
});

describe("catalog audit 13: runner", () => {
  const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-13.ts"), "utf8");

  it("defaults to dry-run, uses the prod guard, creates only klap, deletes nothing, prints no values", () => {
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.match(source, /if \(dryRun\) continue;/);
    assert.match(source, /updatedAt: existing\.updatedAt/);
    assert.equal(source.match(/\.create\(/g)?.length, 1);
    assert.match(source, /if \(!dryRun\) await prisma\.platform\.create\(\{ data \}\)/);
    assert.doesNotMatch(source, /\.(createMany|delete|deleteMany|upsert)\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*(\.to\b|description\)|currentPricing\))/);
    assert.match(source, /`audit13: \$\{rows\} rows \/ \$\{fieldChanges\} field changes \/ \$\{created\} created/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-13"], "tsx scripts/update-catalog-audit-13.ts");
  });

  it("the prod-guard block is byte-identical to audits 11 and 12", () => {
    const read = (n: number) => readFileSync(join(process.cwd(), `scripts/update-catalog-audit-${n}.ts`), "utf8");
    const guard = (s: string) => s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
    assert.equal(guard(read(13)), guard(read(12)));
    assert.equal(guard(read(13)), guard(read(11)));
  });

  it("checked date is 2026-10-29", () => {
    assert.equal(CHECKED_AT, "2026-10-29");
  });
});
