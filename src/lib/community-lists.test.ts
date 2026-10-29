import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  COMMUNITY_REVALIDATE_SECONDS,
  PRIVATE_NO_STORE,
  communityKeyParts,
  communityListTags,
  communityTag,
  dbWakeLine,
  expireIfCreatedApproved,
  expireModerated,
  handleCommunityList,
  moderationTags,
  normalizeListParams,
  privateNoStore,
  type CommunityListDeps,
  type ListParams,
} from "./community-lists";
import { PUBLIC_HOURLY_CACHE } from "./public-data/http";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

type Row = { id: string; status: "APPROVED" | "PENDING" | "REJECTED"; platform: string };

const ROWS: Row[] = [
  { id: "a1", status: "APPROVED", platform: "chatgpt" },
  { id: "p1", status: "PENDING", platform: "chatgpt" },
  { id: "r1", status: "REJECTED", platform: "chatgpt" },
  { id: "a2", status: "APPROVED", platform: "chatgpt" },
];

/** A data cache that memoizes by key and records what was stored, plus an approved-only reader. */
function fakeDeps(rows: Row[] = ROWS) {
  const store = new Map<string, { tags: string[]; value: unknown }>();
  const logs: string[] = [];
  let reads = 0;
  const deps: CommunityListDeps<{ id: string }> = {
    async cache(keyParts, tags, load) {
      const key = JSON.stringify(keyParts);
      const hit = store.get(key);
      if (hit) return hit.value as never;
      const value = await load();
      store.set(key, { tags, value });
      return value;
    },
    async read(slug: string, { page, pageSize }: ListParams) {
      reads += 1;
      if (slug === "missing") return null;
      const approved = rows.filter((r) => r.platform === slug && r.status === "APPROVED");
      return {
        items: approved.slice((page - 1) * pageSize, page * pageSize).map(({ id }) => ({ id })),
        totalCount: approved.length,
      };
    },
    log: (line) => logs.push(line),
  };
  return { deps, store, logs, reads: () => reads };
}

function get(path: string, headers: Record<string, string> = {}) {
  return new Request(`https://launchpadhq.io${path}`, { headers });
}

describe("list params and cache keys", () => {
  it("defaults, clamps and ignores garbage", () => {
    const n = (q: string) => normalizeListParams(new URLSearchParams(q));
    assert.deepEqual(n(""), { page: 1, pageSize: 20 });
    assert.deepEqual(n("page=0&pageSize=0"), { page: 1, pageSize: 20 });
    assert.deepEqual(n("page=-3&pageSize=-1"), { page: 1, pageSize: 20 });
    assert.deepEqual(n("page=abc&pageSize=1e9"), { page: 1, pageSize: 1 });
    assert.deepEqual(n("page=2&pageSize=500"), { page: 2, pageSize: 100 });
    assert.deepEqual(n("page=99999"), { page: 1000, pageSize: 20 });
    assert.deepEqual(n("page=3.7&pageSize=10"), { page: 3, pageSize: 10 });
  });

  it("equivalent queries share one key; different slugs, kinds and pages do not", () => {
    const key = (kind: "prompts" | "discussions", slug: string, q: string) =>
      JSON.stringify(communityKeyParts(kind, slug, normalizeListParams(new URLSearchParams(q))));
    assert.equal(key("prompts", "chatgpt", ""), key("prompts", "chatgpt", "page=1&pageSize=20"));
    assert.equal(key("prompts", "chatgpt", "page=0"), key("prompts", "chatgpt", "page=junk&utm_source=x"));
    assert.notEqual(key("prompts", "chatgpt", ""), key("discussions", "chatgpt", ""));
    assert.notEqual(key("prompts", "chatgpt", ""), key("prompts", "claude", ""));
    assert.notEqual(key("prompts", "chatgpt", "page=2"), key("prompts", "chatgpt", ""));
    assert.notEqual(key("prompts", "chatgpt", "pageSize=50"), key("prompts", "chatgpt", ""));
  });

  it("tags each entry per platform, plus catalog; one hour TTL", () => {
    assert.equal(COMMUNITY_REVALIDATE_SECONDS, 3600);
    assert.equal(communityTag("prompts", "chatgpt"), "platform-prompts:chatgpt");
    assert.equal(communityTag("discussions", "chatgpt"), "platform-discussions:chatgpt");
    assert.deepEqual(communityListTags("prompts", "chatgpt"), ["platform-prompts:chatgpt", "catalog"]);
  });

  it("the Next cache wrapper keys by generation and uses the tags and TTL above", () => {
    const src = read("src/lib/community-cache.ts");
    assert.match(src, /unstable_cache\(read, \[cacheGeneration\(\), \.\.\.keyParts\]/);
    assert.match(src, /revalidate: COMMUNITY_REVALIDATE_SECONDS/);
    assert.match(src, /revalidateTag\(tag, \{ expire: 0 \}\)/);
  });
});

describe("GET handler", () => {
  it("serves approved rows only, with the public hourly header", async () => {
    const { deps, store } = fakeDeps();
    const res = await handleCommunityList(get("/api/platforms/chatgpt/prompts"), "prompts", "chatgpt", deps);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("Cache-Control"), PUBLIC_HOURLY_CACHE);
    const body = await res.json();
    assert.deepEqual(body, { items: [{ id: "a1" }, { id: "a2" }], totalCount: 2, page: 1, pageSize: 20 });
    // Nothing pending or rejected reached the cache.
    const cached = JSON.stringify([...store.values()]);
    assert.doesNotMatch(cached, /p1|r1/);
  });

  it("the response is identical with or without a session cookie (no visitor input)", async () => {
    const { deps } = fakeDeps();
    const anon = await handleCommunityList(get("/api/platforms/chatgpt/prompts"), "prompts", "chatgpt", deps);
    const signedIn = await handleCommunityList(
      get("/api/platforms/chatgpt/prompts", { cookie: "__session=abc", authorization: "Bearer x" }),
      "prompts",
      "chatgpt",
      deps,
    );
    assert.equal(await anon.text(), await signedIn.text());
    assert.equal(signedIn.headers.get("Cache-Control"), PUBLIC_HOURLY_CACHE);
  });

  it("reads and logs once per key; hits never touch the database", async () => {
    const { deps, logs, reads } = fakeDeps();
    const ua = { "user-agent": "Mozilla/5.0 (Test)" };
    await handleCommunityList(get("/api/platforms/chatgpt/prompts", ua), "prompts", "chatgpt", deps);
    await handleCommunityList(get("/api/platforms/chatgpt/prompts?page=1&pageSize=20", ua), "prompts", "chatgpt", deps);
    await handleCommunityList(get("/api/platforms/chatgpt/prompts", { "user-agent": "Other" }), "prompts", "chatgpt", deps);
    assert.equal(reads(), 1);
    assert.deepEqual(logs, ["[db-wake] GET /api/platforms/chatgpt/prompts ua=Mozilla/5.0 (Test)"]);
    await handleCommunityList(get("/api/platforms/chatgpt/discussions?page=2"), "discussions", "chatgpt", deps);
    assert.equal(reads(), 2);
  });

  it("stores entries under per-platform tags", async () => {
    const { deps, store } = fakeDeps();
    await handleCommunityList(get("/api/platforms/chatgpt/discussions"), "discussions", "chatgpt", deps);
    assert.deepEqual([...store.values()][0].tags, ["platform-discussions:chatgpt", "catalog"]);
  });

  it("echoes normalized paging", async () => {
    const { deps } = fakeDeps();
    const res = await handleCommunityList(
      get("/api/platforms/chatgpt/prompts?page=2&pageSize=1"),
      "prompts",
      "chatgpt",
      deps,
    );
    assert.deepEqual(await res.json(), { items: [{ id: "a2" }], totalCount: 2, page: 2, pageSize: 1 });
  });

  it("404s an unknown platform with no-store, and caches the miss", async () => {
    const { deps, reads } = fakeDeps();
    for (let i = 0; i < 2; i++) {
      const res = await handleCommunityList(get("/api/platforms/missing/prompts"), "prompts", "missing", deps);
      assert.equal(res.status, 404);
      assert.equal(res.headers.get("Cache-Control"), "no-store");
    }
    assert.equal(reads(), 1);
  });
});

describe("db-wake log line", () => {
  it("has method, path and a truncated UA, and nothing else", () => {
    const long = "x".repeat(200);
    const line = dbWakeLine("GET", "/api/platforms/chatgpt/prompts", long);
    assert.equal(line, `[db-wake] GET /api/platforms/chatgpt/prompts ua=${"x".repeat(80)}`);
    assert.equal(dbWakeLine("GET", "/p", null), "[db-wake] GET /p ua=");
    assert.equal(dbWakeLine("GET", "/p", "bot\r\n[db-wake] fake"), "[db-wake] GET /p ua=bot  [db-wake] fake");
  });
});

describe("private responses", () => {
  it("privateNoStore overrides any earlier Cache-Control", () => {
    const res = privateNoStore(new Response("{}", { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } }));
    assert.equal(res.headers.get("Cache-Control"), PRIVATE_NO_STORE);
    assert.equal(PRIVATE_NO_STORE, "private, no-store");
  });
});

describe("tag expiry on moderation and creation", () => {
  function recorder() {
    const expired: string[] = [];
    return { expired, expire: (tag: string) => void expired.push(tag) };
  }

  it("a moderated prompt (approve or reject, same path) expires its list and the page row (tab counts)", () => {
    const { expired, expire } = recorder();
    const result = expireModerated("prompt", "chatgpt", expire);
    assert.deepEqual(expired, ["platform-prompts:chatgpt", "platform:chatgpt"]);
    assert.equal(result.error, null);
  });

  it("discussions expire their list and page row; replies only the discussion list", () => {
    assert.deepEqual(moderationTags("discussion", "claude"), ["platform-discussions:claude", "platform:claude"]);
    assert.deepEqual(moderationTags("reply", "claude"), ["platform-discussions:claude"]);
  });

  it("no slug, no expiry; a throwing expire is returned, not thrown", () => {
    const { expired, expire } = recorder();
    assert.deepEqual(expireModerated("prompt", null, expire), { tags: [], error: null });
    assert.deepEqual(expired, []);
    const boom = new Error("boom");
    const result = expireModerated("prompt", "chatgpt", () => {
      throw boom;
    });
    assert.equal(result.error, boom);
  });

  it("creation expires only when the row is already APPROVED (submissions are PENDING)", () => {
    const pending = recorder();
    assert.deepEqual(expireIfCreatedApproved("prompt", "PENDING", "chatgpt", pending.expire).tags, []);
    assert.deepEqual(pending.expired, []);
    const approved = recorder();
    expireIfCreatedApproved("discussion", "APPROVED", "chatgpt", approved.expire);
    assert.deepEqual(approved.expired, ["platform-discussions:chatgpt", "platform:chatgpt"]);
  });
});

describe("route wiring (source level)", () => {
  const routes = {
    prompts: read("src/app/api/platforms/[slug]/prompts/route.ts"),
    discussions: read("src/app/api/platforms/[slug]/discussions/route.ts"),
  };

  it("GET goes through the cached handler and reads no auth", () => {
    for (const [kind, src] of Object.entries(routes)) {
      const getHandler = src.slice(src.indexOf("export async function GET"), src.indexOf("export async function POST"));
      assert.match(getHandler, new RegExp(`handleCommunityList\\(request, "${kind}", slug`), kind);
      assert.match(getHandler, /cache: cachedCommunityRead/, kind);
      assert.match(getHandler, /console\.info\(line\)/, kind);
      assert.doesNotMatch(getHandler, /getOrCreateDbUser|auth\(|cookies\(|headers\(|prisma\./, kind);
    }
  });

  it("every POST response is private, no-store and creation checks for APPROVED", () => {
    for (const [kind, src] of Object.entries(routes)) {
      assert.match(src, /return privateNoStore\(await create(Prompt|Discussion)\(request, context\)\);/, kind);
      assert.match(src, /expireIfCreatedApproved\("(prompt|discussion)", created\.status, slug, expireTag\)/, kind);
    }
  });

  it("the cached reads filter every query to APPROVED and never touch the visitor", () => {
    const src = read("src/lib/community-queries.ts");
    assert.equal(src.match(/status: ModerationStatus\.APPROVED/g)?.length, 3);
    assert.doesNotMatch(src, /PENDING|REJECTED|@clerk|auth-db|getOrCreateDbUser|cookies\(\)|headers\(\)|email|userId/);
  });

  it("moderation expires the platform's tags after the status write, and is private, no-store", () => {
    const src = read("src/app/api/moderation/route.ts");
    const post = src.slice(src.indexOf("export async function POST"));
    assert.ok(post.indexOf("writeStatus(") < post.indexOf("expireModerated(kind, slug, expireTag)"));
    assert.match(src, /"Cache-Control": PRIVATE_NO_STORE/);
  });
});
