import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { FactCite } from "@/components/platforms/fact-cite";
import { PlatformMobileSection } from "@/components/platforms/platform-mobile-section";
import { PlatformOverviewSections } from "@/components/platforms/platform-overview-sections";
import { PlatformPricingTable } from "@/components/platforms/platform-pricing-table";
import { PlatformQuickFacts } from "@/components/platforms/platform-quick-facts";
import { PlatformSources } from "@/components/platforms/platform-sources";
import { PlatformStatusNotice } from "@/components/platforms/platform-status-notice";
import { PlatformTechnicalDetails } from "@/components/platforms/platform-technical-details";
import { PlatformUsageLimits } from "@/components/platforms/platform-usage-limits";
import { PlatformVerdictCard } from "@/components/platforms/platform-verdict-card";
import type { OverlayPlatform, PlatformFactFields } from "@/data/facts/overlay";
import { publishedUsageLimits } from "@/data/facts/walk";
import type { ToolFacts } from "@/data/facts/types";
import {
  applyUsageLimitsToFreePlan,
  collectDisplaySources,
  freeTierSummary,
  plansFromFactsOrProse,
  startingPriceLabel,
} from "@/lib/platform-display";
import { pricesCheckedAt } from "@/lib/public-data/pricing";

export type ToolOverviewPlatform = OverlayPlatform<
  PlatformFactFields & {
    name: string;
    slug: string;
    company: string | null;
    primaryUse: string | null;
    primaryUseCases: string | null;
    idealUserTypes: string[];
    contentTypes: string[];
    outputFormats: string[];
    difficultyLevel: string;
    privacyLevel: string;
    timeToProductivity: string | null;
    learningCurve: string | null;
    offlineCapable: boolean;
    apiAvailable: boolean;
    languageSupport: string | null;
    keyIntegrations: string | null;
    upgradeTriggers: string | null;
    costTier: string;
    mobileWebFriendly: boolean;
  }
>;

type PlatformToolOverviewProps = {
  platform: ToolOverviewPlatform;
  facts: ToolFacts | undefined;
  /** When true, models live in the dedicated Models section, not Technical details. */
  hasModelFamily: boolean;
  modelsSection?: ReactNode;
  gettingStartedHref?: string;
};

export function PlatformToolOverview({
  platform,
  facts,
  hasModelFamily,
  modelsSection,
  gettingStartedHref,
}: PlatformToolOverviewProps) {
  const plans = applyUsageLimitsToFreePlan(
    plansFromFactsOrProse(facts, platform.currentPricing, platform.costTier),
    platform.usageLimits,
  );
  const freeSummary = freeTierSummary(facts, platform.freeTierFeatures);
  const { sources, notes } = collectDisplaySources(facts, [
    platform.description,
    platform.currentPricing,
    platform.freeTierFeatures,
    platform.usageLimits,
    platform.primaryUse,
  ]);
  const fallbackVerdict = platform.description?.trim() || platform.primaryUse?.trim() || null;
  const showModelsInTechnical = Boolean(facts?.models) && !hasModelFamily;
  const usageLimitsFact = publishedUsageLimits(facts);
  // A discontinued product keeps its description (what it was) and sources,
  // but not pricing, apps or a getting-started link that no longer apply.
  const retired = facts?.lifecycle === "discontinued";

  return (
    <div className="space-y-7">
      {facts?.status ? (
        <PlatformStatusNotice
          platformName={platform.name}
          lifecycle={facts.lifecycle}
          status={facts.status}
        />
      ) : null}
      {facts?.lifecycle === "discontinued" && !facts.status && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          This tool is marked discontinued. Confirm current availability on the official site before signing up.
        </div>
      )}
      {facts?.lifecycle === "beta" && (
        <div className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
          This tool is in beta. Features and pricing may change.
        </div>
      )}

      <PlatformVerdictCard
        name={platform.name}
        verdictFact={facts?.verdict}
        fallbackText={fallbackVerdict}
        idealUserTypes={platform.idealUserTypes}
        useCases={platform.primaryUseCases}
      />

      {retired ? null : (
        <>
          <PlatformQuickFacts
            items={[
              { label: "Free tier", value: freeSummary, fact: facts?.freeTier },
              { label: "Starting price", value: startingPriceLabel(plans), fact: facts?.plans },
              {
                label: "Platforms",
                value: platform.platformType.join(", "),
                fact: facts?.platforms,
                note: facts?.platforms?.note,
              },
              {
                label: "Company",
                value: platform.company ?? "",
                fact: facts?.company,
              },
            ]}
          />

          {gettingStartedHref && <Link href={gettingStartedHref} className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200/20 bg-gradient-to-r from-amber-100/[0.07] to-transparent px-5 py-4 text-sm text-amber-50 transition-colors hover:border-amber-300/50">
            <span className="flex items-center gap-3"><BookOpen aria-hidden="true" className="h-5 w-5 text-amber-300" /><span>Ready to try {platform.name}? <span className="text-gray-400">Start with the getting-started guide.</span></span></span><ArrowRight aria-hidden="true" className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-1" />
          </Link>}

          <div className="grid min-w-0 items-start gap-x-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <PlatformPricingTable
              plans={plans}
              plansFact={facts?.plans}
              checkedAt={pricesCheckedAt(facts, [platform.currentPricing, platform.usageLimits])}
            />
            <PlatformOverviewSections platform={platform} />
          </div>

          {facts?.apiPricing ? (
            <section className="lp-overview-panel">
              <div className="mb-2 flex items-center gap-1">
                <h2 className="text-lg font-semibold text-white">API pricing</h2>
                <FactCite fact={facts.apiPricing} />
              </div>
              <p className="text-sm leading-relaxed text-gray-200">{facts.apiPricing.value}</p>
              {facts.apiPricing.note ? (
                <p className="mt-2 text-sm text-gray-400">{facts.apiPricing.note}</p>
              ) : null}
            </section>
          ) : null}

          {facts?.features?.value.length ? (
            <section className="lp-overview-panel">
              <div className="mb-2 flex items-center gap-1">
                <h2 className="text-lg font-semibold text-white">{facts.features.label ?? "Features"}</h2>
                <FactCite fact={facts.features} />
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-200">
                {facts.features.value.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <PlatformUsageLimits fact={usageLimitsFact} />

          <PlatformMobileSection
            slug={platform.slug}
            name={platform.name}
            iosAppUrl={platform.iosAppUrl}
            androidAppUrl={platform.androidAppUrl}
            macosAppUrl={platform.macosAppUrl}
            windowsAppUrl={platform.windowsAppUrl}
            linuxAppUrl={platform.linuxAppUrl}
            mobileWebFriendly={platform.mobileWebFriendly}
            platformType={platform.platformType}
            appsFact={facts?.apps}
          />

          <PlatformTechnicalDetails
            difficultyLevel={platform.difficultyLevel}
            privacyLevel={platform.privacyLevel}
            timeToProductivity={platform.timeToProductivity}
            learningCurve={platform.learningCurve}
            offlineCapable={platform.offlineCapable}
            apiAvailable={platform.apiAvailable}
            languageSupport={platform.languageSupport}
            keyIntegrations={platform.keyIntegrations}
            upgradeTriggers={platform.upgradeTriggers}
            privacyFact={facts?.privacy}
            modelsRow={
              showModelsInTechnical && facts?.models
                ? {
                    label: facts.models.label ?? "Models",
                    value: facts.models.value.join(", "),
                    fact: facts.models,
                    showNote: facts.slug === "meta-ai",
                  }
                : undefined
            }
          />

          {facts?.changelog && facts.changelog.length > 0 && (
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
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

          {hasModelFamily ? modelsSection : null}
        </>
      )}

      <PlatformSources sources={sources} notes={notes} />
    </div>
  );
}
