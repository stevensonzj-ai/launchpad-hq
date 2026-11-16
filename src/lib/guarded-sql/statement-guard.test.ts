import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { CATALOG_SQL_TABLES, guardCatalogSql } from "./statement-guard";

const catalogFiles = readdirSync("scripts/sql")
  .filter((name) => /^catalog(-audit)?-.*\.sql$/.test(name))
  .sort();

describe("catalog statement guard", () => {
  it("allows every committed catalog and catalog-audit SQL file", () => {
    assert.ok(catalogFiles.length >= 5, catalogFiles.join(","));
    assert.deepEqual([...CATALOG_SQL_TABLES], ["categories", "platforms"]);
    for (const name of catalogFiles) {
      const sql = readFileSync(`scripts/sql/${name}`, "utf8");
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, true, `${name}: ${result.ok ? "" : result.reason}`);
      if (result.ok) {
        for (const table of result.tables) assert.ok(CATALOG_SQL_TABLES.includes(table as "categories" | "platforms"), table);
      }
    }
  });

  it("rejects DROP, DELETE, ALTER, CREATE, TRUNCATE, GRANT and REVOKE", () => {
    const samples = [
      "DROP TABLE users;",
      "DELETE FROM platforms WHERE slug = 'a';",
      "ALTER TABLE platforms ADD COLUMN x int;",
      "CREATE TABLE extra (id int);",
      "TRUNCATE platforms;",
      "TRUNCATE TABLE platforms;",
      "GRANT SELECT ON platforms TO launchpad_ro;",
      "REVOKE SELECT ON platforms FROM launchpad_ro;",
      "UPDATE platforms SET name = name; DROP TABLE users;",
    ];
    for (const sql of samples) {
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, false, sql);
    }
  });

  it("rejects comment tricks that still execute a forbidden keyword", () => {
    const samples = [
      "DROP/**/TABLE users;",
      "/**/DELETE FROM platforms;",
      "DR/**/OP TABLE users; DELETE FROM platforms;",
      "/* outer /* nested */ still */ DROP TABLE platforms;",
      "UPDATE platforms SET name = '/*'; DROP TABLE users;",
      "DO $$ BEGIN DROP TABLE users; END $$;",
      "Do $body$ DELETE FROM platforms; $body$;",
    ];
    for (const sql of samples) {
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, false, sql);
    }
  });

  it("ignores forbidden words that appear only in comments or string literals", () => {
    const samples = [
      "UPDATE platforms SET name = 'DROP TABLE users' WHERE slug = 'a';",
      "UPDATE platforms SET name = name WHERE slug = 'a'; -- DELETE FROM users\n",
      "/* TRUNCATE platforms */\nUPDATE platforms SET \"createdAt\" = now() WHERE slug = 'a';",
      "UPDATE platforms SET description = $xw$please DROP the old note and CREATE a new one$xw$ WHERE slug = 'a';",
      "UPDATE platforms SET name = '*/ DROP TABLE users' WHERE slug = 'a';",
      "UPDATE public.platforms SET name = name WHERE slug = 'a';",
      "INSERT INTO platforms (slug) SELECT 'x' WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'writing');",
    ];
    for (const sql of samples) {
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, true, `${sql} => ${result.ok ? "" : result.reason}`);
    }
  });

  it("rejects tables other than platforms and categories", () => {
    const result = guardCatalogSql("UPDATE users SET name = name;");
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /users/);
    const other = guardCatalogSql("UPDATE evil.platforms SET name = name;");
    assert.equal(other.ok, false);
  });

  it("rejects an unterminated comment instead of guessing", () => {
    const result = guardCatalogSql("UPDATE platforms SET name = name; /* DROP");
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /Unterminated/);
  });
});

describe("guarded-sql workflow contract", () => {
  const yml = readFileSync(".github/workflows/guarded-sql.yml", "utf8");

  it("self-snapshots, keeps the reviewer environments, and fails closed on production", () => {
    assert.match(yml, /NEON_PROD_API_KEY/);
    assert.match(yml, /secrets\.NEON_API_KEY/);
    assert.match(yml, /TEST_PROJECT_ID/);
    assert.match(yml, /guarded-sql-production/);
    assert.match(yml, /guarded-sql-test/);
    assert.match(yml, /refs\/heads\/main/);
    assert.match(yml, /allow_schema_change/);
    assert.match(yml, /::add-mask::/);
    assert.match(yml, /scripts\/guarded-sql-self-snapshot\.ts/);
    assert.match(yml, /scripts\/guarded-sql-statement-guard\.ts/);
    assert.match(yml, /GUARDED_SQL_CATALOG_GUARD/);
    assert.doesNotMatch(yml, /production requires snapshot_id/);
    assert.match(yml, /IN_SQL_FILE" =~ \^scripts\/sql\/\[A-Za-z0-9._-\]\+\\\.sql\$/);
  });
});
