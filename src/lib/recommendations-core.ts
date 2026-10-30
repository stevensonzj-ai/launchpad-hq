import { prismaRead as prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { recommendablePlatformWhere } from "@/lib/catalog-visibility";
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

// Keyed by the cost tiers only: the candidate pool is the same public rows
// for every quiz taker. Scoring against the answers happens after, uncached.
const readCandidates = cachedCatalogRead(
  "recommendation-candidates",
  (costFilter: ReturnType<typeof costTiersForBudget>) =>
    prisma.platform.findMany({
      where: {
        ...recommendablePlatformWhere(),
        costTier: { in: costFilter },
      },
      include: { category: true },
    }),
);

export async function computeRecommendations(body: RecommendationInput) {
  const costFilter = costTiersForBudget(body.budget);

  const candidates = await readCandidates(costFilter);

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
