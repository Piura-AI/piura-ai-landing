# AGENTS.md: Piura AI landing

Landing estática y SEO friendly de **Piura AI**, la comunidad de inteligencia artificial de Piura, Perú. Se construyó a partir del boceto de Juan Alberto Quintana (Claude Design) y del logo oficial del zorro andino.

## Stack

- **Astro 7** en modo `output: 'static'`, sin frameworks de UI ni adapter. Todo es HTML + CSS con scoping de Astro; el único JS de cliente es el toggle del menú móvil (`src/components/Header.astro`).
- **Íconos:** `@lucide/astro`. **Nunca usar emojis** en la UI ni en el contenido. Lucide ya no incluye íconos de marcas (LinkedIn, Instagram, etc.); para redes se usa texto + `ArrowUpRight`.
- **Fuentes self-hosted** con Fontsource: Space Grotesk (titulares) e IBM Plex Sans (cuerpo), solo subset latino.
- **Imágenes** optimizadas con `astro:assets` (`<Image />`, WebP y `srcset`). Las fuentes originales viven en `src/assets/`.
- **SEO:** `@astrojs/sitemap`, `robots.txt` generado (`src/pages/robots.txt.ts`), canonical, Open Graph, Twitter Card y JSON-LD `Organization` en `src/layouts/BaseLayout.astro`.
- **Deploy:** Cloudflare Workers con archivos estáticos (`wrangler.jsonc`, `assets.directory: ./dist`); no hace falta adapter ni código de Worker. `npm run deploy` compila y publica. `www` redirige al dominio principal con una regla de Cloudflare. El dominio está en GoDaddy (cuenta de Juan Alberto) con DNS delegado a Cloudflare; el correo es Zoho Mail. Dominio de producción: `https://piura-ai.org` (valor por defecto de `site` en `astro.config.mjs`). La variable de entorno `SITE_URL` lo sobreescribe si hace falta; canonical, OG, sitemap y robots se derivan de ahí.

## Comandos

```bash
npm install
npm run dev        # servidor de desarrollo (usar: npx astro dev --background)
npm run check      # astro check (tipos y diagnósticos): debe quedar en 0 errores
npm run build      # genera dist/
npm run preview    # sirve dist/
npm run brand      # regenera logos, favicons y OG image desde brand/source/
npm run deploy     # astro build + wrangler deploy a Cloudflare
```

Después de agregar o cambiar integraciones, correr `npx astro sync`.

## Estructura

```
brand/social/            Avatar y logos para GitHub/redes (generados)
brand/source/            Fuentes de marca: zorro vectorizado (potrace), logo original, Space Grotesk 700
scripts/build-brand.mjs  Genera todos los assets de marca (ver "Marca")
public/brand/            Logos SVG/PNG generados (horizontal, versión sobre oscuro, isotipo)
public/                  favicon.ico/.svg, apple-touch-icon, icon-192/512, og-image.png, site.webmanifest
src/data/site.ts         TODO el contenido editable: textos, eventos, trayectoria, fundadores, aliados, enlaces
src/assets/images/       Foto del primer evento (hero)
src/assets/team/         Fotos de fundadores (tomadas de sus perfiles de LinkedIn, ~400×400)
src/components/          Una sección por componente: Header, Hero, Stats, Manifesto, Events, Timeline, Founders, Allies, Footer
src/layouts/BaseLayout.astro  <head> con SEO, favicons y JSON-LD
src/styles/global.css    Tokens de diseño (CSS custom properties) y utilidades (.wrap, .section, .btn)
DESIGN.md                Sistema de diseño (skill design-md): paleta, tipografía, componentes y layout
CLAUDE.md                Solo importa este archivo (@AGENTS.md). Es un archivo real, no un symlink.
```

## Reglas de contenido (importantes)

- **Capitalización normal en español:** mayúscula inicial en cada oración, título, botón, etiqueta y elemento del menú ("Unirse a la comunidad", "Próximos eventos"). El boceto original estaba todo en minúsculas y eso **no** se replica: se considera una falta de respeto hacia el lector.
- Español neutro peruano, tono cercano pero profesional. Usar comillas tipográficas “ ” y la raya o el guion correcto (2025–26).
- Respetar nombres propios y siglas: Piura AI, IA, GDG Piura, INNOSPACE, Universidad de Piura.
- El contenido se edita en `src/data/site.ts`, no dentro de los componentes.
- `joinUrl` es el grupo de WhatsApp de la comunidad; todos los botones "Unirse a la comunidad" apuntan ahí y abren en pestaña nueva.
- Fundadores: el orden de `founders` en `site.ts` es el orden en pantalla. Para agregar a alguien, guardar su foto de LinkedIn en `src/assets/team/<nombre-apellido>.jpg` (recortada al rostro si es un plano abierto), importarla y añadir la entrada con rol (en inglés, como en LinkedIn) y bio corta en español. La grilla termina siempre con la tarjeta "Súmate a Piura AI".
- Los enlaces pendientes están marcados con `TODO` en `site.ts`: las redes sociales (`href: null` las oculta) y `codeOfConductUrl`. El correo `contacto@piura-ai.org` viene del boceto; confirmar que el buzón exista.

## Reglas de diseño

- Seguir `DESIGN.md`. Colores solo vía tokens de `src/styles/global.css` (`var(--color-*)`); no introducir hex sueltos en componentes salvo casos del footer ya existentes.
- Un solo color de acción: terracota `--color-accent` (#A8502A). Titulares en azul marino `--color-navy` (#22384A).
- Secciones alternan fondo crema (`.section`) y blanco (`.section--surface`).
- Todo debe verse bien a 390px, sin scroll horizontal. Breakpoints usados: 1000px, 900px, 760px, 520px y 480px.
- Accesibilidad: un solo `h1`, jerarquía h2/h3 por sección, `alt` descriptivo en español, `aria-hidden` en íconos decorativos, texto `sr-only` en enlaces repetidos ("Registrarse", "Perfil de LinkedIn"), skip link y `:focus-visible` visible.
- Fotos reales antes que ilustraciones. Si se necesitan imágenes nuevas generadas por IA, generarlas con Gemini (Nano Banana); la API key está en `~/.zshrc` (`MY_GEMINI_API_KEY`). Nunca commitear keys.

## Marca

- `npm run brand` regenera todo desde `brand/source/fox-traced.svg` (el zorro vectorizado con potrace desde el JPG original de WhatsApp, separado en capas naranja #CB5F31 y azul #3B5973).
- El logo horizontal compone el zorro + "Piura AI" en una sola línea con Space Grotesk Bold convertida a trazos (opentype.js), así el SVG no depende de fuentes.
- Variantes: `piura-ai-logo.svg` (fondo claro), `piura-ai-logo-on-dark.svg` (footer navy), `piura-ai-mark.svg` (solo zorro). El favicon y los íconos de app usan solo el zorro.
- `og-image.png` (1200×630) es crema con el logo, la tagline y las ondas del hero.
- `brand/social/`: `piura-ai-avatar.png` (1000×1000, zorro sobre crema a sangre, apto para recorte circular) para la org de GitHub y redes, más el logo horizontal en PNG (2000px) y SVG.
- Si cambia el logo oficial, reemplazar `brand/source/fox-traced.svg` (o volver a trazarlo) y ajustar `FOX` (bounding box) en el script.

## Skills del proyecto

Instaladas a nivel proyecto en `.claude/skills/` (bloqueadas en `skills-lock.json`):

- **astro** (`astrolicious/agent-skills`): guía de uso de Astro; consultar https://docs.astro.build antes de usar APIs nuevas.
- **design-md** (`google-labs-code/stitch-skills`): cómo mantener `DESIGN.md`. Aquí no hay proyecto de Stitch; `DESIGN.md` se sintetizó desde el boceto. Si cambia el diseño, actualizarlo con la misma estructura (atmósfera, paleta con hex y rol, tipografía, componentes y layout).

## Checklist antes de dar algo por terminado

1. `npm run check` sin errores.
2. `npm run build` sin warnings nuevos.
3. Revisar en `npm run preview` a 1440px y 390px (sin overflow horizontal).
4. Textos con capitalización correcta y sin emojis.

## Documentación de Astro

- Rutas y páginas: https://docs.astro.build/en/guides/routing/
- Componentes: https://docs.astro.build/en/basics/astro-components/
- Imágenes: https://docs.astro.build/en/guides/images/
- Estilos: https://docs.astro.build/en/guides/styling/
- Deploy en Cloudflare: https://docs.astro.build/en/guides/deploy/cloudflare/
