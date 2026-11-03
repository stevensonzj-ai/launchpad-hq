-- Obviously fake rows for the structure-only user tables in the launchpad-test project.
-- Never real people: example.com emails, "Fake" names, test_ IDs. References the first copied platform/tutorial.
INSERT INTO users (id, "clerkId", email, name, plan, "onboardingComplete", "updatedAt") VALUES
  ('test_user_1', 'user_fake_clerk_1', 'fake.user1@example.com', 'Fake User One', 'FREE', true, now()),
  ('test_user_2', 'user_fake_clerk_2', 'fake.user2@example.com', 'Fake User Two', 'PRO', false, now());
INSERT INTO user_preferences (id, "userId", goals, budget, "experienceLevel", "updatedAt") VALUES
  ('test_pref_1', 'test_user_1', ARRAY['writing'], 'free', 'beginner', now());
INSERT INTO user_favorites (id, "userId", "platformId") SELECT 'test_fav_1', 'test_user_1', id FROM platforms ORDER BY slug LIMIT 1;
INSERT INTO user_progress (id, "userId", "platformId", "tutorialId", status, "stepsCompleted", "totalSteps", "updatedAt")
  SELECT 'test_prog_1', 'test_user_1', t."platformId", t.id, 'IN_PROGRESS', 1, 3, now() FROM tutorials t ORDER BY t.slug LIMIT 1;
INSERT INTO reviews (id, "userId", "platformId", rating, title, body, "updatedAt")
  SELECT 'test_review_1', 'test_user_1', id, 4, 'Fake review', 'Test data only.', now() FROM platforms ORDER BY slug LIMIT 1;
INSERT INTO prompts (id, "platformId", "userId", title, prompt, author, status, "updatedAt")
  SELECT 'test_prompt_1', id, 'test_user_1', 'Fake prompt', 'Write a haiku about test data.', 'Fake User One', 'APPROVED', now() FROM platforms ORDER BY slug LIMIT 1;
INSERT INTO prompt_ratings (id, "promptId", "userId", stars) VALUES ('test_rating_1', 'test_prompt_1', 'test_user_2', 5);
INSERT INTO prompt_reports (id, "promptId", "userId", reason) VALUES ('test_report_1', 'test_prompt_1', 'test_user_2', 'fake report');
INSERT INTO discussions (id, "platformId", "userId", title, body, status, "updatedAt")
  SELECT 'test_disc_1', id, 'test_user_1', 'Fake discussion', 'Test data only.', 'APPROVED', now() FROM platforms ORDER BY slug LIMIT 1;
INSERT INTO discussion_replies (id, "discussionId", "userId", body, status, "updatedAt") VALUES
  ('test_reply_1', 'test_disc_1', 'test_user_2', 'Fake reply.', 'APPROVED', now());
INSERT INTO discussion_votes (id, "discussionId", "userId") VALUES ('test_dvote_1', 'test_disc_1', 'test_user_2');
INSERT INTO discussion_reply_votes (id, "replyId", "userId") VALUES ('test_rvote_1', 'test_reply_1', 'test_user_1');
INSERT INTO discussion_reports (id, "discussionId", "userId", reason) VALUES ('test_dreport_1', 'test_disc_1', 'test_user_2', 'fake report');
-- Optional tables (preview may be behind prod): insert only if the table exists.
DO $fake$ BEGIN
  IF to_regclass('public.first_touch_attributions') IS NOT NULL THEN
    INSERT INTO first_touch_attributions (id, "utmSource", "utmMedium", "utmCampaign", "landingPath", "signupSource")
    VALUES ('test_ft_1', 'fake-source', 'fake-medium', 'fake-campaign', '/test', 'fake');
  END IF;
  IF to_regclass('public.unmet_searches') IS NOT NULL THEN
    INSERT INTO unmet_searches ("normalizedQuery", "searchCount", "noClickCount", "lastResultCount", "minResultCount", "firstSeen", "lastSeen")
    VALUES ('fake test query', 2, 1, 0, 0, current_date, current_date);
  END IF;
END $fake$;
