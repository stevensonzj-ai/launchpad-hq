import Link from "next/link";
import { Rocket, Sparkles } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Welcome | Launchpad HQ",
};

export default async function OnboardingPage() {
  const user = await currentUser();
  const firstName = user?.firstName?.trim() || null;
  const greetingName = firstName || "explorer";

  // Show this welcome page once, on the first visit after signing in, then
  // send returning visitors to /discover. This is the only place
  // `onboardingComplete` is read or written, and it gates nothing else —
  // no other route redirects on it, and this page stays skippable.
  //
  // Every database step below degrades to "render the welcome page". A
  // database problem must never turn someone's first sign-in into an error
  // page, so a failed lookup, a null user and a failed update all fall
  // through to the same harmless outcome: they see the welcome again.
  let alreadyOnboarded = false;
  try {
    const dbUser = await getOrCreateDbUser();
    if (dbUser?.onboardingComplete) {
      alreadyOnboarded = true;
    } else if (dbUser) {
      try {
        // Idempotent: writing `true` over an already-true flag is a no-op,
        // so this is safe if the page renders more than once per request.
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { onboardingComplete: true },
        });
      } catch {
        // Best-effort. If the flag does not stick, the cost is that the
        // welcome page shows again next time — not an error for the user.
      }
    }
  } catch {
    // Lookup failed outright (database unreachable, Clerk error). Fall
    // through and render the welcome page.
  }

  // Deliberately outside the try/catch above: redirect() signals by throwing
  // a NEXT_REDIRECT error, and catching it here would silently cancel the
  // redirect and render the page instead.
  if (alreadyOnboarded) {
    redirect("/discover");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-orange-500/20 blur-xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-orange-500/30 bg-gray-900">
            <Rocket className="h-10 w-10 text-orange-400" style={{ transform: "rotate(-45deg)" }} />
          </div>
        </div>
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
        Welcome aboard
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Nice to meet you, {greetingName}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
        Launchpad HQ is your mission control for AI tools — a curated directory of platforms across writing,
        image, video, audio, code, and more, built for people who want to spend less time guessing and more
        time building.
      </p>

      {/* Two real choices, not a call to action with a disclaimer. The quiz
          stays first and stays filled, which is what marks it as the
          recommendation; the outline treatment and size are the same pair the
          homepage hero uses, so browsing reads as a button rather than a
          fallback. Both go full width when the row stacks on a phone. */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/quiz"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 sm:w-auto"
        >
          <Sparkles className="h-5 w-5" /> Take the 2-minute quiz
        </Link>
        <Link
          href="/discover"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 px-8 py-3.5 text-lg font-semibold text-white transition-all hover:border-orange-500/50 hover:bg-gray-900 sm:w-auto"
        >
          <Rocket className="h-5 w-5 text-orange-400" /> Browse all platforms
        </Link>
      </div>
    </div>
  );
}
