import Link from "next/link";
import { Globe, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { displayCategoryName } from "@/lib/categories";
import { COST_TIER_LABEL, DIFFICULTY_LABEL } from "@/lib/labels";
import { FavoriteButton } from "@/components/platforms/favorite-button";

interface PlatformCardProps {
  slug: string;
  name: string;
  company: string | null;
  primaryUse: string | null;
  costTier: string;
  difficultyLevel: string;
  category: { name: string; slug: string };
  freeTierFeatures: string | null;
  matchScore?: number;
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
  slug,
  name,
  company,
  primaryUse,
  costTier,
  difficultyLevel,
  category,
  freeTierFeatures,
  matchScore,
  hasMobileApp,
  mobileWebFriendly,
  isFavorited,
  isSignedIn,
}: PlatformCardProps) {
  const showFavorite = isSignedIn !== undefined;

  return (
    <Link
      href={`/platform/${slug}`}
      className="group block rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-gray-700 hover:bg-gray-900"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400">
            {name}
          </h3>
          {company && (
            <p className="text-sm text-gray-500">by {company}</p>
          )}
        </div>
        <div className="flex shrink-0 items-start gap-2">
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
              className="-mr-1 -mt-1"
            />
          )}
        </div>
      </div>

      {primaryUse && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-400">
          {primaryUse}
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 text-xs font-medium",
            tierColors[costTier] || tierColors.FREEMIUM,
          )}
        >
          {COST_TIER_LABEL[costTier] ?? costTier}
        </span>
        <span className={cn("text-xs", diffColors[difficultyLevel] || "text-gray-400")}>
          {DIFFICULTY_LABEL[difficultyLevel] ?? difficultyLevel}
        </span>
        <span className="text-xs text-gray-600">{displayCategoryName(category.name)}</span>
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
            className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400"
            title="Works in mobile browsers"
          >
            <Globe className="h-3 w-3" />
            Web
          </span>
        )}
      </div>

      {freeTierFeatures && (
        <p className="line-clamp-1 text-xs text-gray-500">
          Free: {freeTierFeatures.replace(/^\s*free\s*:\s*/i, "")}
        </p>
      )}
    </Link>
  );
}
