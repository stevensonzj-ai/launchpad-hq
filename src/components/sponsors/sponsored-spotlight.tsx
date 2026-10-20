import { OutboundLink } from "@/components/analytics/outbound-link";
import type { SponsorPlacement } from "@/data/sponsors/types";
import { SponsorDisclosure } from "./sponsor-disclosure";
import { SponsoredLabel } from "./sponsored-label";

export function SponsoredSpotlight({
  placement,
  badge,
}: {
  placement: SponsorPlacement;
  badge?: string;
}) {
  const image = placement.spotlightImageUrl ?? placement.heroImageUrl ?? placement.logoUrl;

  return (
    <aside
      className="rounded-xl border border-orange-500/25 bg-gray-900/60 p-4 sm:p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        {badge ? (
          <span className="inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-orange-200 ring-1 ring-orange-500/40">
            {badge}
          </span>
        ) : (
          <SponsoredLabel />
        )}
        <span className="text-sm text-gray-400">{placement.sponsorName}</span>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- sponsor assets are remote https URLs, not in /public */}
        <img
          data-hourly-rocket-target
          src={image}
          alt=""
          width={320}
          height={168}
          className="aspect-[40/21] h-auto w-full max-w-xs self-start rounded-lg border border-gray-800 object-contain sm:w-40"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-white">{placement.headline}</h2>
          <p className="mt-1 text-sm text-gray-400">{placement.blurb}</p>
          {placement.bullets && placement.bullets.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-300">
              {placement.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <OutboundLink
            href={placement.ctaUrl}
            platform={placement.id}
            surface="sponsor_spotlight"
            eventName="sponsor_clickout"
            rel="sponsored noopener"
            target="_blank"
            className="mt-3 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            {placement.ctaLabel}
          </OutboundLink>
        </div>
      </div>
      <SponsorDisclosure className="mt-4" />
    </aside>
  );
}
