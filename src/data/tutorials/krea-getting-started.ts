import type { PlatformTutorialData } from "./types";

export const kreaTutorial: PlatformTutorialData = {
  slug: "krea-getting-started",
  platformSlug: "krea",
  title: "Getting Started with Krea",
  tagline: "One studio for many image and video AIs — plus a canvas that redraws your sketch the moment you move a line.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  changelogUrl: "https://www.krea.ai/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the picture you want into a box at the bottom of the screen (this is your **prompt** — the message you type), press Generate, and a few images come back. Pick the one closest to your idea, change a few words, and run it again until it looks right.",

  whatItIs: [
    "Krea is a browser studio for making and editing images and short videos with AI. It puts many other companies' image and video **models** (the AI \"brain\" that does the actual work) behind one account — among them Nano Banana 2 and Seedance 2.0 — and you choose between them from a menu, or let Krea choose for you.",
    "Two tools are what set it apart from a plain image generator. **Realtime** is a drawing canvas with the result on the right that redraws itself as you work — no Generate button, no queue — so a rough circle and a few strokes become a finished-looking image while your hand is still moving. The **Enhancer** takes an existing picture and makes it larger and sharper, filling in detail as it goes.",
    "Everything you make spends **units** (Krea's credits — the platform's unit of spend; each thing you make costs some). Different models cost very different amounts for a single picture, and the model menu shows each one's cost before you commit.",
    "It runs in a web browser, and Krea also offers an iPhone app.",
  ],

  beforeYouStart: [
    "Signing up is free. The free plan gives you 100 units a day, refilled daily — Krea's help pages say there is a daily free allowance but do not say what time it resets — so a free account is for trying things out a little each day rather than for a big project in one sitting.",
    "**Read this before you use anything you make on the free plan for work.** As of 15 October 2026, Krea's pricing page marks \"Commercial license\" as **not** included on the free plan, and its own FAQ names Pro, Max and Business among the plans that include the commercial licence. That means a logo, product shot or client image made on a free account is not covered for commercial use. The FAQ does not mention the Basic plan either way, so if commercial use is your reason for paying, confirm it on the pricing page before choosing Basic over Pro. Krea's terms (last updated 20 May 2024) also say it can change its commercial-use terms \"at any time\".",
    "Who owns what you make depends on your plan. Krea's general terms (last updated 20 May 2024) give you a licence to \"use (and in certain instances download, display, and re-share)\" what you generate, and never say in plain words that you own it. Only the separate Business terms (last updated 1 January 2026) say \"You retain all ownership rights in your Inputs and Outputs\" — and even those warn that AI output may not be protected by copyright in some countries and that someone else may get a similar result.",
    "If you do pay, it runs from Basic at $9 a month (or $5.25 a month billed yearly, 5,000 units a month) through Pro at $35 ($21 yearly, 20,000 units) and Max at $105 ($63 yearly, 60,000 units), up to a Business plan for teams at $200 ($160 yearly, 80,000 units). Subscriptions renew automatically until you cancel.",
  ],

  security: [
    { kind: 'text', text: "On anything below the Business plan, assume what you make is not fully private. Krea's terms (last updated 20 May 2024) say that if your plan does not include private mode, \"some of your User Submissions may be viewable by other users\" — and they do not say which plans include it. Its privacy policy, last updated the same day, says the service is hosted on US servers." },
    { kind: 'list', label: "Before you upload a photo of a real person, or anything confidential", items: [
      "The promise not to train AI on your work is in writing only for Business. Krea's Business terms (1 January 2026) state it \"will NOT use your Inputs or Outputs to train its AI models.\" The general privacy policy (20 May 2024) does not say either way whether your prompts and uploads are used for training, and lists improving the service and product development among the reasons it uses your data.",
      "Deleting an image from your screen does not delete it. Krea's image guide says Delete removes it from your session view but \"your assets are not deleted.\" The privacy policy's route for having your personal data deleted is an email to support@krea.ai.",
      "Krea's terms prohibit impersonating people without their consent, including deepfakes. A photo of a friend fed into the Enhancer or Realtime is a photo of a real person on someone else's servers.",
    ] },
  ],

  triad: {
    bestAt: [
      "Trying the same idea on several companies' image models without opening several accounts.",
      "Sketching a layout — a horizon line, a blob for a subject — and watching it become a picture as you draw, which is quicker for composition than rewriting a description.",
      "Making a small or soft image bigger and crisper for screens or print.",
      "Turning a still you like into a short video clip from the same session.",
    ],
    okayAt: [
      "Exact text inside an image, like a sign or a poster headline — some models handle it, others garble it, and which is which changes as the model list changes.",
    ],
    avoid: [
      "Using free-plan output in anything you sell or deliver to a client — the pricing page excludes the commercial licence from Free.",
      "Treating the Enhancer as a way to recover a blurry photo. Krea's own guide calls it \"a creative tool, not a forensic one\" that \"does not recover what was originally there\" — on a face or a document it is inventing the detail, not revealing it.",
      "Running the same image through the Enhancer again and again. Krea's guide warns that repeated passes \"compound the AI's interpretations\", adding brushstrokes or skin texture that were never in the original.",
    ],
  },

  starterActions: [
    {
      title: "The four-part description",
      prompt:
        "A small corner bakery at dawn, warm light spilling from the window onto a wet cobblestone street, a cat asleep on the step, calm and quiet mood, photographic",
      whyHere:
        "Krea's own image guide recommends naming subject, setting, lighting and mood — this prompt does exactly those four. Leave the model on its default automatic setting for the first try, then press Retry: most runs return two or four images, and the differences between them show you what the description left open.",
      tweak:
        "Swap in your own subject and keep the other three slots filled. If one image is close, use Reuse parameters to load the same prompt and settings back into the box and change one word at a time.",
    },
    {
      title: "Draw a rough shape and watch it become a picture",
      whatItDoes:
        "Open Realtime, type a short description such as \"mountain lake at sunset\", then drag a few shapes onto the canvas — a triangle for a mountain, a circle for the sun, a blue streak for water — and move them around.",
      whyHere:
        "Krea's Realtime guide says there is no queue and no render button — the output reflects the canvas at every moment, so moving the sun from left to right is a one-second experiment rather than another generation.",
      tweak:
        "Press the seed button for a fresh variation of the same layout. When one is worth keeping, use the options under the result to download it or send it to be enlarged.",
    },
    {
      title: "Enlarge a small image — gently",
      whatItDoes:
        "Upload a small picture of your own (a landscape or an object, not a person) to the Enhancer, choose 2x rather than the largest size, and compare before and after with the slider.",
      whyHere:
        "Krea's Enhancer guide advises starting with conservative settings and stepping up 2x then 4x rather than jumping to 8x, because higher values give the AI more room to invent texture and edges. Seeing it add detail that was never there on your own photo teaches what the tool really does faster than reading about it.",
      tweak:
        "If the result looks over-sharpened, lower the strength rather than running it again — Krea's guide says each extra pass compounds the changes.",
    },
    {
      title: "Same idea, two models",
      prompt:
        "A paper origami crane on a wooden desk beside a cup of coffee, soft morning light from a window, shallow depth of field",
      whyHere:
        "Run it once on the default, then open the model menu bottom-left and pick a different model. Krea's picker lists each model's speed, quality and unit cost side by side, so the comparison also shows you how unevenly your daily units are spent.",
    },
  ],

  pitfalls: [
    "**The model menu is the price list.** Krea's guide suggests trying ideas on a cheaper model and switching to a pricier one once the description is right.",
    "**Delete does not mean gone** (see the privacy section above). Publish, by contrast, makes a public page for an image — know which button you are pressing.",
    "**The model list changes often.** Krea's changelog shows models being added and older ones retired month by month. A model a tutorial or video recommended may have moved or gone; pick from what the menu shows today.",
    "**Video and enlarged video use units fast.** Krea's Enhancer guide warns that upscaling videos \"can consume your compute budget quickly.\" Try an idea as a still first and turn only the keeper into a clip.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Video tools", categorySlug: "video-creation-editing" },
  ],
};
