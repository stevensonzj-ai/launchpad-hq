import { getToolFacts } from "@/data/facts";
import { listFactEntries } from "@/data/facts/walk";
import type { ToolFacts } from "@/data/facts/types";
import { snippetRevisionDate } from "@/data/seo/snippet-overrides";

/**
 * Latest real content date for a sitemap `lastmod`.
 * Invalid values are skipped. There is no fallback to "now": a page with
 * no parseable date is omitted from lastmod rather than stamped with the
 * build time.
 */
export function latestContentDate(
  values: Array<string | Date | null | undefined>,
): Date | undefined {
  let latest: Date | undefined;
  for (const value of values) {
    const date = parseContentDate(value);
    if (!date) continue;
    if (!latest || date.getTime() > latest.getTime()) latest = date;
  }
  return latest;
}

export function parseContentDate(value: string | Date | null | undefined): Date | undefined {
  if (value == null) return undefined;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const isoDay = /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? `${trimmed}T00:00:00.000Z` : trimmed;
  const date = new Date(isoDay);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function factCheckedAts(facts: ToolFacts | undefined): string[] {
  if (!facts) return [];
  return listFactEntries(facts).map((entry) => entry.fact.checkedAt);
}

export function guideSitemapLastModified(input: {
  platformSlug: string;
  lastReviewedAt: string;
}): Date | undefined {
  const facts = getToolFacts(input.platformSlug);
  return latestContentDate([
    input.lastReviewedAt,
    ...factCheckedAts(facts),
    snippetRevisionDate(`/platform/${input.platformSlug}/guide`),
  ]);
}

export function platformSitemapLastModified(input: {
  slug: string;
  updatedAt: string | Date | null | undefined;
}): Date | undefined {
  return latestContentDate([
    input.updatedAt,
    ...factCheckedAts(getToolFacts(input.slug)),
    snippetRevisionDate(`/platform/${input.slug}`),
  ]);
}

/** Latest fact-file check among the tools a comparison page renders. */
export function compareSitemapLastModified(slugs: readonly string[]): Date | undefined {
  return latestContentDate(slugs.flatMap((slug) => factCheckedAts(getToolFacts(slug))));
}
