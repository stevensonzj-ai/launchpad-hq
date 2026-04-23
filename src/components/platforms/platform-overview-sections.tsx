import { BookOpen, Gauge, Layers, Sparkles, Target, Zap } from "lucide-react";

const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: "Beginner-friendly",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert / power users",
};

type OverviewPlatform = {
  description: string | null;
  primaryUse: string | null;
  primaryUseCases: string | null;
  difficultyLevel: string;
  idealUserTypes: string[];
  timeToProductivity: string | null;
  learningCurve: string | null;
  contentTypes: string[];
  outputFormats: string[];
  costTier: string;
  currentPricing: string | null;
  privacyLevel: string;
};

export function PlatformOverviewSections({ platform }: { platform: OverviewPlatform }) {
  const difficultyLabel =
    DIFFICULTY_LABEL[platform.difficultyLevel] ?? platform.difficultyLevel.toLowerCase();

  const desc = platform.description?.trim() ?? "";
  const primary = platform.primaryUse?.trim() ?? "";
  const fallback =
    "We're still expanding this profile—check the official site for the latest capabilities.";
  const leadLine = desc && primary && primary !== desc ? primary : null;
  const bodyText = desc || primary || fallback;

  const rawPricing = platform.currentPricing?.trim() || platform.costTier;
  const pricingTiers = rawPricing.split(";").map((t) => t.trim()).filter(Boolean);
  const multiTierPricing = pricingTiers.length > 1;
  const privacy = platform.privacyLevel.toLowerCase();
  const timeToProductivity = platform.timeToProductivity?.trim();
  const learningCurve = platform.learningCurve?.trim();

  const metaItems: { label: string; value: string }[] = [
    { label: "Difficulty", value: difficultyLabel },
    ...(timeToProductivity ? [{ label: "Time to productivity", value: timeToProductivity }] : []),
    { label: "Privacy", value: privacy },
    ...(learningCurve ? [{ label: "Learning curve", value: learningCurve }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <section className="rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-900/40 p-6">
        <div className="mb-3 flex items-center gap-2 text-orange-400">
          <BookOpen className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-white">Overview</h2>
        </div>
        {leadLine && <p className="mb-3 text-base font-medium text-gray-200">{leadLine}</p>}
        <p className="text-sm leading-relaxed text-gray-300">{bodyText}</p>
        {platform.primaryUseCases?.trim() && (
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            <span className="font-medium text-gray-300">Best for: </span>
            {platform.primaryUseCases}
          </p>
        )}
      </section>

      {/* At a glance */}
      <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="mb-5 flex items-center gap-2 text-orange-300">
          <Gauge className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-white">At a glance</h2>
        </div>
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Pricing</p>
          {multiTierPricing ? (
            <div className="flex flex-wrap gap-2">
              {pricingTiers.map((tier) => (
                <span key={tier} className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                  {tier}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-white">{rawPricing}</p>
          )}
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {metaItems.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>
        {platform.idealUserTypes.length > 0 && (
          <div className="mt-5 border-t border-orange-500/20 pt-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-orange-300">
              <Target className="h-3.5 w-3.5" />
              Ideal for
            </p>
            <div className="flex flex-wrap gap-2">
              {platform.idealUserTypes.map((t) => (
                <span key={t} className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Key capabilities */}
      {(platform.contentTypes.length > 0 || platform.outputFormats.length > 0) && (
        <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-2 text-gray-200">
            <Layers className="h-5 w-5 text-sky-400" />
            <h2 className="text-lg font-semibold text-white">Key capabilities</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {platform.contentTypes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Works with</p>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {platform.contentTypes.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-orange-400/80" />
                      <span>{t.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {platform.outputFormats.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Outputs</p>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {platform.outputFormats.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-400/80" />
                      <span>{t.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
