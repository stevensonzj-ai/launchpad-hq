export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PlatformCard } from "@/components/platforms/platform-card";
import Link from "next/link";
import { getPlatformCount, getCategoryCount, roundDownToTen } from "@/lib/platforms";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { X } from "lucide-react";
import { DiscoverFilterBar } from "./discover-filter-bar";
import {
  buildDiscoverQuery,
  normalizeSort,
  COST_TIERS,
  DIFFICULTIES,
  COST_FILTERS,
  DIFFICULTY_FILTERS,
  MOBILE_FILTERS,
} from "@/lib/discover-filters";

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
    category?: string;
    cost?: string;
    difficulty?: string;
    mobile?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const sort = normalizeSort(params.sort);
  const costQs = params.cost?.toLowerCase();
  const difficultyQs = params.difficulty?.toLowerCase();

  const where: Record<string, unknown> = {};
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
  const orderBy =
    sort === "alpha"
      ? [{ name: "asc" as const }]
      : sort === "recent"
        ? [{ createdAt: "desc" as const }]
        : [{ featured: "desc" as const }, { name: "asc" as const }];

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
  if (params.category) {
    const name = categories.find((c) => c.slug === params.category)?.name;
    if (name) {
      activeFilters.push({
        key: "category",
        label: name,
        href:
          "/discover" +
          buildDiscoverQuery({ cost: costQs, difficulty: difficultyQs, mobile: params.mobile, sort: params.sort }),
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
          buildDiscoverQuery({ category: params.category, difficulty: difficultyQs, mobile: params.mobile, sort: params.sort }),
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
          buildDiscoverQuery({ category: params.category, cost: costQs, mobile: params.mobile, sort: params.sort }),
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
          buildDiscoverQuery({ category: params.category, cost: costQs, difficulty: difficultyQs, sort: params.sort }),
      });
    }
  }
  const hasActiveFilter = activeFilters.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-white">Discover AI Tools</h1>
      <p className="mb-4 text-gray-400">
        {hasActiveFilter
          ? `Showing ${platforms.length} ${platforms.length === 1 ? "tool" : "tools"}`
          : `Browse ${platforms.length} vetted tools across ${categories.length} categories`}
      </p>
      <div className="mb-8 rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-sm text-gray-300">
        <span className="font-medium text-orange-200">Workflow templates</span>
        {" — "}
        Compare optimal, hybrid, and budget stacks for blogging, video, code, and more.{" "}
        <Link href="/workflows" className="font-medium text-orange-400 hover:underline">
          Browse workflows
        </Link>
      </div>

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
          category: params.category ?? "",
          cost: costQs ?? "",
          difficulty: difficultyQs ?? "",
          mobile: params.mobile ?? "",
          sort,
        }}
      />

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <PlatformCard
              key={p.id}
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
    </div>
  );
}
