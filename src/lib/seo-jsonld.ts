import { isPublishedVerified } from "@/data/facts/walk";
import type { ToolFacts } from "@/data/facts/types";
import { absoluteUrl } from "@/lib/site";

export type JsonLdNode = Record<string, unknown>;

const USD_AMOUNT = /(?:USD|\$)\s*(\d+(?:\.\d+)?)/i;

/**
 * Lowest paid USD amount from a verified RA `plans` fact.
 * Omit offers when the fact is missing, unverified, or has no numeric paid price.
 */
export function verifiedOfferFromPlans(facts: ToolFacts | undefined): {
  "@type": "Offer";
  price: string;
  priceCurrency: "USD";
} | undefined {
  const plans = facts?.plans;
  if (!plans || !isPublishedVerified(plans) || !plans.value.length) return undefined;

  const amounts: number[] = [];
  for (const plan of plans.value) {
    const match = plan.price.match(USD_AMOUNT);
    if (!match) continue;
    const value = Number(match[1]);
    if (Number.isFinite(value) && value > 0) amounts.push(value);
  }
  if (!amounts.length) return undefined;
  return {
    "@type": "Offer",
    price: String(Math.min(...amounts)),
    priceCurrency: "USD",
  };
}

export function buildPlatformStructuredData(input: {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  website?: string | null;
  facts?: ToolFacts;
}): JsonLdNode {
  const pageUrl = absoluteUrl(`/platform/${input.slug}`);
  const software: JsonLdNode = {
    "@type": "SoftwareApplication",
    name: input.name,
    applicationCategory: input.categoryName,
  };
  const officialUrl = input.website?.trim();
  if (officialUrl) software.url = officialUrl;
  const offers = verifiedOfferFromPlans(input.facts);
  if (offers) software.offers = offers;

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
