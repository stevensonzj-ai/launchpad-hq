import type { PlatformModelFamily } from "./types";

const PRICING = "https://api-docs.deepseek.com/quick_start/pricing";
const QUICKSTART = "https://api-docs.deepseek.com/";

export const deepseek: PlatformModelFamily = {
  familySlug: "deepseek",
  displayName: "DeepSeek",
  vendor: "DeepSeek",
  platformSlugs: ["deepseek"],
  lastVerifiedAt: "2026-10-14",
  whichToUse: [
    "API: use deepseek-flash (DeepSeek-V4.1-Flash) for most work. It is cheaper, has vision, and is the name DeepSeek currently documents as the Flash model.",
    "Use deepseek-v4-pro when you want the Pro checkpoint. DeepSeek says it will keep serving V4 Pro after 14 Sep 2026 with the same billing until further notice.",
    "Consumer chat-app daily limits are unverified on the API docs. Hosted DeepSeek processes data in China — see the catalog privacy note.",
  ],
  sources: [
    { label: "Models & pricing", url: PRICING },
    { label: "API quickstart", url: QUICKSTART },
  ],
  versions: [
    {
      id: "deepseek-flash",
      name: "DeepSeek V4.1 Flash",
      apiId: "deepseek-flash",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "budget",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: 384_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.15,
        verified: true,
        note: "Off-peak cache-miss. Peak cache-miss is $0.30. Off-peak cache-hit is $0.003. Peak hours: 01:00–04:00 and 06:00–10:00 UTC, weekdays excluding Chinese public holidays.",
      },
      apiPriceOutput: {
        usdPerMillion: 0.6,
        verified: true,
        note: "Off-peak. Peak output is $1.20 / 1M.",
      },
      consumerAccess: {
        summary: "API is pay-as-you-go. Free consumer chat-app limits were not listed on the API pricing page.",
        verified: false,
      },
      strengths: [
        "Very cheap API at off-peak cache-miss rates.",
        "1M context and 384k max output.",
        "Vision is supported on Flash; Pro’s table says vision is not.",
      ],
      bestFor: "Budget API use and anyone comparing open-weight / China-hosted options, after reading the privacy note.",
      caveats: [
        "Peak hours cost 2×.",
        "Hosted service data-handling is a catalog disclosure item (China).",
        "Consumer chat limits unverified.",
      ],
      sourceUrls: [{ label: "Models & pricing", url: PRICING }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      apiId: "deepseek-v4-pro",
      releaseDate: null,
      releaseDateVerified: false,
      status: "current",
      role: "flagship",
      contextWindow: { tokens: 1_000_000, verified: true },
      maxOutput: { tokens: 384_000, verified: true },
      apiPriceInput: {
        usdPerMillion: 0.66,
        verified: true,
        note: "Off-peak cache-miss. Peak cache-miss is $1.32. Off-peak cache-hit is $0.022.",
      },
      apiPriceOutput: {
        usdPerMillion: 1.98,
        verified: true,
        note: "Off-peak. Peak output is $3.96 / 1M.",
      },
      consumerAccess: {
        summary: "API is pay-as-you-go. Consumer chat-app mapping was not listed on the API pricing page.",
        verified: false,
      },
      strengths: [
        "Same 1M context and 384k max output as Flash.",
        "Still officially served after 14 Sep 2026, per DeepSeek’s pricing notes.",
      ],
      bestFor: "API jobs where you specifically want the Pro checkpoint.",
      caveats: [
        "No vision on Pro according to the pricing table.",
        "Peak hours cost 2×.",
      ],
      sourceUrls: [{ label: "Models & pricing", url: PRICING }],
      verified: { specs: true, apiPricing: true, consumerAccess: false },
    },
  ],
};
