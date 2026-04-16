export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlatformDiscussions } from "@/components/discussions/platform-discussions";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.platform.findUnique({ where: { slug }, select: { name: true } });
  if (!p) return { title: "Not found" };
  return { title: `Discussions — ${p.name} | Launchpad HQ` };
}

export default async function PlatformDiscussionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({ where: { slug } });
  if (!platform) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href={`/platform/${slug}`} className="text-sm text-gray-500 hover:text-white">
        ← Back to {platform.name}
      </Link>
      <PlatformDiscussions platformName={platform.name} platformSlug={platform.slug} showFullLink={false} />
    </div>
  );
}
