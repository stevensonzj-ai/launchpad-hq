export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ComparePageView } from "@/components/compare/compare-page-view";
import { COMPARE_PAGES, findHeadToHead } from "@/data/compare/pages";
import { comparePageMetadata, loadCompareView } from "@/lib/compare-page";

// Unknown slugs are unmatched routes, so the root not-found page renders on the
// server. A notFound() call in the page sends an empty HTML body that only
// fills in once the browser runs the scripts (Next's error-recovery shell).
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARE_PAGES.filter((page) => page.kind === "head-to-head").map((page) => ({ pair: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  return comparePageMetadata(findHeadToHead(pair));
}

export default async function HeadToHeadPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  // Reverse-order slugs never reach here: next.config.ts 301s them (compareRedirects).
  const page = findHeadToHead(pair);
  if (!page) notFound();
  const view = await loadCompareView(page);
  if (!view) notFound();
  return <ComparePageView view={view} />;
}
