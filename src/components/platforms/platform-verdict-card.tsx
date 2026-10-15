import { Scale, Target } from "lucide-react";
import { FactCite } from "@/components/platforms/fact-cite";
import { stripInlineCitations } from "@/lib/platform-display";
import type { Fact } from "@/data/facts/types";
import { LaunchpadArt } from "@/components/brand/launchpad-art";

type PlatformVerdictCardProps = {
  name: string;
  verdictFact?: Fact<string>;
  fallbackText: string | null;
  idealUserTypes: string[];
  useCases?: string | null;
};

export function PlatformVerdictCard({
  name,
  verdictFact,
  fallbackText,
  idealUserTypes,
  useCases,
}: PlatformVerdictCardProps) {
  const summary = stripInlineCitations(verdictFact?.value ?? fallbackText ?? "");
  const body =
    summary ||
    `We're still expanding this ${name} profile—check the official site for the latest capabilities.`;
  const useCasesText = useCases?.trim() ? stripInlineCitations(useCases) : "";

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-amber-200/25 bg-gradient-to-br from-amber-100/10 via-gray-900/70 to-gray-950 p-6 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden opacity-65 [mask-image:linear-gradient(to_right,transparent_55%,black_90%)] md:block"><LaunchpadArt kind="guide" /></div>
      <div className="relative md:max-w-[66%]">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">The Launchpad take</p>
      <div className="mb-4 flex items-center gap-2 text-amber-300">
        <Scale className="h-5 w-5" aria-hidden />
        <h2 className="text-2xl font-semibold tracking-tight text-amber-50">Verdict</h2>
        <FactCite fact={verdictFact} />
      </div>
      <p className="text-base leading-relaxed text-gray-100 sm:text-lg">{body}</p>
      {useCasesText && (
        <p className="mt-3 text-sm leading-relaxed text-gray-400">{useCasesText}</p>
      )}
      {idealUserTypes.length > 0 && (
        <div className="mt-4 border-t border-orange-500/15 pt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-orange-300">
            <Target className="h-3.5 w-3.5" aria-hidden />
            Best for
          </p>
          <div className="flex flex-wrap gap-2">
            {idealUserTypes.map((t) => (
              <span key={t} className="rounded-full border border-amber-100/15 bg-gray-950/40 px-3 py-1 text-xs text-amber-50/90">
                {t.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
