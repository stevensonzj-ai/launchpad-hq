import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { buildSiteStructuredData } from "@/lib/seo-jsonld";
import { buildTutorialMetadata, publicPageMetadata } from "@/lib/seo-metadata";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";
import { ABOUT_SECTIONS, CONTACT_EMAIL, CONTACT_SECTIONS, HOME_ABOUT } from "@/lib/site-copy";
import { SITEMAP_STATIC_PUBLIC_PATHS } from "@/lib/sitemap-coverage";

const ADDRESS_KEYS = /"(address|PostalAddress|streetAddress|postalCode|addressLocality|addressRegion|addressCountry)"/;

function keysDeep(value: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((v) => keysDeep(v, out));
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      out.add(key);
      keysDeep(child, out);
    }
  }
  return out;
}

const text = (sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]) =>
  sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]).join(" ");

describe("homepage JSON-LD", () => {
  const data = buildSiteStructuredData({ email: CONTACT_EMAIL, description: "d" });
  const graph = data["@graph"] as Record<string, unknown>[];

  it("has an Organization with an email contactPoint and a WebSite with a real search URL", () => {
    const org = graph.find((n) => n["@type"] === "Organization")!;
    const site = graph.find((n) => n["@type"] === "WebSite")!;
    assert.equal(org.name, "Launchpad HQ");
    assert.equal(org.url, SITE_URL);
    assert.equal(org.logo, `${SITE_URL}/brand/launchpad-hq-512.png`);
    assert.deepEqual(org.contactPoint, { "@type": "ContactPoint", contactType: "customer support", email: "launchpadhq.admin@gmail.com" });
    assert.equal(org.sameAs, undefined, "no official social profiles are linked on the site");
    const action = site.potentialAction as { target: { urlTemplate: string }; "query-input": string };
    assert.equal(action.target.urlTemplate, `${SITE_URL}/discover?q={search_term_string}`);
    assert.equal(action["query-input"], "required name=search_term_string");
  });

  it("carries no address of any kind", () => {
    const keys = keysDeep(data);
    for (const key of ["address", "PostalAddress", "streetAddress", "postalCode", "addressLocality", "addressRegion", "addressCountry", "telephone"]) {
      assert.ok(!keys.has(key), key);
    }
    assert.doesNotMatch(JSON.stringify(data), /PostalAddress/);
  });

  it("is rendered on the homepage", () => {
    const page = readFileSync("src/app/page.tsx", "utf8");
    assert.match(page, /<JsonLd data=\{buildSiteStructuredData\(/);
  });
});

describe("site-wide Open Graph defaults", () => {
  it("public pages get og:type website and the brand image", () => {
    const meta = publicPageMetadata({ title: "T", description: "D", path: "/about" });
    const og = meta.openGraph as Record<string, unknown>;
    assert.equal(og.type, "website");
    assert.deepEqual(og.images, [DEFAULT_OG_IMAGE]);
  });

  it("pages with their own type keep it and keep the image", () => {
    const meta = buildTutorialMetadata({ platformSlug: "chatgpt", name: "ChatGPT", tagline: "t", lastReviewedAt: "2026-10-01" });
    const og = meta.openGraph as Record<string, unknown>;
    assert.equal(og.type, "article");
    assert.deepEqual(og.images, [DEFAULT_OG_IMAGE]);
  });

  it("the root layout sets the same defaults", () => {
    assert.match(readFileSync("src/app/layout.tsx", "utf8"), /openGraph: \{ type: "website", siteName: "Launchpad HQ", images: \[DEFAULT_OG_IMAGE\] \}/);
  });
});

describe("trust pages", () => {
  it("about and contact have 500+ characters of copy and are in the sitemap and footer", () => {
    assert.ok(text(ABOUT_SECTIONS).length > 500);
    assert.ok(text(CONTACT_SECTIONS).length > 500);
    const footer = readFileSync("src/components/layout/footer.tsx", "utf8");
    for (const path of ["/about", "/contact", "/developers"]) {
      assert.ok((SITEMAP_STATIC_PUBLIC_PATHS as readonly string[]).includes(path), path);
      assert.ok(footer.includes(`href: "${path}"`), path);
    }
  });

  it("the only email in the copy is the contact address, and only on /contact", () => {
    const emails = (s: string) => s.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
    assert.deepEqual(emails(text(HOME_ABOUT)), []);
    assert.deepEqual(emails(text(ABOUT_SECTIONS)), []);
    assert.deepEqual([...new Set(emails(text(CONTACT_SECTIONS)))], [CONTACT_EMAIL]);
  });

  it("no new page or copy file mentions a postal address", () => {
    for (const file of [
      "src/lib/site-copy.ts",
      "src/lib/developers-content.ts",
      "src/lib/seo-jsonld.ts",
      "src/app/(app)/about/page.tsx",
      "src/app/(app)/contact/page.tsx",
      "src/app/(app)/developers/page.tsx",
    ]) {
      const source = readFileSync(file, "utf8");
      assert.doesNotMatch(source, ADDRESS_KEYS, file);
      assert.doesNotMatch(source, /streetAddress|postalCode|PostalAddress/, file);
    }
  });
});
