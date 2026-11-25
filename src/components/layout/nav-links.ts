/**
 * Site navigation links: the single source for the header (desktop and
 * mobile menu) and the footer. Plain data, no React or Clerk, so tests can
 * import it directly (nav-links.test.ts).
 *
 * Sign-in / account controls are not listed here; the header renders them.
 */
import { PRO_PLAN_ENABLED } from "@/lib/site";

export type NavLink = { readonly href: string; readonly label: string };

/** Header links shown to everyone, in order. */
export const HEADER_LINKS: readonly NavLink[] = [
  { href: "/discover", label: "Discover" },
  { href: "/tutorials", label: "Guides" },
  { href: "/deals", label: "Deals" },
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Get matched" },
];

/** Shown after HEADER_LINKS for signed-in users only. */
export const HEADER_SIGNED_IN_LINKS: readonly NavLink[] = [{ href: "/for-you", label: "For you" }];

/** Header links for a given auth state, in display order. */
export function headerLinks(signedIn: boolean): readonly NavLink[] {
  return signedIn ? [...HEADER_LINKS, ...HEADER_SIGNED_IN_LINKS] : HEADER_LINKS;
}

/** Footer "Explore" group: pages moved out of the header. Pricing follows its flag. */
export function footerExploreLinks(proPlanEnabled: boolean = PRO_PLAN_ENABLED): readonly NavLink[] {
  return [
    { href: "/workflows", label: "Workflows" },
    { href: "/deals", label: "Deals" },
    { href: "/models", label: "Models" },
    ...(proPlanEnabled ? [{ href: "/pricing", label: "Pricing" }] : []),
  ];
}

/** Footer about / legal / business group. */
export const FOOTER_LINKS: readonly NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/developers", label: "Developers" },
  { href: "/how-we-make-money", label: "How we make money" },
  { href: "/advertise", label: "Advertise" },
  { href: "/connector", label: "AI connector" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
