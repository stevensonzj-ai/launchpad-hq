import type { PlatformTutorialData } from "./types";

export const groqTutorial: PlatformTutorialData = {
  slug: "groq-getting-started",
  platformSlug: "groq",
  title: "Getting Started with Groq",
  tagline:
    "Absurdly fast AI answers from open models — a developer service with a browser playground you can try before you write a single line of code.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://console.groq.com/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You send a question to Groq's servers, their hardware runs it through an AI model, and the answer comes back — usually faster than you can finish reading your own prompt. There are two doors in. The first is their browser console: you log in, pick a model from a dropdown, type into a chat box, and watch the reply appear. The second is from your own code, using an **API** (a way for programs to talk to each other) that a program calls with an **API key** (a password that identifies your app). Same models and same speed either way. Start with the browser one.",

  whatItIs: [
    "**First, the name.** Groq is not Grok. Grok is xAI's chatbot, the one built into X. Groq is a separate company that makes chips and sells fast AI hosting to developers. If you came here looking for a chatbot to talk to, you want the other one — the spelling is the only thing they share.",
    "Groq is an **inference** provider. Inference is the part where an already-trained AI model actually answers your question, as opposed to the training that built it. Groq didn't make the models it serves; it takes open models that other labs released and runs them on its own machines.",
    "**What makes it distinctive is speed, and the reason is hardware.** Most AI services run on GPUs — chips originally designed for video game graphics and later pointed at AI. Groq designed its own chip specifically for running language models, which it calls an LPU. The practical result is that words stream back at a rate that feels less like waiting and more like a page loading.",
    "**Who it's really for: developers building things.** This is honest, not discouraging. Groq is infrastructure. There is no polished consumer app, no mobile client, no memory of your past chats, no file uploads sitting in a sidebar. The playground is a testing surface, not a product. A beginner gets real value from spending twenty minutes there — you will feel, physically, what latency does to a product — but you are visiting a workshop, not a storefront.",
  ],

  beforeYouStart: [
    "**Free to start, and genuinely free — no card.** Sign up at the Groq console with an email or a Google account and you land on a free plan that lets you use the playground and the API immediately.",
    "**You need nothing installed.** A browser and an account. Code, keys and libraries only matter if you decide to go past the playground.",
    "**The free plan works by rate limits, not by a credit balance.** A **rate limit** is a cap on how much you can use in a window of time. Groq counts requests per minute, requests per day, and **tokens** (chunks of text, roughly three-quarters of a word each) per minute and per day. Hit any one of those and you wait for the window to reset. The limits apply to your whole organization, not per key, and the exact current numbers for your account are shown on the limits page in your console settings — that is the number to trust, because the published ones change.",
    "**Will you realistically need to pay? Probably not.** If you are exploring, learning, or building a weekend prototype, the free tier is enough and you may never leave it. You'd upgrade for one of three reasons: real users pushing past the per-minute caps, needing batch or flex processing, or wanting the ability to set a spend cap. Pricing is currently per million tokens and measured in cents rather than dollars for the smaller open models — a scale where casual use costs less than a coffee — but check the pricing page, because rates and the model lineup both move.",
    "**Your first step is a browser tab, not a terminal.** Open the playground, pick a model, and ask it something. Do not create an API key yet. You do not need one to try this.",
  ],

  gettingSetUpSafely: {
    officialSource: "groq.com (console at console.groq.com)",
    vendorDocsUrl: "https://console.groq.com/docs",
    body: [
      `**The playground needs no key. Only make one when you have code to put it in.** An API key is a long secret string that tells Groq's servers "this request is from me, bill it to my account." It is a credential that spends money. Treat it the way you'd treat a debit card number, not a username.`,
      "**Never paste a key into a webpage, a chat, a screenshot, or a public code repository.** This is the single most common way people lose keys. Automated bots scan public GitHub repositories for leaked keys within minutes of a commit. Keep the key in an environment variable or a `.env` file, and make sure `.env` is listed in your `.gitignore` so it never gets committed.",
      "**Keys are disposable — use that.** In the console's API keys section you can delete a key instantly and create a new one. If a key is ever exposed, or you merely suspect it was, delete it first and ask questions after. Nothing breaks that a new key won't fix, and rotating on a schedule is cheap insurance.",
      "**Set a spend limit if your plan offers one.** Groq supports a monthly spend cap, configurable under Settings, Billing, Limits, which blocks API calls once you hit it. Worth knowing up front: this is currently a paid-plan feature and is not available on the free tier. On the free tier your protection is the rate limit itself — you cannot run up a bill you didn't agree to, because you have no bill.",
      "**One key per project.** If you build two things, give them two keys. When one leaks you revoke one key instead of breaking everything you own.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "When you send a prompt to Groq, it leaves your machine and runs on Groq's servers. That is what a hosted inference provider is, and it's the same trade you make with any cloud AI service. Groq's documentation states that by default it does not retain customer data for inference requests, but that inputs and outputs may be logged temporarily — currently up to 30 days — for troubleshooting and abuse investigation. Accounts can also turn on a zero-data-retention setting under Data Controls, which switches that logging off at the cost of disabling features that need stored data.",
    },
    {
      kind: "list",
      label: "Practical rules",
      items: [
        "Groq's public documentation describes retention but does not make an explicit statement about whether customer inference data is used to train models. Absence of a claim is not a promise either way. If that matters for your use, read the Services Agreement and Data Processing Addendum rather than assuming.",
        "Don't paste anything into the playground you'd be unhappy to see logged — customer records, credentials, medical or legal details, anything under an NDA. The playground is for testing, and test data should be test data.",
        "The realistic risk here is not Groq reading your prompts. It's you leaking your own key and someone else spending your money on it. Guard the key harder than the prompts.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Speed. This is the whole point and it delivers. Responses stream back fast enough to change what feels possible — live transcription, a chatbot that answers before the user's thumb leaves the screen, tools that run a model in a loop without the loop feeling slow.",
      "Running well-known open models cheaply, without you owning a graphics card or configuring anything.",
      "Slotting into existing code. The API is designed to be compatible with OpenAI's, so most tutorials and libraries written for OpenAI work by changing a URL and a key.",
      "Voice and audio transcription work, where Whisper-family speech models run at a fraction of real time.",
    ],
    okayAt: [
      "Model selection. The catalog is a curated set of open models plus Groq's own agentic systems, and it changes often. It is competent, not comprehensive.",
      "Being explored by a non-developer. The playground is genuinely usable without code, but it looks and behaves like a developer tool, because it is one.",
      "Long documents. Context windows on the hosted models are respectable but not the largest available anywhere.",
    ],
    avoid: [
      "Expecting frontier intelligence. Groq's edge is how fast it runs models, not how smart they are. On the hardest reasoning, coding and analysis tasks, the top proprietary models from OpenAI, Anthropic and Google are still ahead. Speed is not a substitute for capability, and choosing Groq means accepting that trade knowingly.",
      "Using it as your everyday chatbot. It has no conversation history worth relying on, no apps, no integrations, no mobile experience. Use a consumer assistant for that and come here to build.",
      "Assuming a model you built on will still be there next quarter. Preview models in particular can be withdrawn at short notice, and models move between public and enterprise-only availability.",
    ],
  },

  starterActions: [
    {
      title: "Open the playground and ask something you already know the answer to",
      whatItDoes:
        "Loads the browser console, lets you pick a model from a dropdown, and gives you a chat box — no key, no code, no install.",
      prompt:
        "Explain what an API key is to someone who has never written code, in about four sentences.",
      whyHere:
        "This is the moment Groq sells itself. Ask the same question you'd ask any chatbot and watch the answer arrive nearly instantly. You are not evaluating the answer's quality — you're calibrating your sense of what fast means, which is the only thing Groq is genuinely differentiated on and the thing screenshots cannot convey.",
      tweak:
        "Ask for something long — a 500-word explanation — so you can watch the full stream rather than a single burst.",
    },
    {
      title: "Try one small model and one large one on the same question",
      whatItDoes:
        "Shows the trade between speed and capability directly, by running identical input through two models.",
      prompt:
        "Here is a rule: a number is interesting if it is divisible by 3 and its digits sum to more than 10. List every interesting number between 40 and 80, and show your reasoning.",
      whyHere:
        "Groq's catalog is deliberately arranged from very small and very fast to larger and slower, and switching between them is a dropdown rather than a new account. The small models are startlingly quick and will sometimes get this wrong; the larger ones are slower and usually right. Seeing that trade in one sitting, on one screen, is the most useful thing a beginner can learn here.",
      tweak:
        "Watch the tokens-per-second readout the console shows next to each response. That number is the product.",
    },
    {
      title: "Turn the temperature and max-tokens sliders and see what breaks",
      whatItDoes:
        "Exposes the two settings that matter most on any model, using the playground's parameter panel.",
      prompt:
        "Write the opening paragraph of a short story about a lighthouse keeper who has stopped receiving mail.",
      whyHere:
        "Every AI API you ever touch will have these two knobs, and the playground is a consequence-free place to learn them. Temperature controls randomness — low is predictable, high is loose and eventually incoherent. Max tokens caps the length of the reply, and setting it too low cuts the answer off mid-sentence, which is a bug beginners commonly mistake for the model being broken.",
      tweak:
        "Run the same prompt at temperature 0.1 and again at 1.3. The difference is the clearest demonstration of the setting you'll ever get.",
    },
    {
      title: "Try a speech-to-text model with your own audio",
      whatItDoes:
        "Runs a Whisper-family transcription model on an audio file you supply.",
      whyHere:
        "Transcription is where Groq's speed stops being a demo and starts being a capability difference. Files transcribe in a small fraction of their own runtime, which is what makes live captioning and real-time voice interfaces practical. It's also the most immediately useful thing on the platform for someone who isn't building software.",
      tweak:
        "Use a recording with background noise or crosstalk — that's where you learn the real accuracy limits, not on clean studio audio.",
    },
    {
      title: "Only now: create a key and make one call",
      whatItDoes:
        "Generates an API key in the console and runs a single request from your own code or from a `curl` command in a terminal.",
      whyHere:
        "Skip this if you don't write code — the previous four actions are the whole beginner path, and stopping here is a legitimate ending. If you do write code, this is the payoff: because Groq's API is OpenAI-compatible, an existing script usually needs only a changed base URL and key to run against Groq instead, and the speed difference in your own app is more convincing than any benchmark. Store the key in an environment variable the first time. Habits formed on day one are the ones that hold.",
      tweak:
        "Before you write anything, add `.env` to your `.gitignore`. Do it first, not after.",
    },
  ],

  pitfalls: [
    "**It's Groq, not Grok.** Groq is the inference company at groq.com; Grok is xAI's chatbot at grok.com. Different companies, different products, one letter apart. If you're here for a chatbot to talk to, you're in the wrong place — and if a tutorial or a search result mixes them up, it's a sign that whatever else it says wasn't checked either.",
    "**A leaked API key is money leaving your account.** Keys get committed to public repositories, pasted into support threads, and left visible in screenshots and screen shares. Automated scanners find them fast. Keep keys in environment variables, keep `.env` out of git, and delete any key the instant you suspect it was seen.",
    "**Speed is not intelligence.** Because responses arrive so quickly, they feel more authoritative than they are. The models Groq hosts are good open models, not frontier ones, and they hallucinate at ordinary rates. Verify anything that matters — the fast wrong answer is still a wrong answer, and it arrives with more confidence.",
    "**The model list is not stable.** Models get added, deprecated and moved between public and enterprise-only availability. Anything hardcoded — in your app or in a tutorial you're following — can stop working. Check the models page in the docs for what's live today rather than trusting a name you read somewhere, and prefer models marked for production over preview ones.",
    "**Rate limits arrive suddenly, and spend caps aren't the safety net you'd expect.** On the free tier you can hit a per-minute or per-day cap mid-task and simply start getting errors, which is confusing the first time. And the console's monthly spend limit — the obvious guardrail — is currently a paid-plan feature, so free users protect themselves by watching the limits page instead.",
  ],

  whereToNext: [
    { label: "More AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
