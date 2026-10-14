import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How we make money | Launchpad HQ",
  description:
    "Launchpad is free to browse. We earn money in three ways, and none of them buy a better rating.",
};

export const revalidate = 3600;

export default function HowWeMakeMoneyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-amber-400/90">
        [Draft — Business Ops]
      </p>
      {/* BUSINESS-OPS: replace */}
      <h1 className="mt-2 text-3xl font-bold text-white">How we make money</h1>

      <ol className="mt-10 space-y-10">
        <li>
          <h2 className="text-xl font-semibold text-white">1. The short version</h2>
          <p className="mt-2 text-sm text-gray-400">
            Launchpad is free to browse. We earn money in three ways, and none of them buy a better
            rating.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Those three ways are sponsored spots, affiliate links (if/when used), and premium
            membership. Paid units are always marked <em>Sponsored</em> — never &quot;Partner&quot; or
            &quot;Featured&quot; alone.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {/* BUSINESS-OPS: replace */}
            Newsletter disclosure: if we send a newsletter, it is optional, separate from
            rankings, and would use double opt-in, a one-click unsubscribe in every email, and a
            physical postal address in the footer (CAN-SPAM). No newsletter provider is live yet
            (unverified).
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">2. Sponsored spots</h2>
          <p className="mt-2 text-sm text-gray-400">
            Companies can pay for the clearly-labelled &quot;Sponsored spotlight&quot; and &quot;AI of the
            Week&quot;. They are always marked <em>Sponsored</em>. They never change rankings, quiz
            results, workflow picks or tutorial verdicts.{" "}
            <Link href="/sponsor-guidelines" className="text-orange-400 hover:underline">
              Sponsor guidelines
            </Link>
            .
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">3. Affiliate links (if/when used)</h2>
          <p className="mt-2 text-sm text-gray-400">
            Some &quot;Visit site&quot; links may earn us a commission. Marked where used. Price to you is
            the same.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">4. Premium membership</h2>
          <p className="mt-2 text-sm text-gray-400">
            The paid plan (see{" "}
            <Link href="/pricing" className="text-orange-400 hover:underline">
              /pricing
            </Link>
            ) unlocks premium tutorials.
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
            Prices and free tiers are re-checked against official pages on a regular review cycle;
            anything we couldn&apos;t confirm is marked &quot;unverified&quot;.
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
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">8. Last updated</h2>
          <p className="mt-2 text-sm text-gray-400">14 October 2026</p>
        </li>
      </ol>
    </div>
  );
}
