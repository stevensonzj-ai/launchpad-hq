"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { PlatformCard } from "@/components/platforms/platform-card";
import type { QuizAnswers } from "@/lib/quiz-map";
import { quizToRecommendationInput } from "@/lib/quiz-map";

type Rec = {
  id: string;
  slug: string;
  name: string;
  company: string | null;
  primaryUse: string | null;
  costTier: string;
  difficultyLevel: string;
  category: { name: string; slug: string };
  freeTierFeatures: string | null;
  matchScore: number;
  hasMobileApp: boolean;
  mobileWebFriendly: boolean;
};

export function ForYouContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizAnswers | null>(null);
  const [recs, setRecs] = useState<Rec[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    async function run() {
      setLoading(true);
      setError(null);
      let answers: QuizAnswers | null = null;

      if (isSignedIn) {
        try {
          const res = await fetch("/api/user/quiz");
          if (res.ok) {
            const data = await res.json();
            if (data.quizAnswers && typeof data.quizAnswers === "object") {
              answers = data.quizAnswers as QuizAnswers;
            }
          }
        } catch {
          /* ignore */
        }
      }

      if (!answers && typeof window !== "undefined") {
        const raw = sessionStorage.getItem("launchpad_quiz_pending");
        if (raw) {
          try {
            answers = JSON.parse(raw) as QuizAnswers;
          } catch {
            /* ignore */
          }
        }
      }

      if (!answers) {
        setQuiz(null);
        setRecs([]);
        setLoading(false);
        return;
      }

      setQuiz(answers);

      try {
        const input = quizToRecommendationInput(answers);
        const res = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            goals: input.goals,
            budget: input.budget,
            experienceLevel: input.experienceLevel,
            priorities: input.priorities,
          }),
        });
        if (!res.ok) throw new Error("Recommendations failed");
        const data = await res.json();
        setRecs(data.recommendations || []);
        if (isSignedIn && typeof window !== "undefined") {
          sessionStorage.removeItem("launchpad_quiz_pending");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">For you</h1>
        <p className="mt-4 text-gray-400">
          Take the short quiz so we can personalize picks. Sign in to save answers to your profile.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Start quiz
        </Link>
        {!isSignedIn && (
          <p className="mt-6 text-sm text-gray-500">
            <Link href="/sign-in" className="text-orange-400 hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">For you</h1>
      <p className="mt-2 text-gray-400">Based on your quiz answers.</p>
      {quiz.tasks && (
        <p className="mt-2 text-sm text-gray-500">
          Tasks: <span className="text-gray-300">{quiz.tasks}</span>
        </p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recs.map((p) => (
          <PlatformCard
            key={p.id}
            slug={p.slug}
            name={p.name}
            company={p.company}
            primaryUse={p.primaryUse}
            costTier={p.costTier}
            difficultyLevel={p.difficultyLevel}
            category={p.category}
            freeTierFeatures={p.freeTierFeatures}
            matchScore={p.matchScore}
            hasMobileApp={p.hasMobileApp}
            mobileWebFriendly={p.mobileWebFriendly}
          />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        <Link href="/quiz" className="text-orange-400 hover:underline">
          Retake quiz
        </Link>{" "}
        ·{" "}
        <Link href="/discover" className="hover:text-white">
          Browse all tools
        </Link>
      </p>
    </div>
  );
}
