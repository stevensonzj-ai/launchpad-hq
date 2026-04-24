"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "icon" | "labeled";

type FavoriteButtonProps = {
  slug: string;
  initialFavorited: boolean;
  isSignedIn: boolean;
  variant?: Variant;
  className?: string;
};

export function FavoriteButton({
  slug,
  initialFavorited,
  isSignedIn,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, setIsPending] = useState(false);
  const [hadError, setHadError] = useState(false);

  // Signed-out: render a Link to sign-in in place of the button. Preserves the
  // visual affordance so anonymous users discover the feature, matching the
  // inline sign-in prompt pattern used in prompts/discussions.
  if (!isSignedIn) {
    if (variant === "labeled") {
      return (
        <Link
          href="/sign-in"
          aria-label="Sign in to save this platform"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-300 hover:border-gray-600 hover:text-white",
            className,
          )}
        >
          <Bookmark className="h-4 w-4" />
          Save
        </Link>
      );
    }
    return (
      <Link
        href="/sign-in"
        aria-label="Sign in to save this platform"
        className={cn(
          "rounded-md p-1.5 text-gray-500 hover:text-orange-400",
          className,
        )}
      >
        <Bookmark className="h-5 w-5" />
      </Link>
    );
  }

  async function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    // The PlatformCard wraps its entire tile in a <Link>, so this button sits
    // inside an interactive element. preventDefault + stopPropagation keep a
    // bookmark click from also navigating to the platform detail page. Nested
    // interactive content (button inside link) is an a11y compromise rather
    // than a clean pattern, but it matches what Twitter/Pinterest/GitHub do
    // and avoids a larger card-structure refactor. If we revisit the card
    // layout, replacing the outer Link with a link on just the name would
    // dissolve the need for this guard.
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;
    setIsPending(true);
    setHadError(false);
    const method = favorited ? "DELETE" : "POST";
    try {
      const res = await fetch(
        `/api/platforms/${encodeURIComponent(slug)}/favorite`,
        { method },
      );
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data = await res.json();
      setFavorited(Boolean(data.favorited));
    } catch {
      setHadError(true);
      setTimeout(() => setHadError(false), 2000);
    } finally {
      setIsPending(false);
    }
  }

  const baseLabel = favorited ? "Remove from favorites" : "Save to favorites";
  const ariaLabel = hadError ? "Failed to save, try again" : baseLabel;

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        aria-busy={isPending}
        aria-label={ariaLabel}
        aria-pressed={favorited}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60",
          favorited
            ? "border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
            : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600 hover:text-white",
          hadError && "ring-2 ring-red-500/50",
          className,
        )}
      >
        <Bookmark className={cn("h-4 w-4", favorited && "fill-current")} />
        {favorited ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-busy={isPending}
      aria-label={ariaLabel}
      aria-pressed={favorited}
      className={cn(
        "rounded-md p-1.5 transition-colors disabled:opacity-60",
        favorited ? "text-orange-400" : "text-gray-500 hover:text-orange-400",
        hadError && "ring-2 ring-red-500/50",
        className,
      )}
    >
      <Bookmark className={cn("h-5 w-5", favorited && "fill-current")} />
    </button>
  );
}
