// Contenido de la página /marca. Los archivos salen de la carpeta branding/ (npm run branding)
// y se publican tal cual bajo /marca/descargas/.
import palette from '../../branding/colores/colores.json';

export const downloadsBase = '/marca/descargas';
export const kitZipUrl = '/marca/piura-ai-branding.zip';
export const guidePdfUrl = `${downloadsBase}/Guia-de-marca-Piura-AI.pdf`;

type Stage = 'cream' | 'navy' | 'white' | 'accent';

// Versiones de color. "bg" es el sufijo del PNG con fondo y "stage" el fondo de la vista previa.
export const versions: { id: string; name: string; use: string; bg: string; stage: Stage }[] = [
  { id: 'color-fondo-claro', name: 'Color, fondo claro', use: 'Por defecto. Sobre crema, blanco o fondos claros.', bg: 'crema', stage: 'cream' },
  { id: 'color-fondo-oscuro', name: 'Color, fondo oscuro', use: 'Sobre azul marino, negro o fondos oscuros.', bg: 'azul-marino', stage: 'navy' },
  { id: 'una-tinta-azul', name: 'Una tinta, azul', use: 'Impresión a un color, sellos y grabados.', bg: 'blanco', stage: 'white' },
  { id: 'una-tinta-blanco', name: 'Una tinta, blanco', use: 'Sobre fotos oscuras o colores intensos.', bg: 'terracota', stage: 'accent' },
];

export const families = [
  {
    dir: 'logo-horizontal',
    file: 'piura-ai-logo-horizontal',
    title: 'Logo horizontal',
    text: 'La versión principal: el zorro y “Piura AI” en una línea. Para web, documentos, firmas y banners.',
    width: 244,
    height: 100,
  },
  {
    dir: 'logo-cuadrado',
    file: 'piura-ai-logo-cuadrado',
    title: 'Logo cuadrado',
    text: 'El zorro arriba y el nombre abajo. Para espacios cuadrados o verticales: afiches, polos y sellos.',
    width: 100,
    height: 100,
  },
  {
    dir: 'icono',
    file: 'piura-ai-icono',
    title: 'Ícono',
    text: 'Solo el zorro. Para avatares, favicon y tamaños muy pequeños.',
    width: 100,
    height: 100,
  },
];

export const logoFiles = (family: (typeof families)[number], version: (typeof versions)[number]) => {
  const base = `${downloadsBase}/${family.dir}`;
  const name = `${family.file}-${version.id}`;
  return {
    svg: `${base}/svg/${name}.svg`,
    png: `${base}/png-transparente/${name}.png`,
    pngBg: `${base}/png-con-fondo/${name}-sobre-${version.bg}.png`,
  };
};

export const avatars = [
  { name: 'Avatar claro', file: `${downloadsBase}/redes/piura-ai-avatar-claro.png` },
  { name: 'Avatar oscuro', file: `${downloadsBase}/redes/piura-ai-avatar-oscuro.png` },
];

const colorNames: Record<keyof typeof palette, string> = {
  terracota: 'Terracota',
  'azul-marino': 'Azul marino',
  crema: 'Crema',
  blanco: 'Blanco',
  tinta: 'Tinta',
  'gris-azulado': 'Gris azulado',
  linea: 'Línea',
  'terracota-suave': 'Terracota suave',
  'logo-naranja': 'Naranja zorro',
  'logo-azul': 'Azul zorro',
  'logo-naranja-claro': 'Naranja claro',
  'logo-azul-claro': 'Azul claro',
};

const swatches = (Object.keys(palette) as (keyof typeof palette)[]).map((key) => ({
  key,
  name: colorNames[key],
  hex: palette[key].hex.toUpperCase(),
  use: palette[key].uso,
}));

export const colors = swatches.filter((c) => !c.key.startsWith('logo-'));
export const logoColors = swatches.filter((c) => c.key.startsWith('logo-'));

export const fonts = [
  {
    name: 'Space Grotesk',
    role: 'Titulares',
    family: 'display' as const,
    href: 'https://fonts.google.com/specimen/Space+Grotesk',
  },
  {
    name: 'IBM Plex Sans',
    role: 'Cuerpo de texto',
    family: 'body' as const,
    href: 'https://fonts.google.com/specimen/IBM+Plex+Sans',
  },
];

export const rules = [
  'El nombre se escribe “Piura AI”: con espacio y “AI” en mayúsculas.',
  'No estires, gires ni cambies los colores del logo, y no le agregues sombras ni efectos.',
  'Deja aire alrededor del logo y cuida el contraste con el fondo.',
  'Usa la versión de fondo oscuro sobre azul marino o negro; sobre fotos, la de una tinta.',
];
