import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { findTransactionControl, splitSql } from "@/lib/guarded-sql/split";

const sql = readFileSync("scripts/sql/catalog-copyfix-20261112.sql", "utf8");
const statements = splitSql(sql);

const NEW_PRIMARY = "Conversational AI assistant, writing and content generation, image creation";
const OLD_PRIMARY = "Conversational AI assistant, content generation, image/video via GPT Image 1.5 and Sora 2";
const NEW_TRIGGERS =
  "Hitting free-plan message limits; needing advanced voice; deep research; custom GPTs; more image generation";
const OLD_TRIGGERS =
  "Hitting GPT-4o rate limits; needing Sora/advanced voice; deep research; custom GPTs; higher image gen";

function assigned(statement: string, column: string): string {
  const match = new RegExp(`"${column}"\\s*=\\s*\\$cf\\$([\\s\\S]*?)\\$cf\\$`).exec(statement);
  assert.ok(match, `${column} assignment`);
  return match[1]!;
}

function setColumns(statement: string): string[] {
  const setAt = statement.search(/\bSET\b/i);
  const whereAt = statement.search(/\bWHERE\b/i);
  assert.ok(setAt >= 0 && whereAt > setAt);
  return [...statement.slice(setAt, whereAt).matchAll(/"([A-Za-z]+)"\s*=/g)].map((match) => match[1]!);
}

/** Same predicate as the text UPDATEs: old value, or any Sora / GPT-4o wording. */
function staleCopy(value: string, oldValue: string): boolean {
  const folded = value.toLowerCase();
  return value === oldValue || folded.includes("sora") || folded.includes("gpt-4o");
}

describe("copyfix 2026-11-12 guarded SQL", () => {
  it("parses as three platform updates and nothing else", () => {
    assert.equal(statements.length, 3);
    assert.deepEqual(findTransactionControl(statements), []);
    assert.ok(statements.every((statement) => /^UPDATE\s+platforms\b/i.test(statement)));
    assert.doesNotMatch(sql, /\b(DELETE|DROP|TRUNCATE|ALTER|CREATE\s+TABLE|INSERT)\b/i);
    assert.doesNotMatch(sql, /"description"\s*=/);
    assert.deepEqual(
      [...sql.matchAll(/slug = \$cf\$(.*?)\$cf\$/g)].map((match) => match[1]),
      ["chatgpt", "chatgpt", "claude"],
    );
  });

  it("rewrites ChatGPT primaryUse only while the old copy or a Sora / GPT-4o mention remains", () => {
    const statement = statements[0]!;
    assert.deepEqual(setColumns(statement), ["primaryUse", "updatedAt"]);
    assert.match(statement, /"updatedAt"\s*=\s*now\(\)/);
    assert.equal(assigned(statement, "primaryUse"), NEW_PRIMARY);
    assert.match(statement, /\$cf\$Conversational AI assistant, content generation, image\/video via GPT Image 1\.5 and Sora 2\$cf\$/);
    assert.match(statement, /"primaryUse" ILIKE \$cf\$%sora%\$cf\$/);
    assert.match(statement, /"primaryUse" ILIKE \$cf\$%gpt-4o%\$cf\$/);
    assert.equal(staleCopy(OLD_PRIMARY, OLD_PRIMARY), true);
    assert.equal(staleCopy(NEW_PRIMARY, OLD_PRIMARY), false);
    assert.equal(staleCopy("needing Sora for video", OLD_PRIMARY), true);
    assert.equal(staleCopy("Hitting GPT-4o rate limits", OLD_PRIMARY), true);
  });

  it("rewrites ChatGPT upgradeTriggers with the same guard, and a second run matches nothing", () => {
    const statement = statements[1]!;
    assert.deepEqual(setColumns(statement), ["upgradeTriggers", "updatedAt"]);
    assert.match(statement, /"updatedAt"\s*=\s*now\(\)/);
    assert.equal(assigned(statement, "upgradeTriggers"), NEW_TRIGGERS);
    assert.match(statement, /\$cf\$Hitting GPT-4o rate limits; needing Sora\/advanced voice; deep research; custom GPTs; higher image gen\$cf\$/);
    assert.match(statement, /"upgradeTriggers" ILIKE \$cf\$%sora%\$cf\$/);
    assert.match(statement, /"upgradeTriggers" ILIKE \$cf\$%gpt-4o%\$cf\$/);
    assert.equal(staleCopy(OLD_TRIGGERS, OLD_TRIGGERS), true);
    assert.equal(staleCopy(NEW_TRIGGERS, OLD_TRIGGERS), false);
  });

  it("sets Claude to BEGINNER only while it is not already BEGINNER", () => {
    const statement = statements[2]!;
    assert.deepEqual(setColumns(statement), ["difficultyLevel", "updatedAt"]);
    assert.match(statement, /"updatedAt"\s*=\s*now\(\)/);
    assert.equal(assigned(statement, "difficultyLevel"), "BEGINNER");
    assert.match(statement, /\$cf\$BEGINNER\$cf\$::"Difficulty"/);
    assert.match(statement, /"difficultyLevel"\s*<>\s*\$cf\$BEGINNER\$cf\$::"Difficulty"/);
    assert.doesNotMatch(statement, /"difficultyLevel"\s*=\s*\$cf\$INTERMEDIATE\$cf\$/);
  });
});
