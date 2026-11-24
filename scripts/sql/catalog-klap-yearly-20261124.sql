-- Klap yearly prices 2026-11-24 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No new rows. No new slugs. No snapshot or branch statements.
-- Do not run this from an agent against production.
--
-- Source: https://klap.app/pricing (the page says prices were last updated
-- Nov 4, 2026). Yearly billing is $14.50 / $39.50 / $94.50 a month, which is
-- $174 / $474 / $1,134 a year. Month-to-month stays $29 / $79 / $189.
--
-- Read-only check on 2026-11-24: platforms.currentPricing for slug klap was
-- the 2026-10-29 audit-13 sentence in statement 1's WHERE. Git has that same
-- sentence in src/data/catalog-audits/audit-13.ts. The platform page and the
-- Klap comparison page render src/data/facts/klap.ts, which overlays this
-- column. These statements keep the stored catalog sentence aligned with
-- that fact file.
--
-- Fields changed: "currentPricing" and "updatedAt" only.
-- Not changed: usageLimits, freeTierFeatures, description (no yearly dollar
-- amounts). No other slug is named.
--
-- Run the file in order. On the sentence read on 2026-11-24, statement 1
-- updates 1 row and statement 2 updates 0. A second run updates 0 rows.
-- "$14.50/mo billed yearly" does not contain the needle "$14/mo billed yearly".

-- Statement 1. Exact stored sentence from the 2026-11-24 read, which is also
-- the git audit-13 create text. Expected rows: 1. Expected rows: 0 if the
-- column already differs, or if this statement has already run.
UPDATE platforms SET
  "currentPricing" = $k$Basic $29/mo or $14.50/mo billed yearly ($174/yr) (100 clips/mo); Pro $79/mo or $39.50/mo billed yearly ($474/yr) (300 clips/mo); Pro+ $189/mo or $94.50/mo billed yearly ($1,134/yr) (1,000 clips/mo) (as of 2026-11-24)$k$,
  "updatedAt" = now()
WHERE slug = $k$klap$k$
  AND "currentPricing" = $k$Basic $29/mo or $14/mo billed yearly (100 clips/mo); Pro $79/mo or $39/mo billed yearly (300 clips/mo); Pro+ $189/mo or $94/mo billed yearly (1,000 clips/mo) (as of 2026-10-29)$k$;

-- Statement 2. Same yearly-price fix when the stored sentence is not the
-- exact audit-13 text but still names an old yearly rate ($14, $39, or $94
-- per month, written "/mo" or "/month"). Replaces those phrases, and the
-- 2026-10-29 check date when that date is present. Other wording, including
-- a different check date, stays. Expected rows: 0 when statement 1 already
-- rewrote the known sentence. Expected rows: 1 when that sentence was absent
-- and an old yearly phrase remains. Expected rows: 0 on a second run.
UPDATE platforms SET
  "currentPricing" = replace(replace(replace(replace(replace(replace(replace(
    "currentPricing",
    $k$$14/mo billed yearly$k$, $k$$14.50/mo billed yearly ($174/yr)$k$),
    $k$$39/mo billed yearly$k$, $k$$39.50/mo billed yearly ($474/yr)$k$),
    $k$$94/mo billed yearly$k$, $k$$94.50/mo billed yearly ($1,134/yr)$k$),
    $k$$14/month billed yearly$k$, $k$$14.50/month billed yearly ($174 a year)$k$),
    $k$$39/month billed yearly$k$, $k$$39.50/month billed yearly ($474 a year)$k$),
    $k$$94/month billed yearly$k$, $k$$94.50/month billed yearly ($1,134 a year)$k$),
    $k$as of 2026-10-29$k$, $k$as of 2026-11-24$k$),
  "updatedAt" = now()
WHERE slug = $k$klap$k$
  AND (
    "currentPricing" LIKE $k$%$14/mo billed yearly%$k$
    OR "currentPricing" LIKE $k$%$39/mo billed yearly%$k$
    OR "currentPricing" LIKE $k$%$94/mo billed yearly%$k$
    OR "currentPricing" LIKE $k$%$14/month billed yearly%$k$
    OR "currentPricing" LIKE $k$%$39/month billed yearly%$k$
    OR "currentPricing" LIKE $k$%$94/month billed yearly%$k$
  );
