import type { WorkflowTemplate } from "./types";

/**
 * Starter workflow templates: Optimal / Hybrid / Budget.
 * Optional `slug` on tools links to `/platform/[slug]` when present (must exist in DB).
 */
export const WORKFLOWS: WorkflowTemplate[] = [
  {
    slug: "blog-post-generator",
    title: "Blog post generator",
    description:
      "Research, outline, draft, and polish a publish-ready article using complementary AI tools.",
    tags: ["writing", "content"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Best experience",
        tools: [
          { name: "Perplexity", slug: "perplexity-ai" },
          { name: "ChatGPT", slug: "chatgpt" },
          { name: "Grammarly", slug: "grammarly" },
        ],
        note: "Research with citations, long-form drafting, then style and clarity pass.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced cost",
        tools: [
          { name: "ChatGPT", slug: "chatgpt" },
          { name: "Notion AI", slug: "notion-ai" },
        ],
        note: "Draft in chat, organize and edit in Notion with built-in AI assists.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Mostly free",
        tools: [
          { name: "Google Gemini", slug: "gemini" },
          { name: "LanguageTool" },
        ],
        note: "Free models for drafting; pair with a free grammar checker.",
      },
    },
  },
  {
    slug: "image-generation",
    title: "Image generation",
    description: "Concept art, marketing visuals, and iterations from prompt to final asset.",
    tags: ["image", "design"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Pro quality",
        tools: [
          { name: "Midjourney", slug: "midjourney" },
          { name: "Adobe Photoshop" },
        ],
        note: "High-end generation plus pro retouching when needed.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "Adobe Firefly", slug: "adobe-firefly" },
          { name: "Canva AI", slug: "canva-ai" },
        ],
        note: "Firefly for generation, Canva for layouts and brand kits.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Leonardo AI", slug: "leonardo-ai" },
          { name: "Ideogram", slug: "ideogram" },
        ],
        note: "Strong free tiers; add local Stable Diffusion if you self-host.",
      },
    },
  },
  {
    slug: "voice-clone",
    title: "Voice & narration",
    description: "Text-to-speech, cloning, and podcast-ready audio without a studio.",
    tags: ["audio", "voice"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Studio-grade",
        tools: [
          { name: "ElevenLabs", slug: "elevenlabs" },
          { name: "Descript" },
        ],
        note: "Clone voices only per platform terms; edit in a DAW or Descript.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "ElevenLabs", slug: "elevenlabs" },
          { name: "Audacity" },
        ],
        note: "Premium TTS with free desktop cleanup.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Murf AI" },
          { name: "PlayHT" },
        ],
        note: "Use free tiers until you need commercial licensing.",
      },
    },
  },
  {
    slug: "video-editing",
    title: "Video editing & shorts",
    description: "Script, generate B-roll, edit, and export for social or web.",
    tags: ["video", "social"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Full stack",
        tools: [
          { name: "Runway", slug: "runway" },
          { name: "Adobe Premiere Pro" },
        ],
        note: "Generative video plus a pro NLE you already know.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "InVideo AI", slug: "invideo-ai" },
          { name: "CapCut" },
        ],
        note: "AI assembly and templates; mobile finishing with CapCut.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Luma Dream Machine", slug: "luma-dream-machine" },
          { name: "DaVinci Resolve" },
        ],
        note: "Generative clips where free; Resolve for assembly and color.",
      },
    },
  },
  {
    slug: "code-writing",
    title: "Code writing & shipping",
    description: "From prototype to PR: AI-assisted coding with review and tests.",
    tags: ["code", "dev"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Ship fast",
        tools: [
          { name: "Cursor", slug: "cursor" },
          { name: "GitHub Copilot", slug: "github-copilot" },
        ],
        note: "IDE-native agents plus inline completion; keep human review.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "Claude", slug: "claude" },
          { name: "VS Code" },
        ],
        note: "Chat for architecture; editor for implementation.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Replit", slug: "replit-agent" },
          { name: "Ollama" },
        ],
        note: "Hosted sandboxes or local open models for experimentation.",
      },
    },
  },
  {
    slug: "audio-transcription",
    title: "Audio transcription",
    description: "Turn recordings into searchable text, summaries, and action items.",
    tags: ["audio", "productivity"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Accuracy + workflow",
        tools: [
          { name: "Otter.ai" },
          { name: "Notion AI", slug: "notion-ai" },
        ],
        note: "Live notes with speaker ID; push to your knowledge base.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "Descript" },
          { name: "Google Docs" },
        ],
        note: "Transcript-first editing; export to docs.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Whisper (local)" },
          { name: "Obsidian" },
        ],
        note: "Open-source ASR + markdown vaults; zero SaaS if self-hosted.",
      },
    },
  },
  {
    slug: "content-research",
    title: "Content research",
    description: "Gather sources, synthesize findings, and export briefs your team can trust.",
    tags: ["research", "writing"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Cited answers",
        tools: [
          { name: "Perplexity", slug: "perplexity-ai" },
          { name: "NotebookLM", slug: "notebooklm" },
        ],
        note: "Live web research plus document-grounded synthesis.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "Claude", slug: "claude" },
          { name: "ChatGPT", slug: "chatgpt" },
        ],
        note: "Long context for PDFs; verify every claim manually.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Microsoft Copilot", slug: "microsoft-copilot" },
          { name: "Gemini", slug: "gemini" },
        ],
        note: "Free tiers for quick scans; keep primary sources open side by side.",
      },
    },
  },
  {
    slug: "social-media-posts",
    title: "Social media posts",
    description: "Batch ideas, hooks, and platform-specific copy with a consistent voice.",
    tags: ["social", "marketing"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Brand-safe scale",
        tools: [
          { name: "Jasper AI" },
          { name: "Buffer" },
        ],
        note: "Campaign workflows plus scheduling; train on your tone.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "ChatGPT", slug: "chatgpt" },
          { name: "Canva AI", slug: "canva-ai" },
        ],
        note: "Copy plus visual templates in one loop.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Gemini", slug: "gemini" },
          { name: "CapCut" },
        ],
        note: "Draft in chat; short-form video in a mobile editor.",
      },
    },
  },
  {
    slug: "meeting-intelligence",
    title: "Meeting intelligence",
    description: "Capture meetings, extract decisions, and sync tasks to your stack.",
    tags: ["productivity", "work"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Enterprise-ready",
        tools: [
          { name: "Otter.ai" },
          { name: "Zapier", slug: "zapier" },
        ],
        note: "Transcripts into CRM or PM tools with automations.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "Fireflies.ai" },
          { name: "Notion AI", slug: "notion-ai" },
        ],
        note: "Searchable meeting memory linked to project pages.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Gemini", slug: "gemini" },
          { name: "Google Docs" },
        ],
        note: "Built-in summaries where available; otherwise paste into free models.",
      },
    },
  },
  {
    slug: "customer-support",
    title: "Customer support drafts",
    description: "Draft replies, escalate edge cases, and keep a consistent support voice.",
    tags: ["support", "business"],
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Integrated",
        tools: [
          { name: "Intercom" },
          { name: "Zendesk" },
        ],
        note: "Native AI in helpdesk; tune on your macros and policies.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          { name: "ChatGPT", slug: "chatgpt" },
          { name: "Gmail" },
        ],
        note: "Draft in sandbox; paste after human review only.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          { name: "Claude", slug: "claude" },
          { name: "Help Scout" },
        ],
        note: "Free tiers for low volume; scale prompts from your FAQ doc.",
      },
    },
  },
];

export function getWorkflowBySlug(slug: string): WorkflowTemplate | undefined {
  return WORKFLOWS.find((w) => w.slug === slug);
}

export function getAllWorkflows(): WorkflowTemplate[] {
  return WORKFLOWS;
}
