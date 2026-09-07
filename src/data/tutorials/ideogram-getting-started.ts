import type { PlatformTutorialData } from "./types";

export const ideogramTutorial: PlatformTutorialData = {
  slug: "ideogram-getting-started",
  platformSlug: "ideogram",
  title: "Getting Started with Ideogram",
  tagline:
    "The AI image generator that can actually spell — built for posters, logos, and anything with words in it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.ideogram.ai/about-ideogram/blog-posts",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the picture you want into a box and press go; a few seconds later you get a set of images to choose from. If one is close but not quite right, you adjust the description or edit the image directly and run it again.",

  whatItIs: [
    "A text-to-image generator — you describe a picture in plain words and it draws one. It runs in your web browser; there's nothing to install.",
    "Built for things that have words on them: posters, flyers, logo concepts, book covers, social posts, product mockups, t-shirt graphics.",
    "The reason to pick this one over Midjourney, DALL·E, or Firefly is **legible text**. Most image generators turn lettering into convincing-looking gibberish. Ideogram is built around spelling words correctly and setting them as real-looking type. If your image needs to *say* something, start here.",
    "A good fit if you're not a designer and just need one decent graphic without opening Photoshop or hiring anyone.",
  ],

  beforeYouStart: [
    "**Free to start, no credit card needed.** Go to ideogram.ai and sign up.",
    "**Sign in with Google, Apple, or Microsoft — not with a plain email address.** Ideogram's pricing page states that free weekly credits go to accounts signing in with one of those three; an email-only signup gets an account with no free credits. Your login method and username are both permanent, so decide before you click.",
    "**Free-tier shape:** you get a pool of credits that refills on a weekly cycle, and every image you generate spends some. Free credits are \"slow\" credits — your job runs in the lower-priority queue, and you can only have one generation going at a time. Ideogram doesn't publish the exact number and says the amount may vary.",
    "**Will you realistically need to pay?** To try it and make the occasional graphic, no. You'll want a paid plan if you generate regularly, or if you need your images to stay private — private generation is a paid feature.",
    "Paid personal plans currently start at around $15–20/month, with larger tiers around $42–60/month. Prices move; check the pricing page.",
  ],

  security: [
    {
      kind: "text",
      text: "**On the free plan your images are public by default.** Ideogram's FAQ puts it plainly: images are public unless you choose private generation, and private generation requires a paid plan. Public means the image appears on the site alongside your handle and profile picture, and other people can find and remix it. You can unpublish individual images after the fact, but the default is public. Don't put anything confidential, personal, or client-sensitive into a free-tier prompt.",
    },
    {
      kind: "list",
      label: "If you upload a reference image",
      items: [
        "Ideogram's docs say uploaded images are private and live in your Library — the upload itself isn't published to the community.",
        "Anything you **generate** from that upload still follows the public-by-default rule above.",
        "Ideogram's terms give it a broad licence to store and process your content in order to run and improve the service. Neither the terms nor the privacy policy state clearly whether your prompts and uploads are used to train its models — so assume uploads aren't a private vault, and don't upload other people's photos or copyrighted artwork.",
      ],
    },
    {
      kind: "text",
      text: "**Commercial use is allowed on every plan, including free.** Ideogram states it doesn't claim ownership of your generated images and you're free to use them for any purpose. There's no separate paid licence to buy. What you still own is the risk — you're responsible for making sure what you make doesn't infringe someone's trademark or copyright.",
    },
  ],

  triad: {
    bestAt: [
      "Short text rendered legibly inside an image",
      "Posters, flyers, and social graphics",
      "Logo and wordmark concepts",
      "Text on real objects — signage, packaging, book covers, apparel",
      "Generating several design variations fast",
    ],
    okayAt: [
      "Photorealistic people and scenes",
      "General illustration and painting styles",
      "Matching the look of a reference image you supply",
      "Enlarging an image, or removing and replacing a background",
    ],
    avoid: [
      "Text-heavy layouts — Ideogram's own docs say it isn't designed to generate complete, text-heavy documents",
      "Non-Latin alphabets and accented characters, which the docs flag as unreliable",
      "Exact brand fidelity — a real logo, a specific licensed font, an exact hex colour",
      "Anything factually precise like charts, maps, or diagrams",
      "Anything you need kept private while you're on the free tier",
    ],
  },

  starterActions: [
    {
      title: "Make a poster that actually says something",
      prompt:
        "A vintage travel poster for a small seaside town, with bold text at the top that reads \"SALT AIR\", muted teal and cream palette, screen-print texture",
      whyHere:
        "Ideogram's prompting guide tells you to put the words you want in quotation marks and place them early in the prompt — that's the convention this model is tuned for. Two short words sits squarely in its sweet spot, where spelling holds up.",
    },
    {
      title: "Turn a business name into a logo concept",
      prompt:
        "A simple flat logo for a coffee shop called \"Third Hour\", rounded sans-serif wordmark with a single coffee bean above the text, black on white, generous empty space",
      whyHere:
        "A wordmark is pure spelling, which is exactly what Ideogram is built for. Note the prompt describes the font as rounded sans-serif rather than naming a typeface — Ideogram's docs recommend describing font properties instead of font names.",
      tweak:
        "Swap \"rounded sans-serif\" for \"condensed uppercase serif\" to get a completely different feel from the same name.",
    },
    {
      title: "Put your words on a real-looking object",
      prompt:
        "A matte black water bottle on a concrete surface, the label reading \"TRAIL FUEL\" in condensed uppercase type, soft studio lighting, product photography",
      whyHere:
        "Text integrated into an object — a label, a sign, a shirt — is a documented strength here, not a lucky accident. This is the closest thing to a free product mockup you'll get from a prompt.",
    },
    {
      title: "Switch Magic Prompt off when the wording matters",
      whatItDoes:
        "Magic Prompt is a setting that quietly rewrites and expands your prompt to add detail. It's on by default and often helpful — but it can wander away from the exact words you asked for.",
      prompt:
        "A hand-lettered chalkboard sign outside a bakery that reads \"OPEN EARLY, SOLD OUT BY NOON\", warm morning light, shallow depth of field",
      whyHere:
        "Longer text is where Ideogram is most fragile, so you want maximum control. Run this once with Magic Prompt on and once with it off and compare — that comparison teaches you more about the tool than any tutorial.",
    },
    {
      title: "Fix a misspelled word instead of starting over",
      whatItDoes:
        "Open a generated image in the Editor, paint over just the broken word, and regenerate that patch.",
      whyHere:
        "This is Ideogram's own recommended fix for text errors, and it matters more here than on other generators: when 90% of a poster is right and one letter is mangled, re-rolling the whole image wastes credits and usually changes the parts you liked.",
    },
  ],

  pitfalls: [
    "**Signing up with an email address instead of Google, Apple, or Microsoft.** Per Ideogram's pricing page, email signups don't come with free weekly credits — and your login method can't be changed later. This is the single most common way beginners end up with an unusable free account.",
    "**Cramming a paragraph into the picture.** Spelling accuracy falls off as text gets longer. Keep it to a few words, and add long copy afterwards in any editor.",
    "**Assuming your images are private.** On the free plan they're public by default and appear next to your username. Check before you generate anything you wouldn't post.",
    "**Naming a specific font or brand.** \"Make it in Helvetica\" or \"use the Nike logo\" won't work reliably and may not be legally yours to use. Describe the look instead — bold, condensed, script with flourishes.",
    "**Leaving Magic Prompt on when your wording is exact.** It expands your prompt behind the scenes, which is great for atmosphere and bad for a headline that has to read word for word.",
  ],

  whereToNext: [
    { label: "More image generation and editing tools", categorySlug: "image-generation-editing" },
    { label: "Turn your graphics into marketing", categorySlug: "sales-marketing-seo-ai" },
  ],
};
