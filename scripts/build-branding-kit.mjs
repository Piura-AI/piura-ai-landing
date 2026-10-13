// Genera el kit de marca para compartir (carpeta branding/): logos en SVG y PNG,
// versiones para fondo claro y oscuro, a una tinta, con y sin fondo, y la guía en PDF.
// Uso: npm run branding
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { BLUE, CREAM, FOX, NAVY, ON_DARK_BLUE, ORANGE, capHeight, foxGroup, horizontalLogo, mark, path, textPath } from './brand-lib.mjs';

const ON_DARK_ORANGE = '#E07A4B';
const WHITE = '#FFFFFF';

// Esquemas de color. "word2" es el color de "AI" en el logotipo.
const schemes = {
  'color-fondo-claro': { orange: ORANGE, blue: BLUE, word2: BLUE },
  'color-fondo-oscuro': { orange: ON_DARK_ORANGE, blue: ON_DARK_BLUE, word2: WHITE },
  'una-tinta-azul': { orange: NAVY, blue: NAVY, word2: NAVY },
  'una-tinta-blanco': { orange: WHITE, blue: WHITE, word2: WHITE },
};
// Fondo sólido que acompaña a cada esquema en los PNG "con fondo".
const backgrounds = {
  'color-fondo-claro': { name: 'crema', color: CREAM },
  'color-fondo-oscuro': { name: 'azul-marino', color: NAVY },
  'una-tinta-azul': { name: 'blanco', color: WHITE },
  'una-tinta-blanco': { name: 'terracota', color: '#A8502A' },
};

// Logo cuadrado: zorro arriba y "Piura AI" centrado debajo, dentro de un lienzo cuadrado.
function stackedLogo({ orange = ORANGE, blue = BLUE, word2 = BLUE } = {}) {
  const size = (FOX.h * 0.2) / capHeight;
  const cap = size * capHeight;
  const gap = FOX.h * 0.13;
  const space = textPath(' ', 0, 0, size).width * 0.9;
  const total = textPath('Piura', 0, 0, size).width + space + textPath('AI', 0, 0, size).width;
  const cx = FOX.x + FOX.w / 2;
  const baseline = FOX.y + FOX.h + gap + cap;
  const piura = textPath('Piura', cx - total / 2, baseline, size);
  const ai = textPath('AI', cx - total / 2 + piura.width + space, baseline, size);
  const contentH = FOX.h + gap + cap;
  const side = Math.max(contentH, total) * 1.08;
  const vb = [cx - side / 2, FOX.y + contentH / 2 - side / 2, side, side].map(Math.round);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" role="img" aria-label="Piura AI">${foxGroup({ orange, blue })}<path fill="${orange}" d="${piura.d}"/><path fill="${word2}" d="${ai.d}"/></svg>`;
}

const families = [
  { dir: 'logo-horizontal', file: 'piura-ai-logo-horizontal', build: horizontalLogo, width: 2400, pad: 0.1 },
  { dir: 'logo-cuadrado', file: 'piura-ai-logo-cuadrado', build: stackedLogo, width: 2000, pad: 0.1 },
  { dir: 'icono', file: 'piura-ai-icono', build: (s) => mark({ ...s, padRatio: 0.04 }), width: 1024, pad: 0.18 },
];

const render = (svg, width) => sharp(Buffer.from(svg), { density: 72 }).resize(width).png().toBuffer();

// PNG con fondo sólido: el logo centrado con margen proporcional a su lado menor.
async function withBackground(svg, width, pad, color, square) {
  const logo = await render(svg, width);
  const { width: w, height: h } = await sharp(logo).metadata();
  const m = Math.round(Math.min(w, h) * pad * (square ? 1 : 2.2));
  const outW = square ? Math.max(w, h) + m * 2 : w + m * 2;
  const outH = square ? outW : h + m * 2;
  return sharp({ create: { width: outW, height: outH, channels: 4, background: color } })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toBuffer();
}

const out = path('branding/');
for (const f of families) await rm(new URL(`${f.dir}/`, out), { recursive: true, force: true });

for (const f of families) {
  for (const sub of ['svg', 'png-transparente', 'png-con-fondo']) await mkdir(new URL(`${f.dir}/${sub}/`, out), { recursive: true });
  for (const [scheme, colors] of Object.entries(schemes)) {
    const svg = f.build(colors);
    const bg = backgrounds[scheme];
    await writeFile(new URL(`${f.dir}/svg/${f.file}-${scheme}.svg`, out), svg);
    await writeFile(new URL(`${f.dir}/png-transparente/${f.file}-${scheme}.png`, out), await render(svg, f.width));
    await writeFile(
      new URL(`${f.dir}/png-con-fondo/${f.file}-${scheme}-sobre-${bg.name}.png`, out),
      await withBackground(svg, f.width, f.pad, bg.color, f.dir !== 'logo-horizontal'),
    );
  }
}

// Avatares para redes: cuadrados a sangre, con margen que sobrevive al recorte circular.
await mkdir(new URL('redes/', out), { recursive: true });
const avatar = (colors, bg) => render(mark({ ...colors, bg, padRatio: 0.2, radius: 0 }), 1000);
await writeFile(new URL('redes/piura-ai-avatar-claro.png', out), await avatar(schemes['color-fondo-claro'], CREAM));
await writeFile(new URL('redes/piura-ai-avatar-oscuro.png', out), await avatar(schemes['color-fondo-oscuro'], NAVY));

// Paleta lista para copiar en código o en herramientas de diseño.
const palette = {
  terracota: { hex: '#A8502A', uso: 'Botones, enlaces y acentos' },
  'azul-marino': { hex: NAVY, uso: 'Titulares y fondos oscuros' },
  crema: { hex: CREAM, uso: 'Fondo base' },
  blanco: { hex: WHITE, uso: 'Tarjetas y secciones alternas' },
  tinta: { hex: '#1F2E38', uso: 'Texto principal' },
  'gris-azulado': { hex: '#4A5A63', uso: 'Texto secundario' },
  linea: { hex: '#E7E2D5', uso: 'Bordes y divisores' },
  'terracota-suave': { hex: '#F0B79B', uso: 'Acentos sobre azul marino' },
  'logo-naranja': { hex: ORANGE, uso: 'Solo logo, sobre fondo claro' },
  'logo-azul': { hex: BLUE, uso: 'Solo logo, sobre fondo claro' },
  'logo-naranja-claro': { hex: ON_DARK_ORANGE, uso: 'Solo logo, sobre fondo oscuro' },
  'logo-azul-claro': { hex: ON_DARK_BLUE, uso: 'Solo logo, sobre fondo oscuro' },
};
await mkdir(new URL('colores/', out), { recursive: true });
await writeFile(new URL('colores/colores.json', out), JSON.stringify(palette, null, 2) + '\n');
await writeFile(
  new URL('colores/colores.css', out),
  `/* Paleta de Piura AI */\n:root {\n${Object.entries(palette)
    .map(([k, v]) => `  --piura-ai-${k}: ${v.hex.toLowerCase()}; /* ${v.uso} */`)
    .join('\n')}\n}\n`,
);

// Guía de marca en PDF: se imprime brand/source/guia-de-marca.html con Chrome en modo headless.
const chrome = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (chrome) {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=4000',
      `--print-to-pdf=${fileURLToPath(new URL('Guia-de-marca-Piura-AI.pdf', out))}`,
      path('brand/source/guia-de-marca.html').href,
    ],
    { stdio: 'ignore' },
  );
  console.log('Kit de marca y guía en PDF generados en branding/.');
} else {
  console.log('Kit de marca generado en branding/. No se encontró Chrome: la guía en PDF no se regeneró.');
}
