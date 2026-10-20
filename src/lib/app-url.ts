import { SITE_URL } from "@/lib/site";

/**
 * Trusted absolute base URL for links this app generates server-side
 * (moderation email links, Stripe success/cancel/return URLs).
 *
 * Derived only from the deployment environment: never from the request's
 * Origin or Host headers, which the client controls. Vercel's System
 * Environment Variables supply VERCEL_ENV and VERCEL_URL; no app env var is
 * involved.
 *
 * - production → SITE_URL (the canonical www host)
 * - preview    → https://${VERCEL_URL} (the deployment's own host)
 * - otherwise  → http://localhost:3000
 */
export function getAppBaseUrl(
  env: Record<string, string | undefined> = process.env,
): string {
  if (env.VERCEL_ENV === "production") return SITE_URL;
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}
