import { NextRequest, NextResponse } from "next/server";
import { computeRecommendations } from "@/lib/recommendations-core";
import { apiError, methodsNotAllowed, withApiErrors } from "@/lib/api-error";

/**
 * Recommendation engine — returns personalized platform suggestions
 * based on user preferences from onboarding survey or quiz.
 *
 * POST body: { goals, budget, experienceLevel, priorities }
 * Each recommendation includes matchReasons chips derived from score parts.
 */
export function POST(request: NextRequest) {
  return withApiErrors("api/recommendations", async () => {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return apiError("bad_request", { message: "Send a JSON object body: { goals, budget, experienceLevel, priorities }." });
    }
    const { goals, budget, experienceLevel, priorities } = body;

    const result = await computeRecommendations({
      goals: goals || [],
      budget,
      experienceLevel,
      priorities: priorities || [],
    });

    return NextResponse.json(result);
  });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
