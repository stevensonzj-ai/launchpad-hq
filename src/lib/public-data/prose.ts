/**
 * Editorial prose for the /data/v1 content records (guides, workflows,
 * models) and llms-full.txt.
 *
 * Guides and workflows never type a price: they use catalog price tokens
 * (price-tokens.ts), filled in after this cleaner runs. As a backstop, a
 * sentence that still quotes a currency amount is dropped here, so the feed
 * can never republish a hand-typed price. Inline **bold** / `code` markers are removed too, and so
 * are email addresses (the feed publishes none; the HTML page keeps them).
 */
import { stripInlineMarkup } from "@/lib/seo-metadata";

/** A currency amount: "$20", "US$ 0.01", "€19.90", "£5", "20 USD". */
const PRICE_RE = /(?:US\$|[$€£¥₹])\s?\d|\d[\d,.]*\s?(?:USD|EUR|GBP)\b/;

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
export const EMAIL_PLACEHOLDER = "[email address on the web page]";

/** Email addresses replaced by a pointer to the page. */
export function redactEmails(text: string): string {
  return text.replace(EMAIL_RE, EMAIL_PLACEHOLDER);
}

export const PRICING_NOTE =
  "Prices in this text come from the catalog, the same data as each tool's page and its record (tool.starting_price, tool.lowest_paid, and plans in /data/v1/tools/{slug}.json). Any sentence that typed a price by hand is removed; prices_removed counts them.";

export function hasPriceText(text: string): boolean {
  return PRICE_RE.test(text);
}

const SENTENCE_SPLIT_RE = /(?<=[.!?])\s+(?=[A-Z0-9("“'])/;

export type ProseCleaner = {
  /** Text without price sentences or markup; null when nothing is left. */
  text: (value: string | null | undefined) => string | null;
  /** Each item cleaned; emptied items dropped. */
  list: (values: readonly string[] | null | undefined) => string[];
  /** How many sentences were dropped so far. */
  readonly removed: number;
};

export function proseCleaner(): ProseCleaner {
  let removed = 0;
  const text = (value: string | null | undefined): string | null => {
    if (!value?.trim()) return null;
    const plain = redactEmails(stripInlineMarkup(value));
    if (!hasPriceText(plain)) return plain.trim();
    // Multi-line text (prompts) is cleaned line by line to keep its layout.
    const lines = plain.split("\n").map((line) => {
      const kept = line.split(SENTENCE_SPLIT_RE).filter((sentence) => {
        if (!hasPriceText(sentence)) return true;
        removed += 1;
        return false;
      });
      return kept.join(" ");
    });
    const out = lines.join("\n").trim();
    return out || null;
  };
  return {
    text,
    list: (values) => (values ?? []).map(text).filter((v): v is string => v !== null),
    get removed() {
      return removed;
    },
  };
}
