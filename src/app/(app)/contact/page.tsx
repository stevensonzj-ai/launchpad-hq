import type { Metadata } from "next";
import { CopySections } from "@/components/content/copy-sections";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { CONTACT_DESCRIPTION, CONTACT_EMAIL, CONTACT_SECTIONS, CONTACT_TITLE } from "@/lib/site-copy";

export const metadata: Metadata = publicPageMetadata({
  title: `${CONTACT_TITLE} | Launchpad HQ`,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
});

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{CONTACT_TITLE}</h1>
      <p className="mt-4 text-sm text-gray-400">
        Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <CopySections sections={CONTACT_SECTIONS} />
    </div>
  );
}
