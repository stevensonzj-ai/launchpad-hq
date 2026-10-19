import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SITE_URL } from "@/lib/site";
import { getActivePlacement } from "@/data/sponsors";
import { TEST_ONLY_EXAMPLE_PLACEMENT } from "@/data/sponsors/test-fixture";
import {
  SITEMAP_PRIVATE_PATHS,
  SITEMAP_STATIC_PUBLIC_PATHS,
  sitemapStaticPublicPaths,
  sitemapStaticPublicPathsForNow,
  sitemapUrl,
} from "@/lib/sitemap-coverage";

const AOTW_BOOKING = {
  ...TEST_ONLY_EXAMPLE_PLACEMENT,
  id: "test-aotw-booking",
  slot: "ai-of-the-week" as const,
};

describe("sitemap coverage", () => {
  it("lists the public templates Stage 1 requires", () => {
    const paths = new Set<string>(SITEMAP_STATIC_PUBLIC_PATHS);
    for (const required of [
      "/",
      "/discover",
      "/quiz",
      "/workflows",
      "/tutorials",
      "/models",
      "/advertise",
      "/privacy",
      "/terms",
    ]) {
      assert.ok(paths.has(required), `missing ${required}`);
    }
  });

  it("keeps private routes out of the static public list", () => {
    const paths = new Set<string>(SITEMAP_STATIC_PUBLIC_PATHS);
    for (const privatePath of SITEMAP_PRIVATE_PATHS) {
      assert.equal(paths.has(privatePath), false, privatePath);
    }
  });

  it("omits /pricing while the Pro plan is disabled", () => {
    assert.equal((SITEMAP_STATIC_PUBLIC_PATHS as readonly string[]).includes("/pricing"), false);
    assert.equal(
      sitemapStaticPublicPaths({ proPlanEnabled: false }).includes("/pricing"),
      false,
    );
    assert.equal(
      sitemapStaticPublicPaths({ proPlanEnabled: true }).includes("/pricing"),
      true,
    );
  });

  it("includes /ai-of-the-week only when a sponsor is booked", () => {
    const unbooked = sitemapStaticPublicPathsForNow(new Date("2026-06-15T12:00:00Z"), []);
    assert.equal(unbooked.includes("/ai-of-the-week"), false);

    const booked = sitemapStaticPublicPathsForNow(new Date("2026-06-15T12:00:00Z"), [
      AOTW_BOOKING,
    ]);
    assert.equal(booked.includes("/ai-of-the-week"), true);
    assert.ok(
      getActivePlacement(
        "ai-of-the-week",
        new Date("2026-06-15T12:00:00Z"),
        undefined,
        [AOTW_BOOKING],
      ),
    );
  });

  it("builds production-host URLs", () => {
    assert.equal(sitemapUrl(SITE_URL, "/"), "https://www.launchpadhq.io");
    assert.equal(
      sitemapUrl(SITE_URL, "/platform/chatgpt"),
      "https://www.launchpadhq.io/platform/chatgpt",
    );
  });
});
