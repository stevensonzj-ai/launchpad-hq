export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformDetailHeader } from "@/components/platforms/platform-detail-header";
import { PlatformTabNav } from "@/components/platforms/platform-detail-tabs";
import { PlatformTutorials } from "@/components/tutorials/platform-tutorials";
import { JsonLd } from "@/components/seo/json-ld";
import { PlatformStatusNotice } from "@/components/platforms/platform-status-notice";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getPlatformPageRow } from "@/lib/catalog-queries";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { staticTutorialCount } from "@/lib/platform-display";
import { buildTutorialMetadata, stripInlineMarkup, verifiedDisplayName } from "@/lib/seo-metadata";
import { buildTutorialStructuredData, officialSiteHref } from "@/lib/seo-jsonld";
import { toGuideView } from "@/lib/public-data/content-view";
import { loadFeed } from "@/lib/public-data/load";

/**
 * The tutorial's own indexable page: unique title, description and
 * self-canonical, instead of sharing the overview's via ?tab=tutorials.
 * 404s unless both a registered tutorial and a Platform row exist — the
 * sitemap applies the same rule.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getStaticTutorialForPlatform(slug);
  if (!tutorial) return { title: "Not Found" };
  const platform = await getPlatformPageRow(slug);
  if (!platform) return { title: "Not Found" };
  return buildTutorialMetadata({
    platformSlug: slug,
    name: verifiedDisplayName(getToolFacts(slug), platform.name),
    index: getToolFacts(slug)?.visibility === "hidden" ? false : undefined,
    tagline: tutorial.tagline,
    lastReviewedAt: tutorial.lastReviewedAt,
  });
}

export default async function PlatformGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getStaticTutorialForPlatform(slug);
  if (!tutorial) notFound();

  // Shared catalog cache, same entry as the overview page. Only the
  // favorite lookup below is per visitor, and it stays uncached.
  const platform = await getPlatformPageRow(slug);
  if (!platform) notFound();

  const facts = getToolFacts(platform.slug);
  const view = overlayPlatformWithFacts(platform, facts);
  const displayName = view.name ?? platform.name;
  // Price tokens and the header price come from the same view as /data/v1/guides.
  const guide = toGuideView(tutorial, (await loadFeed()).tools);
  const user = await getOrCreateDbUser();
  const favorite = user
    ? await prisma.userFavorite.findUnique({
        where: { userId_platformId: { userId: user.id, platformId: platform.id } },
        select: { id: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <JsonLd
        data={buildTutorialStructuredData({
          title: tutorial.title,
          description: stripInlineMarkup(tutorial.tagline),
          platformName: displayName,
          platformSlug: platform.slug,
          categoryName: platform.category.name,
          categorySlug: platform.category.slug,
          lastReviewedAt: tutorial.lastReviewedAt,
          website: view.website,
        })}
      />
      <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-gray-300">
        <Link href="/discover" className="hover:text-white">Discover</Link>
        <span>/</span>
        <Link href={`/discover?category=${platform.category.slug}`} className="hover:text-white">
          {platform.category.name}
        </Link>
        <span>/</span>
        <Link href={`/platform/${platform.slug}`} className="hover:text-white">
          {displayName}
        </Link>
        <span>/</span>
        <span className="text-gray-300">Getting started</span>
      </div>

      <PlatformDetailHeader
        slug={platform.slug}
        name={displayName}
        company={view.company ?? platform.company}
        logoUrl={platform.logoUrl}
        officialHref={officialSiteHref(view.website)}
        isFavorited={favorite !== null}
        isSignedIn={user !== null}
        nameAs="p"
      />

      <PlatformTabNav
        platformSlug={platform.slug}
        activeTab="tutorials"
        counts={{
          tutorials: staticTutorialCount(true),
          discussions: platform._count.discussions,
          prompts: platform._count.prompts,
        }}
      />

      {facts?.status ? (
        <div className="mb-8">
          <PlatformStatusNotice
            platformName={displayName}
            lifecycle={facts.lifecycle}
            status={facts.status}
            compact
          />
        </div>
      ) : null}

      <PlatformTutorials
        platformName={displayName}
        platformSlug={platform.slug}
        tutorial={guide.tutorial}
        startingPrice={guide.headerPrice}
        titleAs="h1"
      />

      <p className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
        Want the full picture first?{" "}
        <Link href={`/platform/${platform.slug}`} className="text-orange-400 hover:text-orange-300">
          See the {displayName} overview
        </Link>{" "}
        for pricing, the free tier and related tools.
      </p>
    </div>
  );
}
