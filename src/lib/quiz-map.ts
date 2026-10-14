import type { RecommendationInput } from "./recommendations-score";

/**
 * Quiz answers stored as JSON in `UserPreferences.quizAnswers`.
 *
 * Legacy rows may still contain a `tasks` string from the pre-2026-06 quiz —
 * it was never read by `quizToRecommendationInput` so the unknown field is
 * silently ignored when those rows are deserialized.
 *
 * Legacy rows have a single `goal` string. Current quiz writes `goal` (first
 * pick) plus optional `goals` (up to two). Always keep `goal` populated.
 */
export type QuizAnswers = {
  goal: string;
  goals?: string[];
  experience: string;
  budget: string;
  runtime: string;
};

export const QUIZ_QUESTION_COUNT = 4;
export const QUIZ_MAX_GOALS = 2;

export function normalizeQuizGoals(answers: QuizAnswers): string[] {
  const fromArray = (answers.goals ?? []).filter(
    (g) => typeof g === "string" && g.length > 0,
  );
  if (fromArray.length > 0) return fromArray.slice(0, QUIZ_MAX_GOALS);
  return [answers.goal || "content_creation"];
}

export function quizToRecommendationInput(
  answers: QuizAnswers,
): RecommendationInput {
  const priorities: string[] = [];
  // ease_of_use is beginner-only — not a default for every user.
  if (answers.experience === "beginner") priorities.push("ease_of_use");
  if (answers.runtime === "local") priorities.push("offline");
  if (answers.runtime === "mobile") priorities.push("mobile");
  if (answers.runtime === "browser") priorities.push("browser");
  // runtime "cloud" is scoring-neutral (no extra priority).
  if (answers.budget === "free") priorities.push("free");

  return {
    goals: normalizeQuizGoals(answers),
    budget: answers.budget || "free",
    experienceLevel: answers.experience || "beginner",
    priorities,
  };
}
