import Link from "next/link";

export type CatalogLink = {
  href: string;
  label: string;
  group?: string;
};

export function CatalogLinkList({
  title,
  items,
}: {
  title: string;
  items: CatalogLink[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">{title}</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {items.map((item) => (
          <li key={`${item.href}:${item.label}`}>
            <Link href={item.href} className="text-orange-400 hover:text-orange-300">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GroupedCatalogLinks({ items }: { items: CatalogLink[] }) {
  if (items.length === 0) return null;
  const groups = new Map<string, CatalogLink[]>();
  for (const item of items) {
    const key = item.group ?? "Related";
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  return (
    <div className="mt-10 space-y-8">
      {[...groups.entries()].map(([group, groupItems]) => (
        <CatalogLinkList key={group} title={group} items={groupItems} />
      ))}
    </div>
  );
}
