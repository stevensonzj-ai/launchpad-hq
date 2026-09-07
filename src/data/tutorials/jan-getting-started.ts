import type { PlatformTutorialData } from "./types";

export const janTutorial: PlatformTutorialData = {
  slug: "jan-getting-started",
  platformSlug: "jan",
  title: "Getting Started with Jan",
  tagline:
    "A free, open-source AI chat app that runs on your own computer — your conversations never leave it.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.jan.ai/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install Jan like any other desktop app, then download a **model** from inside it — the AI \"brain\" that does the actual thinking. After that you chat in a window that looks a lot like any other assistant, except the answers are produced by your own machine, so nothing you type is sent anywhere.",

  whatItIs: [
    "Jan is a desktop app for Mac, Windows and Linux that runs AI models directly on your computer. It's **open-source** — the code is public and anyone can inspect it — under the Apache 2.0 licence, which means it's genuinely free, including for work.",
    "It's for people who want a normal chat window rather than a programming project: you want to try local AI, you don't want to touch a command line, and you'd rather your words stayed on your own hard drive.",
    "**Why Jan over Ollama:** Ollama is built mainly as an engine that other tools plug into, so on its own it gives you plumbing rather than a place to chat. Jan hands you a finished chat app on first launch.",
    "**Why Jan over LM Studio:** LM Studio is free and polished, but its source code is closed. Jan's is fully open. If \"I want to see exactly what is running on my machine\" is the reason you're going local in the first place, that difference is the whole point. Worth knowing honestly: all three run the same underlying engine and the same model files, so answer quality is broadly the same — you're choosing an interface and a licence, not a smarter AI.",
  ],

  beforeYouStart: [
    "**Your hardware is the limit here, not your ambition.** With a hosted service you rent someone else's giant computer; here the ceiling is the machine on your desk, and no setting will raise it.",
    "**RAM** is your computer's short-term working memory — the thing that runs out when too much is open at once. It's the binding constraint. To check yours: Mac, Apple menu → About This Mac; Windows, Settings → System → About.",
    "As a rough guide from Jan's own documentation: about 8GB of RAM handles small models, around 16GB opens up mid-sized ones, and roughly 32GB is needed for the larger ones. Set aside at least 10GB of free disk space to start — model files are large, and they add up fast.",
    "**Be clear-eyed:** a model running on your laptop is meaningfully less capable than a hosted frontier assistant. It will be slower, will know less, and will get more things wrong. Privacy and offline access are what you're buying, and you're paying for them in capability.",
    "Nothing you type into a local model leaves your computer. No account, no subscription, no internet connection needed once a model is downloaded.",
  ],

  gettingSetUpSafely: {
    officialSource: "Jan's official download page",
    vendorDocsUrl: "https://www.jan.ai/docs/desktop/quickstart",
    body: [
      "**Download only from jan.ai or Jan's official GitHub releases page.** This matters more than usual: you're installing a desktop application, which can touch anything on your machine. \"Free AI chat download\" search results and app-mirror sites are exactly where tampered installers live. Type the address yourself rather than trusting a link.",
      "**Check your hardware before you install, not after.** Jan's docs list roughly 8GB RAM minimum, about 10GB free disk, and a processor from around 2013 or later — older machines genuinely will not run it.",
      "Follow the official install steps at the docs link above. They differ per platform and change between versions, so use the current ones rather than a blog post.",
      "**Know where the large files land**, because they will quietly eat your disk: Mac `~/Library/Application Support/Jan/data`, Windows `%APPDATA%/Jan/data`, Linux `~/.local/share/Jan/data`. You can move this folder in Settings.",
      "**Confirm it worked:** launch Jan, let it finish downloading its starter model, and ask it something simple. If you get a reply, disconnect from wi-fi and ask another question. A second answer with the internet off is proof it's genuinely running on your machine.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "The usual warning runs backwards here. **Jan is the private option:** with a local model, your conversations aren't sent to a company, aren't stored on a server, and aren't available to train anything. You don't lose that privacy by using Jan normally — you lose it by installing it from the wrong place, or by switching on the features that reach outside your machine.",
    },
    {
      kind: "list",
      label: "The three ways to give that privacy away",
      items: [
        "Installing from an unofficial mirror or a \"cracked\" build instead of jan.ai — a tampered installer defeats every other protection on this page.",
        "**Adding a cloud provider API key.** Jan can also talk to hosted models from other companies. Useful, but those chats go to that company under their policies, not Jan's. Watch which model is selected before you paste anything sensitive.",
        "Turning on Jan's local API server and changing its address from `127.0.0.1` to `0.0.0.0`. That switch takes it from \"only this computer\" to \"anything on my network.\" Jan's own docs flag it as a use-with-caution setting. Leave it alone unless you know why you're changing it.",
      ],
    },
    {
      kind: "text",
      text: "Your conversations are saved on your disk as ordinary readable files, and Jan's documentation describes no encryption on them. That's the trade for keeping them out of the cloud: **device security is now the whole of your data security.** Anyone who can open your unlocked laptop can read every chat. Use a login password and full-disk encryption.",
    },
  ],

  triad: {
    bestAt: [
      "Private drafting and thinking-out-loud you wouldn't paste into a cloud service",
      "Working with no internet at all",
      "Learning how AI models actually work by handling one directly",
      "Anyone who wants open-source software they can audit",
      "Machines with roughly 16GB of RAM or more, where it feels genuinely pleasant",
    ],
    okayAt: [
      "Everyday questions, summarising and rewriting on a machine with around 8GB — it works, it's just slower and noticeably less sharp",
      "Light coding help using a code-focused model",
      "Running as a local, free stand-in for a paid API while you experiment",
    ],
    avoid: [
      "Machines under roughly 8GB of RAM, or processors older than about 2013 — it won't run well, or at all",
      "Work where being wrong is expensive, since small local models make more mistakes",
      "Anyone who wants the smartest possible answer, where a hosted frontier model is simply better",
      "People unwilling to spend twenty minutes on setup and a large download before the first reply",
    ],
  },

  starterActions: [
    {
      title: "Start with whatever Jan downloads for you",
      whatItDoes:
        "Jan fetches a default model automatically on first launch, so you can chat immediately without choosing anything.",
      prompt: "Explain what you are and what you can help me with, in plain language.",
      whyHere:
        "On Jan specifically this is the fastest proof that local AI works on *your* machine. Don't browse the model library first — get one reply, feel the speed, then decide whether you want something bigger.",
      tweak: "Ask the same question again with wi-fi switched off, to see the offline promise for yourself.",
    },
    {
      title: "Read the Fits / May be slow / Won't fit labels before downloading anything",
      whatItDoes: "Jan's built-in Hub checks each model against your actual hardware and labels it.",
      whyHere:
        "This is Jan's single best beginner feature and the main reason it's friendlier than the alternatives — it removes the guesswork that makes people give up on local AI. Treat \"May be slow\" as \"no\" for your first week.",
      tweak: "If everything useful says \"Won't fit,\" that's your hardware answering honestly. Use a hosted tool instead rather than fighting it.",
    },
    {
      title: "Try one of Jan's own small models",
      whatItDoes:
        "A roughly 4-billion-**parameter** model built by Jan's team. Parameters are a rough proxy for size and smartness — more is generally sharper but heavier on your machine.",
      prompt: "Rewrite this paragraph so it is clearer and about half as long, and tell me what you cut.",
      whyHere:
        "Jan documents this size as running in roughly 8GB of RAM, which makes it a realistic first choice on an ordinary laptop rather than an aspirational one.",
      tweak: "With around 16GB or more, step up to a larger model from the Hub and compare the two answers side by side. That comparison teaches you more about model size than any explainer.",
    },
    {
      title: "Understand the Small / Balanced / Large choice",
      whatItDoes:
        "Most models are offered in several versions of different file sizes. This is **quantization** — compressing the model so it fits in less memory, at some cost to quality.",
      whyHere:
        "Jan labels these plainly and marks a recommended default, so you get the one decision that most affects whether local AI feels good or awful, without needing the theory. Take the recommended one.",
      tweak: "If a model runs but feels sluggish, drop to the smaller version of the *same* model before abandoning it — often that alone fixes it.",
    },
    {
      title: "Do a private task you wouldn't paste into a cloud tool",
      whatItDoes: "Uses the local model for something genuinely sensitive.",
      prompt:
        "Here are my rough notes from a difficult conversation at work. Help me organise them into what happened, what I feel about it, and what I want to do next.",
      whyHere:
        "This is the reason Jan exists. Trying it on a real private task — rather than a test question — is what turns \"runs offline\" from a spec into something you actually trust.",
      tweak: "Check the model selector shows a local model, not a cloud provider, before you start.",
    },
  ],

  pitfalls: [
    "**Downloading a model too big for your machine** is the classic first mistake. Bigger looks better, and then Jan crawls, freezes, or refuses to load it. Believe the \"Fits\" label over your ambition — you can always go bigger later.",
    "**Expecting frontier-model quality** sets you up to be disappointed in about ten minutes. A model running on a laptop is a much smaller brain. Judge it against \"useful and private,\" not against the best hosted assistant.",
    "**Forgetting the disk space** catches almost everyone. Model files are large and they accumulate silently in Jan's data folder. Delete models you tried once and abandoned; a full disk causes problems well beyond Jan.",
    "**Assuming everything is private after adding a cloud API key.** Jan can talk to outside providers too, and the interface looks identical either way. Check which model is selected before you type anything you wouldn't want stored on someone else's server.",
    "**Judging the whole idea from the first sixty seconds.** The first reply is often slow while the model loads into memory, and the very first model you try may be the wrong size. Give it one deliberate second attempt before deciding local AI isn't for you.",
  ],

  whereToNext: [
    { label: "More local and open-source AI tools", categorySlug: "local-open-source-ai" },
    { label: "Cloud AI chat assistants to compare against", categorySlug: "text-conversational-ai" },
  ],
};
