import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { NotFoundContent } from "@/components/layout/not-found-content";

/**
 * 404 for notFound() calls and unmatched URLs on public paths. It renders in
 * the root layout (footer included) but outside the (app) layout, so the
 * header is rendered here. Next adds a noindex robots tag to this page.
 *
 * Known gap: an unknown URL outside the middleware's public list (src/proxy.ts)
 * is sent to sign-in for signed-out browsers before this page can render.
 */
export const metadata: Metadata = {
  title: "Page not found | Launchpad HQ",
};

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
