import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSnapshotBranchName,
  formatSnapshotDate,
  NEON_BRANCH_NAME_MAX,
  sqlFileStem,
} from "./branch-name";

describe("snapshot branch names", () => {
  it("builds pre-<stem>-<YYYYMMDD> from the file basename in UTC", () => {
    assert.equal(sqlFileStem("scripts/sql/catalog-xwatch-20261116.sql"), "catalog-xwatch-20261116");
    assert.equal(sqlFileStem("catalog-audit-35-20261114.sql"), "catalog-audit-35-20261114");
    assert.equal(formatSnapshotDate(new Date("2026-11-16T00:30:00Z")), "20261116");
    assert.equal(
      buildSnapshotBranchName("catalog-xwatch-20261116", "20261116", []),
      "pre-catalog-xwatch-20261116-20261116",
    );
  });

  it("appends -2, -3 when the name already exists", () => {
    const first = "pre-note-20261116";
    assert.equal(buildSnapshotBranchName("note", "20261116", []), first);
    assert.equal(buildSnapshotBranchName("note", "20261116", [first]), "pre-note-20261116-2");
    assert.equal(
      buildSnapshotBranchName("note", "20261116", [first, "pre-note-20261116-2"]),
      "pre-note-20261116-3",
    );
    assert.equal(buildSnapshotBranchName("note", "20261116", ["pre-note-20261116-2"]), first);
  });

  it("truncates to Neon's 256-character limit and still fits a collision suffix", () => {
    const stem = "a".repeat(400);
    const name = buildSnapshotBranchName(stem, "20261116", []);
    assert.equal(name.length, NEON_BRANCH_NAME_MAX);
    assert.equal(NEON_BRANCH_NAME_MAX, 256);
    assert.ok(name.startsWith("pre-"));
    assert.ok(name.endsWith("-20261116"));
    const next = buildSnapshotBranchName(stem, "20261116", [name]);
    assert.equal(next.length, NEON_BRANCH_NAME_MAX);
    assert.ok(next.endsWith("-20261116-2"));
    assert.notEqual(next, name);
    const third = buildSnapshotBranchName(stem, "20261116", [name, next]);
    assert.ok(third.endsWith("-20261116-3"));
    assert.ok(third.length <= NEON_BRANCH_NAME_MAX);
  });

  it("rejects a stem or date that cannot form a branch name", () => {
    assert.throws(() => buildSnapshotBranchName("", "20261116", []), /letters/);
    assert.throws(() => buildSnapshotBranchName("has space", "20261116", []), /letters/);
    assert.throws(() => buildSnapshotBranchName("ok", "2026-11-16", []), /YYYYMMDD/);
  });
});
