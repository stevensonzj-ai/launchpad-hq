import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";
import { guardCatalogSql } from "@/lib/guarded-sql/statement-guard";

const FILE = "scripts/sql/catalog-magi2-20261126.sql";
const sql = readFileSync(FILE, "utf8");
const statements = splitSql(sql);

describe("MAGI-2 guarded SQL", () => {
  it("is one insert and a no-op when the slug or the category is missing", () => {
    assert.equal(statements.length, 1);
    assert.deepEqual(findTransactionControl(statements), []);
    const guarded = guardCatalogSql(sql);
    assert.equal(guarded.ok, true);
    const statement = statements[0] ?? "";
    assert.match(statement, /^INSERT INTO platforms \(/);
    assert.match(statement, /WHERE NOT EXISTS \(SELECT 1 FROM platforms WHERE slug = \$xw\$magi-2\$xw\$\)/);
    assert.match(
      statement,
      /AND EXISTS \(SELECT 1 FROM categories WHERE id = \$xw\$cmnxhffxh000n88svxrjl7o5e\$xw\$ AND slug = \$xw\$video-creation-editing\$xw\$\)/,
    );
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|UPDATE)\b/i);
    assert.doesNotMatch(sql, /\bhedra\b/i);
    assert.doesNotMatch(sql, /\bdecart\b/i);
    assert.match(sql, /0\.08 USD per second/);
    assert.match(sql, /open-source releases will follow/);
    assert.match(sql, /top-up is not supported for the time being/);
    assert.match(sql, /describes opening Top up/);
  });
});

describe("MAGI-2 fact file", () => {
  const facts = getToolFacts("magi-2");

  it("records the confirmed launch facts and leaves Decart out", () => {
    assert.ok(facts);
    assert.equal(facts.slug, "magi-2");
    assert.equal(facts.officialUrl?.value, "https://sand.ai/");
    assert.equal(facts.officialUrl?.checkedAt, "2026-11-26");
    assert.equal(facts.company?.value, "Sand AI");
    const text = facts.features?.value.join(" ") ?? "";
    assert.match(text, /480 billion total parameters and about 28 billion active/);
    assert.match(text, /28 billion active/);
    assert.match(text, /30 seconds of 1080p, 25 fps video with native audio/);
    assert.match(text, /promise, not a release/);
    assert.equal(getToolFacts("decart"), undefined);
    assert.equal(getToolFacts("hedra")?.visibility, "hidden");
  });

  it("prices only the confirmed API rate and does not invent a free tier or a plan", () => {
    assert.equal(facts?.plans, undefined);
    assert.equal(facts?.freeTier?.value.available, false);
    assert.match(facts?.freeTier?.value.summary ?? "", /does not state a free tier/);
    assert.equal(facts?.freeTier?.checkedAt, "2026-11-26");
    assert.equal(facts?.freeTier?.sourceUrl, "https://platform.sand.ai/docs/model-pricing/");
    assert.match(facts?.apiPricing?.value ?? "", /0\.08 USD per second/);
    assert.match(facts?.apiPricing?.value ?? "", /does not state an end date/);
    assert.match(facts?.apiPricing?.value ?? "", /top-up is not supported for the time being/);
    assert.match(facts?.apiPricing?.value ?? "", /describes opening Top up and paying online/);
    assert.equal(facts?.apiPricing?.checkedAt, "2026-11-26");
    assert.equal(facts?.apiPricing?.sourceUrl, "https://platform.sand.ai/docs/model-pricing/");
  });
});
