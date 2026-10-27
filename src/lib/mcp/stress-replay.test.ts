import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { snapshotRows } from "./snapshot";
import { HEAD_TO_HEAD, replayAll, replayLabelContradictions, type Grade } from "./stress-replay";

const RANK: Record<Grade, number> = { FAIL: 0, WEAK: 1, PASS: 2 };

/**
 * Offline replay of the 67 live stress calls (fix plan P1.0 / section 7).
 * Hard gates: no case grades below its live grade, no FAIL (P1.3 fixed the
 * B04/B09 data cases) and at least 55 PASS (fix plan target). The summary
 * line is what the review reports.
 */
describe("stress-1026 offline replay", () => {
  it("no case regresses below its live grade", async () => {
    const graded = await replayAll(snapshotRows());
    assert.equal(graded.length, 67);
    const counts = { PASS: 0, WEAK: 0, FAIL: 0 } as Record<Grade, number>;
    for (const g of graded) counts[g.grade]++;
    const h2h = graded.filter((g) => HEAD_TO_HEAD.includes(g.id));
    console.log(
      `replay: ${counts.PASS} PASS / ${counts.WEAK} WEAK / ${counts.FAIL} FAIL; head-to-head ${h2h.filter((g) => g.grade === "PASS").length}/10 PASS`,
    );
    for (const g of graded) if (g.grade !== "PASS") console.log(`  ${g.id} ${g.grade}: ${g.why} [${g.top.join(", ")}]`);
    const regressions = graded.filter((g) => RANK[g.grade] < RANK[g.live]).map((g) => `${g.id}: ${g.live} -> ${g.grade} (${g.why}) [${g.top.join(", ")}]`);
    assert.deepEqual(regressions, []);
    assert.deepEqual(graded.filter((g) => g.grade === "FAIL").map((g) => g.id), []);
    assert.ok(counts.PASS >= 55, `${counts.PASS} PASS`);
  });

  it("has 0 contradicting labels across the replayed responses (P1.3c)", async () => {
    const found = await replayLabelContradictions(snapshotRows());
    console.log(`replay contradicting labels: ${found.length}`);
    assert.deepEqual(found, []);
  });
});
