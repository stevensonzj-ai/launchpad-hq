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
        "Comfy Desktop itself is free. Cloud: Try Cloud for free, with free new-user credits (amount unpublished).",
    },
    sourceUrl: "https://www.comfy.org/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
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
        limits: "$80/mo on yearly billing; per workspace",
      },
      {
        name: "Team",
        price: "$200–$2,500",
        period: "month",
        limits: "Five tiers; monthly credit commitment, not per seat",
      },
    ],
    note: "Comfy Cloud paid plans in USD/mo, per workspace. Pro $100 ($80 yearly) isn't in the fetched text: browser-verified 2026-10-14.",
    sourceUrl: "https://www.comfy.org/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "Comfy API billed per GPU-second: RTX PRO 6000 $4.54/hr, H100 $6.23/hr, H200 $7.71/hr, B200 $11.23/hr. Storage $0.20/GB/mo. MiniMax commercial license from $5,000/mo.",
    sourceUrl: "https://www.comfy.org/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
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
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: Pro $100 ($80 yearly) browser-verified 2026-10-14. Wan/Flux/LTX/Qwen labeled (open-source, third-party). Team is a monthly credit commitment, not per seat.",
    },
  ],
} satisfies ToolFacts;
