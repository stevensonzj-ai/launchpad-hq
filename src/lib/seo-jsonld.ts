import { absoluteUrl } from "@/lib/site";

export type JsonLdNode = Record<string, unknown>;

/** Same gate as the platform page Open/official-site CTA: a non-empty website string. */
export function officialSiteHref(website: string | null | undefined): string | undefined {
  const href = website?.trim();
  return href ? href : undefined;
}

export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPlatformStructuredData(input: {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  website?: string | null;
}): JsonLdNode {
  const pageUrl = absoluteUrl(`/platform/${input.slug}`);
  const software: JsonLdNode = {
    "@type": "SoftwareApplication",
    name: input.name,
    applicationCategory: input.categoryName,
  };
  const officialUrl = officialSiteHref(input.website);
  if (officialUrl) software.url = officialUrl;

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
