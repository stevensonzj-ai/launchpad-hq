import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getModelFamilyBySlug, listModelFamilySlugs } from "@/data/models";
import { PlatformModelsSection } from "@/components/models/platform-models-section";
import { publicPageMetadata, withFeedAlternate } from "@/lib/seo-metadata";
import { CatalogLinkList } from "@/components/seo/catalog-link-list";
import { platformCatalogLinks } from "@/lib/catalog-names";

export function generateStaticParams() {
  return listModelFamilySlugs().map((family) => ({ family }));
}

export async function generateMetadata({ params }: { params: Promise<{ family: string }> }) {
  const { family: familySlug } = await params;
  const family = getModelFamilyBySlug(familySlug);
  if (!family) return { title: "Models | Launchpad HQ" };
  return withFeedAlternate(
    publicPageMetadata({
      title: `${family.displayName} models | Launchpad HQ`,
      description: `Current and prior ${family.displayName} versions from official ${family.vendor} docs, including which one to pick and API notes we could verify.`,
      path: `/models/${family.familySlug}`,
    }),
    `/models/${family.familySlug}.json`,
  );
}

export default async function ModelFamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family: familySlug } = await params;
  const family = getModelFamilyBySlug(familySlug);
  if (!family) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/models"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All model families
      </Link>

      <header className="mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-orange-400">{family.vendor}</p>
        <h1 className="text-3xl font-bold text-white">{family.displayName} models</h1>
      </header>

      <PlatformModelsSection family={family} heading="Version comparison" />

      <div className="mt-10 space-y-6">
        {family.versions.map((version) => (
          <article key={version.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h3 className="text-lg font-semibold text-white">{version.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{version.bestFor}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-400">
              {version.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {version.caveats.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Caveats</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-400">
                  {version.caveats.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {version.apiPriceInput.note && (
              <p className="mt-3 text-xs text-gray-600">{version.apiPriceInput.note}</p>
            )}
          </article>
        ))}
      </div>

      {family.platformSlugs.length > 0 && (
        <CatalogLinkList
          title="Catalog pages"
          items={await platformCatalogLinks(family.platformSlugs)}
        />
      )}
    </div>
  );
}
