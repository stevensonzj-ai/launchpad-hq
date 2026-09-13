import type { PlatformTutorialData } from "./types";

export const sakanaAiTutorial: PlatformTutorialData = {
  slug: "sakana-ai-getting-started",
  platformSlug: "sakana-ai",
  title: "Getting Started with Sakana AI",
  tagline:
    "Japan's frontier AI lab, and the free Japanese chatbot it built — which its own help page says only works from inside Japan.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://sakana.ai/blog/",
  accessTier: "FREE",

  howItWorks:
    "You open a page in your browser, type a message into a box (this is called a **prompt** — the message you type), and an answer comes back in the thread. You keep typing follow-ups in the same conversation.",

  whatItIs: [
    "Sakana AI is a Tokyo research company founded in 2023 by David Ha, Ren Ito and Llion Jones — one of the three authors' names behind the paper that started the current wave of AI. For its first two years it was known for papers rather than products, and that reputation is out of date.",
    "It now runs three things you can actually use: Sakana Chat, a free chatbot; Sakana Translate, a Japanese–English–Chinese translation page attached to it; and Sakana Fugu, a paid service for programmers that spreads a single request across several different AI **models** (the AI \"brain\" that does the actual thinking) instead of using just one.",
    "The reason to come here rather than to ChatGPT is Japanese. The chatbot runs on Namazu, a model Sakana tuned specifically for Japanese writing and Japanese business context.",
  ],

  beforeYouStart: [
    "**Sakana Chat's own help page says it currently works only from inside Japan** — 「現在Sakana Chatは、日本国内からのみご利用いただけます」— and its terms of service reserve the right to block access by IP address. If you are reading this from outside Japan you may simply not be able to sign in, and there is no waitlist to join. Our Text & Conversational AI category is where to find a chatbot you can definitely reach; nothing else on this page depends on you getting past that gate.",
    "The interface is Japanese and the answers come back in Japanese. You can type English at it, but this is a tool built for Japanese first, and treating it as an English chatbot wastes the only thing it does better than the alternatives.",
    "You will not need to pay for the chatbot. It is free, and unusually there is no paid plan to upgrade to — the pricing page states plainly that Sakana Chat has no subscription and that buying a developer plan does not raise its limits. The FAQ says it is free \"currently\" and that any change would be announced first.",
    "Sakana's FAQ says you do not strictly need an account to send a message, but registering — with a Google account or an email sign-in link — is what saves your conversation history and raises the cap on how many requests you can make in a given period.",
    "The two paid products are separate purchases with separate signups. Fugu, the developer service, currently starts around $20/month or is billed per use; Marlin, the long-running research agent, is sold only to businesses at roughly ¥98 per credit with about 100 credits per report. Neither is currently sold in the EU or EEA.",
  ],

  security: [
    {
      kind: "text",
      text: "Where your conversation physically sits is a documented fact here, and it is worth reading precisely rather than taking on trust. Sakana's privacy policy, in force since 19 May 2026, says chat history is stored on Google Cloud Firestore located in Japan and that it does not transfer personal data to third parties outside Japan except where Japanese law permits. If your reason for choosing a Japanese tool is that you want Japanese data residency, that is written down rather than implied.",
    },
    {
      kind: "text",
      text: "What is not private by default is training. The terms say Sakana uses your content for machine-learning training and improvement, and that it provides a way to opt out. The opt-out lives in the settings screen under プライバシー (Privacy) — which means it is an account setting, so if you are using the chatbot without registering there is no settings screen in which to turn it off.",
    },
    {
      kind: "list",
      label: "Two clauses in the terms worth knowing before you rely on it",
      items: [
        "You may not use the output to build a rival model, including by distillation or extraction — the terms name that specifically, so anything you generate here is off-limits as training data for a model of your own.",
        "Using it to deliver work that legally requires a qualified professional, without that professional's oversight, is prohibited outright rather than merely discouraged.",
      ],
    },
    {
      kind: "text",
      text: "Everyday use is not the risk. The value of these documents is that the boundaries are drawn in writing, where a free product usually leaves them to inference.",
    },
  ],

  triad: {
    bestAt: [
      "Japanese writing, reading and rewriting — this is what the model behind it was built for",
      "Translating between Japanese, English and Chinese, including phrasing that carries cultural weight rather than just vocabulary (Sakana's own August 2026 evaluation claims it beat competing models more than half the time; that is the vendor's own test)",
      "Checking and improving a Japanese draft you have already written, rather than generating one from nothing",
      "Everyday questions that need a current web search folded into the answer",
    ],
    okayAt: [
      "English-language work — it will do it, but dozens of tools do it better",
      "Coding and data work — real, but this is not where its strength is",
      "Long documents — file attachments were added in August 2026 and are newer than the rest of the product",
    ],
    avoid: [
      "Generating material to train or fine-tune your own AI — a licence problem rather than a quality one",
      "Any language outside Japanese, English and Chinese in the translation page — those three are the whole supported set, so Spanish or French are not a matter of quality but of absence",
      "Building anything you need to still work next year on the free chat specifically — there is deliberately no paid plan to fall back on if that changes",
    ],
  },

  starterActions: [
    {
      title: "Proofread a Japanese draft instead of generating one",
      prompt: "[paste your Japanese paragraph here]",
      whyHere:
        "Paste the draft into the translation page and switch it to 添削 (Proofread) mode first. DeepL returns one rendering and stops. Sakana Translate's proofread mode marks its changes against your own draft rather than replacing it, and its third mode takes a follow-up question about the rendering it just produced in the same panel.",
      tweak:
        "Paste English and set the target to Japanese to see the same three modes work the other direction.",
    },
    {
      title: "Ask it something Japan-specific",
      prompt:
        "日本の中小企業が初めて海外の顧客と取引するときに気をつけるべき商習慣の違いを、5つ挙げて簡潔に説明してください。",
      whyHere:
        "Roughly: \"List five differences in business custom a small Japanese company should watch for when trading with an overseas customer for the first time, briefly.\" Namazu was post-trained for Japanese and Japan-specific business context and released as its own API in August 2026.",
      tweak:
        "Ask the same question in English and compare — the gap between the two answers is the clearest read on what the Japanese tuning bought.",
    },
    {
      title: "Make it produce a chart rather than describe one",
      prompt:
        "最新の情報をウェブで調べたうえで、結果を表とグラフにまとめてください。テーマは「日本の生成AI利用率の推移」です。",
      whyHere:
        "Roughly: \"Search the web for current information, then summarise the result as a table and a chart, on the topic of how generative-AI adoption in Japan has changed over time.\" The 13 August 2026 update added running Python in a sandbox and previewing what it produces, and it landed in the free chat.",
    },
    {
      title: "Fugu, the part that works from outside Japan",
      whatItDoes:
        "Fugu reaches programmers through an **API** (a way for programs to talk to each other without a person clicking) that is deliberately shaped like OpenAI's so existing code needs only the address and key changed. There is no chat box; the console is for keys and monitoring.",
      whyHere:
        "Fugu is an orchestration layer sold as if it were a model — currently around $2 in / $6 out per million tokens for Fugu Max against $5 / $30 for Fugu Ultra, priced by how hard you want it to work rather than by which model you picked.",
    },
    {
      title: "Marlin, the eight-hour report machine you will read about",
      whatItDoes:
        "Marlin takes a strategic research question and works on it autonomously for up to eight hours before returning a long structured report, and it is sold only to companies, organisations and sole traders — not to individuals. Around ¥150,000 a month for the Pro plan. It is worth knowing what it is because it is the Sakana product that shows up in business coverage.",
      whyHere:
        "Marlin bills by the report rather than by the seat, which is a different purchase shape from a monthly assistant subscription.",
    },
  ],

  pitfalls: [
    "The three Sakana properties are three separate signups. chat.sakana.ai is the free chatbot, console.sakana.ai is the paid developer platform and marlin.sakana.ai is the business research agent — an account or a subscription on one does nothing on the others.",
    "translate.sakana.ai is not a separate product. It redirects to chat.sakana.ai/translate, which means Sakana Chat's terms — including the Japan-only statement — govern the translation page too, even though the translation interface itself will show you English.",
    "The character limit on the translation box is not the number you will read about. Sakana's August 2026 post describes handling around 5,000 characters, while the counter on the page itself showed a lower figure when we looked — watch the counter rather than the announcement.",
  ],

  whereToNext: [
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Sakana AI's product and research blog", href: "https://sakana.ai/blog/" },
  ],
};
