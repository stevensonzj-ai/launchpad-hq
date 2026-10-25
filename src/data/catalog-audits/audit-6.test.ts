import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import {
  AUDIT_6_NAME_RENAMES,
  AUDIT_6_PATCHES,
  AUDIT_6_SLUG_RENAMES,
  CHECKED_AT,
  audit6RefUpdates,
  audit6UpdateData,
  diffAudit6,
  planSlugRename,
  preRenameSlug,
  type Audit6Row,
} from "./audit-6";

const patchFor = (slug: string) => {
  const patch = AUDIT_6_PATCHES.find((p) => p.slug === slug);
  assert.ok(patch, slug);
  return patch;
};

const staleMistral = (): Audit6Row => ({
  name: "Mistral AI (Le Chat)",
  description: "Le Chat is Mistral's assistant.",
  primaryUse: "Chat assistant (Le Chat)",
  currentPricing: "old",
  freeTierFeatures: "old",
});

describe("catalog audit 6 data", () => {
  it("dates and sources every patch and rename", () => {
    assert.equal(CHECKED_AT, "2026-10-25");
    for (const item of [...AUDIT_6_PATCHES, ...AUDIT_6_SLUG_RENAMES]) {
      assert.equal(item.checkedAt, CHECKED_AT);
      assert.ok(item.sources.length > 0);
      for (const url of item.sources) assert.match(url, /^https:\/\//);
    }
    const slugs = AUDIT_6_PATCHES.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length, "duplicate patch slug");
  });

  it("the Mistral rename agrees with the redirect, fact file and guide", () => {
    const rename = AUDIT_6_SLUG_RENAMES.find((r) => r.from === "mistral-ai-le-chat");
    assert.ok(rename);
    assert.equal(rename.to, "mistral-vibe");
    assert.equal(PLATFORM_REDIRECTS[rename.from], rename.to);
    const facts = getToolFacts(rename.to);
    assert.equal(facts?.displayName?.value, patchFor(rename.to).fields.name);
    assert.equal(facts?.status?.value.formerName, "Le Chat");
    assert.equal(getToolFacts(rename.from), undefined);
    assert.ok(getStaticTutorialForPlatform(rename.to));
    assert.equal(getStaticTutorialForPlatform(rename.from), undefined);
    for (const r of AUDIT_6_NAME_RENAMES) assert.equal(r.to, facts?.displayName?.value);
  });

  it("n8n's free option is labelled self-hosted, and Cloud as paid", () => {
    const n8n = patchFor("n8n").fields;
    assert.match(n8n.currentPricing ?? "", /Community edition: free \(you run it yourself\)/);
    assert.match(n8n.freeTierFeatures ?? "", /Free only if you self-host/);
    assert.match(n8n.freeTierFeatures ?? "", /no free plan/);
    assert.match(getToolFacts("n8n")?.freeTier?.value.summary ?? "", /Free only if you run it yourself/);
  });

  it("does not touch PlayHT's costTier (no enum value fits; masked downstream)", () => {
    const source = readFileSync(join(process.cwd(), "src/data/catalog-audits/audit-6.ts"), "utf8");
    assert.ok(!AUDIT_6_PATCHES.some((p) => p.slug === "play-ht"));
    assert.doesNotMatch(source, /costTier:\s*"/);
  });
});

describe("catalog audit 6 diff logic", () => {
  it("plans slug renames without guessing", () => {
    assert.equal(planSlugRename(true, false), "rename");
    assert.equal(planSlugRename(false, true), "done");
    assert.equal(planSlugRename(true, true), "conflict");
    assert.equal(planSlugRename(false, false), "missing");
    assert.equal(preRenameSlug("mistral-vibe"), "mistral-ai-le-chat");
    assert.equal(preRenameSlug("n8n"), "n8n");
  });

  it("patches a stale Mistral row, then is a no-op on re-run", () => {
    const patch = patchFor("mistral-vibe");
    const diffs = diffAudit6(staleMistral(), patch);
    assert.deepEqual(diffs.map((d) => d.field).sort(), ["currentPricing", "description", "freeTierFeatures", "name", "primaryUse"]);
    const after = { ...staleMistral(), ...audit6UpdateData(diffs) };
    assert.equal(after.name, "Mistral Vibe");
    assert.deepEqual(diffAudit6(after, patch), []);
  });

  it("guarded fixes skip text that already names Vibe or never named Le Chat", () => {
    const patch = patchFor("mistral-vibe");
    const row = { ...staleMistral(), description: "Mistral Vibe (formerly Le Chat) is an assistant.", primaryUse: null };
    assert.ok(!diffAudit6(row, patch).some((d) => d.field === "description" || d.field === "primaryUse"));
    const plain = { ...staleMistral(), description: "An assistant from Mistral." };
    assert.ok(!diffAudit6(plain, patch).some((d) => d.field === "description"));
  });

  it("rewrites old Mistral names in reference columns once, and only those", () => {
    const row = {
      directAlternatives: ["ChatGPT", "Mistral AI (Le Chat)", "Mistral AI"],
      complementaryTools: ["le chat"],
      budgetAlternativeTo: ["Mistral Vibe", "Le Chat"],
      privacyAlternativeTo: [],
    };
    const updates = audit6RefUpdates(row);
    const byField = Object.fromEntries(updates.map((u) => [u.field, u.to]));
    assert.deepEqual(byField.directAlternatives, ["ChatGPT", "Mistral Vibe", "Mistral AI"]);
    assert.deepEqual(byField.complementaryTools, ["Mistral Vibe"]);
    assert.deepEqual(byField.budgetAlternativeTo, ["Mistral Vibe"]);
    assert.equal(byField.privacyAlternativeTo, undefined);
    const after = { ...row, ...byField };
    assert.deepEqual(audit6RefUpdates(after), []);
  });

  it("the runner prints no field values or connection strings", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-6.ts"), "utf8");
    assert.doesNotMatch(source, /JSON\.stringify\(diff/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
  });
});
