import Link from "next/link";

const MAIL = "launchpadhq.admin@gmail.com";

/**
 * Sponsor guidelines copy from sponsor-guidelines-copy-ship-v2.md, used only
 * on /advertise so /sponsor-guidelines can redirect without duplicating text.
 */
export function AdvertiseGuidelines() {
  return (
    <>
      <p className="mt-3 text-gray-400">
        Launchpad HQ is a free directory that helps people find the right AI tools, and
        sponsorships keep it free. This page covers what you can book, how we label it, what
        we accept and how booking works. Launchpad HQ (launchpadhq.io) is operated by Lakeside
        Innovation Labs LLC, a Texas limited liability company.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">What sponsorship includes</h2>
        <p className="text-sm text-gray-400">
          Every slot runs for one week (Monday to Sunday, US Central Time) and is labeled{" "}
          <strong className="font-semibold text-gray-200">&quot;Sponsored.&quot;</strong> There
          are two paid placements on the site:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">AI of the Week.</strong> Our top
            slot: a dedicated page at /ai-of-the-week with your hero image, a 150–400 word
            feature, up to 3 bullets and a call-to-action button, plus an optional post on X.
            One sponsor per week. <strong className="font-semibold text-white">$99/week.</strong>
          </li>
          <li>
            <strong className="font-semibold text-white">Discover Spotlight.</strong> A
            sponsored banner at the top of the Discover page with your logo, headline, blurb
            and link. It&apos;s clearly labeled &quot;Sponsored&quot; and kept separate from
            the organic results below it, which it never reorders. One sponsor per week.{" "}
            <strong className="font-semibold text-white">$49/week, or $149 for 4 weeks.</strong>
          </li>
          <li>
            <strong className="font-semibold text-white">Same-week bundle.</strong> Discover
            Spotlight plus AI of the Week in the same week:{" "}
            <strong className="font-semibold text-white">$129</strong> (instead of $148).
          </li>
        </ul>
        <p className="text-sm text-gray-400">All prices are in USD.</p>
        <p className="text-sm font-semibold text-gray-200">Coming later:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">Newsletter Sponsor.</strong> Not on
            sale yet. Email us to join the interest list and we&apos;ll let you know when it
            opens.
          </li>
          <li>
            <strong className="font-semibold text-white">Category exclusivity.</strong> A
            future add-on for sponsors who want to be the only tool shown in their category.
            Not available yet.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Founding sponsor offer</h2>
        <p className="text-sm text-gray-400">
          Our first 5 sponsors get 50% off their first booking and any rebookings made within
          3 months of it, up to a maximum of 4 weeks of slots per sponsor. A same-week bundle
          counts as one week. The discount applies to the standard weekly rates ($24.50/week
          for Discover Spotlight, $49.50/week for AI of the Week) and isn&apos;t combined with
          the 4-week or bundle prices; you always get whichever is lower.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Rate protection</h2>
        <p className="text-sm text-gray-400">
          Prices may rise as demand grows. Once you&apos;ve booked, your price is locked:
          booked rates and founding rates are honored even if our list prices go up.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Editorial independence</h2>
        <p className="text-sm text-gray-400">
          Sponsorship buys visibility. It never buys rankings, reviews or ratings.{" "}
          <strong className="font-semibold text-gray-200">
            Rankings, quiz results and workflows are never sold.
          </strong>
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
          <strong className="font-semibold text-gray-200">&quot;Sponsored&quot;</strong>,
          wherever it appears:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">On the site:</strong>{" "}
            &quot;Sponsored&quot; sits at the top of every paid unit in readable text, with
            the line &quot;Paid placement. Sponsors don&apos;t affect our rankings, quiz
            results or reviews&quot; and a link to our How We Make Money page. Sponsored links
            are marked <code className="text-gray-200">rel=&quot;sponsored&quot;</code>.
          </li>
          <li>
            <strong className="font-semibold text-white">In the newsletter:</strong> sponsor
            blocks are headed &quot;Sponsored.&quot;
          </li>
          <li>
            <strong className="font-semibold text-white">On X:</strong> sponsored posts start
            with &quot;Sponsored&quot; or &quot;#ad,&quot; and we use X&apos;s paid-partnership
            label where available.
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          We never run an unlabeled placement, and we never use &quot;Partner&quot; or
          &quot;Featured&quot; alone in place of &quot;Sponsored.&quot;
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Acceptance policy</h2>
        <p className="text-sm text-gray-400">
          We review every sponsor before the slot is confirmed, using the same vetting we
          apply to the tools listed in our catalog. We accept tools that are real, work as
          described and would belong in our catalog. Every claim in your copy must be
          checkable on your official website, and we may edit copy for length, clarity or
          accuracy.
        </p>
        <p className="text-sm text-gray-400">We decline:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            Misleading or unverifiable claims, including medical, legal or financial-return
            promises
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
            Tools we&apos;ve excluded for documented scam, safety or &quot;not actually
            AI&quot; problems
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          We may decline or remove any sponsorship at our discretion, including after booking
          if new information comes to light.{" "}
          <strong className="font-semibold text-gray-200">
            If we decline, you get a full refund.
          </strong>
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Creative and asset requirements</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">Logo:</strong> square PNG or SVG, at
            least 256×256, transparent background, up to 200 KB
          </li>
          <li>
            <strong className="font-semibold text-white">Discover Spotlight image (optional):</strong>{" "}
            1200×630, JPG, PNG or WebP, up to 500 KB
          </li>
          <li>
            <strong className="font-semibold text-white">AI of the Week hero:</strong> 1600×900,
            up to 800 KB, with no text beyond your logo
          </li>
          <li>
            <strong className="font-semibold text-white">Headline:</strong> up to 90 characters.{" "}
            <strong className="font-semibold text-white">Blurb:</strong> up to 200 characters.
          </li>
          <li>
            <strong className="font-semibold text-white">AI of the Week feature:</strong>{" "}
            150–400 words, plus up to 3 bullets of up to 80 characters each
          </li>
          <li>
            <strong className="font-semibold text-white">Link:</strong> one https URL. UTM tags
            are fine; no redirects or third-party trackers.
          </li>
          <li>
            <strong className="font-semibold text-white">X handle (optional),</strong> if
            you&apos;d like a tag
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          <strong className="font-semibold text-gray-200">Deadline:</strong> final assets are
          due 5 business days before your slot starts, and they go through the same vetting as
          the tools listed in our catalog. Late assets may move your slot to the next open
          week.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Booking and scheduling</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-300">
          <li>Email us with your tool, the slot you want and your preferred week(s).</li>
          <li>We check availability and confirm your tool meets these guidelines.</li>
          <li>We send a confirmation and a Stripe invoice.</li>
          <li>You send assets by the deadline; we review them and set up the placement.</li>
          <li>
            After your week, we send a short post-run summary of available performance data. We
            promise reach, not results.
          </li>
        </ol>
        <p className="text-sm text-gray-400">
          Slots are first come, first served, and a booking is confirmed once payment is
          received.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">Waitlist:</strong> if the week you
            want is full, we&apos;ll add you to the waitlist and email you if it opens up.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Payment terms</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>Payment is due 100% upfront, by Stripe invoice.</li>
          <li>No slot goes live unpaid.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Cancellation and refunds</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>
            <strong className="font-semibold text-white">
              If we decline or cancel your placement:
            </strong>{" "}
            full refund.
          </li>
          <li>
            <strong className="font-semibold text-white">
              If you cancel 7 or more days before your slot starts:
            </strong>{" "}
            full refund.
          </li>
          <li>
            <strong className="font-semibold text-white">
              If you cancel within 7 days of your slot:
            </strong>{" "}
            no cash refund; the full amount is credited toward a future slot. Credits are
            valid for 6 months.
          </li>
          <li>
            <strong className="font-semibold text-white">After your slot starts:</strong> no
            refund.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Make-goods</h2>
        <p className="text-sm text-gray-400">
          If your slot is down for more than 24 hours, or starts late or not at all, because
          of a problem on our side, we extend or reschedule it by the time lost. We promise
          reach, not results: we don&apos;t guarantee impressions, clicks or sales. Make-goods
          don&apos;t cover issues on your side, such as late assets or your own site being
          down.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Contact us</h2>
        <p className="text-sm text-gray-400">
          Questions, bookings, the waitlist or the newsletter interest list:{" "}
          <a href={`mailto:${MAIL}`} className="text-orange-400 hover:underline">
            <strong className="font-semibold">{MAIL}</strong>
          </a>
        </p>
        <p className="text-sm text-gray-400">
          Launchpad HQ is operated by Lakeside Innovation Labs LLC (Texas).
        </p>
        <p className="text-sm text-gray-500">
          Prefer the How We Make Money page?{" "}
          <Link href="/how-we-make-money" className="text-orange-400 hover:underline">
            How we make money
          </Link>
          .
        </p>
      </section>
    </>
  );
}
