// Publica cada archivo del kit de marca (branding/) en /marca/descargas/<ruta>.
import type { APIRoute, GetStaticPaths } from 'astro';
import { contentTypes, extension, listBrandingFiles, readBrandingFile } from '../../../lib/branding-files';

export const getStaticPaths = (async () => (await listBrandingFiles()).map((file) => ({ params: { file } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const file = params.file!;
  return new Response(new Uint8Array(await readBrandingFile(file)), {
    headers: { 'Content-Type': contentTypes[extension(file)] },
  });
};
