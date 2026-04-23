export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PlatformCard } from "@/components/platforms/platform-card";
import { PlatformDetailTabs } from "@/components/platforms/platform-detail-tabs";
import { PlatformMobileSection } from "@/components/platforms/platform-mobile-section";
import { PlatformOverviewSections } from "@/components/platforms/platform-overview-sections";
import { displayCategoryName } from "@/lib/categories";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { name: true, primaryUse: true, description: true },
  });
  if (!platform) return { title: "Not Found" };
  const metaDesc = platform.description?.trim() || platform.primaryUse || undefined;
  return {
    title: `${platform.name} | Launchpad HQ`,
    description: metaDesc,
  };
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const platform = await prisma.platform.findUnique({
    where: { slug },
    include: {
      category: true,
      tutorials: { where: { published: true }, take: 5 },
    },
  });

  if (!platform) notFound();

  // Fetch alternatives
  const alternatives = platform.directAlternatives.length
    ? await prisma.platform.findMany({
        where: { name: { in: platform.directAlternatives, mode: "insensitive" } },
        include: { category: true },
        take: 4,
      })
    : [];

  const complementary = platform.complementaryTools.length
    ? await prisma.platform.findMany({
        where: { name: { in: platform.complementaryTools, mode: "insensitive" } },
        include: { category: true },
        take: 4,
      })
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/discover" className="hover:text-white">Discover</Link>
        <span>/</span>
        <Link href={`/discover?category=${platform.category.slug}`} className="hover:text-white">
          {displayCategoryName(platform.category.name)}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{platform.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{platform.name}</h1>
          {platform.company && <p className="mt-1 text-gray-400">by {platform.company}</p>}
        </div>
        {platform.website && (
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
          >
            Visit <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <PlatformDetailTabs platformName={platform.name} platformSlug={platform.slug}>
        <PlatformOverviewSections platform={platform} />

        {/* Content sections */}
        <div className="mt-8 space-y-6">
          <PlatformMobileSection
            name={platform.name}
            hasMobileApp={platform.hasMobileApp}
            iosAppUrl={platform.iosAppUrl}
            androidAppUrl={platform.androidAppUrl}
            mobileWebFriendly={platform.mobileWebFriendly}
            platformType={platform.platformType}
          />

          <div className={`grid gap-6${platform.freeTierFeatures ? " lg:grid-cols-2 lg:items-start" : ""}`}>
            {/* Free Tier */}
            {platform.freeTierFeatures && (
              <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-3 text-lg font-semibold text-white">Free Tier</h2>
                <p className="text-sm text-gray-300">{platform.freeTierFeatures}</p>
                {platform.usageLimits && (
                  <div className="mt-3 border-t border-gray-800 pt-3">
                    <p className="text-xs text-gray-500">Limits: {platform.usageLimits}</p>
                  </div>
                )}
                {platform.upgradeTriggers && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">When to upgrade: {platform.upgradeTriggers}</p>
                  </div>
                )}
              </section>
            )}

            {/* Technical Details */}
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Technical Details</h2>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div><span className="text-gray-500">Type:</span> <span className="text-gray-300">{platform.platformType.join(", ")}</span></div>
                <div><span className="text-gray-500">Offline:</span> <span className="text-gray-300">{platform.offlineCapable ? "Yes" : "No"}</span></div>
                <div><span className="text-gray-500">API:</span> <span className="text-gray-300">{platform.apiAvailable ? "Yes" : "No"}</span></div>
                <div><span className="text-gray-500">Languages:</span> <span className="text-gray-300">{platform.languageSupport || "English"}</span></div>
                {platform.keyIntegrations && (
                  <div className="sm:col-span-2"><span className="text-gray-500">Integrations:</span> <span className="text-gray-300">{platform.keyIntegrations}</span></div>
                )}
              </div>
            </section>
          </div>
        </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-white">Alternatives</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {alternatives.map((p) => (
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
              />
            ))}
          </div>
        </section>
      )}

      {/* Complementary */}
      {complementary.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-white">Works Well With</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {complementary.map((p) => (
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
              />
            ))}
          </div>
        </section>
      )}
      </PlatformDetailTabs>
    </div>
  );
}
