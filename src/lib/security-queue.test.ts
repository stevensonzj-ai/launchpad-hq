import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { MAX_REPLIES_PER_DISCUSSION } from "@/lib/community-queries";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

describe("security queue 2026-10-30 (L-a, L-b)", () => {
  it("L-a: the rating read happens inside the transaction, after a row lock, with a P2002 retry", () => {
    const src = read("src/app/api/prompts/[id]/rate/route.ts");
    const tx = src.indexOf("prisma.$transaction");
    const lock = src.indexOf("FOR UPDATE");
    const existing = src.indexOf("tx.promptRating.findUnique");
    assert.ok(tx > 0 && lock > tx && existing > lock, "lock then read inside the transaction");
    assert.doesNotMatch(src, /prisma\.promptRating\.findFirst/, "no read outside the transaction");
    assert.match(src, /"P2002"/);
  });

  it("L-b: nested discussion replies are bounded", () => {
    assert.equal(MAX_REPLIES_PER_DISCUSSION, 50);
    assert.match(read("src/lib/community-queries.ts"), /take: MAX_REPLIES_PER_DISCUSSION/);
  });
});
