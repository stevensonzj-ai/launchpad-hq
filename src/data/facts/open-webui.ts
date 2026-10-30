import type { ToolFacts } from "./types";

/**
 * Open WebUI: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on openwebui.com, docs.openwebui.com and the
 * project's GitHub licence. Both readers agree the row's "Completely free and
 * open-source (MIT)" is out of date: since v0.6.6 (April 19, 2025) the project
 * uses its own "Open WebUI License", a BSD-3-based licence with a branding
 * clause, which the docs call "not an OSI-approved 'open source' license". Code
 * up to and including v0.6.5 stays BSD-3. The branding clause does not apply
 * with 50 or fewer end users in a rolling 30-day period, with written
 * permission, or with an enterprise licence. The software is free to
 * self-host; Enterprise is quote only. One reader only: the company is Open
 * WebUI Inc. (licence copyright line), and the website privacy policy lists
 * training ML models "with your consent where applicable". Telemetry defaults
 * were not read.
 */
export default {
  slug: "open-webui",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free to self-host with the Open WebUI branding intact; no account required for the pip or Docker install."
    },
    sourceUrl: "https://docs.openwebui.com/license",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Self-hosted",
        price: "$0",
        period: "",
        limits: "Free to use; keep Open WebUI branding unless an exception applies. An Enterprise licence (custom branding, SSO and other enterprise features) is quote only"
      }
    ],
    note: "As of 2026-10-29. No Enterprise price is published.",
    sourceUrl: "https://docs.openwebui.com/enterprise",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Open WebUI Inc.",
    note: "One reader: the licence reads \"Copyright (c) 2023- Open WebUI Inc.\"; the website footer says only \"Open WebUI\".",
    sourceUrl: "https://raw.githubusercontent.com/open-webui/open-webui/main/LICENSE",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  features: {
    value: [
      "Licence: since v0.6.6 (April 19, 2025) the \"Open WebUI License\", a custom BSD-3-based licence with a branding clause; the docs say it is not an OSI-approved open source licence.",
      "Branding clause exceptions: 50 or fewer end users in a rolling 30-day period, written permission, or an enterprise licence. Code up to and including v0.6.5 remains BSD-3."
    ],
    sourceUrl: "https://docs.openwebui.com/license",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: licence is the custom Open WebUI License (branding clause) since v0.6.6, not MIT; free to self-host, Enterprise by quote."
    }
  ],
} satisfies ToolFacts;
