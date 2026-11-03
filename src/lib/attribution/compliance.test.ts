import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { BLOCKED_COUNTRIES, decideAttribution, decideForRequest } from "./eligibility";
import {
  FIRST_TOUCH_KEY,
  FIRST_TOUCH_MAX_AGE_MS,
  FIRST_TOUCH_SENT_KEY,
  captureFirstTouch,
  captureIfEligible,
  hasUtmParams,
  privacySignalOn,
  readLiveFirstTouch,
  type KeyValueStore,
} from "./first-touch";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");
const flat = (text: string) => text.replace(/\s+/g, " ");

function memoryStore(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  };
}

const LANDING = { pathname: "/discover", search: "?utm_source=reddit&utm_medium=social" };
const YES = async () => true;

// --- Do Not Track and Global Privacy Control ---------------------------------

test("DNT 1 and yes: client captures nothing", async () => {
  for (const doNotTrack of ["1", "yes"]) {
    const store = memoryStore();
    assert.equal(privacySignalOn({ doNotTrack }), true);
    assert.equal(captureFirstTouch(store, LANDING, { doNotTrack }), false);
    assert.equal(await captureIfEligible(store, LANDING, { doNotTrack }, YES), false);
    assert.equal(store.data.size, 0);
  }
  assert.equal(privacySignalOn({ doNotTrack: "0" }), false);
});

test("GPC true: client captures nothing, and never even asks the server", async () => {
  const store = memoryStore();
  let asked = 0;
  const result = await captureIfEligible(store, LANDING, { globalPrivacyControl: true }, async () => {
    asked++;
    return true;
  });
  assert.equal(result, false);
  assert.equal(asked, 0);
  assert.equal(store.data.size, 0);
  assert.equal(captureFirstTouch(store, LANDING, { globalPrivacyControl: true }), false);
});

test("server: Sec-GPC 1 and DNT 1 headers block even a US visitor", () => {
  for (const header of ["sec-gpc", "dnt"]) {
    const headers = new Headers({ "x-vercel-ip-country": "US", [header]: "1" });
    assert.deepEqual(decideForRequest(headers), { allowed: false, reason: "privacy_signal" });
  }
  assert.equal(decideForRequest(new Headers({ "x-vercel-ip-country": "US", dnt: "0" })).allowed, true);
});

// --- Country eligibility ------------------------------------------------------

test("EU27, EEA, UK and CH visitors are not captured", () => {
  const eu27 = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE".split(" ");
  assert.equal(eu27.length, 27);
  for (const country of [...eu27, "IS", "LI", "NO", "GB", "CH"]) {
    assert.deepEqual(decideAttribution({ country }), { allowed: false, reason: "blocked_country" }, country);
    assert.equal(decideForRequest(new Headers({ "x-vercel-ip-country": country })).allowed, false, country);
  }
  assert.equal(BLOCKED_COUNTRIES.length, 32);
  assert.equal(decideAttribution({ country: "de" }).allowed, false);
});

test("unknown or missing country is not captured", () => {
  for (const country of [null, undefined, "", " ", "XX", "T1", "USA", "1"]) {
    assert.deepEqual(decideAttribution({ country }), { allowed: false, reason: "unknown_country" }, String(country));
  }
  assert.equal(decideForRequest(new Headers()).allowed, false);
});

test("US and other non-blocked countries are allowed", () => {
  for (const country of ["US", "CA", "AU", "IN", "BR", "JP", "us"]) {
    assert.deepEqual(decideAttribution({ country }), { allowed: true }, country);
  }
  assert.equal(decideForRequest(new Headers({ "x-vercel-ip-country": "US" })).allowed, true);
});

test("client captures only when the eligibility answer is a clear yes", async () => {
  const blocked = memoryStore();
  assert.equal(await captureIfEligible(blocked, LANDING, {}, async () => false), false);
  assert.equal(await captureIfEligible(blocked, LANDING, {}, async () => Promise.reject(new Error("net"))), false);
  assert.equal(blocked.data.size, 0);

  const allowed = memoryStore();
  assert.equal(await captureIfEligible(allowed, LANDING, {}, YES), true);
  assert.ok(allowed.data.has(FIRST_TOUCH_KEY));
});

test("no UTM tags: no eligibility request and nothing stored", async () => {
  const store = memoryStore();
  let asked = 0;
  const ask = async () => {
    asked++;
    return true;
  };
  assert.equal(hasUtmParams("?ref=x&utm_term=y"), false);
  assert.equal(await captureIfEligible(store, { pathname: "/discover", search: "?ref=x" }, {}, ask), false);
  assert.equal(await captureIfEligible(store, { pathname: "/discover", search: "" }, {}, ask), false);
  assert.equal(asked, 0);
  assert.equal(store.data.size, 0);
});

test("routes enforce the checks: POST decides before auth or any write, eligibility is no-store", () => {
  const post = read("src/app/api/attribution/first-touch/route.ts");
  assert.ok(post.indexOf("decideForRequest(request.headers)") !== -1);
  assert.ok(post.indexOf("decideForRequest(request.headers)") < post.indexOf("persistFirstTouch("));
  assert.match(post, /status: 204/);
  const eligibility = read("src/app/api/attribution/eligibility/route.ts");
  assert.match(eligibility, /private, no-store/);
  assert.match(eligibility, /force-dynamic/);
  // The root layout must stay free of request-time APIs so pages stay static.
  const layout = read("src/app/layout.tsx");
  assert.ok(!/from "next\/headers"/.test(layout));
});

// --- localStorage expiry ------------------------------------------------------

test("a stored first touch carries capturedAt and survives under 12 months", () => {
  const store = memoryStore();
  const t0 = Date.UTC(2026, 10, 3);
  assert.equal(captureFirstTouch(store, LANDING, {}, t0), true);
  assert.equal(JSON.parse(store.data.get(FIRST_TOUCH_KEY)!).capturedAt, t0);
  const nearlyYear = t0 + FIRST_TOUCH_MAX_AGE_MS - 1000;
  assert.equal(readLiveFirstTouch(store, nearlyYear)?.utmSource, "reddit");
  assert.equal(captureFirstTouch(store, { pathname: "/quiz", search: "?utm_source=other" }, {}, nearlyYear), false);
});

test("older than 365 days: removed, treated as absent, and a new capture is allowed", () => {
  const store = memoryStore();
  const t0 = Date.UTC(2026, 10, 3);
  captureFirstTouch(store, LANDING, {}, t0);
  store.setItem(FIRST_TOUCH_SENT_KEY, "1");
  const later = t0 + FIRST_TOUCH_MAX_AGE_MS + 1;
  assert.equal(FIRST_TOUCH_MAX_AGE_MS, 365 * 24 * 60 * 60 * 1000);
  assert.equal(readLiveFirstTouch(store, later), null);
  assert.equal(store.data.has(FIRST_TOUCH_KEY), false);
  assert.equal(store.data.has(FIRST_TOUCH_SENT_KEY), false);

  assert.equal(captureFirstTouch(store, { pathname: "/quiz", search: "?utm_source=new" }, {}, later), true);
  assert.equal(readLiveFirstTouch(store, later)?.utmSource, "new");
});

test("an entry with no capturedAt, a bad one, or one dated in the future is treated as expired", () => {
  for (const raw of [JSON.stringify({ utmSource: "x" }), "not json", JSON.stringify({ utmSource: "x", capturedAt: "soon" }), JSON.stringify({ utmSource: "x", capturedAt: Date.now() + 10 * FIRST_TOUCH_MAX_AGE_MS })]) {
    const store = memoryStore();
    store.setItem(FIRST_TOUCH_KEY, raw);
    assert.equal(readLiveFirstTouch(store), null, raw);
    assert.equal(store.data.has(FIRST_TOUCH_KEY), false, raw);
  }
});

// --- Retention SQL and script -------------------------------------------------

test("retention SQL is the single 12-month delete statement", () => {
  const sql = read("scripts/sql/attr-retention-cleanup.sql").trim();
  assert.equal(
    sql,
    `DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'`,
  );
  assert.equal(sql.split(";").filter((part) => part.trim()).length, 1);
});

test("retention script refuses without CONFIRM_DELETE=1, matches the SQL, and has an npm script", () => {
  const script = read("scripts/attr-retention-cleanup.ts");
  assert.match(script, /CONFIRM_DELETE !== "1"/);
  assert.ok(script.includes(`DELETE FROM "first_touch_attributions" WHERE "createdAt" < now() - interval '12 months'`));
  assert.ok(script.indexOf("CONFIRM_DELETE") < script.indexOf("src/lib/db"));
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
  assert.equal(pkg.scripts["db:attr-retention-cleanup"], "tsx scripts/attr-retention-cleanup.ts");
});

// --- Privacy page -------------------------------------------------------------

test("privacy page states the first-touch practices", () => {
  const page = flat(read("src/app/(app)/privacy/page.tsx"));
  for (const phrase of [
    "first-touch campaign data (utm_source, utm_medium, utm_campaign, landing page path, signup source)",
    "in your browser’s local storage, expiring after 12 months",
    "we store those values once, not linked to your account, kept 12 months then deleted",
    "We honor Do Not Track and Global Privacy Control by capturing nothing",
    "We don’t capture this in the EU, EEA, UK or Switzerland",
    "No IP address, device information or referrer is stored with it",
    "launchpadhq.admin@gmail.com",
    'lastUpdated="November 3, 2026"',
  ]) {
    assert.ok(page.includes(phrase), phrase);
  }
});

test("privacy page no longer claims no long-term storage or that DNT is ignored", () => {
  const page = flat(read("src/app/(app)/privacy/page.tsx"));
  for (const gone of [
    "We do not use first-party long-term browser storage",
    "do not change our practices based on that signal",
    "no consistent standard",
    "30 October 2026",
  ]) {
    assert.ok(!page.includes(gone), gone);
  }
});
