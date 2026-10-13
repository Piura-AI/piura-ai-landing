// Empaqueta el kit de marca completo (branding/) en un ZIP al compilar el sitio.
import type { APIRoute } from 'astro';
import { zipSync, type Zippable } from 'fflate';
import { extension, listBrandingFiles, readBrandingFile } from '../../lib/branding-files';

export const GET: APIRoute = async () => {
  const entries: Zippable = {};
  for (const file of await listBrandingFiles()) {
    // PNG y PDF ya vienen comprimidos: se guardan sin recomprimir.
    const level = ['png', 'pdf'].includes(extension(file)) ? 0 : 9;
    entries[`piura-ai-branding/${file}`] = [new Uint8Array(await readBrandingFile(file)), { level }];
  }
  return new Response(zipSync(entries), { headers: { 'Content-Type': 'application/zip' } });
};
