// Genera los assets de marca a partir del zorro vectorizado (brand/source/fox-traced.svg).
// Uso: npm run brand
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import opentype from 'opentype.js';
import sharp from 'sharp';

const ROOT = new URL('../', import.meta.url);
const path = (p) => new URL(p, ROOT);

const ORANGE = '#CB5F31';
const BLUE = '#3B5973';
const NAVY = '#22384A';
const CREAM = '#F6F3EC';
const ON_DARK_BLUE = '#9FB9CF';

// Bounding box del zorro dentro del viewBox trazado por potrace (medido con sharp().trim()).
const FOX = { x: 119, y: 82, w: 2308, h: 3903 };

const traced = await readFile(path('brand/source/fox-traced.svg'), 'utf8');
const groups = [...traced.matchAll(/<g transform="([^"]+)"\s+fill="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)];
if (groups.length !== 2) throw new Error('fox-traced.svg debe tener 2 grupos (naranja y azul)');

function foxGroup({ orange = ORANGE, blue = BLUE } = {}) {
  return groups
    .map(([, transform, fill, body]) => {
      const color = fill.toLowerCase() === ORANGE.toLowerCase() ? orange : blue;
      return `<g transform="${transform}" fill="${color}">${body.trim()}</g>`;
    })
    .join('');
}

const font = opentype.parse((await readFile(path('brand/source/space-grotesk-700.woff'))).buffer);
const capHeight = font.tables.os2.sCapHeight / font.unitsPerEm;

// Serializa a mano: Path.toPathData() de opentype.js produce NaN con ciertos valores.
function toD(commands) {
  const n = (v) => +v.toFixed(2);
  return commands
    .map((c) => {
      if (c.type === 'M' || c.type === 'L') return `${c.type}${n(c.x)} ${n(c.y)}`;
      if (c.type === 'Q') return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === 'C') return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      return 'Z';
    })
    .join('');
}

function textPath(text, x, baseline, size) {
  return { d: toD(font.getPath(text, x, baseline, size).commands), width: font.getAdvanceWidth(text, size) };
}

// Logo horizontal: zorro + "Piura AI" en una sola línea.
function horizontalLogo({ orange = ORANGE, blue = BLUE, word2 = BLUE } = {}) {
  const pad = 40;
  const size = (FOX.h * 0.34) / capHeight;
  const gap = FOX.h * 0.14;
  const textX = FOX.x + FOX.w + gap;
  const baseline = FOX.y + FOX.h * 0.5 + (size * capHeight) / 2 + FOX.h * 0.04;
  const piura = textPath('Piura', textX, baseline, size);
  const space = font.getAdvanceWidth(' ', size) * 0.9;
  const ai = textPath('AI', textX + piura.width + space, baseline, size);
  const right = textX + piura.width + space + ai.width;
  const vb = [FOX.x - pad, FOX.y - pad, right - FOX.x + pad * 2, FOX.h + pad * 2].map((n) => Math.round(n));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" role="img" aria-label="Piura AI">${foxGroup({ orange, blue })}<path fill="${orange}" d="${piura.d}"/><path fill="${word2}" d="${ai.d}"/></svg>`;
}

// Isotipo: solo el zorro, cuadrado y centrado.
function mark({ orange = ORANGE, blue = BLUE, bg = null, padRatio = 0.06 } = {}) {
  const side = FOX.h * (1 + padRatio * 2);
  const x = FOX.x + FOX.w / 2 - side / 2;
  const y = FOX.y - FOX.h * padRatio;
  const rect = bg ? `<rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${side * 0.22}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[x, y, side, side].map(Math.round).join(' ')}" role="img" aria-label="Piura AI">${rect}${foxGroup({ orange, blue })}</svg>`;
}

await mkdir(path('public/brand'), { recursive: true });

const logo = horizontalLogo();
const logoOnDark = horizontalLogo({ orange: '#E07A4B', blue: ON_DARK_BLUE, word2: '#FFFFFF' });
const logoMark = mark();
const favicon = mark({ padRatio: 0.02 });
const appIcon = mark({ bg: CREAM, padRatio: 0.16 });

await writeFile(path('public/brand/piura-ai-logo-on-dark.svg'), logoOnDark);
await writeFile(path('public/brand/piura-ai-mark.svg'), logoMark);
await writeFile(path('public/favicon.svg'), favicon);
await writeFile(path('public/brand/piura-ai-logo.svg'), logo);

const png = (svg, w, out, opts = {}) =>
  sharp(Buffer.from(svg), { density: 72 }).resize(w, opts.h ?? null, { fit: 'contain', background: opts.bg ?? { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);

await png(logo, 1600, 'public/brand/piura-ai-logo.png');
await png(logoMark, 1024, 'public/brand/piura-ai-mark.png');
await png(appIcon, 180, 'public/apple-touch-icon.png');
await png(appIcon, 192, 'public/icon-192.png');
await png(appIcon, 512, 'public/icon-512.png');

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
