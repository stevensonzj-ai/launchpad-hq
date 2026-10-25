import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { parsePricingProse, startingPriceLabel } from "@/lib/platform-display";
import {
  AUDIT_4_PATCHES,
  CHECKED_AT,
  audit4UpdateData,
  diffAudit4Patch,
  type Audit4Patch,
  type Audit4Row,
} from "./audit-4";

function patchFor(slug: string): Audit4Patch {
  const patch = AUDIT_4_PATCHES.find((p) => p.slug === slug);
  assert.ok(patch, slug);
  return patch;
}

const EMPTY_ROW: Audit4Row = {
  primaryUse: null,
  description: null,
  currentPricing: null,
  freeTierFeatures: null,
  outputFormats: [],
  verified: false,
};

/** The row as it looks after a patch has been applied. */
function applied(row: Audit4Row, patch: Audit4Patch): Audit4Row {
  return { ...row, ...audit4UpdateData(diffAudit4Patch(row, patch)) };
}

describe("catalog audit 4 patches", () => {
  it("carries official https sources and today's check date on every patch", () => {
    const slugs = new Set<string>();
    for (const patch of AUDIT_4_PATCHES) {
      assert.equal(slugs.has(patch.slug), false, `duplicate ${patch.slug}`);
      slugs.add(patch.slug);
      assert.equal(patch.checkedAt, CHECKED_AT, patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      for (const url of patch.sources) assert.match(url, /^https:\/\//, patch.slug);
      assert.ok(Object.keys(patch.fields).length > 0, patch.slug);
    }
  });

  it("only marks a row verified when its text has nothing unverified (the seed rule)", () => {
    for (const patch of AUDIT_4_PATCHES) {
      if (patch.fields.verified !== true) continue;
      const blob = [patch.fields.description, patch.fields.currentPricing, patch.fields.freeTierFeatures].join("\n");
      assert.doesNotMatch(blob, /\bunverified\b/i, patch.slug);
    }
  });

  it("describes discontinued tools as discontinued, with no live price or free tier", () => {
    for (const slug of ["play-ht", "sora-2"]) {
      assert.equal(getToolFacts(slug)?.lifecycle, "discontinued", slug);
      const { fields } = patchFor(slug);
      assert.match(fields.primaryUse ?? "", /^Discontinued: former /, slug);
      assert.match(fields.currentPricing ?? "", /^Discontinued, no longer sold\./, slug);
      assert.match(fields.freeTierFeatures ?? "", /^None: /, slug);
      assert.doesNotMatch(fields.currentPricing ?? "", /\$\d/, slug);
      // The dated status notice already shows on the page; the description
      // (rendered as the verdict) says what it was, without repeating dates.
      assert.doesNotMatch(fields.description ?? "", /\b20\d\d\b/, slug);
      assert.match(fields.description ?? "", / was /, slug);
    }
  });

  it("keeps the Sora dates in step with the fact file", () => {
    const headline = getToolFacts("sora-2")?.status?.value.headline ?? "";
    for (const date of ["April 26, 2026", "September 24, 2026"]) {
      assert.ok(headline.includes(date), date);
      assert.ok(patchFor("sora-2").fields.currentPricing?.includes(date), date);
    }
  });

  it("matches Grok's prices to the fact file and drops the old SuperGrok sales wording", () => {
    const pricing = patchFor("grok").fields.currentPricing ?? "";
    for (const plan of getToolFacts("grok")?.plans?.value ?? []) {
      assert.ok(pricing.includes(`${plan.name} ${plan.price}`), plan.name);
    }
    assert.doesNotMatch(pricing, /sold through SuperGrok/);
    assert.match(pricing, /Since October 12, 2026, new customers sign up through The X Subscription/);
    assert.match(pricing, /Existing SuperGrok plans continue/);
  });

  it("states OpenEvidence's own HIPAA and BAA position and keeps its audience limits", () => {
    const text = patchFor("openevidence").fields.description ?? "";
    assert.match(text, /free for verified US healthcare professionals/);
    assert.match(text, /not for patients or self-diagnosis/);
    assert.match(text, /in compliance with HIPAA/);
    assert.match(text, /standard Business Associate Agreement/);
    assert.doesNotMatch(text, /not (?:HIPAA|covered)|aren't (?:HIPAA|covered)|BAA[^.]*unverified/i);
    // Discover cards show freeTierFeatures alone, so it must say who the free tier is for.
    assert.match(patchFor("openevidence").fields.freeTierFeatures ?? "", /^Free for verified US healthcare professionals/);
  });

  it("describes Stability AI's current products without API video or Stable Assistant as live", () => {
    const { fields } = patchFor("stability-ai");
    assert.match(fields.description ?? "", /no video/);
    assert.match(fields.description ?? "", /Stable Assistant, is no longer on Stability's site/);
    assert.match(fields.currentPricing ?? "", /US\$0\.01 per credit/);
    assert.match(fields.freeTierFeatures ?? "", /25 free credits/);
    assert.equal(fields.outputFormats?.includes("video"), false);
  });

  it("writes pricing prose the pricing table can parse into named plans", () => {
    for (const patch of AUDIT_4_PATCHES) {
      if (!patch.fields.currentPricing || patch.slug === "grok") continue; // Grok's table comes from facts
      if (getToolFacts(patch.slug)?.lifecycle === "discontinued") continue; // retired pages hide pricing
      for (const plan of parsePricingProse(patch.fields.currentPricing)) {
        assert.ok(plan.name.length > 0 && plan.name.length < 48, `${patch.slug}: ${plan.name}`);
        assert.ok(plan.price.length > 0, `${patch.slug}: ${plan.name}`);
      }
    }
    const stability = parsePricingProse(patchFor("stability-ai").fields.currentPricing ?? "");
    assert.equal(startingPriceLabel(stability), "Free, from US$0.01 per credit, pay as you go");
  });
});

describe("diffAudit4Patch", () => {
  it("lists every patched field on an empty row", () => {
    const patch = patchFor("stability-ai");
    const fields = diffAudit4Patch(EMPTY_ROW, patch).map((d) => d.field).sort();
    assert.deepEqual(fields, Object.keys(patch.fields).sort());
  });

  it("is a no-op once applied, so re-runs change nothing", () => {
    for (const patch of AUDIT_4_PATCHES) {
      const after = applied(EMPTY_ROW, patch);
      assert.deepEqual(diffAudit4Patch(after, patch), [], patch.slug);
    }
  });

  it("compares outputFormats by value and leaves unlisted fields alone", () => {
    const patch = patchFor("stability-ai");
    const row: Audit4Row = { ...applied(EMPTY_ROW, patch), outputFormats: ["images", "audio", "3D models"] };
    assert.deepEqual(diffAudit4Patch(row, patch), []);
    const reordered: Audit4Row = { ...row, outputFormats: ["audio", "images", "3D models"] };
    assert.deepEqual(
      diffAudit4Patch(reordered, patch).map((d) => d.field),
      ["outputFormats"],
    );
    const grokRow: Audit4Row = { ...EMPTY_ROW, description: "kept", primaryUse: "kept" };
    const data = audit4UpdateData(diffAudit4Patch(grokRow, patchFor("grok")));
    assert.deepEqual(Object.keys(data).sort(), ["currentPricing", "freeTierFeatures"]);
  });
});

describe("seed files agree with audit 4", () => {
  const SEEDS: Record<string, string> = {
    "grok-bot": "scripts/seed-batch3-platforms.ts",
    "play-ht": "scripts/seed-missing-platforms.ts",
    "stability-ai": "scripts/seed-phase1-batch1-platforms.ts",
    openevidence: "scripts/seed-batch2-platforms.ts",
  };

  it("carries the same text, so a fresh seed matches the database", () => {
    for (const [slug, file] of Object.entries(SEEDS)) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      const { fields } = patchFor(slug);
      for (const [field, value] of Object.entries(fields)) {
        if (field === "verified") continue; // seeds derive it from the text
        const literal = Array.isArray(value)
          ? `[${value.map((v) => JSON.stringify(v)).join(", ")}]`
          : JSON.stringify(value);
        assert.ok(source.includes(literal), `${file} is missing ${slug}.${field}`);
      }
    }
  });

  it("has no seed for the rows audit 4 patches without one", () => {
    for (const slug of AUDIT_4_PATCHES.map((p) => p.slug)) {
      if (slug in SEEDS) continue;
      for (const file of Object.values(SEEDS)) {
        const source = readFileSync(join(process.cwd(), file), "utf8");
        assert.ok(!source.includes(`slug: "${slug}"`), `${slug} is seeded in ${file}; add it to SEEDS`);
      }
    }
  });
});
