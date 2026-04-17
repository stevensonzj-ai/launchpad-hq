import Link from "next/link";

export function WorkflowToolName({
  name,
  slug,
  validSlugs,
  /** When true, never render a link (e.g. tool list inside a card that is already a link). */
  disableLink,
}: {
  name: string;
  slug?: string;
  validSlugs: ReadonlySet<string>;
  disableLink?: boolean;
}) {
  const inDb = Boolean(slug && validSlugs.has(slug));

  if (!disableLink && inDb && slug) {
    return (
      <Link href={`/platform/${slug}`} className="font-medium text-orange-400 hover:text-orange-300 hover:underline">
        {name}
      </Link>
    );
  }
  if (disableLink && inDb) {
    return <span className="font-medium text-orange-300/90">{name}</span>;
  }
  return <span className="font-medium text-gray-200">{name}</span>;
}
