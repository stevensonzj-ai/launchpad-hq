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
