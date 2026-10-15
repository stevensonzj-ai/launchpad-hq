import test from "node:test";
import assert from "node:assert/strict";
import { buildDiscoverQuery, normalizeSort } from "./discover-filters";

test("Discover search survives category, cost, skill, access, and sort navigation", () => {
  const query = buildDiscoverQuery({ q: "  writing & research  ", category: "research-academic-tools", cost: "free-tier", difficulty: "beginner", mobile: "app", sort: "alpha" });
  const values = new URLSearchParams(query);
  assert.equal(values.get("q"), "writing & research");
  assert.equal(values.get("category"), "research-academic-tools");
  assert.equal(values.get("cost"), "free-tier");
  assert.equal(values.get("difficulty"), "beginner");
  assert.equal(values.get("mobile"), "app");
  assert.equal(values.get("sort"), "alpha");
});

test("Empty search and default sort do not pollute existing Discover URLs", () => {
  assert.equal(buildDiscoverQuery({ q: "  ", sort: "popular" }), "");
  assert.equal(buildDiscoverQuery({ category: "voice-speech", q: "" }), "?category=voice-speech");
  assert.equal(normalizeSort("unexpected"), "popular");
});

test("Search is bounded and removing search preserves the other filters", () => {
  assert.equal(new URLSearchParams(buildDiscoverQuery({ q: "x".repeat(500) })).get("q")?.length, 120);
  const query = buildDiscoverQuery({ category: "workflow-automation", cost: "free", q: undefined });
  assert.equal(query, "?category=workflow-automation&cost=free");
});
