#!/usr/bin/env node
/**
 * Expire the site's shared catalog cache after a database change.
 *
 *   npm run cache:revalidate                      # everything tagged `catalog`
 *   npm run cache:revalidate -- chatgpt claude    # only those platforms' pages
 *
 * Reads REVALIDATE_SECRET from the shell environment (the same value set in
 * Vercel). It never reads .env files and never prints the secret.
 * REVALIDATE_URL overrides the target (default: production).
 *
 * Plain .mjs, no tsx, no DB: it only calls POST /api/revalidate.
 * Details: docs/caching.md.
 */
const secret = process.env.REVALIDATE_SECRET;
const url = process.env.REVALIDATE_URL || "https://www.launchpadhq.io/api/revalidate";
const slugs = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

if (!secret) {
  console.error("REVALIDATE_SECRET is not set in this shell. Nothing was sent.");
  console.error("The cache will still refresh on its own within an hour.");
  process.exit(1);
}

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
  body: slugs.length ? JSON.stringify({ slugs }) : "",
});
const text = await res.text();
console.log(`${res.status} ${new URL(url).host}: ${text}`);
process.exit(res.ok ? 0 : 1);
