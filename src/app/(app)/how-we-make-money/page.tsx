import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How we make money | Launchpad HQ",
  description:
    "How LaunchpadHQ is funded, what sponsor placements are, and what they never buy.",
};

export const revalidate = 3600;

function DraftNote() {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-amber-400/90">
      [Draft — Business Ops]
    </p>
  );
}

export default function HowWeMakeMoneyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">How we make money</h1>
      <p className="mt-3 text-gray-400">
        Paid placements are labeled. They do not change rankings, quiz results, or reviews.
      </p>

      {/* BUSINESS-OPS: replace — 8-part outline from plan-go-public-pr.md was not in this repo; structure below is unverified against that file. */}
      <ol className="mt-10 space-y-10">
        <li>
          <DraftNote />
          <h2 className="mt-1 text-xl font-semibold text-white">1. At a glance</h2>
          <p className="mt-2 text-sm text-gray-400">
            LaunchpadHQ is a curated directory. Browsing the catalog is free. A subscription is
            planned for features that help you act on discovery. Sponsor slots are optional paid
            placements, always marked <strong className="text-gray-200">Sponsored</strong>.
          </p>
        </li>
        <li>
          <DraftNote />
          <h2 className="mt-1 text-xl font-semibold text-white">2. Subscriptions</h2>
          <p className="mt-2 text-sm text-gray-400">
            {/* BUSINESS-OPS: replace */}
            Pricing copy on <Link href="/pricing" className="text-orange-400 hover:underline">/pricing</Link>{" "}
            is the live product description. Exact public-launch price is unverified in this draft
            and is not changed here.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">3. Sponsor placements</h2>
          <p className="mt-2 text-sm text-gray-400">
            When a slot is booked, a labeled unit can appear on the homepage (between the hero and
            workflow templates), on Discover when <code className="text-gray-300">?category=</code>{" "}
            matches a booked category, and on{" "}
            <Link href="/ai-of-the-week" className="text-orange-400 hover:underline">
              AI of the Week
            </Link>
            . Empty slots render nothing.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">4. What sponsorship never buys</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sponsors do not affect our rankings, quiz results or reviews. They do not set the
            catalog <code className="text-gray-300">featured</code> flag, Discover sort order,
            workflow templates, or tutorials.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white">5. How we label ads</h2>
          <p className="mt-2 text-sm text-gray-400">
            Every placement shows a visible &quot;Sponsored&quot; label and this disclosure:{" "}
            <em>
              Paid placement. Sponsors don&apos;t affect our rankings, quiz results or reviews.
            </em>{" "}
            Outbound links use <code className="text-gray-300">rel=&quot;sponsored noopener&quot;</code>.
            The FTC&apos;s native-advertising guidance treats clear terms such as
            &quot;Sponsored&quot; as the kind of label readers can understand (
            <a
              href="https://www.ftc.gov/business-guidance/resources/native-advertising-guide-businesses"
              rel="noopener"
              className="text-orange-400 hover:underline"
            >
              FTC Native Advertising: A Guide for Businesses
            </a>
            ;{" "}
            <a
              href="https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255"
              rel="noopener"
              className="text-orange-400 hover:underline"
            >
              16 CFR Part 255
            </a>
            ). Legal review of this page is unverified.
          </p>
        </li>
        <li>
          <DraftNote />
          <h2 className="mt-1 text-xl font-semibold text-white">6. Affiliates and other income</h2>
          <p className="mt-2 text-sm text-gray-400">
            {/* BUSINESS-OPS: replace */}
            Whether LaunchpadHQ uses affiliate links after launch is unverified. This draft does
            not claim any affiliate program exists.
          </p>
        </li>
        <li>
          <DraftNote />
          <h2 className="mt-1 text-xl font-semibold text-white">7. Editorial independence</h2>
          <p className="mt-2 text-sm text-gray-400">
            {/* BUSINESS-OPS: replace */}
            AI of the Week includes an &quot;Our honest take&quot; box written by LaunchpadHQ, not
            the sponsor. Catalog inclusion still follows the published editorial bar. Process
            details beyond that are unverified.
          </p>
        </li>
        <li>
          <DraftNote />
          <h2 className="mt-1 text-xl font-semibold text-white">8. Questions and corrections</h2>
          <p className="mt-2 text-sm text-gray-400">
            {/* BUSINESS-OPS: replace */}
            A public corrections contact for this page is unverified. Until Business Ops fills
            this in, use the contact path Zach already uses for the site. See also{" "}
            <Link href="/sponsor-guidelines" className="text-orange-400 hover:underline">
              Sponsor guidelines
            </Link>
            .
          </p>
        </li>
      </ol>
    </div>
  );
}
