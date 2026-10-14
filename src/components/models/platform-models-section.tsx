import Link from "next/link";
import type { PlatformModelFamily } from "@/data/models";
import { formatPriceFact, formatTokenFact, formatVerifiedDate } from "@/lib/model-facts";

function StatusBadge({ status }: { status: "current" | "legacy" }) {
  if (status === "current") {
    return (
      <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-orange-300">
        Current
      </span>
    );
  }
  return (
    <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">
      Prior gen
    </span>
  );
}

function UnverifiedMark({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="ml-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">unverified</span>;
}

export function PlatformModelsSection({
  family,
  heading = "Models",
}: {
  family: PlatformModelFamily;
  heading?: string;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{heading}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Last verified {formatVerifiedDate(family.lastVerifiedAt)}. Figures that could not be
            confirmed on an official vendor page are marked unverified — we do not guess.
          </p>
        </div>
        <Link
          href={`/models/${family.familySlug}`}
          className="text-sm text-orange-400 hover:text-orange-300"
        >
          Full {family.displayName} comparison
        </Link>
      </div>

      {family.whichToUse.length > 0 && (
        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900/50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Which one should I use?
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
            {family.whichToUse.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile: stacked cards */}
      <div className="space-y-4 md:hidden">
        {family.versions.map((version) => {
          const primarySource = version.sourceUrls[0] ?? family.sources[0];
          return (
            <article
              key={version.id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-white">{version.name}</h3>
                <StatusBadge status={version.status} />
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-gray-500">Context</dt>
                  <dd className="text-gray-200">
                    {formatTokenFact(version.contextWindow)}
                    <UnverifiedMark show={!version.contextWindow.verified} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Max output</dt>
                  <dd className="text-gray-200">
                    {formatTokenFact(version.maxOutput)}
                    <UnverifiedMark show={!version.maxOutput.verified} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">API input / 1M</dt>
                  <dd className="text-gray-200">
                    {formatPriceFact(version.apiPriceInput)}
                    <UnverifiedMark show={!version.apiPriceInput.verified} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">API output / 1M</dt>
                  <dd className="text-gray-200">
                    {formatPriceFact(version.apiPriceOutput)}
                    <UnverifiedMark show={!version.apiPriceOutput.verified} />
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-gray-300">
                <span className="font-medium text-gray-200">Best for: </span>
                {version.bestFor}
              </p>
              <p className="mt-2 text-xs text-gray-500">{version.consumerAccess.summary}</p>
              {primarySource && (
                <a
                  href={primarySource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-orange-400 hover:text-orange-300"
                >
                  Source: {primarySource.label}
                </a>
              )}
            </article>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-800 md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-900 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Version</th>
              <th className="px-4 py-3 font-medium">Context</th>
              <th className="px-4 py-3 font-medium">Max out</th>
              <th className="px-4 py-3 font-medium">API in / 1M</th>
              <th className="px-4 py-3 font-medium">API out / 1M</th>
              <th className="px-4 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {family.versions.map((version) => {
              const primarySource = version.sourceUrls[0] ?? family.sources[0];
              return (
                <tr key={version.id} className="bg-gray-950/40">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{version.name}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <StatusBadge status={version.status} />
                      {version.apiId && (
                        <code className="text-[11px] text-gray-500">{version.apiId}</code>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    {formatTokenFact(version.contextWindow)}
                    <UnverifiedMark show={!version.contextWindow.verified} />
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    {formatTokenFact(version.maxOutput)}
                    <UnverifiedMark show={!version.maxOutput.verified} />
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    {formatPriceFact(version.apiPriceInput)}
                    <UnverifiedMark show={!version.apiPriceInput.verified} />
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    {formatPriceFact(version.apiPriceOutput)}
                    <UnverifiedMark show={!version.apiPriceOutput.verified} />
                  </td>
                  <td className="px-4 py-3">
                    {primarySource ? (
                      <a
                        href={primarySource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300"
                      >
                        {primarySource.label}
                      </a>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
