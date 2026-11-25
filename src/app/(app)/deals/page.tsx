import type { Metadata } from "next";

import { buildDealsPage, type ToolDirectoryEntry } from "@/app/(app)/deals/model";
import { DealsPageView } from "@/app/(app)/deals/view";
import { getListedPlatformNames } from "@/lib/catalog-queries";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { SITE_IS_PUBLIC } from "@/lib/site";

export const revalidate = 3600;

async function directory(): Promise<Map<string, ToolDirectoryEntry>> {
  try {
    const rows = await getListedPlatformNames();
    return new Map(rows.map((row) => [row.slug, { name: row.name, website: row.website }]));
  } catch {
    return new Map();
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const indexable = buildDealsPage({ now: new Date() }).indexable && SITE_IS_PUBLIC;
  return publicPageMetadata({
    title: "Deals and free trials | Launchpad HQ",
    description:
      "Free trials, student discounts, promo codes, and verified free plans, checked on each vendor's site. Affiliate links are labeled and do not change rankings.",
    path: "/deals",
    ...(indexable ? {} : { index: false, follow: SITE_IS_PUBLIC }),
  });
}

export default async function DealsPage() {
  const model = buildDealsPage({ now: new Date(), names: await directory() });
  return <DealsPageView model={model} />;
}
