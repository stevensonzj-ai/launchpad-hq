import Link from "next/link";

const LINKS = [
  { href: "/how-we-make-money", label: "How we make money" },
  { href: "/advertise", label: "Advertise" },
  { href: "/connector", label: "AI connector" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">LaunchpadHQ</p>
        <nav aria-label="Legal and business" className="flex flex-wrap gap-x-4 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-gray-300 underline-offset-2 hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
