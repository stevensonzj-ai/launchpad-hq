import { Layers, Sparkles, Zap } from "lucide-react";

type OverviewPlatform = {
  contentTypes: string[];
  outputFormats: string[];
};

export function PlatformOverviewSections({ platform }: { platform: OverviewPlatform }) {
  if (platform.contentTypes.length === 0 && platform.outputFormats.length === 0) {
    return null;
  }

  return (
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
  );
}
