import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { discontinuedPlatformSlugs, hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { QUIZ_GOAL_OPTIONS } from "@/lib/quiz-options";
import {
  GOAL_CATEGORIES,
  EXPERIENCED_ONLY_CATEGORIES,
  LOCAL_CATEGORY,
  LOCAL_CHAT,
  LOCAL_IMAGE,
  NEVER_ALLOWED_CATEGORIES,
  QUIZ_DEFAULTS,
  allDefaultPicks,
} from "./quiz-defaults";

const rows = snapshotRows();
const listedCategories = new Set(rows.map((r) => r.category?.slug).filter(Boolean));

/**
 * Affiliate slugs, read as text: only AFFILIATE_LINK_CONSUMERS may import
 * src/data/affiliates.ts, and no quiz module may be one (affiliates.test.ts).
 */
function affiliateSlugs(): string[] {
  const src = readFileSync("src/data/affiliates.ts", "utf8");
  const block = src.slice(src.indexOf("export const AFFILIATE_LINKS"));
  return [...block.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1]!);
}

describe("quiz default picks (data)", () => {
  it("covers exactly the ten quiz goals", () => {
    assert.deepEqual(Object.keys(QUIZ_DEFAULTS).sort(), QUIZ_GOAL_OPTIONS.map((g) => g.id).sort());
    assert.deepEqual(Object.keys(GOAL_CATEGORIES).sort(), QUIZ_GOAL_OPTIONS.map((g) => g.id).sort());
  });

  it("every default slug is in the catalog snapshot, listed, and not discontinued", () => {
    const bySlug = new Set(rows.map((r) => r.slug));
    const hidden = new Set(hiddenPlatformSlugs());
    const discontinued = new Set(discontinuedPlatformSlugs());
    for (const { slug } of allDefaultPicks()) {
      assert.ok(bySlug.has(slug), `${slug} missing from snapshot`);
      assert.ok(!hidden.has(slug), `${slug} is hidden`);
      assert.ok(!discontinued.has(slug), `${slug} is discontinued`);
    }
  });

  it("no affiliate slug is ever a default pick", () => {
    const affiliates = affiliateSlugs();
    assert.ok(affiliates.includes("klap"), "affiliate parse found nothing");
    const picks = new Set(allDefaultPicks().map((p) => p.slug));
    assert.deepEqual(affiliates.filter((s) => picks.has(s)), []);
  });

  it("each list has no duplicates", () => {
    for (const [goal, g] of Object.entries(QUIZ_DEFAULTS)) {
      for (const list of [g.beginner, g.experienced]) {
        const slugs = list.map((p) => p.slug);
        assert.equal(new Set(slugs).size, slugs.length, goal);
      }
    }
    assert.deepEqual(LOCAL_CHAT.map((p) => p.slug), ["ollama", "lm-studio", "jan"]);
    assert.deepEqual(LOCAL_IMAGE.map((p) => p.slug), ["comfyui"]);
  });

  it("every why is one plain sentence with a dated vendor source and no prices", () => {
    for (const p of allDefaultPicks()) {
      assert.match(p.why, /^[A-Z][^]*\.$/, p.slug);
      assert.ok(p.why.split(/\s+/).length <= 30, `${p.slug}: too long`);
      assert.doesNotMatch(p.why, /[$€£]|\d+\s*%|\bfree\b|\bbest\b|\bmost\b|\bleading\b|\bWHY\b/i, p.slug);
      assert.match(p.source, /^https:\/\//, p.slug);
      assert.match(p.checkedAt, /^\d{4}-\d{2}-\d{2}$/, p.slug);
    }
  });

  it("the category guard names only live categories, and local-open-source-ai only via the runtime rule", () => {
    const named = [
      ...Object.values(GOAL_CATEGORIES).flat(),
      ...Object.values(EXPERIENCED_ONLY_CATEGORIES).flat(),
      LOCAL_CATEGORY,
      ...NEVER_ALLOWED_CATEGORIES,
    ];
    for (const c of named) assert.ok(listedCategories.has(c), c);
    for (const [goal, cats] of Object.entries(GOAL_CATEGORIES)) {
      assert.ok(!cats.includes(LOCAL_CATEGORY), goal);
      for (const never of NEVER_ALLOWED_CATEGORIES) assert.ok(!cats.includes(never), `${goal}: ${never}`);
    }
    assert.ok(!GOAL_CATEGORIES.content_creation.includes("international-regional-ai"));
    assert.ok(!GOAL_CATEGORIES.research.includes("international-regional-ai"));
    assert.ok(!GOAL_CATEGORIES.coding.includes("ai-apis-developer-services"));
  });
});
