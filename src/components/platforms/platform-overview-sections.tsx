import {
  BookOpen,
  Clock,
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

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
          <p className="mt-4 border-t border-gray-800 pt-4 text-sm leading-relaxed text-gray-400">
            <span className="font-medium text-gray-300">Typical use cases: </span>
            {platform.primaryUseCases}
          </p>
        )}
      </section>

      {/* What it's best for */}
      <section className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
        <div className="mb-4 flex items-center gap-2 text-orange-300">
          <Target className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-white">What it&apos;s best for</h2>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-white">
            <GraduationCap className="h-3.5 w-3.5 text-orange-400" />
            {difficultyLabel}
          </span>
          {platform.costTier === "FREE" || platform.costTier === "FREEMIUM" ? (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Generous free / freemium options
            </span>
          ) : null}
          {platform.costTier === "PAID" || platform.costTier === "ENTERPRISE" ? (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-200">
              Pro-focused pricing
            </span>
          ) : null}
        </div>
        {platform.idealUserTypes.length > 0 && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Ideal users</p>
            <div className="flex flex-wrap gap-2">
              {platform.idealUserTypes.map((t) => (
                <span key={t} className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        {!platform.primaryUseCases?.trim() && (
          <p className="text-sm leading-relaxed text-gray-300">
            Matches the {difficultyLabel} crowd—use Discover or the quiz to compare alternatives for your exact goals.
          </p>
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

      {/* Getting started */}
      {(platform.timeToProductivity?.trim() || platform.learningCurve?.trim()) && (
        <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="mb-3 flex items-center gap-2 text-emerald-300">
            <Clock className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-white">Getting started</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            {platform.timeToProductivity?.trim() && (
              <p>
                <span className="font-medium text-white">Time to productivity: </span>
                {platform.timeToProductivity}
              </p>
            )}
            {platform.learningCurve?.trim() && (
              <p>
                <span className="font-medium text-white">Learning curve: </span>
                {platform.learningCurve}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
