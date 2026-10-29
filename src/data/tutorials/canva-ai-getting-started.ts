import type { PlatformTutorialData } from "./types";

export const canvaAiTutorial: PlatformTutorialData = {
  slug: "canva-ai-getting-started",
  platformSlug: "canva-ai-magic-studio",
  title: "Getting Started with Canva AI",
  tagline:
    "Canva's built-in AI toolkit, Magic Studio — generate images, write copy, design layouts, and edit photos without leaving your design.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://www.canva.com/newsroom/",
  accessTier: "FREE",

  howItWorks:
    "You work in Canva as usual, and the AI tools sit inside the editor — type a description to get an image, describe a layout and get a template you can edit, or select part of a photo and describe the change. The result lands on your canvas, where you keep editing it by hand.",

  whatItIs: [
    "Canva AI is the AI layer inside **Canva**, the drag-and-drop design tool millions of non-designers already use. Branded **Magic Studio**, it's a bundle of tools woven into the editor: **Magic Design** (describe a design, get an editable layout), **Dream Lab / Magic Media** (text-to-image and video), **Magic Write** (copy), plus **Magic Eraser**, **Magic Expand**, background remover, and a newer conversational \"just tell it what you want\" mode. It's for anyone making social posts, presentations, or marketing graphics who wants AI help without learning a pro design tool.",
  ],

  beforeYouStart: [
    "The free plan is a real design tool (huge template library, collaboration) with a **small monthly AI allowance** — enough to try Magic Studio, not to lean on it. **Pro** is for one person and multiplies that allowance several times over; **Business** now covers both individuals and teams (Canva no longer sells a separate Teams plan) and doubles Pro's allowance again. Both can be paid monthly or yearly, and the prices on Canva's page exclude tax.",
    "Every AI tool draws on **one shared allowance**, with heavier tools using it up faster — so heavy image, video and copy use burns through it quickly. When it runs out, Pro and Business users can buy **AI Pass**, a pricey monthly add-on with Canva's largest allowance; Business can also buy smaller one-off top-ups. Free users wait for the monthly reset or upgrade.",
    "One setting to check on day one: your AI training preference (see security).",
  ],

  security: [
    {
      kind: "text",
      text: "Good news on rights: **you own both what you put in and what you create** — Canva makes no copyright claim over your inputs or outputs — and AI-generated designs can be used **commercially on every plan, including Free.**",
    },
    {
      kind: "list",
      label: "Two things to set and know",
      items: [
        "**AI training is on by default for Free and Pro users.** Canva may use your content to help improve its AI unless you **opt out in privacy settings.** (Teams/Enterprise content is never used for training.) If your designs are sensitive, flip that off first.",
        "Canva's **IP indemnity (Canva Shield) is Enterprise-only** — so a Pro or Business user carries the residual legal risk themselves. Keep commercial prompts clean and generic.",
        "The usual generator caveats apply: AI images can occasionally resemble existing work, and a pure AI image may not be copyrightable — review outputs before high-stakes commercial use.",
      ],
    },
    {
      kind: "text",
      text: "There are no built-in approval controls on individual plans — anyone with access can generate and publish — so if you're producing for a brand or client, put your own review step in front of anything that goes public.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a prompt into a finished, editable design fast",
      "One-place workflow: generate, write, edit, lay out, export",
      "Social posts, presentations, and marketing graphics for non-designers",
      "Quick photo edits — background removal, object erase, expand",
    ],
    okayAt: [
      "Best-in-class image quality (Midjourney/Firefly lead) or long-form copy (dedicated writers lead)",
      "High-resolution / print output (AI images default to lower res)",
      "Brand consistency without setting up a Brand Kit first",
    ],
    avoid: [
      "Assuming your designs aren't used for AI training (opt out first on Free/Pro)",
      "High-stakes commercial work without a review step (no indemnity below Enterprise)",
      "Prompts built on real brands, characters, or people",
    ],
  },

  starterActions: [
    {
      title: "Design from a description",
      prompt:
        "Make an Instagram post announcing a weekend coffee-shop sale: warm, cozy, hand-lettered feel, space for a short headline.",
      whyHere:
        "Magic Design turning a plain description into an editable layout is the fastest \"wow\" and the most useful everyday move.",
      tweak: "Add your brand colors in the prompt, or set up a Brand Kit first for on-brand results.",
    },
    {
      title: "Generate an image inside your design",
      prompt:
        "A friendly illustration of a steaming coffee cup with little hearts rising from it, flat modern style, warm colors.",
      whyHere:
        "Shows Dream Lab dropping a generated image straight into your canvas — no downloading and re-uploading.",
      tweak: "Regenerate a few times; each attempt uses credits, so refine the prompt before spamming generate.",
    },
    {
      title: "Fix a photo in seconds",
      whatItDoes:
        "Upload a photo, then use Magic Eraser to remove an unwanted object or Magic Expand to widen the frame.",
      whyHere:
        "These edits used to need Photoshop skills; doing them by describing the change is Canva AI's real time-saver.",
      tweak: "Works best on clean, well-lit photos with clear backgrounds.",
    },
  ],

  pitfalls: [
    "**AI training is on by default (Free/Pro).** Opt out in privacy settings if you don't want your designs improving Canva's AI.",
    "**The AI allowance is shared and burns fast.** Images, copy, and edits all draw from one pool; only Business can buy small top-ups, and AI Pass is an expensive monthly add-on.",
    "**Indemnity is Enterprise-only.** A Pro user owns both the design and the residual legal risk — keep prompts clean.",
  ],

  whereToNext: [
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
