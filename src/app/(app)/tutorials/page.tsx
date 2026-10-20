export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, BookOpen, Rocket } from "lucide-react";
import { prisma } from "@/lib/db";
import { JsonLd } from "@/components/seo/json-ld";
import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import type { PlatformTutorialData } from "@/data/tutorials";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { buildTutorialIndexStructuredData } from "@/lib/seo-jsonld";

export const metadata = publicPageMetadata({
  title: "AI Tool Tutorials: Free Beginner's Guides | Launchpad HQ",
  description:
    "Free, honest getting-started guides for AI tools, grouped by category: what each tool is good at, what to avoid, what to know before you start, and first things to try.",
  path: "/tutorials",
});

type CategoryGroup = {
  name: string;
  slug: string;
  tutorials: PlatformTutorialData[];
};

/**
 * Every registered tutorial whose Platform row exists, grouped by that
 * row's category. Tutorials with no matching row are skipped — their
 * /guide page 404s, so linking them would send readers to a dead end.
 */
async function loadGroups(): Promise<CategoryGroup[]> {
  const tutorials = listRegisteredTutorials();
  const platforms = await prisma.platform.findMany({
    where: { slug: { in: tutorials.map((t) => t.platformSlug) } },
    select: { slug: true, category: { select: { name: true, slug: true } } },
  });
  const categoryBySlug = new Map(platforms.map((p) => [p.slug, p.category]));

  const groups = new Map<string, CategoryGroup>();
  for (const tutorial of tutorials) {
    const category = categoryBySlug.get(tutorial.platformSlug);
    if (!category) continue;
    const group = groups.get(category.slug) ?? { ...category, tutorials: [] };
    group.tutorials.push(tutorial);
    groups.set(category.slug, group);
  }

  return [...groups.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((group) => ({
      ...group,
      tutorials: group.tutorials.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

export default async function TutorialsPage() {
  const groups = await loadGroups();
  const ordered = groups.flatMap((group) => group.tutorials);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {ordered.length > 0 && <JsonLd data={buildTutorialIndexStructuredData(ordered)} />}

      <header className="max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
          <BookOpen className="h-4 w-4" aria-hidden /> Tutorial library
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Getting-started guides
        </h1>
        <p className="mt-5 text-lg text-gray-400">
          {ordered.length} free guides, one per tool. Each one covers what the tool is good at, what to
          avoid, what to know before you start, and the first things worth trying. No account needed.
        </p>
      </header>

      {groups.length > 0 ? (
        <>
          <nav aria-label="Tutorial categories" className="mt-10 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-orange-500/50 hover:text-white"
              >
                {group.name} <span className="text-gray-500">({group.tutorials.length})</span>
              </a>
            ))}
          </nav>

          <div className="mt-6 space-y-12">
            {groups.map((group) => (
              <section key={group.slug} id={group.slug} className="scroll-mt-24 border-t border-gray-800 pt-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{group.name}</h2>
                  <Link
                    href={`/discover?category=${group.slug}`}
                    className="text-sm text-gray-400 hover:text-orange-300"
                  >
                    Browse all {group.name} tools
                  </Link>
                </div>
                <ul className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {group.tutorials.map((tutorial) => (
                    <li key={tutorial.platformSlug}>
                      <Link
                        href={tutorialGuidePath(tutorial.platformSlug)}
                        className="font-medium text-orange-400 hover:text-orange-300"
                      >
                        {tutorial.title}
                      </Link>
                      <p className="mt-1 text-sm leading-6 text-gray-400">{tutorial.tagline}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-12 rounded-xl border border-dashed border-gray-700 bg-gray-950/50 px-6 py-12 text-center">
          <p className="text-gray-400">No guides are available right now.</p>
          <Link
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            <Rocket className="h-5 w-5" /> Browse platforms <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
