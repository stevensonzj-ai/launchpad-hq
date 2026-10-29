export const dynamic = "force-dynamic";

import { getPlatformPageRow } from "@/lib/catalog-queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformPrompts } from "@/components/prompts/platform-prompts";

import { publicPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPlatformPageRow(slug);
  if (!p) return { title: "Not found" };
  return publicPageMetadata({
    title: `${p.name} prompts | Launchpad HQ`,
    description: `Community prompts for ${p.name}. Browse approved prompts on Launchpad HQ, then try them on the official site.`,
    path: `/platform/${slug}/prompts`,
  });
}

export default async function PlatformPromptsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Shared catalog cache. The list is fetched client-side from the cached
  // /api route, and skipped when the cached approved count is 0.
  const platform = await getPlatformPageRow(slug);
  if (!platform) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href={`/platform/${slug}`} className="text-sm text-gray-500 hover:text-white">
        ← Back to {platform.name}
      </Link>
      <PlatformPrompts
        platformName={platform.name}
        platformSlug={platform.slug}
        showFullLink={false}
        approvedCount={platform._count.prompts}
      />
    </div>
  );
}
