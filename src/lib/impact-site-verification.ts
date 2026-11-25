import type { ComponentProps } from "react"

/** Token Impact.com expects on the site-verification meta tag. */
export const IMPACT_SITE_VERIFICATION = "115060bd-015a-45ec-b593-eee412d07430"

/**
 * Impact's crawler reads `value`. Next's Metadata `other` map only emits
 * `content`, so the root layout renders this element and React 19 hoists it
 * into `<head>`. `content` repeats the token for clients that only read the
 * standard attribute. `value` is not part of React's meta typings.
 */
export const impactSiteVerificationMeta = {
  name: "impact-site-verification",
  content: IMPACT_SITE_VERIFICATION,
  value: IMPACT_SITE_VERIFICATION,
} satisfies ComponentProps<"meta"> & { value: string }
