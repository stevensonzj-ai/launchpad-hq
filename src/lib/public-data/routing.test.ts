import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import { classifyMarkdownPath, markdownRewriteTarget } from "@/lib/markdown/negotiate";
import { PROTECTED_ROUTE_PATTERNS } from "@/lib/protected-routes";
import { SITEMAP_STATIC_PUBLIC_PATHS } from "@/lib/sitemap-coverage";

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

const isProtected = (path: string) =>
  PROTECTED_ROUTE_PATTERNS.some((pattern) => new RegExp(`^${pattern}$`).test(path));

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

  it("never runs Clerk on llms.txt or llms-full.txt, and never asks for sign-in there", () => {
    for (const path of ["/llms.txt", "/llms-full.txt"]) {
      assert.equal(runsMiddleware(path), false, path);
      assert.equal(isProtected(path), false, path);
    }
  });

  it("asks for sign-in only on the protected list, not on public paths", () => {
    // Which pages need sign-in now lives in src/lib/protected-routes.ts and is
    // covered by protected-routes.test.ts; the proxy only applies that list.
    assert.match(proxySource, /createRouteMatcher\(PROTECTED_ROUTE_PATTERNS\)/);
    assert.doesNotMatch(proxySource, /isPublicRoute/);
  });

  it("still runs on pages and API routes", () => {
    for (const path of ["/discover", "/api/x", "/platform/chatgpt", "/mcp", "/database-tools"]) {
      assert.equal(runsMiddleware(path), true, path);
    }
  });

  it("never asks for sign-in on /data", () => {
    assert.equal(isProtected("/data"), false);
  });

  it("serves the OpenAI apps challenge outside Clerk, unrewritten, as text/plain", () => {
    const path = "/.well-known/openai-apps-challenge";
    assert.equal(runsMiddleware(path), false, path);
    assert.equal(runsMiddleware(`${path}/`), false, path);
    assert.equal(isProtected(path), false, path);
    assert.equal(classifyMarkdownPath(path), "passthrough");
    assert.equal(
      markdownRewriteTarget({
        method: "GET",
        pathname: path,
        accept: "text/markdown",
        isRscRequest: false,
      }),
      null,
    );
    assert.equal(runsMiddleware("/discover"), true);
    const body = readFileSync(`public${path}`);
    assert.deepEqual(body, Buffer.from("REPLACE_WITH_OPENAI_TOKEN"));
    const config = readFileSync("next.config.ts", "utf8");
    assert.match(
      config,
      /source:\s*"\/\.well-known\/openai-apps-challenge",\s*headers:\s*\[\{\s*key:\s*"Content-Type",\s*value:\s*"text\/plain"\s*\}\]/,
    );
    assert.equal((SITEMAP_STATIC_PUBLIC_PATHS as readonly string[]).includes(path), false);
    const rules = [robots().rules].flat();
    for (const rule of rules) {
      const disallow = [rule.disallow ?? []].flat();
      for (const prefix of disallow) {
        assert.equal(path.startsWith(prefix), false, `blocked by ${prefix}`);
      }
    }
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

  it("does not disallow discussions or prompts path pages", () => {
    const rules = [robots().rules].flat();
    const paths = [
      "/platform/chatgpt/discussions",
      "/platform/chatgpt/prompts",
      "/platform/activepieces/discussions",
      "/platform/activepieces/prompts",
    ];
    for (const path of paths) {
      for (const rule of rules) {
        const disallow = [rule.disallow ?? []].flat();
        for (const prefix of disallow) {
          assert.equal(path.startsWith(prefix), false, `${path} blocked by ${prefix}`);
        }
      }
    }
  });
});
