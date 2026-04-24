"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Star, Flag } from "lucide-react";

type PromptRow = {
  id: string;
  title: string;
  prompt: string;
  outputUrl: string | null;
  author: string;
  ratingAvg: number | null;
  ratingCount: number;
  createdAt: string;
};

export function PlatformPrompts({
  platformName,
  platformSlug,
  showFullLink = true,
}: {
  platformName: string;
  platformSlug: string;
  showFullLink?: boolean;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const [items, setItems] = useState<PromptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/platforms/${encodeURIComponent(platformSlug)}/prompts`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [platformSlug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/platforms/${encodeURIComponent(platformSlug)}/prompts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, promptText: prompt, outputUrl: outputUrl || undefined }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Could not submit");
      }
      setTitle("");
      setPrompt("");
      setOutputUrl("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  async function rate(id: string, stars: number) {
    await fetch(`/api/prompts/${id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars }),
    });
    await load();
  }

  async function report(id: string) {
    const reason = window.prompt("Why are you reporting this prompt?");
    if (!reason?.trim()) return;
    await fetch(`/api/prompts/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    alert("Thanks — we will review.");
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="text-lg font-semibold text-white">Prompt library</h2>
      <p className="mt-1 text-sm text-gray-400">
        Community prompts for <span className="text-gray-300">{platformName}</span>
      </p>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
        Be responsible: do not submit harmful, deceptive, or non-consensual content. Prompts may be removed if
        they violate guidelines.
      </div>

      {isLoaded && !isSignedIn && (
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/sign-in" className="font-medium text-orange-400 hover:underline">
            Sign in
          </Link>{" "}
          to submit prompts and rate others.
        </p>
      )}

      {isLoaded && isSignedIn && (
        <form onSubmit={submit} className="mt-6 space-y-3 border-t border-gray-800 pt-6">
          <p className="text-sm font-medium text-white">Add a prompt</p>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
          />
          <textarea
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="The prompt text"
            rows={4}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
          />
          <input
            value={outputUrl}
            onChange={(e) => setOutputUrl(e.target.value)}
            placeholder="Optional link (output screenshot, video, etc.)"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit prompt"}
          </button>
        </form>
      )}

      <div className="mt-8 border-t border-gray-800 pt-6">
        <p className="mb-4 text-sm font-medium text-gray-400">Community prompts</p>
        {loading ? (
          <div className="flex justify-center py-8 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No prompts yet. Be the first to add one.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((p) => (
              <li key={p.id} className="rounded-lg border border-gray-800 bg-gray-950/50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-white">{p.title}</p>
                    <p className="text-xs text-gray-500">by {p.author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    {p.ratingAvg != null ? `${p.ratingAvg} (${p.ratingCount})` : "No ratings"}
                  </div>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-gray-300">{p.prompt}</pre>
                {p.outputUrl && (
                  <a
                    href={p.outputUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-orange-400 hover:underline"
                  >
                    Output link
                  </a>
                )}
                {isLoaded && isSignedIn && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => rate(p.id, s)}
                        className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-400 hover:border-orange-500 hover:text-white"
                      >
                        {s}★
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => report(p.id)}
                      className="ml-auto inline-flex items-center gap-1 text-xs text-gray-500 hover:text-amber-400"
                    >
                      <Flag className="h-3 w-3" /> Report
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showFullLink && (
        <p className="mt-6 text-center text-xs text-gray-600">
          <a href={`/platform/${platformSlug}/prompts`} className="hover:text-orange-400">
            Open full prompts page
          </a>
        </p>
      )}
    </div>
  );
}
