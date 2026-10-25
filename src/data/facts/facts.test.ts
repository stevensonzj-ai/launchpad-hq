import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { dirname } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { getModelFamilyBySlug, type ModelVersion } from "@/data/models";
import { auditToolFacts, auditToolFactsList } from "./audit";
import { diffToolFacts, renderFactsDiffMarkdown } from "./diff";
import { FACT_PAGE_SKIP_FILES } from "./filenames";
import { missingSourceFacts } from "./fixtures/missing-source";
import { retiredTermFacts } from "./fixtures/retired-term";
import { staleFacts } from "./fixtures/stale";
import { validExampleFacts } from "./fixtures/valid-example";
import { overlayPlatformWithFacts } from "./overlay";
import { REGISTERED_TOOL_FACTS, listRegisteredToolFacts } from "./registry";
import { isPublishedVerified, publishedUsageLimits } from "./walk";

const NOW = new Date("2026-10-14T12:00:00.000Z");

describe("fact-file audit", () => {
  it("fails when a fact has no source", () => {
    const issues = auditToolFacts(missingSourceFacts, NOW);
    assert.ok(
      issues.some((issue) => issue.kind === "missing-source" && issue.field === "freeTier"),
      `expected missing-source, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a non-price fact is older than 60 days", () => {
    const issues = auditToolFacts(staleFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "verdict" &&
          issue.message.includes("limit 60"),
      ),
      `expected stale verdict, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a price fact is older than 30 days", () => {
    const issues = auditToolFacts(staleFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "plans" &&
          issue.message.includes("limit 30"),
      ),
      `expected stale plans, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a retired term appears", () => {
    const issues = auditToolFacts(retiredTermFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "retired-term" &&
          issue.message.includes("GPT-4o mini"),
      ),
      `expected retired-term, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when usageLimits has no sourceUrl or checkedAt", () => {
    const issues = auditToolFacts(
      {
        slug: "kling-ai",
        lifecycle: "active",
        usageLimits: {
          value: { creditsExpire: "Plan credits expire at renewal" },
          sourceUrl: "",
          checkedAt: "",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.ok(
      issues.some((issue) => issue.kind === "missing-source" && issue.field === "usageLimits"),
      `expected missing-source on usageLimits, got ${JSON.stringify(issues)}`,
    );
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "usageLimits" &&
          issue.message.includes("YYYY-MM-DD"),
      ),
      `expected checkedAt format failure on usageLimits, got ${JSON.stringify(issues)}`,
    );
  });

  it("uses a 90-day recheck window for usageLimits on video/image tools", () => {
    const fresh = auditToolFacts(
      {
        slug: "kling-ai",
        lifecycle: "active",
        usageLimits: {
          value: { creditsExpire: "Membership credits expire" },
          sourceUrl: "https://kling.ai/docs/payment-policy",
          checkedAt: "2026-07-20",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.equal(
      fresh.some((issue) => issue.kind === "stale" && issue.field === "usageLimits"),
      false,
      `86-day usageLimits on a video tool should be fresh, got ${JSON.stringify(fresh)}`,
    );

    const stale = auditToolFacts(
      {
        slug: "kling-ai",
        lifecycle: "active",
        usageLimits: {
          value: { creditsExpire: "Membership credits expire" },
          sourceUrl: "https://kling.ai/docs/payment-policy",
          checkedAt: "2026-07-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.ok(
      stale.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "usageLimits" &&
          issue.message.includes("limit 90"),
      ),
      `expected 90-day stale usageLimits, got ${JSON.stringify(stale)}`,
    );
  });

  it("keeps the 60-day window for usageLimits on non video/image tools", () => {
    const issues = auditToolFacts(
      {
        slug: "chatgpt",
        lifecycle: "active",
        usageLimits: {
          value: { other: ["Example unused field"] },
          sourceUrl: "https://example.com/chatgpt/usage",
          checkedAt: "2026-08-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "usageLimits" &&
          issue.message.includes("limit 60"),
      ),
      `expected 60-day stale usageLimits on a chat tool, got ${JSON.stringify(issues)}`,
    );
  });

  it("keeps unverified or pending usageLimits unpublished", () => {
    const base = {
      value: { rollover: "No rollover" },
      sourceUrl: "https://example.com/usage",
      checkedAt: "2026-10-01",
      gatheredBy: "research-analyst",
    };
    assert.equal(
      isPublishedVerified({ ...base, status: "unverified", verifiedBy: "ra" }),
      false,
    );
    assert.equal(
      isPublishedVerified({ ...base, status: "verified", verifiedBy: "pending" }),
      false,
    );
    assert.equal(
      isPublishedVerified({
        ...base,
        status: "verified",
        verifiedBy: "cos",
      }),
      false,
    );
    assert.equal(
      isPublishedVerified({
        ...base,
        status: "verified",
        verifiedBy: "cos",
        verifiedAt: "2026-10-02",
      }),
      true,
    );
    assert.equal(
      publishedUsageLimits({
        slug: "kling-ai",
        lifecycle: "active",
        usageLimits: {
          ...base,
          status: "verified",
          verifiedBy: "ra",
          verifiedAt: "2026-10-17",
        },
      })?.value.rollover,
      "No rollover",
    );
    assert.equal(
      publishedUsageLimits({
        slug: "kling-ai",
        lifecycle: "active",
        usageLimits: { ...base, status: "unverified", verifiedBy: "ra" },
      }),
      undefined,
    );
  });

  it("accepts a complete, fresh, sourced fixture", () => {
    const issues = auditToolFacts(validExampleFacts, NOW);
    assert.deepEqual(issues, []);
  });

  it("reports a free-tier / $0 plan contradiction", () => {
    const issues = auditToolFacts(
      {
        slug: "fixture-contradiction",
        lifecycle: "active",
        freeTier: {
          value: { available: false, summary: "None" },
          sourceUrl: "https://example.com/contradiction",
          checkedAt: "2026-10-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
        plans: {
          value: [{ name: "Free", price: "$0", period: "month", limits: "none" }],
          sourceUrl: "https://example.com/contradiction",
          checkedAt: "2026-10-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.ok(issues.some((issue) => issue.kind === "contradiction"));
  });

  it("keeps the registered catalog clean against the real current date", () => {
    const issues = auditToolFactsList(listRegisteredToolFacts(), new Date());
    assert.deepEqual(issues, []);
  });

  it("fails if a fact file is not registered", () => {
    const dir = dirname(fileURLToPath(import.meta.url));
    const skip = new Set<string>(FACT_PAGE_SKIP_FILES);
    const slugs = readdirSync(dir)
      .filter((name) => name.endsWith(".ts") && !skip.has(name))
      .map((name) => name.replace(/\.ts$/, ""));
    const missing = slugs.filter((slug) => !REGISTERED_TOOL_FACTS[slug]);
    assert.deepEqual(
      missing,
      [],
      `unregistered fact files: ${missing.join(", ")}`,
    );
    for (const slug of slugs) {
      assert.equal(REGISTERED_TOOL_FACTS[slug]?.slug, slug);
    }
  });
});

describe("overlayPlatformWithFacts", () => {
  it("returns the DB row unchanged when no fact file exists", () => {
    const platform = {
      description: "db description",
      currentPricing: "db pricing",
      freeTierFeatures: "db free",
      platformType: ["Web"],
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
    };
    assert.deepEqual(overlayPlatformWithFacts(platform, undefined), {
      ...platform,
      macosAppUrl: null,
      windowsAppUrl: null,
      linuxAppUrl: null,
      usageLimits: null,
      apiPricing: null,
      company: null,
    });
  });

  it("overlays priced and free-tier fields from a fact file", () => {
    const platform = {
      description: "db description",
      currentPricing: "db pricing",
      freeTierFeatures: "GPT-4o mini leftover",
      platformType: ["Web"],
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
    };
    const view = overlayPlatformWithFacts(platform, validExampleFacts);
    assert.equal(view.description, validExampleFacts.verdict?.value);
    assert.equal(view.freeTierFeatures, validExampleFacts.freeTier?.value.summary);
    assert.match(view.currentPricing ?? "", /Plus: \$20\/month/);
    assert.deepEqual(view.platformType, ["Web", "iOS", "Android"]);
    assert.equal(view.hasMobileApp, true);
    assert.equal(view.iosAppUrl, "https://apps.example.com/fixture-valid");
  });

  it("overlays display name, company, and API pricing when present", () => {
    const platform = {
      name: "Freepik AI",
      company: "db company",
      description: null,
      currentPricing: null,
      freeTierFeatures: null,
      platformType: ["Web"],
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
    };
    const view = overlayPlatformWithFacts(platform, {
      slug: "freepik-ai",
      lifecycle: "active",
      displayName: {
        value: "Magnific (formerly Freepik)",
        sourceUrl: "https://www.magnific.com/pricing",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        verifiedBy: "pending",
        status: "unverified",
      },
      company: {
        value: "Overlay Co",
        sourceUrl: "https://example.com/company",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        verifiedBy: "pending",
        status: "unverified",
      },
      apiPricing: {
        value: "Sold separately.",
        sourceUrl: "https://example.com/api",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        verifiedBy: "pending",
        status: "unverified",
      },
    });
    assert.equal(view.name, "Magnific (formerly Freepik)");
    assert.equal(view.company, "Overlay Co");
    assert.equal(view.apiPricing, "Sold separately.");
  });

  it("clears leftover store URLs when apps facts omit them", () => {
    const platform = {
      description: null,
      currentPricing: null,
      freeTierFeatures: null,
      usageLimits: "higher limits with a leftover paid label",
      platformType: ["Web"],
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/app/apple-store/id6670324846",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.x.grok",
    };
    const view = overlayPlatformWithFacts(platform, {
      slug: "fixture-apps",
      lifecycle: "active",
      freeTier: {
        value: { available: true, summary: "limited, exact limit not published" },
        sourceUrl: "https://example.com/apps",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        status: "unverified",
      },
      apps: {
        value: { macos: "https://x.ai/bot#download" },
        sourceUrl: "https://x.ai/bot#download",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        status: "unverified",
      },
    });
    assert.equal(view.iosAppUrl, null);
    assert.equal(view.androidAppUrl, null);
    assert.equal(view.macosAppUrl, "https://x.ai/bot#download");
    assert.equal(view.windowsAppUrl, null);
    assert.equal(view.linuxAppUrl, null);
    assert.equal(view.hasMobileApp, false);
    assert.equal(view.usageLimits, null);
  });
});

describe("facts-diff", () => {
  it("renders a markdown table for changed fields", () => {
    const updated = {
      ...validExampleFacts,
      freeTier: {
        ...validExampleFacts.freeTier!,
        value: { available: true, summary: "Updated free-tier summary." },
      },
    };
    const rows = diffToolFacts(validExampleFacts, updated);
    const markdown = renderFactsDiffMarkdown(rows);
    assert.match(markdown, /fixture-valid/);
    assert.match(markdown, /freeTier/);
    assert.match(markdown, /Updated free-tier summary/);
    assert.match(markdown, /example.com\/fixture-valid\/pricing/);
  });
});

describe("anthropic-api prices agree with the model registry", () => {
  it("each plan's input/output price equals the /models registry value", () => {
    const claude = getModelFamilyBySlug("claude");
    assert.ok(claude);
    const plans = REGISTERED_TOOL_FACTS["anthropic-api"]?.plans?.value ?? [];
    assert.ok(plans.length > 0);
    const money = (n: number) => `$${n}`.replace(/(\.\d)$/, "$10");
    for (const plan of plans) {
      const version: ModelVersion | undefined = claude.versions.find((v) => v.name === plan.name);
      assert.ok(version, `${plan.name} missing from the model registry`);
      const input: number | null = version.apiPriceInput.usdPerMillion;
      const output: number | null = version.apiPriceOutput.usdPerMillion;
      assert.ok(input !== null && output !== null, plan.name);
      assert.equal(plan.price, `${money(input)} input / ${money(output)} output per million tokens`, plan.name);
    }
  });
});
