-- CreateEnum
CREATE TYPE "CostTier" AS ENUM ('FREE', 'FREEMIUM', 'PAID', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "PrivacyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'MAXIMUM');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'TEAM');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "primaryUse" TEXT,
    "costTier" "CostTier" NOT NULL DEFAULT 'FREEMIUM',
    "difficultyLevel" "Difficulty" NOT NULL DEFAULT 'BEGINNER',
    "platformType" TEXT[],
    "currentPricing" TEXT,
    "freeTierFeatures" TEXT,
    "usageLimits" TEXT,
    "qualityRestrictions" TEXT,
    "upgradeTriggers" TEXT,
    "installationType" TEXT,
    "offlineCapable" BOOLEAN NOT NULL DEFAULT false,
    "apiAvailable" BOOLEAN NOT NULL DEFAULT false,
    "keyIntegrations" TEXT,
    "privacyLevel" "PrivacyLevel" NOT NULL DEFAULT 'MEDIUM',
    "idealUserTypes" TEXT[],
    "primaryUseCases" TEXT,
    "timeToProductivity" TEXT,
    "learningCurve" TEXT,
    "directAlternatives" TEXT[],
    "complementaryTools" TEXT[],
    "budgetAlternativeTo" TEXT[],
    "privacyAlternativeTo" TEXT[],
    "contentTypes" TEXT[],
    "outputFormats" TEXT[],
    "languageSupport" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasMobileApp" BOOLEAN NOT NULL DEFAULT false,
    "iosAppUrl" TEXT,
    "androidAppUrl" TEXT,
    "mobileWebFriendly" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "planExpiresAt" TIMESTAMP(3),
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goals" TEXT[],
    "budget" TEXT,
    "experienceLevel" TEXT,
    "industries" TEXT[],
    "teamSize" TEXT,
    "priorities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "tutorialId" TEXT,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "stepsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorials" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "platformId" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'BEGINNER',
    "durationMin" INTEGER NOT NULL DEFAULT 15,
    "steps" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "disclaimer" TEXT,
    "usageLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "solution" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "output" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_slug_key" ON "platforms"("slug");

-- CreateIndex
CREATE INDEX "platforms_categoryId_idx" ON "platforms"("categoryId");

-- CreateIndex
CREATE INDEX "platforms_costTier_idx" ON "platforms"("costTier");

-- CreateIndex
CREATE INDEX "platforms_difficultyLevel_idx" ON "platforms"("difficultyLevel");

-- CreateIndex
CREATE INDEX "platforms_featured_idx" ON "platforms"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeSubscriptionId_key" ON "users"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_userId_platformId_key" ON "user_favorites"("userId", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_userId_platformId_tutorialId_key" ON "user_progress"("userId", "platformId", "tutorialId");

-- CreateIndex
CREATE UNIQUE INDEX "tutorials_slug_key" ON "tutorials"("slug");

-- CreateIndex
CREATE INDEX "tutorials_platformId_idx" ON "tutorials"("platformId");

-- CreateIndex
CREATE INDEX "reviews_platformId_idx" ON "reviews"("platformId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_platformId_key" ON "reviews"("userId", "platformId");

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "tutorials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
