import type { Metadata } from "next";
import Link from "next/link";

import { publicPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = publicPageMetadata({
  title: "Support | Launchpad HQ",
  description:
    "Get help with Launchpad HQ and its AI assistant connector, report wrong information, and find our privacy policy and terms.",
  path: "/support",
});

const SUPPORT_EMAIL = "launchpadhq.admin@gmail.com";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Support</h1>
      <p className="mt-4 text-sm text-gray-400">
        Need help with Launchpad HQ or the AI assistant connector? Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-orange-400 hover:underline">
          {SUPPORT_EMAIL}
        </a>
        .
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Report wrong information</h2>
      <p className="mt-2 text-sm text-gray-400">
        Spotted a wrong price, feature or link? Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-orange-400 hover:underline">
          {SUPPORT_EMAIL}
        </a>{" "}
        with the link to the page and what&apos;s wrong. A link to the vendor&apos;s own page
        showing the correct information helps us fix it faster.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-white">Helpful links</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-400">
        <li>
          <Link href="/connector#add-to-assistant" className="text-orange-400 hover:underline">
            Add Launchpad HQ to your AI assistant
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="text-orange-400 hover:underline">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-orange-400 hover:underline">
            Terms of use
          </Link>
        </li>
      </ul>
    </div>
  );
}
