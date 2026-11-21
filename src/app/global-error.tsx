"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import "./globals.css";

/**
 * Replaces the root layout when it fails, so nothing from it is available:
 * no ClerkProvider (so no Header), no footer, no fonts. globals.css is
 * imported here, and the inline styles keep the page dark and readable even
 * if that stylesheet does not load. Links are plain <a> tags so they work
 * with a broken client router.
 */
const DARK_BG = "#030712"; // Tailwind gray-950, the site's page background.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" style={{ backgroundColor: DARK_BG, colorScheme: "dark" }}>
      <body
        className="min-h-screen bg-gray-950 text-white antialiased"
        style={{ backgroundColor: DARK_BG, color: "#ffffff", margin: 0, fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <title>Something went wrong | Launchpad HQ</title>
        <main className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-5 py-20 sm:px-8 sm:py-28" style={{ padding: "5rem 1.25rem" }}>
          <p className="text-sm font-medium uppercase tracking-wide text-orange-400" style={{ color: "#fb923c" }}>
            Launchpad HQ
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Something went wrong</h1>
          <p className="text-base text-gray-400" style={{ color: "#9ca3af" }}>
            The page failed to load. We&apos;ve been notified. Try again, or head back to the directory.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              style={{ backgroundColor: "#f97316", color: "#ffffff", border: 0, cursor: "pointer" }}
            >
              Try again
            </button>
            <a href="/discover" className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white" style={{ color: "#e5e7eb" }}>
              Browse the directory
            </a>
            {/* Plain <a> on purpose: a full page load, in case the client router is what broke. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white" style={{ color: "#e5e7eb" }}>
              Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
