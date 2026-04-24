export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { PlatformCard } from "@/components/platforms/platform-card";

export const metadata: Metadata = {
  title: "For you | Launchpad HQ",
  description: "Your saved platforms and personalized recommendations.",
};

export default async function ForYouPage() {
  const user = await getOrCreateDbUser();

  if (!user) {
    return <LoggedOutLanding />;
  }

  const favoriteRows = await prisma.userFavorite.findMany({
    where: { userId: user.id },
    include: {
      platform: { include: { category: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  const favorites = favoriteRows.map((f) => f.platform);
  const favoriteIds = new Set(favoriteRows.map((f) => f.platformId));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">For you</h1>
      <p className="mt-2 text-gray-400">
        Your personal landing for saved tools and recommendations.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Your favorites</h2>
        {favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((p) => (
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
                isFavorited={favoriteIds.has(p.id)}
                isSignedIn={true}
              />
            ))}
          </div>
        )}
      </section>

      {/* The quiz section currently renders the CTA for every signed-in user.
       * Commit 2 will branch this into a recommendations grid for users who
       * have completed the quiz (UserPreferences.quizCompletedAt != null).
       * Kept as a single-state section here so this commit reviews cleanly. */}
      <section className="mt-12">
        <QuizCta />
      </section>
    </div>
  );
}

function LoggedOutLanding() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white">For you</h1>
      <p className="mt-4 text-gray-400">
        Sign in to save platforms you like and get personalized recommendations.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/sign-in"
          className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Sign in
        </Link>
        <Link
          href="/quiz"
          className="inline-block rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 font-semibold text-gray-300 hover:border-gray-600 hover:text-white"
        >
          Take the quiz
        </Link>
      </div>
    </div>
  );
}

function FavoritesEmptyState() {
  return (
    <div className="mt-4 rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
      <p className="text-lg font-medium text-white">
        You haven&apos;t saved any platforms yet
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Browse Discover and tap the bookmark icon to save tools you want to come back to.
      </p>
      <Link
        href="/discover"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
      >
        Browse Discover
      </Link>
    </div>
  );
}

function QuizCta() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
      <h2 className="text-xl font-semibold text-white">Get personalized picks</h2>
      <p className="mt-2 text-sm text-gray-400">
        Answer 5 quick questions and we&apos;ll match you to AI tools that fit your goals, experience level, and budget.
      </p>
      <Link
        href="/quiz"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
      >
        Start quiz
      </Link>
    </div>
  );
}
