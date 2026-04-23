/*
  Warnings:

  - You are about to drop the `Discussion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "user_preferences" ADD COLUMN     "quizAnswers" JSONB,
ADD COLUMN     "quizCompletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripeSubscriptionStatus" TEXT,
ADD COLUMN     "trialEndsAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Discussion";

-- DropTable
DROP TABLE "Prompt";

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "outputUrl" TEXT,
    "author" TEXT,
    "ratingSum" INTEGER NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_ratings" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_reports" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussions" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "solution" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discussions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_replies" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT,
    "body" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discussion_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_votes" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "discussion_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_reply_votes" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "discussion_reply_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_reports" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discussion_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prompts_platformId_idx" ON "prompts"("platformId");

-- CreateIndex
CREATE INDEX "prompts_createdAt_idx" ON "prompts"("createdAt");

-- CreateIndex
CREATE INDEX "prompt_ratings_promptId_idx" ON "prompt_ratings"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_ratings_userId_promptId_key" ON "prompt_ratings"("userId", "promptId");

-- CreateIndex
CREATE INDEX "prompt_reports_promptId_idx" ON "prompt_reports"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_reports_userId_promptId_key" ON "prompt_reports"("userId", "promptId");

-- CreateIndex
CREATE INDEX "discussions_platformId_idx" ON "discussions"("platformId");

-- CreateIndex
CREATE INDEX "discussions_createdAt_idx" ON "discussions"("createdAt");

-- CreateIndex
CREATE INDEX "discussion_replies_discussionId_idx" ON "discussion_replies"("discussionId");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_votes_userId_discussionId_key" ON "discussion_votes"("userId", "discussionId");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_reply_votes_userId_replyId_key" ON "discussion_reply_votes"("userId", "replyId");

-- CreateIndex
CREATE INDEX "discussion_reports_discussionId_idx" ON "discussion_reports"("discussionId");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_reports_userId_discussionId_key" ON "discussion_reports"("userId", "discussionId");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_ratings" ADD CONSTRAINT "prompt_ratings_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_ratings" ADD CONSTRAINT "prompt_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_reports" ADD CONSTRAINT "prompt_reports_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_reports" ADD CONSTRAINT "prompt_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_votes" ADD CONSTRAINT "discussion_votes_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_votes" ADD CONSTRAINT "discussion_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_reply_votes" ADD CONSTRAINT "discussion_reply_votes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "discussion_replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_reply_votes" ADD CONSTRAINT "discussion_reply_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_reports" ADD CONSTRAINT "discussion_reports_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_reports" ADD CONSTRAINT "discussion_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
