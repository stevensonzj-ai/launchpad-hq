import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  discontinuedPlatformSlugs,
  hiddenPlatformSlugs,
  recommendablePlatformWhere,
} from "@/lib/catalog-visibility";
import { PUBLIC_REVIEW_SELECT } from "@/lib/public-reviews";

describe("quiz recommendations exclude retired tools", () => {
  it("drops discontinued tools (PlayHT, Sora 2) and every hidden slug", () => {
    const excluded = recommendablePlatformWhere().slug.notIn;
    for (const slug of ["play-ht", "sora-2", "relay-app", "kakao-brain-karlo", "canva-magic-studio"]) {
      assert.ok(excluded.includes(slug), slug);
    }
    for (const slug of [...hiddenPlatformSlugs(), ...discontinuedPlatformSlugs()]) {
      assert.ok(excluded.includes(slug), slug);
    }
    assert.equal(new Set(excluded).size, excluded.length);
  });

  it("keeps live tools recommendable", () => {
    const excluded = recommendablePlatformWhere().slug.notIn;
    for (const slug of ["chatgpt", "elevenlabs", "suno"]) {
      assert.equal(excluded.includes(slug), false, slug);
    }
  });

  it("recommendations-core uses the recommendable filter", () => {
    const src = readFileSync("src/lib/recommendations-core.ts", "utf8");
    assert.match(src, /recommendablePlatformWhere\(\)/);
  });
});

describe("GET /api/platforms/[slug]", () => {
  const src = readFileSync("src/app/api/platforms/[slug]/route.ts", "utf8");

  it("404s hidden and redirected slugs", () => {
    assert.match(src, /isHiddenPlatform\(platform\.slug\)/);
  });

  it("returns no reviewer identity", () => {
    assert.deepEqual(Object.keys(PUBLIC_REVIEW_SELECT).sort(), [
      "body",
      "createdAt",
      "helpful",
      "id",
      "rating",
      "title",
    ]);
    assert.doesNotMatch(src, /avatarUrl|user:\s*\{/);
    assert.match(src, /select: PUBLIC_REVIEW_SELECT/);
  });
});
