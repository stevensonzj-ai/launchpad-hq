export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ComparePageView } from "@/components/compare/compare-page-view";
import { findFreeAlternatives } from "@/data/compare/pages";
import { comparePageMetadata, loadCompareView } from "@/lib/compare-page";

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
