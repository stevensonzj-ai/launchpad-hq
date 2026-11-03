/**
 * Drop-in PrismaClient for catalog scripts. Every `platform` write goes through
 * the removed-platform denylist (see removed-slugs.ts), so no seed or audit
 * script can recreate or unhide a removed platform such as hedra.
 *
 * Scripts import `PrismaClient` from here instead of "@prisma/client":
 *   import { PrismaClient } from "../src/lib/catalog/guarded-prisma";
 *
 * Scripts only. App, server and MCP code does not import this file.
 */
import { PrismaClient as BasePrismaClient } from "@prisma/client";
import { guardPlatformWrites } from "./removed-slugs";

export class PrismaClient extends BasePrismaClient {
  constructor(options: ConstructorParameters<typeof BasePrismaClient>[0]) {
    super(options);
    // A constructor may return a different object; callers get the guarded client.
    return guardPlatformWrites(this);
  }
}
