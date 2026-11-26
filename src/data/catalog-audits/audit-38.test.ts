import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { AUDIT_38_SKIPPED, CHECKED_AT } from "@/data/catalog-audits/audit-38";
import { DEALS } from "@/data/deals";
import { getToolFacts } from "@/data/facts";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";
import { guardCatalogSql } from "@/lib/guarded-sql/statement-guard";

const sql = readFileSync("scripts/sql/catalog-xwatch-20261126.sql", "utf8");
const statements = splitSql(sql);

describe("catalog audit 38 guarded SQL", () => {
  it("is four platform updates and nothing else", () => {
    assert.equal(statements.length, 4);
    assert.deepEqual(findTransactionControl(statements), []);
    const guarded = guardCatalogSql(sql);
    assert.equal(guarded.ok, true);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|INSERT)\b/i);
    assert.doesNotMatch(sql, /\bhedra\b/i);
    assert.doesNotMatch(sql, /cohere|merger/i);
    const slugs = [...sql.matchAll(/slug = \$xw\$(.*?)\$xw\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, ["windsurf", "aleph-alpha-luminous", "openai-api", "manus"]);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
  });

  it("guards each note so a second run matches nothing", () => {
    for (const statement of statements) {
      const marker = /NOT LIKE \$xw\$%(.*?)%\$xw\$/.exec(statement);
      assert.ok(marker, statement.slice(0, 120));
      const setPart = statement.split(/\bWHERE\b/i)[0] ?? "";
      assert.equal(setPart.includes(marker[1]), true, marker[1]);
    }
  });
});

describe("catalog audit 38 fact overlays", () => {
  it("records SWE-2.1 on the Devin Desktop row and does not invent a price", () => {
    const features = getToolFacts("windsurf")!.features!;
    assert.equal(features.checkedAt, CHECKED_AT);
    assert.equal(features.sourceUrl, "https://cognition.com/blog/swe-2-1");
    const text = features.value.join(" ");
    assert.match(text, /pure reinforcement learning on Kimi K3/);
    assert.match(text, /Cerebras partnership at 10 times the speed/);
    assert.match(text, /does not list a price/);
    assert.equal(getToolFacts("windsurf")!.plans!.checkedAt, "2026-11-20");
    assert.equal(getToolFacts("swe-2-1"), undefined);
  });

  it("records Kolibri 1.1 on the Aleph Alpha row without a new slug", () => {
    const features = getToolFacts("aleph-alpha-luminous")!.features!;
    assert.equal(features.checkedAt, CHECKED_AT);
    const text = features.value.join(" ");
    assert.match(text, /Apache 2\.0/);
    assert.match(text, /75 billion total parameters and 3 billion active/);
    assert.doesNotMatch(text, /cohere|merger/i);
    assert.equal(getToolFacts("kolibri-1-1"), undefined);
  });

  it("records healthcare configurations on the OpenAI API row", () => {
    const api = getToolFacts("openai-api")!.apiPricing!;
    assert.equal(api.checkedAt, "2026-11-20");
    assert.equal(api.sourceUrl, "https://openai.com/index/decisions-api");
    assert.match(api.value, /\$0\.05 per active minute/);
    assert.match(api.value, /\$8\.00 input, \$40\.00 output, and \$0\.40 cached input for gpt-6\.2-astra-healthcare/);
    assert.match(api.value, /\$2\.00 input, \$10\.00 output, and \$0\.10 cached input for gpt-6\.2-sol-healthcare/);
    assert.match(api.value, /\$16\.00 input, \$80\.00 output, and \$0\.80 cached input/);
    assert.match(api.value, /at least through December 31, 2026/);
    assert.match(api.value, /does not say these Standard or Fast rates end on that date/);
    const features = getToolFacts("openai-api")!.features!.value.join(" ");
    assert.match(features, /available to API organizations/);
    assert.match(features, /does not name gpt-6\.2-sol-healthcare/);
    assert.doesNotMatch(features, /all API orgs/i);
  });

  it("keeps the Manus discount off the regular plan prices and on the deals list", () => {
    const plans = getToolFacts("manus")!.plans!;
    assert.equal(plans.checkedAt, "2026-11-20");
    assert.equal(plans.value.find((plan) => plan.name === "Pro")?.price, "From $20");
    const offer = DEALS.find((row) => row.platformSlug === "manus" && row.offerType === "discount");
    assert.ok(offer);
    assert.equal(offer.expiresAt, "2026-11-30");
    assert.equal(JSON.stringify(getToolFacts("manus")).includes(offer.details), true);
  });

  it("lists Sand AI and Decart as confirmed and not written", () => {
    assert.equal(AUDIT_38_SKIPPED.length, 2);
    assert.equal(getToolFacts("sand-ai"), undefined);
    assert.equal(getToolFacts("decart"), undefined);
    const items = AUDIT_38_SKIPPED.map((row) => row.item).join(" ");
    assert.match(items, /MAGI-2/);
    assert.match(items, /Decart/);
    assert.doesNotMatch(sql, /\$xw\$(sand-ai|magi-2|decart)\$xw\$/i);
    const magi = AUDIT_38_SKIPPED[0];
    const decart = AUDIT_38_SKIPPED[1];
    assert.ok(magi);
    assert.ok(decart);
    assert.match(magi.reason, /0\.08 USD per second/);
    assert.match(magi.reason, /open-source releases will follow/);
    assert.match(decart.reason, /customary closing conditions/);
    assert.match(decart.reason, /does not say a Decart product is discontinued/);
  });
});
