import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The microwave beeps and the dog arrives before the sound does, as if he heard the future.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must hold exactly the line, no trailing
// newline, 1-200 chars, exactly one sentence (one terminal period).
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("entry.txt does not match the line");
if (back.length < 1 || back.length > 200) throw new Error("entry out of gate");
if ((back.match(/\./g) || []).length !== 1 || !back.endsWith(".")) {
  throw new Error("entry is not exactly one sentence");
}
if (back !== back.trim() || back.includes("  ")) {
  throw new Error("entry has stray whitespace");
}
