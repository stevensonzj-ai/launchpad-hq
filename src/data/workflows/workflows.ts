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
    costRange:
      "$0 (Gemini Free + LanguageTool Basic) to ~$20–$50+/mo as of 2026-10-14, depending on ChatGPT Plus, Perplexity Pro, and Grammarly Pro",
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Cited research, long-form draft, then a grammar pass",
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
        note: "Prices: ChatGPT Plus $20/mo (OpenAI Help, as of 2026-10-14). Perplexity Pro listed at $17/mo billed annually on perplexity.ai/pro (as of 2026-10-14; monthly rate unverified). Grammarly Pro shows $12 on grammarly.com/plans (as of 2026-10-14; billing interval unverified).",
        estMonthlyCost:
          "~$20–$50+/mo as of 2026-10-14 (ChatGPT Plus $20/mo per help.openai.com; Perplexity Pro $17/mo billed annually per perplexity.ai/pro; Grammarly Pro $12 on grammarly.com/plans — billing interval unverified). Stay on Free/Basic tiers to spend $0.",
        timeEstimate: "About 45–90 minutes for a 1,000-word post",
        result: "A cited outline plus a publish-ready draft with a grammar pass",
        steps: [
          {
            order: 1,
            label: "Research with citations",
            toolSlug: "perplexity-ai",
            name: "Perplexity",
            action:
              "Ask for sources on your topic. Save the URLs you will actually cite. Do not copy prose from the answer.",
            prompt:
              "Research this topic for a beginner audience: [TOPIC]. List 6–8 current facts with source URLs. Flag anything that looks opinion, marketing, or older than 18 months. I need a blog post, not a recap of your answer.",
          },
          {
            order: 2,
            label: "Outline and draft",
            toolSlug: "chatgpt",
            name: "ChatGPT",
            action:
              "Paste your notes (not a dump of search results). Ask for an outline first, then a draft in your voice. Edit facts against the sources from step 1.",
            prompt:
              "Using only these notes and URLs:\n[PASTE NOTES]\nWrite a clear outline (H2s + bullets), then a draft of about 1,000 words for beginners. Do not invent sources. Mark any claim you cannot support from the notes as [unverified]. Tone: practical, not hype.",
          },
          {
            order: 3,
            label: "Polish grammar and clarity",
            toolSlug: "grammarly",
            name: "Grammarly",
            action:
              "Paste or open the draft in Grammarly. Accept only edits that keep your meaning. Recheck any rewritten sentence against your sources.",
          },
        ],
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "One paid chat tool plus a workspace",
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
        note: "Notion AI is a limited trial on Free and Plus; Notion Agent is included on Business ($20/member/mo on notion.com/pricing as of 2026-10-14).",
        estMonthlyCost:
          "~$20/mo as of 2026-10-14 if you pay ChatGPT Plus and keep Notion on Free (Notion AI = limited trial on Free/Plus per notion.com/pricing). Notion Business is $20/member/mo if you need Notion Agent. ChatGPT Free is $0.",
        timeEstimate: "About 40–75 minutes",
        result: "A structured draft living next to your notes in Notion",
        steps: [
          {
            order: 1,
            label: "Draft in chat",
            toolSlug: "chatgpt",
            name: "ChatGPT",
            action:
              "Use ChatGPT (Free or Plus) to outline and write. Search the web yourself for anything that must be cited.",
            prompt:
              "I am writing a blog post on [TOPIC] for beginners. Ask me 5 clarifying questions, then propose an outline. After I approve the outline, write the draft. Do not invent statistics.",
          },
          {
            order: 2,
            label: "Organize and light-edit in Notion",
            toolSlug: "notion-ai",
            name: "Notion AI",
            action:
              "Move the draft into a Notion page. Use trial AI or Agent (Business) only to tighten headings and a short summary — you still own the facts.",
            prompt:
              "Tighten this draft’s headings and write a 2-sentence intro. Do not add new claims:\n[PASTE DRAFT]",
          },
        ],
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free chat plus a free grammar checker",
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
        note: "Gemini Free is listed on gemini.google/subscriptions as of 2026-10-14. LanguageTool Basic/free is on languagetool.org/pricing; Premium starts at €19.90/mo per LanguageTool Help (2026-03-24).",
        estMonthlyCost:
          "$0 as of 2026-10-14 on Gemini Free (gemini.google/subscriptions) and LanguageTool Basic (languagetool.org/pricing). LanguageTool Premium is optional (€19.90/mo per official Help, March 2026).",
        timeEstimate: "About 40–80 minutes",
        result: "A readable draft you can publish after a free grammar pass",
        steps: [
          {
            order: 1,
            label: "Draft in Gemini",
            toolSlug: "gemini",
            name: "Google Gemini",
            action:
              "Use the Gemini app on the Free plan. Keep facts you can check yourself. Paid Google AI plans exist; this recipe stays on Free.",
            prompt:
              "Write a beginner blog post on [TOPIC], about 800–1,000 words, with H2s. No invented stats. End with 3 questions I should verify before publishing.",
          },
          {
            order: 2,
            label: "Check grammar (free)",
            name: "LanguageTool",
            action:
              "Paste the draft into LanguageTool’s free checker (2,000-character field limit on Basic per languagetool.org/pricing as of 2026-10-14 — check long posts in chunks).",
          },
        ],
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
            slug: "canva-ai-magic-studio",
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
    costRange:
      "Try-for-free / Free Gemini clips (limits unverified) up to ~$22–$45+/mo as of 2026-10-14 on Runway Standard + InVideo Starter (annual list prices)",
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Generate clips, then assemble in a template editor",
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
        note: "Runway Standard is $12/mo billed annually or $15/mo on runwayml.com/pricing (as of 2026-10-14); Free includes a one-time 125 credits. InVideo Starter is $10/seat/mo billed annually ($20 monthly list) on invideo.io/pricing as of 2026-10-14.",
        estMonthlyCost:
          "~$22–$35/mo as of 2026-10-14 on annual Runway Standard ($12) + InVideo Starter ($10/seat); ~$35/mo if both are billed monthly ($15 + $20). Credit burn above the plan allotment is unverified for your usage.",
        timeEstimate: "About 1–3 hours for a 30–60s short",
        result: "A social-ready short with AI B-roll and captions from a template editor",
        steps: [
          {
            order: 1,
            label: "Script the short",
            toolSlug: "runway",
            name: "Runway",
            action:
              "Write a 20–40 second script first (you can use any notes app). Then generate only the shots you cannot film.",
            prompt:
              "Turn this idea into a 30-second vertical script with 5 shot descriptions (who/what, camera, duration):\n[IDEA]\nKeep on-screen text under 8 words per shot.",
          },
          {
            order: 2,
            label: "Generate B-roll",
            toolSlug: "runway",
            name: "Runway",
            action:
              "Generate short clips from each shot line. Stay inside the plan’s monthly credits (Standard: 125 credits/month on the annual page copy as of 2026-10-14).",
          },
          {
            order: 3,
            label: "Assemble and export",
            toolSlug: "invideo-ai",
            name: "InVideo AI",
            action:
              "Upload or describe the sequence in InVideo. Use a short-form template, add captions, export in 9:16. Starter has no guest seats (official pricing page as of 2026-10-14).",
            prompt:
              "Create a 30-second 9:16 video. Hook in the first 2 seconds. Use this script and shot list:\n[PASTE]. Add burned-in captions. No extra claims beyond the script.",
          },
        ],
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Templates plus Google generative clips",
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
        note: "Veo 3.1 Lite is described as a limited trial on Google AI Pro; Veo 3.1 is highlighted on Google AI Ultra ($99.99/mo on gemini.google/subscriptions as of 2026-10-14). Google AI Plus/Pro dollar amounts were not shown as numbers on that page fetch (unverified).",
        estMonthlyCost:
          "InVideo Starter $10/seat/mo billed annually ($20 monthly) as of 2026-10-14 (invideo.io/pricing), plus Google video access: Ultra listed at $99.99/mo; Plus/Pro prices unverified on gemini.google/subscriptions as of 2026-10-14.",
        timeEstimate: "About 45–120 minutes",
        result: "A template-built short with one or two generated clips",
        steps: [
          {
            order: 1,
            label: "Generate a clip in Google’s video tools",
            toolSlug: "google-veo-3-1",
            name: "Google Veo",
            action:
              "Use Veo from the Gemini / Flow path your Google AI plan includes. Quotas and which Veo variant you get depend on the plan — treat limits as unverified unless you see them in-product.",
            prompt:
              "5-second clip, 9:16, natural lighting, [SUBJECT] [ACTION], no on-screen text, no logos.",
          },
          {
            order: 2,
            label: "Build the rest in InVideo",
            toolSlug: "invideo-ai",
            name: "InVideo AI",
            action:
              "Drop the generated clip into an InVideo short template. Write the hook yourself so the AI does not invent claims.",
            prompt:
              "Assemble a 20–30s social video around this clip description and script:\n[PASTE]\nKeep brand claims only if I wrote them.",
          },
        ],
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Free-first generators",
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
        note: "Luma lists “Try for free” and paid Plus at $30/mo (10,000 credits) on lumalabs.ai/dream-machine/pricing as of 2026-10-14; free-tier credit amounts are unverified. Gemini Free includes some creative features; video generation availability on Free is unverified.",
        estMonthlyCost:
          "$0 if you stay on Luma’s try-for-free path and Gemini Free (limits unverified as of 2026-10-14). Luma Plus is $30/mo official if you outgrow free.",
        timeEstimate: "About 30–90 minutes",
        result: "A few generated clips you can post or drop into any editor",
        steps: [
          {
            order: 1,
            label: "Generate on Luma’s free path",
            toolSlug: "luma-dream-machine-ray3",
            name: "Luma Dream Machine",
            action:
              "Start from Luma’s try-for-free entry. If the product asks you to pay, stop — this tier is $0. Paid Plus is $30/mo official.",
            prompt:
              "Short 5s clip of [SCENE], handheld, daylight, no text, no celebrity likeness.",
          },
          {
            order: 2,
            label: "Optional second generator",
            toolSlug: "google-veo-3-1",
            name: "Google Veo",
            action:
              "If Gemini Free (or your existing Google AI plan) offers a video generate control, make one alternate clip. If it requires a paid plan you do not have, skip this step.",
          },
        ],
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
            slug: "jasper",
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
            slug: "canva-ai-magic-studio",
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
    costRange:
      "$0 (Fathom Free or Gemini + Docs) to ~$14–$37+/user/mo as of 2026-10-14 (Granola Business and/or Otter Pro + Zapier)",
    tiers: {
      optimal: {
        id: "optimal",
        name: "Optimal",
        tagline: "Bot-free notes plus automation — or Otter + Zapier",
        tools: [
          {
            name: "Granola",
            slug: "granola",
            rationale:
              "Device-audio capture with no bot in the call. Business unlocks unlimited history and Zapier/Notion integrations (granola.ai/pricing as of 2026-10-14).",
          },
          {
            name: "Otter.ai",
            slug: "otter-ai",
            rationale:
              "Accurate transcripts and search for teams when you want a meeting bot. Optimal when meetings are your system of record.",
          },
          {
            name: "Zapier",
            slug: "zapier",
            rationale:
              "Automate pushing notes into CRMs and PM tools. Best when workflows must be hands-off after each call.",
          },
        ],
        note: "Tell every attendee before you record. Granola Business is $14/user/mo official. Otter Pro is $16.99/user/mo monthly ($8.49 annual promo copy on otter.ai/pricing as of 2026-10-14). Zapier Professional starts at $19.99/mo annual for 750 tasks (zapier.com/pricing as of 2026-10-14); Free is 100 tasks/mo.",
        estMonthlyCost:
          "~$14/user/mo as of 2026-10-14 for Granola Business alone (granola.ai/pricing). Add Zapier only if you need automations beyond Granola’s included integrations: Zapier Pro $19.99/mo annual (750 tasks) or Free (100 tasks). Alternative: Otter Pro $16.99/user/mo monthly + Zapier.",
        timeEstimate: "Live capture; about 10–20 minutes after the call to file actions",
        result: "Searchable notes plus tasks in the tools you already use",
        steps: [
          {
            order: 1,
            label: "Capture the meeting",
            toolSlug: "granola",
            name: "Granola",
            action:
              "Prefer Granola when you do not want a bot to join. Basic is $0 with 30-day history (official). Upgrade to Business ($14/user/mo) for unlimited history and Zapier. Alternatively use Otter if you need a notetaker bot.",
          },
          {
            order: 2,
            label: "Extract decisions",
            toolSlug: "granola",
            name: "Granola",
            action:
              "Ask the meeting chat for decisions, owners, and due dates. Edit anything that is wrong before it leaves the tool.",
            prompt:
              "From this meeting, list: (1) decisions, (2) open questions, (3) action items as Owner — task — due date. Quote the transcript if you are unsure. Do not invent owners.",
          },
          {
            order: 3,
            label: "Route tasks",
            toolSlug: "zapier",
            name: "Zapier",
            action:
              "On Granola Business, use the official Zapier integration, or a Zapier Zap from Otter/Fireflies if you captured there. Free Zapier is 100 tasks/mo and two-step Zaps only.",
          },
        ],
      },
      hybrid: {
        id: "hybrid",
        name: "Hybrid",
        tagline: "Fireflies capture linked to Notion",
        tools: [
          {
            name: "Fireflies.ai",
            slug: "fireflies-ai",
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
        note: "Fireflies Free is $0; Pro is $18/user/mo monthly or $10/user/mo billed annually (guide.fireflies.ai billing terms, as of 2026-10-14). Notion AI Meeting Notes is on Business ($20/member/mo) per notion.com/pricing.",
        estMonthlyCost:
          "$0–$18/user/mo as of 2026-10-14 for Fireflies (Free vs Pro monthly). Notion Free/Plus has an AI trial only; add $20/member/mo if you need Notion Business / AI Meeting Notes.",
        timeEstimate: "Live capture; about 10–15 minutes to file the recap",
        result: "A searchable recap sitting on the right Notion page",
        steps: [
          {
            order: 1,
            label: "Let Fireflies join (with consent)",
            toolSlug: "fireflies-ai",
            name: "Fireflies.ai",
            action:
              "Connect calendar and tell attendees a notetaker will join. Stay on Free if volume is low; Pro adds video recording and more export/integrations (official billing guide).",
          },
          {
            order: 2,
            label: "Park the recap in Notion",
            toolSlug: "notion-ai",
            name: "Notion AI",
            action:
              "Paste or sync the summary onto the project page. Use Notion AI only to format — you confirm owners. Notion’s own AI Meeting Notes require Business.",
            prompt:
              "Turn this recap into a Notion page with: Summary, Decisions, Action items (Owner, due). Do not add attendees who were not listed:\n[PASTE]",
          },
        ],
      },
      budget: {
        id: "budget",
        name: "Budget",
        tagline: "Fathom Free, or paste notes into Gemini",
        tools: [
          {
            name: "Fathom",
            slug: "fathom",
            rationale:
              "Official Free plan: unlimited recordings and transcription, instant AI summaries (fathom.ai/pricing as of 2026-10-14).",
          },
          {
            name: "Gemini",
            slug: "gemini",
            rationale:
              "Summarize pasted notes on the free tier when you captured audio somewhere else.",
          },
          {
            name: "Google Docs",
            rationale:
              "Free shared docs for cleaned minutes. Combine with Fathom export or a manual transcript.",
          },
        ],
        note: "Fathom Premium is $20/mo monthly / $16 annual; Team $19/$15 per user with a 2-user minimum (fathom.ai/pricing as of 2026-10-14). This budget recipe stays on Free.",
        estMonthlyCost:
          "$0 as of 2026-10-14 on Fathom Free (unlimited recordings + transcription per fathom.ai/pricing) and Gemini Free. Google Docs is included with a free Google account (unverified extra Docs AI cost: none required for this recipe).",
        timeEstimate: "Live capture; about 10 minutes to clean the summary",
        result: "A shared Doc with decisions and owners",
        steps: [
          {
            order: 1,
            label: "Record with Fathom Free",
            toolSlug: "fathom",
            name: "Fathom",
            action:
              "Use Fathom’s Free plan (unlimited recordings and transcription, official). Bot-free capture is listed as beta for Mac. Consent still applies.",
          },
          {
            order: 2,
            label: "Optional cleanup in Gemini",
            toolSlug: "gemini",
            name: "Gemini",
            action:
              "If the auto-summary is messy, paste it into Gemini Free and ask for a decision log. Then paste into Google Docs for sharing.",
            prompt:
              "Rewrite this meeting summary as: decisions, owners, due dates, open questions. Do not add people or dates that are not in the text:\n[PASTE]",
          },
        ],
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
