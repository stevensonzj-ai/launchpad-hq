export const dynamic = "force-dynamic";

import Link from "next/link";
import { COMPARE_HUB, COMPARE_HUB_PATH, COMPARE_PAGES, comparePagePath } from "@/data/compare/pages";
import { comparePageLoadSlugs, listedComparePages } from "@/data/compare/view";
import { existingPlatformSlugs } from "@/lib/compare-data";
import { publicPageMetadata } from "@/lib/seo-metadata";

export const metadata = publicPageMetadata({
  title: COMPARE_HUB.title,
  description: COMPARE_HUB.description,
  path: COMPARE_HUB_PATH,
});

function PageList({ title, items }: { title: string; items: { href: string; label: string; description: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.href} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <Link href={item.href} className="font-medium text-orange-400 hover:text-orange-300">
              {item.label}
            </Link>
            <p className="mt-2 text-sm text-gray-400">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CompareHubPage() {
  const existing = await existingPlatformSlugs([
    ...new Set(COMPARE_PAGES.flatMap(comparePageLoadSlugs)),
  ]);
  const pages = listedComparePages(undefined, existing);
  const item = (page: (typeof pages)[number]) => ({
    href: comparePagePath(page),
    label: page.title,
    description: page.description,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">Compare AI tools</h1>
      <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-gray-400">
        {COMPARE_HUB.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <PageList
        title="Head to head"
        items={pages.filter((page) => page.kind === "head-to-head").map(item)}
      />
      <PageList
        title="Free alternatives"
        items={pages.filter((page) => page.kind === "free-alternatives").map(item)}
      />
      <PageList
        title="Models"
        items={[
          {
            href: "/models/compare/claude-vs-gpt",
            label: "Claude vs GPT models",
            description: "Flagship and budget Claude and GPT models side by side, from official docs.",
          },
        ]}
      />
    </div>
  );
}
