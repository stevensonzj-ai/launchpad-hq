-- Catalog X-watch batch 2026-11-16 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No inserts. No new slugs.
-- UPDATE: gemini, qwen, claude (meetings note + upgradeTriggers), chatgpt, deepseek,
--          windsurf (Devin Apps), suno, github-copilot
-- Claude upgradeTriggers drops "needing Opus 4.6 for complex tasks" and names no model.
-- Approved carryover from 2026-11-12, same model-free style as the ChatGPT copy fix.
-- SKIP as rows: Inkling 2 Small (no catalog row), Sesame (no catalog row),
--               Perplexity Teammates, Seedance 2.5 Flash, a new Argon price line
--               (the Gemini model registry already records the Dec 1 Standard price).
-- Sources checked 2026-11-16 on vendor pages (see PR body). Not run from here.

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): Gemini 4 Hydrogen, introduced 2026-11-12, is priced flat across its 1 million-token context window at $1.50 per 1M input tokens and $7.50 per 1M output tokens. Context caching is $0.075 per 1M tokens, and the pricing page says implicit caching only. Batch and Flex are $0.75 input and $3.75 output per 1M tokens. On the Standard tier the free tier lists input, output, and context caching as free of charge. The launch post says Hydrogen is in all tiers of Google AI Studio, the Gemini API, Gemini for business, the Gemini app, and Google Search, and for paid Google AI Pro and Ultra subscribers in Google Antigravity. In the Gemini app, free users get it through auto model selection when it is the appropriate model.$xw$
  ELSE description || $xw$ Note (2026-11-16): Gemini 4 Hydrogen, introduced 2026-11-12, is priced flat across its 1 million-token context window at $1.50 per 1M input tokens and $7.50 per 1M output tokens. Context caching is $0.075 per 1M tokens, and the pricing page says implicit caching only. Batch and Flex are $0.75 input and $3.75 output per 1M tokens. On the Standard tier the free tier lists input, output, and context caching as free of charge. The launch post says Hydrogen is in all tiers of Google AI Studio, the Gemini API, Gemini for business, the Gemini app, and Google Search, and for paid Google AI Pro and Ultra subscribers in Google Antigravity. In the Gemini app, free users get it through auto model selection when it is the appropriate model.$xw$
END, "updatedAt" = now() WHERE slug = $xw$gemini$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Gemini 4 Hydrogen%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): Qwen4-Max (model id qwen4-max) is the production model. The preview page says it is available and recommended. Context length is 1,000,000 tokens, and input is text, image, and video. International (Singapore): $1.50 input and $4.50 output per 1M tokens, cache read $0.075. Beijing and Global (Frankfurt, Hong Kong, Tokyo, and US Virginia): $1.413 input and $4.24 output, cache read $0.071. The Singapore free quota is 1 million tokens, valid for 90 days from the later of Model Studio activation, model release, or application approval. The pricing page says other regions have no free quota. Qwen4-Max-Preview stays Token Plan only until 24:00 on 2026-11-25 (UTC+8), when that page says the preview is retired. The Qwen4-Max page says batch inference is not supported.$xw$
  ELSE description || $xw$ Note (2026-11-16): Qwen4-Max (model id qwen4-max) is the production model. The preview page says it is available and recommended. Context length is 1,000,000 tokens, and input is text, image, and video. International (Singapore): $1.50 input and $4.50 output per 1M tokens, cache read $0.075. Beijing and Global (Frankfurt, Hong Kong, Tokyo, and US Virginia): $1.413 input and $4.24 output, cache read $0.071. The Singapore free quota is 1 million tokens, valid for 90 days from the later of Model Studio activation, model release, or application approval. The pricing page says other regions have no free quota. Qwen4-Max-Preview stays Token Plan only until 24:00 on 2026-11-25 (UTC+8), when that page says the preview is retired. The Qwen4-Max page says batch inference is not supported.$xw$
END, "updatedAt" = now() WHERE slug = $xw$qwen$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Qwen4-Max (model id qwen4-max) is the production model%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): Claude Meetings is in beta on Team and Enterprise plans, with Google Meet first and other platforms coming soon. During the beta, notes and transcripts are free, and answers in the call are free unless an answer uses a connected tool, which counts toward plan usage. Docs, whiteboards, and other artifacts made in a call are free through 2027-02-10. It is not available to some organizations, including those with zero data retention, a HIPAA-ready configuration, or customer-managed encryption keys.$xw$
  ELSE description || $xw$ Note (2026-11-16): Claude Meetings is in beta on Team and Enterprise plans, with Google Meet first and other platforms coming soon. During the beta, notes and transcripts are free, and answers in the call are free unless an answer uses a connected tool, which counts toward plan usage. Docs, whiteboards, and other artifacts made in a call are free through 2027-02-10. It is not available to some organizations, including those with zero data retention, a HIPAA-ready configuration, or customer-managed encryption keys.$xw$
END, "updatedAt" = now() WHERE slug = $xw$claude$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Claude Meetings is in beta%$xw$;

UPDATE platforms SET
  "upgradeTriggers" = $xw$Daily message limits; needing a more capable model for complex tasks; Claude Code; 1M context; MCP integrations$xw$,
  "updatedAt" = now()
WHERE slug = $xw$claude$xw$
  AND (
    "upgradeTriggers" = $xw$Daily message limits; needing Opus 4.6 for complex tasks; Claude Code; 1M context; MCP integrations$xw$
    OR "upgradeTriggers" ILIKE $xw$%opus%$xw$
  );

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): ChatGPT Wallet, announced 2026-11-13, lets a dot complete a purchase after the user reviews it and approves it with a security check. The payment network then provides a payment token instead of the card details. It is rolling out to ChatGPT Pro subscribers aged 18 and older in the US with eligible US-issued cards.$xw$
  ELSE description || $xw$ Note (2026-11-16): ChatGPT Wallet, announced 2026-11-13, lets a dot complete a purchase after the user reviews it and approves it with a security check. The payment network then provides a payment token instead of the card details. It is rolling out to ChatGPT Pro subscribers aged 18 and older in the US with eligible US-issued cards.$xw$
END, "updatedAt" = now() WHERE slug = $xw$chatgpt$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%ChatGPT Wallet, announced 2026-11-13%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): The 2026-11-13 API news says deepseek-flash supports built-in web search, file input, URL reading, and safety checks. Search, Fetch, OCR, ASR, and TTS are also standalone APIs. Public-facing apps must enable safety checks. The post says these capabilities add tool usage fees and does not restate the dollar amounts.$xw$
  ELSE description || $xw$ Note (2026-11-16): The 2026-11-13 API news says deepseek-flash supports built-in web search, file input, URL reading, and safety checks. Search, Fetch, OCR, ASR, and TTS are also standalone APIs. Public-facing apps must enable safety checks. The post says these capabilities add tool usage fees and does not restate the dollar amounts.$xw$
END, "updatedAt" = now() WHERE slug = $xw$deepseek$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%deepseek-flash supports built-in web search%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): Devin Apps, announced 2026-11-13, are private web apps hosted on Devin's cloud computer. Everyone who opens one signs in to Devin, and the apps are never public. Sharing can be limited to people you add, your organization, or your enterprise. The post says billing is based on how long the machine is awake and does not publish a dollar price.$xw$
  ELSE description || $xw$ Note (2026-11-16): Devin Apps, announced 2026-11-13, are private web apps hosted on Devin's cloud computer. Everyone who opens one signs in to Devin, and the apps are never public. Sharing can be limited to people you add, your organization, or your enterprise. The post says billing is based on how long the machine is awake and does not publish a dollar price.$xw$
END, "updatedAt" = now() WHERE slug = $xw$windsurf$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Devin Apps, announced 2026-11-13%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): Suno Bridge (beta), announced 2026-11-13, is a standalone Mac app for Ableton Live 12, included with Premier subscriptions. Both apps have to be open. The post says Bridge uploads the Ableton session to Suno so it can match tempo, key, and groove. The post does not say that Bridge spends credits.$xw$
  ELSE description || $xw$ Note (2026-11-16): Suno Bridge (beta), announced 2026-11-13, is a standalone Mac app for Ableton Live 12, included with Premier subscriptions. Both apps have to be open. The post says Bridge uploads the Ableton session to Suno so it can match tempo, key, and groove. The post does not say that Bridge spends credits.$xw$
END, "updatedAt" = now() WHERE slug = $xw$suno$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Suno Bridge (beta), announced 2026-11-13%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-16): GitHub's supported AI models page lists Gemini 4 Hydrogen (Google) with release status GA, and marks it Included on Copilot Pro, Pro+, Max, Business, and Enterprise. The same page says Copilot Free and Copilot Student reach models through auto model selection only, and Hydrogen is not in that auto-selection table.$xw$
  ELSE description || $xw$ Note (2026-11-16): GitHub's supported AI models page lists Gemini 4 Hydrogen (Google) with release status GA, and marks it Included on Copilot Pro, Pro+, Max, Business, and Enterprise. The same page says Copilot Free and Copilot Student reach models through auto model selection only, and Hydrogen is not in that auto-selection table.$xw$
END, "updatedAt" = now() WHERE slug = $xw$github-copilot$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Gemini 4 Hydrogen (Google) with release status GA%$xw$;
