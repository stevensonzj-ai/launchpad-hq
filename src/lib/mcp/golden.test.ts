import assert from "node:assert/strict";
import * as fs from "fs";
import * as path from "path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { GOLDEN_QUERIES } from "./golden-queries";
import { snapshotRows } from "./snapshot";
import { searchTools } from "./tools";

/**
 * Golden top-5 (fix plan P1.0). Every query in golden-queries.ts is pinned
 * to its current top 5 on the catalog snapshot. A ranking change fails here
 * with the gained and lost slugs; if the change is intended, regenerate:
 *
 *   UPDATE_GOLDEN=1 npx tsx --test src/lib/mcp/golden.test.ts
 *
 * and explain each changed query in the PR.
 */

const GOLDEN_PATH = path.join(process.cwd(), "src", "lib", "mcp", "golden-top5.json");

function currentTop5(): Record<string, string[]> {
  const rows = snapshotRows();
  return Object.fromEntries(
    GOLDEN_QUERIES.map(({ id, input }) => [id, searchTools(input, rows, getToolFacts).results.slice(0, 5).map((r) => r.slug)]),
  );
}

describe("golden top-5 (catalog snapshot)", () => {
  it("every pinned query keeps its top 5", () => {
    const now = currentTop5();
    if (process.env.UPDATE_GOLDEN === "1") {
      const pinned = Object.fromEntries(
        GOLDEN_QUERIES.map(({ id, input }) => [id, { input, top5: now[id] }]),
      );
      fs.writeFileSync(GOLDEN_PATH, `${JSON.stringify(pinned, null, 1)}\n`);
      return;
    }
    const pinned = JSON.parse(fs.readFileSync(GOLDEN_PATH, "utf8")) as Record<string, { top5: string[] }>;
    const changes: string[] = [];
    for (const { id, input } of GOLDEN_QUERIES) {
      const was = pinned[id]?.top5;
      if (!was) {
        changes.push(`${id} (${input.task}): not pinned yet`);
        continue;
      }
      if (JSON.stringify(was) === JSON.stringify(now[id])) continue;
      const gained = now[id].filter((s) => !was.includes(s));
      const lost = was.filter((s) => !now[id].includes(s));
      changes.push(
        `${id} (${input.task}): ${was.join(",") || "-"} -> ${now[id].join(",") || "-"}` +
          (gained.length || lost.length ? ` [+${gained.join(",")} -${lost.join(",")}]` : " [order]"),
      );
    }
    assert.deepEqual(changes, [], `golden top-5 changed; rerun with UPDATE_GOLDEN=1 if intended:\n${changes.join("\n")}`);
  });
});
