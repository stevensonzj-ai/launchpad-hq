import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import {
  buildPlatformStructuredData,
  verifiedOfferFromPlans,
} from "@/lib/seo-jsonld";
import type { ToolFacts } from "@/data/facts/types";

describe("platform JSON-LD", () => {
  it("emits only name, category, optional official url, breadcrumbs, and verified offers", () => {
    const grokFacts = getToolFacts("grok");
    const data = buildPlatformStructuredData({
      name: "Grok",
      slug: "grok",
      categoryName: "Text & conversational AI",
      categorySlug: "text-conversational-ai",
      website: "https://x.ai/grok",
      facts: grokFacts,
    });
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const software = graph.find((node) => node["@type"] === "SoftwareApplication");
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
    assert.ok(software);
    assert.ok(crumbs);
    assert.equal(software.name, "Grok");
    assert.equal(software.applicationCategory, "Text & conversational AI");
    assert.equal(software.url, "https://x.ai/grok");
    assert.deepEqual(Object.keys(software).sort(), ["@type", "applicationCategory", "name", "offers", "url"].sort());
    assert.equal((software.offers as { price: string }).price, "8");
  });

  it("omits offers when plans are missing or not RA-verified", () => {
    const chatgpt = getToolFacts("chatgpt");
    assert.equal(verifiedOfferFromPlans(chatgpt), undefined);

    const unverified: ToolFacts = {
      slug: "example",
      lifecycle: "active",
      plans: {
        value: [{ name: "Pro", price: "$20", period: "month", limits: "" }],
        sourceUrl: "https://example.com",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        verifiedBy: "pending",
        verifiedAt: "2026-10-14",
        status: "unverified",
      },
    };
    assert.equal(verifiedOfferFromPlans(unverified), undefined);

    const data = buildPlatformStructuredData({
      name: "ChatGPT",
      slug: "chatgpt",
      categoryName: "Text & conversational AI",
      categorySlug: "text-conversational-ai",
      facts: chatgpt,
    });
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const software = graph.find((node) => node["@type"] === "SoftwareApplication");
    assert.equal(software?.offers, undefined);
    assert.equal(software?.url, undefined);
  });
});
