import type { ReactNode } from "react";
import { PlatformMobileSection } from "@/components/platforms/platform-mobile-section";
import { PlatformOverviewSections } from "@/components/platforms/platform-overview-sections";
import { PlatformPricingTable } from "@/components/platforms/platform-pricing-table";
import { PlatformQuickFacts } from "@/components/platforms/platform-quick-facts";
import { PlatformSources } from "@/components/platforms/platform-sources";
import { PlatformTechnicalDetails } from "@/components/platforms/platform-technical-details";
import { PlatformVerdictCard } from "@/components/platforms/platform-verdict-card";
import type { OverlayPlatform, PlatformFactFields } from "@/data/facts/overlay";
import type { ToolFacts } from "@/data/facts/types";
import {
  applyUsageLimitsToFreePlan,
  collectDisplaySources,
  freeTierSummary,
  plansFromFactsOrProse,
  startingPriceLabel,
} from "@/lib/platform-display";

export type ToolOverviewPlatform = OverlayPlatform<
  PlatformFactFields & {
    name: string;
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
};

export function PlatformToolOverview({
  platform,
  facts,
  hasModelFamily,
  modelsSection,
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

  return (
    <div className="space-y-8">
      {facts?.lifecycle === "discontinued" && (
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
          { label: "Company", value: platform.company ?? "" },
        ]}
      />

      <PlatformPricingTable plans={plans} plansFact={facts?.plans} />

      <PlatformOverviewSections platform={platform} />

      <PlatformMobileSection
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
        modelsRow={
          showModelsInTechnical && facts?.models
            ? {
                label: facts.models.label ?? "Models",
                value: facts.models.value.join(", "),
                fact: facts.models,
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

      <PlatformSources sources={sources} notes={notes} />
    </div>
  );
}
