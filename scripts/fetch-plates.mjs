#!/usr/bin/env node
/**
 * Mirrors the section imagery into public/plates/.
 *
 * The plate list is read straight out of lib/constants.ts so this script and
 * the site can never disagree about which files exist or where they come
 * from — adding a plate there is all that is needed.
 *
 * This runs as the build's `prebuild` step. It never fails the build: a plate
 * whose file is missing falls back to its remote URL at runtime, and only if
 * that fails too does the reserved frame appear.
 *
 * These are AI-generated illustrative images, not archival photographs — see
 * the provenance note in lib/constants.ts. Replace them with licensed or
 * commissioned photography before this becomes a credibility-led client site.
 *
 *   npm run plates
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "plates");
const SOURCE = join(process.cwd(), "lib", "constants.ts");

/** Pull `src` / `remote` pairs out of the PLATES literal. */
async function readPlates() {
  const ts = await readFile(SOURCE, "utf8");
  const cdn = ts.match(/const CDN = "([^"]+)"/)?.[1] ?? "";
  const plates = [];
  const entry = /src:\s*"\/plates\/([^"]+)",\s*\n\s*remote:\s*`\$\{CDN\}([^`]+)`/g;
  for (const m of ts.matchAll(entry)) {
    plates.push({ file: m[1], url: cdn + m[2] });
  }
  return plates;
}

const PLATES = await readPlates();
if (!PLATES.length) {
  console.error("! No plates found in lib/constants.ts — nothing to mirror.");
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

let ok = 0;
for (const plate of PLATES) {
  const dest = join(OUT, plate.file);
  try {
    await access(dest);
    console.log(`· ${plate.file} already present, skipping`);
    ok++;
    continue;
  } catch {
    /* not there yet — fetch it */
  }

  try {
    const res = await fetch(plate.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length} bytes)`);
    await writeFile(dest, buf);
    console.log(`✓ ${plate.file}  ${(buf.length / 1024).toFixed(0)} KB`);
    ok++;
  } catch (err) {
    console.error(`✗ ${plate.file}  ${err.message}`);
  }
}

console.log(`\n${ok}/${PLATES.length} mirrored locally.`);
if (ok < PLATES.length) {
  console.log("The rest will load from their remote URLs at runtime.");
}
