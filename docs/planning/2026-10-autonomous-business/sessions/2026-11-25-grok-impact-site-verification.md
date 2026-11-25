# 2026-11-25 — grok — Impact site verification

**Decided:** Put Impact's site-verification meta on every page from the root layout. Their crawler reads `value`, and Next's Metadata `other` only emits `content`, so the tag is a real `<meta>` element. `content` repeats the same token. No tracking script and no new dependency.

**Changed:** `src/lib/impact-site-verification.ts` (token and attributes), `src/app/layout.tsx` (hoisted meta), `src/lib/site-identity.test.ts` (render plus layout source). Branch `cursor/impact-site-verification-cd3e`.

**Verified:** `npm test` 1663 passed. `npx tsc --noEmit` passed. `npm run build` passed on the retry (the first run stopped on a Next.js security advisory after pages had already generated). Built HTML for `/`, `/about`, and `/quiz` has the tag inside `<head>` with both `value` and `content`.

**Open / Zach:** Merge when the preview looks right. After deploy, Impact can re-check the live tag. The Next.js security advisory was not upgraded here.

Model: Grok 4.7.
