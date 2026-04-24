export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PlatformCard } from "@/components/platforms/platform-card";
import Link from "next/link";
import { getPlatformCount, roundDownToTen } from "@/lib/platforms";
import { displayCategoryName } from "@/lib/categories";
import { getOrCreateDbUser } from "@/lib/auth-db";

export async function generateMetadata(): Promise<Metadata> {
  const count = roundDownToTen(await getPlatformCount());
  return {
    title: "Discover AI Tools | Launchpad HQ",
    description: `Browse ${count}+ vetted AI platforms across 15 categories on LaunchpadHQ.io`,
  };
}

type SortMode = "popular" | "alpha" | "recent";

function normalizeSort(value: string | undefined): SortMode {
  if (value === "alpha" || value === "recent") return value;
  return "popular";
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function buildDiscoverQuery(parts: {
  category?: string;
  cost?: string;
  difficulty?: string;
  mobile?: string;
  sort?: string;
}) {
  const sp = new URLSearchParams();
  if (parts.category) sp.set("category", parts.category);
  if (parts.cost) sp.set("cost", parts.cost);
  if (parts.difficulty) sp.set("difficulty", parts.difficulty);
  if (parts.mobile) sp.set("mobile", parts.mobile);
  // "popular" is the default — omit from URL so default URLs stay clean.
  if (parts.sort && parts.sort !== "popular") sp.set("sort", parts.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

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

  const where: Record<string, unknown> = {};
  if (params.category) {
    where.category = { slug: params.category };
  }
  if (params.cost) {
    where.costTier = params.cost.toUpperCase();
  }
  if (params.difficulty) {
    where.difficultyLevel = params.difficulty.toUpperCase();
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

  const costQs = params.cost?.toLowerCase();
  const difficultyQs = params.difficulty?.toLowerCase();

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-white">Discover AI Tools</h1>
      <p className="mb-4 text-gray-400">
        Browse {platforms.length} vetted tools across {categories.length} categories
      </p>
      <div className="mb-8 rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-sm text-gray-300">
        <span className="font-medium text-orange-200">Workflow templates</span>
        {" — "}
        Compare optimal, hybrid, and budget stacks for blogging, video, code, and more.{" "}
        <Link href="/workflows" className="font-medium text-orange-400 hover:underline">
          Browse workflows
        </Link>
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href={
            "/discover" +
            buildDiscoverQuery({
              cost: costQs,
              difficulty: difficultyQs,
              mobile: params.mobile,
              sort: params.sort,
            })
          }
          className={`rounded-lg px-3 py-1.5 text-sm ${!params.category ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={
              "/discover" +
              buildDiscoverQuery({
                category: cat.slug,
                cost: costQs,
                difficulty: difficultyQs,
                mobile: params.mobile,
                sort: params.sort,
              })
            }
            className={`rounded-lg px-3 py-1.5 text-sm ${params.category === cat.slug ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            {displayCategoryName(cat.name)} ({cat._count.platforms})
          </Link>
        ))}
      </div>

      {/* Cost filter */}
      <div className="mb-6 flex gap-2">
        {["FREE", "FREEMIUM", "PAID", "ENTERPRISE"].map((tier) => (
          <Link
            key={tier}
            href={
              "/discover" +
              buildDiscoverQuery({
                category: params.category,
                cost: tier.toLowerCase(),
                difficulty: difficultyQs,
                mobile: params.mobile,
                sort: params.sort,
              })
            }
            className={`rounded-md px-2 py-1 text-xs ${params.cost?.toUpperCase() === tier ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
          >
            {tier.toLowerCase()}
          </Link>
        ))}
        {params.cost && (
          <Link
            href={
              "/discover" +
              buildDiscoverQuery({
                category: params.category,
                difficulty: difficultyQs,
                mobile: params.mobile,
                sort: params.sort,
              })
            }
            className="text-xs text-gray-500 hover:text-white"
          >
            clear
          </Link>
        )}
      </div>

      {/* Mobile filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={
            "/discover" +
            buildDiscoverQuery({
              category: params.category,
              cost: costQs,
              difficulty: difficultyQs,
              sort: params.sort,
            })
          }
          className={`rounded-md px-2 py-1 text-xs ${!params.mobile ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
        >
          All
        </Link>
        <Link
          href={
            "/discover" +
            buildDiscoverQuery({
              category: params.category,
              cost: costQs,
              difficulty: difficultyQs,
              mobile: "app",
              sort: params.sort,
            })
          }
          className={`rounded-md px-2 py-1 text-xs ${params.mobile === "app" ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
        >
          Has app
        </Link>
        <Link
          href={
            "/discover" +
            buildDiscoverQuery({
              category: params.category,
              cost: costQs,
              difficulty: difficultyQs,
              mobile: "web",
              sort: params.sort,
            })
          }
          className={`rounded-md px-2 py-1 text-xs ${params.mobile === "web" ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
        >
          Mobile web
        </Link>
      </div>

      {/* Sort toggle */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-gray-500">Sort</span>
        {(["popular", "alpha", "recent"] as const).map((s) => (
          <Link
            key={s}
            href={
              "/discover" +
              buildDiscoverQuery({
                category: params.category,
                cost: costQs,
                difficulty: difficultyQs,
                mobile: params.mobile,
                sort: s,
              })
            }
            className={`rounded-md px-2 py-1 text-xs ${sort === s ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            {s === "popular" ? "Popular" : s === "alpha" ? "A–Z" : "Recent"}
          </Link>
        ))}
      </div>

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
