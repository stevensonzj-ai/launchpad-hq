import type { PlatformTutorialData } from "./types";

export const meshyTutorial: PlatformTutorialData = {
  slug: "meshy-getting-started",
  platformSlug: "meshy",
  title: "Getting Started with Meshy",
  tagline:
    "Describe an object in a sentence and get a 3D model of it about a minute later.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.meshy.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You type a description of an object into a box, press generate, and about a minute later a 3D shape appears that you can spin around with your mouse. If it's wrong, you change the wording and generate again. When one looks right, you add colour and surface detail in a second pass.",

  whatItIs: [
    "Meshy makes 3D models — the kind of digital object you'd drop into a game, a video, or a 3D printer — from a written description or a photo.",
    "It's aimed at people who want a usable object without first learning 3D modelling software. It runs in a browser with nothing to install, and hands you the finished file in the formats other 3D software opens.",
    "What comes back is good enough for a prototype, a background prop or a print; anything a customer looks at closely, a person still rebuilds by hand.",
  ],

  beforeYouStart: [
    "A free account currently gets 100 credits (the platform's unit of spend — each thing you make costs some) a month, resetting to 100 on the first rather than stacking up, so an unspent month is simply gone. Meshy's own credit table currently prices the shape at around 10 credits on its lightest generator and 20–25 on the heavier two, plus about 10 more for colour and surface detail — roughly five finished objects a month on the light setting, three on a heavy one. Daily sign-in bonuses add a few more credits, and those ones don't expire.",
    "**Before you spend anything, know that the generator you pick decides whether you can keep the file.** Meshy currently offers three: Meshy 7, Meshy 6 and Meshy 6 Lite. Its free-plan help page says free accounts get around 10 downloads a month and only for Meshy 6 Lite models; its launch post for Meshy 7 says plainly that only Pro tier and above can download Meshy 7 models; its plan comparison table is blunter still and shows free downloads as simply unavailable. Those three vendor pages don't agree, so the honest version is: generating is free, keeping the file may not be, and you should check what your own account offers once you are signed in, before you burn credits on something you can't export.",
    "Per Meshy's own model-comparison page the newest generator, Meshy 7, does images only — typed descriptions run on Meshy 6 or Meshy 6 Lite, so the newest model isn't the one your typed words reach at all.",
    "You'd pay for the files and for the licence: paid plans currently start at around $20 a month for 1,000 credits and move you from a share-alike licence to private ownership (see Privacy & security). Start at meshy.ai — signing up free asks for no card.",
  ],

  security: [
    {
      kind: "text",
      text: "Meshy's risk isn't mainly about what you type — it's about what you end up owning. Its Terms of Use, currently effective 7 March 2026, say that on the free plan Meshy itself owns the output and grants you a licence to it under Creative Commons Attribution 4.0. You may use a free model commercially, but you have to credit Meshy — its help centre suggests the line \"Model created with Meshy – CC BY 4.0 License\" in your project description — and a Creative Commons licence is one anyone else who gets hold of that model may exercise too. Paid plans replace this with private ownership, and Meshy's help centre says models made while you were paying stay private indefinitely even if you later cancel.",
    },
    {
      kind: "list",
      label: "Two things in the terms worth knowing before you upload anything",
      items: [
        "Your inputs and outputs may be used for training. Section 2.9 of the same terms lets Meshy use inputs and outputs from all non-Enterprise customers — free and paid alike — to train and improve its services. On the vendor's own account only an Enterprise agreement switches that off.",
        "Publishing to the community gallery goes much further than sharing. The terms put anything you publish publicly under CC0, a public-domain dedication — which hands the model to everyone with no credit owed to you at all, and isn't something you can take back.",
      ],
    },
    {
      kind: "text",
      text: "One thing we couldn't establish: whether a free-plan model you haven't published is visible to anyone else. No Meshy page we could find says either way, and the terms only state that paid customers have the option to keep content private — which implies free accounts don't. Until that's clearer, treat a reference photo you upload the way you'd treat something you posted publicly.",
    },
  ],

  triad: {
    bestAt: [
      "Props and objects — a chair, a lantern, a barrel, a cartoon mushroom. Single, self-contained things are what it's built around.",
      "Handing you a file other software opens — its text-to-3D page currently lists eight export formats, including FBX, OBJ, GLB, USDZ, STL and BLEND.",
    ],
    okayAt: [
      "Anything with thin parts. Handles, wires, railings and spokes tend to come back fused together or thickened into blobs.",
      "Characters. You'll get a figure; you won't get one a game could animate without a person reworking it.",
    ],
    avoid: [
      "Scenes rather than objects. Ask for \"a medieval market square\" and you get one lumpy mass, not a square you can move around in. Describe one stall, then another.",
      "Anything that has to match real-world measurements — a replacement bracket, a part that must fit an existing hole. Nothing in the generator is dimensioned, and it will cheerfully produce a confident wrong size.",
      "Uploading a photo of a copyrighted character or someone else's product and assuming the 3D version is yours. Meshy's own help centre says it does not guarantee you rights to models generated from copyrighted references you upload — that exposure stays with you.",
    ],
  },

  starterActions: [
    {
      title: "One object, described by its shape",
      prompt:
        "A weathered wooden treasure chest with iron bands and a curved lid, closed, sitting flat on the ground, one single object, nothing else in frame",
      whyHere:
        "What goes in the box is your prompt — the message you type. Because Meshy builds the shape before any colour, words about silhouette, material and pose do real work in a first prompt and words about colour mostly don't. The box takes up to 800 characters, room for all three and not much more.",
      tweak:
        "Swap the object for anything you like, but keep \"one single object\" — that phrase is what stops you getting a scene.",
    },
    {
      title: "A prop with a style, not just a thing",
      prompt:
        "A stylised low-detail cartoon lantern with a rounded glass body and a thick chunky handle, exaggerated proportions, one single object",
      whyHere:
        "Asking for exaggerated chunky proportions up front costs nothing; discovering that the thin version fused into a blob costs you another generation out of the month's credits.",
      tweak:
        "Run the same object twice, once as \"stylised cartoon\" and once as \"realistic\", and see which holds together better.",
    },
    {
      title: "Run one description on two generators and compare",
      whatItDoes:
        "Generate the same description twice, once on Meshy 6 Lite and once on Meshy 6, and compare the two before you commit to either.",
      whyHere:
        "The two differ in price and, per the download rules in \"Before you start\", possibly in whether the free plan lets you keep the result at all — a cheaper thing to learn on a test object than on the one you actually wanted.",
      tweak: "Do this on your first day, while most of the month's credits are still there.",
    },
    {
      title: "Point it at a photo instead of a sentence",
      whatItDoes:
        "Upload a straight-on photo of a real object you own — a mug, a shoe, a plant pot — and let it build from the picture rather than your words.",
      whyHere:
        "This is the route Meshy's newest generator was built for: its August 2026 launch post is entirely about how closely the 3D result lines up with the input image. Since typed descriptions don't reach that generator, a photo is the only way to see its current best work.",
      tweak:
        "One object, plain background, shot straight on and evenly lit.",
    },
    {
      title: "Something you could actually print",
      prompt:
        "A simple solid desk organiser shaped like a curled sleeping cat, thick rounded body, no thin parts, flat underside, one single object",
      whyHere:
        "Meshy exports STL and 3MF and sells a separate printability-repair step for around 10 credits — which tells you plainly that a freshly generated model often isn't printable as it stands. Asking for thick, flat-bottomed shapes from the start avoids paying to fix thin walls afterwards.",
      tweak:
        "\"Flat underside\" is the load-bearing phrase — a printer needs something to stand the model on.",
    },
  ],

  pitfalls: [
    "Judging it on the grey preview. The shape arrives with no colour or surface detail and looks far worse than it is — adding those is a second step you have to ask for and pay credits for separately.",
    "Assuming the file will drop into a game engine and just work. It'll open, but what's underneath is generated geometry, not something built to be animated or made efficient.",
    "Spending the whole month's credits on one ambitious idea. Your first two or three attempts are calibration — on a free account that's most of what the month buys you.",
  ],

  whereToNext: [
    { label: "Gaming and creative AI", categorySlug: "gaming-creative-ai" },
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
