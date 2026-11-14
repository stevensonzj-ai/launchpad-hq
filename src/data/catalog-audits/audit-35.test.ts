import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { AUDIT_35_UNVERIFIED, CHECKED_AT } from "@/data/catalog-audits/audit-35";
import { getToolFacts } from "@/data/facts";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";

const sql = readFileSync("scripts/sql/catalog-audit-35-20261114.sql", "utf8");
const statements = splitSql(sql);

function factStatus(slug: string, field: "freeTier" | "plans" | "apiPricing"): string {
  const fact = getToolFacts(slug)?.[field];
  assert.ok(fact, `${slug}.${field}`);
  return fact.status;
}

function factCheckedAt(slug: string, field: "freeTier" | "plans" | "apiPricing"): string {
  const fact = getToolFacts(slug)?.[field];
  assert.ok(fact, `${slug}.${field}`);
  return fact.checkedAt;
}

describe("catalog audit 35 price recheck", () => {
  it("leaves unread price facts unverified and dated 2026-10-14", () => {
    assert.equal(AUDIT_35_UNVERIFIED.length, 12);
    for (const row of AUDIT_35_UNVERIFIED) {
      assert.equal(factStatus(row.slug, row.field), "unverified", `${row.slug}.${row.field}`);
      assert.equal(factCheckedAt(row.slug, row.field), "2026-10-14", `${row.slug}.${row.field}`);
    }
  });

  it("records the prices the vendor pages stated on 2026-11-14", () => {
    assert.equal(factCheckedAt("comfyui", "apiPricing"), CHECKED_AT);
    assert.match(getToolFacts("comfyui")!.apiPricing!.value, /RTX PRO 6000 \(96GB\) \$3\.49\/hr/);
    assert.match(getToolFacts("comfyui")!.apiPricing!.value, /MIG \(48GB\) \$1\.75\/hr/);
    assert.doesNotMatch(getToolFacts("comfyui")!.apiPricing!.value, /\$4\.54/);

    assert.equal(factCheckedAt("fathom", "plans"), CHECKED_AT);
    const fathom = getToolFacts("fathom")!.plans!.value;
    assert.equal(fathom.find((plan) => plan.name === "Team")?.price, "$19");
    assert.equal(fathom.find((plan) => plan.name === "Business")?.price, "$34");
    assert.equal(fathom.find((plan) => plan.name === "Premium")?.price, "$20");

    assert.match(getToolFacts("firecrawl")!.freeTier!.value.summary, /1,000 credits per month/);
    assert.match(getToolFacts("firecrawl")!.plans!.value.map((plan) => plan.limits).join(" "), /\$19\/month/);

    assert.equal(getToolFacts("hedra")!.plans!.value.find((plan) => plan.name === "Ultra")?.price, "from $100");
    assert.match(getToolFacts("sarvam-ai")!.freeTier!.value.summary, /₹100/);
    assert.match(getToolFacts("sarvam-ai")!.apiPricing!.value, /₹1\.60/);
    assert.match(getToolFacts("vapi")!.plans!.value.map((plan) => `${plan.name} ${plan.limits}`).join(" "), /\$0\.05\/min/);
    assert.equal(getToolFacts("vapi")!.plans!.value.find((plan) => plan.name === "Core")?.price, "$29");
    assert.equal(getToolFacts("captions")!.plans!.value.some((plan) => plan.name === "Frontier 2x"), false);
    assert.equal(getToolFacts("jetbrains-ai")!.plans!.value.find((plan) => plan.name === "AI Pro")?.limits.includes("$10/user/month"), true);
    assert.equal(factCheckedAt("apollo-io", "plans"), CHECKED_AT);
    assert.equal(factCheckedAt("krea", "freeTier"), CHECKED_AT);
  });
});

describe("catalog audit 35 guarded SQL", () => {
  it("is platform updates and nothing else", () => {
    assert.equal(statements.length, 11);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|INSERT)\b/i);
    const slugs = [...sql.matchAll(/slug = \$a35\$(.*?)\$a35\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, [
      "comfyui",
      "comfyui",
      "sarvam-ai",
      "sarvam-ai",
      "sarvam-ai",
      "captions",
      "captions",
      "vapi",
      "vapi",
      "firecrawl",
      "firecrawl",
    ]);
  });

  it("keeps each update from matching after the new text is stored", () => {
    assert.match(sql, /\$3\.49\/hr/);
    assert.match(sql, /rate unverified as of 2026-10-13/);
    assert.match(sql, /₹100 of free credits on signup/);
    assert.match(sql, /amount unverified as of 2026-10-13/);
    assert.match(sql, /Frontier \$69\.99\/month/);
    assert.match(sql, /higher tiers unverified/);
    assert.match(sql, /Core \$29\/month/);
    assert.match(sql, /Core package list price unverified as of 2026-10-14/);
    assert.match(sql, /Scale \$749\/mo/);
    assert.match(sql, /Hobby \$16\/mo annual/);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
  });
});
