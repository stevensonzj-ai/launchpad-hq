import type { ToolFacts } from "./types";

export default {
  slug: "comfyui",
  lifecycle: "active",
  company: {
    value: "Comfy Org",
    note: "Footer: © 2026 Comfy Org.",
    sourceUrl: "https://www.comfy.org/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Comfy Desktop itself is free. Cloud: 5 free runs on real GPUs and free Comfy Agent credits for new users (credit amount unpublished).",
    },
    sourceUrl: "https://www.comfy.org/",
    sourceKind: "product-page",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Standard",
        price: "$20",
        period: "month",
        limits: "$16/mo, $192 billed yearly; per workspace",
      },
      {
        name: "Creator",
        price: "$35",
        period: "month",
        limits: "$28/mo, $336 yearly; per workspace",
      },
      {
        name: "Pro",
        price: "$100",
        period: "month",
        limits: "$960 billed yearly; per workspace",
      },
      {
        name: "Team",
        price: "$200–$2,500",
        period: "month",
        limits: "FAQ: five tiers from $200 to $2,500/month, a credit commitment, not per seat. A Team card also shows $700/month beside $630.",
      },
    ],
    note: "Comfy Cloud paid plans in USD, per workspace. Pro is $100/month and $960 billed yearly. The FAQ still states five Team tiers from $200 to $2,500/month.",
    sourceUrl: "https://www.comfy.org/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "Comfy API billed per GPU-second: RTX PRO 6000 (96GB) $3.49/hr, RTX PRO 6000 MIG (48GB) $1.75/hr, H100 $6.23/hr, H200 $7.71/hr, B200 $11.23/hr. Storage $0.20/GB/mo. MiniMax commercial license from $5,000/mo.",
    sourceUrl: "https://www.comfy.org/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  platforms: {
    value: ["Desktop", "Cloud (browser)"],
    note: "Download page: https://www.comfy.org/download/. Desktop OS list unpublished.",
    sourceUrl: "https://www.comfy.org/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Wan 2.2 (open-source, third-party)",
      "Flux (open-source, third-party)",
      "LTX (open-source, third-party)",
      "Qwen (open-source, third-party)",
      "Nano Banana Pro (third-party)",
      "Seedance (third-party)",
      "Grok (third-party)",
      "Kling (third-party)",
      "GPT Image 2 (third-party)",
    ],
    note: "No in-house flagship. Wan 2.2, Flux, LTX and Qwen labeled (open-source, third-party). Partner models labeled (third-party).",
    sourceUrl: "https://www.comfy.org/cloud",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-14",
      field: "plans",
      summary: "RTX PRO 6000 is $3.49/hr (was $4.54). Added the MIG SKU at $1.75/hr. Cloud plan prices still match. New users get 5 free GPU runs.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: Pro $100 ($80 yearly) browser-verified 2026-10-14. Wan/Flux/LTX/Qwen labeled (open-source, third-party). Team is a monthly credit commitment, not per seat.",
    },
  ],
} satisfies ToolFacts;
