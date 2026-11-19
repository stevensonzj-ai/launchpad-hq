import test from "node:test";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import {
  buildDiscoverQuery,
  normalizeSort,
  applyPopularOrder,
  clampDiscoverPage,
  discoverCanonicalPath,
  discoverOrderBy,
  discoverPageBounds,
  discoverPageCount,
  letterPages,
  compareDiscoverNames,
  discoverLetter,
  sortByDiscoverName,
  sortDiscoverCatalog,
  DISCOVER_PAGE_SIZE,
} from "./discover-filters";
import { DISCOVER_POPULAR_SLUGS } from "../data/discover-popular";
import { AFFILIATE_LINKS } from "../data/affiliates";

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

// ---------------------------------------------------------------------------
// Popular order and paging (Package 2a, 2026-11-19)
// ---------------------------------------------------------------------------
const tool = (slug: string, name: string, category = "text", createdAt = "2026-01-01") => ({
  slug,
  name,
  category,
  createdAt: new Date(createdAt),
});

const sample = [
  tool("aiva", "AIVA", "audio"),
  tool("claude", "Claude"),
  tool("activepieces", "Activepieces", "automation"),
  tool("zapier", "Zapier", "automation"),
  tool("chatgpt", "ChatGPT"),
  tool("ai21-labs-jamba", "AI21 Labs"),
];

test("Popular puts the editorial list first, in list order, then the rest by name", () => {
  const order = sortDiscoverCatalog(sample, "popular").map((p) => p.slug);
  assert.deepEqual(order, ["chatgpt", "claude", "zapier", "activepieces", "ai21-labs-jamba", "aiva"]);
});

test("Popular order applies to whatever a filter leaves", () => {
  const automation = sample.filter((p) => p.category === "automation");
  assert.deepEqual(sortDiscoverCatalog(automation, "popular").map((p) => p.slug), ["zapier", "activepieces"]);
  const none = sample.filter((p) => p.category === "audio");
  assert.deepEqual(sortDiscoverCatalog(none, "popular").map((p) => p.slug), ["aiva"]);
});

test("applyPopularOrder keeps the read's name order for unlisted tools", () => {
  const byName = sortDiscoverCatalog(sample, "alpha");
  assert.deepEqual(applyPopularOrder(byName), sortDiscoverCatalog(sample, "popular"));
});

test("Popular and A–Z share one orderBy (one cache entry); featured no longer ranks", () => {
  assert.deepEqual(discoverOrderBy("popular"), discoverOrderBy("alpha"));
  const featured = [{ ...tool("zz-tool", "Zz Tool"), featured: true }, { ...tool("aa-tool", "Aa Tool"), featured: false }];
  assert.deepEqual(sortDiscoverCatalog(featured, "popular").map((p) => p.slug), ["aa-tool", "zz-tool"]);
});

test("A–Z and Recent are unchanged by the popular list", () => {
  assert.deepEqual(sortDiscoverCatalog(sample, "alpha").map((p) => p.name), ["Activepieces", "AI21 Labs", "AIVA", "ChatGPT", "Claude", "Zapier"]);
  const recent = [tool("chatgpt", "ChatGPT", "text", "2026-01-01"), tool("new-tool", "New", "text", "2026-06-01")];
  assert.deepEqual(sortDiscoverCatalog(recent, "recent").map((p) => p.slug), ["new-tool", "chatgpt"]);
});

test("The popular list has no duplicates and no affiliate slugs", () => {
  assert.equal(new Set(DISCOVER_POPULAR_SLUGS).size, DISCOVER_POPULAR_SLUGS.length);
  for (const slug of Object.keys(AFFILIATE_LINKS)) {
    assert.ok(!DISCOVER_POPULAR_SLUGS.includes(slug), `${slug} is an affiliate and must not be in the popular list`);
  }
});

test("Paging math: 24 per page, page count and slice bounds", () => {
  assert.equal(DISCOVER_PAGE_SIZE, 24);
  assert.equal(discoverPageCount(0), 1);
  assert.equal(discoverPageCount(24), 1);
  assert.equal(discoverPageCount(25), 2);
  assert.equal(discoverPageCount(222), 10);
  assert.deepEqual(discoverPageBounds(1, 222), { start: 0, end: 24 });
  assert.deepEqual(discoverPageBounds(10, 222), { start: 216, end: 222 });
  assert.deepEqual(discoverPageBounds(1, 0), { start: 0, end: 0 });
});

test("Page numbers clamp to the nearest valid page", () => {
  assert.equal(clampDiscoverPage(undefined, 222), 1);
  assert.equal(clampDiscoverPage("3", 222), 3);
  assert.equal(clampDiscoverPage("0", 222), 1);
  assert.equal(clampDiscoverPage("-4", 222), 1);
  assert.equal(clampDiscoverPage("banana", 222), 1);
  assert.equal(clampDiscoverPage("2.5", 222), 1);
  assert.equal(clampDiscoverPage("99", 222), 10);
  assert.equal(clampDiscoverPage("99999999999999999999", 222), 10);
  assert.equal(clampDiscoverPage("5", 0), 1);
});

test("Paging links keep filters, search and sort; page 1 stays clean", () => {
  assert.equal(buildDiscoverQuery({ page: 1 }), "");
  assert.equal(buildDiscoverQuery({ sort: "popular", page: 2 }), "?page=2");
  const values = new URLSearchParams(buildDiscoverQuery({ q: "notes", category: "meetings-notes", cost: "free", sort: "alpha", page: 3 }));
  assert.equal(values.get("q"), "notes");
  assert.equal(values.get("category"), "meetings-notes");
  assert.equal(values.get("cost"), "free");
  assert.equal(values.get("sort"), "alpha");
  assert.equal(values.get("page"), "3");
});

test("A–Z letters map to the page holding their first tool", () => {
  const names = [
    "3D Tool",
    ...Array.from({ length: 30 }, (_, i) => `Alpha ${String(i).padStart(2, "0")}`),
    "Beta",
    ...Array.from({ length: 20 }, (_, i) => `Cobalt ${i}`),
    "Zed",
  ].map((name) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));
  const pages = letterPages(names);
  assert.equal(pages.get("#"), 1);
  assert.equal(pages.get("A"), 1);
  assert.equal(pages.get("B"), 2); // index 31
  assert.equal(pages.get("C"), 2); // index 32
  assert.equal(pages.get("Z"), 3); // index 52
  assert.equal(pages.has("D"), false);
});

test("Only the unfiltered default list at page 2+ is self-canonical", () => {
  assert.equal(discoverCanonicalPath({}, 1), "/discover");
  assert.equal(discoverCanonicalPath({}, 2), "/discover?page=2");
  assert.equal(discoverCanonicalPath({ sort: "popular" }, 4), "/discover?page=4");
  assert.equal(discoverCanonicalPath({ sort: "alpha" }, 2), "/discover");
  assert.equal(discoverCanonicalPath({ q: "notes" }, 2), "/discover");
  assert.equal(discoverCanonicalPath({ q: "  " }, 2), "/discover?page=2");
  assert.equal(discoverCanonicalPath({ category: "voice-speech" }, 3), "/discover");
  assert.equal(discoverCanonicalPath({ cost: "free" }, 1), "/discover");
});

test("Discover's cached read has no row cap, so every matching tool is reachable", () => {
  const source = readFileSync("src/lib/catalog-queries.ts", "utf8");
  const start = source.indexOf("export const getDiscoverPlatforms");
  assert.ok(start >= 0, "getDiscoverPlatforms not found");
  const end = source.indexOf("\nexport ", start + 1);
  const body = source.slice(start, end === -1 ? undefined : end);
  assert.ok(body.includes("prisma.platform.findMany"), "getDiscoverPlatforms body not isolated");
  assert.doesNotMatch(body, /\btake\s*:/);
});

// ---------------------------------------------------------------------------
// Case-insensitive name order (Package 2b, 2026-11-19)
// ---------------------------------------------------------------------------
const named = (name: string, slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) => ({ name, slug });

test("Name order ignores case: Activepieces before AI21 Labs before AIVA", () => {
  const order = sortByDiscoverName([named("AIVA"), named("Activepieces"), named("AI21 Labs")]).map((p) => p.name);
  assert.deepEqual(order, ["Activepieces", "AI21 Labs", "AIVA"]);
});

test("Equal names fall back to slug order", () => {
  assert.ok(compareDiscoverNames(named("Jasper", "jasper"), named("jasper", "jasper-ai")) < 0);
  assert.ok(compareDiscoverNames(named("jasper", "jasper-ai"), named("Jasper", "jasper")) > 0);
});

test("The tail after the Popular list uses the same name order", () => {
  const rows = [tool("aiva", "AIVA"), tool("v0", "v0"), tool("claude", "Claude"), tool("activepieces", "Activepieces"), tool("vllm", "vLLM"), tool("vapi", "Vapi")];
  assert.deepEqual(sortDiscoverCatalog(rows, "popular").map((p) => p.slug), ["claude", "activepieces", "aiva", "v0", "vapi", "vllm"]);
});

const LOWERCASE_INITIALS = ["llama.cpp", "n8n", "tl;dv", "v0", "vLLM"];
const catalogNames = [
  "3D Tool", "Activepieces", "AIVA", "Lovable", "LM Studio", "Notion AI", "Ollama",
  "Tabnine", "Tome", "Vapi", "Veed", "Zapier", ...LOWERCASE_INITIALS,
].map((name) => named(name));

test("Lowercase-initial names sort under their letter, with one heading per letter", () => {
  const order = sortByDiscoverName(catalogNames);
  for (const name of LOWERCASE_INITIALS) {
    const index = order.findIndex((p) => p.name === name);
    const letter = discoverLetter(name);
    assert.equal(letter, name[0].toUpperCase(), name);
    assert.equal(discoverLetter(order[index - 1].name) === letter || discoverLetter(order[index + 1]?.name ?? "") === letter, true, `${name} sits next to its letter`);
  }
  // Headings are the runs of equal letters in A–Z order: each letter is one run.
  const runs = order.map((p) => discoverLetter(p.name)).filter((letter, i, all) => i === 0 || all[i - 1] !== letter);
  assert.equal(new Set(runs).size, runs.length, `duplicate letter heading in ${runs.join(",")}`);
  assert.equal(order.at(-1)?.name, "Zapier");
});

test("Letter-to-page mapping follows the case-insensitive order", () => {
  const pages = letterPages(catalogNames, 4);
  // Order: 3D Tool, Activepieces, AIVA, llama.cpp | LM Studio, Lovable, n8n, Notion AI | Ollama, Tabnine, tl;dv, Tome | v0, Vapi, Veed, vLLM | Zapier
  assert.equal(pages.get("#"), 1);
  assert.equal(pages.get("L"), 1);
  assert.equal(pages.get("N"), 2);
  assert.equal(pages.get("T"), 3);
  assert.equal(pages.get("V"), 4);
  assert.equal(pages.get("Z"), 5);
});
