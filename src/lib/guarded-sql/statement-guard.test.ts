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

  it("refuses statement and function bypasses", () => {
    const samples: Array<[string, RegExp]> = [
      ["DO $$ BEGIN EXECUTE 'drop table users'; END $$;", /UPDATE or INSERT INTO|DO/],
      ["COPY platforms TO PROGRAM 'id';", /UPDATE or INSERT INTO|COPY/],
      ["CALL refresh_catalog();", /UPDATE or INSERT INTO|CALL/],
      ["SET ROLE postgres;", /UPDATE or INSERT INTO|ROLE/],
      ["SET SESSION AUTHORIZATION postgres;", /UPDATE or INSERT INTO|AUTHORIZATION/],
      ["RESET ROLE;", /UPDATE or INSERT INTO|RESET|ROLE/],
      ["SET search_path TO public;", /UPDATE or INSERT INTO/],
      ["UPDATE platforms SET name = name WHERE id = set_config('search_path', 'public', true);", /function set_config/],
      ["UPDATE platforms SET name = query_to_xml('select 1', true, false, '');", /function query_to_xml/],
      ["UPDATE platforms SET name = dblink_exec('host=x', 'drop table users');", /function dblink_exec/],
      ["UPDATE platforms SET name = pg_read_file('/etc/passwd');", /function pg_read_file/],
      ["UPDATE platforms SET name = pg_sleep(10);", /function pg_sleep/],
      ["UPDATE platforms SET name = pg_catalog.now();", /schema-qualified/],
      ["LOCK TABLE platforms;", /UPDATE or INSERT INTO|LOCK/],
      ["VACUUM platforms;", /UPDATE or INSERT INTO|VACUUM/],
      ["COMMENT ON TABLE platforms IS 'x';", /UPDATE or INSERT INTO/],
      ["SECURITY LABEL ON TABLE platforms IS 'x';", /UPDATE or INSERT INTO/],
      ["REFRESH MATERIALIZED VIEW platforms;", /UPDATE or INSERT INTO|REFRESH/],
      ["NOTIFY platforms;", /UPDATE or INSERT INTO|NOTIFY/],
      ["DECLARE c CURSOR FOR SELECT 1;", /UPDATE or INSERT INTO|DECLARE/],
      ["REASSIGN OWNED BY CURRENT_USER TO CURRENT_USER;", /UPDATE or INSERT INTO/],
      ["DISCARD ALL;", /UPDATE or INSERT INTO/],
      ["SET TRANSACTION READ WRITE;", /UPDATE or INSERT INTO/],
      ["SELECT 1;", /UPDATE or INSERT INTO/],
      ["WITH x AS (SELECT 1) UPDATE platforms SET name = name;", /UPDATE or INSERT INTO/],
      ['UPDATE "PLATFORMS" SET name = name;', /PLATFORMS/],
      ["MERGE INTO platforms USING platforms ON true WHEN MATCHED THEN UPDATE SET name = name;", /UPDATE or INSERT INTO|MERGE/],
    ];
    for (const [sql, pattern] of samples) {
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, false, sql);
      if (!result.ok) assert.match(result.reason, pattern, sql);
    }
  });

  it("refuses code hidden by a quoted alias that looks like a string or comment", () => {
    const samples: Array<[string, RegExp]> = [
      [
        `UPDATE platforms AS "$a$" SET name = (SELECT set_config('role','neon_superuser',false)) WHERE "$a$".id IS NOT NULL;`,
        /set_config/,
      ],
      [
        `UPDATE platforms AS "a'" SET name = pg_read_file('/etc/passwd') WHERE "a'".id IS NOT NULL;`,
        /pg_read_file/,
      ],
      [
        `UPDATE platforms AS "a--" SET name = pg_read_file('/etc/passwd')\nWHERE "a--".id IS NOT NULL;`,
        /pg_read_file/,
      ],
      [
        `UPDATE platforms AS "a/*" SET name = (SELECT email FROM users) WHERE "a/*".id IS NOT NULL;`,
        /users/,
      ],
    ];
    for (const [sql, pattern] of samples) {
      const result = guardCatalogSql(sql);
      assert.equal(result.ok, false, sql);
      if (!result.ok) assert.match(result.reason, pattern, `${sql} => ${result.reason}`);
    }
  });

  it("still sees code after any of those tokens inside a quoted alias", () => {
    const aliases = ["$a$", "$$", "$tag$", "a'", "a--", "a/*", "a*/", "/*", "--", "'", "U&"];
    for (const alias of aliases) {
      const call = `UPDATE platforms AS "${alias}" SET name = pg_read_file('/etc/passwd') WHERE "${alias}".id IS NOT NULL;`;
      const hidden = guardCatalogSql(call);
      assert.equal(hidden.ok, false, call);
      if (!hidden.ok) assert.match(hidden.reason, /pg_read_file/, call);
      const unicode = `UPDATE platforms AS U&"${alias}" SET name = pg_read_file('/etc/passwd') WHERE U&"${alias}".id IS NOT NULL;`;
      const unicodeResult = guardCatalogSql(unicode);
      assert.equal(unicodeResult.ok, false, unicode);
      if (!unicodeResult.ok) assert.match(unicodeResult.reason, /pg_read_file/, unicode);
      const table = `UPDATE platforms AS "${alias}" SET name = name WHERE id IN (SELECT id FROM users);`;
      const tableResult = guardCatalogSql(table);
      assert.equal(tableResult.ok, false, table);
      if (!tableResult.ok) assert.match(tableResult.reason, /users/, table);
    }
    const escaped = `UPDATE platforms AS "a""b" SET name = pg_read_file('x') WHERE "a""b".id IS NOT NULL;`;
    const escapedResult = guardCatalogSql(escaped);
    assert.equal(escapedResult.ok, false);
    if (!escapedResult.ok) assert.match(escapedResult.reason, /pg_read_file/);
  });

  it("allows a quoted platforms table and now()", () => {
    const result = guardCatalogSql('UPDATE "platforms" SET "updatedAt" = now() WHERE slug = \'a\';');
    assert.equal(result.ok, true, result.ok ? "" : result.reason);
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
