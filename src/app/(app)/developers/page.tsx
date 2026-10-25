import type { Metadata } from "next";
import { CopySections } from "@/components/content/copy-sections";
import { developerSections } from "@/lib/developers-content";
import { publicPageMetadata, withFeedAlternate } from "@/lib/seo-metadata";
import { DEVELOPERS_DESCRIPTION, DEVELOPERS_TITLE } from "@/lib/site-copy";

export const metadata: Metadata = withFeedAlternate(
  publicPageMetadata({
    title: `${DEVELOPERS_TITLE} | Launchpad HQ`,
    description: DEVELOPERS_DESCRIPTION,
    path: "/developers",
  }),
  "/index.json",
);

export const revalidate = 3600;

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Launchpad HQ for developers</h1>
      <p className="mt-4 text-sm text-gray-400">{DEVELOPERS_DESCRIPTION}</p>
      <CopySections sections={developerSections()} />
    </div>
  );
}
