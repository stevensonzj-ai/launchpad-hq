import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import robots from "@/app/robots";

/**
 * proxy.ts must keep literal matcher strings (Next analyzes `config`
 * statically) and importing it pulls in Clerk, so read the source instead.
 */
const proxySource = readFileSync("src/proxy.ts", "utf8");

function matcherPatterns(): RegExp[] {
  const block = /matcher:\s*\[([\s\S]*?)\n\s*\]/.exec(proxySource)?.[1] ?? "";
  const literals = [...block.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => JSON.parse(`"${m[1]}"`) as string);
  assert.ok(literals.length >= 2, "found matcher strings");
  return literals.map((pattern) => new RegExp(`^${pattern}$`));
}

const runsMiddleware = (path: string) => matcherPatterns().some((re) => re.test(path));

describe("middleware matcher", () => {
  it("never runs Clerk on the JSON feed", () => {
    for (const path of [
      "/data/v1/catalog.json",
      "/data/v1/index.json",
      "/data/v1/tools/chatgpt.json",
      "/data/v1/compare/index.json",
      "/data/v1/compare/heygen-vs-synthesia.json",
      "/data/v1/compare/synthesia-vs-heygen.json",
      "/data/v1/guides/index.json",
      "/data/v1/guides/chatgpt.json",
      "/data/v1/workflows/index.json",
      "/data/v1/workflows/blog-post-generator.json",
      "/data/v1/models/index.json",
      "/data/v1/models/claude.json",
      "/data/v1/models/compare/claude-vs-gpt.json",
      "/data/v1/quiz.json",
    ]) {
      assert.equal(runsMiddleware(path), false, path);
    }
  });

  it("never runs Clerk on llms.txt or llms-full.txt, and lists both as public", () => {
    for (const path of ["/llms.txt", "/llms-full.txt"]) {
      assert.equal(runsMiddleware(path), false, path);
      assert.ok(proxySource.includes(`"${path}",`), path);
    }
  });

  it("makes nothing else public: the public list is exactly the expected routes", () => {
    const block = /createRouteMatcher\(\[([\s\S]*?)\]\)/.exec(proxySource)?.[1] ?? "";
    const routes = [...block.matchAll(/^\s*"([^"]+)",/gm)].map((m) => m[1]);
    assert.deepEqual(routes, [
      "/",
      "/discover(.*)",
      "/platform(.*)",
      "/tutorials(.*)",
      "/workflows(.*)",
      "/models(.*)",
      "/compare(.*)",
      "/alternatives(.*)",
      "/quiz(.*)",
      "/for-you(.*)",
      "/pricing(.*)",
      "/privacy(.*)",
      "/terms(.*)",
      "/how-we-make-money(.*)",
      "/sponsor-guidelines(.*)",
      "/advertise(.*)",
      "/ai-of-the-week(.*)",
      "/connector(.*)",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api(.*)",
      "/sitemap.xml",
      "/robots.txt",
      "/llms.txt",
      "/llms-full.txt",
      "/mcp",
      "/data(.*)",
    ]);
  });

  it("still runs on pages and API routes", () => {
    for (const path of ["/discover", "/api/x", "/platform/chatgpt", "/mcp", "/database-tools"]) {
      assert.equal(runsMiddleware(path), true, path);
    }
  });

  it("lists /data as a public route", () => {
    assert.match(proxySource, /"\/data\(\.\*\)"/);
  });
});

describe("robots", () => {
  it("does not disallow /data/", () => {
    const rules = [robots().rules].flat();
    for (const rule of rules) {
      const disallow = [rule.disallow ?? []].flat();
      for (const prefix of disallow) {
        assert.ok(!"/data/v1/catalog.json".startsWith(prefix), `disallowed by ${prefix}`);
      }
    }
  });
});
