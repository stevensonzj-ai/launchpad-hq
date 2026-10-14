import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getModelFamilyBySlug } from "@/data/models";
import type { ModelVersion } from "@/data/models";
import { formatPriceFact, formatTokenFact, formatVerifiedDate } from "@/lib/model-facts";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Claude vs GPT | Launchpad HQ",
  description: "Flagship and budget Claude and GPT versions, from official Anthropic and OpenAI docs.",
};

function pick(versions: ModelVersion[], id: string): ModelVersion | undefined {
  return versions.find((v) => v.id === id);
}

function Cell({ version, field }: { version: ModelVersion; field: "context" | "maxOut" | "in" | "out" | "access" }) {
  if (field === "context") {
    return (
      <span>
        {formatTokenFact(version.contextWindow)}
        {!version.contextWindow.verified && <span className="ml-1 text-[10px] uppercase text-gray-500">unverified</span>}
      </span>
    );
  }
  if (field === "maxOut") {
    return (
      <span>
        {formatTokenFact(version.maxOutput)}
        {!version.maxOutput.verified && <span className="ml-1 text-[10px] uppercase text-gray-500">unverified</span>}
      </span>
    );
  }
  if (field === "in") {
    return (
      <span>
        {formatPriceFact(version.apiPriceInput)}
        {!version.apiPriceInput.verified && <span className="ml-1 text-[10px] uppercase text-gray-500">unverified</span>}
      </span>
    );
  }
  if (field === "out") {
    return (
      <span>
        {formatPriceFact(version.apiPriceOutput)}
        {!version.apiPriceOutput.verified && <span className="ml-1 text-[10px] uppercase text-gray-500">unverified</span>}
      </span>
    );
  }
  return <span className="text-gray-400">{version.consumerAccess.summary}</span>;
}

export default function ClaudeVsGptPage() {
  const claude = getModelFamilyBySlug("claude");
  const gpt = getModelFamilyBySlug("gpt");
  if (!claude || !gpt) notFound();

  const rows: { label: string; claudeId: string; gptId: string }[] = [
    { label: "Flagship (API default / hardest work)", claudeId: "claude-opus-5-5", gptId: "gpt-6-astra" },
    { label: "Budget (cheap, fast, high volume)", claudeId: "claude-haiku-5-5", gptId: "gpt-6-luna" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/models"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All model families
      </Link>

      <h1 className="text-3xl font-bold text-white">Claude vs GPT</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">
        Flagship and budget only. Last verified {formatVerifiedDate(claude.lastVerifiedAt)} (same
        research day for both families). Consumer access and API prices are different products —
        ChatGPT Plus is not the same as the OpenAI API bill.
      </p>

      <div className="mt-8 space-y-6 md:hidden">
        {rows.map((row) => {
          const c = pick(claude.versions, row.claudeId);
          const g = pick(gpt.versions, row.gptId);
          if (!c || !g) return null;
          return (
            <section key={row.label} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-400">{row.label}</h2>
              {[c, g].map((version) => (
                <div key={version.id} className="mb-4 border-t border-gray-800 pt-4 first:border-t-0 first:pt-0">
                  <h3 className="font-medium text-white">{version.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{version.bestFor}</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Context {formatTokenFact(version.contextWindow)} · API {formatPriceFact(version.apiPriceInput)} in /{" "}
                    {formatPriceFact(version.apiPriceOutput)} out
                  </p>
                  {version.sourceUrls[0] && (
                    <a
                      href={version.sourceUrls[0].url}
                      className="mt-2 inline-block text-xs text-orange-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                  )}
                </div>
              ))}
            </section>
          );
        })}
      </div>

      <div className="mt-8 hidden overflow-x-auto rounded-xl border border-gray-800 md:block">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-gray-900 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium"> </th>
              {rows.flatMap((row) => {
                const c = pick(claude.versions, row.claudeId);
                const g = pick(gpt.versions, row.gptId);
                return [
                  <th key={row.claudeId} className="px-4 py-3 font-medium text-white">
                    {c?.name}
                    <div className="mt-1 font-normal normal-case text-gray-500">{row.label} · Claude</div>
                  </th>,
                  <th key={row.gptId} className="px-4 py-3 font-medium text-white">
                    {g?.name}
                    <div className="mt-1 font-normal normal-case text-gray-500">{row.label} · GPT</div>
                  </th>,
                ];
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {(
              [
                ["Context", "context"],
                ["Max output", "maxOut"],
                ["API input / 1M", "in"],
                ["API output / 1M", "out"],
                ["Consumer access", "access"],
              ] as const
            ).map(([label, field]) => (
              <tr key={field}>
                <th className="px-4 py-3 font-medium text-gray-400">{label}</th>
                {rows.flatMap((row) => {
                  const c = pick(claude.versions, row.claudeId);
                  const g = pick(gpt.versions, row.gptId);
                  return [c, g].map((version) =>
                    version ? (
                      <td key={`${field}-${version.id}`} className="px-4 py-3 text-gray-200">
                        <Cell version={version} field={field} />
                      </td>
                    ) : null,
                  );
                })}
              </tr>
            ))}
            <tr>
              <th className="px-4 py-3 font-medium text-gray-400">Source</th>
              {rows.flatMap((row) => {
                const c = pick(claude.versions, row.claudeId);
                const g = pick(gpt.versions, row.gptId);
                return [c, g].map((version) =>
                  version?.sourceUrls[0] ? (
                    <td key={`src-${version.id}`} className="px-4 py-3">
                      <a
                        href={version.sourceUrls[0].url}
                        className="text-orange-400 hover:text-orange-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {version.sourceUrls[0].label}
                      </a>
                    </td>
                  ) : (
                    <td key={`src-missing-${row.label}`} />
                  ),
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
