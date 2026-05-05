// One-off: convert every image in public/images/ to .webp.
// Run with:  node scripts/convert-images.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('public/images');
const MAX_WIDTH = 2400;
const QUALITY = 82;
const LOGO_QUALITY = 95;

const isImage = (f) => /\.(jpe?g|png)$/i.test(f);

const files = (await fs.readdir(SRC)).filter(isImage);

console.log(`Converting ${files.length} files → webp ...`);
for (const file of files) {
  const inPath = path.join(SRC, file);
  const base = file.replace(/\.[^.]+$/, '');
  const outPath = path.join(SRC, `${base}.webp`);

  const isLogo = /^logo$/i.test(base);
  const q = isLogo ? LOGO_QUALITY : QUALITY;

  try {
    const img = sharp(inPath, { failOn: 'none' });
    const meta = await img.metadata();
    const width = meta.width || 0;

    let pipeline = img;
    if (width > MAX_WIDTH && !isLogo) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: q, effort: 5 }).toFile(outPath);
    const before = (await fs.stat(inPath)).size;
    const after = (await fs.stat(outPath)).size;
    const pct = ((1 - after / before) * 100).toFixed(0);
    console.log(`  ${file}  →  ${path.basename(outPath)}  (${pct}% smaller)`);
  } catch (err) {
    console.warn(`  Skipped ${file}: ${err.message}`);
  }
}
console.log('Done.');
