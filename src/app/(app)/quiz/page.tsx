import { publicPageMetadata } from "@/lib/seo-metadata";
import { QuizClient } from "./quiz-client";

export const metadata = publicPageMetadata({
  title: "Get matched with AI tools | Launchpad HQ",
  description:
    "Answer four questions about your goals, budget, and skill level to get personalized AI platform picks from the Launchpad HQ catalog.",
  path: "/quiz",
});

export default function QuizPage() {
  return <QuizClient />;
}
