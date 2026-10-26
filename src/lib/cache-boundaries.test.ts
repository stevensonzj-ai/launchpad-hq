import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { PUBLIC_HOURLY_CACHE } from "./public-data/http";

/**
 * Source-level guards for the Neon caching work (docs/caching.md): public
 * reads send CDN headers and go through the shared cache; anything that
 * depends on the visitor never does.
 */
const ROOT = process.cwd();
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [relative(ROOT, full).replaceAll("\\", "/")];
  });
}

const SOURCE = walk(join(ROOT, "src")).filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".test.ts"));

describe("CDN headers on public reads", () => {
  it("is one hour at the CDN with a day of stale-while-revalidate", () => {
    assert.equal(PUBLIC_HOURLY_CACHE, "public, s-maxage=3600, stale-while-revalidate=86400");
  });

  it("every public /api GET and llms.txt sends PUBLIC_HOURLY_CACHE", () => {
    for (const rel of [
      "src/app/api/categories/route.ts",
      "src/app/api/platforms/route.ts",
      "src/app/api/platforms/[slug]/route.ts",
      "src/app/api/search/route.ts",
      "src/app/llms.txt/route.ts",
    ]) {
      assert.match(read(rel), /"Cache-Control": PUBLIC_HOURLY_CACHE/, rel);
    }
  });

  it("every /data/v1 route answers through feedJson/feedHeaders and never marks success no-store", () => {
    const routes = SOURCE.filter((f) => f.startsWith("src/app/data/v1/") && f.endsWith("route.ts"));
    assert.ok(routes.length >= 15, `found ${routes.length} feed routes`);
    for (const rel of routes) {
      const src = read(rel);
      assert.match(src, /feedJson|feedHeaders/, rel);
      assert.doesNotMatch(src, /no-store|private/, rel);
    }
    assert.match(read("src/app/llms-full.txt/route.ts"), /feedHeaders\(/);
  });

  it("Markdown stays private, no-store (it shares URLs with the HTML pages)", () => {
    assert.match(read("src/app/md/[[...path]]/route.ts"), /"Cache-Control": "private, no-store"/);
  });
});

describe("what goes through the shared catalog cache", () => {
  const cachedReaders = SOURCE.filter((f) => /cachedCatalogRead\(/.test(read(f)) && f !== "src/lib/catalog-cache.ts");

  it("covers the catalog loaders, page queries and public /api reads", () => {
    for (const rel of [
      "src/lib/mcp/catalog.ts",
      "src/lib/catalog-queries.ts",
      "src/lib/platforms.ts",
      "src/lib/platform-slugs.ts",
      "src/lib/compare-data.ts",
      "src/lib/catalog-names.ts",
      "src/lib/recommendations-core.ts",
      "src/app/api/search/route.ts",
      "src/app/api/platforms/route.ts",
      "src/app/api/platforms/[slug]/route.ts",
    ]) {
      assert.ok(cachedReaders.includes(rel), `${rel} should use cachedCatalogRead`);
    }
  });

  it("no cached reader touches the visitor (auth, cookies, headers, users, favorites)", () => {
    for (const rel of cachedReaders) {
      assert.doesNotMatch(
        read(rel),
        /@clerk|auth-db|getOrCreateDbUser|\bauth\(\)|currentUser|cookies\(\)|headers\(\)|userFavorite|prisma\.user\b|stripe/i,
        rel,
      );
    }
  });

  it("the catalog pages read the catalog from the cache, not Prisma", () => {
    for (const rel of [
      "src/app/(app)/platform/[slug]/page.tsx",
      "src/app/(app)/platform/[slug]/guide/page.tsx",
      "src/app/(app)/platform/[slug]/prompts/page.tsx",
      "src/app/(app)/platform/[slug]/discussions/page.tsx",
      "src/app/(app)/discover/page.tsx",
      "src/app/(app)/tutorials/page.tsx",
      "src/app/sitemap.ts",
      "src/app/layout.tsx",
    ]) {
      assert.doesNotMatch(read(rel), /prisma\.(platform|category)\./, rel);
    }
  });

  it("pages with a favorite button still read favorites per request, uncached, and stay dynamic", () => {
    for (const rel of [
      "src/app/(app)/platform/[slug]/page.tsx",
      "src/app/(app)/platform/[slug]/guide/page.tsx",
      "src/app/(app)/discover/page.tsx",
    ]) {
      const src = read(rel);
      assert.match(src, /getOrCreateDbUser\(\)/, rel);
      assert.match(src, /prisma\.userFavorite\./, rel);
      assert.match(src, /^export const dynamic = "force-dynamic";/m, rel);
    }
  });
});

describe("auth, personalized and Stripe paths are untouched", () => {
  const PRIVATE = [
    "src/lib/auth-db.ts",
    "src/lib/stripe.ts",
    "src/lib/stripe-webhook.ts",
    "src/app/api/stripe/checkout/route.ts",
    "src/app/api/stripe/portal/route.ts",
    "src/app/api/stripe/webhook/route.ts",
    "src/app/api/user/quiz/route.ts",
    "src/app/api/platforms/[slug]/favorite/route.ts",
    "src/app/api/platforms/[slug]/prompts/route.ts",
    "src/app/api/platforms/[slug]/discussions/route.ts",
    "src/app/api/discussions/[id]/replies/route.ts",
    "src/app/api/discussions/[id]/vote/route.ts",
    "src/app/api/discussions/[id]/report/route.ts",
    "src/app/api/discussion-replies/[id]/vote/route.ts",
    "src/app/api/prompts/[id]/rate/route.ts",
    "src/app/api/prompts/[id]/report/route.ts",
    "src/app/api/moderation/route.ts",
    "src/app/(app)/for-you/page.tsx",
    "src/app/(app)/onboarding/page.tsx",
    "src/app/(app)/account/page.tsx",
    "src/app/(app)/pricing/success/page.tsx",
    "src/proxy.ts",
  ];

  it("none of them cache or import the catalog cache", () => {
    for (const rel of PRIVATE) {
      assert.doesNotMatch(
        read(rel),
        /catalog-cache|catalog-queries|unstable_cache|"use cache"|cacheTag|s-maxage|export const revalidate/,
        rel,
      );
    }
  });

  it("Stripe webhook, moderation and For You stay force-dynamic", () => {
    for (const rel of [
      "src/app/api/stripe/webhook/route.ts",
      "src/app/api/moderation/route.ts",
      "src/app/(app)/for-you/page.tsx",
    ]) {
      assert.match(read(rel), /export const dynamic = "force-dynamic"/, rel);
    }
  });

  it("only the catalog cache and the revalidate route use Next's cache APIs", () => {
    const users = SOURCE.filter((f) => /from "next\/cache"/.test(read(f))).sort();
    assert.deepEqual(users, ["src/app/api/revalidate/route.ts", "src/lib/catalog-cache.ts"]);
  });
});
