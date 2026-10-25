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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Discover",
            item: absoluteUrl("/discover"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: input.categoryName,
            item: absoluteUrl(`/discover?category=${input.categorySlug}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: input.name,
            item: pageUrl,
          },
        ],
      },
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Discover", item: absoluteUrl("/discover") },
          {
            "@type": "ListItem",
            position: 2,
            name: input.categoryName,
            item: absoluteUrl(`/discover?category=${input.categorySlug}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: input.platformName,
            item: absoluteUrl(`/platform/${input.platformSlug}`),
          },
          { "@type": "ListItem", position: 4, name: "Getting started", item: guideUrl },
        ],
      },
      {
        "@type": "Article",
        headline: input.title,
        description: input.description,
        url: guideUrl,
        mainEntityOfPage: guideUrl,
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
