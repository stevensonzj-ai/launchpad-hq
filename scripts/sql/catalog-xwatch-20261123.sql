-- Catalog X-watch batch 2026-11-23 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No new slugs.
-- UPDATE: openai-api, gemini, kling-ai, replit-agent, qwen,
--          claude (upgradeTriggers, same model-free wording as 2026-11-16)
-- Production claude.upgradeTriggers was already the model-free sentence on
-- 2026-11-23 (read-only check). This statement still matches the old Opus
-- wording, or any upgradeTriggers value that still contains "opus", so a
-- branch that was not updated is rewritten and a second run matches nothing.
-- SKIP as rows: GLM-5.4 (no Z.ai / GLM row; API not priced), Inkling 2 Mini
--               (no Thinking Machines row), MAI Image 2.7 / Realtime 1
--               (no Foundry row; not placed on Copilot), MAI Cyber 2 Flash
--               (not listed as available). X-only claims that were not on the
--               named vendor page are not written: Wan 3.0 in ComfyUI,
--               Hy4 on Ollama Cloud and Together, Seedance 2.5 Flash on Pika,
--               Runway Agent, Perplexity Computer.
-- Sources checked 2026-11-23 on vendor pages (see PR body). Not run from here.

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-23): The OpenAI API changelog for 2026-11-19 says GPT-Live-1.1 improves pronunciation, accent consistency, and transcription in multilingual voice conversations, and that standby can be configured for GPT-Live-1 and GPT-Live-1.1 WebRTC sessions so inference pauses during inactivity and resumes when someone speaks. The model page lists model id gpt-live-1.1 on the Live API at v1/live/sessions. It accepts audio and text and returns audio and text. Voice sessions are billed by duration at $0.05 per active minute and $0.02 per standby minute. The page says the standby rate applies to WebRTC sessions while inference is paused, and that backend model and tool usage is billed separately. The page does not list a per-token price.$xw$
  ELSE description || $xw$ Note (2026-11-23): The OpenAI API changelog for 2026-11-19 says GPT-Live-1.1 improves pronunciation, accent consistency, and transcription in multilingual voice conversations, and that standby can be configured for GPT-Live-1 and GPT-Live-1.1 WebRTC sessions so inference pauses during inactivity and resumes when someone speaks. The model page lists model id gpt-live-1.1 on the Live API at v1/live/sessions. It accepts audio and text and returns audio and text. Voice sessions are billed by duration at $0.05 per active minute and $0.02 per standby minute. The page says the standby rate applies to WebRTC sessions while inference is paused, and that backend model and tool usage is billed separately. The page does not list a per-token price.$xw$
END, "updatedAt" = now() WHERE slug = $xw$openai-api$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%GPT-Live-1.1 improves pronunciation%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-23): The Gemini API changelog for 2026-11-19 says Genie 4 (genie-4) is generally available on the Interactions API (v1beta). The pricing page says it streams steerable 24 fps 16:9 video with synchronized 48 kHz stereo audio, on the paid tier. Paid rates per 1M tokens are $1.50 input for text or a reference image, $9.00 text output, and $17.50 video output with audio included. The pricing page says that video rate is about $0.10 per second (about $6.05 per minute) at 240 tokens per frame, and that a session keeps billing until complete() is called. The same page says the free tier is not available for Genie 4, and that Batch API, Flex inference, Priority inference, and context caching are not available.$xw$
  ELSE description || $xw$ Note (2026-11-23): The Gemini API changelog for 2026-11-19 says Genie 4 (genie-4) is generally available on the Interactions API (v1beta). The pricing page says it streams steerable 24 fps 16:9 video with synchronized 48 kHz stereo audio, on the paid tier. Paid rates per 1M tokens are $1.50 input for text or a reference image, $9.00 text output, and $17.50 video output with audio included. The pricing page says that video rate is about $0.10 per second (about $6.05 per minute) at 240 tokens per frame, and that a session keeps billing until complete() is called. The same page says the free tier is not available for Genie 4, and that Batch API, Flex inference, Priority inference, and context caching are not available.$xw$
END, "updatedAt" = now() WHERE slug = $xw$gemini$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Genie 4 (genie-4)%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-23): Kling's blog post dated 2026-11-18 says Kling Image 4.0 is live on Kling Creative Studio and available via the API. The API updates page dates that API to 2026-11-17. The image pricing page lists single-image and image-series output at $0.063 per image at 2K, $0.094 at 4K, and $0.157 at 8K. Reference images and reference elements are $0.003 each, and one reference element counts as one reference image. The page says earlier models do not charge for those inputs. Long-image webpage and e-commerce rates are listed separately on that page. The page does not state an end date for these rates.$xw$
  ELSE description || $xw$ Note (2026-11-23): Kling's blog post dated 2026-11-18 says Kling Image 4.0 is live on Kling Creative Studio and available via the API. The API updates page dates that API to 2026-11-17. The image pricing page lists single-image and image-series output at $0.063 per image at 2K, $0.094 at 4K, and $0.157 at 8K. Reference images and reference elements are $0.003 each, and one reference element counts as one reference image. The page says earlier models do not charge for those inputs. Long-image webpage and e-commerce rates are listed separately on that page. The page does not state an end date for these rates.$xw$
END, "updatedAt" = now() WHERE slug = $xw$kling-ai$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Kling Image 4.0 is live on Kling Creative Studio%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-23): Replit's Missions post, published 2026-11-17 and updated 2026-11-19, says a team sets a goal and Replit coordinates a swarm of agents that plan, build, test, and iterate toward it. The Missions agreement sets the spending limit and which actions require approval. The post does not publish a Missions plan price. Spending caps in the post, including $1,000 and $3,000, are examples rather than a list price.$xw$
  ELSE description || $xw$ Note (2026-11-23): Replit's Missions post, published 2026-11-17 and updated 2026-11-19, says a team sets a goal and Replit coordinates a swarm of agents that plan, build, test, and iterate toward it. The Missions agreement sets the spending limit and which actions require approval. The post does not publish a Missions plan price. Spending caps in the post, including $1,000 and $3,000, are examples rather than a list price.$xw$
END, "updatedAt" = now() WHERE slug = $xw$replit-agent$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Replit coordinates a swarm of agents%$xw$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $xw$$xw$) = $xw$$xw$ THEN $xw$Note (2026-11-23): The Qwen-Image-2.1 repository says the weights were released on 2026-09-20, on Hugging Face and ModelScope. The Qwen Research License Agreement, release date 2026-09-20, says non-commercial means research or evaluation, grants those rights for non-commercial purposes, and says commercial use needs a separate license. This is not a 2026-11-23 release. Recorded on this row, not as a new row.$xw$
  ELSE description || $xw$ Note (2026-11-23): The Qwen-Image-2.1 repository says the weights were released on 2026-09-20, on Hugging Face and ModelScope. The Qwen Research License Agreement, release date 2026-09-20, says non-commercial means research or evaluation, grants those rights for non-commercial purposes, and says commercial use needs a separate license. This is not a 2026-11-23 release. Recorded on this row, not as a new row.$xw$
END, "updatedAt" = now() WHERE slug = $xw$qwen$xw$ AND COALESCE(description, $xw$$xw$) NOT LIKE $xw$%Qwen-Image-2.1 repository says the weights were released on 2026-09-20%$xw$;

UPDATE platforms SET
  "upgradeTriggers" = $xw$Daily message limits; needing a more capable model for complex tasks; Claude Code; 1M context; MCP integrations$xw$,
  "updatedAt" = now()
WHERE slug = $xw$claude$xw$
  AND (
    "upgradeTriggers" = $xw$Daily message limits; needing Opus 4.6 for complex tasks; Claude Code; 1M context; MCP integrations$xw$
    OR "upgradeTriggers" ILIKE $xw$%opus%$xw$
  );
