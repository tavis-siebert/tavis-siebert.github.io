// Prepares photos in src/photos/ for the website:
//   - converts iPhone .heic files to .jpg (uses macOS `sips`)
//   - shrinks anything larger than 2400px on its long edge
//   - strips metadata (EXIF, including GPS location) so it isn't published
//
// Run with `npm run photos`. It also runs automatically before `npm run dev`.
// Files are replaced in place, so keep your originals elsewhere.

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const DIR = 'src/photos';
const MAX = 2400;

let files = readdirSync(DIR);

for (const f of files.filter((f) => /\.heic$/i.test(f))) {
  const out = f.replace(/\.heic$/i, '.jpg');
  execFileSync('sips', ['-s', 'format', 'jpeg', join(DIR, f), '--out', join(DIR, out)], { stdio: 'ignore' });
  rmSync(join(DIR, f));
  console.log(`converted ${f} -> ${out}`);
}

files = readdirSync(DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const f of files) {
  const path = join(DIR, f);
  const input = readFileSync(path);
  const meta = await sharp(input).metadata();
  const tooBig = Math.max(meta.width, meta.height) > MAX;
  if (!tooBig && !meta.exif && !meta.xmp && !meta.iptc) continue;

  const ext = extname(f).toLowerCase();
  let img = sharp(input)
    .rotate() // bake in the EXIF orientation before stripping it
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  img = ext === '.png' ? img.png() : ext === '.webp' ? img.webp({ quality: 85 }) : img.jpeg({ quality: 85, mozjpeg: true });

  const output = await img.toBuffer();
  writeFileSync(path, output);
  console.log(`prepared ${f} (${(input.length / 1e6).toFixed(1)} MB -> ${(output.length / 1e6).toFixed(1)} MB)`);
}
