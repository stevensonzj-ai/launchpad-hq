"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import type { QuizAnswers } from "@/lib/quiz-map";
import { quizToRecommendationInput } from "@/lib/quiz-map";
import { PlatformCard } from "@/components/platforms/platform-card";

const STASH_KEY = "launchpad_quiz_pending";

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
  hasMobileApp?: boolean;
  mobileWebFriendly?: boolean;
  matchScore: number;
};

type SaveState = "idle" | "saving" | "saved" | "error";

function isValidAnswers(value: unknown): value is QuizAnswers {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.goal === "string" && v.goal.length > 0 &&
    typeof v.experience === "string" && v.experience.length > 0 &&
    typeof v.budget === "string" && v.budget.length > 0 &&
    typeof v.runtime === "string" && v.runtime.length > 0
  );
}

export function ResultsClient() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  // `undefined` while we read sessionStorage on mount; then QuizAnswers or `null`.
  const [stash, setStash] = useState<QuizAnswers | null | undefined>(undefined);
  const [recs, setRecs] = useState<Rec[] | null>(null);
  const [recsError, setRecsError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveAttempted = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STASH_KEY);
      if (!raw) {
        setStash(null);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      setStash(isValidAnswers(parsed) ? parsed : null);
    } catch {
      setStash(null);
    }
  }, []);

  useEffect(() => {
    if (stash === undefined || stash === null) return;
    let cancelled = false;
    (async () => {
      try {
        const input = quizToRecommendationInput(stash);
        const res = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setRecs(data.recommendations ?? []);
      } catch (e) {
        if (!cancelled) setRecsError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stash]);

  // Post-auth save handoff: when an authenticated user lands here with a
  // stash (returning from sign-in/up), persist the answers, clear the stash,
  // and redirect. One-shot via ref so the effect can't fire twice.
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (stash === undefined) return;
    if (saveAttempted.current) return;
    if (stash === null) {
      router.replace("/for-you");
      return;
    }
    saveAttempted.current = true;
    void runSave(stash);
    // runSave is stable within this component's render scope; depending on it
    // would re-fire the effect every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, stash, router]);

  async function runSave(answers: QuizAnswers) {
    setSaveState("saving");
    setSaveError(null);
    try {
      const res = await fetch("/api/user/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Only clear after a confirmed save — failure must keep the stash.
      sessionStorage.removeItem(STASH_KEY);
      setSaveState("saved");
      router.replace("/for-you");
    } catch (e) {
      setSaveState("error");
      setSaveError(e instanceof Error ? e.message : "Save failed");
    }
  }

  function retrySave() {
    if (!stash) return;
    void runSave(stash);
  }

  if (!isLoaded || stash === undefined) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  if (stash === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Your matches</h1>
        <p className="mt-4 text-gray-400">
          We don&apos;t have your quiz answers yet. Take the quiz to see your personalized matches.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Start the quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">Your matches</h1>
      <p className="mt-2 text-gray-400">Based on the quiz you just took.</p>

      {saveState === "saving" && (
        <p className="mt-4 text-sm text-gray-500">Saving your answers…</p>
      )}
      {saveState === "error" && saveError && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <span className="flex-1">
            We couldn&apos;t save your answers ({saveError}). Your quiz is still here — try again.
          </span>
          <button
            type="button"
            onClick={retrySave}
            className="rounded bg-red-500/20 px-3 py-1 text-xs font-medium text-red-100 hover:bg-red-500/30"
          >
            Retry save
          </button>
        </div>
      )}

      <section className="mt-8">
        {recsError ? (
          <p className="text-sm text-red-400">Couldn&apos;t load matches: {recsError}.</p>
        ) : recs === null ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : recs.length === 0 ? (
          <p className="text-gray-400">
            No platforms matched your filters.{" "}
            <Link href="/quiz" className="text-orange-400 hover:underline">
              Retake the quiz
            </Link>{" "}
            with broader answers.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                hasMobileApp={p.hasMobileApp}
                mobileWebFriendly={p.mobileWebFriendly}
                matchScore={p.matchScore}
              />
            ))}
          </div>
        )}
      </section>

      {!isSignedIn && (
        <section className="mt-12 rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 text-center">
          <h2 className="text-xl font-semibold text-white">
            Create a free account to save these
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign up so we can save your matches to your For You page and remember your preferences next time.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/sign-up?redirect_url=/quiz/results"
              className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Create a free account to save these
            </Link>
            <Link
              href="/sign-in?redirect_url=/quiz/results"
              className="inline-block rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 font-semibold text-gray-300 hover:border-gray-600 hover:text-white"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </section>
      )}

      <p className="mt-12 text-center text-sm">
        <Link href="/quiz" className="text-gray-400 hover:text-white">
          Retake the quiz
        </Link>
        <span className="mx-2 text-gray-600">·</span>
        <Link href="/discover" className="text-gray-400 hover:text-white">
          Browse all tools
        </Link>
      </p>
    </div>
  );
}
