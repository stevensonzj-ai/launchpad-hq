import assert from "node:assert/strict";
import test from "node:test";
import {
  FIRST_TOUCH_KEY,
  alreadySent,
  analyticsProperties,
  buildSignupPayload,
  captureFirstTouch,
  markSent,
  privacySignalOn,
  readFirstTouch,
  type KeyValueStore,
} from "./first-touch";
import { MAX_BODY_BYTES, persistFirstTouch } from "./persist";
import {
  FIRST_TOUCH_FIELDS,
  MAX_PATH_LENGTH,
  MAX_TOKEN_LENGTH,
  firstTouchFromLocation,
  sanitizeFirstTouch,
  sanitizePath,
  sanitizeToken,
} from "./sanitize";

function memoryStore(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  };
}

test("sanitizeToken trims, lowercases and caps length", () => {
  assert.equal(sanitizeToken("  NewsLetter "), "newsletter");
  assert.equal(sanitizeToken("Spring Sale 2026"), "spring-sale-2026");
  assert.equal(sanitizeToken("a".repeat(500))?.length, MAX_TOKEN_LENGTH);
});

test("sanitizeToken drops values with characters outside the allowlist", () => {
  for (const bad of ["a@b.com", "x<script>", "a/b", "a;b", "é", "a=b", "", "   ", 5, null, undefined, {}]) {
    assert.equal(sanitizeToken(bad), null, String(bad));
  }
});

test("sanitizePath keeps the pathname only and never a query string or fragment", () => {
  assert.equal(sanitizePath("/Discover?utm_source=x&email=a@b.com#top"), "/discover");
  assert.equal(sanitizePath("/platform/chatgpt/guide"), "/platform/chatgpt/guide");
  assert.equal(sanitizePath("/" + "a".repeat(500))?.length, MAX_PATH_LENGTH);
});

test("sanitizePath rejects non-paths", () => {
  for (const bad of ["https://evil.example/x", "//evil.example", "discover", "/a b", "/a@b", "", null, 1]) {
    assert.equal(sanitizePath(bad), null, String(bad));
  }
});

test("firstTouchFromLocation reads only the three tags and the pathname", () => {
  const touch = firstTouchFromLocation("/Quiz", "?utm_source=Reddit&utm_medium=Social&utm_campaign=Launch_1&utm_term=skip&email=a@b.com&fbclid=zzz");
  assert.deepEqual(touch, {
    utmSource: "reddit",
    utmMedium: "social",
    utmCampaign: "launch_1",
    landingPath: "/quiz",
    signupSource: null,
  });
});

test("captureFirstTouch writes once and never overwrites an existing first touch", () => {
  const store = memoryStore();
  assert.equal(captureFirstTouch(store, { pathname: "/discover", search: "?utm_source=first" }), true);
  assert.equal(captureFirstTouch(store, { pathname: "/quiz", search: "?utm_source=second" }), false);
  assert.equal(readFirstTouch(store)?.utmSource, "first");
  assert.equal(readFirstTouch(store)?.landingPath, "/discover");
});

test("captureFirstTouch stores nothing when Do Not Track or Global Privacy Control is on", () => {
  for (const nav of [{ doNotTrack: "1" }, { globalPrivacyControl: true }]) {
    const store = memoryStore();
    assert.equal(privacySignalOn(nav), true);
    assert.equal(captureFirstTouch(store, { pathname: "/", search: "?utm_source=x" }, nav), false);
    assert.equal(store.data.size, 0);
  }
  assert.equal(privacySignalOn({ doNotTrack: "0" }), false);
  assert.equal(privacySignalOn(undefined), false);
});

test("captureFirstTouch survives storage that throws", () => {
  const broken: KeyValueStore = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };
  assert.equal(captureFirstTouch(broken, { pathname: "/", search: "" }), false);
  assert.equal(readFirstTouch(broken), null);
});

test("readFirstTouch re-sanitizes whatever is in storage", () => {
  const store = memoryStore();
  store.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utmSource: "ok", ip: "1.2.3.4", landingPath: "https://x.example" }));
  assert.deepEqual(readFirstTouch(store), {
    utmSource: "ok",
    utmMedium: null,
    utmCampaign: null,
    landingPath: null,
    signupSource: null,
  });
  store.setItem(FIRST_TOUCH_KEY, "not json");
  assert.equal(readFirstTouch(store), null);
});

test("the sent flag prevents a second signup send", () => {
  const store = memoryStore();
  assert.equal(alreadySent(store), false);
  markSent(store);
  assert.equal(alreadySent(store), true);
});

test("persistFirstTouch writes only the allowlisted fields and drops extras", async () => {
  const calls: unknown[] = [];
  const result = await persistFirstTouch(
    JSON.stringify({
      utmSource: " Reddit ",
      landingPath: "/discover?x=1",
      signupSource: "onboarding",
      ip: "203.0.113.9",
      userAgent: "Mozilla/5.0",
      referrer: "https://news.example/story",
      email: "a@b.com",
      userId: "user_123",
    }),
    { create: async (args) => void calls.push(args) },
  );
  assert.equal(result, "stored");
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], {
    data: {
      utmSource: "reddit",
      utmMedium: null,
      utmCampaign: null,
      landingPath: "/discover",
      signupSource: "onboarding",
    },
  });
});

test("persistFirstTouch rejects bad, empty and oversized bodies without writing", async () => {
  let writes = 0;
  const store = { create: async () => void writes++ };
  assert.equal(await persistFirstTouch("{nope", store), "invalid");
  assert.equal(await persistFirstTouch("[]", store), "invalid");
  assert.equal(await persistFirstTouch("null", store), "invalid");
  assert.equal(await persistFirstTouch(JSON.stringify({ utmSource: "a@b.com", ip: "1.1.1.1" }), store), "empty");
  assert.equal(await persistFirstTouch(JSON.stringify({ utmSource: "x".repeat(MAX_BODY_BYTES) }), store), "too_large");
  assert.equal(writes, 0);
});

test("stored payload keys are exactly the five attribution fields — no IP, user agent, referrer, email or user id", async () => {
  let data: Record<string, unknown> = {};
  await persistFirstTouch(JSON.stringify({ utmSource: "a", ip: "1.2.3.4", userAgent: "x", referrer: "y", email: "e", userId: "u" }), {
    create: async (args) => void (data = args.data),
  });
  assert.deepEqual(Object.keys(data).sort(), [...FIRST_TOUCH_FIELDS].sort());
  for (const forbidden of ["ip", "ipAddress", "userAgent", "ua", "referrer", "referer", "email", "userId", "clerkId"]) {
    assert.ok(!(forbidden in data), forbidden);
  }
});

test("signup payload and analytics event carry only the five fields", () => {
  const touch = sanitizeFirstTouch({ utmSource: "a", utmMedium: "b", utmCampaign: "c", landingPath: "/d" });
  const payload = buildSignupPayload(touch, "Onboarding");
  assert.equal(payload.signupSource, "onboarding");
  assert.deepEqual(Object.keys(payload).sort(), [...FIRST_TOUCH_FIELDS].sort());
  assert.deepEqual(analyticsProperties(payload), {
    utm_source: "a",
    utm_medium: "b",
    utm_campaign: "c",
    landing_path: "/d",
    signup_source: "onboarding",
  });
  assert.deepEqual(analyticsProperties(sanitizeFirstTouch({ utmSource: "a" })), { utm_source: "a" });
});
