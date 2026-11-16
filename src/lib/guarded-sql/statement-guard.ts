/**
 * Catalog statement guard for automated production Guarded SQL runs.
 *
 * splitSql, then strip comments and string literals. Every statement must
 * start with UPDATE or INSERT INTO. Unquoted forbidden words are refused
 * anywhere outside comments and strings. A call outside the INSERT column
 * list must be on the function allowlist, and a schema-qualified call is
 * refused. Quoted identifiers keep their case, so "PLATFORMS" is not platforms.
 */
import { splitSql } from "./split";

export const CATALOG_SQL_TABLES = ["categories", "platforms"] as const;
const ALLOWED = new Set<string>(CATALOG_SQL_TABLES);

const FORBIDDEN = new Set([
  "alter",
  "authorization",
  "call",
  "copy",
  "create",
  "declare",
  "delete",
  "do",
  "drop",
  "execute",
  "grant",
  "import",
  "listen",
  "load",
  "lock",
  "merge",
  "notify",
  "perform",
  "prepare",
  "refresh",
  "reset",
  "revoke",
  "role",
  "truncate",
  "vacuum",
]);

/** Calls allowed outside an INSERT column list. Compared case-insensitively for unquoted names. */
export const ALLOWED_FUNCTIONS = new Set([
  "array_append",
  "array_cat",
  "array_remove",
  "btrim",
  "coalesce",
  "concat",
  "concat_ws",
  "greatest",
  "jsonb_build_array",
  "jsonb_build_object",
  "jsonb_set",
  "least",
  "length",
  "lower",
  "now",
  "nullif",
  "replace",
  "to_jsonb",
  "trim",
  "upper",
]);

/** Words that may be followed by "(" without being a function call. */
const CALL_KEYWORDS = new Set(["all", "and", "any", "array", "cast", "exists", "in", "not", "or", "values"]);

/** Words that start a clause, so they are not table aliases. */
const CLAUSE = new Set([
  "all", "alter", "and", "any", "as", "asc", "begin", "between", "by", "case", "cast", "check",
  "collate", "commit", "conflict", "constraint", "copy", "create", "cross", "current_date",
  "current_time", "current_timestamp", "current_user", "default", "delete", "desc", "distinct",
  "do", "drop", "else", "end", "except", "exists", "false", "fetch", "for", "foreign", "from",
  "full", "grant", "group", "having", "if", "in", "index", "inner", "insert", "intersect", "into",
  "is", "join", "key", "lateral", "left", "like", "limit", "local", "natural", "not", "null",
  "offset", "on", "only", "or", "order", "outer", "over", "primary", "recursive",
  "references", "replace", "returning", "revoke", "right", "rollback", "select", "session",
  "session_user", "set", "table", "temp", "temporary", "then", "to", "true", "truncate", "union",
  "update", "using", "values", "when", "where", "window", "with",
]);

const INTRODUCERS = new Set(["copy", "from", "into", "join", "table", "update"]);

export type CatalogGuardResult =
  | { ok: true; tables: string[] }
  | { ok: false; reason: string };

class GuardParseError extends Error {}

interface Tok {
  kind: "word" | "quoted" | "sym";
  value: string;
}

/**
 * Left-to-right strip. Comments and value-literals, including every dollar
 * quote, become a space. Double-quoted identifiers are kept. A comment stuck
 * inside a real keyword (DROP, then a block comment, then TABLE) still leaves
 * the keyword in the result.
 */
export function stripCommentsAndStrings(sql: string): string {
  let out = "";
  const n = sql.length;
  let i = 0;
  const emit = (chunk: string) => {
    out += chunk;
  };

  while (i < n) {
    const c = sql[i]!;
    const next = sql[i + 1];

    if (c === "-" && next === "-") {
      while (i < n && sql[i] !== "\n") i++;
      emit(" ");
      continue;
    }
    if (c === "/" && next === "*") {
      let depth = 1;
      i += 2;
      while (i < n && depth > 0) {
        if (sql[i] === "/" && sql[i + 1] === "*") {
          depth++;
          i += 2;
        } else if (sql[i] === "*" && sql[i + 1] === "/") {
          depth--;
          i += 2;
        } else i++;
      }
      if (depth > 0) throw new GuardParseError("Unterminated block comment");
      emit(" ");
      continue;
    }
    if (c === "'") {
      const prev = sql[i - 1];
      const escapeString = (prev === "E" || prev === "e") && (i < 2 || !/[A-Za-z0-9_$]/.test(sql[i - 2]!));
      i++;
      let closed = false;
      while (i < n) {
        const ch = sql[i]!;
        if (escapeString && ch === "\\") {
          i += 2;
          continue;
        }
        if (ch === "'") {
          if (sql[i + 1] === "'") {
            i += 2;
            continue;
          }
          i++;
          closed = true;
          break;
        }
        i++;
      }
      if (!closed) throw new GuardParseError("Unterminated single-quoted string");
      emit(" ");
      continue;
    }
    if (c === "$" && (i === 0 || !/[A-Za-z0-9_$]/.test(sql[i - 1]!))) {
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i, i + 130));
      if (m) {
        const tag = m[0];
        const close = sql.indexOf(tag, i + tag.length);
        if (close < 0) throw new GuardParseError(`Unterminated dollar-quoted body ${tag}`);
        i = close + tag.length;
        emit(" ");
        continue;
      }
    }
    emit(c);
    i++;
  }
  return out;
}

function tokenize(code: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < code.length) {
    const c = code[i]!;
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let value = "";
      let closed = false;
      while (j < code.length) {
        if (code[j] === '"') {
          if (code[j + 1] === '"') {
            value += '"';
            j += 2;
            continue;
          }
          j++;
          closed = true;
          break;
        }
        value += code[j];
        j++;
      }
      if (!closed) throw new GuardParseError("Unterminated double-quoted identifier");
      out.push({ kind: "quoted", value });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i + 1;
      while (j < code.length && /[A-Za-z0-9_$]/.test(code[j]!)) j++;
      out.push({ kind: "word", value: code.slice(i, j) });
      i = j;
      continue;
    }
    out.push({ kind: "sym", value: c });
    i++;
  }
  return out;
}

function isIdent(t: Tok | undefined): t is Tok {
  return !!t && (t.kind === "word" || t.kind === "quoted");
}

function skipAlias(tokens: Tok[], i: number): number {
  const t = tokens[i];
  if (t?.kind === "word" && t.value.toLowerCase() === "as") {
    const alias = tokens[i + 1];
    return isIdent(alias) ? i + 2 : i + 1;
  }
  if (t?.kind === "quoted") return i + 1;
  if (t?.kind === "word" && !CLAUSE.has(t.value.toLowerCase())) return i + 1;
  return i;
}

/** One relation, or a comma-separated list (`FROM a, b`). `(subquery)` is not a relation. */
function readRelations(tokens: Tok[], start: number): { names: string[]; next: number } | null {
  let i = start;
  const names: string[] = [];
  const readOne = (): boolean => {
    while (
      tokens[i]?.kind === "word" &&
      (tokens[i]!.value.toLowerCase() === "only" || tokens[i]!.value.toLowerCase() === "lateral")
    ) {
      i++;
    }
    const first = tokens[i];
    if (!isIdent(first)) return false;
    if (first.kind === "word" && CLAUSE.has(first.value.toLowerCase())) return false;
    i++;
    let schemaTok: Tok | null = null;
    let nameTok = first;
    if (tokens[i]?.kind === "sym" && tokens[i]?.value === "." && isIdent(tokens[i + 1])) {
      schemaTok = first;
      nameTok = tokens[i + 1]!;
      i += 2;
    }
    const table = nameTok.kind === "quoted" ? nameTok.value : nameTok.value.toLowerCase();
    if (!schemaTok) names.push(table);
    else {
      const pub = schemaTok.kind === "quoted" ? schemaTok.value === "public" : schemaTok.value.toLowerCase() === "public";
      const schema = schemaTok.kind === "quoted" ? schemaTok.value : schemaTok.value.toLowerCase();
      names.push(pub ? table : `${schema}.${table}`);
    }
    i = skipAlias(tokens, i);
    return true;
  };
  if (!readOne()) return null;
  while (tokens[i]?.kind === "sym" && tokens[i]?.value === ",") {
    i++;
    if (!readOne()) break;
  }
  return { names, next: i };
}

export function tablesTouched(sql: string): string[] {
  const tokens = tokenize(stripCommentsAndStrings(sql));
  const found: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.kind !== "word" || !INTRODUCERS.has(t.value.toLowerCase())) continue;
    const rel = readRelations(tokens, i + 1);
    if (!rel) continue;
    found.push(...rel.names);
    i = rel.next - 1;
  }
  return [...new Set(found)];
}

function wordIs(t: Tok | undefined, word: string): boolean {
  return t?.kind === "word" && t.value.toLowerCase() === word;
}

function matchParen(tokens: Tok[], open: number): number {
  let depth = 0;
  for (let i = open; i < tokens.length; i++) {
    if (tokens[i]?.kind === "sym" && tokens[i]?.value === "(") depth++;
    else if (tokens[i]?.kind === "sym" && tokens[i]?.value === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function statementHead(tokens: Tok[]): { ok: true; columnList: { open: number; close: number } | null } | { ok: false; reason: string } {
  const refuse = "Catalog statement guard: refusing a statement that does not start with UPDATE or INSERT INTO.";
  if (wordIs(tokens[0], "update")) return { ok: true, columnList: null };
  if (!(wordIs(tokens[0], "insert") && wordIs(tokens[1], "into"))) return { ok: false, reason: refuse };
  let i = 2;
  while (wordIs(tokens[i], "only") || wordIs(tokens[i], "lateral")) i++;
  if (!isIdent(tokens[i])) return { ok: false, reason: refuse };
  i++;
  if (tokens[i]?.kind === "sym" && tokens[i]?.value === "." && isIdent(tokens[i + 1])) i += 2;
  if (wordIs(tokens[i], "as")) {
    i++;
    if (isIdent(tokens[i])) i++;
  } else if (isIdent(tokens[i]) && !(tokens[i]!.kind === "word" && CLAUSE.has(tokens[i]!.value.toLowerCase()))) {
    i++;
  }
  if (tokens[i]?.kind === "sym" && tokens[i]?.value === "(") {
    const close = matchParen(tokens, i);
    if (close < 0) return { ok: false, reason: "Catalog statement guard: Unterminated column list" };
    return { ok: true, columnList: { open: i, close } };
  }
  return { ok: true, columnList: null };
}

function checkCalls(tokens: Tok[], columnList: { open: number; close: number } | null): string | null {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i]?.kind !== "sym" || tokens[i]?.value !== "(") continue;
    if (columnList && i >= columnList.open && i <= columnList.close) continue;
    const name = tokens[i - 1];
    if (!isIdent(name)) continue;
    if (name.kind === "word" && CALL_KEYWORDS.has(name.value.toLowerCase())) continue;
    const dot = tokens[i - 2];
    if (dot?.kind === "sym" && dot.value === ".") {
      return "Catalog statement guard: refusing schema-qualified call.";
    }
    const key = name.kind === "quoted" ? name.value : name.value.toLowerCase();
    if (!ALLOWED_FUNCTIONS.has(key)) {
      return `Catalog statement guard: refusing function ${key}.`;
    }
  }
  return null;
}

export function guardCatalogSql(sql: string): CatalogGuardResult {
  let statements: string[];
  try {
    statements = splitSql(sql);
  } catch (err) {
    const reason = err instanceof Error ? err.message : "could not parse SQL";
    return { ok: false, reason: `Catalog statement guard: ${reason}` };
  }
  const tables: string[] = [];
  for (const statement of statements) {
    let tokens: Tok[];
    try {
      tokens = tokenize(stripCommentsAndStrings(statement));
    } catch (err) {
      const reason = err instanceof Error ? err.message : "could not parse SQL";
      return { ok: false, reason: `Catalog statement guard: ${reason}` };
    }
    const head = statementHead(tokens);
    if (!head.ok) return head;
    for (const t of tokens) {
      if (t.kind === "word" && FORBIDDEN.has(t.value.toLowerCase())) {
        return { ok: false, reason: `Catalog statement guard: refusing forbidden SQL keyword ${t.value.toUpperCase()}.` };
      }
    }
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i]!;
      if (t.kind !== "word" || !INTRODUCERS.has(t.value.toLowerCase())) continue;
      const rel = readRelations(tokens, i + 1);
      if (!rel) continue;
      tables.push(...rel.names);
      i = rel.next - 1;
    }
    const call = checkCalls(tokens, head.columnList);
    if (call) return { ok: false, reason: call };
  }
  const unique = [...new Set(tables)];
  const bad = unique.filter((name) => !ALLOWED.has(name));
  if (bad.length > 0) {
    return {
      ok: false,
      reason: `Catalog statement guard: refusing table ${bad.join(", ")}. Allowed tables: ${CATALOG_SQL_TABLES.join(", ")}.`,
    };
  }
  return { ok: true, tables: unique };
}
