/**
 * Quiz questions and options. Shared by the quiz UI and /data/v1/quiz.json
 * so the published options can never drift from the ones people click.
 * Pure data: no React, no Prisma.
 */

export type QuizOption = { id: string; label: string };

export type QuizQuestion = {
  id: "goals" | "experience" | "budget" | "runtime";
  prompt: string;
  hint?: string;
  options: readonly QuizOption[];
};

export const QUIZ_GOAL_OPTIONS = [
  { id: "content_creation", label: "Writing & content" },
  { id: "coding", label: "Coding & development" },
  { id: "research", label: "Research & analysis" },
  { id: "image_generation", label: "Images & design" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio & voice" },
  { id: "business", label: "Business & productivity" },
  { id: "automation", label: "Automation & workflows" },
  { id: "education", label: "Education & learning" },
  { id: "data_analysis", label: "Data & analytics" },
] as const;

export const QUIZ_EXPERIENCE_OPTIONS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
] as const;

export const QUIZ_BUDGET_OPTIONS = [
  { id: "free", label: "Free only" },
  { id: "under_20", label: "Under $20/mo" },
  { id: "under_50", label: "Under $50/mo" },
  { id: "enterprise", label: "Enterprise budget" },
] as const;

export const QUIZ_RUNTIME_OPTIONS = [
  { id: "cloud", label: "Cloud / SaaS" },
  { id: "browser", label: "Browser-first" },
  { id: "mobile", label: "Mobile apps" },
  { id: "local", label: "Local / self-hosted" },
] as const;

/** In the order the quiz asks them. */
export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "goals",
    prompt: "What do you want to accomplish?",
    hint: "Pick up to two.",
    options: QUIZ_GOAL_OPTIONS,
  },
  { id: "experience", prompt: "What's your experience level?", options: QUIZ_EXPERIENCE_OPTIONS },
  { id: "budget", prompt: "What's your monthly tool budget?", options: QUIZ_BUDGET_OPTIONS },
  {
    id: "runtime",
    prompt: "Where should AI tools run?",
    hint: "Local/self-hosted often means more setup but more control.",
    options: QUIZ_RUNTIME_OPTIONS,
  },
];

export function quizQuestion(id: QuizQuestion["id"]): QuizQuestion {
  const question = QUIZ_QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`unknown quiz question ${id}`);
  return question;
}
