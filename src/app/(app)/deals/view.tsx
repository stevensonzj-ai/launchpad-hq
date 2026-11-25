import Link from "next/link";

import type { DealsPageModel, DealsOfferView, DealsSectionView } from "@/app/(app)/deals/model";
import { AffiliateDisclosure } from "@/components/sponsors/affiliate-disclosure";

const SECTION_INTRO: Record<DealsSectionView["id"], string> = {
  trial: "Time-limited trials we checked on the vendor's site. A trial is not a free plan.",
  student: "Discounts and free student plans for verified students, educators, or schools.",
  codes: "Sales and promo codes. A code with no stated end date stays up until the vendor's page changes or our check goes stale.",
  free: "Free plans already verified in the catalog. This list is long, so it stays closed until you open it.",
};

function OfferCard({ offer }: { offer: DealsOfferView }) {
  return (
    <article className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
      <h3 className="text-lg font-semibold text-white">{offer.name}</h3>
      <p className="mt-1 text-sm font-medium text-orange-300">{offer.title}</p>
      <p className="mt-2 text-sm text-gray-300">{offer.details}</p>
      {offer.eligibility ? <p className="mt-2 text-sm text-gray-400">Who it's for: {offer.eligibility}</p> : null}
      {offer.code ? (
        <p className="mt-2 text-sm text-gray-300">
          Code: <code className="text-gray-100">{offer.code}</code>
        </p>
      ) : null}
      {offer.endsLabel ? <p className="mt-2 text-sm text-gray-400">{offer.endsLabel}.</p> : null}
      <p className="mt-3 text-sm">
        <a href={offer.href} rel={offer.rel} target="_blank" className="text-orange-400 hover:underline">
          Open {offer.name}
        </a>
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Checked {offer.lastChecked}.{" "}
        <a href={offer.sourceUrl} rel="noopener noreferrer" target="_blank" className="text-orange-400 hover:underline">
          Source for {offer.name}
        </a>
      </p>
      {offer.affiliate ? <AffiliateDisclosure name={offer.name} affiliate={offer.affiliate} className="mt-3" /> : null}
    </article>
  );
}

function OfferList({ offers }: { offers: readonly DealsOfferView[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {offers.map((offer) => (
        <li key={`${offer.slug}-${offer.title}`}>
          <OfferCard offer={offer} />
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section }: { section: DealsSectionView }) {
  const headingId = `deals-${section.id}`;
  if (section.offers.length === 0) {
    return (
      <section aria-labelledby={headingId} className="mt-12">
        <h2 id={headingId} className="text-xl font-semibold text-white">
          {section.title}
        </h2>
        <p className="mt-2 text-sm text-gray-500">Nothing in this section is current.</p>
      </section>
    );
  }
  if (section.collapsed) {
    return (
      <section aria-labelledby={headingId} className="mt-12">
        <details className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
          <summary id={headingId} className="cursor-pointer text-xl font-semibold text-white">
            {section.title} ({section.offers.length})
          </summary>
          <p className="mt-3 text-sm text-gray-400">{SECTION_INTRO[section.id]}</p>
          <OfferList offers={section.offers} />
        </details>
      </section>
    );
  }
  return (
    <section aria-labelledby={headingId} className="mt-12">
      <h2 id={headingId} className="text-xl font-semibold text-white">
        {section.title}
      </h2>
      <p className="mt-2 text-sm text-gray-400">{SECTION_INTRO[section.id]}</p>
      <OfferList offers={section.offers} />
    </section>
  );
}

export function DealsPageView({ model }: { model: DealsPageModel }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Deals and free trials</h1>
      <p className="mt-3 text-sm text-gray-400">
        Free trials, student discounts, promo codes, and free plans for people trying AI tools for the first
        time. Each one was checked on the vendor&apos;s own site. Confirm it there before you pay. Nothing on
        this page changes the order of tools anywhere else on Launchpad HQ.
      </p>
      <p className="mt-3 text-sm text-gray-400">
        Some links on this page are affiliate links. If you subscribe through one, the vendor pays Launchpad HQ a
        commission. It doesn&apos;t affect our rankings, quiz results or reviews.{" "}
        <Link href="/how-we-make-money" className="text-orange-400 hover:underline">
          How we make money
        </Link>
        .
      </p>
      {model.sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}
    </div>
  );
}
