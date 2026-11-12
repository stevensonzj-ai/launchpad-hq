/**
 * Row shape shared by the content-tracker database read and `--db-json`.
 *
 * `scripts/export-content-tracker.ts` copies the three SELECTs in
 * `scripts/sql/readonly/content-tracker-queries.sql` when it opens the
 * database. That file is documentation for the read-only Neon connector.
 * It is not a Guarded SQL input. `--db-json` reads the same rows from a
 * JSON file and does not connect to a database.
 *
 * `mapContentTrackerRows` is the only place that turns those rows into
 * `PlatformRecord[]`, so both paths use the same counts. JSON tools
 * sometimes stringify counts, booleans and timestamps;
 * `parseContentTrackerDbJson` coerces those, then calls that mapper.
 */
import type { PlatformRecord } from "./content-tracker";
import { splitSql } from "./guarded-sql/split";

/** Repo-relative path. Outside `scripts/sql/<name>.sql`, which is all the Guarded SQL workflow accepts. */
export const CONTENT_TRACKER_QUERIES_PATH = "scripts/sql/readonly/content-tracker-queries.sql";

export type ContentTrackerQueryName = "platforms" | "prompts" | "discussions";

export type ContentTrackerQueries = Record<ContentTrackerQueryName, string>;

/**
 * One platforms SELECT row: the column aliases in content-tracker-queries.sql.
 * `updatedAt` is a Date, as node-pg returns for timestamptz.
 */
export type ContentTrackerPlatformRow = {
  id: string;
  slug: string;
  name: string;
  website: string | null;
  description: string | null;
  categoryName: string;
  categorySlug: string;
  costTier: string;
  currentPricing: string | null;
  apiAvailable: boolean;
  verified: boolean;
  updatedAt: Date;
};

/** One prompts or discussions aggregate row: platformId, status, n. */
export type ContentTrackerCountRow = {
  platformId: string;
  status: string;
  n: number;
};

const QUERY_NAMES = ["platforms", "prompts", "discussions"] as const satisfies readonly ContentTrackerQueryName[];

const QUERY_FROM: Record<ContentTrackerQueryName, RegExp> = {
  platforms: /\bfrom\s+platforms\b/i,
  prompts: /\bfrom\s+prompts\b/i,
  discussions: /\bfrom\s+discussions\b/i,
};

/** Reject anything that is not a single read. `\bupdate\b` does not match the identifier updatedAt. */
const WRITE_SQL = /\b(insert|update|delete|drop|alter|truncate|grant|revoke|copy)\b/i;

export class ContentTrackerDbJsonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentTrackerDbJsonError";
  }
}

/**
 * Split the canonical SQL file into the three SELECTs the export runs.
 * Comments are ignored. The file must be exactly those three statements.
 */
export function contentTrackerQueriesFromSql(sql: string): ContentTrackerQueries {
  let statements: string[];
  try {
    statements = splitSql(sql);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`Could not parse content tracker SQL: ${detail}`);
  }
  if (statements.length !== 3) {
    throw new Error(
      `Content tracker SQL must contain exactly 3 statements (platforms, prompts, discussions); found ${statements.length}.`,
    );
  }

  const out = {} as ContentTrackerQueries;
  const seen = new Set<string>();
  for (const name of QUERY_NAMES) {
    const hits = statements.filter((statement) => QUERY_FROM[name].test(statement));
    if (hits.length !== 1) {
      throw new Error(`Content tracker SQL must contain exactly one ${name} SELECT; found ${hits.length}.`);
    }
    const statement = hits[0]!;
    if (!/^select\b/i.test(statement)) {
      throw new Error(`Content tracker ${name} query must be a SELECT.`);
    }
    if (WRITE_SQL.test(statement)) {
      throw new Error(`Content tracker ${name} query must be read-only.`);
    }
    seen.add(statement);
    out[name] = statement;
  }
  if (seen.size !== 3) {
    throw new Error("Content tracker SQL statements must be three different queries.");
  }
  return out;
}

/**
 * Build platform records from the three result sets.
 * The first count row for a platform and status wins. Statuses other than
 * APPROVED and PENDING are ignored, same as the original inline mapping.
 */
export function mapContentTrackerRows(
  platforms: readonly ContentTrackerPlatformRow[],
  prompts: readonly ContentTrackerCountRow[],
  discussions: readonly ContentTrackerCountRow[],
): PlatformRecord[] {
  const count = (rows: readonly ContentTrackerCountRow[], id: string, status: string) =>
    rows.find((row) => row.platformId === id && row.status === status)?.n ?? 0;

  return platforms.map((platform) => ({
    slug: platform.slug,
    name: platform.name,
    website: platform.website,
    description: platform.description,
    categoryName: platform.categoryName,
    categorySlug: platform.categorySlug,
    costTier: platform.costTier,
    currentPricing: platform.currentPricing,
    apiAvailable: platform.apiAvailable,
    verified: platform.verified,
    updatedAt: platform.updatedAt,
    approvedPrompts: count(prompts, platform.id, "APPROVED"),
    pendingPrompts: count(prompts, platform.id, "PENDING"),
    approvedDiscussions: count(discussions, platform.id, "APPROVED"),
    pendingDiscussions: count(discussions, platform.id, "PENDING"),
  }));
}

/** Parse a `--db-json` file (UTF-8 text, optional BOM) into platform records. */
export function platformRecordsFromDbJson(text: string): PlatformRecord[] {
  const src = text.replace(/^\uFEFF/, "").trim();
  if (!src) throw new ContentTrackerDbJsonError("DB JSON is empty.");
  let data: unknown;
  try {
    data = JSON.parse(src);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new ContentTrackerDbJsonError(`DB JSON is not valid JSON: ${detail}`);
  }
  return parseContentTrackerDbJson(data);
}

/**
 * Validate `{ platforms, prompts, discussions }` and map it.
 * Counts accept a number or a digit string (`"3"`). Booleans accept
 * `true`/`false` or `"true"`/`"false"`. `updatedAt` accepts an ISO date string.
 */
export function parseContentTrackerDbJson(value: unknown): PlatformRecord[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new ContentTrackerDbJsonError(
      'DB JSON must be an object with "platforms", "prompts", and "discussions" arrays.',
    );
  }
  const root = value as Record<string, unknown>;
  const platforms = requireArray(root, "platforms").map((row, index) => normalizePlatform(row, index));
  const prompts = requireArray(root, "prompts").map((row, index) => normalizeCount(row, index, "prompts"));
  const discussions = requireArray(root, "discussions").map((row, index) => normalizeCount(row, index, "discussions"));
  return mapContentTrackerRows(platforms, prompts, discussions);
}

function requireArray(root: Record<string, unknown>, key: ContentTrackerQueryName): unknown[] {
  if (!Object.prototype.hasOwnProperty.call(root, key)) {
    throw new ContentTrackerDbJsonError(`DB JSON is missing "${key}".`);
  }
  const value = root[key];
  if (!Array.isArray(value)) {
    throw new ContentTrackerDbJsonError(`DB JSON "${key}" must be an array.`);
  }
  return value;
}

function requireRow(value: unknown, path: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new ContentTrackerDbJsonError(`${path} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function requirePresent(row: Record<string, unknown>, path: string, key: string): unknown {
  if (!Object.prototype.hasOwnProperty.call(row, key)) {
    throw new ContentTrackerDbJsonError(`${path} is missing "${key}".`);
  }
  return row[key];
}

function requiredString(row: Record<string, unknown>, path: string, key: string): string {
  const value = requirePresent(row, path, key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new ContentTrackerDbJsonError(`${path}.${key} must be a non-empty string.`);
  }
  return value;
}

function nullableString(row: Record<string, unknown>, path: string, key: string): string | null {
  const value = requirePresent(row, path, key);
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new ContentTrackerDbJsonError(`${path}.${key} must be a string or null.`);
  }
  return value;
}

function requiredBoolean(row: Record<string, unknown>, path: string, key: string): boolean {
  const value = requirePresent(row, path, key);
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  throw new ContentTrackerDbJsonError(`${path}.${key} must be a boolean or the string "true" or "false".`);
}

/** Date-only, or a date plus time, with an optional Z or numeric offset. */
const ISO_DATE =
  /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

function requiredDate(row: Record<string, unknown>, path: string, key: string): Date {
  const value = requirePresent(row, path, key);
  if (typeof value === "string") {
    const text = value.trim();
    if (ISO_DATE.test(text)) {
      const date = new Date(text);
      if (!Number.isNaN(date.getTime())) return date;
    }
  }
  throw new ContentTrackerDbJsonError(`${path}.${key} must be an ISO date string.`);
}

function requiredCount(row: Record<string, unknown>, path: string, key: string): number {
  const value = requirePresent(row, path, key);
  if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) return value;
  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    const parsed = Number(value.trim());
    if (Number.isSafeInteger(parsed)) return parsed;
  }
  throw new ContentTrackerDbJsonError(`${path}.${key} must be a non-negative integer, or a string of digits.`);
}

function normalizePlatform(value: unknown, index: number): ContentTrackerPlatformRow {
  const path = `platforms[${index}]`;
  const row = requireRow(value, path);
  return {
    id: requiredString(row, path, "id"),
    slug: requiredString(row, path, "slug"),
    name: requiredString(row, path, "name"),
    website: nullableString(row, path, "website"),
    description: nullableString(row, path, "description"),
    categoryName: requiredString(row, path, "categoryName"),
    categorySlug: requiredString(row, path, "categorySlug"),
    costTier: requiredString(row, path, "costTier"),
    currentPricing: nullableString(row, path, "currentPricing"),
    apiAvailable: requiredBoolean(row, path, "apiAvailable"),
    verified: requiredBoolean(row, path, "verified"),
    updatedAt: requiredDate(row, path, "updatedAt"),
  };
}

function normalizeCount(value: unknown, index: number, key: "prompts" | "discussions"): ContentTrackerCountRow {
  const path = `${key}[${index}]`;
  const row = requireRow(value, path);
  return {
    platformId: requiredString(row, path, "platformId"),
    status: requiredString(row, path, "status"),
    n: requiredCount(row, path, "n"),
  };
}
