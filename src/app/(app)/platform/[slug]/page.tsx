export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Shield, Zap, Clock, Star } from "lucide-react";
import { PlatformCard } from "@/components/platforms/platform-card";
import { PlatformDetailTabs } from "@/components/platforms/platform-detail-tabs";
import { PlatformMobileSection } from "@/components/platforms/platform-mobile-section";
import { PlatformOverviewSections } from "@/components/platforms/platform-overview-sections";

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
          {platform.category.name}
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

      <PlatformOverviewSections platform={platform} />

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <p className="text-xs text-gray-500">Pricing</p>
          <p className="mt-1 text-sm font-medium text-white">{platform.currentPricing || platform.costTier}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <p className="text-xs text-gray-500">Difficulty</p>
          </div>
          <p className="mt-1 text-sm font-medium text-white">{platform.difficultyLevel.toLowerCase()}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-green-400" />
            <p className="text-xs text-gray-500">Time to Start</p>
          </div>
          <p className="mt-1 text-sm font-medium text-white">{platform.timeToProductivity || "Varies"}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            <p className="text-xs text-gray-500">Privacy</p>
          </div>
          <p className="mt-1 text-sm font-medium text-white">{platform.privacyLevel.toLowerCase()}</p>
        </div>
      </div>

      <PlatformDetailTabs platformName={platform.name} platformSlug={platform.slug}>
        {/* Content sections */}
        <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PlatformMobileSection
            name={platform.name}
            hasMobileApp={platform.hasMobileApp}
            iosAppUrl={platform.iosAppUrl}
            androidAppUrl={platform.androidAppUrl}
            mobileWebFriendly={platform.mobileWebFriendly}
            platformType={platform.platformType}
          />

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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ideal for */}
          {platform.idealUserTypes.length > 0 && (
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">Ideal For</h3>
              <div className="flex flex-wrap gap-2">
                {platform.idealUserTypes.map((t) => (
                  <span key={t} className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{t.trim()}</span>
                ))}
              </div>
            </section>
          )}

          {/* Content types */}
          {platform.contentTypes.length > 0 && (
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">Supported Content</h3>
              <div className="flex flex-wrap gap-2">
                {platform.contentTypes.map((t) => (
                  <span key={t} className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{t.trim()}</span>
                ))}
              </div>
            </section>
          )}

          {/* Output formats */}
          {platform.outputFormats.length > 0 && (
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">Output Formats</h3>
              <div className="flex flex-wrap gap-2">
                {platform.outputFormats.map((t) => (
                  <span key={t} className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">{t.trim()}</span>
                ))}
              </div>
            </section>
          )}
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
