import Link from "next/link";
import { ArrowRight, BookOpen, Rocket } from "lucide-react";

export const metadata = {
  title: "Tutorial Library | Launchpad HQ",
  description: "Step-by-step guides for every AI platform in the Launchpad HQ directory.",
};

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-orange-500/30 bg-gray-900">
          <BookOpen className="h-8 w-8 text-orange-400" />
        </div>
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
        Tutorial Library
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Tutorials are coming soon
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
        We&rsquo;re expanding a full tutorial library across every platform in the directory. In the meantime,
        most platforms already have a <span className="text-gray-200">Tutorials</span> tab on their detail page
        with a getting-started guide.
      </p>

      <div className="mt-10 flex justify-center">
        <Link
          href="/discover"
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40"
        >
          <Rocket className="h-5 w-5" /> Browse platforms <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
