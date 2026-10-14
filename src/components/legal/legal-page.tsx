import type { ReactNode } from "react";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
        Legal
      </p>
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: 14 October 2026</p>
      <div className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-gray-300 [&_a]:text-orange-400 [&_a:hover]:text-orange-300 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_p]:text-gray-300 [&_strong]:text-gray-100">
        {children}
      </div>
    </article>
  );
}
