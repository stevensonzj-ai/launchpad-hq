import { getStaticTutorialForPlatform } from "@/data/tutorials";
import type { TutorialArchetype } from "@/data/tutorials";

// Section-G heading depends on the tutorial archetype.
const STARTER_HEADING: Record<TutorialArchetype, string> = {
  prompts: "Starter prompts to try",
  recipes: "Starter automations to try",
  "pick-and-setup": "First things to try & getting set up",
};

const CARD = "rounded-xl border border-gray-800 bg-gray-900/90 p-6 sm:p-7";
// Style for section headings. Rendered as <h3> (the tutorial title is the
// <h2>, which itself sits under the platform-detail page's <h1>).
const SECTION_HEADING = "text-lg font-semibold text-white";
const BODY = "text-sm leading-relaxed text-gray-300";

type PlatformTutorialsProps = {
  platformName: string;
  platformSlug: string;
};

export function PlatformTutorials({ platformName, platformSlug }: PlatformTutorialsProps) {
  const tutorial = getStaticTutorialForPlatform(platformSlug);

  if (!tutorial) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">
        <h2 className="text-lg font-semibold text-white">Tutorials</h2>
        <p className="mt-1 text-sm text-gray-400">
          Step-by-step guides for <span className="text-gray-300">{platformName}</span>
        </p>
        <p className="mt-6 rounded-lg border border-dashed border-gray-700 bg-gray-950/50 px-4 py-10 text-center text-sm text-gray-500">
          Coming soon — we&apos;re writing guides for this platform.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title + tagline + last reviewed */}
      <header className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-gray-900 to-gray-900 p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-orange-400/90">Tutorial</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{tutorial.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">{tutorial.tagline}</p>
        <p className="mt-3 text-xs text-gray-500">
          Last reviewed {tutorial.lastReviewedAt} · for {platformName}
        </p>
      </header>

      {/* How it works */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>How it works</h3>
        <p className={`mt-4 ${BODY}`}>{tutorial.howItWorks}</p>
      </section>

      {/* What it is */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>What it is</h3>
        <div className="mt-4 space-y-2">
          {tutorial.whatItIs.map((item) => (
            <p key={item} className={BODY}>{item}</p>
          ))}
        </div>
      </section>

      {/* Before you start */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>Before you start</h3>
        <div className="mt-4 space-y-2">
          {tutorial.beforeYouStart.map((item) => (
            <p key={item} className={BODY}>{item}</p>
          ))}
        </div>
      </section>

      {/* Getting set up safely — only when present */}
      {tutorial.gettingSetUpSafely && (
        <section className={CARD}>
          <h3 className={SECTION_HEADING}>Getting set up safely</h3>
          <p className={`mt-4 ${BODY}`}>
            <span className="font-medium text-orange-300">Official source:</span>{" "}
            {tutorial.gettingSetUpSafely.officialSource}
          </p>
          <div className="mt-3 space-y-2">
            {tutorial.gettingSetUpSafely.body.map((paragraph) => (
              <p key={paragraph} className={BODY}>{paragraph}</p>
            ))}
          </div>
          {tutorial.gettingSetUpSafely.vendorDocsUrl && (
            <a
              href={tutorial.gettingSetUpSafely.vendorDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-orange-400 hover:text-orange-300"
            >
              Official docs ↗
            </a>
          )}
        </section>
      )}

      {/* Security & privacy */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>Security &amp; privacy</h3>
        <div className="mt-4 space-y-2">
          {tutorial.security.map((item) => (
            <p key={item} className={BODY}>{item}</p>
          ))}
        </div>
      </section>

      {/* Capability triad */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>What it&apos;s good (and not good) at</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-green-400">Best at</h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.bestAt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300">Okay at</h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.okayAt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-3">
            <h4 className="text-sm font-semibold text-red-400">Avoid</h4>
            <ul className={`mt-2 space-y-1.5 list-disc pl-5 ${BODY}`}>
              {tutorial.triad.avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Starter actions — heading switches on archetype */}
      <section>
        <h3 className={SECTION_HEADING}>{STARTER_HEADING[tutorial.archetype]}</h3>
        <div className="mt-4 space-y-4">
          {tutorial.starterActions.map((action) => (
            <article key={action.title} className="rounded-xl border border-gray-800 bg-gray-900/90 p-5 sm:p-6">
              <h4 className="text-base font-semibold text-white">{action.title}</h4>
              <p className={`mt-2 ${BODY}`}>{action.whatItDoes}</p>
              <p className="mt-3 text-sm leading-relaxed text-orange-100/95">
                <span className="font-medium text-orange-300">Why this one:</span> {action.whyHere}
              </p>
              {action.tweak && (
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  <span className="font-medium text-gray-300">Tweak:</span> {action.tweak}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Pitfalls */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>Common pitfalls</h3>
        <ul className={`mt-4 space-y-1.5 list-disc pl-5 ${BODY}`}>
          {tutorial.pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Where to next */}
      <section className={CARD}>
        <h3 className={SECTION_HEADING}>Where to next</h3>
        <div className="mt-4 space-y-2">
          {tutorial.whereToNext.map((item) => (
            <p key={item} className={BODY}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
