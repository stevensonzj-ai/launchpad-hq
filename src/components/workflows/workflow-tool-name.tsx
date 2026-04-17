import Link from "next/link";

export function WorkflowToolName({
  name,
  slug,
  validSlugs,
  rationale,
  /** When true, never render a link (e.g. tool list inside a card that is already a link). */
  disableLink,
}: {
  name: string;
  slug?: string;
  validSlugs: ReadonlySet<string>;
  rationale?: string;
  disableLink?: boolean;
}) {
  const inDb = Boolean(slug && validSlugs.has(slug));

  const nameEl =
    !disableLink && inDb && slug ? (
      <Link href={`/platform/${slug}`} className="font-medium text-orange-400 hover:text-orange-300 hover:underline">
        {name}
      </Link>
    ) : disableLink && inDb ? (
      <span className="font-medium text-orange-300/90">{name}</span>
    ) : (
      <span className="font-medium text-gray-200">{name}</span>
    );

  return (
    <div className="min-w-0 flex-1">
      {nameEl}
      {rationale ? (
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{rationale}</p>
      ) : null}
    </div>
  );
}
