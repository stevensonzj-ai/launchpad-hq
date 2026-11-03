-- Prod read-only for bots (Zach, Nov 3 2026): harden the EXISTING SELECT-only role launchpad_ro.
-- Idempotent. Creates no role, sets no password, changes no other role. Run only via the
-- Guarded SQL Action (test env first, then guarded-sql-production with a fresh snapshot).
-- launchpad_ro already exists on prod (LOGIN, not in neon_superuser, SELECT on all 19 tables,
-- default SELECT on future neondb_owner tables, default_transaction_read_only=on, statement_timeout=15s).
GRANT CONNECT ON DATABASE neondb TO launchpad_ro;
GRANT USAGE ON SCHEMA public TO launchpad_ro;
REVOKE CREATE ON SCHEMA public FROM launchpad_ro;
REVOKE CREATE ON DATABASE neondb FROM launchpad_ro;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public FROM launchpad_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO launchpad_ro;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO launchpad_ro;
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public GRANT SELECT ON TABLES TO launchpad_ro;
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public GRANT SELECT ON SEQUENCES TO launchpad_ro;
ALTER ROLE launchpad_ro SET default_transaction_read_only = on;
ALTER ROLE launchpad_ro SET statement_timeout = '15s';
ALTER ROLE launchpad_ro SET idle_in_transaction_session_timeout = '60s';
SELECT r.rolname, r.rolsuper, r.rolcreaterole, r.rolcreatedb, r.rolbypassrls, r.rolconfig,
       pg_has_role('launchpad_ro', 'neon_superuser', 'MEMBER') AS in_neon_superuser,
       has_schema_privilege('launchpad_ro', 'public', 'CREATE') AS can_create_in_public,
       (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = 'public' AND c.relkind IN ('r','p')
           AND (has_table_privilege('launchpad_ro', c.oid, 'INSERT') OR has_table_privilege('launchpad_ro', c.oid, 'UPDATE')
             OR has_table_privilege('launchpad_ro', c.oid, 'DELETE'))) AS writable_tables
  FROM pg_roles r WHERE r.rolname = 'launchpad_ro';