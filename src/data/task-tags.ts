/**
 * Curated task tags: what a tool is FOR, in words a beginner types. Code-level
 * data (no DB column), keyed by Platform slug. Read by MCP search_tools and
 * find_free_alternatives, and exposed as the optional `tasks` field of
 * /data/v1 tool records (through publicToolCore), so the feed, MCP, Markdown
 * and llms-full.txt all say the same thing.
 *
 * Rules for adding a tag (review these when editing):
 *   - The tool's own catalog row (primaryUse / use cases / description) or its
 *     official site must support it. The note after each entry says which.
 *   - Tag tens of tools, not all of them. Untagged tools still match on words.
 *   - Clinician-only, legal-only and research-paper tools never carry general
 *     writing or career tasks (see TASK_TAGS_WITHHELD below).
 *
 * Sponsorship never influences tags. No sponsor data is imported here.
 */

export type TaskId =
  | "cover-letter"
  | "resume"
  | "job-search"
  | "interview-prep"
  | "linkedin-profile"
  | "grammar-check"
  | "paraphrase"
  | "writing"
  | "academic-writing"
  | "email-writing"
  | "marketing-copy"
  | "logo-design"
  | "graphic-design"
  | "slides"
  | "transcription"
  | "meeting-notes"
  | "dictation"
  | "image-generation"
  | "coding"
  | "research-papers"
  | "summarization"
  | "web-research"
  | "translation"
  | "text-to-speech"
  | "workflow-automation";

export type TaskDef = {
  /** Reader-facing label (Markdown, llms-full.txt, match reasons). */
  label: string;
  /**
   * Words and phrases in a search that mean this task. Matched on whole words
   * after the same plural/accent folding as catalog text ("résumés" = "resume").
   */
  phrases: readonly string[];
  /** Broad tasks ("writing") count for less than specific ones ("cover-letter"). */
  generic?: boolean;
};

export const TASKS: Readonly<Record<TaskId, TaskDef>> = {
  "cover-letter": {
    label: "cover letters",
    phrases: ["cover letter", "motivation letter", "application letter", "letter of application", "job application"],
  },
  resume: {
    label: "resumes and CVs",
    phrases: ["resume", "résumé", "cv", "cvs", "curriculum vitae", "job application"],
  },
  "job-search": {
    label: "job search",
    phrases: ["job search", "job hunt", "job hunting", "job seeker", "find a job", "job application", "job board", "apply for jobs", "applying for jobs", "job tracker"],
  },
  "interview-prep": {
    label: "interview prep",
    phrases: ["interview prep", "interview preparation", "job interview", "mock interview", "interview practice", "interview questions"],
  },
  "linkedin-profile": {
    label: "LinkedIn profiles",
    phrases: ["linkedin"],
  },
  "grammar-check": {
    label: "grammar and spelling checks",
    phrases: ["grammar", "grammar check", "grammar checker", "proofread", "proofreading", "spell check", "spellcheck", "spelling", "typo"],
  },
  paraphrase: {
    label: "paraphrasing and rewording",
    phrases: ["paraphrase", "paraphraser", "paraphrasing", "reword", "rephrase", "rewrite", "rewriting"],
  },
  writing: {
    label: "general writing help",
    phrases: ["writing assistant", "writing helper", "writing tool", "writing help", "ai writer"],
    generic: true,
  },
  "academic-writing": {
    label: "academic writing",
    phrases: ["essay", "thesis", "dissertation", "academic writing", "term paper"],
  },
  "email-writing": {
    label: "emails",
    phrases: ["email"],
    generic: true,
  },
  "marketing-copy": {
    label: "marketing copy",
    phrases: ["marketing copy", "ad copy", "copywriting", "product description", "sales copy"],
  },
  "logo-design": {
    label: "logo design",
    phrases: ["logo", "logo design", "logo maker", "brand logo"],
  },
  "graphic-design": {
    label: "graphic design",
    phrases: ["graphic design", "poster", "flyer", "social media graphic", "thumbnail", "invitation", "banner"],
  },
  slides: {
    label: "slides and presentations",
    phrases: ["slide", "slide deck", "presentation", "pitch deck", "powerpoint"],
  },
  transcription: {
    label: "transcription",
    phrases: ["transcribe", "transcription", "transcript", "speech to text", "audio to text"],
  },
  "meeting-notes": {
    label: "meeting notes",
    phrases: ["meeting notes", "meeting summary", "meeting minutes", "notetaker", "note taker", "meeting recorder", "record meeting", "summarize meeting"],
  },
  dictation: {
    label: "dictation",
    phrases: ["dictation", "dictate", "voice typing", "voice to text"],
  },
  "image-generation": {
    label: "image generation",
    phrases: ["image generation", "generate image", "image generator", "ai image", "ai art", "text to image", "picture", "illustration"],
  },
  coding: {
    label: "coding",
    phrases: ["code", "coding", "programming", "programmer", "debug", "debugging", "software development"],
  },
  "research-papers": {
    label: "research papers",
    phrases: ["research paper", "academic paper", "scientific paper", "literature review", "citation", "paper discovery", "literature search", "journal article"],
  },
  summarization: {
    label: "summaries",
    phrases: ["summarize", "summarise", "summarization", "summary", "tldr"],
    generic: true,
  },
  "web-research": {
    label: "web research with sources",
    phrases: ["web search", "search engine", "cited answer", "answer engine", "fact check"],
  },
  translation: {
    label: "translation",
    phrases: ["translate", "translation", "translator"],
  },
  "text-to-speech": {
    label: "text to speech",
    phrases: ["text to speech", "tts", "voiceover", "voice over", "read aloud"],
  },
  "workflow-automation": {
    label: "workflow automation",
    phrases: ["automate", "automation", "workflow"],
  },
};

/**
 * slug -> tasks, most important first (the first tag is the tool's main job;
 * find_free_alternatives and "alternative to X" searches weight it double).
 * Every slug must be a real Platform row (task-tags.test.ts checks the list
 * of known slugs).
 */
export const TASK_TAGS: Readonly<Record<string, readonly TaskId[]>> = {
  // Career & Job Search (catalog audit 9, 2026-10-26). Each from the vendor's
  // own pricing / product page (src/data/facts/<slug>.ts features).
  teal: ["resume", "cover-letter", "job-search", "linkedin-profile"], // resume builder, job tracker, cover letter generator, LinkedIn profile review
  kickresume: ["resume", "cover-letter", "job-search"], // AI resume writer, cover letter writer, ATS checker, career map
  rezi: ["resume", "cover-letter", "interview-prep", "job-search"], // resume builder, cover letter writer, AI interview practice, application auto-fill

  // General assistants. Rows: "writing drafts", "complex writing", "email
  // drafting", "M365 document drafting". Cover letters and resumes are
  // ordinary drafting jobs for these (brief, 2026-10-26).
  chatgpt: ["writing", "cover-letter", "resume", "email-writing", "coding", "image-generation", "summarization"],
  claude: ["writing", "cover-letter", "resume", "coding", "summarization"],
  gemini: ["writing", "cover-letter", "resume", "email-writing", "image-generation"],
  "microsoft-copilot": ["writing", "cover-letter", "resume", "email-writing", "meeting-notes"],
  "notion-ai": ["writing", "meeting-notes", "summarization"], // row: "writing assistance within docs", "meeting notes summarization"

  // Writing and grammar.
  grammarly: ["grammar-check", "writing", "cover-letter", "email-writing", "academic-writing"], // row: "Grammar checking; professional writing; email tone; academic papers"; official AI Cover Letter Generator page (grammarly.com/ai/ai-writing-tools/cover-letter-generator)
  quillbot: ["paraphrase", "grammar-check", "writing", "summarization"], // row: "Paraphrasing and writing helper"; quillbot.com nav lists "Grammar Checker"; free tier: paraphrase + summarize
  "trinka-ai": ["grammar-check", "academic-writing"], // row: "AI grammar checker for academic/scientific writing"
  paperpal: ["grammar-check", "academic-writing"], // row: "AI academic writing assistant", "grammar for research papers"
  "jenni-ai": ["academic-writing"], // row: "AI writing assistant for academic papers"
  "copy-ai": ["marketing-copy", "email-writing"], // row: "AI marketing copy", "email sequences"
  jasper: ["marketing-copy"], // row: "AI marketing copy and content generation"

  // Design, logos and images.
  ideogram: ["logo-design", "image-generation", "graphic-design"], // row: "logos; posters; social media graphics"
  "canva-ai-magic-studio": ["graphic-design", "logo-design", "slides", "image-generation"], // row: "Social media graphics; presentations"; canva.com nav links an "AI logo generator"
  recraft: ["logo-design", "graphic-design", "image-generation"], // row: "AI images for design and branding", "icon design"; official recraft.ai/generate/logos
  "microsoft-designer": ["graphic-design", "image-generation"], // row: "Social media posts; invitations; flyers"
  "adobe-firefly": ["image-generation", "graphic-design"], // row: "image generation/editing", "text effects; product mockups"
  midjourney: ["image-generation"],
  "leonardo-ai": ["image-generation"],
  flux: ["image-generation"],
  "gpt-image-1-5-dall-e-successor": ["image-generation"],
  "google-imagen-3": ["image-generation"],
  krea: ["image-generation"],
  "freepik-ai": ["image-generation"],

  // Slides.
  gamma: ["slides"], // row: "AI-generated presentations and docs"
  genspark: ["slides", "web-research"], // row: "mixes search, slides, and agents"

  // Meetings, transcription, dictation.
  "otter-ai": ["meeting-notes", "transcription"],
  fathom: ["meeting-notes", "transcription"],
  "fireflies-ai": ["meeting-notes", "transcription"],
  "tl-dv": ["meeting-notes", "transcription"],
  tactiq: ["meeting-notes", "transcription"],
  granola: ["meeting-notes"],
  "read-ai": ["meeting-notes"],
  krisp: ["meeting-notes"], // row: "optional AI notetaker"
  "zoom-ai-companion": ["meeting-notes"],
  descript: ["transcription"],
  assemblyai: ["transcription"],
  deepgram: ["transcription"],
  "wispr-flow": ["dictation"], // row: "AI dictation that types into any app"

  // Coding.
  cursor: ["coding"],
  "github-copilot": ["coding"],
  "claude-code": ["coding"],
  windsurf: ["coding"],
  aider: ["coding"],
  cline: ["coding"],
  "replit-agent": ["coding"],
  "bolt-new": ["coding"],
  lovable: ["coding"],
  v0: ["coding"],
  tabnine: ["coding"],
  "jetbrains-ai": ["coding"],
  "gemini-cli": ["coding"],
  "openai-codex-cli": ["coding"],

  // Research papers (finding and reading papers, not general writing).
  "connected-papers": ["research-papers"],
  "semantic-scholar": ["research-papers"],
  litmaps: ["research-papers"],
  elicit: ["research-papers"],
  consensus: ["research-papers"],
  "research-rabbit": ["research-papers"],
  scite: ["research-papers"],
  scispace: ["research-papers"],
  scholarcy: ["research-papers", "summarization"],
  "perplexity-ai": ["web-research"], // row: "AI-powered search engine with cited answers"

  // Other common tasks.
  deepl: ["translation"],
  elevenlabs: ["text-to-speech"],
  speechify: ["text-to-speech"],
  zapier: ["workflow-automation"],
  "make-integromat": ["workflow-automation"],
  n8n: ["workflow-automation"],
  activepieces: ["workflow-automation"],
  "microsoft-power-automate": ["workflow-automation"],
};

/**
 * Tools deliberately left without writing or career tags, and why. The text
 * mentions "letters" or "writing", but the audience is narrow, so a job
 * seeker searching "cover letter" must not be sent there.
 */
export const TASK_TAGS_WITHHELD: Readonly<Record<string, string>> = {
  "doximity-gpt": "Clinician-only (verified US clinicians); its 'letters' are clinical letters.",
  openevidence: "Clinician-only evidence lookup.",
  evenup: "Personal-injury law firms only; demand letters are legal documents.",
  "writesonic-chatsonic": "Now an SEO / AI-search visibility platform per its row, not a general writer.",
  "hugging-face": "Model hub for developers; no consumer writing product.",
  "together-ai": "Inference API for developers.",
};

/** The tool's curated tasks, or null when it has none (feed field `tasks`). */
export function taskTagsFor(slug: string): TaskId[] | null {
  const tags = TASK_TAGS[slug];
  return tags && tags.length ? [...tags] : null;
}

export function taskLabel(task: string): string {
  return (TASKS as Record<string, TaskDef | undefined>)[task]?.label ?? task;
}
