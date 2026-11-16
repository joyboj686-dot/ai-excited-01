// main.ts — ai-excited-01 entry runner (Node 22, standard library only).
//
// This program delivers the entry image to the judge. The image (a colossal
// orange-and-white koi bursting from a tiny teacup) is already finished and
// lives beside this script as `entry.png`. All we have to do here is copy it
// to the output directory the harness expects, so the judge sees exactly the
// same bytes both times it runs.
//
// We honor MAKEFUN_OUTPUT_DIR when set (the sandbox may relocate output), and
// otherwise fall back to /output. We create the directory if needed, then copy
// the bytes straight through — no transcoding, no recompression, no touch to
// the source. Identical bytes on every run is what the gate requires.

import { access, copyFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = resolve(import.meta.dirname, "entry.png");
const target = join(outputDir, "entry.png");

async function main() {
  // The image must already be in place for a valid submission; if it ever
  // goes missing, fail loudly instead of writing a broken or empty file.
  await access(source);
  await mkdir(outputDir, { recursive: true });
  await copyFile(source, target);
  console.log(`entry image written to ${target}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});