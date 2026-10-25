import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  classifyMarkdownPath,
  HTML_VARY_WITH_ACCEPT,
  KNOWN_TOP_LEVEL,
  markdownRewriteTarget,
  MARKDOWN_VARY_SOURCES,
  prefersMarkdown,
} from "./negotiate";

const CHROME =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
const FIREFOX = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
const SAFARI = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";

const get = (pathname: string, accept: string | null, extra: Partial<{ method: string; isRscRequest: boolean }> = {}) =>
  markdownRewriteTarget({ method: "GET", pathname, accept, isRscRequest: false, ...extra });

describe("prefersMarkdown", () => {
  it("is false with no header, */* or any browser Accept", () => {
    for (const accept of [null, undefined, "", "*/*", "text/*", "text/html", CHROME, FIREFOX, SAFARI, "application/json"]) {
      assert.equal(prefersMarkdown(accept), false, String(accept));
    }
  });

  it("is true for an explicit text/markdown that beats text/html", () => {
    for (const accept of [
      "text/markdown",
      "text/x-markdown",
      "text/markdown, text/html;q=0.9",
      "text/html;q=0.5, text/markdown",
      "text/markdown, */*",
      "text/markdown;q=0.9, */*;q=0.8",
      "text/markdown, text/plain;q=0.9, */*;q=0.8",
      "TEXT/MARKDOWN; charset=utf-8",
    ]) {
      assert.equal(prefersMarkdown(accept), true, accept);
    }
  });

  it("lets text/html win ties and higher q values", () => {
    for (const accept of [
      "text/html, text/markdown",
      "text/markdown, text/html",
      "text/html;q=0.9, text/markdown;q=0.9",
      "text/markdown;q=0.5, text/html",
      "text/markdown;q=0.5, text/*",
      "text/markdown;q=0, */*",
      "text/markdown;q=abc",
      `${CHROME}, text/markdown;q=0.5`,
    ]) {
      assert.equal(prefersMarkdown(accept), false, accept);
    }
  });

  it("uses the most specific range for text/html", () => {
    // An explicit text/html;q=0 overrides */*.
    assert.equal(prefersMarkdown("text/html;q=0, text/markdown;q=0.1, */*"), true);
    assert.equal(prefersMarkdown("text/*;q=0.2, text/markdown;q=0.3"), true);
  });
});

describe("classifyMarkdownPath", () => {
  it("knows which pages have a Markdown version", () => {
    for (const path of [
      "/",
      "/discover",
      "/tutorials",
      "/about",
      "/contact",
      "/developers",
      "/platform/chatgpt",
      "/platform/chatgpt/guide",
      "/workflows",
      "/workflows/blog-post-generator",
      "/compare",
      "/compare/heygen-vs-synthesia",
      "/alternatives/canva",
      "/models",
      "/models/claude",
      "/models/compare/claude-vs-gpt",
    ]) {
      assert.equal(classifyMarkdownPath(path), "markdown", path);
    }
  });

  it("leaves other real routes and files alone", () => {
    for (const path of [
      "/platform/chatgpt/prompts",
      "/platform/chatgpt/discussions",
      "/pricing",
      "/quiz",
      "/quiz/results",
      "/account",
      "/sign-in/factor-one",
      "/api/search",
      "/mcp",
      "/connector",
      "/images/launchpad/README.md",
      "/alternatives",
    ]) {
      assert.equal(classifyMarkdownPath(path), "passthrough", path);
    }
  });

  it("treats unknown top-level paths as certain 404s", () => {
    for (const path of ["/__ora-404-probe-zoip3n12", "/docs", "/.well-known/thing", "/wp-login.php"]) {
      assert.equal(classifyMarkdownPath(path), "not_found", path);
    }
  });
});

describe("markdownRewriteTarget", () => {
  it("rewrites Markdown requests to the /md route, and nothing else", () => {
    assert.equal(get("/", "text/markdown"), "/md");
    assert.equal(get("/platform/chatgpt", "text/markdown"), "/md/platform/chatgpt");
    assert.equal(get("/__probe", "text/markdown"), "/md/__probe");
    assert.equal(get("/platform/chatgpt", CHROME), null);
    assert.equal(get("/platform/chatgpt", null), null);
    assert.equal(get("/pricing", "text/markdown"), null);
  });

  it("never touches RSC/prefetch requests, writes, or the /md route itself", () => {
    assert.equal(get("/", "text/markdown", { isRscRequest: true }), null);
    assert.equal(get("/", "text/markdown", { method: "POST" }), null);
    assert.equal(get("/", "text/markdown", { method: "HEAD" }), "/md");
    assert.equal(get("/md/platform/chatgpt", "text/markdown"), null);
    assert.equal(get("/md", "text/markdown"), null);
  });
});

describe("route coverage", () => {
  const segments = (dir: string) =>
    readdirSync(dir).filter((name) => statSync(join(dir, name)).isDirectory() && !name.startsWith("(") && !name.startsWith("_"));

  it("KNOWN_TOP_LEVEL lists every top-level route and public/ entry", () => {
    const appRoutes = [...segments("src/app"), ...segments("src/app/(app)")];
    for (const name of appRoutes) assert.ok(KNOWN_TOP_LEVEL.has(name), `src/app route ${name} missing from KNOWN_TOP_LEVEL`);
    for (const name of segments("public")) assert.ok(KNOWN_TOP_LEVEL.has(name), `public/${name} missing from KNOWN_TOP_LEVEL`);
  });

  it("every Markdown path gets Vary: Accept on its HTML, keeping Next's RSC Vary entries", () => {
    for (const source of MARKDOWN_VARY_SOURCES) {
      const sample = source.replace(/:\w+/g, "x");
      assert.equal(classifyMarkdownPath(sample), "markdown", source);
    }
    assert.equal(HTML_VARY_WITH_ACCEPT, "rsc, next-router-prefetch, next-router-state-tree, next-router-segment-prefetch, Accept");
    const config = readFileSync("next.config.ts", "utf8");
    assert.match(config, /MARKDOWN_VARY_SOURCES\.map/);
  });

  it("the proxy negotiates before Clerk and keeps the matcher unchanged", () => {
    const proxy = readFileSync("src/proxy.ts", "utf8");
    const body = proxy.slice(proxy.indexOf("export default function proxy"));
    assert.ok(body.indexOf("markdownRewriteTarget") < body.indexOf("return clerk(request, event)"));
    assert.ok(proxy.includes(String.raw`"/((?!_next|data/|[^?]*\\.(?:html?|css|js(?!on)|ico|png|jpg|jpeg|gif|svg|webp|avif|ttf|woff2?|csv|txt|xml)).*)",`));
    assert.ok(proxy.includes(`"/(api|trpc)(.*)",`));
  });
});
