import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DAILY_POST_LIMIT,
  MAX_QUIZ_JSON_BYTES,
  MAX_SEARCH_QUERY_CHARS,
  clampInt,
  isHttpUrl,
  isOverDailyPostLimit,
  jsonByteLength,
  normalizeSearchQuery,
} from "./request-limits";

describe("normalizeSearchQuery (G4)", () => {
  it("trims, collapses whitespace and lowercases", () => {
    assert.equal(normalizeSearchQuery("  Chat\tGPT \n  Plus "), "chat gpt plus");
    assert.equal(normalizeSearchQuery("CHATGPT"), normalizeSearchQuery(" chatgpt  "));
  });
  it("caps the length", () => {
    assert.equal(normalizeSearchQuery("a".repeat(5000)).length, MAX_SEARCH_QUERY_CHARS);
  });
  it("handles null", () => assert.equal(normalizeSearchQuery(null), ""));
});

describe("clampInt (G11)", () => {
  it("clamps and falls back", () => {
    assert.equal(clampInt("-5", 20, 1, 50), 1);
    assert.equal(clampInt("999", 20, 1, 50), 50);
    assert.equal(clampInt("abc", 20, 1, 50), 20);
    assert.equal(clampInt(null, 1, 1, 1000), 1);
    assert.equal(clampInt("7", 20, 1, 50), 7);
  });
});

describe("quiz JSON size (G11)", () => {
  it("measures UTF-8 bytes", () => {
    assert.equal(jsonByteLength({ a: "é" }), 10);
    assert.ok(jsonByteLength({ big: "x".repeat(MAX_QUIZ_JSON_BYTES) }) > MAX_QUIZ_JSON_BYTES);
  });
});

describe("daily post limit (G9)", () => {
  it(`allows ${DAILY_POST_LIMIT - 1} and stops at ${DAILY_POST_LIMIT}`, () => {
    assert.equal(DAILY_POST_LIMIT, 20);
    assert.equal(isOverDailyPostLimit(DAILY_POST_LIMIT - 1), false);
    assert.equal(isOverDailyPostLimit(DAILY_POST_LIMIT), true);
  });
});

describe("isHttpUrl (G12)", () => {
  it("accepts http(s) only", () => {
    assert.ok(isHttpUrl("https://example.com/x"));
    assert.ok(isHttpUrl("http://example.com"));
    for (const bad of ["javascript:alert(1)", "data:text/html,hi", "ftp://x.com", "//evil.com", "example.com", "JaVaScRiPt:alert(1)"]) {
      assert.equal(isHttpUrl(bad), false, bad);
    }
  });
});
