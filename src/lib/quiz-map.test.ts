import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { quizToRecommendationInput, type QuizAnswers } from "./quiz-map";

describe("quizToRecommendationInput", () => {
  it("keeps a legacy single goal string working", () => {
    const answers: QuizAnswers = {
      goal: "video",
      experience: "beginner",
      budget: "free",
      runtime: "mobile",
    };
    const input = quizToRecommendationInput(answers);
    assert.deepEqual(input.goals, ["video"]);
    assert.equal(input.budget, "free");
    assert.equal(input.experienceLevel, "beginner");
    assert.ok(input.priorities?.includes("ease_of_use"));
    assert.ok(input.priorities?.includes("mobile"));
    assert.ok(input.priorities?.includes("free"));
    assert.ok(!input.priorities?.includes("offline"));
    assert.ok(!input.priorities?.includes("browser"));
  });

  it("accepts up to two goals from the goals array", () => {
    const answers: QuizAnswers = {
      goal: "coding",
      goals: ["coding", "automation"],
      experience: "advanced",
      budget: "under_50",
      runtime: "cloud",
    };
    const input = quizToRecommendationInput(answers);
    assert.deepEqual(input.goals, ["coding", "automation"]);
    assert.ok(!input.priorities?.includes("ease_of_use"));
    assert.ok(!input.priorities?.includes("mobile"));
    assert.ok(!input.priorities?.includes("offline"));
    assert.ok(!input.priorities?.includes("browser"));
  });

  it("maps runtime local to offline, browser to browser, cloud to none", () => {
    const base: Omit<QuizAnswers, "runtime"> = {
      goal: "coding",
      experience: "intermediate",
      budget: "under_20",
    };
    assert.ok(
      quizToRecommendationInput({ ...base, runtime: "local" }).priorities?.includes(
        "offline",
      ),
    );
    assert.ok(
      quizToRecommendationInput({ ...base, runtime: "browser" }).priorities?.includes(
        "browser",
      ),
    );
    const cloud = quizToRecommendationInput({ ...base, runtime: "cloud" });
    assert.ok(!cloud.priorities?.includes("offline"));
    assert.ok(!cloud.priorities?.includes("mobile"));
    assert.ok(!cloud.priorities?.includes("browser"));
  });

  it("does not add ease_of_use for non-beginners", () => {
    const intermediate = quizToRecommendationInput({
      goal: "research",
      experience: "intermediate",
      budget: "free",
      runtime: "cloud",
    });
    assert.ok(!intermediate.priorities?.includes("ease_of_use"));
  });
});
