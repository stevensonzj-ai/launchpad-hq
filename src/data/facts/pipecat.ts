import type { ToolFacts } from "./types";

const SITE_URL = "https://pipecat.ai";
const REPO_URL = "https://github.com/pipecat-ai/pipecat";
const DOCS_URL = "https://docs.pipecat.ai";
const QUICKSTART_URL = "https://docs.pipecat.ai/getting-started/quickstart";
const CLOUD_PRICING_URL = "https://www.daily.co/pricing/pipecat-cloud/";
const DEEPGRAM_POST_URL = "https://deepgram.com/blog/daily-pipecat-deepgram";
const DAILY_POST_URL = "https://www.daily.co/blog/deepgram-is-acquiring-daily-and-establishing-an-independent-pipecat-foundation/";

/**
 * Pipecat (new catalog row, catalog audit 32).
 * Gathered 2026-11-02 from the project's own pages only: pipecat.ai, the
 * GitHub repository and its LICENSE, docs.pipecat.ai (quickstart and client
 * SDKs), Pipecat Cloud pricing on daily.co, and the two acquisition posts
 * (Deepgram and Daily, 2026-10-29).
 *
 * Pricing is the `freeTier` and `plans` block below and nowhere else. The
 * only paid part is optional Pipecat Cloud hosting, run by Daily; the
 * framework is free. Your speech, language and voice providers bill you
 * separately and are not priced here.
 *
 * Governance: Deepgram announced on 2026-10-29 that it is acquiring Daily, the
 * company that maintains Pipecat. It is announced, not completed. Both posts
 * say Pipecat stays open source and is to move under an independent Pipecat
 * Foundation; no Pipecat Foundation page exists yet (as of 2026-11-02), so
 * nothing here links one.
 */
export default {
  slug: "pipecat",
  lifecycle: "active",
  company: {
    value: "Daily",
    note: "pipecat.ai: \"Maintained by Daily with the support of the Pipecat developer community\". LICENSE: \"BSD 2-Clause License\", \"Copyright (c) 2024–2026, Daily\". Deepgram announced on 2026-10-29 that it is acquiring Daily; announced, not completed (as of 2026-11-02).",
    sourceUrl: SITE_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Free and open source (BSD 2-Clause): you can build and run Pipecat voice agents yourself at no charge, wherever Python runs. The speech, language and voice providers you connect bill you separately, and Pipecat Cloud hosting is optional and paid.",
    },
    note: "Repository LICENSE: \"BSD 2-Clause License\". pipecat.ai: \"Pipecat is open source and runs wherever Python runs\". Deepgram's 2026-10-29 post: \"The Pipecat framework will remain fully open source and free to all developers under its existing BSD V2 license\". The acquisition of Daily is announced, not completed (as of 2026-11-02).",
    sourceUrl: REPO_URL,
    sourceKind: "product-page",
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Pipecat (open source)", price: "$0", period: "", limits: "BSD 2-Clause framework you run yourself; your own LLM, STT and TTS providers bill separately" },
      {
        name: "Pipecat Cloud agent-1x",
        price: "$0.01",
        period: "minute",
        limits: "Optional hosting by Daily: 0.5 vCPU, 1 GB; $0.01 per active minute, $0.0005 per reserved minute",
      },
      {
        name: "Pipecat Cloud agent-2x",
        price: "$0.02",
        period: "minute",
        limits: "Optional hosting by Daily; $0.02 per active minute, $0.0010 per reserved minute",
      },
      {
        name: "Pipecat Cloud agent-3x",
        price: "$0.03",
        period: "minute",
        limits: "Optional hosting by Daily; $0.03 per active minute, $0.0015 per reserved minute",
      },
    ],
    note: "USD, from Daily's Pipecat Cloud pricing page, as of 2026-11-02. The framework itself is free; Pipecat Cloud hosting is optional. Unlimited concurrency. Daily WebRTC voice transport is free for 1:1 voice sessions on Pipecat Cloud; voice plus video is $0.004 per participant minute; PSTN is $0.018 per minute; SIP is $0.003 to $0.02 per minute. Krisp VIVA noise filtering is free up to 10,000 active session minutes a month. You bring your own LLM, STT and TTS providers, which bill you directly. Pipecat Enterprise (Pipecat Cloud in your own AWS, Azure or GCP account) is also offered; its price is not stated.",
    sourceUrl: CLOUD_PRICING_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  platforms: {
    value: [
      "Python framework (3.11+)",
      "CLI (pipecat init)",
      "Self-hosted",
      "Pipecat Cloud (hosted by Daily)",
      "Pipecat Enterprise (Pipecat Cloud in your own AWS, Azure or GCP account)",
      "Client SDKs: JavaScript, React, React Native, iOS, Android, C++",
    ],
    note: "pipecat.ai: deploy self-hosted, on Pipecat Cloud (\"runs, scales, and observes your agents for you\") or Pipecat Enterprise. docs.pipecat.ai: client SDKs \"that connect users to agents over WebRTC or WebSockets\". PyPI package pipecat-ai 1.15.0 requires Python >=3.11 (as of 2026-11-02). Quickstart: " + QUICKSTART_URL,
    sourceUrl: DOCS_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  features: {
    value: [
      "Open-source Python framework for voice and multimodal AI agents: swap speech, language and vision services from 200+ integrated providers and services.",
      "Handles interruptions, turn detection and context management; supports multi-agent workflows and Pipecat Flows.",
      "Any transport: WebRTC, SIP and PSTN.",
      "Maintained by Daily with the support of the Pipecat developer community.",
      "16,999 GitHub stars on github.com/pipecat-ai/pipecat (as of 2026-11-02, GitHub API).",
      "Governance: Deepgram announced on 2026-10-29 that it is acquiring Daily and establishing an independent Pipecat Foundation, and says Pipecat will remain fully open source under its existing BSD license. The acquisition is announced, not completed; no Pipecat Foundation page exists yet (as of 2026-11-02).",
    ],
    note: "pipecat.ai and github.com/pipecat-ai/pipecat, as of 2026-11-02. Governance lines from Deepgram's and Daily's 2026-10-29 posts (Daily's says the foundation is \"managed by a steering committee that represents the entire realtime AI ecosystem, including companies that compete with Deepgram\"). Posts: " + DEEPGRAM_POST_URL + " and " + DAILY_POST_URL,
    sourceUrl: SITE_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  privacy: {
    value: {
      retention: "Not stated",
    },
    note: "Rated Medium. Self-hosted, Pipecat runs on your own machine or server and sends audio and text only to the speech, language and voice providers you choose, under each provider's own policy. Pipecat Cloud is hosted by Daily; this entry did not review its data handling. A retention period is not stated.",
    sourceUrl: SITE_URL,
    checkedAt: "2026-11-02",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-02",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-02",
      field: "plans",
      summary:
        "First fact file (new catalog row, audit 32). Free and open source (BSD 2-Clause); optional Pipecat Cloud hosting from Daily at $0.01, $0.02 and $0.03 per active minute for agent-1x, 2x and 3x. Deepgram's acquisition of Daily is announced, not completed.",
    },
  ],
} satisfies ToolFacts;
