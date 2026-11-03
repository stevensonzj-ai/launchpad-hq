import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkInputs, classifyTables, GuardError, isUserTable, parseNeonUrl, redact, verifyTargetProject, type FetchLike,
} from "./guard";

const PREVIEW = "postgresql://launchpad_ro:pw123456@ep-nameless-mud-ajlqrb02-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require";
const TEST = "postgresql://neondb_owner:pw654321@ep-fresh-test-abc123.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require";
const PROD = "postgresql://neondb_owner:pw654321@ep-odd-mud-ajdk8f99-pooler.c-3.us-east-2.aws.neon.tech/neondb";

describe("parseNeonUrl", () => {
  it("extracts endpoint id without -pooler", () => {
    assert.equal(parseNeonUrl(PREVIEW, "x").endpointId, "ep-nameless-mud-ajlqrb02");
  });
  it("errors never echo the URL", () => {
    try { parseNeonUrl("postgres://u:secretpw@localhost/db", "X"); assert.fail(); }
    catch (e) { assert.ok(e instanceof GuardError); assert.ok(!String((e as Error).message).includes("secretpw")); }
  });
});

describe("checkInputs", () => {
  it("accepts preview -> fresh test endpoint", () => {
    const r = checkInputs({ previewUrl: PREVIEW, testUrl: TEST, testProjectId: "launchpad-test-1" });
    assert.equal(r.target.endpointId, "ep-fresh-test-abc123");
  });
  it("refuses the production endpoint as target", () => {
    assert.throws(() => checkInputs({ previewUrl: PREVIEW, testUrl: PROD, testProjectId: "t" }), /production project/);
  });
  it("refuses any production-project endpoint (preview, snapshot, dev-local) as target", () => {
    for (const ep of ["ep-nameless-mud-ajlqrb02", "ep-twilight-mountain-ajp58gg4", "ep-hidden-truth-aj8wfxc2"]) {
      const u = `postgresql://o:p@${ep}.c-3.us-east-2.aws.neon.tech/neondb`;
      assert.throws(() => checkInputs({ previewUrl: PREVIEW, testUrl: u, testProjectId: "t" }), GuardError);
    }
  });
  it("refuses the production project id", () => {
    assert.throws(() => checkInputs({ previewUrl: PREVIEW, testUrl: TEST, testProjectId: "billowing-river-00654156" }), /production project/);
  });
  it("refuses a source that is not preview or not launchpad_ro", () => {
    assert.throws(() => checkInputs({ previewUrl: PROD, testUrl: TEST, testProjectId: "t" }), /preview endpoint/);
    const owner = PREVIEW.replace("launchpad_ro", "neondb_owner");
    assert.throws(() => checkInputs({ previewUrl: owner, testUrl: TEST, testProjectId: "t" }), /launchpad_ro/);
  });
  it("refuses missing inputs", () => {
    assert.throws(() => checkInputs({ previewUrl: undefined, testUrl: TEST, testProjectId: "t" }), /PREVIEW_RO_URL is not set/);
    assert.throws(() => checkInputs({ previewUrl: PREVIEW, testUrl: "", testProjectId: "t" }), /TEST_PROJECT_URL is not set/);
    assert.throws(() => checkInputs({ previewUrl: PREVIEW, testUrl: TEST, testProjectId: "" }), /TEST_PROJECT_ID/);
  });
});

function fakeFetch(map: Record<string, { status: number; ids?: string[] }>): FetchLike {
  return async (url) => {
    const pid = url.split("/projects/")[1]!.split("/")[0]!;
    const hit = map[pid] ?? { status: 404 };
    return { ok: hit.status === 200, status: hit.status, json: async () => ({ endpoints: (hit.ids ?? []).map((id) => ({ id })) }) };
  };
}

describe("verifyTargetProject", () => {
  const r = checkInputs({ previewUrl: PREVIEW, testUrl: TEST, testProjectId: "lp-test" });
  it("passes when the endpoint is in the test project and prod is unreadable (project-scoped key)", async () => {
    await verifyTargetProject(r, "k", fakeFetch({ "lp-test": { status: 200, ids: ["ep-fresh-test-abc123"] } }));
  });
  it("refuses when the endpoint is not in the test project", async () => {
    await assert.rejects(verifyTargetProject(r, "k", fakeFetch({ "lp-test": { status: 200, ids: ["ep-other"] } })), /not in TEST_PROJECT_ID/);
  });
  it("refuses when the prod project lists the endpoint", async () => {
    await assert.rejects(verifyTargetProject(r, "k", fakeFetch({
      "lp-test": { status: 200, ids: ["ep-fresh-test-abc123"] },
      "billowing-river-00654156": { status: 200, ids: ["ep-fresh-test-abc123"] },
    })), /production project/);
  });
  it("refuses without an API key or when the test project can't be listed", async () => {
    await assert.rejects(verifyTargetProject(r, undefined, fakeFetch({})), /NEON_API_KEY/);
    await assert.rejects(verifyTargetProject(r, "k", fakeFetch({ "lp-test": { status: 403 } })), /HTTP 403/);
  });
});

describe("classifyTables", () => {
  it("copies only catalog tables with data and defaults unknown tables to structure-only", () => {
    const { catalog, structureOnly } = classifyTables(["platforms", "users", "categories", "brand_new_table", "tutorials", "_prisma_migrations", "reviews"]);
    assert.deepEqual(catalog.sort(), ["_prisma_migrations", "categories", "platforms", "tutorials"]);
    assert.deepEqual(structureOnly.sort(), ["brand_new_table", "reviews", "users"]);
  });
  it("flags every user table named in the plan", () => {
    for (const t of ["users", "user_favorites", "user_preferences", "user_progress", "discussions", "discussion_replies",
      "discussion_votes", "discussion_reply_votes", "discussion_reports", "first_touch_attributions", "unmet_searches",
      "reviews", "prompts", "prompt_ratings", "prompt_reports"]) assert.ok(isUserTable(t), t);
    assert.ok(!isUserTable("platforms"));
  });
});

describe("redact", () => {
  it("masks URLs and listed secrets", () => {
    const m = redact(`failed ${PREVIEW} key abcdef123`, ["abcdef123"]);
    assert.ok(!m.includes("pw123456") && !m.includes("abcdef123"));
  });
});
