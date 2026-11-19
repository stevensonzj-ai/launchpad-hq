import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import { alternativesIndexRedirects, COMPARE_HUB_PATH, COMPARE_PAGES, comparePagePath } from "@/data/compare/pages";

// Next compiles redirect sources with this same bundled path-to-regexp.
const { pathToRegexp } = createRequire(import.meta.url)("next/dist/compiled/path-to-regexp") as {
  pathToRegexp: (path: string) => RegExp;
};

describe("/alternatives index redirect", () => {
  const redirects = alternativesIndexRedirects();
  const matches = (path: string) => redirects.some((r) => pathToRegexp(r.source).test(path));

  it("sends the bare /alternatives permanently to /compare", () => {
    assert.deepEqual(redirects, [{ source: "/alternatives", destination: COMPARE_HUB_PATH, permanent: true }]);
    assert.equal(COMPARE_HUB_PATH, "/compare");
    assert.equal(matches("/alternatives"), true);
  });

  it("does not catch any /alternatives/* page", () => {
    assert.equal(matches("/alternatives/free-zapier-alternatives"), false);
    const altPaths = COMPARE_PAGES.filter((p) => p.kind === "free-alternatives").map((p) => comparePagePath(p));
    assert.ok(altPaths.includes("/alternatives/free-zapier-alternatives"));
    for (const path of altPaths) assert.equal(matches(path), false, path);
  });

  it("is wired into next.config.ts redirects()", () => {
    const config = readFileSync("next.config.ts", "utf8");
    assert.match(config, /\.\.\.alternativesIndexRedirects\(\)/);
  });
});
