"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import type { QuizAnswers } from "@/lib/quiz-map";

const GOALS = [
  { id: "content_creation", label: "Writing & content" },
  { id: "coding", label: "Coding & development" },
  { id: "research", label: "Research & analysis" },
  { id: "image_generation", label: "Images & design" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio & voice" },
  { id: "business", label: "Business & productivity" },
] as const;

const EXP = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
] as const;

const BUDGET = [
  { id: "free", label: "Free only" },
  { id: "under_20", label: "Under $20/mo" },
  { id: "under_50", label: "Under $50/mo" },
  { id: "enterprise", label: "Enterprise budget" },
] as const;

const RUNTIME = [
  { id: "cloud", label: "Cloud / SaaS" },
  { id: "browser", label: "Browser-first" },
  { id: "mobile", label: "Mobile apps" },
  { id: "local", label: "Local / self-hosted" },
] as const;

export function QuizClient() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function finish() {
    setSaving(true);
    setError(null);
    const full = answers as QuizAnswers;
    try {
      if (isSignedIn) {
        const res = await fetch("/api/user/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: full }),
        });
        if (!res.ok) throw new Error("Could not save quiz");
      } else {
        sessionStorage.setItem("launchpad_quiz_pending", JSON.stringify(full));
      }
      router.push("/for-you");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }

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
      <h1 className="mt-2 text-center text-3xl font-bold text-white">5 quick questions</h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Question {step + 1} of 5
        {!isSignedIn && " — sign in later to save results to your profile, or continue as guest."}
      </p>

      <div className="mt-10 space-y-4">
        {step === 0 && (
          <>
            <p className="text-sm font-medium text-gray-300">What do you want to accomplish?</p>
            <div className="grid gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, goal: g.id }));
                    setStep(1);
                  }}
                  className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-left text-sm text-white hover:border-orange-500/50"
                >
                  {g.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-sm font-medium text-gray-300">What&apos;s your experience level?</p>
            <div className="grid gap-2">
              {EXP.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, experience: g.id }));
                    setStep(2);
                  }}
                  className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-left text-sm text-white hover:border-orange-500/50"
                >
                  {g.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(0)} className="text-xs text-gray-500 hover:text-white">
              Back
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm font-medium text-gray-300">What&apos;s your monthly tool budget?</p>
            <div className="grid gap-2">
              {BUDGET.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, budget: g.id }));
                    setStep(3);
                  }}
                  className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-left text-sm text-white hover:border-orange-500/50"
                >
                  {g.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-white">
              Back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm font-medium text-gray-300">Where should AI tools run?</p>
            <p className="text-xs text-gray-500">Local/self-hosted often means more setup but more control.</p>
            <div className="mt-2 grid gap-2">
              {RUNTIME.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, runtime: g.id }));
                    setStep(4);
                  }}
                  className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-left text-sm text-white hover:border-orange-500/50"
                >
                  {g.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(2)} className="text-xs text-gray-500 hover:text-white">
              Back
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <p className="text-sm font-medium text-gray-300">What tasks do you need? (short phrase)</p>
            <textarea
              value={answers.tasks || ""}
              onChange={(e) => setAnswers((a) => ({ ...a, tasks: e.target.value }))}
              placeholder="e.g. blog posts, code review, meeting notes"
              rows={3}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={saving || !(answers.tasks || "").trim()}
                onClick={() => finish()}
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-40"
              >
                {saving ? "Saving…" : "See recommendations"}
              </button>
              <button type="button" onClick={() => setStep(3)} className="text-xs text-gray-500 hover:text-white">
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
