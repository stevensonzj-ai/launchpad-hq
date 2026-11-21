export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getCategoriesWithCounts, getDiscoverPlatforms } from "@/lib/catalog-queries";
import { listedPlatformWhere, recommendablePlatformWhere } from "@/lib/catalog-visibility";
import { PlatformCard } from "@/components/platforms/platform-card";
import Link from "next/link";
import { getPlatformCount, getCategoryCount, roundDownToTen } from "@/lib/platforms";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { MatchingBanner } from "@/components/brand/matching-banner";
import { getToolFacts } from "@/data/facts";
import { DiscoverFilterBar } from "./discover-filter-bar";
import { UnmetSearchBeacon } from "@/components/search/unmet-search-beacon";
import {
  buildDiscoverQuery,
  normalizeSort,
  discoverOrderBy,
  applyPopularOrder,
  sortByDiscoverName,
  clampDiscoverPage,
  discoverCanonicalPath,
  discoverLetter,
  discoverPageBounds,
  discoverPageCount,
  letterPages,
  COST_TIERS,
  DIFFICULTIES,
  COST_FILTERS,
  DIFFICULTY_FILTERS,
  MOBILE_FILTERS,
} from "@/lib/discover-filters";
import { getActivePlacement } from "@/data/sponsors";
import { ROCKET_DEMO_PLACEMENT } from "@/data/sponsors/rocket-demo";
import { HourlyRocket } from "@/components/sponsors/hourly-rocket";
import { SponsoredSpotlight } from "@/components/sponsors/sponsored-spotlight";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { buildDiscoverItemListStructuredData } from "@/lib/seo-jsonld";

type DiscoverSearchParams = {
  q?: string;
  category?: string;
  cost?: string;
  difficulty?: string;
  mobile?: string;
  sort?: string;
  page?: string;
  rocket?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<DiscoverSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const [platformCount, categoryCount] = await Promise.all([getPlatformCount(), getCategoryCount()]);
  const count = roundDownToTen(platformCount);
  // Only the unfiltered, default-sort list at page 2+ is self-canonical, so
  // only there is the page number resolved (same cached read as the page).
  let pageNumber = 1;
  if (params.page && discoverCanonicalPath(params, 2) !== "/discover") {
    const total = (await getDiscoverPlatforms(listedPlatformWhere(), discoverOrderBy("popular"))).length;
    pageNumber = clampDiscoverPage(params.page, total);
  }
  const path = discoverCanonicalPath(params, pageNumber);
  const paged = path !== "/discover";
  return publicPageMetadata({
    title: paged ? `Discover AI tools, page ${pageNumber} | Launchpad HQ` : "Discover AI tools | Launchpad HQ",
    description: `${paged ? `Page ${pageNumber}. ` : ""}Browse ${count}+ vetted AI platforms across ${categoryCount} categories. Filter by cost, difficulty, and mobile — free to explore, no account needed.`,
    path,
  });
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<DiscoverSearchParams>;
}) {
  const params = await searchParams;
  const isRocketDemo = params.rocket === "demo";
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const sort = normalizeSort(params.sort);
  const costQs = params.cost?.toLowerCase();
  const difficultyQs = params.difficulty?.toLowerCase();

  const where: Record<string, unknown> = { ...listedPlatformWhere() };
  if (query) {
    where.OR = ["name", "company", "primaryUse", "description"].map((field) => ({
      [field]: { contains: query, mode: "insensitive" },
    }));
  }
  if (params.category) {
    where.category = { slug: params.category };
  }
  // A cost filter never lists a discontinued tool: its stored tier (the enum
  // has no "discontinued" value) is not something you can buy.
  if (costQs) Object.assign(where, recommendablePlatformWhere());
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

  // "popular" reads by name (sharing A–Z's cache entry); the editorial order
  // and the page slice are applied in memory below, so neither adds entries.
  const orderBy = discoverOrderBy(sort);

  const user = await getOrCreateDbUser();

  const [matched, categories, favorites] = await Promise.all([
    // Shared catalog cache (src/lib/catalog-queries.ts), keyed by the URL
    // filters. Favorites are per visitor and stay uncached.
    getDiscoverPlatforms(where, orderBy),
    getCategoriesWithCounts(),
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
  // `platforms` is every match (in display order); `pageTools` is this page.
  // Name order is re-sorted in memory (case-insensitive, src/lib/discover-filters.ts);
  // the database's own name order compares by character code.
  const byName = sort === "recent" ? matched : sortByDiscoverName(matched);
  const platforms = sort === "popular" ? applyPopularOrder(byName) : byName;
  const total = platforms.length;
  const page = clampDiscoverPage(params.page, total);
  const pageCount = discoverPageCount(total);
  const { start, end } = discoverPageBounds(page, total);
  const pageTools = platforms.slice(start, end);
  const isSignedIn = user !== null;
  const discoverSpotlight = getActivePlacement("discover");

  // Group this page's tools into A–Z + "#" buckets when alphabetical. The
  // strip covers the whole result: each letter links to the page holding its
  // first tool; letters with no tools render disabled; "#" is hidden if empty.
  const groups = new Map<string, typeof pageTools>();
  const letterPage = sort === "alpha" ? letterPages(platforms) : new Map<string, number>();
  if (sort === "alpha") {
    for (const p of pageTools) {
      const key = discoverLetter(p.name);
      const bucket = groups.get(key);
      if (bucket) {
        bucket.push(p);
      } else {
        groups.set(key, [p]);
      }
    }
  }
  const hasHashBucket = letterPage.has("#");
  const orderedGroupKeys: string[] = [];
  if (groups.has("#")) orderedGroupKeys.push("#");
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

  // Paging and letter links keep every active filter, search and sort.
  const pageHref = (n: number, hash = "") =>
    "/discover" +
    buildDiscoverQuery({ q: query, category: params.category, cost: costQs, difficulty: difficultyQs, mobile: params.mobile, sort, page: n }) +
    hash;
  const letterHref = (letter: string) => {
    const hash = letter === "#" ? "#letter-hash" : `#letter-${letter}`;
    const target = letterPage.get(letter) ?? page;
    return target === page ? hash : pageHref(target, hash);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 min-[100rem]:max-w-[108rem]">
      <section className="lp-stars lp-discover-sky relative isolate mb-7 overflow-hidden rounded-2xl border-b border-amber-100/10 py-7 pr-2 sm:py-10 sm:pr-72">
        <Image src="/images/launchpad/discover-rocket.jpg" alt="" width={900} height={450} priority className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[540px] object-cover object-right [mask-image:linear-gradient(to_right,transparent,black_35%)] sm:block" />
        <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400"><span aria-hidden="true" className="h-px w-6 bg-orange-300/60" />A universe of possibilities</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">What will you <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">try next?</span></h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">Explore tools for your ideas, your budget, and your next project.</p>
      </section>
      {isRocketDemo ? (
        <div className="mb-8">
          <SponsoredSpotlight placement={ROCKET_DEMO_PLACEMENT} badge="Sponsored — demo" />
        </div>
      ) : discoverSpotlight ? (
        <div className="mb-8">
          <SponsoredSpotlight placement={discoverSpotlight} />
        </div>
      ) : null}
      <HourlyRocket hasSponsorTarget={isRocketDemo || Boolean(discoverSpotlight)} />

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
      <p className="mb-5 text-sm text-gray-300" aria-live="polite">
        Showing {pageCount > 1 ? `${start + 1}–${end} of ${total}` : total} {total === 1 ? "tool" : "tools"}{query ? ` for “${query}”` : ""}{!hasActiveFilter && !query ? ` across ${categories.length} categories` : ""}.
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
                href={letterHref("#")}
                className="rounded px-1.5 py-0.5 text-sm text-gray-300 hover:text-orange-400"
              >
                #
              </a>
            )}
            {ALPHABET.map((letter) => {
              const available = letterPage.has(letter);
              return available ? (
                <a
                  key={letter}
                  href={letterHref(letter)}
                  className="rounded px-1.5 py-0.5 text-sm text-gray-300 hover:text-orange-400"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-disabled="true"
                  className="pointer-events-none cursor-default rounded px-1.5 py-0.5 text-sm text-gray-400"
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
        <div data-unmet-results className="grid gap-5 md:grid-cols-2 min-[100rem]:grid-cols-3">
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
                variant="compact"
              />
            )),
          ])}
        </div>
      ) : (
        <div data-unmet-results className="grid gap-5 md:grid-cols-2 min-[100rem]:grid-cols-3">
          {pageTools.map((p) => (
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
              variant="compact"
            />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="Pages" className="mt-8 flex items-center justify-between gap-3 text-sm">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} rel="prev" className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-gray-700 px-3 text-gray-200 hover:border-gray-500 hover:text-white">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="text-gray-400">
            Page {page} of {pageCount}
          </span>
          {page < pageCount ? (
            <Link href={pageHref(page + 1)} rel="next" className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-gray-700 px-3 text-gray-200 hover:border-gray-500 hover:text-white">
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      )}

      {pageTools.length > 0 && (
        <JsonLd data={buildDiscoverItemListStructuredData(pageTools, start + 1)} />
      )}

      {total === 0 && (
        <p className="py-12 text-center text-gray-400">
          No platforms match your filters.{" "}
          <Link href="/discover" className="text-orange-400">
            Clear filters
          </Link>
        </p>
      )}
      {query && !params.category && !params.cost && !params.difficulty && !params.mobile && (
        <UnmetSearchBeacon query={query} resultCount={platforms.length} />
      )}
      <MatchingBanner />
      <p className="mt-5 text-center text-sm text-gray-400">Want to combine your tools? <Link href="/workflows" className="inline-flex min-h-11 items-center text-orange-300 hover:underline">Explore workflow templates →</Link></p>
    </div>
  );
}
