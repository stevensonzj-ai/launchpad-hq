import Link from "next/link";
import type { Fact, ToolLifecycle, ToolStatus } from "@/data/facts/types";

type PlatformStatusNoticeProps = {
  /** Current display name (after any displayName overlay). */
  platformName: string;
  lifecycle: ToolLifecycle;
  status: Fact<ToolStatus>;
  /** Guide pages: lead line, what to do and sources only. */
  compact?: boolean;
};

export function statusNoticeHeading(
  platformName: string,
  lifecycle: ToolLifecycle,
  formerName?: string,
): string {
  switch (lifecycle) {
    case "discontinued":
      return `What happened to ${platformName}?`;
    case "renamed":
      return formerName ? `${platformName} was formerly ${formerName}` : `${platformName} has a new name`;
    case "acquired":
      return `${platformName} has a new owner`;
    default:
      return `${platformName}: status update`;
  }
}

function sourceLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Sourced, dated notice for a product that shut down, changed hands, was
 * renamed, or is going through something readers should know about.
 * Copy lives in the platform's fact file (`status`), never in this component.
 */
export function PlatformStatusNotice({
  platformName,
  lifecycle,
  status,
  compact = false,
}: PlatformStatusNoticeProps) {
  const value = status.value;
  const secondary = value.sourceKind === "secondary";
  const sources = [status.sourceUrl, ...(value.additionalSources ?? [])].filter(Boolean);
  const headingId = "platform-status-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm text-amber-50"
    >
      <h2 id={headingId} className="text-base font-semibold text-white">
        {statusNoticeHeading(platformName, lifecycle, value.formerName)}
      </h2>
      <p className="mt-2 leading-relaxed">{value.headline}</p>

      {!compact &&
        value.details?.map((paragraph) => (
          <p key={paragraph} className="mt-2 leading-relaxed text-amber-50/90">
            {paragraph}
          </p>
        ))}

      {value.whatToDo ? (
        <p className="mt-3 leading-relaxed">
          <span className="font-semibold text-white">If you used it: </span>
          {value.whatToDo}
        </p>
      ) : null}

      {value.alternatives && value.alternatives.length > 0 ? (
        <div className="mt-3">
          <p className="font-semibold text-white">Live alternatives on Launchpad HQ</p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {value.alternatives.map((alt) => (
              <li key={alt.slug}>
                <Link href={`/platform/${alt.slug}`} className="text-orange-400 hover:text-orange-300">
                  {alt.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-3 text-xs text-amber-50/70">
        {secondary
          ? "No official notice from the company is available. This is based on secondary reporting: "
          : "Source: "}
        {sources.map((url, index) => (
          <span key={url}>
            {index > 0 ? ", " : null}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-amber-50/40 hover:text-white"
            >
              {sourceLabel(url)}
            </a>
          </span>
        ))}
        {` · checked ${status.checkedAt}`}
      </p>
    </section>
  );
}
