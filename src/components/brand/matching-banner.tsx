import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export function MatchingBanner() {
  return (
    <aside className="relative mt-12 flex flex-col gap-6 overflow-hidden rounded-2xl border border-gray-700/80 bg-gradient-to-r from-gray-900 to-gray-950 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="relative z-10">
        <p className="mb-1 text-sm text-gray-400">Too many possibilities?</p>
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Let&apos;s find your starting point.</h2>
      </div>
      <Rocket aria-hidden="true" className="pointer-events-none absolute right-36 top-5 h-28 w-28 -rotate-12 text-amber-400/10" />
      <Link href="/quiz" className="lp-button relative z-10 shrink-0 self-start sm:self-auto">Get matched <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
    </aside>
  );
}
