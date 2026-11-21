import Link from "next/link";
import { FOOTER_LINKS, footerExploreLinks, type NavLink } from "./nav-links";

const LINK_CLASS = "text-xs text-gray-300 underline-offset-2 hover:text-white hover:underline";

function LinkList({ label, links }: { label: string; links: readonly NavLink[] }) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={LINK_CLASS}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-xs text-gray-400">LaunchpadHQ</p>
        <div className="flex flex-col gap-3 sm:items-end">
          <LinkList label="Explore" links={footerExploreLinks()} />
          <LinkList label="Legal and business" links={FOOTER_LINKS} />
        </div>
      </div>
    </footer>
  );
}
