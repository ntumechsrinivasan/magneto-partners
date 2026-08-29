#!/usr/bin/env node
/**
 * Downloads the section imagery into public/plates/.
 *
 * These are AI-generated illustrative images, not archival photographs — see
 * the note in lib/constants.ts. Replace them with licensed or commissioned
 * photography before this becomes a credibility-led client site.
 *
 *   npm run plates
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "plates");

const PLATES = [
  {
    file: "filings.jpg",
    url: "https://cdn.gamma.app/n3mmv9l056in4it/design-anything/A7De5EAHrAtq4RUskWZHB/CJeSpH7XPCIETivIv6uKr.jpg",
    note: "Iron filings on a dipole field",
  },
  {
    file: "foundry.jpg",
    url: "https://cdn.gamma.app/n3mmv9l056in4it/design-anything/celwb3JXZ8qjYG2xyCuvF/Whadw6pSFAmHXPAS4Wzhk.jpg",
    note: "Vacuum induction melting, magnet foundry",
  },
  {
    file: "lab.jpg",
    url: "https://cdn.gamma.app/n3mmv9l056in4it/design-anything/PSPUr2LUfHUe6Zr7ZePtR/H0yPBe6cXJ_Yhw.jpg",
    note: "Materials characterisation laboratory",
  },
];

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
    console.log(`✓ ${plate.file}  ${(buf.length / 1024).toFixed(0)} KB  — ${plate.note}`);
    ok++;
  } catch (err) {
    console.error(`✗ ${plate.file}  ${err.message}`);
    console.error(`  ${plate.url}`);
  }
}

console.log(`\n${ok}/${PLATES.length} in place.`);
if (ok < PLATES.length) {
  console.log("Any that failed: save the URL by hand into public/plates/ under the same filename.");
  console.log("Slots with no file render as a reserved frame, so the site stays presentable.");
}
