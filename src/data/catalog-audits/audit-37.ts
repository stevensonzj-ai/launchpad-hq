/**
 * Catalog audit #37 (2026-11-23): Nov 23 AI X-watch.
 * Facts below were re-read on the vendor page that day. X posts were leads only.
 * checkedAt is 2026-11-23 only on facts that page confirmed.
 *
 * Guarded SQL: scripts/sql/catalog-xwatch-20261123.sql. Not run from here.
 * Updates only. No new platform slugs.
 */

export const CHECKED_AT = "2026-11-23";

export type Audit37Skip = {
  item: string;
  status: "confirmed-not-written" | "not-confirmed";
  reason: string;
  source: string;
};

/**
 * Confirmed on a vendor page but not written, or not confirmed on the page
 * the claim named. No new platform slugs.
 */
export const AUDIT_37_SKIPPED: Audit37Skip[] = [
  {
    item: "GLM-5.4",
    status: "confirmed-not-written",
    reason:
      "The 2026-11-23 post calls GLM-5.4 the first Loop Transformer flagship, lists GLM Coding Plan, ZCode, and Z.ai Chat, marks the API as coming soon, and says open weights are planned after safety hardening. It states no per-token price. It describes coding and vision improvements, including writing code that generates video, games, and 3D work. It does not say the model accepts image input. There is no Z.ai, GLM, or Zhipu platform row, and this watch does not add one.",
    source: "https://z.ai/blog/glm-5.4",
  },
  {
    item: "Inkling 2 Mini",
    status: "confirmed-not-written",
    reason:
      "The 2026-11-20 news post and the Hugging Face card agree: Apache 2.0 weights, looped mixture-of-experts, 26.4B total parameters and 3.4B active, context up to 1M tokens. The card says Apple silicon devices with 32GB or more memory can run it. The card also says three loop passes make about 5.4B effective active parameters. There is no Thinking Machines, Inkling, or Tinker row. Audit 36 left Inkling 2 Small unlisted for the same reason. No new slug.",
    source: "https://huggingface.co/thinkingmachines/Inkling-2-Mini",
  },
  {
    item: "MAI Image 2.7, MAI Image 2.7 Flash, and MAI Realtime 1",
    status: "confirmed-not-written",
    reason:
      "The image post, dated 2026-11-17, says both image models are in public preview on Microsoft Foundry, at about $35 and about $10 per 1,000 images, and names fal, Genspark, OpenRouter, and Vercel as partners. The Ignite post says MAI Realtime 1 starts at $0.01 per audio minute and points readers to MAI Labs and a registration form. Neither post places these models in GitHub Copilot or Microsoft Copilot. There is no Foundry or MAI row. The tilde prices are the page's own approximations. No new slug.",
    source: "https://microsoft.ai/news/introducing-mai-image-2-7/",
  },
  {
    item: "MAI Cyber 2 Flash as an available API",
    status: "confirmed-not-written",
    reason:
      "The Ignite post describes MAI Cyber 2 Flash and says its output-token price is 86% lower than MAI Cyber 1.1 Flash. It does not name a public API, and it does not say that no public API exists. It is not listed as available.",
    source: "https://microsoft.ai/news/microsoft-ignite-2026/",
  },
  {
    item: "Wan 3.0 in ComfyUI",
    status: "not-confirmed",
    reason:
      "No ComfyUI page fetched on 2026-11-23 said Wan 3.0 is in ComfyUI. Runway's models page lists WAN 3.0 (wan3) with a 2026-08-26 label. That is Runway, not ComfyUI, so it was not written onto the ComfyUI row.",
    source: "https://docs.dev.runwayml.com/guides/models/",
  },
  {
    item: "Hy4 on Ollama Cloud and Together",
    status: "not-confirmed",
    reason:
      "No Ollama or Together page confirmed Hy4 on Ollama Cloud or Together on 2026-11-23. Not written.",
    source: "https://ollama.com/",
  },
  {
    item: "Seedance 2.5 Flash on Pika",
    status: "not-confirmed",
    reason:
      "No Pika page confirmed Seedance 2.5 Flash. Runway's models page lists seedance2_5_flash, dated 2026-11-16, as a faster Seedance 2.5 for video up to 30 seconds at 480p and 720p. That is Runway, not Pika, so it was not written onto the Pika row.",
    source: "https://docs.dev.runwayml.com/guides/models/",
  },
  {
    item: "Runway Agent",
    status: "not-confirmed",
    reason:
      "Runway's developer guides describe connecting an outside coding agent to Runway Dev. They do not name a product called Runway Agent. Not written.",
    source: "https://dev.runwayml.com/learn/build-with-your-coding-agent",
  },
  {
    item: "Perplexity Computer Chromium extension",
    status: "not-confirmed",
    reason: "No official Perplexity page confirmed a Computer Chromium extension on 2026-11-23. Not written.",
    source: "https://www.perplexity.ai/",
  },
];
