import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { feedJson, feedNotFound, feedRedirect, feedUnavailable, withFeedErrors } from "./http";

const HOURLY = "public, s-maxage=3600, stale-while-revalidate=86400";

function assertFeedBase(res: Response) {
  assert.equal(res.headers.get("Content-Type"), "application/json; charset=utf-8");
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), "*");
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex");
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
  });

  it("404s cache for a minute only", async () => {
    const res = feedNotFound();
    assert.equal(res.status, 404);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), "public, s-maxage=60, stale-while-revalidate=60");
    assert.deepEqual(await res.json(), { error: "not_found" });
  });

  it("503s are JSON and never cached", async () => {
    const res = feedUnavailable();
    assert.equal(res.status, 503);
    assertFeedBase(res);
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    assert.deepEqual(await res.json(), { error: "unavailable" });
  });

  it("turns a throwing route body into a 503", async (t) => {
    const logged = t.mock.method(console, "error", () => {});
    const res = await withFeedErrors(async () => {
      throw new Error("db down");
    });
    assert.equal(res.status, 503);
    assert.equal(res.headers.get("Cache-Control"), "no-store");
    assert.equal(logged.mock.callCount(), 1);
    const ok = await withFeedErrors(async () => feedJson({ ok: true }));
    assert.equal(ok.status, 200);
  });
});
