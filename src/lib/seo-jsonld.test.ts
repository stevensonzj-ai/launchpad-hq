import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildPlatformStructuredData,
  buildTutorialIndexStructuredData,
  buildTutorialStructuredData,
  officialSiteHref,
  serializeJsonLd,
} from "@/lib/seo-jsonld";

describe("platform JSON-LD", () => {
  it("emits only name, category, optional official url, and breadcrumbs", () => {
    const data = buildPlatformStructuredData({
      name: "Grok",
      slug: "grok",
      categoryName: "Text & conversational AI",
      categorySlug: "text-conversational-ai",
      website: "https://x.ai/grok",
    });
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const software = graph.find((node) => node["@type"] === "SoftwareApplication");
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
    assert.ok(software);
    assert.ok(crumbs);
    assert.equal(software.name, "Grok");
    assert.equal(software.applicationCategory, "Text & conversational AI");
    assert.equal(software.url, "https://x.ai/grok");
    assert.equal(software.offers, undefined);
    assert.deepEqual(Object.keys(software).sort(), ["@type", "applicationCategory", "name", "url"].sort());
  });

  it("uses officialSiteHref for SoftwareApplication.url, matching the Open CTA", () => {
    assert.equal(officialSiteHref("https://x.ai/grok"), "https://x.ai/grok");
    assert.equal(officialSiteHref("  https://x.ai/grok  "), "https://x.ai/grok");
    assert.equal(officialSiteHref("   "), undefined);
    assert.equal(officialSiteHref(null), undefined);
    assert.equal(officialSiteHref(undefined), undefined);

    const withUrl = buildPlatformStructuredData({
      name: "Grok",
      slug: "grok",
      categoryName: "Text & conversational AI",
      categorySlug: "text-conversational-ai",
      website: "  https://x.ai/grok  ",
    });
    const softwareWith = (withUrl["@graph"] as Array<Record<string, unknown>>).find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    assert.equal(softwareWith?.url, officialSiteHref("  https://x.ai/grok  "));

    const withoutUrl = buildPlatformStructuredData({
      name: "ChatGPT",
      slug: "chatgpt",
      categoryName: "Text & conversational AI",
      categorySlug: "text-conversational-ai",
      website: "   ",
    });
    const softwareWithout = (withoutUrl["@graph"] as Array<Record<string, unknown>>).find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    assert.equal(softwareWithout?.url, undefined);
    assert.equal(officialSiteHref("   ") ? true : false, false);
  });

  it("escapes </script> so it cannot break out of the JSON-LD script tag", () => {
    const html = serializeJsonLd({
      name: "</script><script>alert(1)</script>",
    });
    assert.equal(html.includes("</script>"), false);
    assert.equal(html.includes("<"), false);
    assert.ok(html.includes("\\u003c/script>"));
  });
});

describe("tutorial guide JSON-LD", () => {
  it("emits an Article with dateModified only and breadcrumbs back to the overview", () => {
    const data = buildTutorialStructuredData({
      title: "Getting Started with Activepieces",
      description: "Automation built from public code.",
      platformName: "Activepieces",
      platformSlug: "activepieces",
      categoryName: "Automation & agents",
      categorySlug: "automation-agents",
      lastReviewedAt: "2026-10-14",
      website: "https://www.activepieces.com",
    });
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const article = graph.find((node) => node["@type"] === "Article");
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
    assert.ok(article);
    assert.equal(article.dateModified, "2026-10-14");
    assert.equal("datePublished" in article, false);
    assert.equal(article.url, "https://www.launchpadhq.io/platform/activepieces/guide");
    const items = crumbs?.itemListElement as Array<Record<string, unknown>>;
    assert.equal(items[2]?.item, "https://www.launchpadhq.io/platform/activepieces");
    assert.equal(items[3]?.item, "https://www.launchpadhq.io/platform/activepieces/guide");
  });

  it("lists index items in order with guide URLs", () => {
    const data = buildTutorialIndexStructuredData([
      { title: "A", platformSlug: "a" },
      { title: "B", platformSlug: "b" },
    ]);
    const items = data.itemListElement as Array<Record<string, unknown>>;
    assert.equal(items.length, 2);
    assert.equal(items[1]?.position, 2);
    assert.equal(items[1]?.url, "https://www.launchpadhq.io/platform/b/guide");
  });
});
