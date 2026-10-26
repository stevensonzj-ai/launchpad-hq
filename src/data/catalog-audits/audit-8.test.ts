import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import {
  AUDIT_8_CREATES,
  AUDIT_8_PATCHES,
  CHECKED_AT,
  COST_TIERS,
  DIFFICULTIES,
  PRIVACY_LEVELS,
  audit8CreateData,
  audit8UpdateData,
  diffAudit8,
  planCreate,
  type Audit8Row,
} from "./audit-8";

const schema = () => readFileSync(join(process.cwd(), "prisma/schema.prisma"), "utf8");
const enumValues = (name: string) =>
  (new RegExp(`enum ${name} \\{([^}]*)\\}`).exec(schema())?.[1] ?? "").split(/\s+/).filter(Boolean);

const kimi = () => {
  const patch = AUDIT_8_PATCHES.find((p) => p.slug === "kimi");
  assert.ok(patch);
  return patch;
};
const minimax = () => {
  const create = AUDIT_8_CREATES.find((c) => c.row.slug === "minimax");
  assert.ok(create);
  return create;
};

const seededKimi: Audit8Row = {
  description: "Moonshot AI's Kimi assistant (Kimi K3 current as of 2026-10-13). China-based company.",
  currentPricing: "Plus $19/mo ($180/yr); Pro $39/mo; Max $99/mo; Ultra $199/mo; free-tier limits unverified",
  freeTierFeatures: "Free tier exists; exact limits unverified as of 2026-10-13",
  apiAvailable: false,
};

describe("catalog audit 8 data", () => {
  it("dates and sources every change, using real enum values and a live category", () => {
    assert.equal(CHECKED_AT, "2026-10-26");
    assert.deepEqual(enumValues("CostTier"), [...COST_TIERS]);
    assert.deepEqual(enumValues("Difficulty"), [...DIFFICULTIES]);
    assert.deepEqual(enumValues("PrivacyLevel"), [...PRIVACY_LEVELS]);
    const categories = readFileSync(join(process.cwd(), "scripts/restructure-categories-2026-05.ts"), "utf8");
    for (const change of [...AUDIT_8_CREATES, ...AUDIT_8_PATCHES]) {
      assert.equal(change.checkedAt, CHECKED_AT);
      assert.ok(change.sources.length > 0);
      for (const url of change.sources) assert.match(url, /^https:\/\//);
    }
    for (const create of AUDIT_8_CREATES) {
      assert.ok(categories.includes(`slug: "${create.categorySlug}"`), create.categorySlug);
    }
  });

  it("the new MiniMax row has every field the seed scripts set, and a fact file", () => {
    const { row } = minimax();
    for (const key of ["name", "company", "website", "primaryUse", "primaryUseCases", "description", "currentPricing", "freeTierFeatures"] as const) {
      assert.ok(row[key].trim(), key);
    }
    assert.ok(row.platformType.length && row.idealUserTypes.length && row.contentTypes.length && row.outputFormats.length);
    assert.match(row.website, /^https:\/\//);
    assert.doesNotMatch(JSON.stringify(row).replace(/rather than open source/g, ""), /open[- ]source|unverified/i);
    assert.match(row.description, /open weights under the MiniMax Community License/);
    // No postal address or email in catalog copy.
    assert.doesNotMatch(JSON.stringify(row), /@|Beach Road|#\d/);
    assert.equal(getToolFacts("minimax")?.slug, "minimax");
    assert.match(getToolFacts("minimax")?.apiPricing?.value ?? "", /\$0\.15 input, \$0\.60 output/);
    assert.match(row.currentPricing, /\$0\.15\/\$0\.60/);

    const data = audit8CreateData(minimax(), "cat-id");
    assert.equal(data.categoryId, "cat-id");
    assert.equal(data.slug, "minimax");
    assert.equal(data.featured, false);
    assert.deepEqual(
      [data.directAlternatives, data.complementaryTools, data.budgetAlternativeTo, data.privacyAlternativeTo],
      [[], [], [], []],
    );
  });

  it("the kimi row text matches its fact file's plans", () => {
    const plans = getToolFacts("kimi")?.plans?.value ?? [];
    for (const plan of plans.filter((p) => p.price !== "$0")) {
      assert.ok(kimi().fields.currentPricing?.includes(`${plan.name} ${plan.price}/mo`), plan.name);
    }
    assert.ok(kimi().sources.includes(getToolFacts("kimi")?.plans?.sourceUrl ?? ""));
  });
});

describe("catalog audit 8 diff logic", () => {
  it("creates only a missing row", () => {
    assert.equal(planCreate(false), "create");
    assert.equal(planCreate(true), "done");
  });

  it("patches the seeded kimi row, then is a no-op on re-run", () => {
    const diffs = diffAudit8(seededKimi, kimi());
    assert.deepEqual(diffs.map((d) => d.field), ["description", "currentPricing", "freeTierFeatures", "apiAvailable"]);
    const after = { ...seededKimi, ...audit8UpdateData(diffs) };
    assert.equal(after.apiAvailable, true);
    assert.deepEqual(diffAudit8(after, kimi()), []);
  });

  it("leaves apiAvailable alone unless it is still the old value", () => {
    const row = { ...seededKimi, ...audit8UpdateData(diffAudit8(seededKimi, kimi())) };
    assert.deepEqual(diffAudit8({ ...row, apiAvailable: true }, kimi()), []);
  });

  it("the runner defaults to dry-run, uses the prod guard, never deletes and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-8.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /if \(dryRun\) continue;\s*await prisma\.platform\.create/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*\.(to|description|currentPricing|freeTierFeatures)\b/);
    assert.doesNotMatch(source, /\.(createMany|delete|deleteMany|upsert)\(/);
  });
});
