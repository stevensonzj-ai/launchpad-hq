import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Lakeside Innovation Labs LLC. Launchpad HQ.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <Link href="/privacy" className="hover:text-orange-400">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-orange-400">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
