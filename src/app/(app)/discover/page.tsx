export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PlatformCard } from "@/components/platforms/platform-card";
import Link from "next/link";
import { getPlatformCount, getCategoryCount, roundDownToTen } from "@/lib/platforms";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { Rocket, X } from "lucide-react";
import { MatchingBanner } from "@/components/brand/matching-banner";
import { getToolFacts } from "@/data/facts";
import { DiscoverFilterBar } from "./discover-filter-bar";
import {
  buildDiscoverQuery,
  normalizeSort,
  discoverOrderBy,
  COST_TIERS,
  DIFFICULTIES,
  COST_FILTERS,
  DIFFICULTY_FILTERS,
  MOBILE_FILTERS,
} from "@/lib/discover-filters";
import { getActivePlacement } from "@/data/sponsors";
import { SponsoredSpotlight } from "@/components/sponsors/sponsored-spotlight";

export async function generateMetadata(): Promise<Metadata> {
  const [platformCount, categoryCount] = await Promise.all([getPlatformCount(), getCategoryCount()]);
  const count = roundDownToTen(platformCount);
  return {
    title: "Discover AI Tools | Launchpad HQ",
    description: `Browse ${count}+ vetted AI platforms across ${categoryCount} categories on LaunchpadHQ.io`,
  };
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    cost?: string;
    difficulty?: string;
    mobile?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const sort = normalizeSort(params.sort);
  const costQs = params.cost?.toLowerCase();
  const difficultyQs = params.difficulty?.toLowerCase();

  const where: Record<string, unknown> = {};
  if (query) {
    where.OR = ["name", "company", "primaryUse", "description"].map((field) => ({
      [field]: { contains: query, mode: "insensitive" },
    }));
  }
  if (params.category) {
    where.category = { slug: params.category };
  }
  if (costQs === "free-tier") {
    // "Has free tier" = anything usable without paying.
    where.costTier = { in: ["FREE", "FREEMIUM"] };
  } else if (
    costQs &&
    (COST_TIERS as readonly string[]).includes(costQs.toUpperCase())
  ) {
    where.costTier = costQs.toUpperCase();
  }
  if (difficultyQs === "advanced") {
    where.difficultyLevel = { in: ["ADVANCED", "EXPERT"] };
  } else if (
    difficultyQs &&
    (DIFFICULTIES as readonly string[]).includes(difficultyQs.toUpperCase())
  ) {
    where.difficultyLevel = difficultyQs.toUpperCase();
  }
  if (params.mobile === "app") {
    where.hasMobileApp = true;
  }
  if (params.mobile === "web") {
    where.mobileWebFriendly = true;
  }

  // TODO: "popular" currently uses [featured desc, name asc] as a placeholder
  // until a real engagement score exists (e.g., aggregated from prompts/
  // discussions/favorites counts, or a view/click tracker). Revisit when
  // that signal lands.
  const orderBy = discoverOrderBy(sort);

  const user = await getOrCreateDbUser();

  const [platforms, categories, favorites] = await Promise.all([
    prisma.platform.findMany({
      where,
      include: { category: true },
      orderBy,
      take: 200,
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { platforms: true } } },
    }),
    // TODO: bound this query if favorites-per-user grows significantly.
    // Today we pull every row and build a Set for O(1) lookup per card —
    // trivial at ~170 platforms, worth revisiting if favorites counts get large.
    user
      ? prisma.userFavorite.findMany({
          where: { userId: user.id },
          select: { platformId: true },
        })
      : Promise.resolve([]),
  ]);
  const favoriteIds = new Set(favorites.map((f) => f.platformId));
  const isSignedIn = user !== null;
  const discoverSpotlight = getActivePlacement("discover");

  // Group into A–Z + "#" bucket when alphabetical. Empty letter buckets still
  // render in the strip (disabled); the "#" bucket is hidden entirely if empty.
  const groups = new Map<string, typeof platforms>();
  if (sort === "alpha") {
    for (const p of platforms) {
      const firstChar = p.name[0]?.toUpperCase() ?? "#";
      const key = /^[A-Z]$/.test(firstChar) ? firstChar : "#";
      const bucket = groups.get(key);
      if (bucket) {
        bucket.push(p);
      } else {
        groups.set(key, [p]);
      }
    }
  }
  const hasHashBucket = groups.has("#");
  const orderedGroupKeys: string[] = [];
  if (hasHashBucket) orderedGroupKeys.push("#");
  for (const L of ALPHABET) if (groups.has(L)) orderedGroupKeys.push(L);

  // Active-filter pills. Sort is a mode, not a filter, so it's excluded here.
  // Each pill's href drops just its own param (via buildDiscoverQuery, which
  // preserves the rest). Labels come from the same option lists the bar uses,
  // so an unknown/hand-typed value that the server ignores also yields no pill.
  const activeFilters: { key: string; label: string; href: string }[] = [];
  if (query) {
    activeFilters.push({
      key: "q",
      label: `Search: ${query}`,
      href: "/discover" + buildDiscoverQuery({ category: params.category, cost: costQs, difficulty: difficultyQs, mobile: params.mobile, sort: params.sort }),
    });
  }
  if (params.category) {
    const name = categories.find((c) => c.slug === params.category)?.name;
    if (name) {
      activeFilters.push({
        key: "category",
        label: name,
        href:
          "/discover" +
          buildDiscoverQuery({ q: query, cost: costQs, difficulty: difficultyQs, mobile: params.mobile, sort: params.sort }),
      });
    }
  }
  if (costQs) {
    const label = COST_FILTERS.find((o) => o.value === costQs)?.label;
    if (label) {
      activeFilters.push({
        key: "cost",
        label,
        href:
          "/discover" +
          buildDiscoverQuery({ q: query, category: params.category, difficulty: difficultyQs, mobile: params.mobile, sort: params.sort }),
      });
    }
  }
  if (difficultyQs) {
    const label = DIFFICULTY_FILTERS.find((o) => o.value === difficultyQs)?.label;
    if (label) {
      activeFilters.push({
        key: "difficulty",
        label,
        href:
          "/discover" +
          buildDiscoverQuery({ q: query, category: params.category, cost: costQs, mobile: params.mobile, sort: params.sort }),
      });
    }
  }
  if (params.mobile) {
    const label = MOBILE_FILTERS.find((o) => o.value === params.mobile)?.label;
    if (label) {
      activeFilters.push({
        key: "mobile",
        label,
        href:
          "/discover" +
          buildDiscoverQuery({ q: query, category: params.category, cost: costQs, difficulty: difficultyQs, sort: params.sort }),
      });
    }
  }
  const hasActiveFilter = activeFilters.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
      <section className="relative mb-7 overflow-hidden pr-2 sm:pr-32">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">A universe of possibilities</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">What will you <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">try next?</span></h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">Explore tools for your ideas, your budget, and your next project.</p>
        <Rocket className="pointer-events-none absolute right-3 top-3 hidden h-24 w-24 -rotate-12 text-orange-300/70 sm:block" aria-hidden="true" />
      </section>
      {discoverSpotlight ? (
        <div className="mb-8">
          <SponsoredSpotlight placement={discoverSpotlight} />
        </div>
      ) : null}

      {/* Filter bar — the five facet rows collapsed into one control row.
          Client component; it only emits URLs via the shared buildDiscoverQuery.
          The server still parses and guards the params it produces. */}
      <DiscoverFilterBar
        categories={categories.map((cat) => ({
          slug: cat.slug,
          name: cat.name,
          count: cat._count.platforms,
        }))}
        current={{
          q: query,
          category: params.category ?? "",
          cost: costQs ?? "",
          difficulty: difficultyQs ?? "",
          mobile: params.mobile ?? "",
          sort,
        }}
      />
      <p className="mb-5 text-sm text-gray-400" aria-live="polite">
        Showing {platforms.length === 200 ? "the first " : ""}{platforms.length} {platforms.length === 1 ? "tool" : "tools"}{query ? ` for “${query}”` : ""}{!hasActiveFilter && !query ? ` across ${categories.length} categories` : ""}.
        {platforms.length === 200 ? " Narrow your search or choose a category to explore more." : ""}
      </p>

      {/* Active-filter pills — server-rendered; each removes just its own param */}
      {hasActiveFilter && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <Link
              key={f.key}
              href={f.href}
              scroll={false}
              className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-200 transition-colors hover:bg-orange-500/20 hover:text-white"
            >
              {f.label}
              <X className="h-3 w-3" aria-hidden />
              <span className="sr-only">Remove {f.label} filter</span>
            </Link>
          ))}
          <Link
            href="/discover"
            scroll={false}
            className="rounded-full px-3 py-1 text-xs text-gray-400 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            Clear all
          </Link>
        </div>
      )}

      {/* A–Z jump strip — only in alphabetical mode, sticky below the global header */}
      {sort === "alpha" && platforms.length > 0 && (
        <div className="sticky top-16 z-20 mb-4 border-b border-gray-800 bg-gray-950/90 py-2 backdrop-blur-sm">
          <div className="flex flex-wrap gap-x-0.5 gap-y-1">
            {hasHashBucket && (
              <a
                href="#letter-hash"
                className="rounded px-1.5 py-0.5 text-sm text-gray-300 hover:text-orange-400"
              >
                #
              </a>
            )}
            {ALPHABET.map((letter) => {
              const available = groups.has(letter);
              return available ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="rounded px-1.5 py-0.5 text-sm text-gray-300 hover:text-orange-400"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-disabled="true"
                  className="pointer-events-none cursor-default rounded px-1.5 py-0.5 text-sm text-gray-600"
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid */}
      {sort === "alpha" ? (
        <div className="grid gap-5 md:grid-cols-2">
          {orderedGroupKeys.flatMap((letter) => [
            <h2
              key={`header-${letter}`}
              id={letter === "#" ? "letter-hash" : `letter-${letter}`}
              className="col-span-full mt-8 scroll-mt-32 border-b border-gray-800 pb-2 text-2xl font-semibold text-white first:mt-0"
            >
              {letter}
            </h2>,
            ...groups.get(letter)!.map((p) => (
              <PlatformCard
                key={p.id}
                facts={getToolFacts(p.slug)}
                logoUrl={p.logoUrl}
                slug={p.slug}
                name={p.name}
                company={p.company}
                primaryUse={p.primaryUse}
                costTier={p.costTier}
                difficultyLevel={p.difficultyLevel}
                category={p.category}
                freeTierFeatures={p.freeTierFeatures}
                hasMobileApp={p.hasMobileApp}
                mobileWebFriendly={p.mobileWebFriendly}
                isFavorited={favoriteIds.has(p.id)}
                isSignedIn={isSignedIn}
              />
            )),
          ])}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {platforms.map((p) => (
            <PlatformCard
              key={p.id}
              facts={getToolFacts(p.slug)}
              logoUrl={p.logoUrl}
              slug={p.slug}
              name={p.name}
              company={p.company}
              primaryUse={p.primaryUse}
              costTier={p.costTier}
              difficultyLevel={p.difficultyLevel}
              category={p.category}
              freeTierFeatures={p.freeTierFeatures}
              hasMobileApp={p.hasMobileApp}
              mobileWebFriendly={p.mobileWebFriendly}
              isFavorited={favoriteIds.has(p.id)}
              isSignedIn={isSignedIn}
            />
          ))}
        </div>
      )}

      {platforms.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          No platforms match your filters.{" "}
          <Link href="/discover" className="text-orange-400">
            Clear filters
          </Link>
        </p>
      )}
      <MatchingBanner />
      <p className="mt-5 text-center text-sm text-gray-400">Want to combine your tools? <Link href="/workflows" className="inline-flex min-h-11 items-center text-orange-300 hover:underline">Explore workflow templates →</Link></p>
    </div>
  );
}
