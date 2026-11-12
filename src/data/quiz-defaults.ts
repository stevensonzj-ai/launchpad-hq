/**
 * Hand-set quiz default picks and the category guard (approved by Zach,
 * 2026-11-12). Read by src/lib/quiz-ranking.ts. Pure data: no React, no Prisma.
 *
 * Default picks lead the quiz results, in list order, when they pass the
 * same filters as every other tool (budget cost tiers, not hidden, not
 * discontinued); a pick that fails is skipped and the next one moves up.
 * "experienced" applies to intermediate and advanced answers.
 *
 * `why` is one plain sentence shown on the card. Rules: factual, no
 * superlatives, no prices or plan limits (prices come from catalog data),
 * and where the tool has a free plan the sentence is true of the free plan.
 * `source` is the vendor page checked on `checkedAt`.
 *
 * No slug in src/data/affiliates.ts may appear here (quiz-defaults.test.ts).
 */
import type { QUIZ_GOAL_OPTIONS } from "@/lib/quiz-options";

export type QuizGoalId = (typeof QUIZ_GOAL_OPTIONS)[number]["id"];

export type DefaultPick = {
  slug: string;
  why: string;
  source: string;
  checkedAt: string;
};

export type GoalDefaults = {
  beginner: readonly DefaultPick[];
  experienced: readonly DefaultPick[];
};

const CHECKED = "2026-11-12";
const pick = (slug: string, why: string, source: string): DefaultPick => ({ slug, why, source, checkedAt: CHECKED });

// ---------- picks ----------
// "(snippet)": the vendor page blocked automated fetches, so the wording was
// confirmed from that page's own search-result snippet.
// DECISION NEEDED: the sentence cannot be made true of a free plan, or could
// not be confirmed on a vendor page. Listed in the PR description.

const CHATGPT_WRITING = pick(
  "chatgpt",
  "A general-purpose chat assistant that drafts, rewrites and summarizes text, on the web and in mobile and desktop apps.",
  "https://chatgpt.com/pricing",
);
const CLAUDE_WRITING = pick(
  "claude",
  "A chat assistant for drafting and editing longer pieces; you can paste in or upload long documents and ask for revisions.",
  "https://support.claude.com/en/articles/8241126-upload-files-to-claude",
);
const GEMINI_WRITING = pick(
  "gemini",
  "Google's chat assistant; it drafts and edits text and can read documents and other files you upload.",
  "https://support.google.com/gemini/answer/14903178",
);
const NOTEBOOK_RESEARCH = pick(
  "gemini-notebook",
  "Answers questions from the sources you add to a notebook and cites the passages behind each answer; it can also help you find web sources.",
  "https://support.google.com/gemininotebook/answer/16215270",
);
// DECISION NEEDED: Khanmigo is free for teachers only; learners need a paid
// subscription. The catalog row is FREEMIUM, so it passes "Free only".
const KHANMIGO = pick(
  "khan-academy-khanmigo",
  "A tutor from Khan Academy that guides you to the answer instead of giving it away.",
  "https://www.khanmigo.ai/pricing",
);
// (snippet) quizlet.com returned 403 on every page; weakest evidence here.
const QUIZLET = pick(
  "quizlet-q-chat",
  "Turns your notes into practice tests and helps you study them with flashcards and quizzes.",
  "https://help.quizlet.com/hc/en-us/articles/25946589648013-Studying-with-Practice-Tests",
);
const NOTEBOOK_STUDY = pick(
  "gemini-notebook",
  "Answers questions about your study material and course notes, using the sources you add to a notebook.",
  "https://support.google.com/gemininotebook/answer/16215270",
);
const CHATGPT_DATA = pick(
  "chatgpt",
  "Reads a spreadsheet you upload, runs calculations and draws charts from it.",
  "https://chatgpt.com/pricing",
);
const GEMINI_DATA = pick(
  "gemini",
  "Analyzes spreadsheets and other files you upload, and in the web app can draw charts from that data.",
  "https://support.google.com/gemini/answer/14903178",
);
// DECISION NEEDED: spreadsheet upload on free Copilot is not confirmed; this
// article could not be opened (search snippet only).
const COPILOT_DATA = pick(
  "microsoft-copilot",
  "Reads a spreadsheet you upload and answers questions about the data in chat.",
  "https://support.microsoft.com/en-us/topic/file-upload-in-microsoft-copilot-8b7bf432-9576-4b16-9dee-6c19a4169e62",
);

export const QUIZ_DEFAULTS: Record<QuizGoalId, GoalDefaults> = {
  content_creation: {
    beginner: [CHATGPT_WRITING, CLAUDE_WRITING, GEMINI_WRITING],
    experienced: [
      CHATGPT_WRITING,
      CLAUDE_WRITING,
      GEMINI_WRITING,
      pick(
        "grammarly",
        "Checks spelling, grammar and clarity as you type, and shows how your tone comes across, in the apps and websites where you write.",
        "https://www.grammarly.com/free",
      ),
      pick(
        "quillbot", // (snippet)
        "Rewrites sentences in different styles and helps tighten wording, right in your web browser.",
        "https://quillbot.com/paraphrasing-tool",
      ),
    ],
  },
  coding: {
    beginner: [
      pick(
        "replit-agent",
        "Builds and runs an app in your browser from a plain-English description, with nothing to install.",
        "https://docs.replit.com/billing/plans/starter-plan",
      ),
      pick(
        "lovable",
        "Builds a working web app from a plain-English description of what you want, without writing code yourself.",
        "https://docs.lovable.dev/introduction/welcome",
      ),
      pick(
        "bolt-new",
        "Builds a web app in your browser as you chat with AI, then lets you keep editing it and publish it from the same place.",
        "https://bolt.new/pricing",
      ),
    ],
    experienced: [
      pick(
        "cursor",
        "A code editor with an AI assistant that can read your whole project and make changes across files.",
        "https://cursor.com/docs/account/pricing",
      ),
      pick(
        "github-copilot",
        "Suggests code and makes multi-step changes inside the code editors developers already use.",
        "https://github.com/features/copilot/plans",
      ),
      pick(
        "claude-code", // No free plan: describes the entry paid plan.
        "Works in your terminal, reading your project and making changes and running commands as you approve them.",
        "https://claude.com/pricing",
      ),
    ],
  },
  research: {
    beginner: [
      pick(
        "perplexity-ai",
        "Answers questions with numbered links to the web pages it used, so you can check each source.",
        "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work",
      ),
      NOTEBOOK_RESEARCH,
      pick(
        "chatgpt",
        "Can search the web and summarize what it finds, with links to its sources.",
        "https://chatgpt.com/pricing",
      ),
    ],
    experienced: [
      pick(
        "elicit",
        "Searches academic papers and pulls findings from many studies into a table you can compare.",
        "https://support.elicit.com/en/articles/17220397-where-did-find-papers-extract-data-and-chat-with-papers-go",
      ),
      pick(
        "consensus",
        "Searches peer-reviewed research and shows what studies say about a yes-or-no question.",
        "https://intercom.help/consensus-d118a252369c/en/articles/10073509-faqs",
      ),
      pick(
        "scispace",
        "Helps you read research papers, explaining sections, tables and equations as you go.",
        "https://scispace.com/chat-pdf",
      ),
    ],
  },
  image_generation: {
    beginner: [
      pick(
        "canva-ai-magic-studio", // (snippet)
        "Creates and edits images inside Canva, so you can put them straight into a design.",
        "https://www.canva.com/help/ai-access/",
      ),
      pick(
        "adobe-firefly",
        "Adobe's image generator; Adobe says its own Firefly models are trained on licensed and public-domain content.",
        "https://www.adobe.com/products/firefly/plans.html",
      ),
      pick(
        "ideogram",
        "Creates images that contain readable text, such as posters, logos and social graphics.",
        "https://ideogram.ai/features/text-rendering/",
      ),
    ],
    experienced: [
      pick(
        "leonardo-ai", // (snippet)
        "Creates images in many styles from text prompts, with tools for editing and refining the results.",
        "https://leonardo.ai/element-training/",
      ),
      pick(
        "krea",
        "Gives you several image and video models in one workspace, with real-time editing.",
        "https://www.krea.ai/pricing",
      ),
      pick(
        "midjourney", // No free plan: describes the entry paid plan. (snippet)
        "Creates artistic and photorealistic images and short videos from text prompts.",
        "https://docs.midjourney.com/hc/en-us/articles/27870399340173-Free-Trials",
      ),
    ],
  },
  video: {
    beginner: [
      pick(
        "capcut",
        "A video editor on phone, desktop and web, with templates and basic editing tools.",
        "https://www.capcut.com/pricing",
      ),
      // DECISION NEEDED: invideo.io/pricing lists no free plan, but the
      // catalog row is FREEMIUM, so it still passes "Free only".
      pick(
        "invideo-ai",
        "Builds and edits videos from a script or idea, adding stock footage and AI voiceover.",
        "https://invideo.io/pricing",
      ),
      pick(
        "veed",
        "Edits video in your browser, with automatic subtitles and audio cleanup.",
        "https://www.veed.io/learn/veed-vs-capcut",
      ),
    ],
    experienced: [
      // Low confidence: the page does not say which models the starter credits cover.
      pick(
        "runway",
        "Generates and edits images and video with AI; new accounts get starter credits to try a selection of its models.",
        "https://runway.com/pricing",
      ),
      pick(
        "google-veo-3-1",
        "Google's video model; anyone with a Google account can generate a small number of short clips each month in Google Vids.",
        "https://blog.google/products-and-platforms/products/workspace/google-vids-updates-lyria-veo/",
      ),
      pick(
        "heygen",
        "Makes presenter videos with AI avatars and translates videos into other languages.",
        "https://www.heygen.com/pricing",
      ),
    ],
  },
  audio: {
    beginner: [
      pick(
        "elevenlabs",
        "Turns text into natural-sounding speech in many voices and languages.",
        "https://elevenlabs.io/pricing",
      ),
      pick(
        "suno",
        "Writes and produces full songs, with vocals, from a short description.",
        "https://suno.com/pricing",
      ),
      pick(
        "speechify",
        "Reads documents, web pages and PDFs aloud.",
        "https://speechify.com/speechify-free-vs-premium/",
      ),
    ],
    experienced: [
      pick(
        "descript",
        "Edits audio and video by editing the transcript, as you would a text document.",
        "https://www.descript.com/pricing",
      ),
      pick(
        "murf-ai",
        "Generates voiceovers from a script, with control over pacing and emphasis.",
        "https://murf.ai/text-to-speech",
      ),
      pick(
        "udio",
        "Generates songs from a text prompt with chosen styles and lyrics; downloads are currently switched off, so songs stay on Udio.",
        "https://help.udio.com/en/articles/12683565-changes-associated-with-the-universal-music-group-umg-partnership",
      ),
    ],
  },
  business: {
    beginner: [
      pick(
        "chatgpt",
        "Drafts emails, summarizes documents and helps plan work in a chat window.",
        "https://chatgpt.com/pricing",
      ),
      pick(
        "microsoft-copilot",
        "Microsoft's chat assistant helps you write, brainstorm and summarize, and answers questions using real-time web search.",
        "https://support.microsoft.com/en-us/microsoft-365-copilot/what-s-the-difference-between-microsoft-copilot-free-and-copilot-in-microsoft-365",
      ),
      pick(
        "fathom",
        "Records and transcribes your video meetings and writes a summary of each call.",
        "https://help.fathom.video/en/articles/5290881",
      ),
    ],
    experienced: [
      // DECISION NEEDED: Notion's free plan includes only a trial of Notion AI.
      pick(
        "notion-ai",
        "Writes, summarizes and answers questions using the pages in your Notion workspace.",
        "https://www.notion.com/pricing",
      ),
      pick(
        "otter-ai",
        "Transcribes meetings live and produces notes you can search afterwards.",
        "https://otter.ai/pricing",
      ),
      pick(
        "gamma",
        "Builds a presentation or document from an outline or prompt.",
        "https://help.gamma.app/en/articles/7834324-how-do-gamma-s-pricing-plans-work",
      ),
    ],
  },
  automation: {
    beginner: [
      pick(
        "zapier",
        "Connects your apps so an event in one starts an action in another, with no code.",
        "https://zapier.com/pricing",
      ),
      pick(
        "microsoft-power-automate",
        "On Windows, its desktop app lets you record or build no-code flows that automate repetitive tasks in files, websites and desktop apps.",
        "https://learn.microsoft.com/en-us/power-automate/desktop-flows/getting-started-msa",
      ),
      pick(
        "pabbly-connect",
        "Links your apps so an event in one triggers an action in another, with filters, formatters and an email parser built in.",
        "https://www.pabbly.com/connect/pricing/",
      ),
    ],
    experienced: [
      pick(
        "make-integromat", // (snippet) "AI steps" dropped: not confirmed for the free plan.
        "Builds automations on a visual canvas with branches and filters.",
        "https://www.make.com/en/pricing",
      ),
      pick(
        "n8n",
        "Fair-code workflow automation you can run on your own server, with JavaScript or Python code steps when visual building is not enough.",
        "https://docs.n8n.io/choose-how-to-use-n8n",
      ),
      pick(
        "activepieces",
        "MIT-licensed open-source automation; its integrations, called pieces, also work as MCP tools for AI assistants.",
        "https://github.com/activepieces/activepieces",
      ),
    ],
  },
  education: {
    beginner: [KHANMIGO, QUIZLET, NOTEBOOK_STUDY],
    experienced: [
      KHANMIGO,
      QUIZLET,
      NOTEBOOK_STUDY,
      pick(
        "magicschool",
        "A set of tools for teachers: lesson plans, rubrics and feedback on student work.",
        "https://www.magicschool.ai/pricing",
      ),
      pick(
        "brisk-teaching",
        "A browser extension that adds AI tools for teachers inside Google Docs and Classroom.",
        "https://chromewebstore.google.com/detail/brisk-teaching/pcblbflgdkdfdjpjifeppkljdnaekohj",
      ),
    ],
  },
  data_analysis: {
    beginner: [CHATGPT_DATA, GEMINI_DATA, COPILOT_DATA],
    experienced: [
      // DECISION NEEDED: julius.ai returned 403; snippets of its pricing page
      // list spreadsheet analysis and charts under paid tiers.
      pick(
        "julius-ai",
        "Upload a dataset and ask questions in plain English; it runs the analysis and draws charts.",
        "https://julius.ai/pricing",
      ),
      CHATGPT_DATA,
      GEMINI_DATA,
      COPILOT_DATA,
    ],
  },
};

/** runtime=local: these goals lead with local chat apps. */
export const LOCAL_CHAT_GOALS = ["content_creation", "research", "business", "education", "data_analysis"] as const;
/** runtime=local: these goals lead with local image tools. */
export const LOCAL_IMAGE_GOALS = ["image_generation"] as const;

export const LOCAL_CHAT: readonly DefaultPick[] = [
  pick(
    "ollama",
    "Downloads and runs open AI models on your own computer, with a desktop chat app and a command line; cloud models are optional.",
    "https://ollama.com/blog/new-app",
  ),
  pick(
    "lm-studio",
    "A desktop app for downloading and chatting with open AI models on your own computer; hosted models are an optional paid add-on.",
    "https://lmstudio.ai/pricing",
  ),
  pick(
    "jan",
    "An open-source desktop app that runs open models on your own computer and can also connect to online model providers.",
    "https://www.jan.ai/",
  ),
];

export const LOCAL_IMAGE: readonly DefaultPick[] = [
  pick(
    "comfyui",
    "Runs image and video models on your own computer through a node-based editor; a hosted cloud version is also available.",
    "https://github.com/comfyanonymous/ComfyUI",
  ),
];

// ---------- category guard ----------

/**
 * Categories a non-default tool may come from, per goal. With two goals a
 * tool passes if either goal allows its category.
 * International & Regional AI is left out of content_creation and research
 * because of the category's mix (enterprise and API products), not country.
 */
export const GOAL_CATEGORIES: Record<QuizGoalId, readonly string[]> = {
  content_creation: ["text-conversational-ai", "research-academic-tools", "document-pdf-processing"],
  coding: ["ai-coding-development", "text-conversational-ai"],
  research: ["research-academic-tools", "text-conversational-ai", "document-pdf-processing"],
  image_generation: ["image-generation-editing", "gaming-creative-ai"],
  video: ["video-creation-editing", "gaming-creative-ai"],
  audio: ["voice-speech", "music-generation"],
  business: [
    "text-conversational-ai",
    "meetings-notes",
    "document-pdf-processing",
    "workflow-automation",
    "ai-plugins-business-software",
    "sales-marketing-seo-ai",
  ],
  automation: ["workflow-automation"],
  education: ["education-learning-ai", "research-academic-tools", "text-conversational-ai"],
  data_analysis: ["research-academic-tools", "text-conversational-ai", "document-pdf-processing"],
};

/**
 * Added only for intermediate and advanced answers. A first-time coder should
 * not be sent to a cloud API console (several API rows are marked BEGINNER).
 */
export const EXPERIENCED_ONLY_CATEGORIES: Partial<Record<QuizGoalId, readonly string[]>> = {
  coding: ["ai-apis-developer-services"],
};

/** Allowed for every goal when runtime=local, and never otherwise. */
export const LOCAL_CATEGORY = "local-open-source-ai";

/** Specialist categories no goal allows. */
export const NEVER_ALLOWED_CATEGORIES = [
  "healthcare-ai",
  "legal-ai",
  "finance-real-estate-ai",
  "career-job-search",
] as const;

/** Every default pick in every list, with duplicates. */
export function allDefaultPicks(): DefaultPick[] {
  return [
    ...Object.values(QUIZ_DEFAULTS).flatMap((g) => [...g.beginner, ...g.experienced]),
    ...LOCAL_CHAT,
    ...LOCAL_IMAGE,
  ];
}
