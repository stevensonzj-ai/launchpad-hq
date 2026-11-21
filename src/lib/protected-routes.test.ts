import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { PROTECTED_ROUTE_PATTERNS } from "@/lib/protected-routes";

/**
 * Clerk's createRouteMatcher treats "(.*)" as "anything after"; for the plain
 * patterns used here an anchored RegExp is equivalent.
 */
const requiresSignIn = (pathname: string) =>
  PROTECTED_ROUTE_PATTERNS.some((pattern) => new RegExp(`^${pattern}$`).test(pathname));

/**
 * Every top-level route in src/app that anyone may open without signing in.
 * A new page must be added here or to PROTECTED_ROUTE_PATTERNS — the test
 * below fails until one of the two is chosen.
 */
const PUBLIC_TOP_LEVEL = new Set([
  "",
  "about",
  "advertise",
  "ai-of-the-week",
  "alternatives",
  "api",
  "compare",
  "connector",
  "contact",
  "data",
  "developers",
  "discover",
  "for-you",
  "how-we-make-money",
  "llms-full.txt",
  "llms.txt",
  "mcp",
  "md",
  "models",
  "platform",
  "pricing",
  "privacy",
  "quiz",
  "sign-in",
  "sign-up",
  "sponsor-guidelines",
  "support",
  "terms",
  "tutorials",
  "workflows",
]);

/** Top-level URL segment of every page.tsx / route.ts under src/app, route groups removed. */
function topLevelRoutes(): Set<string> {
  const found = new Set<string>();
  const walk = (dir: string, segments: string[]) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const isGroup = entry.name.startsWith("(") && entry.name.endsWith(")");
        walk(path.join(dir, entry.name), isGroup ? segments : [...segments, entry.name]);
      } else if (/^(page\.tsx|route\.ts)$/.test(entry.name)) {
        found.add(segments[0] ?? "");
      }
    }
  };
  walk("src/app", []);
  return found;
}

describe("protected routes", () => {
  it("asks for sign-in on the account and onboarding pages only", () => {
    for (const p of ["/account", "/account/security", "/onboarding"]) {
      assert.equal(requiresSignIn(p), true, p);
    }
    for (const p of [
      "/",
      "/discover",
      "/platform/chatgpt",
      "/quiz/results",
      "/pricing/success",
      "/sign-in",
      "/api/user/quiz",
      "/mcp",
      "/llms.txt",
      "/data/v1/catalog.json",
      "/md/discover",
      "/accounting-tools",
      "/this-page-does-not-exist",
    ]) {
      assert.equal(requiresSignIn(p), false, p);
    }
  });

  it("classifies every top-level page as public or sign-in only", () => {
    const protectedTop = new Set(PROTECTED_ROUTE_PATTERNS.map((p) => p.split("/")[1]));
    for (const segment of topLevelRoutes()) {
      assert.ok(
        PUBLIC_TOP_LEVEL.has(segment) || protectedTop.has(segment),
        `New top-level route "/${segment}": add it to PROTECTED_ROUTE_PATTERNS if it needs sign-in, otherwise to PUBLIC_TOP_LEVEL in this test.`,
      );
    }
  });

  it("is what src/proxy.ts protects", () => {
    const proxy = readFileSync("src/proxy.ts", "utf8");
    assert.match(proxy, /createRouteMatcher\(PROTECTED_ROUTE_PATTERNS\)/);
    assert.match(proxy, /if \(isProtectedRoute\(request\)\) \{\s*await auth\.protect\(\);/);
  });
});
