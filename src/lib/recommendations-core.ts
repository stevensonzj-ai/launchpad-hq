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

export async function computeRecommendations(body: RecommendationInput) {
  const { goals, budget, experienceLevel, priorities } = body;

  const costFilter: CostTier[] = [];
  if (budget === "free") costFilter.push("FREE");
  if (budget === "free" || budget === "under_20") costFilter.push("FREEMIUM");
  if (budget === "under_50" || budget === "enterprise")
    costFilter.push("PAID", "ENTERPRISE");
  if (!costFilter.length) costFilter.push("FREE", "FREEMIUM", "PAID");

  const diffMap: Record<string, Difficulty[]> = {
    beginner: ["BEGINNER"],
    intermediate: ["BEGINNER", "INTERMEDIATE"],
    advanced: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"],
  };
  const diffFilter = diffMap[experienceLevel || "beginner"] || [
    "BEGINNER",
    "INTERMEDIATE",
  ];

  const candidates = await prisma.platform.findMany({
    where: {
      costTier: { in: costFilter },
      difficultyLevel: { in: diffFilter },
    },
    include: { category: true },
  });

  const scored = candidates.map((platform) => {
    let score = 0;

    const useCases = (platform.primaryUseCases || "").toLowerCase();
    const useDesc = (platform.primaryUse || "").toLowerCase();
    for (const goal of goals || []) {
      const keywords = goalKeywords[goal] || [];
      for (const kw of keywords) {
        if (useCases.includes(kw) || useDesc.includes(kw)) {
          score += 10;
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

    return { platform, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const recommendations = scored.slice(0, 12).map((s) => ({
    ...s.platform,
    matchScore: s.score,
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
