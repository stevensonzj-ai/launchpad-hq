import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AUDIT_3_OLD_NAMES,
  audit3NameRenames,
  rewriteNameRefs,
  type NameRename,
} from "./audit-3-refs";

const RENAMES: NameRename[] = [
  { from: "Windsurf", to: "Devin Desktop" },
  { from: "NotebookLM", to: "Gemini Notebook" },
];

describe("audit 3 name renames", () => {
  it("resolves every old name to its fact-file displayName", () => {
    const renames = audit3NameRenames();
    assert.equal(renames.length, AUDIT_3_OLD_NAMES.length);
    const byFrom = Object.fromEntries(renames.map((r) => [r.from, r.to]));
    assert.equal(byFrom["Windsurf"], "Devin Desktop");
    assert.equal(byFrom["Unriddle"], "Anara");
    assert.equal(byFrom["NotebookLM"], "Gemini Notebook");
    assert.equal(byFrom["Casetext (CoCounsel)"], "CoCounsel");
    assert.equal(byFrom["Kira Systems"], "Kira");
    assert.equal(byFrom["Wonder Dynamics (Wonder Studio)"], "Autodesk Flow Studio");
    assert.equal(byFrom["Lexis+ AI"], "Lexis+ with Protégé");
    for (const r of renames) assert.notEqual(r.from.toLowerCase(), r.to.toLowerCase());
  });

  it("never maps a new name onto another old name (no chains)", () => {
    const olds = new Set(AUDIT_3_OLD_NAMES.map((o) => o.oldName.toLowerCase()));
    for (const r of audit3NameRenames()) assert.equal(olds.has(r.to.toLowerCase()), false, r.to);
  });
});

describe("rewriteNameRefs", () => {
  it("replaces old names in place, preserving order", () => {
    const { next, changes } = rewriteNameRefs(["Cursor", "Windsurf", "GitHub Copilot"], RENAMES);
    assert.deepEqual(next, ["Cursor", "Devin Desktop", "GitHub Copilot"]);
    assert.deepEqual(changes, [{ from: "Windsurf", to: "Devin Desktop", dropped: false }]);
  });

  it("matches old names case-insensitively", () => {
    const { next, changes } = rewriteNameRefs(["windsurf", "NOTEBOOKLM"], RENAMES);
    assert.deepEqual(next, ["Devin Desktop", "Gemini Notebook"]);
    assert.equal(changes[0].from, "windsurf");
    assert.equal(changes.length, 2);
  });

  it("drops the old entry when the new name is already present", () => {
    const before = rewriteNameRefs(["Windsurf", "Cursor", "devin desktop"], RENAMES);
    assert.deepEqual(before.next, ["Cursor", "devin desktop"]);
    assert.deepEqual(before.changes, [{ from: "Windsurf", to: "Devin Desktop", dropped: true }]);

    const twice = rewriteNameRefs(["Windsurf", "windsurf"], RENAMES);
    assert.deepEqual(twice.next, ["Devin Desktop"]);
    assert.deepEqual(
      twice.changes.map((c) => c.dropped),
      [false, true],
    );
  });

  it("is idempotent: a second pass plans no changes", () => {
    const first = rewriteNameRefs(["Windsurf", "Cursor", "NotebookLM"], RENAMES);
    const second = rewriteNameRefs(first.next, RENAMES);
    assert.deepEqual(second.next, first.next);
    assert.equal(second.changes.length, 0);
  });

  it("leaves unrelated entries untouched, including their duplicates and casing", () => {
    const input = ["cursor", "Cursor", "Windsurf Pro", "Tabnine"];
    const { next, changes } = rewriteNameRefs(input, RENAMES);
    assert.deepEqual(next, input);
    assert.equal(changes.length, 0);
  });

  it("handles an empty array", () => {
    assert.deepEqual(rewriteNameRefs([], RENAMES), { next: [], changes: [] });
  });
});
