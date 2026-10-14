import type { DisplaySource } from "@/lib/platform-display";

export function PlatformSources({
  sources,
  notes,
}: {
  sources: DisplaySource[];
  notes: string[];
}) {
  if (sources.length === 0 && notes.length === 0) return null;

  return (
    <details className="mt-10 rounded-xl border border-gray-800 bg-gray-900/40 p-4">
      <summary className="cursor-pointer text-sm font-medium text-gray-300">
        Sources & notes
        {sources.length > 0 && (
          <span className="ml-1.5 text-gray-500">({sources.length})</span>
        )}
      </summary>
      <div className="mt-4 space-y-3 text-sm text-gray-400">
        {sources.length > 0 && (
          <ul className="space-y-2">
            {sources.map((source) => (
              <li key={source.url}>
                <span className="text-gray-500">{source.label}: </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={
                    source.checkedAt
                      ? `Source: ${source.url}\nChecked: ${source.checkedAt}`
                      : `Source: ${source.url}`
                  }
                  className="break-all text-sky-400 hover:text-sky-300"
                >
                  {source.url}
                </a>
              </li>
            ))}
          </ul>
        )}
        {notes.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-xs text-gray-500">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
