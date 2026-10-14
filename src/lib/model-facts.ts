import type { PriceFact, TokenFact } from "@/data/models/types";

export function formatTokenFact(fact: TokenFact): string {
  if (!fact.verified || fact.tokens == null) return "Unverified";
  return formatTokenCount(fact.tokens);
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1_000_000) {
    const millions = tokens / 1_000_000;
    return Number.isInteger(millions) ? `${millions}M` : `${parseFloat(millions.toFixed(2))}M`;
  }
  if (tokens >= 1_000) {
    const thousands = tokens / 1_000;
    return Number.isInteger(thousands) ? `${thousands}K` : `${parseFloat(thousands.toFixed(1))}K`;
  }
  return String(tokens);
}

export function formatPriceFact(fact: PriceFact): string {
  if (!fact.verified || fact.usdPerMillion == null) return "Unverified";
  const n = fact.usdPerMillion;
  const text = Number.isInteger(n) ? `$${n}` : `$${Number(n.toFixed(3)).toString()}`;
  return `${text} / 1M`;
}

export function formatVerifiedDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
