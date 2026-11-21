/**
 * Site-wide look for Clerk's sign-in, sign-up, account and user-menu
 * components, passed to <ClerkProvider>.
 *
 * Without it Clerk draws its default light card (white box, dark grey button)
 * on our dark pages, whatever the visitor's light/dark setting.
 *
 * - `cssLayerName` puts Clerk's own styles in the `clerk` CSS layer, which
 *   globals.css orders before Tailwind's `utilities`. That lets the Tailwind
 *   classes pages pass in `appearance.elements` win over Clerk's defaults.
 * - `variables` use the site's existing Tailwind palette (no new colours), so
 *   inputs, borders and secondary text match too.
 */
export const clerkAppearance = {
  cssLayerName: "clerk",
  variables: {
    colorBackground: "var(--color-gray-900)",
    colorForeground: "var(--color-white)",
    colorMutedForeground: "var(--color-gray-400)",
    colorMuted: "var(--color-gray-800)",
    colorPrimary: "var(--color-orange-500)",
    colorPrimaryForeground: "var(--color-white)",
    colorInput: "var(--color-gray-950)",
    colorInputForeground: "var(--color-white)",
    colorNeutral: "var(--color-white)",
    colorBorder: "var(--color-gray-700)",
    colorRing: "var(--color-orange-500)",
  },
};
