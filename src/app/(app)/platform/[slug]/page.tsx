export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ModerationStatus } from "@prisma/client";
import { PlatformCard } from "@/components/platforms/platform-card";
import { PlatformDetailTabs } from "@/components/platforms/platform-detail-tabs";
import { PlatformMobileSection } from "@/components/platforms/platform-mobile-section";
import { PlatformOverviewSections } from "@/components/platforms/platform-overview-sections";
import { PlatformModelsSection } from "@/components/models/platform-models-section";
import { FavoriteButton } from "@/components/platforms/favorite-button";
import { PlatformVerdictCard } from "@/components/platforms/platform-verdict-card";
import { PlatformQuickFacts } from "@/components/platforms/platform-quick-facts";
import { PlatformPricingTable } from "@/components/platforms/platform-pricing-table";
import { PlatformSources } from "@/components/platforms/platform-sources";
import { FactCite } from "@/components/platforms/fact-cite";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getModelFamilyForPlatform } from "@/data/models";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import {
  collectDisplaySources,
  freeTierSummary,
  plansFromFactsOrProse,
  startingPriceLabel,
  staticTutorialCount,
  stripInlineCitations,
} from "@/lib/platform-display";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { name: true, primaryUse: true, description: true },
  });
  if (!platform) return { title: "Not Found" };
  const facts = getToolFacts(slug);
  const metaDesc =
    facts?.verdict?.value?.trim() ||
    platform.description?.trim() ||
    platform.primaryUse ||
    undefined;
  return {
    title: `${platform.name} | Launchpad HQ`,
    description: metaDesc,
  };
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

  const [alternatives, complementary, favoriteRows] = await Promise.all([
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
  ]);
  const favoriteIds = new Set(favoriteRows.map((f) => f.platformId));
  const isFavorited = favoriteIds.has(platform.id);

  const plans = plansFromFactsOrProse(facts, view.currentPricing, platform.costTier);
  const freeSummary = freeTierSummary(facts, view.freeTierFeatures);
  const { sources, notes } = collectDisplaySources(facts, [
    platform.description,
    platform.currentPricing,
    platform.freeTierFeatures,
    platform.usageLimits,
    platform.primaryUse,
  ]);
  const platformsLabel = view.platformType.join(", ");
  const fallbackVerdict =
    platform.description?.trim() || platform.primaryUse?.trim() || null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/discover" className="hover:text-white">Discover</Link>
        <span>/</span>
        <Link href={`/discover?category=${platform.category.slug}`} className="hover:text-white">
          {platform.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{platform.name}</span>
      </div>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{platform.name}</h1>
          {platform.company && <p className="mt-1 text-gray-400">by {platform.company}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <FavoriteButton
            slug={platform.slug}
            initialFavorited={isFavorited}
            isSignedIn={isSignedIn}
            variant="labeled"
          />
          {platform.website && (
            <a
              href={platform.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
            >
              Visit <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <PlatformDetailTabs
        platformName={platform.name}
        platformSlug={platform.slug}
        counts={{
          tutorials: tutorialCount,
          discussions: platform._count.discussions,
          prompts: platform._count.prompts,
        }}
        initialTab={tab}
      >
        {facts?.lifecycle === "discontinued" && (
          <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            This tool is marked discontinued. Confirm current availability on the official site before signing up.
          </div>
        )}
        {facts?.lifecycle === "beta" && (
          <div className="mb-6 rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
            This tool is in beta. Features and pricing may change.
          </div>
        )}

        <div className="space-y-8">
          <PlatformVerdictCard
            name={platform.name}
            verdictFact={facts?.verdict}
            fallbackText={fallbackVerdict}
            idealUserTypes={platform.idealUserTypes}
          />

          <PlatformQuickFacts
            items={[
              { label: "Free tier", value: freeSummary, fact: facts?.freeTier },
              { label: "Starting price", value: startingPriceLabel(plans), fact: facts?.plans },
              { label: "Platforms", value: platformsLabel, fact: facts?.platforms },
              { label: "Company", value: platform.company ?? "" },
            ]}
          />

          <PlatformPricingTable plans={plans} plansFact={facts?.plans} />
        </div>

        <div className="mt-8">
          <PlatformOverviewSections platform={view} />
        </div>

        <div className="mt-8 space-y-6">
          <PlatformMobileSection
            name={platform.name}
            iosAppUrl={view.iosAppUrl}
            androidAppUrl={view.androidAppUrl}
            macosAppUrl={view.macosAppUrl}
            windowsAppUrl={view.windowsAppUrl}
            linuxAppUrl={view.linuxAppUrl}
            mobileWebFriendly={platform.mobileWebFriendly}
            platformType={view.platformType}
            appsFact={facts?.apps}
          />

          <div className={`grid gap-6${view.freeTierFeatures ? " lg:grid-cols-2 lg:items-start" : ""}`}>
            {view.freeTierFeatures && (
              <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Free Tier
                  <FactCite fact={facts?.freeTier} />
                </h2>
                <p className="text-sm text-gray-300">{stripInlineCitations(view.freeTierFeatures)}</p>
                {view.usageLimits && (
                  <div className="mt-3 border-t border-gray-800 pt-3">
                    <p className="text-xs text-gray-500">
                      Limits: {stripInlineCitations(view.usageLimits)}
                    </p>
                  </div>
                )}
                {platform.upgradeTriggers && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      When to upgrade: {stripInlineCitations(platform.upgradeTriggers)}
                    </p>
                  </div>
                )}
              </section>
            )}

            <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Technical Details</h2>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-gray-500">Type:</span>{" "}
                  <span className="text-gray-300">{view.platformType.join(", ")}</span>
                  <FactCite fact={facts?.platforms} />
                  {facts?.platforms?.note && (
                    <p className="mt-1 text-xs text-gray-500">“{facts.platforms.note}”</p>
                  )}
                </div>
                <div><span className="text-gray-500">Offline:</span> <span className="text-gray-300">{platform.offlineCapable ? "Yes" : "No"}</span></div>
                <div><span className="text-gray-500">API:</span> <span className="text-gray-300">{platform.apiAvailable ? "Yes" : "No"}</span></div>
                <div><span className="text-gray-500">Languages:</span> <span className="text-gray-300">{platform.languageSupport || "English"}</span></div>
                {platform.keyIntegrations && (
                  <div className="sm:col-span-2"><span className="text-gray-500">Integrations:</span> <span className="text-gray-300">{platform.keyIntegrations}</span></div>
                )}
                {facts?.models && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">{facts.models.label ?? "Models"}:</span>{" "}
                    <span className="text-gray-300">{facts.models.value.join(", ")}</span>
                    <FactCite fact={facts.models} />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {facts?.changelog && facts.changelog.length > 0 && (
          <section className="mt-8 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">What changed</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {facts.changelog.map((entry) => (
                <li key={`${entry.date}-${entry.field}-${entry.summary}`}>
                  <span className="text-gray-500">{entry.date}</span>
                  {" · "}
                  <span className="text-gray-400">{entry.field}</span>
                  {" — "}
                  {entry.summary}
                </li>
              ))}
            </ul>
          </section>
        )}

        {modelFamily && <PlatformModelsSection family={modelFamily} />}

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

        <PlatformSources sources={sources} notes={notes} />
      </PlatformDetailTabs>
    </div>
  );
}
