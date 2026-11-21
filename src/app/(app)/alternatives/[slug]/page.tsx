export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ComparePageView } from "@/components/compare/compare-page-view";
import { COMPARE_PAGES, findFreeAlternatives } from "@/data/compare/pages";
import { comparePageMetadata, loadCompareView } from "@/lib/compare-page";

// Unknown slugs are unmatched routes, so the root not-found page renders on the
// server. A notFound() call in the page sends an empty HTML body that only
// fills in once the browser runs the scripts (Next's error-recovery shell).
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARE_PAGES.filter((page) => page.kind === "free-alternatives").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return comparePageMetadata(findFreeAlternatives(slug));
}

export default async function FreeAlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findFreeAlternatives(slug);
  if (!page) notFound();
  const view = await loadCompareView(page);
  if (!view) notFound();
  return <ComparePageView view={view} />;
}
