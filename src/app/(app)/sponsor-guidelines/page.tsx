import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor guidelines | Launchpad HQ",
  description: "What a LaunchpadHQ sponsor placement is, asset specs, and what we will not accept.",
};

export const revalidate = 3600;

export default function SponsorGuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Sponsor Guidelines</h1>
      <p className="mt-3 text-gray-400">
        Launchpad HQ is a free directory that helps people find the right AI tools, and sponsorships
        keep it free. This page covers what you can book, how we label it, what we accept and how
        booking works. Launchpad HQ (launchpadhq.io) is operated by Lakeside Innovation Labs LLC, a
        Texas limited liability company.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What sponsorship includes</h2>
        <p className="text-sm text-gray-400">
          Every slot runs for one week (Monday to Sunday, US Central Time) and is labeled{" "}
          <strong className="font-semibold text-gray-200">&quot;Sponsored.&quot;</strong>
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">AI of the Week.</strong> Our top slot: a
            dedicated page at{" "}
            <Link href="/ai-of-the-week" className="text-orange-400 hover:underline">
              /ai-of-the-week
            </Link>{" "}
            with your hero image, a 150–400 word feature, up to 3 bullets and a call-to-action
            button, plus an optional post on X and, once our newsletter launches, its lead spot. One
            sponsor per week.
          </li>
          <li>
            <strong className="font-semibold text-white">Discover Spotlight.</strong> A sponsored
            banner at the top of the Discover page with your logo, headline, blurb and link.
            It&apos;s clearly labeled &quot;Sponsored&quot; and kept separate from the organic
            results below it, which it never reorders.
          </li>
          <li>
            <strong className="font-semibold text-white">Newsletter Sponsor (Coming soon).</strong> A
            sponsor block in our newsletter, labeled &quot;Sponsored.&quot; Details will be shared
            when it launches.
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          Contact us for rates at{" "}
          <a
            href="mailto:launchpadhq.admin@gmail.com"
            className="text-orange-400 hover:underline"
          >
            launchpadhq.admin@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Editorial independence</h2>
        <p className="text-sm text-gray-400">
          Sponsorship buys visibility. It never buys rankings, reviews or ratings.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            Sponsored tools get no boost in our quiz, Discover ordering, workflow templates,
            tutorials or &quot;best for&quot; picks.
          </li>
          <li>Your organic listing, scores and data stay exactly as they are.</li>
          <li>
            On AI of the Week, we write the &quot;Our honest take&quot; box ourselves. Sponsors
            can&apos;t edit or pre-approve it.
          </li>
          <li>Sponsors must meet the same standards as every tool in our catalog.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">How we disclose sponsorships</h2>
        <p className="text-sm text-gray-400">
          Following FTC guidance, every paid placement is labeled{" "}
          <strong className="font-semibold text-gray-200">&quot;Sponsored&quot;</strong>, wherever it
          appears:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">On the site:</strong> &quot;Sponsored&quot;
            sits at the top of every paid unit in readable text, with the line &quot;Paid placement.
            Sponsors don&apos;t affect our rankings, quiz results or reviews&quot; and a link to our{" "}
            <Link href="/how-we-make-money" className="text-orange-400 hover:underline">
              How We Make Money
            </Link>{" "}
            page. Sponsored links are marked{" "}
            <code className="text-gray-200">rel=&quot;sponsored&quot;</code>.
          </li>
          <li>
            <strong className="font-semibold text-white">In the newsletter:</strong> sponsor blocks
            are headed &quot;Sponsored.&quot;
          </li>
          <li>
            <strong className="font-semibold text-white">On X:</strong> sponsored posts start with
            &quot;Sponsored&quot; or &quot;#ad,&quot; and we use X&apos;s paid-partnership label
            where available.
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          We never run an unlabeled placement, and we never use &quot;Partner&quot; or
          &quot;Featured&quot; alone in place of &quot;Sponsored.&quot;
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What we accept, and what we decline</h2>
        <p className="text-sm text-gray-400">
          We accept tools that are real, work as described and would belong in our catalog. Every
          claim in your copy must be checkable on your official website, and we may edit copy for
          length, clarity or accuracy.
        </p>
        <p className="text-sm text-gray-400">We decline:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            Misleading or unverifiable claims, including medical, legal or financial-return promises
          </li>
          <li>Unlawful products or services, including weapons and other illegal goods</li>
          <li>Adult or sexual content, and gambling</li>
          <li>
            Tools that collect or harvest personal data without clear disclosure and consent
          </li>
          <li>Deepfake or non-consensual likeness tools</li>
          <li>Malware, or &quot;undetectable&quot; AI-detector bypass tools</li>
          <li>Competitor attack ads and fake urgency</li>
          <li>
            Tools we&apos;ve excluded for documented scam, safety or &quot;not actually AI&quot;
            problems
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          We reserve the right to refuse or remove any sponsorship at our discretion, including
          after booking if new information comes to light.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Creative and asset requirements</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">Logo:</strong> square PNG or SVG, at least
            256×256, transparent background, up to 200 KB
          </li>
          <li>
            <strong className="font-semibold text-white">Discover Spotlight image (optional):</strong>{" "}
            1200×630, JPG, PNG or WebP, up to 500 KB
          </li>
          <li>
            <strong className="font-semibold text-white">AI of the Week hero:</strong> 1600×900, up
            to 800 KB, with no text beyond your logo
          </li>
          <li>
            <strong className="font-semibold text-white">Headline:</strong> up to 90 characters.{" "}
            <strong className="font-semibold text-white">Blurb:</strong> up to 200 characters.
          </li>
          <li>
            <strong className="font-semibold text-white">AI of the Week feature:</strong> 150–400
            words, plus up to 3 bullets of up to 80 characters each
          </li>
          <li>
            <strong className="font-semibold text-white">Link:</strong> one https URL. UTM tags are
            fine; no redirects or third-party trackers.
          </li>
          <li>
            <strong className="font-semibold text-white">X handle (optional),</strong> if you&apos;d
            like a tag
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          <strong className="font-semibold text-gray-200">Deadline:</strong> the asset deadline is
          provided with each booking. Late assets may move your slot to the next open week.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Booking and scheduling</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-300">
          <li>Email us with your tool, the slot you want and your preferred week(s).</li>
          <li>We check availability and confirm your tool meets these guidelines.</li>
          <li>We send a booking confirmation.</li>
          <li>You send assets by the deadline; we review them and set up the placement.</li>
          <li>After your week, we send a short post-run summary of available performance data.</li>
        </ol>
        <p className="text-sm text-gray-400">Slots are first come, first served.</p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Payment, cancellation and refunds</h2>
        <p className="text-sm text-gray-400">
          Payment, cancellation, and refund terms are provided with each booking.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Contact us</h2>
        <p className="text-sm text-gray-400">
          Questions, bookings or rates:{" "}
          <a
            href="mailto:launchpadhq.admin@gmail.com"
            className="text-orange-400 hover:underline"
          >
            <strong className="font-semibold">launchpadhq.admin@gmail.com</strong>
          </a>
        </p>
        <p className="text-sm text-gray-400">
          Launchpad HQ is operated by Lakeside Innovation Labs LLC (Texas).
        </p>
      </section>
    </div>
  );
}
