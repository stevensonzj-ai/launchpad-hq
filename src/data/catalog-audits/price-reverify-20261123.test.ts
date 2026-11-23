import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";
import { guardCatalogSql } from "@/lib/guarded-sql/statement-guard";

const sql = readFileSync("scripts/sql/catalog-price-reverify-20261123.sql", "utf8");
const statements = splitSql(sql);

describe("catalog price re-verification 2026-11-23", () => {
  it("is thirteen platform updates and nothing else", () => {
    assert.equal(statements.length, 13);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.equal(guardCatalogSql(sql).ok, true);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\bhedra\b/i);
    const slugs = [...sql.matchAll(/slug = \$rv\$(.*?)\$rv\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, [
      "squarespace-ai",
      "squarespace-ai",
      "gemini",
      "ideogram",
      "sakana-ai",
      "gpt-image-1-5-dall-e-successor",
      "tencent-hy4",
      "tencent-hy4",
      "tencent-hy4",
      "tencent-hy4",
      "longcat-2-5",
      "longcat-2-5",
      "longcat-2-5",
    ]);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
  });

  it("guards every statement on slug, and the new text does not still match", () => {
    for (const statement of statements) {
      assert.match(statement, /WHERE slug = \$rv\$/);
      const quotes = [...statement.matchAll(/\$rv\$([\s\S]*?)\$rv\$/g)].map((match) => match[1]);
      const like = quotes.find((quote) => quote.startsWith("%") && quote.endsWith("%"));
      if (like) {
        const needle = like.replaceAll("%", "");
        assert.ok(quotes.some((quote) => quote.includes(needle)), needle);
        assert.ok(quotes.some((quote) => quote !== like && !quote.includes(needle)), needle);
      }
      const column = /"(currentPricing|freeTierFeatures)" = \$rv\$([\s\S]*?)\$rv\$,/.exec(statement);
      const old = /AND "(?:currentPricing|freeTierFeatures)" = \$rv\$([\s\S]*?)\$rv\$/.exec(statement);
      if (column && old) assert.notEqual(column[2], old[1]);
    }
  });
});
