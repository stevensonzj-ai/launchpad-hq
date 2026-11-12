import { ResultsClient } from "./results-client";

import { privatePageMetadata } from "@/lib/seo-metadata";

export const metadata = privatePageMetadata({
  title: "Your matches | Launchpad HQ",
  description: "Personalized AI platform recommendations based on your quiz.",
  path: "/quiz/results",
});

export default function QuizResultsPage() {
  return <ResultsClient />;
}
