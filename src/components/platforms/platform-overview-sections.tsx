import { Gauge, Layers, Sparkles, Zap } from "lucide-react";
import {
  DIFFICULTY_LABEL,
  PRIVACY_LEVEL_LABEL,
} from "@/lib/labels";
import { stripInlineCitations } from "@/lib/platform-display";

type OverviewPlatform = {
  primaryUseCases: string | null;
  difficultyLevel: string;
  timeToProductivity: string | null;
  learningCurve: string | null;
  contentTypes: string[];
  outputFormats: string[];
  privacyLevel: string;
};

export function PlatformOverviewSections({ platform }: { platform: OverviewPlatform }) {
  const difficultyLabel =
    DIFFICULTY_LABEL[platform.difficultyLevel] ?? platform.difficultyLevel;
  const privacy = PRIVACY_LEVEL_LABEL[platform.privacyLevel] ?? platform.privacyLevel;
  const timeToProductivity = platform.timeToProductivity?.trim();
  const learningCurve = platform.learningCurve?.trim();
  const useCases = platform.primaryUseCases?.trim()
    ? stripInlineCitations(platform.primaryUseCases)
    : "";

  const metaItems: { label: string; value: string }[] = [
    { label: "Difficulty", value: difficultyLabel },
    ...(timeToProductivity ? [{ label: "Time to productivity", value: timeToProductivity }] : []),
    { label: "Privacy", value: privacy },
    ...(learningCurve ? [{ label: "Learning curve", value: learningCurve }] : []),
  ];

  return (
    <div className="space-y-8">
      {useCases && (
        <p className="text-sm leading-relaxed text-gray-400">
          <span className="font-medium text-gray-300">Use cases: </span>
          {useCases}
        </p>
      )}

      <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <div className="mb-5 flex items-center gap-2 text-orange-300">
          <Gauge className="h-5 w-5" aria-hidden />
          <h2 className="text-lg font-semibold text-white">At a glance</h2>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {metaItems.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {(platform.contentTypes.length > 0 || platform.outputFormats.length > 0) && (
        <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-2 text-gray-200">
            <Layers className="h-5 w-5 text-sky-400" aria-hidden />
            <h2 className="text-lg font-semibold text-white">Key capabilities</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {platform.contentTypes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Works with</p>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {platform.contentTypes.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-orange-400/80" aria-hidden />
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
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-400/80" aria-hidden />
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
