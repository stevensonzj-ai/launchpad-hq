import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { AUDIT_36_SKIPPED, CHECKED_AT, CLAUDE_UPGRADE_TRIGGERS } from "@/data/catalog-audits/audit-36";
import { getToolFacts } from "@/data/facts";
import { alibabaQwen } from "@/data/models/alibaba-qwen";
import { deepseek } from "@/data/models/deepseek";
import { googleGemini } from "@/data/models/google-gemini";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";

const sql = readFileSync("scripts/sql/catalog-xwatch-20261116.sql", "utf8");
const statements = splitSql(sql);

const MODEL_NAME = /\b(opus|sonnet|haiku|fable|mythos|gpt-\d|gemini \d|qwen\d)/i;

describe("catalog audit 36 guarded SQL", () => {
  it("is nine platform updates and nothing else", () => {
    assert.equal(statements.length, 9);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|INSERT)\b/i);
    assert.doesNotMatch(sql, /\bhedra\b/i);
    assert.doesNotMatch(sql, /\$xw\$sesame\$xw\$|\$xw\$inkling/i);
    const slugs = [...sql.matchAll(/slug = \$xw\$(.*?)\$xw\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, [
      "gemini",
      "qwen",
      "claude",
      "claude",
      "chatgpt",
      "deepseek",
      "windsurf",
      "suno",
      "github-copilot",
    ]);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
  });

  it("guards each note so a second run matches nothing", () => {
    const notes = statements.filter((statement) => /description \|\|/.test(statement));
    assert.equal(notes.length, 8);
    for (const statement of notes) {
      const marker = /NOT LIKE \$xw\$(.*?)\$xw\$/.exec(statement);
      assert.ok(marker, statement.slice(0, 80));
      assert.match(statement, new RegExp(marker[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  it("rewrites Claude upgradeTriggers without naming a model, and a second run matches nothing", () => {
    const statement = statements[3];
    assert.match(statement, /"upgradeTriggers"\s*=/);
    assert.match(statement, new RegExp(CLAUDE_UPGRADE_TRIGGERS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(statement, /needing Opus 4\.6 for complex tasks/);
    assert.match(statement, /"upgradeTriggers" ILIKE \$xw\$%opus%\$xw\$/);
    assert.doesNotMatch(CLAUDE_UPGRADE_TRIGGERS, MODEL_NAME);
    assert.doesNotMatch(CLAUDE_UPGRADE_TRIGGERS, /opus/i);
    assert.equal(/opus/i.test(CLAUDE_UPGRADE_TRIGGERS), false);
  });
});

describe("catalog audit 36 fact overlays", () => {
  it("prices Gemini 4 Hydrogen from the API pricing page and keeps Carbon's intro date", () => {
    const api = getToolFacts("gemini")!.apiPricing!;
    assert.equal(api.checkedAt, CHECKED_AT);
    assert.match(api.value, /\$2 input and \$10 output through 2026-11-30/);
    assert.match(api.value, /Gemini 4 Hydrogen/);
    assert.match(api.value, /\$1\.50 input and \$7\.50 output/);
    assert.match(api.value, /\$0\.075 per 1M tokens/);
    assert.match(api.value, /Batch and Flex are \$0\.75 input and \$3\.75 output/);
    assert.match(api.value, /free of charge/);
    assert.equal(api.sourceUrl, "https://ai.google.dev/gemini-api/docs/pricing");
    const hydrogen = googleGemini.versions.find((version) => version.id === "gemini-4-hydrogen");
    assert.equal(hydrogen?.apiPriceInput.usdPerMillion, 1.5);
    assert.equal(hydrogen?.apiPriceOutput.usdPerMillion, 7.5);
    assert.equal(hydrogen?.apiPriceInput.verified, true);
    assert.match(hydrogen?.consumerAccess.summary ?? "", /Google AI Pro and Ultra subscribers in Google Antigravity/);
    const argon = googleGemini.versions.find((version) => version.id === "gemini-4-argon");
    assert.equal(argon?.apiPriceInput.usdPerMillion, 2);
    assert.match(argon?.apiPriceInput.note ?? "", /\$4\.00 per 1M from 1 Dec 2026/);
  });

  it("records Qwen4-Max prices and keeps the preview end date", () => {
    const api = getToolFacts("qwen")!.apiPricing!;
    assert.equal(api.checkedAt, CHECKED_AT);
    assert.match(api.value, /\$1\.50 input and \$4\.50 output/);
    assert.match(api.value, /\$1\.413 input and \$4\.24 output/);
    assert.match(api.value, /cache read \$0\.075/);
    assert.match(api.value, /cache read \$0\.071/);
    assert.match(api.value, /1 million tokens, valid for 90 days/);
    assert.equal(getToolFacts("qwen")!.freeTier!.checkedAt, "2026-10-14");
    assert.equal(getToolFacts("qwen")!.freeTier!.status, "unverified");
    const features = getToolFacts("qwen")!.features!.value.join(" ");
    assert.match(features, /qwen4-max-preview/);
    assert.match(features, /24:00 on 2026-11-25 \(UTC\+8\)/);
    assert.match(features, /batch inference is not supported/);
    const max = alibabaQwen.versions.find((version) => version.id === "qwen4-max");
    assert.equal(max?.apiPriceInput.usdPerMillion, 1.5);
    assert.equal(max?.apiPriceOutput.usdPerMillion, 4.5);
    assert.equal(max?.contextWindow.tokens, 1_000_000);
  });

  it("notes Claude Meetings, ChatGPT Wallet, DeepSeek tools, Devin Apps, Suno Bridge, and Copilot", () => {
    const claude = getToolFacts("claude")!.features!.value.join(" ");
    assert.match(claude, /Claude Meetings is in beta on Team and Enterprise/);
    assert.match(claude, /through 2027-02-10/);
    assert.equal(getToolFacts("claude")!.features!.checkedAt, CHECKED_AT);
    assert.match(getToolFacts("chatgpt")!.features!.value.join(" "), /ChatGPT Wallet/);
    assert.match(getToolFacts("chatgpt")!.features!.value.join(" "), /aged 18 and older in the US/);
    const deepseekFeatures = getToolFacts("deepseek")!.features!.value.join(" ");
    assert.match(deepseekFeatures, /built-in web search, file input, URL reading, and safety checks/);
    assert.match(deepseekFeatures, /Search, Fetch, OCR, ASR, and TTS/);
    assert.equal(getToolFacts("deepseek")!.apiPricing!.checkedAt, "2026-10-24");
    assert.match(deepseek.whichToUse.join(" "), /does not restate the dollar amounts/);
    assert.match(getToolFacts("windsurf")!.features!.value.join(" "), /Devin Apps/);
    assert.match(getToolFacts("windsurf")!.features!.value.join(" "), /does not publish a dollar price/);
    const suno = getToolFacts("suno")!.features!.value.join(" ");
    assert.match(suno, /Ableton Live 12/);
    assert.match(suno, /Premier/);
    assert.match(suno, /does not say that Bridge spends credits/);
    assert.doesNotMatch(suno, /uses credits/);
    assert.match(getToolFacts("github-copilot")!.features!.value.join(" "), /release status GA/);
    assert.match(getToolFacts("github-copilot")!.features!.value.join(" "), /Included on Copilot Pro/);
  });

  it("lists the items the pages did not support adding", () => {
    assert.equal(AUDIT_36_SKIPPED.length, 7);
    const items = AUDIT_36_SKIPPED.map((row) => row.item).join(" ");
    assert.match(items, /Inkling 2 Small/);
    assert.match(items, /Sesame/);
    assert.match(items, /Perplexity Teammates/);
    assert.match(items, /Seedance 2\.5 Flash/);
    assert.match(items, /Argon/);
    assert.equal(getToolFacts("sesame"), undefined);
    assert.equal(getToolFacts("inkling-2-small"), undefined);
  });
});
