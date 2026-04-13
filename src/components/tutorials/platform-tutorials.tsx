import { getStaticTutorialForPlatform } from "@/data/tutorials";

function sectionEmoji(heading: string): string {
  const h = heading.toLowerCase();
  if (h.includes("disclaimer")) return "⚠️";
  if (h.includes("account")) return "👤";
  if (h.includes("what can")) return "✨";
  if (h.includes("prompt")) return "💬";
  if (h.includes("strength") || h.includes("weakness")) return "⚖️";
  if (h.includes("free tier") || h.includes("limit")) return "📊";
  if (h.includes("next")) return "🚀";
  return "📌";
}

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
      <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-gray-900 to-gray-900 p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-orange-400/90">Tutorial</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{tutorial.title}</h2>
        <p className="mt-2 text-sm text-gray-400">
          Curated walkthrough for <span className="text-gray-300">{platformName}</span>
        </p>
      </div>

      <div className="space-y-5">
        {tutorial.sections.map((section) => (
          <article
            key={section.heading}
            className="rounded-xl border border-gray-800 bg-gray-900/90 p-6 shadow-sm transition-colors hover:border-gray-700 sm:p-7"
          >
            <h3 className="flex items-start gap-3 text-lg font-semibold text-white">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-xl"
                aria-hidden
              >
                {sectionEmoji(section.heading)}
              </span>
              <span className="pt-1.5 leading-snug">{section.heading}</span>
            </h3>
            <div className="mt-4 border-t border-gray-800/80 pt-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{section.content}</div>
              {section.note && (
                <div className="mt-4 rounded-lg border border-orange-500/25 bg-orange-500/10 px-4 py-3 text-sm text-orange-100/95">
                  <span className="font-medium text-orange-300">Note:</span> {section.note}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
