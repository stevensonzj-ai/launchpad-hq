"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

export default function PricingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function openPortal() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Portal failed");
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold text-white">Launchpad HQ Pro</h1>
      <p className="mt-4 text-center text-gray-400">
        Full access to community features, quiz sync, and future premium tools.
      </p>

      <div className="mt-12 rounded-2xl border border-orange-500/30 bg-gray-900/80 p-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-3xl font-bold text-white">
              $9<span className="text-lg font-normal text-gray-500">/month</span>
            </p>
            <p className="mt-1 text-sm text-green-400">7-day free trial · cancel anytime</p>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
          {!isLoaded ? (
            <div className="h-12 w-32 animate-pulse rounded-xl bg-gray-800" />
          ) : !isSignedIn ? (
            <Link
              href="/sign-in"
              className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Sign in to subscribe
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={startCheckout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Start trial
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={openPortal}
                className="text-center text-sm text-gray-500 hover:text-white"
              >
                Manage billing
              </button>
            </div>
          )}
        </div>

        <ul className="mt-8 space-y-3 border-t border-gray-800 pt-8 text-sm text-gray-300">
          {[
            "Supports ongoing development of Launchpad HQ",
            "Stripe-secured billing; failed payments pause Pro until updated",
            "Trial converts to paid unless canceled before trial ends",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 text-center text-sm text-gray-600">
        <Link href="/discover" className="hover:text-orange-400">
          Continue browsing for free
        </Link>
      </p>
    </div>
  );
}
