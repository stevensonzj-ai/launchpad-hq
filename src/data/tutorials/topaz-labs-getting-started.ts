import type { PlatformTutorialData } from "./types";

export const topazLabsTutorial: PlatformTutorialData = {
  slug: "topaz-labs-getting-started",
  platformSlug: "topaz-labs",
  title: "Getting Started with Topaz Labs",
  tagline:
    "Sharpen, clean up and enlarge photos and video you already have — a set of separate paid apps, not one.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://community.topazlabs.com/c/releases",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a picture or a video file in the app, choose from a short list of AI **models** (the AI \"brain\" that does the actual thinking), and a preview pane shows you the before and after side by side. You nudge sliders until it looks right, then export the result as a new file.",

  whatItIs: [
    "Topaz Labs isn't one app. It's a company selling several separate programs for improving pictures and video you already have: Topaz Photo (grain, softness and damage in still photos), Topaz Gigapixel (making a small image much bigger without it going mushy) and Topaz Video (the same idea for footage). There are browser and iPhone versions too, plus Bloom, for tidying up AI-generated art. They're sold separately, with an all-apps bundle called Topaz Studio.",
    "None of them invent a picture from nothing: you bring a file that already exists and the software rebuilds it at higher quality. That's why photographers and video editors run these alongside Photoshop or Premiere rather than instead of them — and what you're paying for over the enhance button in an editor you already own is the choice of which model does the work and how hard it pushes.",
  ],

  beforeYouStart: [
    "**Start with your computer, not your credit card.** Topaz's published minimums for the desktop apps are 16 GB of **RAM** (your computer's short-term memory — what runs out when too much is open) and, on Windows, a dedicated graphics card with at least 6 GB of its own memory; the newer models that invent detail want 8 GB. Topaz Video doesn't run on Intel Macs at all, and each app wants roughly 30 to 70 GB of free disk space.",
    "Everything Topaz sells today is a subscription, monthly or yearly, renewing automatically. The buy-it-once-and-own-it-forever licences the company was known for were discontinued in September 2025 — an existing one keeps working, but you can't buy one now. Individual apps currently run from around $149 to $299 a year, the all-apps bundle around $399 a year, and monthly billing costs noticeably more. Topaz discounts often and deeply, so treat any figure here as a band rather than a price.",
    "There's no free trial of the current apps, which is unusual for software this dependent on your hardware. Topaz's published refund policy gives a money-back window of about two days from purchase, and its support staff have described that as the deliberate substitute for a trial. Two more things to check before you click: an annual plan can't be cancelled mid-term without a fee, and some plans advertised at a monthly price are still a twelve-month commitment. Topaz does still host its discontinued older apps — Photo AI, Gigapixel AI, Video AI and others — and its documentation says these \"function as trial software by default\"; the docs don't say what that mode restricts, and posts on Topaz's own forum describe trial output carrying a visible stamp, so expect some limit of that kind. They are no longer developed or supported, so treat them as a look, not a substitute.",
    "If your machine can't meet the specs, the browser version is the way around it. Topaz says it renders \"regardless of hardware,\" with the work done on its servers instead of your graphics card — image plans there currently sit around $12 to $19 a month. Video in the browser is sold with **credits** (the platform's unit of spend — each thing you make costs some) rather than flat use.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from topazlabs.com/downloads. This matters more here than for most software: Topaz is expensive, popular and heavily discounted, which makes it a favourite name for fake \"cracked\" installers — and an installer you run has the run of your whole machine.",
    body: [
      "You'll be asked to log in with a Topaz account the first time an app opens — the licence follows your account rather than the machine, which is what lets you move it to a new computer later.",
      "Run your own real files through it the same day you install: one big photo, one genuinely bad photo, and if you bought the video app, a clip the length you actually work with — the money-back window is short, and a full export takes far longer than a preview suggests.",
    ],
    vendorDocsUrl: "https://docs.topazlabs.com/topaz-photo/system-requirements",
  },

  security: [
    {
      kind: "text",
      text: "Where your file gets processed decides everything else here. Run the desktop apps and the work happens on your own machine — your photos never leave it. For a wedding photographer, a medical image, or anything you're contractually not allowed to share, that is the reason to prefer installed software over a website.",
    },
    {
      kind: "list",
      label: "What changes the moment you use the cloud",
      items: [
        "Your files get uploaded. The browser version, the phone app and the cloud-rendering option inside the desktop apps all send your media to Topaz's servers, and its licence agreement, updated February 2026, has you grant Topaz a licence to store, copy and modify the file to the extent needed to do the job.",
        "You keep ownership. The same agreement states that as between you and Topaz you retain all ownership rights in your media, and Topaz makes no copyright claim over your files and no claim to royalties.",
        "Share links are public. If you hand someone a result using Topaz's sharing links, the agreement says that file stays hosted for public access until you ask for it to be removed.",
        "One silence worth noticing: Topaz's published privacy policy doesn't address whether media you upload for cloud processing is used to train or improve its models. It doesn't say it is, and it doesn't say it isn't. Stay on the desktop apps and the question doesn't arise.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Enlarging a photo far past the size it was shot at — Topaz advertises up to around sixteen times the pixels",
      "Rebuilding old or low-resolution video so it is watchable on a modern screen",
    ],
    okayAt: [
      "Faces. There's a dedicated face-recovery model, but Topaz's own documentation notes its strongest version won't run on cards with less than 8 GB of graphics memory — and a face is exactly where anything invented shows first",
      "Repeatability. Topaz's docs say of its most creative model that \"there is no guarantee that outputs will match every time\"",
    ],
    avoid: [
      "Anything where the picture is evidence. These tools don't recover detail that was recorded and lost — they generate plausible detail that was never there. For an insurance claim, a legal exhibit, a medical image or an archival scan that isn't an improvement, it's a fabrication, and Topaz's own documentation concedes the point when it tells you to use a non-generative model \"if your artwork requires accuracy.\"",
      "Commercial work on the wrong licence. The February 2026 agreement restricts the Personal licence: if you work for an organisation with annual revenue over one million US dollars, commercial use needs a Pro licence. Topaz's own definition of commercial use covers advertising, published or printed media, stock platforms, game and media assets, and paid distribution on video platforms.",
      "Feeding the output to another AI. The same agreement forbids using Topaz's output, or the models behind it, to develop, train, validate or improve any other AI system.",
    ],
  },

  starterActions: [
    {
      title: "Make a small photo big enough to print",
      whatItDoes:
        "Takes an image that looks fine on a phone screen and rebuilds it several times larger.",
      whyHere:
        "Gigapixel makes you choose between a true-to-the-original enlargement and its Wonder models, which invent detail to fill the gap and are built for sources that were already poor. Topaz's documentation steers you towards the non-generative option whenever accuracy matters.",
      tweak:
        "Compare at 100% zoom, never fit-to-screen. Detail the software made up is invisible zoomed out and obvious at actual size.",
    },
    {
      title: "Fix a dark, grainy phone photo",
      whatItDoes:
        "Clears the speckle you get shooting in low light and sharpens what's underneath.",
      whyHere:
        "Topaz Photo opens with a feature called Autopilot switched on: it inspects the file and applies a set of fixes before you've touched anything. That is a head start and a trap, because its confident default is easy to mistake for the right answer.",
      tweak:
        "Switch Autopilot off once and rebuild the same edit by hand.",
    },
    {
      title: "Rescue an old family scan",
      whatItDoes:
        "Lifts dust, scratches and surface damage off a scanned print, and softness lost in the original photograph or the scan.",
      whyHere:
        "Topaz Photo carries a mode built specifically for scanned and damaged prints — it looks for the failure modes of paper and scanners, not of cameras.",
      tweak: "Scan at the highest resolution your scanner offers before you start.",
    },
    {
      title: "Make old video watchable on a big screen",
      whatItDoes:
        "Rebuilds footage shot years ago at low resolution, frame by frame, at modern sizes.",
      whyHere:
        "Topaz Video has you pick a model per job and renders a short preview before you commit — its quick-start guide points beginners at Proteus first. That preview matters more here than in the photo apps: a full export can run for hours on the machine that produced the preview in seconds.",
      tweak:
        "Preview a few seconds of the worst part of the clip, not the best. If the difficult shot holds up, the rest will.",
    },
    {
      title: "Steer a generative enlargement with a written description",
      prompt:
        "A close-up photograph of an elderly man's hands holding a worn leather book, warm indoor light, shallow depth of field, fine skin texture and visible leather grain.",
      whyHere:
        "Gigapixel's Redefine model carries the only text box anywhere in Topaz's desktop apps. The documentation attaches this \"Image description\" field to that model and no other, says it \"helps guide the AI for desired results,\" and advises a descriptive statement rather than a directive — so you describe what the picture is, not what you want changed.",
      tweak:
        "Watch the Creativity slider beside the box — it decides how far the software is allowed to stray from your photograph.",
    },
  ],

  pitfalls: [
    "**Confusing the current apps with the discontinued ones.** Topaz Photo and Photo AI are different products; so are Gigapixel and Gigapixel AI, and Video and Video AI. Search results, YouTube tutorials and forum answers mix them up constantly, and the older ones have different features and no support.",
    "**Cloud credits vanish at the end of the month.** On the plans that include them they reset monthly and don't roll over, and video consumes them in proportion to length, resolution, frame rate and which model you picked — so one long clip can clear a month's allowance in a single export.",
  ],

  whereToNext: [
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "Gaming and creative AI", categorySlug: "gaming-creative-ai" },
  ],
};
