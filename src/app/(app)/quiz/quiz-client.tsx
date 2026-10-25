"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { track } from "@vercel/analytics";
import { Loader2 } from "lucide-react";
import {
  QUIZ_MAX_GOALS,
  QUIZ_QUESTION_COUNT,
  type QuizAnswers,
} from "@/lib/quiz-map";
import {
  QUIZ_BUDGET_OPTIONS,
  QUIZ_EXPERIENCE_OPTIONS,
  QUIZ_GOAL_OPTIONS,
  QUIZ_RUNTIME_OPTIONS,
  quizQuestion,
} from "@/lib/quiz-options";

const GOALS = QUIZ_GOAL_OPTIONS;
const EXP = QUIZ_EXPERIENCE_OPTIONS;
const BUDGET = QUIZ_BUDGET_OPTIONS;
const RUNTIME = QUIZ_RUNTIME_OPTIONS;

function optionClass(selected: boolean) {
  return `rounded-lg border px-4 py-3 text-left text-sm ${
    selected
      ? "border-orange-500 bg-orange-500/10 text-white"
      : "border-gray-700 bg-gray-900 text-white hover:border-orange-500/50"
  }`;
}

export function QuizClient() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<string | undefined>();
  const [budget, setBudget] = useState<string | undefined>();
  const [runtime, setRuntime] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goalLimitNotice, setGoalLimitNotice] = useState(false);

  function buildAnswers(): QuizAnswers {
    return {
      goal: selectedGoals[0] || "content_creation",
      goals: selectedGoals.slice(0, QUIZ_MAX_GOALS),
      experience: experience || "beginner",
      budget: budget || "free",
      runtime: runtime || "cloud",
    };
  }

  async function finish() {
    setSaving(true);
    setError(null);
    const full = buildAnswers();
    try {
      if (isSignedIn) {
        const res = await fetch("/api/user/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: full }),
        });
        if (!res.ok) throw new Error("Could not save quiz");
        track("quiz_completed", { signed_in: true });
        router.push("/for-you");
      } else {
        sessionStorage.setItem("launchpad_quiz_pending", JSON.stringify(full));
        track("quiz_completed", { signed_in: false });
        router.push("/quiz/results");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  function toggleGoal(id: string) {
    setSelectedGoals((current) => {
      if (current.includes(id)) {
        setGoalLimitNotice(false);
        return current.filter((g) => g !== id);
      }
      if (current.length >= QUIZ_MAX_GOALS) {
        setGoalLimitNotice(true);
        return current;
      }
      setGoalLimitNotice(false);
      return [...current, id];
    });
  }

  const canNext =
    (step === 0 && selectedGoals.length > 0) ||
    (step === 1 && !!experience) ||
    (step === 2 && !!budget) ||
    (step === 3 && !!runtime);

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <p className="text-center text-sm font-medium text-orange-400">Get matched</p>
      <h1 className="mt-2 text-center text-3xl font-bold text-white">
        {QUIZ_QUESTION_COUNT} quick questions
      </h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Question {step + 1} of {QUIZ_QUESTION_COUNT}
        {!isSignedIn && " — no sign-in required"}
      </p>

      <div
        className="mt-6 h-2 overflow-hidden rounded-full bg-gray-800"
        role="progressbar"
        aria-label={`Question ${step + 1} of ${QUIZ_QUESTION_COUNT}`}
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={QUIZ_QUESTION_COUNT}
      >
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{ width: `${((step + 1) / QUIZ_QUESTION_COUNT) * 100}%` }}
        />
      </div>

      <div className="mt-10 space-y-4">
        {step === 0 && (
          <>
            <p className="text-sm font-medium text-gray-300">
              {quizQuestion("goals").prompt}
            </p>
            <p className="text-xs text-gray-500">{quizQuestion("goals").hint}</p>
            {goalLimitNotice && (
              <p role="status" className="text-sm text-orange-400">
                Pick up to 2 goals
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={selectedGoals.includes(g.id)}
                  onClick={() => toggleGoal(g.id)}
                  className={optionClass(selectedGoals.includes(g.id))}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-sm font-medium text-gray-300">
              {quizQuestion("experience").prompt}
            </p>
            <div className="grid gap-2">
              {EXP.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={experience === g.id}
                  onClick={() => setExperience(g.id)}
                  className={optionClass(experience === g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm font-medium text-gray-300">
              {quizQuestion("budget").prompt}
            </p>
            <div className="grid gap-2">
              {BUDGET.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={budget === g.id}
                  onClick={() => setBudget(g.id)}
                  className={optionClass(budget === g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm font-medium text-gray-300">
              {quizQuestion("runtime").prompt}
            </p>
            <p className="text-xs text-gray-500">{quizQuestion("runtime").hint}</p>
            <div className="mt-2 grid gap-2">
              {RUNTIME.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={runtime === g.id}
                  onClick={() => setRuntime(g.id)}
                  className={optionClass(runtime === g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
            {saving && <p className="text-xs text-gray-500">Saving…</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}
          </>
        )}

        <div className="flex items-center justify-between pt-4">
          {step > 0 ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => setStep((s) => s - 1)}
              className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-200 hover:border-gray-500 hover:text-white disabled:opacity-40"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {step < QUIZ_QUESTION_COUNT - 1 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              disabled={!canNext || saving}
              onClick={() => void finish()}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40"
            >
              See matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
