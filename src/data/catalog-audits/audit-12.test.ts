import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { claimsOfficial } from "@/lib/mcp/official-claim";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  AUDIT_12_PATCHES,
  CHECKED_AT,
  appendNote,
  audit12Slugs,
  audit12UpdateData,
  diffAudit12,
  diffAudit12Row,
  type Audit12Row,
} from "./audit-12";
import { diffAudit10Row } from "./audit-10";
import { diffAudit11Row } from "./audit-11";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug)!;
const patchFor = (slug: string) => AUDIT_12_PATCHES.find((p) => p.slug === slug)!;
const notes = (slug: string) => patchFor(slug).appends.map((a) => a.note).join(" ");
/** A snapshot row with audit 12 applied once. */
const applied = (slug: string) => {
  const row = { ...snap(slug) };
  Object.assign(row, audit12UpdateData(diffAudit12Row(slug, row as Audit12Row)));
  return row;
};

describe("catalog audit 12: sourced, dated, append-only notes", () => {
  it("dates every change 2026-10-29, cites https vendor pages, no tracking or sponsor links", () => {
    for (const patch of AUDIT_12_PATCHES) {
      assert.equal(patch.checkedAt, CHECKED_AT, patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      for (const url of patch.sources) assert.match(url, /^https:\/\//);
      assert.doesNotMatch(JSON.stringify(patch), /sponsor|affiliate|referral|utm_|@/i);
      for (const { note } of patch.appends) assert.match(note, /as of 2026-10-29/, patch.slug);
    }
  });

  it("touches only existing rows, creates none, and never says \"official\"", () => {
    for (const slug of audit12Slugs()) {
      assert.ok(snap(slug), `${slug} is a listed row`);
      for (const { note } of patchFor(slug).appends) assert.equal(claimsOfficial(note), false, slug);
    }
    assert.equal(new Set(audit12Slugs()).size, audit12Slugs().length);
    assert.equal(audit12Slugs().some((s) => /hermes|nous|nemotron|liquid|lfm/.test(s)), false);
  });

  it("prices are exactly the ones the vendor pages state", () => {
    const prices = (slug: string) => notes(slug).match(/\$\d+(,\d{3})*(\.\d+)?/g) ?? [];
    assert.deepEqual(prices("gemini"), ["$2", "$10", "$4", "$20"]);
    assert.deepEqual(prices("openai-api"), ["$1", "$5"]);
    assert.deepEqual(prices("kling-ai"), ["$0.157", "$0.235", "$0.094", "$0.141"]);
    assert.deepEqual(prices("chatgpt"), ["$100", "$200", "$500", "$100", "$200", "$500", "$20", "$100", "$500"]);
    for (const slug of ["github-copilot", "runway", "suno", "notion-ai", "mistral-vibe"]) assert.deepEqual(prices(slug), [], slug);
  });

  it("Copilot: no time-limited discount (no end date on the page), no claim that Fusion replaces Auto", () => {
    assert.doesNotMatch(notes("github-copilot"), /30%|discount|limited time|replac/i);
    assert.match(notes("github-copilot"), /Fusion Standard, Fusion High and Fusion Max/);
  });

  it("Kling: apiAvailable false -> true only while false", () => {
    const patch = patchFor("kling-ai");
    const row: Audit12Row = { description: "Old.", currentPricing: "Old", apiAvailable: false };
    assert.equal(audit12UpdateData(diffAudit12(row, patch)).apiAvailable, true);
    assert.equal(diffAudit12({ ...row, apiAvailable: true }, patch).some((d) => d.field === "apiAvailable"), false);
    assert.equal(snap("kling-ai").apiAvailable, false);
  });
});

describe("catalog audit 12: appends, never overwrites; idempotent", () => {
  const append = { field: "description" as const, note: "Note (as of 2026-10-29).", separator: " " as const };

  it("appendNote keeps the existing text, fills an empty field, and is a no-op once present", () => {
    assert.equal(appendNote("Existing text.", append), "Existing text. Note (as of 2026-10-29).");
    assert.equal(appendNote(null, append), "Note (as of 2026-10-29).");
    assert.equal(appendNote("   ", append), "Note (as of 2026-10-29).");
    assert.equal(appendNote("Existing text. Note (as of 2026-10-29).", append), null);
    assert.equal(appendNote("A; Note (as of 2026-10-29).; B", { ...append, separator: "; " }), null);
  });

  it("every changed field still starts with the row's existing text", () => {
    for (const slug of audit12Slugs()) {
      for (const d of diffAudit12Row(slug, snap(slug))) {
        if (d.field === "apiAvailable") continue;
        const before = snap(slug)[d.field]?.trim();
        assert.equal(d.wasEmpty, !before, `${slug}.${d.field}`);
        if (before) assert.ok(d.to.startsWith(before), `${slug}.${d.field} keeps its text`);
      }
    }
  });

  it("9 rows / 11 field changes on the current snapshot, then 0 on a re-run", () => {
    let rows = 0;
    let fields = 0;
    for (const slug of audit12Slugs()) {
      const diffs = diffAudit12Row(slug, snap(slug));
      if (diffs.length) rows++;
      fields += diffs.length;
      assert.deepEqual(diffAudit12Row(slug, applied(slug) as Audit12Row), [], `${slug} re-run`);
    }
    assert.deepEqual([rows, fields], [9, 11]);
  });

  it("audit 10 and 11 re-runs leave audit 12's notes alone", () => {
    for (const slug of audit12Slugs()) {
      const row = applied(slug);
      assert.deepEqual(diffAudit10Row(slug, row as never), [], `audit 10 ${slug}`);
      assert.deepEqual(diffAudit11Row(slug, row as never), [], `audit 11 ${slug}`);
    }
  });

  it("the runner defaults to dry-run, uses the prod guard, keeps updatedAt, never creates/deletes, prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-12.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.match(source, /if \(dryRun\) continue;/);
    assert.match(source, /updatedAt: existing\.updatedAt/);
    assert.match(source, /`audit12: \$\{rows\} rows \/ \$\{fieldChanges\} field changes/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*\.(to|description|currentPricing)\b/);
    assert.doesNotMatch(source, /\.(create|createMany|delete|deleteMany|upsert)\(/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-12"], "tsx scripts/update-catalog-audit-12.ts");
  });

  it("the prod-guard block is the same as audit 11's", () => {
    const read = (n: number) => readFileSync(join(process.cwd(), `scripts/update-catalog-audit-${n}.ts`), "utf8");
    const guard = (s: string) => s.slice(s.indexOf("function getDirectUrl"), s.indexOf("const prisma = new PrismaClient"));
    assert.equal(guard(read(12)), guard(read(11)));
  });
});
