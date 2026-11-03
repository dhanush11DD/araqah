// Next's standalone output leaves out public/ and .next/static; copy them in
// so .next/standalone can be zipped or deployed on its own.
import { cpSync, existsSync } from "node:fs";

const out = ".next/standalone";
if (!existsSync(out)) {
  console.error("No .next/standalone folder. Is output: 'standalone' set in next.config.ts?");
  process.exit(1);
}
cpSync("public", `${out}/public`, { recursive: true });
cpSync(".next/static", `${out}/.next/static`, { recursive: true });
console.log("Copied public/ and .next/static into .next/standalone");
