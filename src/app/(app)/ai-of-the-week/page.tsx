import type { Metadata } from "next";
import { getActivePlacement, listAiOfTheWeekArchive } from "@/data/sponsors";
import { SponsorDisclosure } from "@/components/sponsors/sponsor-disclosure";
import { SponsoredLabel } from "@/components/sponsors/sponsored-label";

export const metadata: Metadata = {
  title: "AI of the Week (Sponsored) | Launchpad HQ",
  description: "A labeled paid placement with LaunchpadHQ’s honest take. Hidden when nothing is booked.",
};

export const revalidate = 3600;

export default function AiOfTheWeekPage() {
  const current = getActivePlacement("ai-of-the-week");
  const archive = listAiOfTheWeekArchive();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-4 flex items-center gap-3">
        <SponsoredLabel />
      </div>
      <h1 className="text-3xl font-bold text-white">AI of the Week (Sponsored)</h1>
      <SponsorDisclosure className="mt-3" />

      {!current ? (
        <p className="mt-10 rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">
          No sponsored AI of the Week is booked right now.
        </p>
      ) : (
        <article className="mt-10 space-y-6">
          {current.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote sponsor hero
            <img
              src={current.heroImageUrl}
              alt=""
              width={1600}
              height={900}
              className="w-full rounded-xl border border-gray-800 object-cover"
            />
          ) : null}
          <p className="text-sm text-gray-500">{current.sponsorName}</p>
          <h2 className="text-2xl font-semibold text-white">{current.headline}</h2>
          <p className="text-gray-300">{current.blurb}</p>
          {current.featureBody ? (
            <div className="space-y-4 text-sm leading-relaxed text-gray-300">
              {current.featureBody.split("\n").map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          ) : null}
          {current.bullets && current.bullets.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              {current.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <a
            href={current.ctaUrl}
            rel="sponsored noopener"
            target="_blank"
            className="inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            {current.ctaLabel}
          </a>
          <section className="rounded-xl border border-gray-700 bg-gray-900/70 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              Our honest take
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              {current.honestTake ??
                "We have not written an honest-take note for this booking yet."}
            </p>
          </section>
        </article>
      )}

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Archive</h2>
        {archive.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No past sponsored features yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {archive.map((item) => (
              <li key={item.id} className="rounded-lg border border-gray-800 p-4">
                <SponsoredLabel />
                <p className="mt-2 font-medium text-white">{item.headline}</p>
                <p className="text-sm text-gray-500">
                  {item.sponsorName} · {item.startDate} – {item.endDate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
