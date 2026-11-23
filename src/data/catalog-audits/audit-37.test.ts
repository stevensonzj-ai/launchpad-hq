import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { AUDIT_37_SKIPPED, CHECKED_AT } from "@/data/catalog-audits/audit-37";
import { CLAUDE_UPGRADE_TRIGGERS, CLAUDE_UPGRADE_TRIGGERS_PREVIOUS } from "@/data/catalog-audits/audit-36";
import { getToolFacts } from "@/data/facts";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";

const sql = readFileSync("scripts/sql/catalog-xwatch-20261123.sql", "utf8");
const statements = splitSql(sql);
const snapshot = readFileSync("src/lib/mcp/catalog-snapshot.json", "utf8");

const MODEL_NAME = /\b(opus|sonnet|haiku|fable|mythos|gpt-\d|gemini \d|qwen\d)/i;

function staleClaudeTriggers(value: string): boolean {
  return value === CLAUDE_UPGRADE_TRIGGERS_PREVIOUS || value.toLowerCase().includes("opus");
}

describe("catalog audit 37 guarded SQL", () => {
  it("is six platform updates and nothing else", () => {
    assert.equal(statements.length, 6);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|INSERT)\b/i);
    assert.doesNotMatch(sql, /\bhedra\b/i);
    const slugs = [...sql.matchAll(/slug = \$xw\$(.*?)\$xw\$/g)].map((match) => match[1]);
    assert.deepEqual(slugs, ["openai-api", "gemini", "kling-ai", "replit-agent", "qwen", "claude"]);
    assert.ok(statements.every((statement) => /"updatedAt"\s*=\s*now\(\)/.test(statement)));
  });

  it("guards each note so a second run matches nothing", () => {
    const notes = statements.filter((statement) => /description \|\|/.test(statement));
    assert.equal(notes.length, 5);
    for (const statement of notes) {
      const marker = /NOT LIKE \$xw\$(.*?)\$xw\$/.exec(statement);
      assert.ok(marker, statement.slice(0, 80));
      assert.match(statement, new RegExp(marker[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  it("rewrites Claude upgradeTriggers without naming a model, and a second run matches nothing", () => {
    const statement = statements[5];
    assert.ok(statement);
    assert.match(statement, /"upgradeTriggers"\s*=/);
    assert.match(statement, new RegExp(CLAUDE_UPGRADE_TRIGGERS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(statement, /needing Opus 4\.6 for complex tasks/);
    assert.match(statement, /"upgradeTriggers" ILIKE \$xw\$%opus%\$xw\$/);
    assert.equal(staleClaudeTriggers(CLAUDE_UPGRADE_TRIGGERS_PREVIOUS), true);
    assert.equal(staleClaudeTriggers(CLAUDE_UPGRADE_TRIGGERS), false);
    assert.equal(staleClaudeTriggers("still names Opus for hard work"), true);
    assert.doesNotMatch(CLAUDE_UPGRADE_TRIGGERS, MODEL_NAME);
  });

  it("keeps the committed catalog copy of Claude upgradeTriggers model-free", () => {
    assert.match(snapshot, new RegExp(CLAUDE_UPGRADE_TRIGGERS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.doesNotMatch(snapshot, /needing Opus 4\.6 for complex tasks/);
  });
});

describe("catalog audit 37 fact overlays", () => {
  it("prices GPT-Live-1.1 by the minute and leaves the Decisions rates in place", () => {
    const api = getToolFacts("openai-api")!.apiPricing!;
    assert.match(api.value, /\$0\.10 input, \$0\.01 cached input/);
    assert.match(api.value, /\$0\.05 per active minute/);
    assert.match(api.value, /\$0\.02 per standby minute/);
    assert.match(api.value, /does not list a per-token price/);
    assert.match(api.value, /2026-11-19/);
    assert.equal(api.sourceUrl, "https://openai.com/index/decisions-api");
    assert.doesNotMatch(JSON.stringify(getToolFacts("openai-api")), /\bonly (on|with|runs)|Luna only/i);
  });

  it("adds Genie 4 paid rates without moving the Hydrogen check date", () => {
    const api = getToolFacts("gemini")!.apiPricing!;
    assert.equal(api.checkedAt, "2026-11-16");
    assert.match(api.value, /Gemini 4 Hydrogen/);
    assert.match(api.value, /\$1\.50 input and \$7\.50 output/);
    assert.match(api.value, /Genie 4 \(genie-4\)/);
    assert.match(api.value, /\$1\.50 input for text or a reference image/);
    assert.match(api.value, /\$9\.00 text output/);
    assert.match(api.value, /\$17\.50 video output/);
    assert.match(api.value, /about \$0\.10 per second/);
    assert.match(api.value, /free tier is not available for Genie 4/);
    assert.match(api.note ?? "", /2026-11-23/);
  });

  it("prices Kling Image 4.0 from the image pricing page", () => {
    const api = getToolFacts("kling-ai")!.apiPricing!;
    assert.equal(api.checkedAt, CHECKED_AT);
    assert.equal(api.sourceUrl, "https://kling.ai/document-api/pricing/base/image");
    assert.match(api.value, /\$0\.063 per image at 2K/);
    assert.match(api.value, /\$0\.094 at 4K/);
    assert.match(api.value, /\$0\.157 at 8K/);
    assert.match(api.value, /\$0\.003 each/);
    assert.match(api.value, /does not state an end date/);
    const features = getToolFacts("kling-ai")!.features!.value.join(" ");
    assert.match(features, /Kling Creative Studio/);
    assert.match(features, /2026-11-17/);
    assert.match(features, /2026-11-18/);
  });

  it("notes Replit Missions and the September Qwen-Image-2.1 weights", () => {
    const missions = getToolFacts("replit-agent")!.features!.value.join(" ");
    assert.match(missions, /swarm of agents/);
    assert.match(missions, /does not publish a Missions plan price/);
    assert.match(missions, /examples rather than a list price/);
    assert.equal(getToolFacts("replit-agent")!.plans!.checkedAt, "2026-11-20");
    const qwen = getToolFacts("qwen")!.features!.value.join(" ");
    assert.match(qwen, /Qwen-Image-2\.1/);
    assert.match(qwen, /2026-09-20/);
    assert.match(qwen, /separate license/);
    assert.match(qwen, /24:00 on 2026-11-25 \(UTC\+8\)/);
    assert.equal(getToolFacts("qwen")!.apiPricing!.checkedAt, "2026-11-20");
    assert.doesNotMatch(qwen, /open[- ]source/i);
  });

  it("lists items that were not given a new slug", () => {
    assert.equal(AUDIT_37_SKIPPED.length, 9);
    const items = AUDIT_37_SKIPPED.map((row) => row.item).join(" ");
    assert.match(items, /GLM-5\.4/);
    assert.match(items, /Inkling 2 Mini/);
    assert.match(items, /MAI Image 2\.7/);
    assert.match(items, /MAI Cyber 2 Flash/);
    assert.match(items, /Wan 3\.0/);
    assert.match(items, /Hy4/);
    assert.match(items, /Seedance 2\.5 Flash/);
    assert.match(items, /Runway Agent/);
    assert.match(items, /Perplexity Computer/);
    assert.equal(getToolFacts("inkling-2-mini"), undefined);
    assert.equal(getToolFacts("glm-5-4"), undefined);
    assert.doesNotMatch(sql, /\$xw\$(inkling|glm-5|mai-image|microsoft-foundry)\$xw\$/i);
  });
});
