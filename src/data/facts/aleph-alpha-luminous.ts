import type { ToolFacts } from "./types";

/**
 * Aleph Alpha. Cohere's 16 September 2026 announcement still says the
 * combination needs regulatory approvals (re-read 2026-11-26). Kolibri 1.1
 * facts are on `features`, from the news post and the Hugging Face model card.
 */
export default {
  slug: "aleph-alpha-luminous",
  lifecycle: "active",
  status: {
    value: {
      headline: "On September 16, 2026, Cohere announced a definitive business combination agreement with Aleph Alpha. Cohere says the deal still needs final regulatory approvals and is expected to close later in 2026.",
    },
    sourceUrl: "https://cohere.com/blog/cohere-and-aleph-alpha-sign-agreement",
    note: "Re-read 2026-11-26. The announcement still says the transaction needs final regulatory approvals and was expected to close later in 2026. It does not say the deal has closed.",
    checkedAt: "2026-11-26",
    gatheredBy: "claude-subagent",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  features: {
    value: [
      "Aleph Alpha's news post dated 23 November 2026 says Kolibri 1.1 is an open-weight language model, available on Hugging Face under the Apache 2.0 license, with 75 billion total parameters and 3 billion active parameters. The same post says this was seven weeks after Kolibri 1.0, that the model supports a 1-million-token context window, and that it can run on GPUs with 24 GB of VRAM.",
      "The Kolibri 1.1 model card (https://huggingface.co/Aleph-Alpha/Kolibri-1.1, read 2026-11-26) says the memory footprint is about 77.6 GB. Minimum hardware is 2× H100 SXM5, 2× H200, 1× B200 or 1× B300. It counts 3.44 billion active parameters. Native context is 262,144 tokens, extendable to 1,048,576, and it recommends at most 262,144 tokens for complex tasks. The Apache 2.0 licence covers the weights and configuration files in that repository, not the architecture or training method. The news post's 24 GB VRAM sentence is the announcement's claim, not this hardware line.",
    ],
    note: "News post and https://huggingface.co/Aleph-Alpha/Kolibri-1.1, both read 2026-11-26. The post says 1 million tokens, 3 billion active, and 24 GB of VRAM. The card says about 77.6 GB, minimum 2× H100 SXM5, 2× H200, 1× B200 or 1× B300, 3.44 billion active, and 262,144 native context up to 1,048,576.",
    sourceUrl: "https://aleph-alpha.com/en/news/kolibri-1-1-release/",
    sourceKind: "announcement",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "features",
      summary:
        "Hardware correction: the model card's requirement is about 77.6 GB, minimum 2× H100 SXM5, 2× H200, 1× B200 or 1× B300. The news post's 24 GB line stays labeled as the announcement's claim. Card also states 3.44 billion active and 262,144 native context, up to 1,048,576.",
    },
    {
      date: "2026-11-26",
      field: "features",
      summary:
        "X-watch: Kolibri 1.1 is an open-weight model on Hugging Face under the Apache 2.0 license, 75 billion total parameters and 3 billion active. Recorded on this row.",
    },
    {
      date: "2026-10-20",
      field: "status",
      summary: "Added dated note on the pending Cohere deal.",
    },
  ],
} satisfies ToolFacts;
