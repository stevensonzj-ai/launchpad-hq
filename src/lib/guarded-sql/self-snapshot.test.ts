import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEFAULT_NEON_PROJECT_ID, PRODUCTION_BRANCH_ID } from "./snapshot";
import { createPreRunSnapshot, SnapshotSetupError, type NeonFetch } from "./self-snapshot";

const NOW = new Date("2026-11-16T18:04:00Z");
const FILE = "scripts/sql/catalog-xwatch-20261116.sql";
const EXPECTED_NAME = "pre-catalog-xwatch-20261116-20261116";
const PROD_KEY = "napi_prodkeyvalue123";
const TEST_KEY = "napi_testkeyvalue123";
const TEST_PROJECT = "launchpad-test-001";
const TEST_PRIMARY = "br-test-primary-aaaa";

interface Call {
  url: string;
  method?: string;
  body?: string;
  auth?: string;
}

function install(opts: {
  primaryId: string;
  existing?: string[];
  createState?: string;
  getState?: string | (() => string);
  postStatus?: number;
  paginate?: boolean;
}): { fetchFn: NeonFetch; calls: Call[] } {
  const calls: Call[] = [];
  let gets = 0;
  const fetchFn: NeonFetch = async (url, init) => {
    calls.push({ url, method: init?.method, body: init?.body, auth: init?.headers?.Authorization });
    const method = init?.method ?? "GET";
    if (method === "POST") {
      const payload = JSON.parse(init?.body || "{}") as { branch?: { name?: string; parent_id?: string }; endpoints?: unknown };
      const status = opts.postStatus ?? 201;
      return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => ({
          branch: {
            id: "br-created-snap-01",
            name: payload.branch?.name,
            parent_id: payload.branch?.parent_id,
            current_state: opts.createState ?? "ready",
          },
          connection_uris: ["postgresql://role:supersecret@ep-created.neon.tech/neondb"],
          roles: [{ name: "role", password: "supersecret" }],
        }),
      };
    }
    if (/\/branches\/br-[a-z0-9-]+$/.test(url)) {
      gets++;
      const state = typeof opts.getState === "function" ? opts.getState() : (opts.getState ?? "ready");
      return {
        ok: true,
        status: 200,
        json: async () => ({
          branch: {
            id: url.slice(url.lastIndexOf("/") + 1),
            parent_id: opts.primaryId,
            current_state: gets < 2 && opts.createState === "init" ? "init" : state,
          },
        }),
      };
    }
    const cursor = new URL(url).searchParams.get("cursor");
    if (opts.paginate && !cursor) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          branches: [{ id: "br-other-page-111", name: "unrelated", primary: false, default: false }],
          pagination: { cursor: "page-2" },
        }),
      };
    }
    const rows = [
      { id: opts.primaryId, name: "main", primary: true, default: true, current_state: "ready" },
      ...(opts.existing ?? []).map((name, i) => ({
        id: `br-old-name-${i}`,
        name,
        primary: false,
        default: false,
      })),
    ];
    return { ok: true, status: 200, json: async () => ({ branches: rows, pagination: {} }) };
  };
  return { fetchFn, calls };
}

async function refused(run: () => Promise<unknown>): Promise<string> {
  try {
    await run();
  } catch (err) {
    assert.ok(err instanceof SnapshotSetupError);
    return err.message;
  }
  assert.fail("expected a refusal");
}

describe("createPreRunSnapshot", () => {
  it("fails fast when NEON_PROD_API_KEY is missing and does not call Neon", async () => {
    let called = false;
    const reason = await refused(() =>
      createPreRunSnapshot({
        target: "production",
        sqlFile: FILE,
        now: NOW,
        env: {},
        fetchFn: async () => {
          called = true;
          throw new Error("should not be called");
        },
      }),
    );
    assert.match(reason, /NEON_PROD_API_KEY/);
    assert.equal(called, false);
    assert.ok(!reason.includes("napi_"));
  });

  it("fails fast when the test key or TEST_PROJECT_ID is missing", async () => {
    const fetchFn: NeonFetch = async () => {
      throw new Error("should not be called");
    };
    assert.match(
      await refused(() =>
        createPreRunSnapshot({
          target: "test",
          sqlFile: FILE,
          now: NOW,
          env: { TEST_PROJECT_ID: TEST_PROJECT },
          fetchFn,
        }),
      ),
      /NEON_API_KEY/,
    );
    assert.match(
      await refused(() =>
        createPreRunSnapshot({
          target: "test",
          sqlFile: FILE,
          now: NOW,
          env: { NEON_API_KEY: TEST_KEY },
          fetchFn,
        }),
      ),
      /TEST_PROJECT_ID/,
    );
  });

  it("creates a production branch from the production primary with no compute endpoint", async () => {
    const neon = install({ primaryId: PRODUCTION_BRANCH_ID });
    const snap = await createPreRunSnapshot({
      target: "production",
      sqlFile: FILE,
      now: NOW,
      env: { NEON_PROD_API_KEY: PROD_KEY, NEON_API_KEY: "napi_notusedforthecreate" },
      fetchFn: neon.fetchFn,
    });
    assert.equal(snap.branchId, "br-created-snap-01");
    assert.equal(snap.name, EXPECTED_NAME);
    assert.equal(snap.parentId, PRODUCTION_BRANCH_ID);
    assert.equal(snap.projectId, DEFAULT_NEON_PROJECT_ID);
    assert.equal(snap.keySlot, "prod");
    const post = neon.calls.find((c) => c.method === "POST");
    assert.ok(post);
    assert.equal(post.auth, `Bearer ${PROD_KEY}`);
    assert.equal(
      post.url,
      `https://console.neon.tech/api/v2/projects/${DEFAULT_NEON_PROJECT_ID}/branches`,
    );
    const body = JSON.parse(post.body || "{}") as { branch: { name: string; parent_id: string }; endpoints?: unknown };
    assert.equal(body.branch.name, EXPECTED_NAME);
    assert.equal(body.branch.parent_id, PRODUCTION_BRANCH_ID);
    assert.equal("endpoints" in body, false);
    assert.equal(neon.calls.some((c) => c.method === "GET" && c.url.includes("/branches/br-created")), false);
    const leaked = JSON.stringify(snap);
    assert.ok(!leaked.includes("supersecret"));
    assert.ok(!leaked.includes(PROD_KEY));
  });

  it("suffixes the name when the branch already exists", async () => {
    const neon = install({ primaryId: PRODUCTION_BRANCH_ID, existing: [EXPECTED_NAME, `${EXPECTED_NAME}-2`] });
    const snap = await createPreRunSnapshot({
      target: "production",
      sqlFile: FILE,
      now: NOW,
      env: { NEON_PROD_API_KEY: PROD_KEY },
      fetchFn: neon.fetchFn,
    });
    assert.equal(snap.name, `${EXPECTED_NAME}-3`);
  });

  it("waits until the new branch is ready", async () => {
    let reads = 0;
    const neon = install({
      primaryId: PRODUCTION_BRANCH_ID,
      createState: "init",
      getState: () => (reads++ === 0 ? "init" : "ready"),
    });
    let slept = 0;
    const snap = await createPreRunSnapshot({
      target: "production",
      sqlFile: FILE,
      now: NOW,
      env: { NEON_PROD_API_KEY: PROD_KEY },
      fetchFn: neon.fetchFn,
      sleep: async () => {
        slept++;
      },
      pollIntervalMs: 1,
    });
    assert.equal(snap.branchId, "br-created-snap-01");
    assert.ok(slept >= 1);
    assert.ok(neon.calls.some((c) => c.method === "GET" && c.url.endsWith("/branches/br-created-snap-01")));
  });

  it("refuses when the branch never becomes ready, without echoing the API key", async () => {
    const neon = install({ primaryId: PRODUCTION_BRANCH_ID, createState: "init", getState: "init" });
    const reason = await refused(() =>
      createPreRunSnapshot({
        target: "production",
        sqlFile: FILE,
        now: NOW,
        env: { NEON_PROD_API_KEY: PROD_KEY },
        fetchFn: neon.fetchFn,
        sleep: async () => undefined,
        maxPolls: 1,
      }),
    );
    assert.match(reason, /not ready/);
    assert.ok(!reason.includes(PROD_KEY));
  });

  it("finds the primary branch on a later list page and snapshots the test project", async () => {
    const neon = install({ primaryId: TEST_PRIMARY, paginate: true });
    const snap = await createPreRunSnapshot({
      target: "test",
      sqlFile: FILE,
      now: NOW,
      env: { NEON_API_KEY: TEST_KEY, TEST_PROJECT_ID: TEST_PROJECT },
      fetchFn: neon.fetchFn,
    });
    assert.equal(snap.projectId, TEST_PROJECT);
    assert.equal(snap.parentId, TEST_PRIMARY);
    assert.equal(snap.keySlot, "test");
    assert.ok(neon.calls.some((c) => c.url.includes("cursor=page-2")));
    const post = neon.calls.find((c) => c.method === "POST");
    assert.equal(post?.auth, `Bearer ${TEST_KEY}`);
    assert.match(post?.url ?? "", new RegExp(`/projects/${TEST_PROJECT}/branches$`));
  });

  it("refuses to snapshot production when the primary is not the production branch", async () => {
    const neon = install({ primaryId: TEST_PRIMARY });
    const reason = await refused(() =>
      createPreRunSnapshot({
        target: "production",
        sqlFile: FILE,
        now: NOW,
        env: { NEON_PROD_API_KEY: PROD_KEY },
        fetchFn: neon.fetchFn,
      }),
    );
    assert.match(reason, /production branch/);
    assert.equal(neon.calls.some((c) => c.method === "POST"), false);
  });

  it("does not put a connection string or the API key in an API error", async () => {
    const fetchFn: NeonFetch = async () => {
      throw new Error(`connect postgresql://role:${PROD_KEY}@ep-x.neon.tech/db bearer ${PROD_KEY}`);
    };
    const reason = await refused(() =>
      createPreRunSnapshot({
        target: "production",
        sqlFile: FILE,
        now: NOW,
        env: { NEON_PROD_API_KEY: PROD_KEY },
        fetchFn,
      }),
    );
    assert.match(reason, /Neon API request failed/);
    assert.ok(!reason.includes(PROD_KEY));
    assert.ok(!reason.includes("postgresql://"));
  });
});
