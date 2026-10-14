import { Scale, Target } from "lucide-react";
import { FactCite } from "@/components/platforms/fact-cite";
import { stripInlineCitations } from "@/lib/platform-display";
import type { Fact } from "@/data/facts/types";

type PlatformVerdictCardProps = {
  name: string;
  verdictFact?: Fact<string>;
  fallbackText: string | null;
  idealUserTypes: string[];
};

export function PlatformVerdictCard({
  name,
  verdictFact,
  fallbackText,
  idealUserTypes,
}: PlatformVerdictCardProps) {
  const summary = stripInlineCitations(verdictFact?.value ?? fallbackText ?? "");
  const body =
    summary ||
    `We're still expanding this ${name} profile—check the official site for the latest capabilities.`;

  return (
    <section className="rounded-xl border border-orange-500/20 bg-gradient-to-b from-gray-900/90 to-gray-900/40 p-6">
      <div className="mb-3 flex items-center gap-2 text-orange-400">
        <Scale className="h-5 w-5" aria-hidden />
        <h2 className="text-lg font-semibold text-white">Verdict</h2>
        <FactCite fact={verdictFact} />
      </div>
      <p className="text-sm leading-relaxed text-gray-200">{body}</p>
      {idealUserTypes.length > 0 && (
        <div className="mt-4 border-t border-orange-500/15 pt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-orange-300">
            <Target className="h-3.5 w-3.5" aria-hidden />
            Best for
          </p>
          <div className="flex flex-wrap gap-2">
            {idealUserTypes.map((t) => (
              <span key={t} className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                {t.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
