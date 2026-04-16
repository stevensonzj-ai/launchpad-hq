import Link from "next/link";

export function WorkflowToolName({
  name,
  slug,
}: {
  name: string;
  slug?: string;
}) {
  if (slug) {
    return (
      <Link href={`/platform/${slug}`} className="font-medium text-orange-400 hover:text-orange-300 hover:underline">
        {name}
      </Link>
    );
  }
  return <span className="font-medium text-gray-200">{name}</span>;
}
