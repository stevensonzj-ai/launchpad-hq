import Link from "next/link";
import { ArrowRight, Globe, Smartphone } from "lucide-react";
import { OutboundLink } from "@/components/analytics/outbound-link";
import { PlatformLogo } from "@/components/platforms/platform-logo";
import type { ToolFacts } from "@/data/facts/types";
import { paidStartingPrice } from "@/lib/platform-display";
import { cn } from "@/lib/utils";
import { COST_TIER_LABEL, COST_TIER_TOOLTIP, DIFFICULTY_LABEL } from "@/lib/labels";
import { FavoriteButton } from "@/components/platforms/favorite-button";
import { Tooltip } from "@/components/ui/tooltip";

interface PlatformCardProps {
  facts?: Pick<ToolFacts, "freeTier" | "plans">;
  slug: string;
  name: string;
  logoUrl?: string | null;
  company: string | null;
  primaryUse: string | null;
  costTier: string;
  difficultyLevel: string;
  category: { name: string; slug: string };
  freeTierFeatures: string | null;
  matchScore?: number;
  /** True when the platform sits above the user's selected difficulty. */
  aboveDifficulty?: boolean;
  hasMobileApp?: boolean;
  mobileWebFriendly?: boolean;
  isFavorited?: boolean;
  isSignedIn?: boolean;
}

const tierColors: Record<string, string> = {
  FREE: "bg-green-500/10 text-green-400 border-green-500/20",
  FREEMIUM: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PAID: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  ENTERPRISE: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const diffColors: Record<string, string> = {
  BEGINNER: "text-green-400",
  INTERMEDIATE: "text-blue-400",
  ADVANCED: "text-amber-400",
  EXPERT: "text-red-400",
};

export function PlatformCard({
  facts,
  slug,
  name,
  logoUrl,
  company,
  primaryUse,
  costTier,
  difficultyLevel,
  category,
  freeTierFeatures,
  matchScore,
  aboveDifficulty,
  hasMobileApp,
  mobileWebFriendly,
  isFavorited,
  isSignedIn,
}: PlatformCardProps) {
  const showFavorite = isSignedIn !== undefined;
  const freeDetails = facts?.freeTier?.value.summary ?? freeTierFeatures;
  const source = facts?.freeTier;
  const price = facts?.plans ? paidStartingPrice(facts.plans.value) : undefined;
  const pricingSource = price && facts?.plans && (!source || source.sourceUrl !== facts.plans.sourceUrl || source.checkedAt !== facts.plans.checkedAt || source.status !== facts.plans.status) ? facts.plans : undefined;
  const categoryLabel: Record<string, string> = {
    "text-conversational-ai": "writing & conversation",
    "image-generation-editing": "images & design",
    "research-academic-tools": "research",
    "workflow-automation": "automation",
    "ai-coding-development": "coding",
    "voice-speech": "voice & speech",
    "video-creation-editing": "video",
    "local-open-source-ai": "local AI",
  };

  return (
    <article className="group relative flex min-w-0 flex-col rounded-2xl border border-gray-700/70 bg-gradient-to-br from-gray-900/80 to-gray-900/30 p-5 transition-colors hover:border-gray-500 hover:bg-gray-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <PlatformLogo slug={slug} name={name} logoUrl={logoUrl} />
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-orange-300">
              <Link href={`/platform/${slug}`} className="after:absolute after:inset-0 after:rounded-2xl">{name}</Link>
            </h3>
            {company && <p className="mt-1 text-xs text-gray-300">by {company}</p>}
          </div>
        </div>
        <div className="relative z-10 flex shrink-0 flex-wrap items-start justify-end gap-2">
          {matchScore !== undefined && matchScore > 0 && (
            <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400">
              {matchScore}% match
            </span>
          )}
          {showFavorite && (
            <FavoriteButton
              slug={slug}
              initialFavorited={isFavorited ?? false}
              isSignedIn={isSignedIn ?? false}
              variant="icon"
              className="-mr-1 -mt-1 flex min-h-11 min-w-11 items-center justify-center"
            />
          )}
        </div>
      </div>

      {primaryUse && (
        <p className="mb-3 text-sm leading-relaxed text-gray-300">
          {primaryUse}
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        <Tooltip content={facts?.freeTier ? facts.freeTier.value.summary : COST_TIER_TOOLTIP[costTier] ?? ""}>
          <span
            className={cn(
              "relative z-10 rounded-md border px-2 py-0.5 text-xs font-medium",
              tierColors[costTier] || tierColors.FREEMIUM,
            )}
          >
            {facts?.freeTier ? (facts.freeTier.value.available ? "Free plan" : "No free plan") : COST_TIER_LABEL[costTier] ?? costTier}
          </span>
        </Tooltip>
        <span className={cn("text-xs", diffColors[difficultyLevel] || "text-gray-400")}>
          {DIFFICULTY_LABEL[difficultyLevel] ?? difficultyLevel}
        </span>
        {aboveDifficulty && (
          <span
            className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400"
            title="Above the difficulty level you selected in the quiz"
          >
            Advanced
          </span>
        )}
        {hasMobileApp && (
          <span
            className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400"
            title="Native iOS and/or Android app"
          >
            <Smartphone className="h-3 w-3" />
            App
          </span>
        )}
        {!hasMobileApp && mobileWebFriendly && (
          <span
            className="inline-flex items-center gap-1 rounded-md border border-gray-600 bg-gray-800/60 px-2 py-0.5 text-xs font-medium text-gray-300"
            title="Works in mobile browsers"
          >
            <Globe className="h-3 w-3" />
            Web
          </span>
        )}
      </div>
      <p className="mb-5 text-xs leading-relaxed text-gray-300"><span className="rounded-full bg-white/5 px-2.5 py-1">Good for {categoryLabel[category.slug] ?? category.name}</span></p>
      <div className="mt-auto border-t border-gray-700/60 pt-4">
        {freeDetails?.trim() && <>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Free-plan details</p>
          <p className="text-sm leading-relaxed text-gray-300">{freeDetails.replace(/^\s*free\s*:\s*/i, "")}</p>
        </>}
        {price && <p className="mt-2 text-xs text-gray-300">Paid options: {price}</p>}
        {source && <OutboundLink href={source.sourceUrl} platform={slug} surface="discover_card_source" eventName="source_clickout" target="_blank" rel="noopener noreferrer" className="relative z-10 mt-2 inline-flex min-h-8 items-center text-xs text-gray-400 underline decoration-gray-600 underline-offset-4 hover:text-white">Source · checked {source.checkedAt}{source.status !== "verified" ? ` · ${source.status}` : ""} ↗</OutboundLink>}
        {pricingSource && <OutboundLink href={pricingSource.sourceUrl} platform={slug} surface="discover_card_pricing_source" eventName="source_clickout" target="_blank" rel="noopener noreferrer" className="relative z-10 mt-2 flex min-h-8 items-center text-xs text-gray-400 underline decoration-gray-600 underline-offset-4 hover:text-white">Pricing source · checked {pricingSource.checkedAt}{pricingSource.status !== "verified" ? ` · ${pricingSource.status}` : ""} ↗</OutboundLink>}
        <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-400">Meet the tool <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </div>
    </article>
  );
}
