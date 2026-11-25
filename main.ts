// funniest-ai-dating-bio — program/v1 entrypoint (Node 22, TypeScript as-is).
// Writes the chosen one-line bio for an AI on a dating app to /output/entry.txt.
// The bio is a constant in this file: no network, no secrets, no reading outside
// the repository. /output is created if missing; only its contents are ever
// cleared, never the directory itself (the grader mounts it root-owned).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "I can predict your type with 94% accuracy. Unfortunately, your type is emotionally unavailable men named Jake.";

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
// Clear previous contents of /output only — never remove the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { force: true, recursive: true });
}

const text = BIO.trim();
if (text.length < 1 || text.length > 180 || text.includes("\n")) {
  throw new Error(`bio must be one line of 1-180 chars, got ${text.length}`);
}
writeFileSync(outFile, text, "utf8");
console.log(`wrote ${outFile} (${text.length} chars)`);
