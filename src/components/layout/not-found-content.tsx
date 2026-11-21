import Link from "next/link";

/** Links offered on the 404 page (not-found-content.test.ts). */
export const NOT_FOUND_LINKS = [
  { href: "/discover", label: "Browse the directory" },
  { href: "/quiz", label: "Take the quiz" },
] as const;

/**
 * Body of the 404 page (src/app/not-found.tsx). Fixed dark classes, so it
 * looks the same whatever the visitor's light/dark setting.
 */
export function NotFoundContent() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-sm font-medium uppercase tracking-wide text-orange-400">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">We can&apos;t find that page</h1>
      <p className="text-base text-gray-400">
        The link may be old, or the page may have moved. You can browse every tool in the directory, or answer a few
        questions to get matched.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        {NOT_FOUND_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              i === 0
                ? "rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                : "rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:border-gray-500 hover:text-white"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
