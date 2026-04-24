"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ChevronUp, Flag, Loader2, MessageCircle } from "lucide-react";

type Reply = {
  id: string;
  body: string;
  upvotes: number;
  author: string;
  createdAt: string;
};

type DiscussionRow = {
  id: string;
  title: string;
  body: string;
  solution: string | null;
  upvotes: number;
  author: string;
  createdAt: string;
  replies: Reply[];
};

export function PlatformDiscussions({
  platformName,
  platformSlug,
  showFullLink = true,
}: {
  platformName: string;
  platformSlug: string;
  showFullLink?: boolean;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const [items, setItems] = useState<DiscussionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 6000);
    return () => clearTimeout(t);
  }, [success]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/platforms/${encodeURIComponent(platformSlug)}/discussions`);
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

  async function submitThread(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const res = await fetch(`/api/platforms/${encodeURIComponent(platformSlug)}/discussions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Failed");
      return;
    }
    setTitle("");
    setBody("");
    setSuccess("Thanks! Your thread is awaiting review and will appear once approved.");
  }

  async function submitReply(discussionId: string) {
    if (!replyBody.trim()) return;
    const res = await fetch(`/api/discussions/${discussionId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: replyBody }),
    });
    if (!res.ok) return;
    setReplyBody("");
    setReplyTo(null);
    setSuccess("Thanks! Your reply is awaiting review and will appear once approved.");
  }

  async function voteDiscussion(id: string) {
    await fetch(`/api/discussions/${id}/vote`, { method: "POST" });
    await load();
  }

  async function voteReply(id: string) {
    await fetch(`/api/discussion-replies/${id}/vote`, { method: "POST" });
    await load();
  }

  async function reportDiscussion(id: string) {
    const reason = window.prompt("Why are you reporting this thread?");
    if (!reason?.trim()) return;
    await fetch(`/api/discussions/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    alert("Thanks — we will review.");
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="text-lg font-semibold text-white">Discussions</h2>
      <p className="mt-1 text-sm text-gray-400">
        Community Q&amp;A for <span className="text-gray-300">{platformName}</span>
      </p>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
        Keep it respectful. No harassment, spam, or illegal content. Threads may be removed if they violate
        guidelines.
      </div>

      {success && (
        <p
          role="status"
          className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2 text-xs text-green-200"
        >
          {success}
        </p>
      )}

      {isLoaded && !isSignedIn && (
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/sign-in" className="font-medium text-orange-400 hover:underline">
            Sign in
          </Link>{" "}
          to start threads and reply.
        </p>
      )}

      {isLoaded && isSignedIn && (
        <form onSubmit={submitThread} className="mt-6 space-y-3 border-t border-gray-800 pt-6">
          <p className="text-sm font-medium text-white">New thread</p>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
          />
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Details"
            rows={3}
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            Post thread
          </button>
        </form>
      )}

      <div className="mt-8 border-t border-gray-800 pt-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-400">
          <MessageCircle className="h-4 w-4" /> Threads
        </p>
        {loading ? (
          <div className="flex justify-center py-8 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No discussions yet.</p>
        ) : (
          <ul className="space-y-6">
            {items.map((d) => (
              <li key={d.id} className="rounded-lg border border-gray-800 bg-gray-950/50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-white">{d.title}</p>
                    <p className="text-xs text-gray-500">{d.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => voteDiscussion(d.id)}
                      className="inline-flex items-center gap-1 rounded border border-gray-700 px-2 py-1 text-xs text-gray-400 hover:border-orange-500"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                      {d.upvotes}
                    </button>
                    {isLoaded && isSignedIn && (
                      <button
                        type="button"
                        onClick={() => reportDiscussion(d.id)}
                        className="text-xs text-gray-500 hover:text-amber-400"
                      >
                        <Flag className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-300">{d.body}</p>
                {d.solution && (
                  <p className="mt-2 rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-300">
                    Solution: {d.solution}
                  </p>
                )}

                {d.replies.length > 0 && (
                  <ul className="mt-4 space-y-2 border-l border-gray-800 pl-4">
                    {d.replies.map((r) => (
                      <li key={r.id} className="text-sm">
                        <p className="text-gray-300">{r.body}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span>{r.author}</span>
                          {isLoaded && isSignedIn && (
                            <button
                              type="button"
                              onClick={() => voteReply(r.id)}
                              className="inline-flex items-center gap-0.5 text-gray-400 hover:text-white"
                            >
                              <ChevronUp className="h-3 w-3" />
                              {r.upvotes}
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {isLoaded && isSignedIn && (
                  <>
                    {replyTo === d.id ? (
                      <div className="mt-3 flex flex-col gap-2">
                        <textarea
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          placeholder="Your reply"
                          rows={2}
                          className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => submitReply(d.id)}
                            className="rounded bg-orange-500 px-3 py-1 text-xs text-white"
                          >
                            Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyTo(null)}
                            className="text-xs text-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReplyTo(d.id)}
                        className="mt-3 text-xs text-orange-400 hover:underline"
                      >
                        Reply
                      </button>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showFullLink && (
        <p className="mt-6 text-center text-xs text-gray-600">
          <a href={`/platform/${platformSlug}/discussions`} className="hover:text-orange-400">
            Open full discussions page
          </a>
        </p>
      )}
    </div>
  );
}
