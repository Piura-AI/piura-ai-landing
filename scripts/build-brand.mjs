// Genera los assets de marca a partir del zorro vectorizado (brand/source/fox-traced.svg).
// Uso: npm run brand
import { writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

import { CREAM, NAVY, ORANGE, ON_DARK_BLUE, horizontalLogo, mark, path, png, textPath } from './brand-lib.mjs';

await mkdir(path('public/brand'), { recursive: true });

const logo = horizontalLogo();
const logoOnDark = horizontalLogo({ orange: '#E07A4B', blue: ON_DARK_BLUE, word2: '#FFFFFF' });
const logoMark = mark();
const favicon = mark({ padRatio: 0.02 });
const appIcon = mark({ bg: CREAM, padRatio: 0.16 });
// Avatar para GitHub/redes: cuadrado a sangre; el margen amplio sobrevive al recorte circular.
const avatar = mark({ bg: CREAM, padRatio: 0.2, radius: 0 });

await writeFile(path('public/brand/piura-ai-logo-on-dark.svg'), logoOnDark);
await writeFile(path('public/brand/piura-ai-mark.svg'), logoMark);
await writeFile(path('public/favicon.svg'), favicon);
await writeFile(path('public/brand/piura-ai-logo.svg'), logo);

await png(logo, 1600, 'public/brand/piura-ai-logo.png');
await png(logoMark, 1024, 'public/brand/piura-ai-mark.png');
await png(appIcon, 180, 'public/apple-touch-icon.png');
await png(appIcon, 192, 'public/icon-192.png');
await png(appIcon, 512, 'public/icon-512.png');

await mkdir(path('brand/social'), { recursive: true });
await png(avatar, 1000, 'brand/social/piura-ai-avatar.png');
await png(logo, 2000, 'brand/social/piura-ai-logo.png');
await writeFile(path('brand/social/piura-ai-logo.svg'), logo);
await writeFile(path('brand/social/piura-ai-mark.svg'), logoMark);

// favicon.ico (16/32/48) con PNGs embebidos.
const sizes = [16, 32, 48];
const icoImages = await Promise.all(
  sizes.map((s) => sharp(Buffer.from(favicon), { density: 72 }).resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
icoImages.forEach((img, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(sizes[i], e);
  header.writeUInt8(sizes[i], e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
await writeFile(path('public/favicon.ico'), Buffer.concat([header, ...icoImages]));

// Open Graph 1200x630: fondo crema, logo horizontal, tagline y ondas del hero.
const tagline = textPath('Comunidad de inteligencia artificial en Piura, Perú', 0, 0, 30);
const ogLogo = await sharp(Buffer.from(logo), { density: 72 }).resize(760).png().toBuffer();
const ogMeta = await sharp(ogLogo).metadata();
const logoTop = 120;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <path d="M0 520 C 200 470, 330 580, 600 520 S 1000 470, 1200 540" fill="none" stroke="${NAVY}" stroke-opacity="0.14" stroke-width="3"/>
  <path d="M0 560 C 220 520, 360 610, 620 565 S 1020 510, 1200 580" fill="none" stroke="${ORANGE}" stroke-opacity="0.2" stroke-width="3"/>
  <path d="M0 600 C 240 575, 380 640, 640 605 S 1040 560, 1200 615" fill="none" stroke="${NAVY}" stroke-opacity="0.1" stroke-width="3"/>
  <g transform="translate(${(1200 - tagline.width) / 2}, ${logoTop + ogMeta.height + 64})"><path fill="${NAVY}" fill-opacity="0.78" d="${tagline.d}"/></g>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: ogLogo, left: Math.round((1200 - ogMeta.width) / 2), top: logoTop }])
  .png()
  .toFile('public/og-image.png');

console.log('Assets de marca generados.');
