import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  AUDIT_5_PATCHES,
  AUDIT_5_REF_EDITS,
  CHECKED_AT,
  applyRefEdits,
  audit5Slugs,
  audit5UpdateData,
  diffAudit5,
  type Audit5Patch,
  type Audit5RefEdit,
  type Audit5Row,
} from "./audit-5";

function patchFor(slug: string): Audit5Patch {
  const patch = AUDIT_5_PATCHES.find((p) => p.slug === slug);
  assert.ok(patch, slug);
  return patch;
}

function editsFor(slug: string): Audit5RefEdit[] {
  return AUDIT_5_REF_EDITS.filter((e) => e.slug === slug);
}

const EMPTY_ROW: Audit5Row = {
  currentPricing: null,
  freeTierFeatures: null,
  usageLimits: null,
  directAlternatives: [],
  complementaryTools: [],
  budgetAlternativeTo: [],
  privacyAlternativeTo: [],
};

/** The row as it looks after audit 5 has been applied to it. */
function applied(row: Audit5Row, slug: string): Audit5Row {
  const patch = AUDIT_5_PATCHES.find((p) => p.slug === slug);
  return { ...row, ...audit5UpdateData(diffAudit5(row, patch, editsFor(slug))) };
}

/** A stale row carrying every value audit 5 removes or replaces, plus the tl;dv split. */
function staleRow(): Audit5Row {
  return {
    currentPricing: "old",
    freeTierFeatures: "old",
    usageLimits: "old",
    directAlternatives: ["tl", "dv", "Sora 2", "Kakao Brain (Karlo)", "Kept"],
    complementaryTools: [
      "Adobe Sensei / Firefly in CC (design)",
      "Adobe Sensei / Firefly in CC (full suite)",
      "Adobe Sensei (post-production)",
      "Adobe Sensei (Creative Cloud)",
      "Kept",
    ],
    budgetAlternativeTo: ["Sora 2", "Kept"],
    privacyAlternativeTo: ["Kept"],
  };
}

describe("catalog audit 5 data", () => {
  it("carries https sources and the audit date on every patch", () => {
    const slugs = new Set<string>();
    assert.equal(CHECKED_AT, "2026-10-25");
    for (const patch of AUDIT_5_PATCHES) {
      assert.equal(slugs.has(patch.slug), false, `duplicate ${patch.slug}`);
      slugs.add(patch.slug);
      assert.equal(patch.checkedAt, "2026-10-25", patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      assert.ok(patch.sources.some((url) => url.startsWith("https://")), patch.slug);
      for (const url of patch.sources) assert.match(url, /^https:\/\//, patch.slug);
      assert.ok(Object.keys(patch.fields).length > 0, patch.slug);
    }
  });

  it("never mentions discontinued or retired products in patch strings", () => {
    for (const patch of AUDIT_5_PATCHES) {
      const strings = [
        patch.finding,
        patch.note ?? "",
        ...Object.values(patch.fields).flatMap((v) => (Array.isArray(v) ? v : [v ?? ""])),
      ];
      for (const banned of ["Sora 2", "Relay", "Kakao Brain", "Adobe Sensei"]) {
        for (const s of strings) assert.ok(!s.includes(banned), `${patch.slug} mentions ${banned}: ${s}`);
      }
    }
  });

  it("has no array value equal to the split halves of tl;dv", () => {
    const values = [
      ...AUDIT_5_PATCHES.flatMap((p) => p.fields.directAlternatives ?? []),
      ...AUDIT_5_REF_EDITS.flatMap((e) => (e.op === "remove" ? [e.value] : [e.from, e.to])),
    ];
    for (const value of values) assert.ok(value !== "tl" && value !== "dv", value);
    assert.ok(patchFor("tactiq").fields.directAlternatives?.includes("tl;dv"));
    assert.ok(patchFor("otter-ai").fields.directAlternatives?.includes("tl;dv"));
  });

  it("has no duplicate entries in replacement arrays", () => {
    for (const patch of AUDIT_5_PATCHES) {
      const list = patch.fields.directAlternatives ?? [];
      assert.equal(new Set(list.map((v) => v.toLowerCase())).size, list.length, patch.slug);
    }
  });

  it("lists every slug once, patches first", () => {
    const slugs = audit5Slugs();
    assert.equal(new Set(slugs).size, slugs.length);
    assert.deepEqual(
      slugs.slice(0, AUDIT_5_PATCHES.length),
      AUDIT_5_PATCHES.map((p) => p.slug),
    );
    for (const edit of AUDIT_5_REF_EDITS) assert.ok(slugs.includes(edit.slug), edit.slug);
  });
});

describe("applyRefEdits", () => {
  const remove = (value: string): Audit5RefEdit => ({ slug: "x", field: "directAlternatives", op: "remove", value });
  const replace = (from: string, to: string): Audit5RefEdit => ({
    slug: "x",
    field: "complementaryTools",
    op: "replace",
    from,
    to,
  });

  it("remove drops the value if present and is a no-op otherwise", () => {
    assert.deepEqual(applyRefEdits(["A", "Sora 2", "B"], [remove("Sora 2")]), ["A", "B"]);
    assert.deepEqual(applyRefEdits(["A", "sora 2", "Sora 2"], [remove("Sora 2")]), ["A"]);
    assert.deepEqual(applyRefEdits(["A", "B"], [remove("Sora 2")]), ["A", "B"]);
  });

  it("replace swaps in place, keeps order, and never adds the new value on its own", () => {
    assert.deepEqual(applyRefEdits(["A", "Old", "B"], [replace("Old", "New")]), ["A", "New", "B"]);
    assert.deepEqual(applyRefEdits(["A", "B"], [replace("Old", "New")]), ["A", "B"]);
    assert.deepEqual(applyRefEdits([], [replace("Old", "New")]), []);
  });

  it("replace never creates duplicates", () => {
    assert.deepEqual(applyRefEdits(["New", "Old"], [replace("Old", "New")]), ["New"]);
    assert.deepEqual(applyRefEdits(["Old", "A", "New"], [replace("Old", "New")]), ["A", "New"]);
    assert.deepEqual(applyRefEdits(["Old", "old"], [replace("Old", "New")]), ["New"]);
  });

  it("leaves unrelated entries exactly as they are", () => {
    assert.deepEqual(applyRefEdits(["dup", "dup", "Old"], [replace("Old", "New")]), ["dup", "dup", "New"]);
  });
});

describe("diffAudit5", () => {
  it("lists every patched field on an empty row", () => {
    const patch = patchFor("tactiq");
    const fields = diffAudit5(EMPTY_ROW, patch, []).map((d) => d.field).sort();
    assert.deepEqual(fields, Object.keys(patch.fields).sort());
  });

  it("fixes the tl;dv split by replacing directAlternatives wholesale", () => {
    const row: Audit5Row = { ...EMPTY_ROW, directAlternatives: ["tl", "dv", "Otter AI"] };
    const after = applied(row, "tactiq");
    assert.deepEqual(after.directAlternatives, ["tl;dv", "Otter AI", "Zoom AI Companion"]);
    assert.ok(!after.directAlternatives.includes("tl") && !after.directAlternatives.includes("dv"));
  });

  it("applies every ref edit to a stale row and leaves other entries alone", () => {
    const pika = applied(staleRow(), "pika");
    assert.deepEqual(pika.directAlternatives, ["tl", "dv", "Kakao Brain (Karlo)", "Kept"]);
    assert.deepEqual(pika.budgetAlternativeTo, ["Kept"]);
    assert.equal(pika.currentPricing, "old");

    const acrobat = applied(staleRow(), "adobe-acrobat-ai-assistant");
    assert.equal(acrobat.complementaryTools[0], "Adobe Firefly (design)");
    assert.equal(acrobat.complementaryTools.length, 5);

    const topaz = applied(staleRow(), "topaz-labs");
    assert.ok(topaz.complementaryTools.includes("Adobe Firefly (Creative Cloud)"));
    assert.ok(!topaz.complementaryTools.includes("Adobe Sensei (Creative Cloud)"));

    const runway = applied(staleRow(), "runway");
    assert.ok(!runway.directAlternatives.includes("Sora 2"));
    assert.ok(!runway.complementaryTools.includes("Adobe Sensei (post-production)"));

    const naver = applied(staleRow(), "naver-hyperclova-x-cue");
    assert.ok(!naver.directAlternatives.includes("Kakao Brain (Karlo)"));
  });

  it("is a no-op once applied, so re-runs change nothing", () => {
    for (const slug of audit5Slugs()) {
      const patch = AUDIT_5_PATCHES.find((p) => p.slug === slug);
      for (const start of [EMPTY_ROW, staleRow()]) {
        const after = applied(start, slug);
        assert.deepEqual(diffAudit5(after, patch, editsFor(slug)), [], slug);
      }
    }
  });

  it("leaves every applied reference array free of duplicates", () => {
    for (const slug of audit5Slugs()) {
      const after = applied(staleRow(), slug);
      for (const list of [after.complementaryTools, after.budgetAlternativeTo]) {
        assert.equal(new Set(list.map((v) => v.toLowerCase())).size, list.length, slug);
      }
    }
  });

  it("returns no diffs for a row that has none of the edited values", () => {
    const row: Audit5Row = { ...EMPTY_ROW, directAlternatives: ["Kling"], complementaryTools: ["CapCut"] };
    assert.deepEqual(diffAudit5(row, undefined, editsFor("runway")), []);
  });

  it("puts only differing fields in the update data", () => {
    const patch = patchFor("claude");
    const row: Audit5Row = { ...EMPTY_ROW, currentPricing: patch.fields.currentPricing ?? null };
    assert.deepEqual(Object.keys(audit5UpdateData(diffAudit5(row, patch, []))).sort(), [
      "freeTierFeatures",
      "usageLimits",
    ]);
  });
});

describe("seed files agree with audit 5", () => {
  const SEEDS: Record<string, string> = {
    claude: "scripts/seed-missing-platforms.ts",
  };
  const SEED_FILES = [
    "scripts/seed-missing-platforms.ts",
    "scripts/seed-batch2-platforms.ts",
    "scripts/seed-batch3-platforms.ts",
    "scripts/seed-phase1-batch1-platforms.ts",
  ];

  it("carries the same text, so a fresh seed matches the database", () => {
    for (const [slug, file] of Object.entries(SEEDS)) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      for (const [field, value] of Object.entries(patchFor(slug).fields)) {
        const literal = Array.isArray(value)
          ? `[${value.map((v) => JSON.stringify(v)).join(", ")}]`
          : JSON.stringify(value);
        assert.ok(source.includes(literal), `${file} is missing ${slug}.${field}`);
      }
    }
  });

  it("has no seed for the rows audit 5 touches without one, and no seed carries a removed reference", () => {
    for (const file of SEED_FILES) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      for (const slug of audit5Slugs()) {
        if (SEEDS[slug] === file) continue;
        assert.ok(!source.includes(`slug: "${slug}"`), `${slug} is seeded in ${file}; add it to SEEDS`);
      }
      for (const edit of AUDIT_5_REF_EDITS) {
        const old = edit.op === "remove" ? edit.value : edit.from;
        assert.ok(!source.includes(JSON.stringify(old)), `${file} still carries ${old}`);
      }
      assert.ok(!/"tl",\s*"dv"/.test(source), `${file} splits tl;dv`);
    }
  });
});
