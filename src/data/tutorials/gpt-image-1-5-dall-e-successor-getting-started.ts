import type { PlatformTutorialData } from "./types";

export const gptImage15DallESuccessorTutorial: PlatformTutorialData = {
  slug: "gpt-image-1-5-dall-e-successor-getting-started",
  platformSlug: "gpt-image-1-5-dall-e-successor",
  title: "Getting Started with Image Generation in ChatGPT",
  tagline:
    "Describe a picture in the same box you'd ask a question, and keep talking until it's right.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "FREE",

  howItWorks:
    "You type a description of a picture into the same message box you'd use for a question, and a few moments later the image appears in the conversation. If something's off, you say so in plain words — smaller, warmer, move the sign left — and a new version appears underneath. You keep going until it's right.",

  whatItIs: [
    "This is OpenAI's image generator, the one that replaced DALL·E. It doesn't have a separate app or website: it lives inside ChatGPT.",
    "The **model** (the AI \"brain\" that does the actual thinking) behind it has been swapped out three times in nine months — GPT Image 1.5 in December, GPT Image 2 in April, and ChatGPT Images 2.5 on 8 September 2026. You never choose between them; ChatGPT serves whichever is current.",
    "It's a good first image generator because there is nothing to learn before you start — no settings, no codes appended to your request, no separate account. The trade is that you get less precise control than tools built only for image work.",
  ],

  beforeYouStart: [
    "Ignore the model names. You can't pick \"GPT Image 1.5\" or ask for \"DALL·E\" — DALL·E was switched off on 12 May 2026 and GPT Image 1.5 is being retired from OpenAI's developer service on 1 December 2026. Any guide telling you to select one is out of date.",
    "Go to chatgpt.com and sign up free with an email, Google or Apple account. Image generation is included on the free plan, so you can make pictures on day one without a card. ChatGPT isn't offered in every country, and OpenAI warns that getting around that can cost you the account.",
    "You probably won't need to pay to try this, but you'll notice the ceiling quickly: OpenAI describes free image generation as limited and slower, and the cap on images is counted separately from the cap on chat messages — you can run out of pictures while text still works. Plus is currently around $20 a month, and a cheaper Go plan sits underneath it, with prices varying by country.",
    "One capability is genuinely behind the paywall rather than just rationed: OpenAI's help pages state that \"Images with thinking\" — where the model works through a complicated instruction before drawing — is available on Plus, Pro and Business. On the free plan, a request with several fussy requirements in it will come back partly wrong, and rephrasing won't fix it.",
  ],

  security: [
    {
      kind: "text",
      text: "This generator's distinguishing privacy fact is not how OpenAI handles your data but what it stamps into the pictures themselves. OpenAI puts two provenance marks on images made in ChatGPT: an invisible **watermark** (a mark on generated output identifying it as AI-made) and a data label the industry calls Content Credentials. OpenAI's own guidance is honest about the limits of both: the data label \"can sometimes be removed by platforms, editing tools, or file conversions,\" and the invisible watermark degrades under compression, cropping and format changes. So it is evidence, not proof, in either direction.",
    },
    {
      kind: "text",
      text: "On the ownership question OpenAI is unusually generous, and the generosity has one string attached. Its Terms of Use, in force since 1 January 2026, say you \"own the Output\" and assign OpenAI's rights in it to you — but the same terms forbid you to \"represent that Output was human-generated when it was not.\" You can sell the picture; you can't pass it off as hand-made.",
    },
    {
      kind: "list",
      label: "Worth knowing before you upload a reference photo",
      items: [
        "Photos you upload go to OpenAI's servers, and on the personal plans content is used to train its models by default until you turn that off under Settings → Data Controls → \"Improve the model for everyone\"",
        "OpenAI's page on training doesn't state plainly whether uploaded and generated images are covered by that setting the same way conversations are — assume they are and opt out if it matters",
        "OpenAI's usage policies, effective 29 October 2025, bar using someone's likeness without their consent in ways that could confuse authenticity — which covers most of what people want to do with a friend's photo as a joke",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting a usable picture out of a plain-English description",
      "Fixing what's wrong by replying in the same conversation instead of rewriting the request",
      "Signs, posters, packaging and mock-ups where the words have to come out legible",
      "Cut-out assets like logos and stickers, because it can return a genuinely transparent background rather than a white square",
      "Keeping one invented character recognisable across several pictures in the same thread",
    ],
    okayAt: [
      "Real typography and page layout — the letters are legible now, but you can't specify a typeface or hold a grid",
      "Exact brand colours and repeatable spec work; ask twice and you'll get two near-misses",
      "Retouching your own photograph — it re-draws the picture rather than editing the pixels you gave it, so faces and hands drift",
    ],
    avoid: [
      "Anything that must not be traceable to AI. Every image carries the two marks described above.",
      "Recognisable living people, especially photorealistically. The refusals you'll hit are not negotiable — you cannot argue the model into it, and repeated attempts are an account-safety question, not a prompting one.",
    ],
  },

  starterActions: [
    {
      title: "Put the words on the poster",
      prompt:
        "Make a poster for a neighbourhood plant swap. The poster must read exactly: \"PLANT SWAP — Saturday 10am — Corner of 4th and Pine — bring a cutting, take a cutting\". Warm hand-drawn style, portrait orientation, plenty of empty space at the bottom.",
      whyHere:
        "Legible text inside the picture was the specific thing OpenAI rebuilt for the April 2026 model and kept improving in September's — which is why quoting the exact wording in your request is worth doing here rather than adding the words afterwards in another program.",
    },
    {
      title: "Ask for a cut-out, not a picture of one",
      prompt:
        "A single ripe fig with one leaf, flat illustration style, thick clean outlines, on a fully transparent background. No shadow, no ground, no frame.",
      whyHere:
        "ChatGPT can return an actually transparent background — OpenAI documents making backgrounds transparent in the image editor and shipped transparent PNG and WebP output to its developer service on 20 August 2026 — so the fig drops onto any colour.",
    },
    {
      title: "Keep the same character in shot two",
      prompt:
        "Same character, exactly as-is — same face, same hair, same jacket, same art style. Now show them sitting on a bus at night, looking out of the window. Wide shot.",
      whyHere:
        "Holding a subject steady across a back-and-forth is what the 8 September 2026 update was released for, so the instruction that works here is a plain follow-up in the running thread rather than anything appended to a fresh request.",
      tweak:
        "Send this as a reply inside the same conversation, after you've already made a character you like.",
    },
    {
      title: "Start from a template instead of a blank box",
      whatItDoes:
        "Open the sidebar, choose Images, then click Templates. Pick a category, pick a template, fill in the details it asks for and send. ChatGPT may come back with a couple of follow-up questions before it draws anything.",
      whyHere:
        "OpenAI's help pages describe a browsable Templates library inside the Images sidebar, with formats like posters and merchandise already set up — which means the hardest part for a first-timer, writing the request, is handed to you filled in and you edit it rather than invent it. That is the documentation's description rather than a screen we watched, so expect the labels to have moved.",
    },
    {
      title: "Look at what the file is carrying before you post it",
      whatItDoes:
        "Download an image you've made, then run it through OpenAI's public verification page before you put it anywhere that matters. It will tell you whether the two marks OpenAI applies are still intact in that particular file.",
      whyHere:
        "OpenAI publishes a tool to read those marks back, so this is the one image generator where you can check for yourself what a file discloses about its origin before you hand it to a client.",
    },
  ],

  pitfalls: [
    "Following any guide that tells you to choose DALL·E or GPT Image 1.5 — its advice about how to phrase things is aimed at a generator that has since been replaced twice.",
    "Re-describing an edit instead of pointing at it. OpenAI's help pages describe an editor you open by clicking the image, with a Select tool that highlights only the area you mean and a slider to size the selection; find that first, then describe the change.",
    "Resending because nothing's happening. OpenAI says a picture can take a few minutes. A second attempt doesn't speed anything up; it spends another image from your cap.",
    "Hunting for the sketch tool on a laptop. Drawing a rough layout and having ChatGPT render it is a mobile-app feature — you type \"@\" in the message box, choose Sketch, draw, then tap the checkmark and describe what it should become. It isn't in the desktop browser, and people conclude it doesn't exist.",
  ],

  whereToNext: [
    { label: "Other image generators", categorySlug: "image-generation-editing" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
