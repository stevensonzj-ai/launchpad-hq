export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ModerationStatus } from "@prisma/client";
import { PlatformCard } from "@/components/platforms/platform-card";
import { PlatformDetailHeader } from "@/components/platforms/platform-detail-header";
import { PlatformDetailTabs } from "@/components/platforms/platform-detail-tabs";
import { PlatformModelsSection } from "@/components/models/platform-models-section";
import { PlatformToolOverview } from "@/components/platforms/platform-tool-overview";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getModelFamilyForPlatform } from "@/data/models";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import { getStaticTutorialForPlatform, tutorialGuidePath } from "@/data/tutorials";
import { staticTutorialCount } from "@/lib/platform-display";
import { buildPlatformMetadata } from "@/lib/seo-metadata";
import { buildPlatformStructuredData, officialSiteHref } from "@/lib/seo-jsonld";
import { dataAsOf, publicToolCore } from "@/lib/public-data/serialize";
import { JsonLd } from "@/components/seo/json-ld";
import { GroupedCatalogLinks } from "@/components/seo/catalog-link-list";
import {
  pickRelatedPlatforms,
  relatedCatalogLinksForPlatform,
  sponsorExcludedSlugs,
} from "@/lib/related-links";
import { PLACEMENTS } from "@/data/sponsors";
import { listedPlatformWhere } from "@/lib/catalog-visibility";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: {
      name: true,
      primaryUse: true,
      description: true,
      category: { select: { name: true } },
    },
  });
  if (!platform) return { title: "Not Found" };
  return buildPlatformMetadata({
    slug,
    name: platform.name,
    categoryName: platform.category.name,
    primaryUse: platform.primaryUse,
    description: platform.description,
    facts: getToolFacts(slug),
  });
}

export default async function PlatformPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { slug } = await params;
  const { tab } = await searchParams;

  // Tutorials used to render here as ?tab=tutorials, sharing the overview's
  // title and canonical. They now have their own page; 308 old links there.
  // Platforms without a tutorial keep falling back to the overview.
  if (tab === "tutorials" && getStaticTutorialForPlatform(slug)) {
    permanentRedirect(tutorialGuidePath(slug));
  }

  const platform = await prisma.platform.findUnique({
    where: { slug },
    include: {
      category: true,
      _count: {
        select: {
          prompts: { where: { status: ModerationStatus.APPROVED } },
          discussions: { where: { status: ModerationStatus.APPROVED } },
        },
      },
    },
  });

  if (!platform) notFound();

  const modelFamily = getModelFamilyForPlatform(platform.slug);
  const facts = getToolFacts(platform.slug);
  const view = overlayPlatformWithFacts(platform, facts);
  const hasTutorial = Boolean(getStaticTutorialForPlatform(platform.slug));
  const tutorialCount = staticTutorialCount(hasTutorial);

  const user = await getOrCreateDbUser();
  const isSignedIn = user !== null;

  const [alternatives, complementary, favoriteRows, sameCategory] = await Promise.all([
    platform.directAlternatives.length
      ? prisma.platform.findMany({
          where: { name: { in: platform.directAlternatives, mode: "insensitive" } },
          include: { category: true },
          take: 4,
        })
      : Promise.resolve([]),
    platform.complementaryTools.length
      ? prisma.platform.findMany({
          where: { name: { in: platform.complementaryTools, mode: "insensitive" } },
          include: { category: true },
          take: 4,
        })
      : Promise.resolve([]),
    user
      ? prisma.userFavorite.findMany({
          where: { userId: user.id },
          select: { platformId: true },
        })
      : Promise.resolve([]),
    prisma.platform.findMany({
      where: {
        categoryId: platform.categoryId,
        AND: [{ slug: { not: platform.slug } }, listedPlatformWhere()],
      },
      select: { slug: true, name: true, category: { select: { slug: true } } },
      // v1: first same-category platforms alphabetically, not relevance-ranked.
      orderBy: { name: "asc" },
      take: 12,
    }),
  ]);
  const favoriteIds = new Set(favoriteRows.map((f) => f.platformId));
  const isFavorited = favoriteIds.has(platform.id);
  const relatedCandidates = sameCategory.map((row) => ({
    slug: row.slug,
    name: row.name,
    categorySlug: row.category.slug,
  }));
  const related = pickRelatedPlatforms(platform.slug, platform.category.slug, relatedCandidates, {
    excludeSlugs: sponsorExcludedSlugs(relatedCandidates, PLACEMENTS),
  });
  const catalogLinks = relatedCatalogLinksForPlatform({
    slug: platform.slug,
    name: view.name ?? platform.name,
    categorySlug: platform.category.slug,
    categoryName: platform.category.name,
    related,
  });
  const displayName = view.name ?? platform.name;
  const officialHref = officialSiteHref(view.website);
  // Same values as /data/v1/tools/{slug}.json, so JSON-LD prices match the feed.
  const feedCore = publicToolCore(platform, facts);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <JsonLd
        data={buildPlatformStructuredData({
          name: displayName,
          slug: platform.slug,
          categoryName: platform.category.name,
          categorySlug: platform.category.slug,
          website: view.website,
          description: feedCore.description,
          dateModified: dataAsOf(platform, facts),
          plans: feedCore.plans,
        })}
      />
      <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-gray-300">
        <Link href="/discover" className="hover:text-white">Discover</Link>
        <span>/</span>
        <Link href={`/discover?category=${platform.category.slug}`} className="hover:text-white">
          {platform.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{view.name ?? platform.name}</span>
      </div>

      <PlatformDetailHeader
        slug={platform.slug}
        name={displayName}
        company={view.company ?? platform.company}
        logoUrl={platform.logoUrl}
        officialHref={officialHref}
        isFavorited={isFavorited}
        isSignedIn={isSignedIn}
      />

      <PlatformDetailTabs
        platformName={view.name ?? platform.name}
        platformSlug={platform.slug}
        counts={{
          tutorials: tutorialCount,
          discussions: platform._count.discussions,
          prompts: platform._count.prompts,
        }}
        initialTab={tab}
      >
        <PlatformToolOverview
          gettingStartedHref={hasTutorial ? tutorialGuidePath(platform.slug) : undefined}
          platform={{
            ...view,
            slug: platform.slug,
            name: view.name ?? platform.name,
            company: view.company ?? platform.company,
            primaryUse: platform.primaryUse,
            primaryUseCases: platform.primaryUseCases,
            idealUserTypes: platform.idealUserTypes,
            contentTypes: platform.contentTypes,
            outputFormats: platform.outputFormats,
            difficultyLevel: platform.difficultyLevel,
            privacyLevel: platform.privacyLevel,
            timeToProductivity: platform.timeToProductivity,
            learningCurve: platform.learningCurve,
            offlineCapable: platform.offlineCapable,
            apiAvailable: platform.apiAvailable,
            languageSupport: platform.languageSupport,
            keyIntegrations: platform.keyIntegrations,
            upgradeTriggers: platform.upgradeTriggers,
            costTier: platform.costTier,
            mobileWebFriendly: platform.mobileWebFriendly,
          }}
          facts={facts}
          hasModelFamily={Boolean(modelFamily)}
          modelsSection={modelFamily ? <PlatformModelsSection family={modelFamily} /> : null}
        />

      {alternatives.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-white">Alternatives</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {alternatives.map((p) => (
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
                freeTierFeatures={
                  overlayPlatformWithFacts(p, getToolFacts(p.slug)).freeTierFeatures
                }
                hasMobileApp={p.hasMobileApp}
                mobileWebFriendly={p.mobileWebFriendly}
                isFavorited={favoriteIds.has(p.id)}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </section>
      )}

      {complementary.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-white">Works Well With</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {complementary.map((p) => (
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
                freeTierFeatures={
                  overlayPlatformWithFacts(p, getToolFacts(p.slug)).freeTierFeatures
                }
                hasMobileApp={p.hasMobileApp}
                mobileWebFriendly={p.mobileWebFriendly}
                isFavorited={favoriteIds.has(p.id)}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </section>
      )}
      </PlatformDetailTabs>
      <GroupedCatalogLinks items={catalogLinks} />
    </div>
  );
}
