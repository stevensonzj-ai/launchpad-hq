import { existsSync } from "node:fs";
import path from "node:path";
import { PLACEMENTS } from "./placements";
import {
  SPONSOR_COPY_LIMITS,
  SPONSOR_SLOTS,
  type SponsorPlacement,
  type SponsorSlot,
} from "./types";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type PlacementIssue = {
  id: string;
  message: string;
};

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isRealYmd(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isLocalSponsorAsset(value: string): boolean {
  return value.startsWith("/sponsors/") && !value.includes("..");
}

function assetExists(publicDir: string, assetUrl: string): boolean {
  const relative = assetUrl.replace(/^\/sponsors\//, "");
  return existsSync(path.join(publicDir, relative));
}

function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}

export function validatePlacements(
  placements: readonly SponsorPlacement[] = PLACEMENTS,
  publicDir = path.join(process.cwd(), "public", "sponsors"),
): PlacementIssue[] {
  const issues: PlacementIssue[] = [];

  for (const placement of placements) {
    const id = placement.id || "(missing id)";

    if (!placement.id.trim()) {
      issues.push({ id, message: "id is required" });
    }
    if (!(SPONSOR_SLOTS as readonly string[]).includes(placement.slot)) {
      issues.push({ id, message: `slot must be one of ${SPONSOR_SLOTS.join(", ")}` });
    }
    if (!isRealYmd(placement.startDate) || !isRealYmd(placement.endDate)) {
      issues.push({ id, message: "startDate and endDate must be real YYYY-MM-DD dates" });
    } else if (placement.startDate > placement.endDate) {
      issues.push({ id, message: "startDate must be on or before endDate" });
    }

    if (placement.headline.length > SPONSOR_COPY_LIMITS.headlineMax) {
      issues.push({
        id,
        message: `headline must be ≤${SPONSOR_COPY_LIMITS.headlineMax} chars`,
      });
    }
    if (placement.blurb.length > SPONSOR_COPY_LIMITS.blurbMax) {
      issues.push({
        id,
        message: `blurb must be ≤${SPONSOR_COPY_LIMITS.blurbMax} chars`,
      });
    }

    if (placement.bullets) {
      if (placement.bullets.length > SPONSOR_COPY_LIMITS.maxBullets) {
        issues.push({
          id,
          message: `at most ${SPONSOR_COPY_LIMITS.maxBullets} bullets`,
        });
      }
      for (const bullet of placement.bullets) {
        if (bullet.length > SPONSOR_COPY_LIMITS.bulletMax) {
          issues.push({
            id,
            message: `each bullet must be ≤${SPONSOR_COPY_LIMITS.bulletMax} chars`,
          });
          break;
        }
      }
    }

    if (placement.slot === "ai-of-the-week") {
      const words = wordCount(placement.featureBody ?? "");
      if (
        words < SPONSOR_COPY_LIMITS.featureBodyMinWords ||
        words > SPONSOR_COPY_LIMITS.featureBodyMaxWords
      ) {
        issues.push({
          id,
          message: `featureBody must be ${SPONSOR_COPY_LIMITS.featureBodyMinWords}–${SPONSOR_COPY_LIMITS.featureBodyMaxWords} words`,
        });
      }
    }

    if (!isHttpsUrl(placement.ctaUrl)) {
      issues.push({ id, message: "ctaUrl must be an https URL" });
    }

    const assets = [
      placement.logoUrl,
      placement.spotlightImageUrl,
      placement.heroImageUrl,
    ].filter((value): value is string => Boolean(value));

    for (const asset of assets) {
      if (isHttpsUrl(asset)) continue;
      if (!isLocalSponsorAsset(asset)) {
        issues.push({
          id,
          message: `asset ${asset} must be https or a /sponsors/ path`,
        });
        continue;
      }
      if (!assetExists(publicDir, asset)) {
        issues.push({
          id,
          message: `asset ${asset} is missing under public/sponsors/`,
        });
      }
    }
  }

  const bySlot = new Map<SponsorSlot, SponsorPlacement[]>();
  for (const placement of placements) {
    const list = bySlot.get(placement.slot) ?? [];
    list.push(placement);
    bySlot.set(placement.slot, list);
  }
  for (const [slot, list] of bySlot) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (
          isRealYmd(a.startDate) &&
          isRealYmd(a.endDate) &&
          isRealYmd(b.startDate) &&
          isRealYmd(b.endDate) &&
          rangesOverlap(a.startDate, a.endDate, b.startDate, b.endDate)
        ) {
          issues.push({
            id: a.id,
            message: `overlaps ${b.id} on slot ${slot}`,
          });
        }
      }
    }
  }

  return issues;
}
