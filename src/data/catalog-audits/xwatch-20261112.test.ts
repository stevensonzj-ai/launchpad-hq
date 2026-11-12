import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { anthropicClaude } from "@/data/models/anthropic-claude";
import { googleGemini } from "@/data/models/google-gemini";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";

const sql = readFileSync("scripts/sql/catalog-xwatch-20261112.sql", "utf8");
const statements = splitSql(sql);

describe("xwatch 2026-11-12 guarded SQL", () => {
  it("parses, and is create/update only", () => {
    assert.ok(statements.length >= 10);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE)\b/i);
    assert.doesNotMatch(sql, /\bhedra\b/i);
    const inserts = statements.filter((s) => /^INSERT\s+INTO\s+platforms\b/i.test(s));
    assert.equal(inserts.length, 2);
    for (const insert of inserts) {
      assert.match(insert, /WHERE NOT EXISTS \(SELECT 1 FROM platforms WHERE slug =/);
      assert.match(insert, /AND EXISTS \(SELECT 1 FROM categories WHERE id = \$xw\$cmnxhfk4u004q88svb7gaw4ew\$xw\$\)/);
    }
    assert.equal(statements.filter((s) => /^UPDATE\s+platforms\b/i.test(s)).length, 9);
  });

  it("adds only the two new slugs and notes the preview end dates that the pages stated", () => {
    assert.match(sql, /\$xw\$muse-ember\$xw\$/);
    assert.match(sql, /\$xw\$gemini-decisions-api\$xw\$/);
    assert.match(sql, /through 2026-11-30/);
    assert.match(sql, /24:00 on 2026-11-25 \(UTC\+8\)/);
    assert.doesNotMatch(sql, /2026-11-17/);
    assert.doesNotMatch(sql, /owned by Stripe|deal closed|deal has closed/i);
    assert.doesNotMatch(sql, /\$xw\$v0\$xw\$/);
    assert.doesNotMatch(sql, /\$xw\$opencode\$xw\$/i);
  });
});

describe("xwatch 2026-11-12 fact overlays", () => {
  it("prices Fable 5.2 and Mythos 5.2 at $8 / $40 and keeps them in step with the model registry", () => {
    const plans = getToolFacts("anthropic-api")!.plans!.value;
    for (const name of ["Claude Fable 5.2", "Claude Mythos 5.2"]) {
      assert.equal(plans.find((p) => p.name === name)?.price, "$8 input / $40 output per million tokens", name);
      const version = anthropicClaude.versions.find((v) => v.name === name);
      assert.equal(version?.apiPriceInput.usdPerMillion, 8, name);
      assert.equal(version?.apiPriceOutput.usdPerMillion, 40, name);
      assert.equal(version?.apiPriceInput.verified, true, name);
    }
    const mythos = plans.find((p) => p.name === "Claude Mythos 5.2");
    assert.match(mythos?.limits ?? "", /Life Sciences and Cyber Verification Programs/);
    assert.equal(plans.some((p) => p.name === "Claude Fable 5.1"), false);
    const prior = anthropicClaude.versions.find((v) => v.id === "claude-fable-5-1");
    assert.equal(prior?.status, "legacy");
    assert.equal(prior?.apiPriceInput.verified, false);
  });

  it("records Gemini 4 Carbon's introductory price through 2026-11-30", () => {
    const api = getToolFacts("gemini")!.apiPricing!;
    assert.match(api.value, /\$2 input and \$10 output through 2026-11-30/);
    assert.match(api.value, /then \$4 input and \$20 output/);
    assert.match(api.note ?? "", /ends 2026-11-30/);
    assert.equal(api.sourceKind, "announcement");
    const carbon = googleGemini.versions.find((v) => v.id === "gemini-4-carbon");
    assert.equal(carbon?.apiPriceInput.usdPerMillion, 2);
    assert.equal(carbon?.apiPriceOutput.usdPerMillion, 10);
    assert.match(carbon?.apiPriceInput.note ?? "", /2026-11-30/);
    assert.match(carbon?.apiPriceInput.note ?? "", /\$4 per 1M/);
    assert.doesNotMatch(carbon?.consumerAccess.summary ?? "", /generally available/i);
  });

  it("adds Muse Ember and the Gemini Decisions API as priced rows", () => {
    const ember = getToolFacts("muse-ember")!;
    assert.match(ember.apiPricing!.value, /\$0\.10 input and \$0\.50 output for up to 200,000 input tokens/);
    assert.match(ember.apiPricing!.value, /\$0\.30 input and \$1\.50 output/);
    assert.equal(ember.freeTier!.value.available, false);
    const decisions = getToolFacts("gemini-decisions-api")!;
    assert.match(decisions.apiPricing!.value, /\$0\.10 per 1M input tokens/);
    assert.match(decisions.apiPricing!.value, /Output tokens are not billed/);
    assert.equal(decisions.freeTier!.value.available, true);
    assert.equal(getToolFacts("v0")?.features, undefined);
  });

  it("notes Qwen, MiniMax, Canva, and OpenRouter instead of new rows", () => {
    const qwen = getToolFacts("qwen")!.features!.value.join(" ");
    assert.match(qwen, /qwen4-max-preview/);
    assert.match(qwen, /24:00 on 2026-11-25 \(UTC\+8\)/);
    assert.match(qwen, /not as a new row/);
    const minimax = getToolFacts("minimax")!.features!.value.join(" ");
    assert.match(minimax, /H3-Image/);
    assert.match(minimax, /under 10 seconds/);
    assert.match(minimax, /does not give a calendar end date/);
    assert.doesNotMatch(minimax, /2026-11-17/);
    const canva = getToolFacts("canva-ai-magic-studio")!.features!.value.join(" ");
    assert.match(canva, /craft_v1_2k/);
    assert.match(canva, /not a new row/);
    const router = getToolFacts("openrouter")!.features!.value.join(" ");
    assert.match(router, /Extractions API is in alpha/);
    assert.match(router, /still subject to customary closing conditions/);
    assert.match(router, /does not say the deal has closed/);
    assert.doesNotMatch(router, /owned by Stripe/i);
  });

  it("notes Sign in with ChatGPT only on Notion and Hermes Agent", () => {
    assert.match(getToolFacts("notion-ai")!.features!.value.join(" "), /lists Notion among apps/);
    assert.match(getToolFacts("hermes-agent")!.features!.value.join(" "), /lists Hermes Agent among apps/);
    assert.doesNotMatch(JSON.stringify(getToolFacts("v0")), /Sign in with ChatGPT/);
  });
});
