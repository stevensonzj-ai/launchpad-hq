import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { apiError, apiErrorBody, apiErrorMessage, methodsNotAllowed, withApiErrors } from "./api-error";

function routeFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return routeFiles(path);
    return name === "route.ts" ? [path] : [];
  });
}

describe("API error envelope", () => {
  it("has code, message and resolution, with per-call overrides", () => {
    const body = apiErrorBody("not_found");
    assert.equal(body.error.code, "not_found");
    assert.ok(body.error.message.length > 10);
    assert.ok(body.error.resolution.length > 10);
    assert.deepEqual(apiErrorBody("bad_request", { message: "title is required", field: "title" }).error, {
      code: "bad_request",
      message: "title is required",
      resolution: apiErrorBody("bad_request").error.resolution,
      field: "title",
    });
  });

  it("maps codes to statuses and is JSON, uncached by default", async () => {
    const statuses = {
      bad_request: 400,
      unauthorized: 401,
      forbidden: 403,
      not_found: 404,
      method_not_allowed: 405,
      internal_error: 500,
      unavailable: 503,
    } as const;
    for (const [code, status] of Object.entries(statuses) as [keyof typeof statuses, number][]) {
      const res = apiError(code);
      assert.equal(res.status, status, code);
      assert.equal(res.headers.get("Content-Type"), "application/json; charset=utf-8");
      assert.equal(res.headers.get("Cache-Control"), "no-store");
      assert.equal((await res.json()).error.code, code);
    }
  });

  it("405s carry an Allow header, adding HEAD wherever GET is allowed", async () => {
    const res = methodsNotAllowed(["GET"]).POST();
    assert.equal(res.status, 405);
    assert.equal(res.headers.get("Allow"), "GET, HEAD");
    assert.equal((await res.json()).error.code, "method_not_allowed");
    assert.equal(methodsNotAllowed(["POST", "DELETE"]).GET().headers.get("Allow"), "POST, DELETE");
  });

  it("turns a throw into a 500 that leaks nothing internal", async (t) => {
    const logged = t.mock.method(console, "error", () => {});
    const res = await withApiErrors("test", async () => {
      throw new Error("internal-driver-detail: relation platforms_x does not exist");
    });
    assert.equal(res.status, 500);
    const text = await res.text();
    assert.doesNotMatch(text, /internal-driver-detail|platforms_x|stack|at \w+ \(/);
    assert.equal(JSON.parse(text).error.code, "internal_error");
    assert.equal(logged.mock.callCount(), 1);
  });

  it("client helper reads both the envelope and the older string shape", () => {
    assert.equal(apiErrorMessage(apiErrorBody("bad_request", { message: "title is required" }), "x"), "title is required");
    assert.equal(apiErrorMessage({ error: "Old style" }, "x"), "Old style");
    assert.equal(apiErrorMessage({}, "fallback"), "fallback");
    assert.equal(apiErrorMessage(null, "fallback"), "fallback");
  });
});

describe("/api routes", () => {
  const files = routeFiles("src/app/api").filter((f) => !f.includes("moderation"));

  it("never return the bare { error: string } shape any more", () => {
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      assert.doesNotMatch(source, /NextResponse\.json\(\s*\{\s*error:/, file);
    }
  });

  it("export a JSON 405 for every method they don't implement", () => {
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      if (file.includes("[...path]")) continue;
      for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
        const declared =
          new RegExp(`export (async )?function ${method}\\(`).test(source) ||
          new RegExp(`export const \\{[^}]*\\b${method}\\b[^}]*\\} = methodsNotAllowed`).test(source);
        assert.ok(declared, `${file} ${method}`);
      }
    }
  });

  it("have a JSON catch-all for unknown paths", () => {
    const source = readFileSync("src/app/api/[...path]/route.ts", "utf8");
    assert.match(source, /apiError\("not_found"/);
    for (const method of ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"]) {
      assert.match(source, new RegExp(`notFound as ${method}\\b`));
    }
  });
});
