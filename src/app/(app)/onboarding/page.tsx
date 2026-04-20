import Link from "next/link";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export const metadata = {
  title: "Welcome | Launchpad HQ",
};

export default async function OnboardingPage() {
  const user = await currentUser();
  const firstName = user?.firstName?.trim() || null;
  const greetingName = firstName || "explorer";

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

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/quiz"
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40"
        >
          <Sparkles className="h-5 w-5" /> Take the 2-minute quiz to get matched <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Or{" "}
        <Link href="/discover" className="text-orange-400 hover:underline">
          browse all platforms
        </Link>{" "}
        first if you&rsquo;d rather explore.
      </p>
    </div>
  );
}
