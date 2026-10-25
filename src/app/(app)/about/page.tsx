import type { Metadata } from "next";
import { CopySections } from "@/components/content/copy-sections";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { ABOUT_DESCRIPTION, ABOUT_SECTIONS, ABOUT_TITLE } from "@/lib/site-copy";

export const metadata: Metadata = publicPageMetadata({
  title: `${ABOUT_TITLE} | Launchpad HQ`,
  description: ABOUT_DESCRIPTION,
  path: "/about",
});

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{ABOUT_TITLE}</h1>
      <p className="mt-4 text-sm text-gray-400">{ABOUT_DESCRIPTION}</p>
      <CopySections sections={ABOUT_SECTIONS} />
    </div>
  );
}
