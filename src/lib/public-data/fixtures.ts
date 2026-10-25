import { getToolFacts, listRegisteredToolFacts } from "@/data/facts";
import type { ToolFacts } from "@/data/facts/types";
import { FIXTURE_FACTS, FIXTURE_ROWS, row } from "@/lib/mcp/fixtures";
import type { CatalogRow, FactsLookup } from "@/lib/mcp/tools";
import { buildFeedContext } from "./serialize";

/** Test fixtures only: MCP fixture rows plus one synthetic row per registered fact file. */

/** A hidden fact file's row name, used to prove hidden tools never resolve. */
export const HIDDEN_NAME = getToolFacts("relay-app")?.displayName?.value ?? "relay-app";

const extraRows: CatalogRow[] = [
  row({
    slug: "pricey",
    name: "Pricey",
    costTier: "PAID",
    description: "Image API (as of 2026-09-30) https://pricey.example.com/docs",
    currentPricing: "US$0.01 per credit, pay as you go",
    freeTierFeatures: null,
    languageSupport: null,
    keyIntegrations: "Zapier, Slack (as of 2026-09-30)",
    directAlternatives: ["Notey", "Freenote", "DeadNote", "Pricey", HIDDEN_NAME, "Nowhere"],
    complementaryTools: ["PixelPaint"],
    updatedAt: "2026-10-05T12:00:00.000Z",
  }),
];

const factRows: CatalogRow[] = listRegisteredToolFacts().map((facts) =>
  row({
    slug: facts.slug,
    name: facts.displayName?.value ?? facts.slug,
    costTier: "FREEMIUM",
    currentPricing: "Free; Pro $10/mo",
    freeTierFeatures: "Free plan with limits (as of 2026-01-01)",
    usageLimits: "5 a day",
  }),
);

export const FEED_ROWS: CatalogRow[] = [...FIXTURE_ROWS, ...extraRows, ...factRows];

export const feedFacts: FactsLookup = (slug) =>
  (FIXTURE_FACTS as Record<string, ToolFacts>)[slug] ?? getToolFacts(slug);

export const GENERATED_AT = "2026-10-25T00:00:00.000Z";

export const feedContext = () =>
  buildFeedContext(FEED_ROWS, feedFacts, {
    generatedAt: GENERATED_AT,
    hasGuide: (slug) => slug === "chatgpt",
  });
