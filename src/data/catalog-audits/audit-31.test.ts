import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { mistral } from "@/data/models/mistral";
import {
  AUDIT_31_NO_CHANGE,
  AUDIT_31_PATCHES,
  audit31PatchesFor,
  audit31Slugs,
  audit31UpdateData,
  planAudit31,
} from "@/data/catalog-audits/audit-31";

type Row = Record<string, string | null> & { slug: string };
const snapshot = JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as { rows: Row[]; built_from: string };
const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const row = (slug: string) => snapshot.rows.find((r) => r.slug === slug)!;
const patch = (slug: string, field: string) => AUDIT_31_PATCHES.find((p) => p.slug === slug && p.field === field)!;

describe("catalog audit 31", () => {
  it("has 6 patches on 5 rows, each changing the text and ending in a 2026-11-02 date where dated", () => {
    assert.equal(AUDIT_31_PATCHES.length, 6);
    assert.deepEqual(audit31Slugs(), ["claude", "claude-code", "pika", "antigravity-cli", "kimi"]);
    for (const p of AUDIT_31_PATCHES) {
      assert.notEqual(p.from, p.to, `${p.slug}.${p.field}`);
      assert.match(p.source, /^https:\/\//);
    }
    for (const [slug, field] of [["claude", "currentPricing"], ["claude", "usageLimits"], ["claude-code", "usageLimits"], ["pika", "currentPricing"]]) {
      assert.match(patch(slug, field).to, /\(as of 2026-11-02\)$|\(official, as of 2026-11-02\)$/, `${slug}.${field}`);
    }
  });

  it("starts from the exact audit-30-era production values", () => {
    assert.match(patch("claude", "currentPricing").from!, /Max from \$100\/mo \(5x or 20x Pro usage\).*\(official, as of 2026-10-25\)$/);
    assert.match(patch("claude", "usageLimits").from!, /Max: 5x or 20x Pro \(official, as of 2026-10-25\)$/);
    assert.match(patch("claude-code", "usageLimits").from!, /^Max plan: Opus usage subject to rate limits/);
    assert.match(patch("pika", "currentPricing").from!, /\(as of 2026-10-30\)$/);
    assert.match(patch("kimi", "description").from!, /^Moonshot AI's Kimi assistant \(K3\.1 Pro is the newest model as of 2026-10-26\)\. China-based company\./);
    assert.match(patch("antigravity-cli", "description").from!, /The terms ask you not to submit confidential information\.$/);
  });

  it("Claude values use the Max / Ultra naming and never the old '5x or 20x' wording", () => {
    for (const p of AUDIT_31_PATCHES.filter((x) => x.slug === "claude" || x.slug === "claude-code")) {
      assert.doesNotMatch(p.to, /5x or 20x|Max 20x\)?\s*Pro|Max from/, `${p.slug}.${p.field}`);
    }
    const pricing = patch("claude", "currentPricing").to;
    assert.match(pricing, /Max \$100\/mo \(5x Pro usage\)/);
    assert.match(pricing, /Ultra \$200\/mo \(formerly Max 20x: 10x Pro weekly usage, no 5-hour limit for verified accounts\)/);
    const limits = patch("claude", "usageLimits").to;
    assert.match(limits, /Max: 5x Pro every 5 hours and every week/);
    assert.match(limits, /Ultra: 10x Pro weekly, no 5-hour limit for verified accounts/);
    assert.match(patch("claude-code", "usageLimits").to, /Max and Ultra plans/);
  });

  it("the other new values carry the key facts", () => {
    const pika = patch("pika", "currentPricing").to;
    assert.match(pika, /Pika H3 Flex \(open weights\) from \$0\.02\/sec at 480p/);
    assert.match(pika, /\$0\.01\/sec for Pika API Club members through Nov 5, 2026/);
    assert.match(patch("antigravity-cli", "description").to, /Since 2026-10-29 a Plugin Marketplace lets you find and install Google-built and third-party plugins \(agy plugin install\)\.$/);
    assert.match(patch("kimi", "description").to, /^Moonshot AI's Kimi assistant \(K3\.1 Pro is the newest model as of 2026-10-26\)\. Kimi 3D Make \(3D web pages, 3D models and print-ready files\) runs on K3\.1 Pro and uses the same membership quota\. China-based company\./);
  });

  it("is applied to the snapshot and a re-run is a no-op", () => {
    assert.match(snapshot.built_from, /audit 31/);
    // antigravity-cli is a production row the committed snapshot has never held (no new listings here).
    assert.equal(snapshot.rows.some((x) => x.slug === "antigravity-cli"), false);
    for (const slug of audit31Slugs().filter((s) => s !== "antigravity-cli")) {
      const plans = planAudit31(row(slug) as never, audit31PatchesFor(slug));
      assert.ok(plans.every((x) => x.action === "already"), slug);
      assert.deepEqual(audit31UpdateData(plans), {}, slug);
    }
    const p = { slug: "s", field: "currentPricing" as const, source: "https://e.example", from: "x", to: "y" };
    assert.deepEqual(audit31UpdateData(planAudit31({ currentPricing: "x" }, [p])), { currentPricing: "y" });
    assert.deepEqual(audit31UpdateData(planAudit31({ currentPricing: "z" }, [p])), {});
  });

  it("the Claude fact file splits Max and Ultra", () => {
    const plans = getToolFacts("claude")!.plans!.value;
    const max = plans.find((x) => x.name === "Max")!;
    const ultra = plans.find((x) => x.name === "Ultra")!;
    assert.equal(max.price, "$100");
    assert.match(max.limits, /5x Pro usage every 5 hours and every week/);
    assert.match(max.limits, /\$100\/month in API credits/);
    assert.equal(ultra.price, "$200");
    assert.match(ultra.limits, /10x Pro usage every week, no 5-hour limit for verified accounts/);
    assert.match(ultra.limits, /\$200\/month in API credits/);
    assert.equal(plans.some((x) => /5x or 20x/.test(x.limits)), false);
  });

  it("fact files carry the dated notes (Deepgram acquisition announced, not completed; Pika; Antigravity; Kimi)", () => {
    const dg = getToolFacts("deepgram")!.features!.value.join(" ");
    assert.match(dg, /acquiring Daily/);
    assert.match(dg, /announced, not completed/);
    assert.match(dg, /Pipecat will remain fully open source/);
    assert.match(getToolFacts("pika")!.apiPricing!.value, /480p \$0\.02.*\$0\.01.*768p \$0\.04, 1080p \$0\.07, 2K \$0\.08, 4K \$0\.16/);
    assert.match(getToolFacts("google-antigravity")!.features!.value.join(" "), /Plugin Marketplace/);
    assert.match(getToolFacts("antigravity-cli")!.features!.value.join(" "), /agy plugin install/);
    assert.match(getToolFacts("kimi")!.features!.value.join(" "), /Kimi 3D Make.*K3\.1 Pro.*does not control printers/);
  });

  it("Mistral Large 4 is generally priced at $0.70 / $0.07 cached / $2.10 under the open-weight license", () => {
    const v = mistral.versions.find((x) => x.id === "mistral-large-4")!;
    assert.equal(v.apiPriceInput?.usdPerMillion, 0.7);
    assert.equal(v.apiPriceOutput?.usdPerMillion, 2.1);
    assert.match(v.apiPriceInput!.note!, /\$0\.07/);
    const text = JSON.stringify(mistral);
    assert.match(text, /Mistral Ecosystem Open-Weight license/);
    assert.doesNotMatch(text, /public preview|sale price|0\.68|2\.09/);
  });

  it("lists the reviewed no-change items and adds no Daily / Pipecat rows", () => {
    assert.deepEqual(AUDIT_31_NO_CHANGE.map((r) => r.slug), ["jules", "astra-for-law", "openai-private-intelligence", "runway-agent", "daily", "pipecat"]);
    for (const r of AUDIT_31_NO_CHANGE) assert.ok(r.reason.length > 10, r.slug);
    // Audit 31 added no Pipecat row; audit 32 (2026-11-02) added one afterwards, so pipecat is
    // no longer asserted absent here (audit-32.test.ts asserts it is present).
    for (const s of ["daily", "jules", "runway-agent"]) assert.equal(snapshot.rows.some((x) => x.slug === s), false, s);
  });

  it("the runner defaults to dry-run, uses the prod guard and never deletes or creates", () => {
    const source = read("scripts/update-catalog-audit-31.ts");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /select: \{ currentPricing: true, freeTierFeatures: true, usageLimits: true, description: true \}/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
  });
});
