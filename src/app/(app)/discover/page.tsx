export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { PlatformCard } from "@/components/platforms/platform-card";
import Link from "next/link";

export const metadata = {
  title: "Discover AI Tools | Launchpad HQ",
  description: "Browse 168+ vetted AI platforms across 15 categories on LaunchpadHQ.io",
};

function buildDiscoverQuery(parts: {
  category?: string;
  cost?: string;
  difficulty?: string;
  mobile?: string;
}) {
  const sp = new URLSearchParams();
  if (parts.category) sp.set("category", parts.category);
  if (parts.cost) sp.set("cost", parts.cost);
  if (parts.difficulty) sp.set("difficulty", parts.difficulty);
  if (parts.mobile) sp.set("mobile", parts.mobile);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; cost?: string; difficulty?: string; mobile?: string }>;
}) {
  const params = await searchParams;

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

  const costQs = params.cost?.toLowerCase();
  const difficultyQs = params.difficulty?.toLowerCase();

  const [platforms, categories] = await Promise.all([
    prisma.platform.findMany({
      where,
      include: { category: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
      take: 200,
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { platforms: true } } },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-white">Discover AI Tools</h1>
      <p className="mb-8 text-gray-400">
        Browse {platforms.length} vetted tools across {categories.length} categories
      </p>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href={"/discover" + buildDiscoverQuery({ cost: costQs, difficulty: difficultyQs, mobile: params.mobile })}
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
              })
            }
            className={`rounded-lg px-3 py-1.5 text-sm ${params.category === cat.slug ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            {cat.name} ({cat._count.platforms})
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
            })
          }
          className={`rounded-md px-2 py-1 text-xs ${params.mobile === "app" ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
        >
          📱 Has App
        </Link>
        <Link
          href={
            "/discover" +
            buildDiscoverQuery({
              category: params.category,
              cost: costQs,
              difficulty: difficultyQs,
              mobile: "web",
            })
          }
          className={`rounded-md px-2 py-1 text-xs ${params.mobile === "web" ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-500 hover:text-white"}`}
        >
          🌐 Mobile Web
        </Link>
      </div>

      {/* Grid */}
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
          />
        ))}
      </div>

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
