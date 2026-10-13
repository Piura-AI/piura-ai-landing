// Piezas compartidas de la marca: colores, zorro vectorizado y composición de logos.
// Las usan build-brand.mjs (assets de la web) y build-branding-kit.mjs (kit para compartir).
import { readFile } from 'node:fs/promises';
import opentype from 'opentype.js';
import sharp from 'sharp';

export const ROOT = new URL('../', import.meta.url);
export const path = (p) => new URL(p, ROOT);

export const ORANGE = '#CB5F31';
export const BLUE = '#3B5973';
export const NAVY = '#22384A';
export const CREAM = '#F6F3EC';
export const ON_DARK_BLUE = '#9FB9CF';

// Bounding box del zorro dentro del viewBox trazado por potrace (medido con sharp().trim()).
export const FOX = { x: 119, y: 82, w: 2308, h: 3903 };

const traced = await readFile(path('brand/source/fox-traced.svg'), 'utf8');
const groups = [...traced.matchAll(/<g transform="([^"]+)"\s+fill="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)];
if (groups.length !== 2) throw new Error('fox-traced.svg debe tener 2 grupos (naranja y azul)');

export function foxGroup({ orange = ORANGE, blue = BLUE } = {}) {
  return groups
    .map(([, transform, fill, body]) => {
      const color = fill.toLowerCase() === ORANGE.toLowerCase() ? orange : blue;
      return `<g transform="${transform}" fill="${color}">${body.trim()}</g>`;
    })
    .join('');
}

export const font = opentype.parse((await readFile(path('brand/source/space-grotesk-700.woff'))).buffer);
export const capHeight = font.tables.os2.sCapHeight / font.unitsPerEm;

// Serializa a mano: Path.toPathData() de opentype.js produce NaN con ciertos valores.
export function toD(commands) {
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

export function textPath(text, x, baseline, size) {
  return { d: toD(font.getPath(text, x, baseline, size).commands), width: font.getAdvanceWidth(text, size) };
}

// Logo horizontal: zorro + "Piura AI" en una sola línea.
export function horizontalLogo({ orange = ORANGE, blue = BLUE, word2 = BLUE } = {}) {
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
export function mark({ orange = ORANGE, blue = BLUE, bg = null, padRatio = 0.06, radius = 0.22 } = {}) {
  const side = FOX.h * (1 + padRatio * 2);
  const x = FOX.x + FOX.w / 2 - side / 2;
  const y = FOX.y - FOX.h * padRatio;
  const rect = bg ? `<rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${side * radius}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[x, y, side, side].map(Math.round).join(' ')}" role="img" aria-label="Piura AI">${rect}${foxGroup({ orange, blue })}</svg>`;
}

export const png = (svg, w, out, opts = {}) =>
  sharp(Buffer.from(svg), { density: 72 }).resize(w, opts.h ?? null, { fit: 'contain', background: opts.bg ?? { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);
