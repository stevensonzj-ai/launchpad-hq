import { NextRequest, NextResponse } from "next/server";
import { computeRecommendations } from "@/lib/recommendations-core";

/**
 * Recommendation engine — returns personalized platform suggestions
 * based on user preferences from onboarding survey or quiz.
 *
 * POST body: { goals, budget, experienceLevel, industries, priorities }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { goals, budget, experienceLevel, priorities } = body;

  const result = await computeRecommendations({
    goals: goals || [],
    budget,
    experienceLevel,
    priorities: priorities || [],
  });

  return NextResponse.json(result);
}
