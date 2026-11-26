import { absoluteUrl } from "@/lib/site";
import type { NormalizedPlan } from "@/lib/public-data/pricing";

export type JsonLdNode = Record<string, unknown>;

/** Same gate as the platform page Open/official-site CTA: a non-empty website string. */
export function officialSiteHref(website: string | null | undefined): string | undefined {
  const href = website?.trim();
  return href ? href : undefined;
}

export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ABSOLUTE_URL = /^https?:\/\//;

export type BreadcrumbCrumb = { name: string; item: string };

/**
 * One BreadcrumbList ListItem. `name` is required and must be non-empty:
 * Google reports a crumb with no name as "Unnamed item". `item` is an
 * absolute URL. Pass `includeItem: false` for the current page. On a guide,
 * that URL is also Article.url, and Google then names the crumb from the
 * Article, which only has `headline`.
 */
export function breadcrumbListItem(
  position: number,
  name: string,
  item: string | undefined,
): JsonLdNode {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error(`Breadcrumb ListItem ${position} is missing a name`);
  }
  const node: JsonLdNode = { "@type": "ListItem", position, name: trimmed };
  if (item !== undefined) {
    const url = item.trim();
    if (!ABSOLUTE_URL.test(url)) {
      throw new Error(`Breadcrumb ListItem ${position} item must be an absolute URL`);
    }
    node.item = url;
  }
  return node;
}

export function breadcrumbList(crumbs: BreadcrumbCrumb[]): JsonLdNode {
  const last = crumbs.length - 1;
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) =>
      breadcrumbListItem(index + 1, crumb.name, index === last ? undefined : crumb.item),
    ),
  };
}

function breadcrumbLists(data: JsonLdNode): JsonLdNode[] {
  const graph = data["@graph"];
  const nodes = Array.isArray(graph) ? graph : [data];
  return nodes.filter(
    (node): node is JsonLdNode =>
      Boolean(node) && typeof node === "object" && (node as JsonLdNode)["@type"] === "BreadcrumbList",
  );
}

/** Throws when any breadcrumb name is missing or blank, or a non-final item URL is not absolute. */
export function assertBreadcrumbNames(data: JsonLdNode): void {
  const lists = breadcrumbLists(data);
  if (lists.length === 0) throw new Error("JSON-LD has no BreadcrumbList");
  for (const list of lists) {
    const items = list.itemListElement;
    if (!Array.isArray(items) || items.length === 0) throw new Error("BreadcrumbList has no items");
    items.forEach((entry, index) => {
      const item = entry as JsonLdNode;
      const name = item.name;
      if (typeof name !== "string" || name.trim() === "") {
        throw new Error(`Breadcrumb ListItem ${index + 1} is missing a name`);
      }
      const isLast = index === items.length - 1;
      const url = item.item;
      if (!isLast && (typeof url !== "string" || !ABSOLUTE_URL.test(url))) {
        throw new Error(`Breadcrumb ListItem ${index + 1} is missing an absolute item URL`);
      }
      if (isLast && url !== undefined && (typeof url !== "string" || !ABSOLUTE_URL.test(url))) {
        throw new Error(`Breadcrumb ListItem ${index + 1} item is not an absolute URL`);
      }
    });
  }
}

const BILLING_DURATION: Partial<Record<NonNullable<NormalizedPlan["period"]>, string>> = {
  month: "P1M",
  year: "P1Y",
};

/**
 * A free plan written as just "Free" has no currency of its own. Borrow the
 * one every other priced plan uses; if they disagree or there are none,
 * return null and the free Offer is left out (Google flags a missing one).
 */
function freePlanCurrency(plans: NormalizedPlan[]): NormalizedPlan["currency"] {
  const others = plans.filter((p) => !p.is_free && p.amount !== null).map((p) => p.currency);
  const [first] = others;
  return first && others.every((c) => c === first) ? first : null;
}

/**
 * One Offer per priced plan, from the feed's normalized plans so the
 * JSON-LD price always equals `plans[].amount`. Plans without a numeric
 * amount ("Custom", "See pricing") are skipped; currency only when known.
 */
export function planOffers(plans: NormalizedPlan[]): JsonLdNode[] {
  return plans.flatMap((plan) => {
    if (plan.amount === null) return [];
    const known = plan.currency ?? (plan.is_free ? freePlanCurrency(plans) : null);
    if (plan.is_free && !known) return [];
    const price = String(plan.amount);
    const currency = known ? { priceCurrency: known } : {};
    const offer: JsonLdNode = { "@type": "Offer", name: plan.name, price, ...currency };
    const duration = plan.period ? BILLING_DURATION[plan.period] : undefined;
    if (duration) {
      offer.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price,
        ...currency,
        billingDuration: duration,
      };
    }
    return [offer];
  });
}

export function buildPlatformStructuredData(input: {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  website?: string | null;
  /** Feed `description` (citations stripped). */
  description?: string | null;
  /** Feed `data_as_of` (ISO date). */
  dateModified?: string | null;
  /** Feed `plans`; empty for discontinued tools, so no offers. */
  plans?: NormalizedPlan[];
}): JsonLdNode {
  const pageUrl = absoluteUrl(`/platform/${input.slug}`);
  const software: JsonLdNode = {
    "@type": "SoftwareApplication",
    name: input.name,
    applicationCategory: input.categoryName,
  };
  const officialUrl = officialSiteHref(input.website);
  if (officialUrl) software.url = officialUrl;
  if (input.description) software.description = input.description;
  if (input.dateModified) software.dateModified = input.dateModified;
  const offers = planOffers(input.plans ?? []);
  if (offers.length) software.offers = offers;

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList([
        { name: "Discover", item: absoluteUrl("/discover") },
        { name: input.categoryName, item: absoluteUrl(`/discover?category=${input.categorySlug}`) },
        { name: input.name, item: pageUrl },
      ]),
      software,
    ],
  };
}

/**
 * Article + breadcrumbs for /platform/[slug]/guide. dateModified is the
 * tutorial's lastReviewedAt (volatile facts web-verified on that date).
 * No datePublished: tutorials record no publish date and the review date
 * is not one.
 */
export function buildTutorialStructuredData(input: {
  title: string;
  description: string;
  platformName: string;
  platformSlug: string;
  categoryName: string;
  categorySlug: string;
  lastReviewedAt: string;
  website?: string | null;
}): JsonLdNode {
  const guideUrl = absoluteUrl(`/platform/${input.platformSlug}/guide`);
  const about: JsonLdNode = { "@type": "SoftwareApplication", name: input.platformName };
  const officialUrl = officialSiteHref(input.website);
  if (officialUrl) about.url = officialUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList([
        { name: "Discover", item: absoluteUrl("/discover") },
        { name: input.categoryName, item: absoluteUrl(`/discover?category=${input.categorySlug}`) },
        { name: input.platformName, item: absoluteUrl(`/platform/${input.platformSlug}`) },
        { name: "Getting started", item: guideUrl },
      ]),
      {
        "@type": "Article",
        "@id": `${guideUrl}#article`,
        headline: input.title,
        name: input.title,
        description: input.description,
        url: guideUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": guideUrl,
          url: guideUrl,
          name: "Getting started",
        },
        dateModified: input.lastReviewedAt,
        inLanguage: "en",
        about,
        publisher: { "@type": "Organization", name: "Launchpad HQ", url: absoluteUrl("/") },
      },
    ],
  };
}

/** ItemList for the /tutorials index, in on-page order. */
export function buildTutorialIndexStructuredData(
  items: Array<{ title: string; platformSlug: string }>,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: absoluteUrl(`/platform/${item.platformSlug}/guide`),
    })),
  };
}

/**
 * ItemList for the tools on one Discover page, in on-page order. Positions
 * continue across pages (page 2 starts at `firstPosition` 25).
 */
export function buildDiscoverItemListStructuredData(
  items: Array<{ name: string; slug: string }>,
  firstPosition = 1,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: firstPosition + index,
      name: item.name,
      url: absoluteUrl(`/platform/${item.slug}`),
    })),
  };
}

/**
 * Homepage identity: Organization + WebSite. contactPoint is email only and
 * there is deliberately no address of any kind. No sameAs: the site links
 * no official social profiles. The SearchAction targets Discover's real `q`
 * search parameter.
 */
export function buildSiteStructuredData(input: { email: string; description: string }): JsonLdNode {
  const orgId = absoluteUrl("/#organization");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Launchpad HQ",
        url: absoluteUrl("/"),
        logo: absoluteUrl("/brand/launchpad-hq-512.png"),
        description: input.description,
        contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: input.email },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: "Launchpad HQ",
        url: absoluteUrl("/"),
        inLanguage: "en",
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/discover")}?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
