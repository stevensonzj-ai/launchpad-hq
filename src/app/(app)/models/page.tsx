import Link from "next/link";
import { Layers } from "lucide-react";
import { listModelFamilies } from "@/data/models";
import { formatVerifiedDate } from "@/lib/model-facts";
import { publicPageMetadata } from "@/lib/seo-metadata";

export const metadata = publicPageMetadata({
  title: "AI model versions | Launchpad HQ",
  description:
    "Current and prior-generation versions of major LLM families, sourced from official vendor docs. Unconfirmed figures stay unmarked as guesses.",
  path: "/models",
});

export default function ModelsIndexPage() {
  const families = listModelFamilies();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
            <Layers className="h-7 w-7 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Model versions</h1>
            <p className="mt-1 text-gray-400">
              What each major chat family currently ships — and which one to pick.
            </p>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-500">
          These notes live on each platform page when we have a catalog slug. Numbers come only from
          official vendor docs. Anything we could not confirm is marked unverified.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-800 bg-gray-900/40 p-5">
        <Link href="/models/compare/claude-vs-gpt" className="text-sm font-medium text-orange-400 hover:text-orange-300">
          Side-by-side: Claude vs GPT (flagship and budget)
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {families.map((family) => (
          <Link
            key={family.familySlug}
            href={`/models/${family.familySlug}`}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-orange-500/40"
          >
            <p className="text-xs uppercase tracking-wide text-gray-500">{family.vendor}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{family.displayName}</h2>
            <p className="mt-2 text-sm text-gray-400">
              {family.versions.length} versions · verified {formatVerifiedDate(family.lastVerifiedAt)}
            </p>
            {family.platformSlugs.length === 0 && (
              <p className="mt-2 text-xs text-gray-600">No matching catalog slug in this repo yet.</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
