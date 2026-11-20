import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { NOT_FOUND_METADATA } from "@/lib/seo-metadata";

/**
 * 404 for unmatched URLs on public paths. It renders in the root layout
 * (footer included) but outside the (app) layout, so the header is rendered
 * here. notFound() calls inside the (app) group use src/app/(app)/not-found.tsx
 * instead, which has no Header of its own. Next adds a noindex robots tag.
 *
 * Known gap: an unknown URL outside the middleware's public list (src/proxy.ts)
 * is sent to sign-in for signed-out browsers before this page can render.
 */
export const metadata: Metadata = NOT_FOUND_METADATA;

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950 text-white">
        <NotFoundContent />
      </main>
    </>
  );
}
