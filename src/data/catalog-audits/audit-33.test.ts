import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { searchTools } from "@/lib/mcp/tools";
import { PIPECAT_ROW } from "@/data/catalog-audits/audit-32";
import {
  AUDIT_33_PATCHES,
  audit33PatchesFor,
  audit33Slugs,
  audit33Sql,
  audit33UpdateData,
  planAudit33,
} from "@/data/catalog-audits/audit-33";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const snapshot = JSON.parse(read("src/lib/mcp/catalog-snapshot.json")) as { rows: Record<string, string | null>[]; built_from: string };
const pipecat = () => snapshot.rows.find((r) => r.slug === "pipecat")!;
const slugs = (task: string, budget?: "free") =>
  searchTools({ task, ...(budget ? { budget } : {}) }, snapshotRows(), getToolFacts).results.map((r) => r.slug);

describe("catalog audit 33 (Pipecat description)", () => {
  it("patches only pipecat.description, from the exact audit-32 insert value", () => {
    assert.deepEqual(audit33Slugs(), ["pipecat"]);
    assert.equal(AUDIT_33_PATCHES.length, 1);
    const p = AUDIT_33_PATCHES[0];
    assert.equal(p.field, "description");
    assert.equal(p.from, PIPECAT_ROW.description);
    assert.notEqual(p.from, p.to);
    assert.match(p.source, /^https:\/\//);
  });

  it("the new text keeps the facts and drops the text-to-speech wording", () => {
    const { from, to } = AUDIT_33_PATCHES[0];
    assert.match(from!, /text-to-speech/);
    assert.doesNotMatch(to, /text[- ]to[- ]speech|speech[- ]to[- ]text|voiceover/i);
    for (const keep of [/open-source Python framework/, /voice and multimodal AI agents/, /BSD 2-Clause/, /more than 200 integrated providers/, /WebRTC, SIP or phone \(PSTN\)/, /announced, not completed, as of 2026-11-02/, /as of 2026-11-02\)\.$/]) {
      assert.match(to, keep);
    }
  });

  it("is applied to the snapshot and a re-run is a no-op", () => {
    assert.match(snapshot.built_from, /audit 33/);
    const plans = planAudit33(pipecat() as never, audit33PatchesFor("pipecat"));
    assert.ok(plans.every((x) => x.action === "already"));
    assert.deepEqual(audit33UpdateData(plans), {});
    const p = { slug: "s", field: "description" as const, source: "https://e.example", from: "x", to: "y" };
    assert.deepEqual(audit33UpdateData(planAudit33({ description: "x" }, [p])), { description: "y" });
    assert.deepEqual(audit33UpdateData(planAudit33({ description: "z" }, [p])), {});
  });

  it("Pipecat stays out of the top 10 for text-to-speech and voiceover searches", () => {
    for (const [task, budget] of [["text to speech voiceover", "free"], ["text to speech voiceover"], ["text to speech"], ["ai voiceover"]] as const) {
      assert.equal(slugs(task, budget as "free" | undefined).slice(0, 10).includes("pipecat"), false, task);
    }
    assert.deepEqual(slugs("text to speech voiceover", "free").slice(0, 5), ["speechify", "elevenlabs", "murf-ai", "deepgram", "openai-api"]);
  });

  it("Pipecat still ranks for its own name and for voice agent framework searches", () => {
    assert.equal(slugs("pipecat")[0], "pipecat");
    assert.ok(slugs("voice agent framework").includes("pipecat"));
  });

  it("the SQL file is one guarded UPDATE per patch, equal to the generator", () => {
    const lines = read("scripts/sql/audit-33-pipecat.sql").split("\n").filter((l) => l.length > 0);
    assert.deepEqual(lines, audit33Sql());
    assert.equal(lines.length, AUDIT_33_PATCHES.length);
    const sql = lines[0];
    assert.match(sql, /^UPDATE platforms SET "description" = \$a33\$.*\$a33\$, "updatedAt" = now\(\) WHERE slug = \$a33\$pipecat\$a33\$ AND "description" = \$a33\$.*\$a33\$;$/);
    assert.doesNotMatch(sql, /DELETE|INSERT|DROP/i);
  });

  it("the runner defaults to dry-run, uses the prod guard and never deletes or creates", () => {
    const source = read("scripts/update-catalog-audit-33.ts");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /select: \{ description: true \}/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
  });
});
