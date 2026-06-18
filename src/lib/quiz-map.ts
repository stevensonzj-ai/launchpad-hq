import type { RecommendationInput } from "./recommendations-core";

/**
 * Quiz answers stored as JSON in `UserPreferences.quizAnswers`.
 *
 * Legacy rows may still contain a `tasks` string from the pre-2026-06 quiz —
 * it was never read by `quizToRecommendationInput` so the unknown field is
 * silently ignored when those rows are deserialized.
 */
export type QuizAnswers = {
  goal: string;
  experience: string;
  budget: string;
  runtime: string;
};

export function quizToRecommendationInput(answers: QuizAnswers): RecommendationInput {
  const priorities: string[] = ["ease_of_use"];
  if (answers.runtime === "local") priorities.push("offline");
  if (answers.budget === "free") priorities.push("free");

  return {
    goals: [answers.goal || "content_creation"],
    budget: answers.budget || "free",
    experienceLevel: answers.experience || "beginner",
    priorities,
  };
}
