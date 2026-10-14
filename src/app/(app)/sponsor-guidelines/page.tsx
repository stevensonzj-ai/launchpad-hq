import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor guidelines | Launchpad HQ",
  description: "What a LaunchpadHQ sponsor placement is, asset specs, and what we will not accept.",
};

export const revalidate = 3600;

function DraftNote() {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-amber-400/90">
      [Draft — Business Ops]
    </p>
  );
}

export default function SponsorGuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Sponsor guidelines</h1>
      <p className="mt-3 text-gray-400">
        Paid placement. Sponsors don&apos;t affect our rankings, quiz results or reviews.{" "}
        <Link href="/how-we-make-money" className="text-orange-400 hover:underline">
          How we make money
        </Link>
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Asset and copy specs</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>Logo: 256×256 minimum, ≤200 KB</li>
          <li>Spotlight image: 1200×630, ≤500 KB</li>
          <li>AI of the Week hero: 1600×900, ≤800 KB</li>
          <li>Headline ≤90 characters</li>
          <li>Blurb ≤200 characters</li>
          <li>AI of the Week feature: 150–400 words</li>
          <li>At most 3 bullets, each ≤80 characters</li>
          <li>One https CTA</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Where placements can appear</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>Homepage, between the hero and workflow templates</li>
          <li>Discover, only when <code className="text-gray-200">?category=</code> matches the booked category</li>
          <li>
            <Link href="/ai-of-the-week" className="text-orange-400 hover:underline">
              AI of the Week
            </Link>
            , labeled Sponsored, with an &quot;Our honest take&quot; box
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          Unbooked slots stay hidden. Placements never write to <code className="text-gray-200">featured</code>,
          the quiz, Discover ordering, workflows, or tutorials.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <DraftNote />
        <h2 className="text-xl font-semibold text-white">What we won&apos;t accept</h2>
        {/* BUSINESS-OPS: replace */}
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>deepfake/non-consent likeness tools</li>
          <li>adult content</li>
          <li>gambling</li>
          <li>crypto/financial-return promises</li>
          <li>unverifiable medical/legal claims</li>
          <li>tools that scrape personal data without consent</li>
          <li>malware/&quot;undetectable&quot; AI-detector bypass</li>
          <li>competitor attack ads</li>
          <li>fake urgency</li>
          <li>Buying or altering catalog rankings, quiz results, reviews, or the featured flag</li>
          <li>Undisclosed or unlabeled ads</li>
          <li>Platforms excluded for documented scam, safety, or &quot;not actually AI&quot; facts</li>
          <li>Child-sexual-abuse material, non-consensual intimate imagery, or sexual content involving minors</li>
          <li>Weapons, explosives, or other illegal goods and services</li>
          <li>Deceptive claims we cannot source to the vendor&apos;s own pages</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-400/90">
          [Draft: Business Ops]
        </p>
        <h2 className="text-xl font-semibold text-white">Booking, payment, cancellation, refunds</h2>
        {/* BUSINESS-OPS: replace */}
        <p className="text-sm text-gray-400">
          Payment, cancellation and refund terms: [Draft: Business Ops]. Prices: [Business Ops].
          Lead time [N business days]. Contact: [email].
        </p>
      </section>
    </div>
  );
}
