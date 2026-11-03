-- CreateTable
CREATE TABLE IF NOT EXISTS "unmet_searches" (
    "normalizedQuery" TEXT NOT NULL,
    "searchCount" INTEGER NOT NULL DEFAULT 0,
    "noClickCount" INTEGER NOT NULL DEFAULT 0,
    "lastResultCount" INTEGER NOT NULL,
    "minResultCount" INTEGER NOT NULL,
    "firstSeen" DATE NOT NULL,
    "lastSeen" DATE NOT NULL,

    CONSTRAINT "unmet_searches_pkey" PRIMARY KEY ("normalizedQuery")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "unmet_searches_lastSeen_idx" ON "unmet_searches"("lastSeen");
