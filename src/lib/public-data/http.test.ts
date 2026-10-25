import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { resolveDataFallback } from "./fallback";
import {
  FEED_INDEX_URL,
  feedJson,
  feedMethodNotAllowed,
  feedNotFound,
  feedRedirect,
  feedUnavailable,
  withFeedErrors,
} from "./http";
import { PublicError } from "./schema";

const HOURLY = "public, s-maxage=3600, stale-while-revalidate=86400";

function assertFeedBase(res: Response) {
  assert.equal(res.headers.get("Content-Type"), "application/json; charset=utf-8");
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), "*");
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex");
}

function feedRoutes(dir = "src/app/data/v1"): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return feedRoutes(path);
    return name === "route.ts" ? [path] : [];
  });
}

describe("feed response helpers", () => {
  it("200s cache hourly", () => {
    const res = feedJson({ ok: true });
    assert.equal(res.status, 200);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), HOURLY);
  });

  it("301s keep the hourly cache", () => {
    const res = feedRedirect("https://www.launchpadhq.io/data/v1/tools/x.json");
    assert.equal(res.status, 301);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), HOURLY);
    assert.equal(res.headers.get("Location"), "https://www.launchpadhq.io/data/v1/tools/x.json");
    assert.equal(feedRedirect(FEED_INDEX_URL, 308).status, 308);
  });

  it("404s use the error envelope, keep the not_found code and cache for a minute only", async () => {
    const res = feedNotFound();
    assert.equal(res.status, 404);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), "public, s-maxage=60, stale-while-revalidate=60");
    const body = await res.json();
    assert.equal(body.error.code, "not_found");
    assert.match(body.error.resolution, /index\.json/);
    PublicError.parse(body);
  });

  it("405s say the feed is read-only and are never cached", async () => {
    const res = feedMethodNotAllowed();
    assert.equal(res.status, 405);
    assertFeedBase(res);
    assert.equal(res.headers.get("Allow"), "GET, HEAD");
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    PublicError.parse(await res.json());
  });

  it("503s are JSON, keep the unavailable code and are never cached", async () => {
    const res = feedUnavailable();
    assert.equal(res.status, 503);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    const body = await res.json();
    assert.equal(body.error.code, "unavailable");
    PublicError.parse(body);
  });

  it("turns a throwing route body into a 503 with no internals", async (t) => {
    const logged = t.mock.method(console, "error", () => {});
    const res = await withFeedErrors(async () => {
      throw new Error("internal-driver-detail: db down");
    });
    assert.equal(res.status, 503);
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    assert.doesNotMatch(await res.text(), /internal-driver-detail|db down/);
    assert.equal(logged.mock.callCount(), 1);
    const ok = await withFeedErrors(async () => feedJson({ ok: true }));
    assert.equal(ok.status, 200);
  });
});

describe("feed routing", () => {
  it("sends bare /data and /data/v1 to the index; everything else 404s", () => {
    assert.equal(resolveDataFallback([]), "index");
    assert.equal(resolveDataFallback(["v1"]), "index");
    for (const path of [["v1", "nope"], ["v2"], ["v1", "tools"], ["v1", "tools", "a", "b"], ["anything"]]) {
      assert.equal(resolveDataFallback(path), "not_found", path.join("/"));
    }
    assert.equal(FEED_INDEX_URL, "https://www.launchpadhq.io/data/v1/index.json");
  });

  it("every feed route is read-only: other methods get the JSON 405", () => {
    const routes = feedRoutes();
    assert.ok(routes.length >= 15);
    for (const file of routes) {
      assert.match(readFileSync(file, "utf8"), /export const \{ POST, PUT, PATCH, DELETE \} = FEED_READ_ONLY;/, file);
    }
  });
});
