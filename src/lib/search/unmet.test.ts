import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  MAX_NORMALIZED_QUERY_CHARS,
  UNMET_RESULT_THRESHOLD,
  isUnmet,
  normalizeUnmetQuery,
} from "./unmet";
import { buildUnmetBeaconLog, type UnmetBeaconLog } from "./unmet-log";
import {
  MAX_UNMET_BODY_BYTES,
  UNMET_UPSERT_SQL,
  WriteBudget,
  isBotUserAgent,
  readBodyCapped,
  recordUnmetSearch,
  type UnmetOutcome,
  type UnmetSearchStore,
} from "./unmet-record";
import { UnmetSearchTracker } from "./unmet-client";
import { toCsv, toMarkdown } from "./unmet-report";

const root = process.cwd();
const read = (rel: string) => readFileSync(join(root, rel), "utf8");
const flat = (text: string) => text.replace(/\s+/g, " ");

const BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const US = { "x-vercel-ip-country": "US", "user-agent": BROWSER_UA };

function memoryStore() {
  const rows: { normalizedQuery: string; noClick: boolean; resultCount: number }[] = [];
  const store: UnmetSearchStore = { record: async (entry) => void rows.push(entry) };
  return { rows, store };
}

const body = (q: unknown, resultCount: unknown = 0, clicked: unknown = false) => JSON.stringify({ q, resultCount, clicked });

const silentLog = () => {};

async function send(headers: Record<string, string>, payload: string | null, budget?: WriteBudget) {
  const m = memoryStore();
  const outcome = await recordUnmetSearch({
    headers: new Headers(headers),
    body: payload,
    store: m.store,
    budget,
    log: silentLog,
  });
  return { outcome, rows: m.rows };
}

describe("normalization", () => {
  it("lowercases, trims and collapses whitespace", () => {
    assert.equal(normalizeUnmetQuery("  AI   Resume  Builder "), "ai resume builder");
  });
  it("turns every run of punctuation into one space", () => {
    assert.equal(normalizeUnmetQuery("chat--gpt!!!  (free)?"), "chat gpt free");
    assert.equal(normalizeUnmetQuery("c++ / rust & go"), "c rust go");
  });
  it("applies NFKC (full-width and ligatures fold to plain letters)", () => {
    assert.equal(normalizeUnmetQuery("ＡＩ ｔｏｏｌｓ"), "ai tools");
    assert.equal(normalizeUnmetQuery("ﬁle ｓｕｍｍａｒｙ"), "file summary");
  });
  it("keeps non-ASCII letters, digits and combining marks", () => {
    assert.equal(normalizeUnmetQuery("Übersetzer für Straße"), "übersetzer für straße");
    assert.equal(normalizeUnmetQuery("音楽 生成 ツール"), "音楽 生成 ツール");
    assert.equal(normalizeUnmetQuery("हिंदी अनुवाद"), "हिंदी अनुवाद");
    assert.equal(normalizeUnmetQuery("gpt 4o mini"), "gpt 4o mini");
  });
  it("gives one stored form to variants of the same search", () => {
    const forms = new Set(["Chat GPT", "chat-gpt", " CHAT   gpt ", "chat_gpt?"].map((q) => normalizeUnmetQuery(q)));
    assert.deepEqual([...forms], ["chat gpt"]);
  });
  it("rejects non-strings", () => {
    for (const bad of [null, undefined, 5, {}, ["a"]]) assert.equal(normalizeUnmetQuery(bad), null);
  });
});

describe("length rules", () => {
  it("drops queries shorter than 2 characters after normalizing", () => {
    for (const q of ["", " ", "a", "!!", "?a?"]) assert.equal(normalizeUnmetQuery(q), null, q);
    assert.equal(normalizeUnmetQuery("ai"), "ai");
  });
  it("drops raw input longer than 200 characters", () => {
    assert.equal(normalizeUnmetQuery("a".repeat(201)), null);
    assert.equal(normalizeUnmetQuery(("word ".repeat(41)).trim()), null);
    assert.notEqual(normalizeUnmetQuery("a".repeat(200)), null);
  });
  it("truncates the normalized form to 80 characters at a word boundary", () => {
    const long = Array.from({ length: 20 }, () => "tooling").join(" ");
    const out = normalizeUnmetQuery(long)!;
    assert.ok(out.length <= MAX_NORMALIZED_QUERY_CHARS);
    assert.ok(out.length > 60);
    assert.ok(!out.endsWith(" "));
    assert.ok(out.split(" ").every((w) => w === "tooling"), "no word is cut in half");
  });
  it("hard-cuts a single endless word at 80", () => {
    assert.equal(normalizeUnmetQuery("x".repeat(150))!.length, MAX_NORMALIZED_QUERY_CHARS);
  });
});

describe("PII drops (checked on the raw text)", () => {
  it("drops emails", () => {
    for (const q of ["jane.doe@example.com", "contact me bob@mail.co please", "a@b.io"]) assert.equal(normalizeUnmetQuery(q), null, q);
  });
  it("drops phone numbers", () => {
    for (const q of ["+1 (555) 123-4567", "555-123-4567", "call 5551234567", "+44 20 7946 0958"]) {
      assert.equal(normalizeUnmetQuery(q), null, q);
    }
  });
  it("drops URLs", () => {
    for (const q of ["https://example.com/a?b=c", "http://localhost:3000", "www.example.com", "example.com/path/to"]) {
      assert.equal(normalizeUnmetQuery(q), null, q);
    }
  });
  it("keeps ordinary tool searches that contain a dot, a digit or a short number", () => {
    assert.equal(normalizeUnmetQuery("character.ai"), "character ai");
    assert.equal(normalizeUnmetQuery("gpt-4 alternatives"), "gpt 4 alternatives");
    assert.equal(normalizeUnmetQuery("best ai 2026"), "best ai 2026");
  });
  it("drops digit-only text", () => {
    assert.equal(normalizeUnmetQuery("123456"), null);
  });
});

describe("threshold", () => {
  it("is 2: 0, 1 and 2 results are unmet, 3 is not", () => {
    assert.equal(UNMET_RESULT_THRESHOLD, 2);
    assert.deepEqual([0, 1, 2, 3, 4].map(isUnmet), [true, true, true, false, false]);
    assert.equal(isUnmet(-1), false);
    assert.equal(isUnmet(1.5), false);
  });
  it("server logs 2 results and refuses 3", async () => {
    assert.equal((await send(US, body("video upscaler", 2))).outcome, "stored");
    const three = await send(US, body("video upscaler", 3));
    assert.equal(three.outcome, "above_threshold");
    assert.equal(three.rows.length, 0);
  });
});

describe("privacy skips on the server", () => {
  it("DNT 1 and Sec-GPC 1 skip", async () => {
    for (const header of ["dnt", "sec-gpc"]) {
      const r = await send({ ...US, [header]: "1" }, body("pdf tool"));
      assert.equal(r.outcome, "ineligible");
      assert.equal(r.rows.length, 0);
    }
  });
  it("EU, EEA, UK and CH countries skip", async () => {
    for (const country of ["DE", "FR", "NO", "IS", "GB", "CH"]) {
      const r = await send({ ...US, "x-vercel-ip-country": country }, body("pdf tool"));
      assert.equal(r.outcome, "ineligible", country);
      assert.equal(r.rows.length, 0);
    }
  });
  it("unknown or missing country skips", async () => {
    for (const headers of [{ "user-agent": BROWSER_UA }, { ...US, "x-vercel-ip-country": "XX" }, { ...US, "x-vercel-ip-country": "T1" }]) {
      const r = await send(headers, body("pdf tool"));
      assert.equal(r.outcome, "ineligible");
      assert.equal(r.rows.length, 0);
    }
  });
  it("an allowed country writes exactly one row with only the three fields", async () => {
    const r = await send({ ...US, "x-vercel-ip-country": "CA" }, body("Pdf  Tool!", 1, true));
    assert.equal(r.outcome, "stored");
    assert.deepEqual(r.rows, [{ normalizedQuery: "pdf tool", noClick: false, resultCount: 1 }]);
  });
});

describe("bot user agents", () => {
  it("rejects empty and known automation agents", () => {
    for (const ua of [null, undefined, "", "  ", "Googlebot/2.1", "Mozilla/5.0 (compatible; bingbot/2.0)", "curl/8.4.0", "Wget/1.21", "python-requests/2.31", "Go-http-client/1.1", "Mozilla/5.0 HeadlessChrome/120", "Mozilla/5.0 Chrome-Lighthouse", "Puppeteer", "Playwright/1.40", "Slurp", "Apache-HttpClient/4.5", "Baiduspider", "Some Crawler"]) {
      assert.equal(isBotUserAgent(ua), true, String(ua));
    }
  });
  it("accepts a normal browser", () => {
    assert.equal(isBotUserAgent(BROWSER_UA), false);
    assert.equal(isBotUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"), false);
  });
  it("a bot or missing user agent writes nothing", async () => {
    assert.equal((await send({ "x-vercel-ip-country": "US" }, body("pdf tool"))).outcome, "bot");
    const r = await send({ ...US, "user-agent": "curl/8.0" }, body("pdf tool"));
    assert.equal(r.outcome, "bot");
    assert.equal(r.rows.length, 0);
  });
});

describe("validation", () => {
  it("refuses malformed bodies without writing", async () => {
    for (const payload of [null, "", "not json", "[]", "null", body("x y", "0"), body("x y", -1), body("x y", 1.5), body("x y", 0, "no"), body(5, 0), body("a@b.com", 0), JSON.stringify({ q: "x y" })]) {
      const r = await send(US, payload);
      assert.equal(r.outcome, "invalid", String(payload));
      assert.equal(r.rows.length, 0);
    }
  });
  it("ignores extra fields: only the three allowed values reach the store", async () => {
    const r = await send(US, JSON.stringify({ q: "lyrics tool", resultCount: 0, clicked: false, ip: "1.2.3.4", userId: "u_1" }));
    assert.deepEqual(r.rows, [{ normalizedQuery: "lyrics tool", noClick: true, resultCount: 0 }]);
  });
  it("a store failure is swallowed", async () => {
    const outcome = await recordUnmetSearch({
      headers: new Headers(US),
      body: body("lyrics tool"),
      store: { record: async () => { throw new Error("db down"); } },
      log: silentLog,
    });
    assert.equal(outcome, "store_error");
  });
  it("caps the body at 1KB", async () => {
    assert.equal(MAX_UNMET_BODY_BYTES, 1024);
    const stream = (text: string) => new Response(text).body;
    assert.equal(await readBodyCapped(stream("x".repeat(1024))), "x".repeat(1024));
    assert.equal(await readBodyCapped(stream("x".repeat(1025))), null);
    assert.equal(await readBodyCapped(null), null);
  });
});

describe("burst cap", () => {
  it("allows 30 writes per minute per instance, then refuses, then refills", async () => {
    let now = 1_000_000;
    const budget = new WriteBudget(30, () => now);
    const m = memoryStore();
    const fire = () =>
      recordUnmetSearch({ headers: new Headers(US), body: body("video upscaler"), store: m.store, budget, log: silentLog });
    const outcomes: string[] = [];
    for (let i = 0; i < 35; i++) outcomes.push(await fire());
    assert.equal(outcomes.filter((o) => o === "stored").length, 30);
    assert.equal(outcomes.filter((o) => o === "rate_limited").length, 5);
    assert.equal(m.rows.length, 30);
    now += 2_000; // 2s refills 1 token (30/min)
    assert.equal(await fire(), "stored");
    assert.equal(await fire(), "rate_limited");
    now += 120_000;
    for (let i = 0; i < 30; i++) assert.equal(await fire(), "stored");
    assert.equal(await fire(), "rate_limited");
  });
  it("is keyed on nothing: the budget class takes no identifier", () => {
    assert.equal(WriteBudget.prototype.take.length, 0);
    assert.doesNotMatch(read("src/lib/search/unmet-record.ts"), /x-forwarded-for|x-real-ip|\bip\b\s*[:=]/i);
  });
});

describe("upsert SQL shape", () => {
  const sql = UNMET_UPSERT_SQL;
  it("is one parameterised INSERT ... ON CONFLICT upsert on the primary key", () => {
    assert.match(sql, /^INSERT INTO "unmet_searches"/);
    assert.match(sql, /ON CONFLICT \("normalizedQuery"\) DO UPDATE SET/);
    assert.equal(sql.includes(";"), false);
    assert.match(sql, /VALUES \(\$1, 1, \$2::int, \$3::int, \$3::int, current_date, current_date\)/);
  });
  it("increments searchCount, adds the no-click flag, keeps the minimum, bumps lastSeen", () => {
    assert.match(sql, /"searchCount" = "unmet_searches"\."searchCount" \+ 1/);
    assert.match(sql, /"noClickCount" = "unmet_searches"\."noClickCount" \+ \$2::int/);
    assert.match(sql, /"lastResultCount" = \$3::int/);
    assert.match(sql, /"minResultCount" = LEAST\("unmet_searches"\."minResultCount", \$3::int\)/);
    assert.match(sql, /"lastSeen" = current_date/);
    assert.doesNotMatch(sql, /"firstSeen" =/);
  });
  it("the route runs it with bound parameters, once, with 204 and no-store", () => {
    const route = read("src/app/api/search/unmet/route.ts");
    assert.equal((route.match(/\$executeRawUnsafe\(/g) ?? []).length, 1);
    assert.match(route, /\$executeRawUnsafe\(UNMET_UPSERT_SQL, normalizedQuery, noClick \? 1 : 0, resultCount\)/);
    assert.match(route, /status: 204/);
    assert.match(route, /private, no-store/);
    assert.match(route, /methodsNotAllowed\(\["POST"\]\)/);
  });
  it("schema, migration and one-off SQL agree", () => {
    const schema = read("prisma/schema.prisma");
    assert.match(schema, /model UnmetSearch \{[\s\S]*normalizedQuery String\s+@id[\s\S]*@@index\(\[lastSeen\]\)[\s\S]*@@map\("unmet_searches"\)/);
    const migration = read("prisma/migrations/20261103130000_add_unmet_searches/migration.sql");
    const oneOff = read("scripts/sql/search-unmet-20261103.sql");
    for (const text of [migration, oneOff]) {
      assert.match(text, /CREATE TABLE IF NOT EXISTS "unmet_searches"/);
      assert.match(text, /"normalizedQuery" TEXT NOT NULL/);
      assert.match(text, /"searchCount" INTEGER NOT NULL DEFAULT 0/);
      assert.match(text, /"noClickCount" INTEGER NOT NULL DEFAULT 0/);
      assert.match(text, /"firstSeen" DATE NOT NULL/);
      assert.match(text, /"lastSeen" DATE NOT NULL/);
      assert.match(text, /PRIMARY KEY \("normalizedQuery"\)/);
      assert.match(text, /CREATE INDEX IF NOT EXISTS "unmet_searches_lastSeen_idx" ON "unmet_searches"\("lastSeen"\)/);
    }
    const lines = oneOff.trim().split("\n");
    assert.equal(lines.length, 2);
    assert.ok(lines.every((line) => !line.includes("--") && !line.includes(";")));
  });
});

describe("retention SQL and script", () => {
  const stmt = `DELETE FROM "unmet_searches" WHERE "lastSeen" < current_date - interval '12 months'`;
  it("the retention SQL is the single 12-month delete on lastSeen", () => {
    const sql = read("scripts/sql/search-unmet-retention-cleanup.sql").trim();
    assert.equal(sql, stmt);
    assert.equal(sql.split(";").filter((p) => p.trim()).length, 1);
  });
  it("the attribution retention SQL is unchanged", () => {
    assert.equal(
      read("scripts/sql/attr-retention-cleanup.sql").trim(),
      `DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'`,
    );
  });
  it("the cleanup script runs both deletes behind the CONFIRM_DELETE guard and prints only counts", () => {
    const script = read("scripts/attr-retention-cleanup.ts");
    assert.match(script, /CONFIRM_DELETE !== "1"/);
    assert.ok(script.includes(stmt));
    assert.ok(script.includes(`DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'`));
    assert.ok(script.indexOf("CONFIRM_DELETE") < script.indexOf(stmt));
    assert.ok(script.indexOf("CONFIRM_DELETE") < script.indexOf("src/lib/db"));
    assert.equal((script.match(/console\.log\(/g) ?? []).length, 2);
  });
});

describe("weekly report", () => {
  const sql = read("scripts/sql/search-unmet-weekly.sql").trim();
  it("is one read-only SELECT with the requested columns, window and limit", () => {
    assert.match(sql, /^SELECT "normalizedQuery" AS query, "searchCount" AS searches, "noClickCount" AS no_click_searches, "lastResultCount" AS last_result_count, "firstSeen" AS first_seen, "lastSeen" AS last_seen FROM "unmet_searches"/);
    assert.match(sql, /WHERE "lastSeen" >= current_date - 7 ORDER BY "searchCount" DESC LIMIT 50$/);
    assert.doesNotMatch(sql, /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT)\b|;/i);
  });
  it("the script runs only that SELECT through $queryRaw", () => {
    const script = read("scripts/search-unmet-weekly.ts");
    assert.ok(script.includes(sql));
    assert.equal((script.match(/\$queryRaw/g) ?? []).length, 1);
    assert.doesNotMatch(script, /\$executeRaw|\$queryRawUnsafe|\.(create|update|upsert|delete)\w*\(/);
    assert.match(script, /--csv/);
    const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
    assert.equal(pkg.scripts["report:unmet-searches"], "tsx scripts/search-unmet-weekly.ts");
  });
  it("formats markdown and CSV", () => {
    const rows = [{ query: "video | upscaler", searches: 4, no_click_searches: 3, last_result_count: 0, first_seen: new Date("2026-11-01T00:00:00Z"), last_seen: "2026-11-03" }];
    const md = toMarkdown(rows).split("\n");
    assert.equal(md[0], "| query | searches | no_click_searches | last_result_count | first_seen | last_seen |");
    assert.equal(md[2], "| video   upscaler | 4 | 3 | 0 | 2026-11-01 | 2026-11-03 |");
    assert.equal(toCsv(rows).split("\n")[1], '"video | upscaler","4","3","0","2026-11-01","2026-11-03"');
  });
});

describe("client tracker (one beacon, per query, per page view)", () => {
  function make(eligible = true) {
    const sent: unknown[] = [];
    let wanted = 0;
    const tracker = new UnmetSearchTracker({ send: (p) => void sent.push(p), isEligible: () => eligible, wantEligibility: () => void wanted++ });
    return { tracker, sent, wanted: () => wanted };
  }
  it("sends nothing above the threshold", () => {
    const { tracker, sent } = make();
    tracker.observe("chatgpt", 3);
    tracker.flush();
    assert.equal(sent.length, 0);
  });
  it("sends no-click on flush and clicked on a result click, once", () => {
    const a = make();
    a.tracker.observe("video upscaler", 0);
    a.tracker.flush();
    a.tracker.flush();
    assert.deepEqual(a.sent, [{ q: "video upscaler", resultCount: 0, clicked: false }]);
    const b = make();
    b.tracker.observe("pdf tool", 1);
    b.tracker.click("pdf tool");
    b.tracker.flush();
    assert.deepEqual(b.sent, [{ q: "pdf tool", resultCount: 1, clicked: true }]);
  });
  it("dedupes the same query for the rest of the page view", () => {
    const { tracker, sent } = make();
    for (let i = 0; i < 3; i++) {
      tracker.observe("Video  Upscaler", 0);
      tracker.flush();
    }
    assert.equal(sent.length, 1);
  });
  it("typing continuation is one search; a different search flushes the previous one", () => {
    const { tracker, sent } = make();
    for (const q of ["vid", "vide", "video", "video up", "video upscaler"]) tracker.observe(q, 0);
    assert.equal(sent.length, 0);
    tracker.observe("lyrics writer", 0);
    assert.deepEqual(sent, [{ q: "video upscaler", resultCount: 0, clicked: false }]);
    tracker.flush();
    assert.equal(sent.length, 2);
  });
  it("a search that gains results while typing is not sent", () => {
    const { tracker, sent } = make();
    tracker.observe("chatg", 1);
    tracker.observe("chatgpt", 5);
    tracker.flush();
    assert.equal(sent.length, 0);
  });
  it("sends nothing when not eligible (privacy signal, blocked or unknown country)", () => {
    const { tracker, sent } = make(false);
    tracker.observe("video upscaler", 0);
    tracker.click("video upscaler");
    tracker.flush();
    assert.equal(sent.length, 0);
  });
  it("a click on some other query does not mark the pending one clicked", () => {
    const { tracker, sent } = make();
    tracker.observe("video upscaler", 0);
    tracker.click("something else");
    assert.equal(sent.length, 0);
    tracker.flush();
    assert.equal(sent[0] && (sent[0] as { clicked: boolean }).clicked, false);
  });
  it("browser glue honours DNT/GPC and the cached eligibility endpoint, and uses sendBeacon", () => {
    const client = read("src/lib/search/unmet-client.ts");
    assert.match(client, /privacySignalOn\(nav\)/);
    assert.match(client, /\/api\/attribution\/eligibility/);
    assert.match(client, /navigator\.sendBeacon\(UNMET_ENDPOINT/);
    assert.match(client, /pagehide/);
    assert.match(client, /visibilitychange/);
  });
});

describe("hooks live on the website layer only", () => {
  function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });
  }
  it("no file under src/lib/mcp or src/app/mcp references the unmet-search modules", () => {
    const files = [...walk(join(root, "src/lib/mcp")), ...walk(join(root, "src/app/mcp"))].filter((f) => /\.(ts|tsx|json)$/.test(f));
    assert.ok(files.length > 10);
    for (const file of files) {
      assert.doesNotMatch(readFileSync(file, "utf8"), /lib\/search\/unmet|search\/unmet|unmet_searches|UnmetSearch|unmet-client|unmet-record/i, file);
    }
  });
  it("the shared /api/search GET route, the catalog code and /data feeds do not reference them either", () => {
    for (const rel of ["src/app/api/search/route.ts", "src/lib/catalog-queries.ts", "src/lib/mcp/tools.ts", "src/lib/mcp/catalog.ts", "src/proxy.ts"]) {
      assert.doesNotMatch(read(rel), /unmet/i, rel);
    }
    for (const file of walk(join(root, "src/app/data")).filter((f) => f.endsWith(".ts"))) {
      assert.doesNotMatch(readFileSync(file, "utf8"), /unmet/i, file);
    }
  });
  it("the header search box and Discover are the only UI hooks", () => {
    assert.match(read("src/components/layout/header.tsx"), /getUnmetTracker\(\)\.observe\(q, results\.length\)/);
    assert.match(read("src/components/layout/header.tsx"), /getUnmetTracker\(\)\.click\(/);
    const discover = flat(read("src/app/(app)/discover/page.tsx"));
    assert.ok(discover.includes("<UnmetSearchBeacon query={query} resultCount={platforms.length} />"));
    assert.ok(discover.includes("!params.category && !params.cost && !params.difficulty && !params.mobile"));
    assert.match(read("src/components/search/unmet-search-beacon.tsx"), /data-unmet-results/);
  });
});

describe("beacon log (one line, outcome only)", () => {
  const QUERY = "zzuniq-lyricforge77";
  const NORMALIZED = "zzuniq lyricforge77";
  const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 zzuniq-agent Chrome/130.0 Safari/537.36";
  const BOT = "curl/8.4.0 zzuniq-bot";
  const IP = "203.0.113.77";
  const EMAIL = "zzuniq.person@example.com";

  const COVERED: Record<UnmetOutcome, true> = {
    stored: true,
    ineligible: true,
    bot: true,
    above_threshold: true,
    invalid: true,
    rate_limited: true,
    store_error: true,
  };

  function clock(start: number, end: number) {
    const values = [start, end];
    let i = 0;
    return () => values[Math.min(i++, values.length - 1)]!;
  }

  function assertNoSecrets(text: string) {
    for (const secret of [QUERY, NORMALIZED, "zzuniq", UA, BOT, IP, EMAIL, "example.com", "T1", "DE", "US", "zzuniq-agent", "user-agent", "x-vercel-ip-country", "x-forwarded-for", "sec-gpc"]) {
      assert.equal(text.includes(secret), false, `log contains ${secret}`);
    }
  }

  async function printedDuring(run: () => Promise<void>) {
    const printed: { level: "log" | "error"; line: string }[] = [];
    const origLog = console.log;
    const origErr = console.error;
    console.log = (...parts: unknown[]) => {
      printed.push({ level: "log", line: parts.map(String).join(" ") });
    };
    console.error = (...parts: unknown[]) => {
      printed.push({ level: "error", line: parts.map(String).join(" ") });
    };
    try {
      await run();
    } finally {
      console.log = origLog;
      console.error = origErr;
    }
    return printed;
  }

  type Scenario = {
    outcome: UnmetOutcome;
    headers: Record<string, string>;
    payload: string | null;
    budget?: WriteBudget;
    store?: UnmetSearchStore;
    keys: string[];
    bucket?: UnmetBeaconLog["result_count_bucket"];
    errorClass?: string;
    errorCode?: string;
  };

  const prismaDown = () => {
    const error = new Error(`relation "unmet_searches" does not exist (${QUERY} / ${NORMALIZED})`);
    error.name = "PrismaClientKnownRequestError";
    return Object.assign(error, { code: "P2021" });
  };

  const scenarios: Scenario[] = [
    {
      outcome: "stored",
      headers: { "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP },
      payload: body(QUERY, 0, false),
      budget: new WriteBudget(),
      keys: ["evt", "outcome", "result_count_bucket", "latency_ms"],
      bucket: "0",
    },
    {
      outcome: "ineligible",
      headers: { "x-vercel-ip-country": "DE", "user-agent": UA, dnt: "1", "sec-gpc": "1", "x-forwarded-for": IP },
      payload: body(QUERY, 0),
      keys: ["evt", "outcome", "latency_ms"],
    },
    {
      outcome: "bot",
      headers: { "x-vercel-ip-country": "US", "user-agent": BOT, "x-forwarded-for": IP },
      payload: body(QUERY, 1),
      keys: ["evt", "outcome", "latency_ms"],
    },
    {
      outcome: "above_threshold",
      headers: { "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP },
      payload: body(QUERY, 3),
      keys: ["evt", "outcome", "result_count_bucket", "latency_ms"],
      bucket: "3-9",
    },
    {
      outcome: "invalid",
      headers: { "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP },
      payload: body(EMAIL, 1),
      keys: ["evt", "outcome", "result_count_bucket", "latency_ms"],
      bucket: "1",
    },
    {
      outcome: "rate_limited",
      headers: { "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP },
      payload: body(QUERY, 2),
      budget: new WriteBudget(0),
      keys: ["evt", "outcome", "result_count_bucket", "latency_ms"],
      bucket: "2",
    },
    {
      outcome: "store_error",
      headers: { "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP },
      payload: body(QUERY, 0, true),
      budget: new WriteBudget(),
      store: { record: async () => { throw prismaDown(); } },
      keys: ["evt", "outcome", "result_count_bucket", "latency_ms", "error_class", "error_code"],
      bucket: "0",
      errorClass: "PrismaClientKnownRequestError",
      errorCode: "P2021",
    },
  ];

  async function run(scenario: Scenario, log?: (entry: UnmetBeaconLog) => void) {
    const m = memoryStore();
    const outcome = await recordUnmetSearch({
      headers: new Headers(scenario.headers),
      body: scenario.payload,
      store: scenario.store ?? m.store,
      budget: scenario.budget,
      now: clock(1_000, 1_012),
      log,
    });
    return { outcome, rows: m.rows };
  }

  it("covers every outcome with one line and none of the query", async () => {
    const seen = new Set<UnmetOutcome>();
    for (const scenario of scenarios) {
      seen.add(scenario.outcome);
      const lines: UnmetBeaconLog[] = [];
      const stdout = await printedDuring(async () => {
        const { outcome, rows } = await run(scenario, (entry) => lines.push(entry));
        assert.equal(outcome, scenario.outcome);
        if (scenario.outcome === "stored") {
          assert.deepEqual(rows, [{ normalizedQuery: NORMALIZED, noClick: true, resultCount: 0 }]);
        } else {
          assert.equal(rows.length, 0);
        }
      });
      assert.equal(stdout.length, 0, scenario.outcome);
      assert.equal(lines.length, 1, scenario.outcome);
      const entry = lines[0]!;
      assert.equal(entry.evt, "unmet_search_beacon");
      assert.equal(entry.outcome, scenario.outcome);
      assert.equal(entry.latency_ms, 12);
      assert.equal(entry.result_count_bucket, scenario.bucket);
      assert.equal(entry.error_class, scenario.errorClass);
      assert.equal(entry.error_code, scenario.errorCode);
      assert.deepEqual(Object.keys(entry), scenario.keys);
      const text = JSON.stringify(entry);
      assertNoSecrets(text);
      if (scenario.outcome === "store_error") {
        assert.equal(text.includes("relation"), false);
        assert.equal(text.includes("does not exist"), false);
      }
    }
    assert.deepEqual([...seen].sort(), Object.keys(COVERED).sort());
  });

  it("the default logger writes that same line once, error level only for store_error", async () => {
    for (const scenario of scenarios) {
      const stdout = await printedDuring(async () => {
        const { outcome } = await run(scenario);
        assert.equal(outcome, scenario.outcome);
      });
      assert.equal(stdout.length, 1, scenario.outcome);
      assert.equal(stdout[0]!.level, scenario.outcome === "store_error" ? "error" : "log");
      const parsed = JSON.parse(stdout[0]!.line) as UnmetBeaconLog;
      assert.equal(parsed.evt, "unmet_search_beacon");
      assert.equal(parsed.outcome, scenario.outcome);
      assert.deepEqual(Object.keys(parsed), scenario.keys);
      assertNoSecrets(stdout[0]!.line);
    }
  });

  it("privacy gates that share ineligible do not log which gate fired", async () => {
    const gates: Record<string, string>[] = [
      { "x-vercel-ip-country": "US", "user-agent": UA, dnt: "1" },
      { "x-vercel-ip-country": "US", "user-agent": UA, "sec-gpc": "1" },
      { "x-vercel-ip-country": "T1", "user-agent": UA },
      { "user-agent": UA },
      { "x-vercel-ip-country": "XX", "user-agent": UA },
      { "x-vercel-ip-country": "GB", "user-agent": UA },
    ];
    for (const headers of gates) {
      const lines: UnmetBeaconLog[] = [];
      const { outcome } = await run(
        { outcome: "ineligible", headers, payload: body(QUERY, 0), keys: ["evt", "outcome", "latency_ms"] },
        (entry) => lines.push(entry),
      );
      assert.equal(outcome, "ineligible");
      assert.equal(lines.length, 1);
      assert.deepEqual(lines[0], { evt: "unmet_search_beacon", outcome: "ineligible", latency_ms: 12 });
      assertNoSecrets(JSON.stringify(lines[0]));
    }
  });

  it("a thrown string or a code that is the query itself stays off the line", async () => {
    const leaking = new Error(QUERY);
    leaking.name = `${QUERY}Error`;
    const cases: unknown[] = [QUERY, Object.assign(leaking, { code: QUERY })];
    for (const error of cases) {
      const lines: UnmetBeaconLog[] = [];
      const outcome = await recordUnmetSearch({
        headers: new Headers({ "x-vercel-ip-country": "US", "user-agent": UA }),
        body: body(QUERY, 1),
        store: { record: async () => { throw error; } },
        budget: new WriteBudget(),
        now: clock(1_000, 1_012),
        log: (entry) => lines.push(entry),
      });
      assert.equal(outcome, "store_error");
      assert.deepEqual(lines, [
        { evt: "unmet_search_beacon", outcome: "store_error", result_count_bucket: "1", latency_ms: 12, error_class: "Error" },
      ]);
      assertNoSecrets(JSON.stringify(lines[0]));
    }
  });

  it("a logger failure still returns the outcome and does not write a second line", async () => {
    let calls = 0;
    const stdout = await printedDuring(async () => {
      const outcome = await recordUnmetSearch({
        headers: new Headers(US),
        body: body(QUERY, 0),
        store: memoryStore().store,
        budget: new WriteBudget(),
        log: () => {
          calls += 1;
          throw new Error(QUERY);
        },
      });
      assert.equal(outcome, "stored");
    });
    assert.equal(calls, 1);
    assert.equal(stdout.length, 0);
  });

  it("buckets a validated count and drops every other count", () => {
    assert.equal(buildUnmetBeaconLog({ outcome: "stored", latencyMs: 1.4, resultCount: 0 }).result_count_bucket, "0");
    assert.equal(buildUnmetBeaconLog({ outcome: "stored", latencyMs: 1, resultCount: 1 }).result_count_bucket, "1");
    assert.equal(buildUnmetBeaconLog({ outcome: "stored", latencyMs: 1, resultCount: 2 }).result_count_bucket, "2");
    assert.equal(buildUnmetBeaconLog({ outcome: "above_threshold", latencyMs: 1, resultCount: 9 }).result_count_bucket, "3-9");
    assert.equal(buildUnmetBeaconLog({ outcome: "above_threshold", latencyMs: 1, resultCount: 10 }).result_count_bucket, "10+");
    assert.equal(buildUnmetBeaconLog({ outcome: "above_threshold", latencyMs: 1, resultCount: 1000 }).result_count_bucket, "10+");
    for (const resultCount of [-1, 1.5, 1001]) {
      assert.equal(buildUnmetBeaconLog({ outcome: "invalid", latencyMs: 1, resultCount }).result_count_bucket, undefined);
    }
    const negative = buildUnmetBeaconLog({ outcome: "ineligible", latencyMs: -5 });
    assert.equal(negative.latency_ms, 0);
    assert.deepEqual(Object.keys(negative), ["evt", "outcome", "latency_ms"]);
    const ignored = buildUnmetBeaconLog({
      outcome: "invalid",
      latencyMs: 2.2,
      error: Object.assign(new Error(QUERY), { name: "PrismaClientKnownRequestError", code: "P2021" }),
    });
    assert.equal(ignored.latency_ms, 2);
    assert.equal(ignored.error_class, undefined);
    assert.equal(ignored.error_code, undefined);
    assertNoSecrets(JSON.stringify(ignored));
  });

  it("malformed bodies log invalid once and carry no result bucket", async () => {
    for (const payload of [null, "", "not json", "[]", body(QUERY, -1), body(QUERY, 1.5), body(QUERY, 1001)]) {
      const lines: UnmetBeaconLog[] = [];
      const outcome = await recordUnmetSearch({
        headers: new Headers({ "x-vercel-ip-country": "US", "user-agent": UA, "x-forwarded-for": IP }),
        body: payload,
        store: memoryStore().store,
        now: clock(5, 5),
        log: (entry) => lines.push(entry),
      });
      assert.equal(outcome, "invalid", String(payload));
      assert.deepEqual(lines, [{ evt: "unmet_search_beacon", outcome: "invalid", latency_ms: 0 }]);
      assertNoSecrets(JSON.stringify(lines[0]));
    }
  });

  it("the route stays 204 and does not log on its own", () => {
    const route = read("src/app/api/search/unmet/route.ts");
    assert.match(route, /status: 204/);
    assert.match(route, /recordUnmetSearch\(\{ headers: request\.headers, body, store \}\)/);
    assert.doesNotMatch(route, /console\.(log|error|warn|info)/);
    const logSrc = read("src/lib/search/unmet-log.ts");
    assert.match(logSrc, /unmet_search_beacon/);
    assert.doesNotMatch(logSrc, /normalizedQuery|user-agent|x-vercel-ip|x-forwarded-for|\.message/);
    assert.match(read("docs/unmet-searches.md"), /unmet_search_beacon/);
    for (const name of Object.keys(COVERED)) assert.match(read("docs/unmet-searches.md"), new RegExp(`\`${name}\``));
  });
});

describe("privacy page", () => {
  const page = flat(read("src/app/(app)/privacy/page.tsx"));
  it("states the search log in aggregate, with the exact practices", () => {
    assert.ok(
      page.includes(
        "When a search on our website returns no or few results, we log the search in aggregate: the normalized search text, how many times it was searched, result counts, whether a result was clicked, and the first and last dates seen. We store no IP address, account, device or session identifiers with it, skip it when your browser sends Do Not Track or Global Privacy Control or you are in the EU, EEA, UK or Switzerland, and delete entries 12 months after they were last seen.",
      ),
    );
  });
  it("covers the search log in the retention and Do Not Track sections", () => {
    assert.ok(page.includes("Aggregate search-log entries (searches with few results) are deleted 12 months after they were last seen."));
    assert.ok(page.includes("we capture no first-touch campaign data and log no search"));
  });
  it("docs describe the feature", () => {
    const doc = read("docs/unmet-searches.md");
    for (const phrase of ["UNMET_RESULT_THRESHOLD", "sendBeacon", "unmet_searches", "report:unmet-searches", "12 months", "/mcp"]) {
      assert.ok(doc.includes(phrase), phrase);
    }
  });
});
