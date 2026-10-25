import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CompareTool, CompareView } from "@/data/compare/view";
import { formatVerifiedDate } from "@/lib/model-facts";
import { CatalogLinkList } from "@/components/seo/catalog-link-list";

// Prices, free plans and limits below are the overlay strings, rendered as
// stored (dated catalog text included). Copy comes from the registry.

function FieldText({ value }: { value: string | null }) {
  if (!value?.trim()) return <span className="text-gray-500">Not listed</span>;
  return <span className="whitespace-pre-line break-words">{value}</span>;
}

function FreeOptionLabel({ text }: { text: string }) {
  return (
    <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
      {text}
    </p>
  );
}

function AsOfLine({ view }: { view: CompareView }) {
  return (
    <p className="mt-4 text-xs text-gray-400">
      {view.asOf
        ? `As of ${formatVerifiedDate(view.asOf)}: the oldest check date among the prices and free plans on this page.`
        : "Check dates are not recorded for the prices on this page."}
      {view.undatedTools.length > 0 &&
        ` Some catalog text carries no check date (${view.undatedTools.join(", ")}).`}
    </p>
  );
}

function HeadToHeadTable({ tools }: { tools: CompareTool[] }) {
  const rows: Array<[string, (tool: CompareTool) => string | null]> = [
    ["Free plan", (tool) => tool.freeTierFeatures],
    ["Usage limits", (tool) => tool.usageLimits],
    ["Pricing", (tool) => tool.currentPricing],
  ];
  const shownRows = rows.filter(([, get]) => tools.some((tool) => get(tool)?.trim()));
  return (
    <>
      <div className="mt-8 space-y-4 md:hidden">
        {tools.map((tool) => (
          <section key={tool.slug} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h2 className="text-lg font-semibold text-white">
              <Link href={tool.href} className="hover:text-orange-300">{tool.name}</Link>
            </h2>
            <dl className="mt-3 space-y-3 text-sm text-gray-200">
              {shownRows.map(([label, get]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
                  <dd className="mt-1"><FieldText value={get(tool)} /></dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <div className="mt-8 hidden overflow-x-auto rounded-xl border border-gray-800 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-900 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="w-36 px-4 py-3 font-medium"> </th>
              {tools.map((tool) => (
                <th key={tool.slug} className="px-4 py-3 text-base font-semibold normal-case text-white">
                  <Link href={tool.href} className="hover:text-orange-300">{tool.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {shownRows.map(([label, get]) => (
              <tr key={label} className="align-top">
                <th className="px-4 py-3 font-medium text-gray-400">{label}</th>
                {tools.map((tool) => (
                  <td key={tool.slug} className="px-4 py-3 text-gray-200">
                    <FieldText value={get(tool)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AlternativeCard({ tool }: { tool: CompareTool }) {
  const baseline = tool.role === "baseline";
  return (
    <section
      className={`rounded-xl border p-5 ${baseline ? "border-gray-800 bg-gray-900/40" : "border-gray-800 bg-gray-900"}`}
    >
      {baseline && (
        <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">The tool you are replacing</p>
      )}
      <h2 className="text-lg font-semibold text-white">
        <Link href={tool.href} className="hover:text-orange-300">{tool.name}</Link>
      </h2>
      {tool.freeOptionLabel && <FreeOptionLabel text={tool.freeOptionLabel} />}
      <dl className="mt-3 space-y-3 text-sm text-gray-200">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Free plan</dt>
          <dd className="mt-1"><FieldText value={tool.freeTierFeatures} /></dd>
        </div>
        {tool.usageLimits?.trim() ? (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">Usage limits</dt>
            <dd className="mt-1"><FieldText value={tool.usageLimits} /></dd>
          </div>
        ) : null}
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Pricing</dt>
          <dd className="mt-1"><FieldText value={tool.currentPricing} /></dd>
        </div>
      </dl>
      {tool.pick && <p className="mt-4 text-sm text-gray-300">{tool.pick}</p>}
    </section>
  );
}

function Sources({ tools }: { tools: CompareTool[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-lg font-semibold text-white">Sources</h2>
      <ul className="space-y-3 text-sm text-gray-400">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <span className="font-medium text-gray-200">{tool.name}</span>
            <ul className="mt-1 space-y-1 pl-4">
              {tool.sources.map((source) => (
                <li key={source.field}>
                  <span className="text-gray-500">{source.field}: </span>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sky-400 hover:text-sky-300"
                    >
                      {source.url}
                    </a>
                  ) : (
                    <span>no source link on file</span>
                  )}
                  <span className="text-gray-500">
                    {source.asOf ? ` (checked ${source.asOf})` : " (check date not recorded)"}
                  </span>
                </li>
              ))}
              {tool.sources.length === 0 && <li>No pricing on file.</li>}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ComparePageView({ view }: { view: CompareView }) {
  const { page, tools } = view;
  const picks = tools.filter((tool) => tool.pick);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/compare"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All comparisons
      </Link>

      <h1 className="text-3xl font-bold text-white">{page.title}</h1>
      <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-gray-400">
        {page.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <AsOfLine view={view} />

      {page.kind === "head-to-head" ? (
        <>
          <HeadToHeadTable tools={tools} />
          {picks.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-3 text-lg font-semibold text-white">Who should pick which</h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {picks.map((tool) => (
                  <li key={tool.slug}>
                    <Link href={tool.href} className="font-medium text-orange-400 hover:text-orange-300">
                      {tool.name}
                    </Link>
                    {": "}
                    {tool.pick}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <AlternativeCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-white">What you hit first on the free plans</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-300">
          {page.hitFirst.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-white">Questions</h2>
        <dl className="space-y-4 text-sm">
          {page.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-white">{item.question}?</dt>
              <dd className="mt-1 text-gray-300">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Sources tools={tools} />

      <CatalogLinkList
        title="Also consider"
        items={view.alsoConsider.map((link) => ({ href: link.href, label: link.name }))}
      />
      <CatalogLinkList title="Related" items={page.related ?? []} />
    </div>
  );
}
