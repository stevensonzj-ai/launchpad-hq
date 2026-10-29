import Link from "next/link";
import type { Metadata } from "next";

import { publicPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = publicPageMetadata({
  title: "How we make money | Launchpad HQ",
  description:
    "Launchpad is free to browse. We earn money from labeled sponsorships and disclosed affiliate links — they never buy a better rating or ranking.",
  path: "/how-we-make-money",
});

export const revalidate = 3600;

export default function HowWeMakeMoneyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">How we make money</h1>

      <ol className="mt-10 space-y-10">
        <li>
          <h2 className="text-xl font-semibold text-white">1. The short version</h2>
          <p className="mt-2 text-sm text-gray-400">
            Launchpad is free to browse. There is no paid membership. We earn money from
            labeled sponsorships and disclosed affiliate links, and neither buys a better rating.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Paid units are always marked <em>Sponsored</em> — never &quot;Partner&quot; or
            &quot;Featured&quot; alone.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Newsletter disclosure: if we send a newsletter, it is optional, separate from
            rankings, and would use double opt-in and a one-click unsubscribe in every email.
            Contact is email only (
            <a
              href="mailto:launchpadhq.admin@gmail.com"
              className="text-orange-400 hover:underline"
            >
              launchpadhq.admin@gmail.com
            </a>
            ). No newsletter provider is live yet.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">2. Sponsored spots</h2>
          <p className="mt-2 text-sm text-gray-400">
            Companies can pay for the clearly-labelled &quot;Sponsored spotlight&quot; and &quot;AI of the
            Week&quot;. They are always marked <em>Sponsored</em>. They never change rankings, quiz
            results, workflow picks or tutorial verdicts.{" "}
            <Link href="/advertise" className="text-orange-400 hover:underline">
              Sponsor guidelines
            </Link>
            .
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">3. Affiliate links</h2>
          <p className="mt-2 text-sm text-gray-400">
            A few platform pages send the &quot;Open&quot; button through an
            affiliate link. If you subscribe through it, the vendor pays us a commission. Each
            one is disclosed next to the button. Affiliate links never change rankings, quiz
            results, workflow picks or tutorial verdicts, and our data feed and API always list
            the vendor&apos;s own website.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">4. Payments for sponsorships</h2>
          <p className="mt-2 text-sm text-gray-400">
            Stripe is used only for sponsor invoices. It is not used to bill site visitors.
            There is no user subscription.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">5. What we don&apos;t do</h2>
          <p className="mt-2 text-sm text-gray-400">
            No paid reviews, no selling your personal data, no hidden placements.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">6. How we check facts</h2>
          <p className="mt-2 text-sm text-gray-400">
            Prices and free tiers are re-checked against official pages on a regular review cycle.
            If we could not confirm a detail, we say so on the page.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">7. Questions / report a problem</h2>
          <p className="mt-2 text-sm text-gray-400">
            Contact email:{" "}
            <a
              href="mailto:launchpadhq.admin@gmail.com"
              className="text-orange-400 hover:underline"
            >
              launchpadhq.admin@gmail.com
            </a>
            . We do not publish a postal address; email is the way to reach us.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">8. Last updated</h2>
          <p className="mt-2 text-sm text-gray-400">29 October 2026</p>
        </li>
      </ol>
    </div>
  );
}
