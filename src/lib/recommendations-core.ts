import { prisma } from "@/lib/db";
import { listedPlatformWhere } from "@/lib/catalog-visibility";
import {
  costTiersForBudget,
  rankScoredPlatforms,
  type RecommendationInput,
} from "./recommendations-score";

export {
  costTiersForBudget,
  goalKeywords,
  rankScoredPlatforms,
  scorePlatform,
} from "./recommendations-score";
export type {
  MatchReason,
  RecommendationInput,
  ScoreablePlatform,
} from "./recommendations-score";

export async function computeRecommendations(body: RecommendationInput) {
  const costFilter = costTiersForBudget(body.budget);

  const candidates = await prisma.platform.findMany({
    where: {
      ...listedPlatformWhere(),
      costTier: { in: costFilter },
    },
    include: { category: true },
  });

  const recommendations = rankScoredPlatforms(candidates, body);

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
    totalScored: candidates.length,
  };
}
