import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifySnapshot, type FetchLike, type SnapshotCheckInput } from "./snapshot";

const PROD_BRANCH = "br-fake-prod-000000";
const NOW = new Date("2026-11-03T16:00:00Z");

function branchResponse(branch: Record<string, unknown>, status = 200): FetchLike {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => ({ branch }) });
}
function base(over: Partial<SnapshotCheckInput> = {}): SnapshotCheckInput {
  return {
    snapshotId: "br-snap-111111",
    apiKey: "napi_testkey123",
    projectId: "proj-test",
    productionBranchId: PROD_BRANCH,
    maxAgeHours: 24,
    now: NOW,
    fetchFn: branchResponse({ id: "br-snap-111111", parent_id: PROD_BRANCH, created_at: "2026-11-03T10:00:00Z" }),
    ...over,
  };
}
const refusal = async (over: Partial<SnapshotCheckInput>) => {
  const r = await verifySnapshot(base(over));
  assert.equal(r.ok, false);
  return r.ok ? "" : r.reason;
};

describe("verifySnapshot", () => {
  it("accepts a fresh direct child of production", async () => {
    assert.deepEqual(await verifySnapshot(base()), { ok: true });
  });
  it("calls the expected URL with a bearer header", async () => {
    let seen: { url: string; auth?: string } | null = null;
    await verifySnapshot(
      base({
        fetchFn: async (url, init) => {
          seen = { url, auth: init?.headers?.Authorization };
          return { ok: true, status: 200, json: async () => ({ branch: { id: "br-snap-111111", parent_id: PROD_BRANCH, created_at: NOW.toISOString() } }) };
        },
      }),
    );
    assert.deepEqual(seen, {
      url: "https://console.neon.tech/api/v2/projects/proj-test/branches/br-snap-111111",
      auth: "Bearer napi_testkey123",
    });
  });
  it("refuses wrong parent", async () => {
    const reason = await refusal({
      fetchFn: branchResponse({ id: "br-snap-111111", parent_id: "br-other-999", created_at: NOW.toISOString() }),
    });
    assert.match(reason, /direct child/);
  });
  it("refuses a stale snapshot", async () => {
    const reason = await refusal({
      fetchFn: branchResponse({ id: "br-snap-111111", parent_id: PROD_BRANCH, created_at: "2026-11-01T00:00:00Z" }),
    });
    assert.match(reason, /old/);
  });
  it("respects a custom max age", async () => {
    const f = branchResponse({ id: "br-snap-111111", parent_id: PROD_BRANCH, created_at: "2026-11-03T10:00:00Z" });
    assert.equal((await verifySnapshot(base({ fetchFn: f, maxAgeHours: 2 }))).ok, false);
    assert.equal((await verifySnapshot(base({ fetchFn: f, maxAgeHours: 7 }))).ok, true);
  });
  it("refuses when the snapshot id is the production branch", async () => {
    let called = false;
    const reason = await refusal({
      snapshotId: PROD_BRANCH,
      fetchFn: async () => {
        called = true;
        return { ok: true, status: 200, json: async () => ({}) };
      },
    });
    assert.match(reason, /production branch itself/);
    assert.equal(called, false);
  });
  it("refuses on 404, other non-200, API throw, bad JSON, missing key", async () => {
    assert.match(await refusal({ fetchFn: branchResponse({}, 404) }), /404/);
    assert.match(await refusal({ fetchFn: branchResponse({}, 500) }), /500/);
    assert.match(
      await refusal({
        fetchFn: async () => {
          throw new Error("network down napi_testkey123");
        },
      }),
      /request failed/,
    );
    assert.match(
      await refusal({
        fetchFn: async () => ({
          ok: true,
          status: 200,
          json: async () => {
            throw new SyntaxError("bad");
          },
        }),
      }),
      /invalid JSON/,
    );
    assert.match(await refusal({ apiKey: undefined }), /NEON_API_KEY/);
  });
  it("never leaks the API key into a reason", async () => {
    const reason = await refusal({
      fetchFn: async () => {
        throw new Error("boom Bearer napi_testkey123");
      },
    });
    assert.ok(!reason.includes("napi_testkey123"));
  });
  it("refuses malformed ids", async () => {
    assert.match(await refusal({ snapshotId: "../x?y" }), /invalid format/);
  });
});
