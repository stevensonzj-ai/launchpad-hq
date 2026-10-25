import type { Metadata } from "next";
import { isPublishedVerified } from "@/data/facts/walk";
import type { ToolFacts } from "@/data/facts/types";
import { getToolFacts } from "@/data/facts/registry";
import { isHiddenPlatform } from "@/lib/catalog-visibility";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_IS_PUBLIC } from "@/lib/site";

export const META_DESCRIPTION_MAX = 160;
export const META_DESCRIPTION_TARGET_MIN = 150;

export function clipMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX,
): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const budget = Math.max(1, max - 1);
  const sliced = cleaned.slice(0, budget);
  const lastSpace = sliced.lastIndexOf(" ");
  const base =
    lastSpace > META_DESCRIPTION_TARGET_MIN - 20 ? sliced.slice(0, lastSpace) : sliced;
  return `${base.replace(/[,:;.\-–—]+$/u, "")}…`.slice(0, max);
}

export function publicPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const description = clipMetaDescription(input.description);
  const url = absoluteUrl(input.path);
  const index = input.index ?? SITE_IS_PUBLIC;
  return {
    title: input.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Launchpad HQ",
      title: input.title,
      description,
      url,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title: input.title,
      description,
    },
    ...(!index ? { robots: { index: false, follow: false } } : {}),
  };
}

export function privatePageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return publicPageMetadata({ ...input, index: false });
}

export function verifiedDisplayName(facts: ToolFacts | undefined, fallback: string): string {
  const fact = facts?.displayName;
  if (fact && isPublishedVerified(fact) && fact.value.trim()) return fact.value.trim();
  return fallback;
}

export function verifiedVerdict(facts: ToolFacts | undefined): string | undefined {
  const fact = facts?.verdict;
  if (fact && isPublishedVerified(fact) && fact.value.trim()) return fact.value.trim();
  return undefined;
}

function categoryPhrase(categoryName?: string | null): string | undefined {
  const category = categoryName?.trim();
  if (!category) return undefined;
  return /\bai\b/i.test(category) ? category : `${category} AI`;
}

export function composePlatformTitle(name: string, categoryName?: string | null): string {
  const category = categoryPhrase(categoryName);
  if (category) return `${name} — ${category} | Launchpad HQ`;
  return `${name} | Launchpad HQ`;
}

export function composePlatformDescription(input: {
  name: string;
  categoryName?: string | null;
  primaryUse?: string | null;
  description?: string | null;
  verdict?: string | null;
}): string {
  const category = categoryPhrase(input.categoryName);
  const use =
    input.verdict?.trim() ||
    input.primaryUse?.trim() ||
    input.description?.trim() ||
    "";
  const lead = category
    ? `${input.name} is ${category}`
    : `${input.name} is an AI tool`;
  const middle = use ? `: ${use.replace(/\.$/, "")}` : "";
  const tail = ". Honest overview and related tools on Launchpad HQ.";
  return clipMetaDescription(`${lead}${middle}${tail}`);
}

/** "What happened to X" title for discontinued products with a sourced status. */
export function composeDiscontinuedTitle(name: string): string {
  return `What Happened to ${name}? Shutdown and Alternatives | Launchpad HQ`;
}

export function composeTutorialTitle(name: string): string {
  return `How to Use ${name}: Beginner's Guide | Launchpad HQ`;
}

/** Drops the renderer's inline **bold** / `code` markers so they never leak into meta tags. */
export function stripInlineMarkup(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");
}

/**
 * `<link rel="alternate" type="application/json">` to /data/v1 records.
 * `paths` are relative to /data/v1; the first is the page's own record.
 */
export function withFeedAlternate(metadata: Metadata, ...paths: string[]): Metadata {
  if (paths.length === 0) return metadata;
  const urls = paths.map((path) => absoluteUrl(`/data/v1${path}`));
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { "application/json": urls.length === 1 ? urls[0] : urls.map((url) => ({ url })) },
    },
  };
}

/**
 * Alternate link to the tool's /data/v1 record. Hidden tools have no feed
 * record (404), so no link.
 */
export function withToolFeedAlternate(metadata: Metadata, slug: string): Metadata {
  if (isHiddenPlatform(slug)) return metadata;
  return withFeedAlternate(metadata, `/tools/${slug}.json`);
}

export function buildTutorialMetadata(input: {
  platformSlug: string;
  name: string;
  tagline: string;
  lastReviewedAt: string;
  /** false for hidden platforms; defaults to the site-wide setting. */
  index?: boolean;
}): Metadata {
  const base = publicPageMetadata({
    title: composeTutorialTitle(input.name),
    description: stripInlineMarkup(input.tagline),
    path: `/platform/${input.platformSlug}/guide`,
    index: input.index,
  });
  const metadata: Metadata = {
    ...base,
    openGraph: { ...base.openGraph, type: "article", modifiedTime: input.lastReviewedAt },
  };
  // Hidden tools have no feed records; discontinued ones keep the tool
  // record but have no guide record (the feed drops their guide_url).
  if (isHiddenPlatform(input.platformSlug)) return metadata;
  const tool = `/tools/${input.platformSlug}.json`;
  if (getToolFacts(input.platformSlug)?.lifecycle === "discontinued") {
    return withFeedAlternate(metadata, tool);
  }
  return withFeedAlternate(metadata, `/guides/${input.platformSlug}.json`, tool);
}

export function buildPlatformMetadata(input: {
  slug: string;
  name: string;
  categoryName?: string | null;
  primaryUse?: string | null;
  description?: string | null;
  facts?: ToolFacts;
}): Metadata {
  const name = verifiedDisplayName(input.facts, input.name);
  const facts = input.facts;
  // Hidden pages (src/lib/catalog-visibility.ts) stay reachable but are
  // kept out of search results.
  const index = facts?.visibility === "hidden" ? false : undefined;
  const status = facts?.status && isPublishedVerified(facts.status) ? facts.status.value : undefined;
  if (facts?.lifecycle === "discontinued" && status) {
    return withToolFeedAlternate(
      publicPageMetadata({
        title: composeDiscontinuedTitle(name),
        description: status.headline,
        path: `/platform/${input.slug}`,
        index,
      }),
      input.slug,
    );
  }
  return withToolFeedAlternate(
    publicPageMetadata({
      title: composePlatformTitle(name, input.categoryName),
      description: composePlatformDescription({
        name,
        categoryName: input.categoryName,
        primaryUse: input.primaryUse,
        description: input.description,
        verdict: verifiedVerdict(input.facts),
      }),
      path: `/platform/${input.slug}`,
      index,
    }),
    input.slug,
  );
}
