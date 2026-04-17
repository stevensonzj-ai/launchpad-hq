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
          {
            name: "Perplexity",
            slug: "perplexity-ai",
            rationale:
              "Best for research with cited sources. Ideal when you need accurate, web-grounded facts for your post.",
          },
          {
            name: "ChatGPT",
            slug: "chatgpt",
            rationale:
              "Best for drafting and rewriting in a conversational flow. Easy for beginners to iterate on tone and structure.",
          },
          {
            name: "Grammarly",
            slug: "grammarly",
            rationale:
              "Best for polishing. Catches mistakes and improves clarity so your final draft reads professional.",
          },
        ],
        note: "Research with citations, long-form drafting, then style and clarity pass.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced cost",
        tools: [
          {
            name: "ChatGPT",
            slug: "chatgpt",
            rationale:
              "Balanced choice for outlining and drafting without a separate research tool. Strong free tier for everyday posts.",
          },
          {
            name: "Notion AI",
            slug: "notion-ai",
            rationale:
              "Keeps drafts and edits in one workspace. Fits this tier when you want structure and light AI assists in Notion.",
          },
        ],
        note: "Draft in chat, organize and edit in Notion with built-in AI assists.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Mostly free",
        tools: [
          {
            name: "Google Gemini",
            slug: "gemini",
            rationale:
              "Free and capable for drafting and brainstorming. Good when keeping cost at zero is the priority.",
          },
          {
            name: "LanguageTool",
            rationale:
              "Free grammar and style checking without a paid editor. Pairs well with any free chat model for cleanup.",
          },
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
          {
            name: "Midjourney",
            slug: "midjourney",
            rationale:
              "Top-tier aesthetic quality for this workflow. Best when you want standout visuals and accept a paid stack.",
          },
          {
            name: "Leonardo AI",
            slug: "leonardo-ai",
            rationale:
              "Fast iteration and strong models in-app—ideal second step after Midjourney for more variants or a different aesthetic.",
          },
        ],
        note: "Premium generation plus a second AI image tool for iteration and alternatives.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "Adobe Firefly",
            slug: "adobe-firefly",
            rationale:
              "Solid generative images inside Adobe’s ecosystem. Balances quality with brand-safe workflows.",
          },
          {
            name: "Canva AI",
            slug: "canva-magic-studio",
            rationale:
              "Layouts, templates, and quick social-ready exports. Ideal hybrid path for marketing visuals without deep design tools.",
          },
        ],
        note: "Firefly for generation, Canva for layouts and brand kits.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Leonardo AI",
            slug: "leonardo-ai",
            rationale:
              "Strong free credits and fast iteration for concepts. Fits budget runs before you invest in premium gens.",
          },
          {
            name: "Ideogram",
            slug: "ideogram",
            rationale:
              "Competitive free tier for text-in-image and general generation. Good default when cost must stay low.",
          },
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
          {
            name: "ElevenLabs",
            slug: "elevenlabs",
            rationale:
              "Leading natural TTS and cloning when quality is non‑negotiable. Optimal tier for broadcast-style narration.",
          },
          {
            name: "Descript",
            slug: "descript",
            rationale:
              "Edit audio like a doc and clean up takes fast. Pairs with premium TTS for a full studio-style pipeline.",
          },
        ],
        note: "Clone voices only per platform terms; edit in a DAW or Descript.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "ElevenLabs",
            slug: "elevenlabs",
            rationale:
              "Invest in voice quality while saving on other tools. Balanced if narration is the main spend.",
          },
          {
            name: "Murf AI",
            slug: "murf-ai",
            rationale:
              "Compare a second premium TTS without Audacity—useful for A/B voices before you lock a take.",
          },
        ],
        note: "Two Launchpad voice tools: flagship ElevenLabs plus Murf for alternatives.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Murf AI",
            slug: "murf-ai",
            rationale:
              "Try free tiers for voiceovers before upgrading. Fits narrated explainers on a tight budget.",
          },
          {
            name: "PlayHT",
            slug: "play-ht",
            rationale:
              "Second free-first TTS to compare voices side by side—good before you commit to a paid voice stack.",
          },
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
          {
            name: "Runway",
            slug: "runway",
            rationale:
              "Generative video and effects at pro level. Optimal when AI shots are central to your edits.",
          },
          {
            name: "InVideo AI",
            slug: "invideo-ai",
            rationale:
              "Templates and AI-assisted assembly in one product—pairs with Runway for gen-to-edit without a legacy NLE.",
          },
        ],
        note: "AI generation plus template-based editing in tools we list on Launchpad.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "InVideo AI",
            slug: "invideo-ai",
            rationale:
              "Template-heavy edits with AI assists—faster than building from scratch. Balanced cost for social content.",
          },
          {
            name: "Google Veo",
            slug: "google-veo-3-1",
            rationale:
              "Google’s generative video model for clips and ideas—pairs with InVideo for a full AI-first hybrid stack.",
          },
        ],
        note: "Two Launchpad-listed AI video tools: templates plus generative clips.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Luma Dream Machine",
            slug: "luma-dream-machine-ray3",
            rationale:
              "Generate clips on a generous free path when available. Budget-friendly B-roll before heavier editing.",
          },
          {
            name: "Google Veo",
            slug: "google-veo-3-1",
            rationale:
              "Extra generative shots on Google’s stack—stays $0-friendly when your quota allows; good variety next to Luma.",
          },
        ],
        note: "Two AI video generators you can open from Launchpad—no non-AI NLE required.",
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
          {
            name: "Cursor",
            slug: "cursor",
            rationale:
              "Agentic edits inside your repo. Optimal when you want AI to reason across files like an IDE teammate.",
          },
          {
            name: "GitHub Copilot",
            slug: "github-copilot",
            rationale:
              "Inline completions and chat in VS Code–style workflows. Best paired with Cursor for speed and safety.",
          },
        ],
        note: "IDE-native agents plus inline completion; keep human review.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "Claude",
            slug: "claude",
            rationale:
              "Long-context reasoning for design and refactors. Hybrid when you want one strong model without full IDE lock-in.",
          },
          {
            name: "Gemini",
            slug: "gemini",
            rationale:
              "Second assistant for quick tries and multimodal snippets—pairs with Claude without listing a non-AI editor.",
          },
        ],
        note: "Two AI assistants for architecture and fast iteration—no generic IDE required.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Replit",
            slug: "replit-agent",
            rationale:
              "Hosted coding with AI help on free tiers for small projects. Ideal for prototypes without local setup.",
          },
          {
            name: "Ollama",
            slug: "ollama",
            rationale:
              "Run open models locally at no API cost. Budget pick when privacy and $0 inference matter most.",
          },
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
          {
            name: "Otter.ai",
            slug: "otter-ai",
            rationale:
              "Live transcription with speaker labels and search. Optimal when meeting notes must be reliable and shareable.",
          },
          {
            name: "Notion AI",
            slug: "notion-ai",
            rationale:
              "Summarize and organize notes where your team already works. Best for turning transcripts into tasks.",
          },
        ],
        note: "Live notes with speaker ID; push to your knowledge base.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "Descript",
            slug: "descript",
            rationale:
              "Edit audio via transcript—great accuracy for podcasts. Hybrid when you need pro cleanup without full enterprise stack.",
          },
          {
            name: "Google Docs",
            rationale:
              "Free collaboration for cleaned-up text. Pair with any ASR export for a low-cost documentation loop.",
          },
        ],
        note: "Transcript-first editing; export to docs.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Whisper (local)",
            rationale:
              "Open-source ASR you can run offline for $0. Budget choice if you can handle setup and GPU/CPU time.",
          },
          {
            name: "Obsidian",
            rationale:
              "Free markdown vault for storing transcripts and notes. No subscription—ideal for privacy-first workflows.",
          },
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
          {
            name: "Perplexity",
            slug: "perplexity-ai",
            rationale:
              "Web-grounded answers with citations. Optimal when research must be checkable and up to date.",
          },
          {
            name: "NotebookLM",
            slug: "notebooklm",
            rationale:
              "Ground answers in your PDFs and docs. Best for deep synthesis after you’ve gathered sources.",
          },
        ],
        note: "Live web research plus document-grounded synthesis.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "Claude",
            slug: "claude",
            rationale:
              "Long documents and careful reasoning. Hybrid when you want strong analysis without a full research suite.",
          },
          {
            name: "ChatGPT",
            slug: "chatgpt",
            rationale:
              "Fast iteration and summarization everyone knows. Balanced default for team research with lower friction.",
          },
        ],
        note: "Long context for PDFs; verify every claim manually.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Microsoft Copilot",
            slug: "microsoft-copilot",
            rationale:
              "Often bundled with tools you already pay for. Budget-friendly entry to AI in Word and Edge workflows.",
          },
          {
            name: "Gemini",
            slug: "gemini",
            rationale:
              "Free tier for quick scans and drafts. Good when you need breadth without adding another subscription.",
          },
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
          {
            name: "Jasper AI",
            slug: "jasper-ai",
            rationale:
              "Campaign-focused copy with brand controls. Optimal when marketing needs repeatable, on‑voice output at scale.",
          },
          {
            name: "Buffer",
            rationale:
              "Schedule and analyze posts across channels. Pairs with Jasper for end-to-end social workflows.",
          },
        ],
        note: "Campaign workflows plus scheduling; train on your tone.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "ChatGPT",
            slug: "chatgpt",
            rationale:
              "Hooks and variants in minutes. Hybrid sweet spot: strong copy without a dedicated marketing AI suite.",
          },
          {
            name: "Canva AI",
            slug: "canva-magic-studio",
            rationale:
              "Visuals and templates in one place. Balanced when posts need graphics plus copy without pro design tools.",
          },
        ],
        note: "Copy plus visual templates in one loop.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Gemini",
            slug: "gemini",
            rationale:
              "Free drafting for captions and ideas. Best budget option when every dollar counts.",
          },
          {
            name: "InVideo AI",
            slug: "invideo-ai",
            rationale:
              "Template-based short video on a Launchpad profile—avoids non-listed editors while still fitting budget workflows.",
          },
        ],
        note: "Draft in chat; assemble short video with a listed AI video tool.",
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
          {
            name: "Otter.ai",
            slug: "otter-ai",
            rationale:
              "Accurate transcripts and search for teams. Optimal when meetings are your system of record.",
          },
          {
            name: "Zapier",
            slug: "zapier",
            rationale:
              "Automate pushing notes into CRMs and PM tools. Best when workflows must be hands-off after each call.",
          },
        ],
        note: "Transcripts into CRM or PM tools with automations.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "Fireflies.ai",
            rationale:
              "Searchable meeting memory and summaries. Hybrid when you need solid capture without full enterprise pricing.",
          },
          {
            name: "Notion AI",
            slug: "notion-ai",
            rationale:
              "Link summaries to project pages your team already uses. Balanced ops: notes plus light AI assists.",
          },
        ],
        note: "Searchable meeting memory linked to project pages.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Gemini",
            slug: "gemini",
            rationale:
              "Summarize pasted notes or short clips on the free tier. Budget path when you manually feed it text.",
          },
          {
            name: "Google Docs",
            rationale:
              "Free shared docs for cleaned minutes. Combine with manual recording for a $0 documentation habit.",
          },
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
          {
            name: "Intercom",
            rationale:
              "AI inside the inbox with macros and routing. Optimal when support volume needs automation plus human handoff.",
          },
          {
            name: "Zendesk",
            rationale:
              "Enterprise ticketing with AI add-ons. Best when SLAs, reporting, and scale are non‑negotiable.",
          },
        ],
        note: "Native AI in helpdesk; tune on your macros and policies.",
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Balanced",
        tools: [
          {
            name: "ChatGPT",
            slug: "chatgpt",
            rationale:
              "Draft empathetic replies from bullet facts. Hybrid when you want strong language without a full helpdesk AI.",
          },
          {
            name: "Gmail",
            rationale:
              "Where replies actually send—free or workspace. Pair with ChatGPT for copy/paste review workflows.",
          },
        ],
        note: "Draft in sandbox; paste after human review only.",
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first",
        tools: [
          {
            name: "Claude",
            slug: "claude",
            rationale:
              "Careful wording for sensitive tickets on free/cheap tiers. Budget pick when tone and safety matter most.",
          },
          {
            name: "Help Scout",
            rationale:
              "Simple shared inbox for small teams. Often affordable—good when you need structure without Zendesk complexity.",
          },
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
