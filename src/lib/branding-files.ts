// Lee la carpeta branding/ en tiempo de build para publicarla bajo /marca.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'branding');

export const contentTypes: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  pdf: 'application/pdf',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
};

export const extension = (file: string) => file.slice(file.lastIndexOf('.') + 1).toLowerCase();

// Rutas relativas a branding/, con "/" como separador. Ignora archivos ocultos y tipos no previstos.
export async function listBrandingFiles() {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && !e.name.startsWith('.') && extension(e.name) in contentTypes)
    .map((e) => join(e.parentPath, e.name).slice(root.length + 1).replaceAll('\\', '/'))
    .sort();
}

export const readBrandingFile = (file: string) => readFile(join(root, file));
