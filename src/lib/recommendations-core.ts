import { prisma } from "@/lib/db";
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

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
  EXPERT: 3,
};

// Highest difficulty rank that scores without a penalty for each experience
// level. Tools above this rank are still included — ranked lower and badged
// "Advanced" — instead of being excluded outright, so a narrow goal with only
// advanced tooling still returns results.
const MAX_COMFORTABLE_RANK: Record<string, number> = {
  beginner: DIFFICULTY_RANK.BEGINNER,
  intermediate: DIFFICULTY_RANK.INTERMEDIATE,
  advanced: DIFFICULTY_RANK.EXPERT,
};

/** Multiplier applied to a tool's score when it's above the user's level. */
const ABOVE_DIFFICULTY_PENALTY = 0.65;

export async function computeRecommendations(body: RecommendationInput) {
  const { goals, budget, experienceLevel, priorities } = body;

  const costFilter: CostTier[] = [];
  if (budget === "free") costFilter.push("FREE");
  if (budget === "free" || budget === "under_20") costFilter.push("FREEMIUM");
  if (budget === "under_50" || budget === "enterprise")
    costFilter.push("PAID", "ENTERPRISE");
  if (!costFilter.length) costFilter.push("FREE", "FREEMIUM", "PAID");

  // Unknown experience levels get the historical default (intermediate cap),
  // matching the old diffFilter fallback of ["BEGINNER", "INTERMEDIATE"].
  const maxComfortableRank =
    MAX_COMFORTABLE_RANK[experienceLevel || "beginner"] ??
    DIFFICULTY_RANK.INTERMEDIATE;

  const candidates = await prisma.platform.findMany({
    where: {
      costTier: { in: costFilter },
    },
    include: { category: true },
  });

  const scored = candidates.map((platform) => {
    let score = 0;
    let goalScore = 0;
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

    for (const p of priorities || []) {
      if (p === "ease_of_use" && platform.difficultyLevel === "BEGINNER")
        score += 8;
      if (p === "privacy" && platform.privacyLevel === "HIGH") score += 8;
      if (p === "privacy" && platform.privacyLevel === "MAXIMUM") score += 12;
      if (p === "integrations" && platform.apiAvailable) score += 5;
      if (p === "offline" && platform.offlineCapable) score += 8;
      if (p === "free" && platform.costTier === "FREE") score += 10;
    }

    if (platform.featured) score += 5;

    if (
      (budget === "free" || budget === "under_20") &&
      platform.freeTierFeatures
    ) {
      score += 5;
    }

    if (aboveDifficulty) score = Math.round(score * ABOVE_DIFFICULTY_PENALTY);

    return { platform, score, goalScore, aboveDifficulty };
  });

  scored.sort((a, b) => b.score - a.score);

  // Goal-relevance floor: only surface tools that matched at least one of the
  // selected goal's keywords. Goal-independent rewards (beginner +8, free +10,
  // free-tier +5) otherwise let an irrelevant FREE BEGINNER tool score ~23 and
  // ride along behind a single real match. Filtering on goalScore (the
  // keyword-only subtotal) before the slice keeps the list honest; the
  // difficulty penalty and "Advanced" badge still order/flag what remains.
  const relevant = scored.filter((s) => s.goalScore > 0);
  const recommendations = relevant.slice(0, 12).map((s) => ({
    ...s.platform,
    matchScore: s.score,
    aboveDifficulty: s.aboveDifficulty,
  }));

  const byCategory: Record<string, typeof recommendations> = {};
  for (const rec of recommendations) {
    const cat = rec.category.name;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(rec);
  }

  return {
    recommendations,
    byCategory,
    totalCandidates: candidates.length,
    totalScored: scored.length,
  };
}
