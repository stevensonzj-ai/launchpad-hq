import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { MAX_REVALIDATE_SLUGS, checkRevalidateAuth, handleRevalidate, revalidateTags } from "./revalidate";

const SECRET = "s3cret-value";

function post(body?: string, authorization?: string): Request {
  const headers: Record<string, string> = {};
  if (authorization !== undefined) headers.Authorization = authorization;
  return new Request("https://example.test/api/revalidate", { method: "POST", headers, body });
}

async function call(req: Request, { secret }: { secret: string | undefined } = { secret: SECRET }) {
  const tags: string[] = [];
  const res = await handleRevalidate(req, { secret, revalidate: (tag) => tags.push(tag) });
  const text = await res.text();
  return { res, tags, text, json: JSON.parse(text) };
}

describe("checkRevalidateAuth", () => {
  it("is unconfigured when the env var is unset or empty, whatever is sent", () => {
    assert.equal(checkRevalidateAuth(`Bearer ${SECRET}`, undefined), "unconfigured");
    assert.equal(checkRevalidateAuth("Bearer ", ""), "unconfigured");
  });

  it("accepts only the exact bearer token", () => {
    assert.equal(checkRevalidateAuth(`Bearer ${SECRET}`, SECRET), "ok");
    assert.equal(checkRevalidateAuth(`bearer ${SECRET}`, SECRET), "ok");
    assert.equal(checkRevalidateAuth(null, SECRET), "unauthorized");
    assert.equal(checkRevalidateAuth(SECRET, SECRET), "unauthorized");
    assert.equal(checkRevalidateAuth(`Bearer ${SECRET}x`, SECRET), "unauthorized");
    assert.equal(checkRevalidateAuth(`Bearer ${SECRET.slice(0, -1)}`, SECRET), "unauthorized");
    assert.equal(checkRevalidateAuth("Bearer wrong", SECRET), "unauthorized");
  });

  it("compares in constant time over digests", () => {
    const src = readFileSync(join(process.cwd(), "src/lib/revalidate.ts"), "utf8");
    assert.match(src, /timingSafeEqual\(digest\(match\[1\]\), digest\(secret\)\)/);
    assert.doesNotMatch(src, /=== secret|secret ===/);
  });
});

describe("POST /api/revalidate handler", () => {
  it("503s and revalidates nothing when REVALIDATE_SECRET is unset", async () => {
    const { res, tags, json } = await call(post("", `Bearer ${SECRET}`), { secret: undefined });
    assert.equal(res.status, 503);
    assert.equal(json.error.code, "unavailable");
    assert.deepEqual(tags, []);
    assert.equal(res.headers.get("Cache-Control"), "no-store");
  });

  it("401s with no token and with a wrong token, revalidating nothing", async () => {
    for (const auth of [undefined, "Bearer nope", `Basic ${SECRET}`]) {
      const { res, tags, json } = await call(post("", auth));
      assert.equal(res.status, 401, String(auth));
      assert.equal(json.error.code, "unauthorized");
      assert.deepEqual(tags, []);
    }
  });

  it("does not echo the secret in any response", async () => {
    for (const req of [post("", "Bearer nope"), post("{bad", `Bearer ${SECRET}`), post("", `Bearer ${SECRET}`)]) {
      const { text } = await call(req);
      assert.doesNotMatch(text, new RegExp(SECRET));
    }
  });

  it("expires the catalog tag with no body or an empty object", async () => {
    for (const body of ["", "{}"]) {
      const { res, tags, json } = await call(post(body, `Bearer ${SECRET}`));
      assert.equal(res.status, 200);
      assert.deepEqual(tags, ["catalog"]);
      assert.deepEqual(json, { revalidated: true, tags: ["catalog"] });
    }
  });

  it("expires only the named platforms when slugs are sent", async () => {
    const { res, tags } = await call(post(JSON.stringify({ slugs: ["chatgpt", "claude", "chatgpt"] }), `Bearer ${SECRET}`));
    assert.equal(res.status, 200);
    assert.deepEqual(tags, ["platform:chatgpt", "platform:claude"]);
  });

  it("400s on bad JSON or bad slugs without revalidating", async () => {
    for (const body of ["{bad", "[]", '"x"', '{"slugs": []}', '{"slugs": ["Bad Slug"]}', '{"slugs": [1]}']) {
      const { res, tags } = await call(post(body, `Bearer ${SECRET}`));
      assert.equal(res.status, 400, body);
      assert.deepEqual(tags, []);
    }
    const tooMany = Array.from({ length: MAX_REVALIDATE_SLUGS + 1 }, (_, i) => `s${i}`);
    assert.ok("error" in revalidateTags({ slugs: tooMany }));
  });

  it("the route reads REVALIDATE_SECRET, expires immediately, and is POST-only", () => {
    const src = readFileSync(join(process.cwd(), "src/app/api/revalidate/route.ts"), "utf8");
    assert.match(src, /secret: process\.env\.REVALIDATE_SECRET/);
    assert.match(src, /revalidateTag\(tag, \{ expire: 0 \}\)/);
    assert.match(src, /methodsNotAllowed\(\["POST"\]\)/);
    assert.match(src, /export const dynamic = "force-dynamic"/);
  });
});
