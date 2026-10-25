export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ComparePageView } from "@/components/compare/compare-page-view";
import { findHeadToHead } from "@/data/compare/pages";
import { comparePageMetadata, loadCompareView } from "@/lib/compare-page";

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
