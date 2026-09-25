// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL permite sobreescribir el dominio (por ejemplo, en previews).
const site = process.env.SITE_URL ?? 'https://piura-ai.org';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
