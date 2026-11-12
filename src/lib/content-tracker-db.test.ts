import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  CONTENT_TRACKER_QUERIES_PATH,
  contentTrackerQueriesFromSql,
  mapContentTrackerRows,
  parseContentTrackerDbJson,
  platformRecordsFromDbJson,
  type ContentTrackerCountRow,
  type ContentTrackerPlatformRow,
} from "./content-tracker-db";

const UPDATED = new Date("2026-03-01T15:04:05.000Z");

function omit(row: object, key: string): Record<string, unknown> {
  const copy: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  delete copy[key];
  return copy;
}

function platform(over: Partial<ContentTrackerPlatformRow> = {}): ContentTrackerPlatformRow {
  return {
    id: "p1",
    slug: "acme",
    name: "Acme",
    website: "https://acme.example",
    description: "A writing tool.",
    categoryName: "Writing",
    categorySlug: "writing",
    costTier: "FREEMIUM",
    currentPricing: "Free; Pro monthly",
    apiAvailable: true,
    verified: true,
    updatedAt: UPDATED,
    ...over,
  };
}

function dbRows() {
  const platforms: ContentTrackerPlatformRow[] = [
    platform(),
    platform({
      id: "p2",
      slug: "bravo",
      name: "Bravo",
      website: null,
      description: null,
      categoryName: "Image",
      categorySlug: "image",
      costTier: "PAID",
      currentPricing: null,
      apiAvailable: false,
      verified: false,
      updatedAt: new Date("2026-01-02T00:00:00.000Z"),
    }),
  ];
  const prompts: ContentTrackerCountRow[] = [
    { platformId: "p1", status: "APPROVED", n: 3 },
    { platformId: "p1", status: "PENDING", n: 1 },
    { platformId: "p1", status: "REJECTED", n: 9 },
    { platformId: "p1", status: "APPROVED", n: 100 },
    { platformId: "missing", status: "APPROVED", n: 4 },
  ];
  const discussions: ContentTrackerCountRow[] = [
    { platformId: "p2", status: "APPROVED", n: 2 },
    { platformId: "p2", status: "PENDING", n: 5 },
  ];
  return { platforms, prompts, discussions };
}

describe("content tracker SQL file", () => {
  const sql = readFileSync(CONTENT_TRACKER_QUERIES_PATH, "utf8");
  const queries = contentTrackerQueriesFromSql(sql);
  const flat = (text: string) => text.replace(/\s+/g, " ").trim();

  it("is the three SELECTs the database path used to inline", () => {
    assert.equal(
      flat(queries.platforms),
      'SELECT p.id, p.slug, p.name, p.website, p.description, c.name AS "categoryName", c.slug AS "categorySlug", p."costTier"::text AS "costTier", p."currentPricing", p."apiAvailable", p.verified, p."updatedAt" FROM platforms p JOIN categories c ON c.id = p."categoryId" ORDER BY p.name',
    );
    assert.equal(
      queries.prompts,
      'SELECT "platformId", status::text AS status, count(*)::int AS n FROM prompts GROUP BY 1, 2',
    );
    assert.equal(
      queries.discussions,
      'SELECT "platformId", status::text AS status, count(*)::int AS n FROM discussions GROUP BY 1, 2',
    );
  });

  it("is labeled as documentation and sits outside the Guarded SQL workflow path", () => {
    assert.match(sql, /NOT a Guarded SQL file/);
    assert.equal(CONTENT_TRACKER_QUERIES_PATH, "scripts/sql/readonly/content-tracker-queries.sql");
    const workflow = readFileSync(".github/workflows/guarded-sql.yml", "utf8");
    const found = workflow.match(/IN_SQL_FILE" =~ (\^scripts\/sql\/\[A-Za-z0-9._-\]\+\\\.sql\$)/);
    assert.ok(found, "workflow sql_file regex not found");
    const accepted = new RegExp(found[1]);
    assert.equal(accepted.test("scripts/sql/guarded-sql-selftest.sql"), true);
    assert.equal(accepted.test(CONTENT_TRACKER_QUERIES_PATH), false);
  });

  it("rejects a file that is not three read-only SELECTs", () => {
    assert.throws(() => contentTrackerQueriesFromSql("SELECT 1;"), /exactly 3 statements/);
    assert.throws(
      () => contentTrackerQueriesFromSql("UPDATE platforms SET name = name; SELECT 1; SELECT 2;"),
      /exactly one platforms SELECT/,
    );
    assert.throws(
      () =>
        contentTrackerQueriesFromSql(
          "SELECT 1 FROM platforms; DELETE FROM prompts; SELECT 1 FROM discussions;",
        ),
      /prompts query must be a SELECT/,
    );
    assert.throws(
      () =>
        contentTrackerQueriesFromSql(
          "SELECT 1 FROM platforms; SELECT id FROM prompts; DELETE FROM prompts; SELECT 1 FROM discussions;",
        ),
      /exactly 3 statements/,
    );
  });
});

describe("mapContentTrackerRows", () => {
  it("counts approved and pending, ignores other statuses, and keeps the first duplicate", () => {
    const { platforms, prompts, discussions } = dbRows();
    const records = mapContentTrackerRows(platforms, prompts, discussions);
    assert.equal(records.length, 2);
    assert.equal("id" in records[0], false);
    assert.deepEqual(
      {
        slug: records[0].slug,
        approvedPrompts: records[0].approvedPrompts,
        pendingPrompts: records[0].pendingPrompts,
        approvedDiscussions: records[0].approvedDiscussions,
        pendingDiscussions: records[0].pendingDiscussions,
        website: records[1].website,
        description: records[1].description,
        apiAvailable: records[1].apiAvailable,
        verified: records[1].verified,
      },
      {
        slug: "acme",
        approvedPrompts: 3,
        pendingPrompts: 1,
        approvedDiscussions: 0,
        pendingDiscussions: 0,
        website: null,
        description: null,
        apiAvailable: false,
        verified: false,
      },
    );
    assert.equal(records[1].approvedDiscussions, 2);
    assert.equal(records[1].pendingDiscussions, 5);
    assert.equal(records[0].updatedAt, UPDATED);
  });
});

describe("parseContentTrackerDbJson", () => {
  it("parses typed rows into the same records as the database mapper", () => {
    const { platforms, prompts, discussions } = dbRows();
    const json = {
      platforms: platforms.map((row) => ({ ...row, updatedAt: row.updatedAt.toISOString() })),
      prompts,
      discussions,
      note: "ignored extra key",
    };
    assert.deepEqual(parseContentTrackerDbJson(json), mapContentTrackerRows(platforms, prompts, discussions));
  });

  it("coerces string counts, booleans and ISO timestamps, including from file text", () => {
    const { platforms, prompts, discussions } = dbRows();
    const json = {
      platforms: [
        {
          ...platforms[0],
          apiAvailable: "true",
          verified: " TRUE ",
          updatedAt: "2026-03-01T15:04:05.000Z",
          extra: "tool metadata",
        },
        {
          ...platforms[1],
          apiAvailable: "false",
          verified: "False",
          updatedAt: "2026-01-02T00:00:00.000-00:00",
        },
      ],
      prompts: prompts.map((row) => ({ ...row, n: String(row.n) })),
      discussions: [
        { platformId: "p2", status: "APPROVED", n: "2" },
        { platformId: "p2", status: "PENDING", n: 5 },
      ],
    };
    const fromJson = parseContentTrackerDbJson(json);
    const fromDb = mapContentTrackerRows(platforms, prompts, discussions);
    assert.deepEqual(fromJson, fromDb);
    assert.equal(fromJson[0].updatedAt.toISOString(), "2026-03-01T15:04:05.000Z");
    assert.deepEqual(Object.keys(fromJson[0]).sort(), Object.keys(fromDb[0]).sort());

    const text = `\uFEFF${JSON.stringify(json)}`;
    assert.deepEqual(platformRecordsFromDbJson(text), fromDb);
  });

  it("accepts a date-only updatedAt as UTC midnight", () => {
    const rows = dbRows();
    const records = parseContentTrackerDbJson({
      platforms: [{ ...rows.platforms[0], updatedAt: "2026-03-01" }],
      prompts: [],
      discussions: [],
    });
    assert.equal(records[0].updatedAt.toISOString(), "2026-03-01T00:00:00.000Z");
    assert.equal(records[0].approvedPrompts, 0);
  });

  it("fails clearly on bad input", () => {
    const { platforms, prompts, discussions } = dbRows();
    const good = {
      platforms: platforms.map((row) => ({ ...row, updatedAt: row.updatedAt.toISOString() })),
      prompts,
      discussions,
    };
    const cases: [string, unknown, RegExp][] = [
      ["array", [], /must be an object/],
      ["null", null, /must be an object/],
      ["missing discussions", { platforms: [], prompts: [] }, /missing "discussions"/],
      ["platforms not an array", { platforms: {}, prompts: [], discussions: [] }, /"platforms" must be an array/],
      ["null platform", { ...good, platforms: [null] }, /platforms\[0\] must be an object/],
      ["missing slug", { ...good, platforms: [omit(good.platforms[0], "slug")] }, /missing "slug"/],
      ["blank name", { ...good, platforms: [{ ...good.platforms[0], name: "  " }] }, /name must be a non-empty string/],
      ["website number", { ...good, platforms: [{ ...good.platforms[0], website: 1 }] }, /website must be a string or null/],
      ["bad boolean", { ...good, platforms: [{ ...good.platforms[0], apiAvailable: "yes" }] }, /apiAvailable must be a boolean/],
      ["boolean number", { ...good, platforms: [{ ...good.platforms[0], verified: 1 }] }, /verified must be a boolean/],
      ["bad date", { ...good, platforms: [{ ...good.platforms[0], updatedAt: "yesterday" }] }, /updatedAt must be an ISO date string/],
      ["epoch date", { ...good, platforms: [{ ...good.platforms[0], updatedAt: 1_700_000_000_000 }] }, /updatedAt must be an ISO date string/],
      ["bad count", { ...good, prompts: [{ platformId: "p1", status: "APPROVED", n: "nope" }] }, /prompts\[0\]\.n must be a non-negative integer/],
      ["negative count", { ...good, discussions: [{ platformId: "p2", status: "PENDING", n: -1 }] }, /discussions\[0\]\.n must be a non-negative integer/],
      ["fractional count", { ...good, prompts: [{ platformId: "p1", status: "APPROVED", n: "3.5" }] }, /prompts\[0\]\.n must be a non-negative integer/],
      ["null count row", { ...good, discussions: [null] }, /discussions\[0\] must be an object/],
    ];
    for (const [label, value, pattern] of cases) {
      assert.throws(() => parseContentTrackerDbJson(value), pattern, label);
    }
    assert.throws(() => platformRecordsFromDbJson(""), /DB JSON is empty/);
    assert.throws(() => platformRecordsFromDbJson("{"), /not valid JSON/);
  });
});

describe("export script wires both paths through the shared mapper", () => {
  const script = readFileSync("scripts/export-content-tracker.ts", "utf8");

  it("skips the database and the prod-guard host check when --db-json is set", () => {
    const gate = script.indexOf("if (!args.dbJson)");
    const databaseUrl = script.indexOf("if (!process.env.DATABASE_URL)");
    const hostCheck = script.indexOf("checkTargetHost(");
    const jsonAt = script.indexOf("if (args.dbJson)");
    const elseAt = script.indexOf("} else {", jsonAt);
    assert.ok(gate !== -1 && gate < databaseUrl && databaseUrl < hostCheck);
    assert.ok(jsonAt !== -1 && elseAt > jsonAt);
    assert.match(script, /mapContentTrackerRows\(/);
    assert.match(script, /contentTrackerQueriesFromSql\(/);
    const jsonBranch = script.slice(jsonAt, elseAt);
    assert.match(jsonBranch, /readJsonPlatforms\(/);
    assert.doesNotMatch(jsonBranch, /checkTargetHost|new Client|DATABASE_URL|readDatabase/);
    const reader = script.slice(script.indexOf("function readJsonPlatforms"), script.indexOf("// ── Sitemap"));
    assert.match(reader, /platformRecordsFromDbJson\(/);
    assert.doesNotMatch(reader, /checkTargetHost|new Client|DATABASE_URL|readDatabase/);
  });
});
