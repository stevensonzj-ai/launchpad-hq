import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";
import { guardCatalogSql } from "@/lib/guarded-sql/statement-guard";

const sql = readFileSync("scripts/sql/catalog-klap-yearly-20261124.sql", "utf8");
const statements = splitSql(sql);

describe("catalog Klap yearly prices 2026-11-24", () => {
  it("is two platform updates and nothing else", () => {
    assert.equal(statements.length, 2);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.equal(guardCatalogSql(sql).ok, true);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /opus-clip|DROP|DELETE|INSERT|ALTER/i);
    const slugs = [...sql.matchAll(/slug = \$k\$(.*?)\$k\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, ["klap", "klap"]);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
    assert.ok(statements.every((statement) => /"currentPricing"/.test(statement)));
    assert.doesNotMatch(sql, /"usageLimits"|"freeTierFeatures"|"description"/);
  });

  it("replaces the old yearly rates and does not match its own replacement", () => {
    const quotes = [...sql.matchAll(/\$k\$([\s\S]*?)\$k\$/g)].map((match) => match[1]);
    assert.ok(quotes.some((quote) => quote.includes("$14/mo billed yearly") && !quote.includes("$14.50")));
    assert.ok(quotes.some((quote) => quote.includes("$14.50/mo billed yearly ($174/yr)")));
    assert.ok(quotes.some((quote) => quote.includes("$39.50/mo billed yearly ($474/yr)")));
    assert.ok(quotes.some((quote) => quote.includes("$94.50/mo billed yearly ($1,134/yr)")));
    for (const statement of statements) {
      assert.match(statement, /WHERE slug = \$k\$klap\$k\$/);
      const parts = [...statement.matchAll(/\$k\$([\s\S]*?)\$k\$/g)].map((match) => match[1]);
      for (const like of parts.filter((part) => part.startsWith("%") && part.endsWith("%"))) {
        const needle = like.slice(1, -1);
        assert.ok(parts.some((part) => part.includes(needle)), needle);
        assert.equal(needle.includes("$14.50") || needle.includes("$39.50") || needle.includes("$94.50"), false, needle);
      }
    }
    const exactNew = /"currentPricing" = \$k\$([\s\S]*?)\$k\$,/.exec(statements[0] ?? "");
    const exactOld = /AND "currentPricing" = \$k\$([\s\S]*?)\$k\$/.exec(statements[0] ?? "");
    assert.ok(exactNew && exactOld);
    assert.notEqual(exactNew[1], exactOld[1]);
    assert.match(exactNew[1], /\$14\.50\/mo billed yearly \(\$174\/yr\)/);
    assert.match(exactNew[1], /\$29\/mo or/);
    assert.match(exactNew[1], /as of 2026-11-24/);
    assert.doesNotMatch(exactNew[1], /\$14\/mo billed yearly|\$39\/mo billed yearly|\$94\/mo billed yearly/);
  });
});
