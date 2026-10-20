import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getAppBaseUrl } from "@/lib/app-url";
import { buildModerationLinks } from "@/lib/email";

test("getAppBaseUrl: production is the canonical www host", () => {
  assert.equal(
    getAppBaseUrl({ VERCEL_ENV: "production", VERCEL_URL: "launchpad-abc.vercel.app" }),
    "https://www.launchpadhq.io",
  );
});

test("getAppBaseUrl: preview is the deployment's own host", () => {
  assert.equal(
    getAppBaseUrl({ VERCEL_ENV: "preview", VERCEL_URL: "launchpad-abc.vercel.app" }),
    "https://launchpad-abc.vercel.app",
  );
});

test("getAppBaseUrl: local and unknown environments use localhost", () => {
  assert.equal(getAppBaseUrl({}), "http://localhost:3000");
  assert.equal(getAppBaseUrl({ VERCEL_ENV: "development" }), "http://localhost:3000");
  assert.equal(getAppBaseUrl({ VERCEL_ENV: "preview" }), "http://localhost:3000");
});

test("moderation links ignore a forged Origin header and point at www in production", () => {
  const saved = { env: process.env.VERCEL_ENV, secret: process.env.MODERATION_SECRET };
  process.env.VERCEL_ENV = "production";
  process.env.MODERATION_SECRET = "test-secret";
  try {
    // The request a submission route would receive. Nothing in the link path
    // accepts it: buildModerationLinks has no request or header input.
    const request = new Request("https://www.launchpadhq.io/api/platforms/chatgpt/prompts", {
      method: "POST",
      headers: { origin: "https://evil.example", host: "evil.example" },
    });
    assert.equal(request.headers.get("origin"), "https://evil.example");

    const { approveUrl, rejectUrl } = buildModerationLinks("prompt", "row_1");
    for (const url of [approveUrl, rejectUrl]) {
      assert.ok(url.startsWith("https://www.launchpadhq.io/api/moderation?token="), url);
      assert.ok(!url.includes("evil.example"), url);
    }
  } finally {
    if (saved.env === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = saved.env;
    if (saved.secret === undefined) delete process.env.MODERATION_SECRET;
    else process.env.MODERATION_SECRET = saved.secret;
  }
});

test("link-building routes never read the Origin or Host request headers", () => {
  const files = [
    "src/app/api/platforms/[slug]/prompts/route.ts",
    "src/app/api/platforms/[slug]/discussions/route.ts",
    "src/app/api/discussions/[id]/replies/route.ts",
    "src/app/api/stripe/checkout/route.ts",
    "src/app/api/stripe/portal/route.ts",
    "src/lib/email.ts",
  ];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    assert.ok(!/headers\.get\(\s*["'](origin|host|x-forwarded-host)["']/i.test(source), file);
    assert.ok(!source.includes("NEXT_PUBLIC_APP_URL"), file);
  }
});
