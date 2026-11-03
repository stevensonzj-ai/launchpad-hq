import fs from "node:fs";
import { execSync } from "node:child_process";
const files = execSync('git grep -l -E "platform\\.(create|upsert|update|updateMany|createMany)\\(" -- scripts', { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const re = /const prisma = new PrismaClient\((.*)\);/;
  if (!re.test(s)) { console.log("NOPATTERN", f); continue; }
  s = s.replace(re, "const prisma = guardPlatformWrites(new PrismaClient($1));");
  const m = s.match(/import \{ PrismaClient \} from "@prisma\/client";\r?\n/);
  if (!m) { console.log("NOIMPORT", f); continue; }
  const nl = m[0].endsWith("\r\n") ? "\r\n" : "\n";
  s = s.replace(m[0], m[0] + 'import { guardPlatformWrites } from "../src/lib/catalog/removed-slugs";' + nl);
  fs.writeFileSync(f, s);
  console.log("ok", f);
}
