import Link from "next/link";
import { ArrowRight, Globe, Smartphone } from "lucide-react";
import { OutboundLink } from "@/components/analytics/outbound-link";
import { PlatformLogo } from "@/components/platforms/platform-logo";
import type { ToolFacts } from "@/data/facts/types";
import { paidStartingPrice } from "@/lib/platform-display";
import { costBadge } from "@/lib/public-data/pricing";
import { cn } from "@/lib/utils";
import { COST_TIER_TOOLTIP, DIFFICULTY_LABEL } from "@/lib/labels";
import { FavoriteButton } from "@/components/platforms/favorite-button";
import type { MatchReason } from "@/lib/recommendations-score";
import { Tooltip } from "@/components/ui/tooltip";

interface PlatformCardProps {
  facts?: Pick<ToolFacts, "freeTier" | "plans"> & Partial<Pick<ToolFacts, "lifecycle">>;
  slug: string;
  name: string;
  logoUrl?: string | null;
  company: string | null;
  primaryUse: string | null;
  costTier: string;
  difficultyLevel: string;
  category: { name: string; slug: string };
  freeTierFeatures: string | null;
  /** True when the platform sits above the user's selected difficulty. */
  aboveDifficulty?: boolean;
  hasMobileApp?: boolean;
  mobileWebFriendly?: boolean;
  isFavorited?: boolean;
  isSignedIn?: boolean;
  /**
   * "compact" is Discover's grid card: logo, name, maker, a two-line
   * description, cost and difficulty pills, and the date its facts were
   * checked. The default card serves For You, quiz results and tool pages.
   */
  variant?: "default" | "compact";
  /**
   * Default variant only (quiz results, For You). A one-line reason shown
   * under the description, match-reason chips and extra links (guide,
   * workflow) shown in the footer. The compact variant ignores them.
   */
  why?: string | null;
  matchReasons?: MatchReason[];
  extraLinks?: { href: string; label: string }[];
  /** Default variant only: extra classes on the <article> (e.g. a column span). */
  className?: string;
}

/**
 * Match reasons the card does not show as chips: every result matches a
 * goal, and the cost and difficulty pills already say free and beginner.
 * The API still returns them. Mobile, browser and offline chips still show.
 */
const HIDDEN_CARD_REASONS: ReadonlySet<MatchReason> = new Set<MatchReason>(["Matches goal", "Beginner-friendly", "Free tier"]);

export function visibleMatchReasons(reasons: readonly MatchReason[] | undefined): MatchReason[] {
  return (reasons ?? []).filter((r) => !HIDDEN_CARD_REASONS.has(r));
}

const tierColors: Record<string, string> = {
  FREE: "bg-green-500/10 text-green-400 border-green-500/20",
  FREEMIUM: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PAID: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  ENTERPRISE: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  // Same treatment as the page's discontinued notice.
  DISCONTINUED: "bg-amber-500/10 text-amber-100 border-amber-500/40",
};

// Difficulty as a pill matching the cost badge (both variants).
const diffPillColors: Record<string, string> = {
  BEGINNER: "bg-green-500/10 text-green-400 border-green-500/20",
  INTERMEDIATE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ADVANCED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  EXPERT: "bg-red-500/10 text-red-400 border-red-500/20",
};

const pillClass = "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium leading-5";

/** The oldest checkedAt among the card's facts, so the date never overstates freshness. */
export function compactCheckedDate(
  facts: PlatformCardProps["facts"],
): string | undefined {
  if (!facts || facts.lifecycle === "discontinued") return undefined;
  const dates = [facts.freeTier?.checkedAt, facts.plans?.checkedAt].filter((d): d is string => Boolean(d));
  return dates.sort()[0];
}

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
  aboveDifficulty,
  hasMobileApp,
  mobileWebFriendly,
  isFavorited,
  isSignedIn,
  variant = "default",
  why,
  matchReasons,
  extraLinks,
  className,
}: PlatformCardProps) {
  const showFavorite = isSignedIn !== undefined;
  const badge = costBadge(costTier, facts);
  const shownReasons = visibleMatchReasons(matchReasons);
  if (variant === "compact") {
    const checked = compactCheckedDate(facts);
    return (
      <article className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-gray-700/70 bg-gradient-to-br from-gray-900/80 to-gray-900/30 p-4 transition-colors hover:border-gray-500 hover:bg-gray-900">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <PlatformLogo slug={slug} name={name} logoUrl={logoUrl} />
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-snug text-white group-hover:text-orange-300">
                <Link href={`/platform/${slug}`} className="after:absolute after:inset-0 after:rounded-2xl">{name}</Link>
              </h3>
              {company && <p className="mt-0.5 text-xs text-gray-300">by {company}</p>}
            </div>
          </div>
          {showFavorite && (
            <div className="relative z-10 shrink-0">
              <FavoriteButton
                slug={slug}
                initialFavorited={isFavorited ?? false}
                isSignedIn={isSignedIn ?? false}
                variant="icon"
                className="-mr-1 -mt-1 flex min-h-11 min-w-11 items-center justify-center"
              />
            </div>
          )}
        </div>
        {primaryUse && <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-300">{primaryUse}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {/* Block-level `flex` inside the tooltip's wrapper spans, so no line box
              offsets the badge from its neighbours. */}
          <Tooltip className="relative z-10" content={badge.tone === "DISCONTINUED" ? (badge.tooltip ?? "") : (COST_TIER_TOOLTIP[costTier] ?? "")}>
            <span className={cn(pillClass, "flex", tierColors[badge.tone] || tierColors.FREEMIUM)}>{badge.label}</span>
          </Tooltip>
          <span className={cn(pillClass, diffPillColors[difficultyLevel] || "border-gray-600 bg-gray-800/60 text-gray-300")}>
            {DIFFICULTY_LABEL[difficultyLevel] ?? difficultyLevel}
          </span>
          {checked && <span className="ml-auto text-xs text-gray-400">checked {checked}</span>}
        </div>
      </article>
    );
  }
  // A discontinued tool shows no free-plan details or prices (same as its page).
  const retired = facts?.lifecycle === "discontinued";
  const freeDetails = retired ? null : (facts?.freeTier?.value.summary ?? freeTierFeatures);
  const source = retired ? undefined : facts?.freeTier;
  const price = !retired && facts?.plans ? paidStartingPrice(facts.plans.value) : undefined;
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
    "career-job-search": "resumes & job search",
  };

  return (
    <article className={cn("group relative flex min-w-0 flex-col rounded-2xl border border-gray-700/70 bg-gradient-to-br from-gray-900/80 to-gray-900/30 p-5 transition-colors hover:border-gray-500 hover:bg-gray-900", className)}>
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
      {why && <p className="mb-3 text-sm text-gray-300">{why}</p>}

      {/* Every badge uses the shared pill class and the row centres them.
          The cost badge is block-level `flex` inside the tooltip's wrapper
          spans, so no line box offsets it from its neighbours. */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Tooltip className="relative z-10" content={badge.tooltip ?? COST_TIER_TOOLTIP[costTier] ?? ""}>
          <span className={cn(pillClass, "flex", tierColors[badge.tone] || tierColors.FREEMIUM)}>
            {badge.label}
          </span>
        </Tooltip>
        <span className={cn(pillClass, diffPillColors[difficultyLevel] || "border-gray-600 bg-gray-800/60 text-gray-300")}>
          {DIFFICULTY_LABEL[difficultyLevel] ?? difficultyLevel}
        </span>
        {aboveDifficulty && (
          <span
            className={cn(pillClass, "border-amber-500/30 bg-amber-500/10 text-amber-400")}
            title="Above the difficulty level you selected in the quiz"
          >
            Advanced
          </span>
        )}
        {hasMobileApp && (
          <span
            className={cn(pillClass, "gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-400")}
            title="Native iOS and/or Android app"
          >
            <Smartphone className="h-3 w-3" />
            App
          </span>
        )}
        {!hasMobileApp && mobileWebFriendly && (
          <span
            className={cn(pillClass, "gap-1 border-gray-600 bg-gray-800/60 text-gray-300")}
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
        {shownReasons.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {shownReasons.map((reason) => (
              <span key={reason} className="rounded-full border border-gray-700 bg-gray-900 px-2 py-0.5 text-[11px] text-gray-300">
                {reason}
              </span>
            ))}
          </div>
        )}
        {extraLinks && extraLinks.length > 0 && (
          // relative z-10 lifts each link above the title link's full-card overlay.
          <p className="mt-2 text-xs text-gray-500">
            {extraLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 && <span className="mx-1.5 text-gray-600" aria-hidden="true">·</span>}
                <Link href={link.href} className="relative z-10 text-orange-400 hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        )}
        <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-400">Meet the tool <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
      </div>
    </article>
  );
}
