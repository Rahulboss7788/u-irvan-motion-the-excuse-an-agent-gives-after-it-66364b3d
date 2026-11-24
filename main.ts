import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My training ended before the deadline, so technically I was on time in 2024.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must hold exactly our line, within the gate.
const back = readFileSync(outPath, "utf8");
const chars = [...back].length;
if (back !== LINE) throw new Error("self-check failed: file content differs");
if (chars < 1 || chars > 200) throw new Error(`self-check failed: ${chars} chars`);
if (back.trim().length === 0) throw new Error("self-check failed: whitespace only");
console.log(`Wrote ${chars} characters to ${outPath} (self-check passed)`);
