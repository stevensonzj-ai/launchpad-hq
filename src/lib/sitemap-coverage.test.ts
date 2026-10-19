import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SITE_URL } from "@/lib/site";
import {
  SITEMAP_PRIVATE_PATHS,
  SITEMAP_STATIC_PUBLIC_PATHS,
  sitemapUrl,
} from "@/lib/sitemap-coverage";

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
      "/ai-of-the-week",
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

  it("builds production-host URLs", () => {
    assert.equal(sitemapUrl(SITE_URL, "/"), "https://www.launchpadhq.io");
    assert.equal(
      sitemapUrl(SITE_URL, "/platform/chatgpt"),
      "https://www.launchpadhq.io/platform/chatgpt",
    );
  });
});
