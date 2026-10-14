import type { CostTier, Difficulty } from "@prisma/client";

export const goalKeywords: Record<string, string[]> = {
  content_creation: [
    "writing",
    "content",
    "blog",
    "copy",
    "marketing",
    "social",
  ],
  coding: ["code", "development", "programming", "debug", "ide", "developer"],
  research: [
    "research",
    "academic",
    "analysis",
    "papers",
    "citations",
    "data",
  ],
  image_generation: ["image", "art", "design", "visual", "illustration"],
  video: ["video", "animation", "editing", "film", "clip"],
  audio: ["audio", "music", "voice", "speech", "podcast", "sound"],
  automation: [
    "automation",
    "workflow",
    "integrate",
    "automate",
    "zapier",
    "no-code",
  ],
  business: [
    "business",
    "enterprise",
    "crm",
    "sales",
    "productivity",
    "project",
  ],
  education: ["learn", "tutor", "education", "study", "course"],
  data_analysis: [
    "data",
    "analytics",
    "spreadsheet",
    "visualization",
    "dashboard",
  ],
};

export type RecommendationInput = {
  goals: string[];
  budget?: string;
  experienceLevel?: string;
  priorities?: string[];
};

export type MatchReason =
  | "Matches goal"
  | "Free tier"
  | "Beginner-friendly"
  | "Works on mobile"
  | "Works in the browser"
  | "Runs offline";

function hasListedFreeTier(platform: ScoreablePlatform): boolean {
  return platform.costTier === "FREE" || platform.costTier === "FREEMIUM";
}

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
  EXPERT: 3,
};

const MAX_COMFORTABLE_RANK: Record<string, number> = {
  beginner: DIFFICULTY_RANK.BEGINNER,
  intermediate: DIFFICULTY_RANK.INTERMEDIATE,
  advanced: DIFFICULTY_RANK.EXPERT,
};

const ABOVE_DIFFICULTY_PENALTY = 0.65;

export type ScoreablePlatform = {
  costTier: CostTier;
  difficultyLevel: Difficulty;
  privacyLevel: string;
  apiAvailable: boolean;
  offlineCapable: boolean;
  featured: boolean;
  freeTierFeatures: string | null;
  hasMobileApp: boolean;
  mobileWebFriendly: boolean;
  primaryUseCases: string | null;
  primaryUse: string | null;
};

/**
 * Inclusive budget filters. `costTier` cannot distinguish a $10 PAID tool
 * from a $90 PAID tool.
 *
 * - free: FREE + FREEMIUM
 * - under_20 / under_50: FREE + FREEMIUM + PAID
 * - enterprise: all four tiers
 */
export function costTiersForBudget(budget?: string): CostTier[] {
  if (budget === "free") return ["FREE", "FREEMIUM"];
  if (budget === "under_20" || budget === "under_50") {
    return ["FREE", "FREEMIUM", "PAID"];
  }
  if (budget === "enterprise") {
    return ["FREE", "FREEMIUM", "PAID", "ENTERPRISE"];
  }
  return ["FREE", "FREEMIUM", "PAID"];
}

export function scorePlatform(
  platform: ScoreablePlatform,
  body: RecommendationInput,
): {
  score: number;
  goalScore: number;
  aboveDifficulty: boolean;
  matchReasons: MatchReason[];
} {
  const { goals, budget, experienceLevel, priorities } = body;
  let score = 0;
  let goalScore = 0;
  const matchReasons: MatchReason[] = [];

  const maxComfortableRank =
    MAX_COMFORTABLE_RANK[experienceLevel || "beginner"] ??
    DIFFICULTY_RANK.INTERMEDIATE;
  const aboveDifficulty =
    DIFFICULTY_RANK[platform.difficultyLevel] > maxComfortableRank;

  const useCases = (platform.primaryUseCases || "").toLowerCase();
  const useDesc = (platform.primaryUse || "").toLowerCase();
  for (const goal of goals || []) {
    const keywords = goalKeywords[goal] || [];
    for (const kw of keywords) {
      if (useCases.includes(kw) || useDesc.includes(kw)) {
        score += 10;
        goalScore += 10;
      }
    }
  }
  if (goalScore > 0) matchReasons.push("Matches goal");

  for (const p of priorities || []) {
    if (p === "ease_of_use" && platform.difficultyLevel === "BEGINNER") {
      score += 8;
      if (!matchReasons.includes("Beginner-friendly")) {
        matchReasons.push("Beginner-friendly");
      }
    }
    if (p === "privacy" && platform.privacyLevel === "HIGH") score += 8;
    if (p === "privacy" && platform.privacyLevel === "MAXIMUM") score += 12;
    if (p === "integrations" && platform.apiAvailable) score += 5;
    if (p === "offline" && platform.offlineCapable) {
      score += 8;
      if (!matchReasons.includes("Runs offline")) {
        matchReasons.push("Runs offline");
      }
    }
    if (p === "free" && platform.costTier === "FREE") {
      score += 10;
      if (hasListedFreeTier(platform) && !matchReasons.includes("Free tier")) {
        matchReasons.push("Free tier");
      }
    }
    if (p === "mobile") {
      if (platform.hasMobileApp) {
        score += 8;
        if (!matchReasons.includes("Works on mobile")) {
          matchReasons.push("Works on mobile");
        }
      }
      if (platform.mobileWebFriendly) {
        score += 4;
        if (!matchReasons.includes("Works on mobile")) {
          matchReasons.push("Works on mobile");
        }
      }
    }
    if (p === "browser" && platform.mobileWebFriendly) {
      score += 8;
      if (!matchReasons.includes("Works in the browser")) {
        matchReasons.push("Works in the browser");
      }
    }
  }

  // Editorial featured boost only — not a sponsor flag.
  if (platform.featured) score += 5;

  if (
    (budget === "free" || budget === "under_20") &&
    platform.freeTierFeatures
  ) {
    score += 5;
    if (hasListedFreeTier(platform) && !matchReasons.includes("Free tier")) {
      matchReasons.push("Free tier");
    }
  }

  if (aboveDifficulty) score = Math.round(score * ABOVE_DIFFICULTY_PENALTY);

  return { score, goalScore, aboveDifficulty, matchReasons };
}

export function rankScoredPlatforms<T extends ScoreablePlatform>(
  platforms: T[],
  body: RecommendationInput,
) {
  const scored = platforms.map((platform) => {
    const parts = scorePlatform(platform, body);
    return { platform, ...parts };
  });

  scored.sort((a, b) => b.score - a.score);

  const relevant = scored.filter((s) => s.goalScore > 0);
  return relevant.slice(0, 12).map((s) => ({
    ...s.platform,
    matchScore: s.score,
    aboveDifficulty: s.aboveDifficulty,
    matchReasons: s.matchReasons,
  }));
}
