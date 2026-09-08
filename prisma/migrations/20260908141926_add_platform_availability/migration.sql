-- Add a beginner-availability field to Platform.
--
-- The catalog records platforms a beginner may want, but nothing in the schema
-- could express that a row is unobtainable (sales-led, enterprise-only, closed
-- to new signups) or gone (discontinued, superseded). Editorial doctrine is to
-- include known platforms with honest disclosure rather than delete them, so
-- the answer is a field rather than a DELETE.
--
-- Precedence: lifecycle beats obtainability. A discontinued row that was also
-- enterprise-only is DISCONTINUED.
--
-- SUPERSEDED means a different product replaces this one. It is NOT a rename:
-- a rename keeps the slug, changes the display name, and stays SELF_SERVE.
--
-- successorSlug may accompany any non-SELF_SERVE value and is deliberately not
-- FK-constrained, because a successor may not itself be catalogued. Validate it
-- during the backfill pass.
--
-- This migration is additive and carries NO data backfill. Every existing row
-- takes the SELF_SERVE default, including rows already known to be wrong;
-- populating them is a separate reviewed pass driven by docs/handoffs/.
--
-- ADD COLUMN with a non-volatile DEFAULT is metadata-only on PostgreSQL 11+,
-- so this does not rewrite the table.
--
-- Reversal: DROP the three columns and the index, then DROP TYPE "Availability".

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('SELF_SERVE', 'SALES_LED', 'ENTERPRISE_ONLY', 'CLOSED_TO_NEW', 'DISCONTINUED', 'SUPERSEDED');

-- AlterTable
ALTER TABLE "platforms" ADD COLUMN     "availability" "Availability" NOT NULL DEFAULT 'SELF_SERVE',
ADD COLUMN     "successorSlug" TEXT,
ADD COLUMN     "availabilityNote" TEXT;

-- CreateIndex
CREATE INDEX "platforms_availability_idx" ON "platforms"("availability");
