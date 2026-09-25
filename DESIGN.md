# Design System: Piura AI, landing
**Project ID:** No aplica (no hay proyecto en Stitch). Se sintetizó a partir de la referencia visual `Piura AI — sitio web (referencia visual) – home.html` (boceto de Juan Alberto Quintana, lienzo de 1440px) y del logo oficial del zorro andino.

## 1. Visual Theme & Atmosphere

Una landing **cálida, sobria y editorial** que se siente más cercana a una revista técnica regional que a una startup de Silicon Valley. El fondo crema recuerda la arena y el sol de Piura; el azul marino aporta seriedad institucional y el terracota del zorro da el único punto de calor y acción. La densidad es **aireada**: secciones amplias con mucho respiro vertical, grillas regulares y pocos elementos por bloque.

La estética es **humana y comunitaria**, no futurista: nada de gradientes neón, glows ni ilustraciones de robots. La IA se comunica con fotos reales de la comunidad, tipografía geométrica con carácter y un par de ondas lineales muy tenues (eco del trazo continuo del logo).

**Características clave:**
- Alternancia rítmica de fondos crema y blanco entre secciones, separadas por líneas finísimas.
- Un solo color de acción (terracota) usado con disciplina.
- Íconos de trazo fino (Lucide, 1.5px) en azul marino; nunca emojis.
- Fotos reales de personas y eventos por encima de cualquier ilustración genérica.
- Tono sereno y confiable, con detalles regionales (Piura, zorro andino).

## 2. Color Palette & Roles

### Base
- **Crema arena de Piura** (#F6F3EC): fondo base de la página y de las secciones impares; también fondo de tarjetas que viven sobre blanco.
- **Blanco limpio** (#FFFFFF): header, franja de cifras y secciones alternas (Eventos, Miembros); fondo de tarjetas que viven sobre crema.
- **Línea de arena** (#E7E2D5): bordes de tarjetas, divisores verticales de cifras, línea del timeline y bordes de secciones.

### Texto
- **Azul marino institucional** (#22384A): titulares (h1, h2), cifras, años del timeline, íconos, botón outline y fondo del footer.
- **Tinta profunda** (#1F2E38): títulos de tarjeta (h3) y texto principal.
- **Gris pizarra** (#4A5A63): párrafos secundarios, descripciones, enlaces de navegación.

### Acción y acento
- **Terracota del zorro** (#A8502A): botones primarios, enlaces, barras cortas de acento del manifiesto, puntos del timeline y roles de los fundadores. Es el único color "que pide clic".
- **Terracota tostado** (#823D20): hover de botones y enlaces.
- **Durazno suave** (#F0B79B): enlaces sobre el fondo azul marino del footer.

### Sobre fondo oscuro (footer)
- **Niebla clara** (#DCE4E8) para texto base, **Gris neblina** (#B7C3CC) para texto secundario y **Gris acero** (#9FB0BA) para el copyright.

### Solo logo
- **Naranja zorro** (#CB5F31) y **Azul zorro** (#3B5973): colores exactos del trazo del logo. No se usan en la UI; ahí van #A8502A y #22384A, que tienen mejor contraste para texto.

## 3. Typography Rules

- **Titulares: Space Grotesk** (variable, 600–700). Geométrica con rasgos peculiares (la "y" y la "g"), da personalidad técnica sin ser fría. h1 entre 38 y 58px con interlineado 1.12; h2 entre 28 y 36px; h3 entre 15.5 y 21px en peso 600.
- **Cuerpo: IBM Plex Sans** (400, 500, 600). Humanista, muy legible, con ADN técnico. Cuerpo base de 16px con interlineado 1.6; descripciones de tarjeta entre 13 y 15px.
- **Cifras y años** usan Space Grotesk en bold para que los números se lean como datos.
- **Capitalización:** redacción en español con mayúscula inicial en cada oración, título, botón y etiqueta (por ejemplo "Unirse a la comunidad", "Próximos eventos"). El boceto original usaba todo en minúsculas y eso **no** se replica. Los nombres propios y siglas se respetan (Piura AI, IA, GDG Piura, INNOSPACE).
- Comillas tipográficas (“ ”) en lugar de comillas rectas.

## 4. Component Stylings

- **Botones:** esquinas suavemente redondeadas (8px), 13 × 22px de padding, texto 15px semibold. Primario: fondo terracota sólido con texto blanco. Secundario: contorno azul marino de 1.5px, fondo transparente, que se rellena de azul marino en hover. Íconos Lucide de 16–18px a la derecha cuando indican dirección.
- **Tarjetas de evento:** fondo crema sobre sección blanca, borde de arena de 1px, esquinas generosamente redondeadas (16px), 32px de padding, sin sombra. Arriba una etiqueta con forma de píldora y contorno azul marino; abajo un pie separado por una línea con el enlace "Registrarse" y una flecha diagonal.
- **Tarjetas de fundador:** fondo crema, 16px de radio, 22px de padding, sin borde. Avatar circular de 56px con doble anillo (blanco y arena). Nombre en tinta, rol en terracota semibold y bio en gris pizarra. La última celda de la grilla es una tarjeta invertida en azul marino con la invitación a sumarse.
- **Principios del manifiesto:** sin contenedor; ícono Lucide de 28px en azul marino, una barra corta terracota de 32 × 3px y luego título y texto.
- **Timeline:** columna de años en Space Grotesk, punto terracota de 10px y línea vertical de arena de 1.5px que conecta los hitos.
- **Chips de aliados:** rectángulos blancos con borde de arena y radio de 10px; texto gris pizarra de peso medio. Sin logos por ahora.
- **Foto del hero:** esquinas muy redondeadas (20px), borde de arena, relación 4:3, con una tarjeta flotante blanca que la acompaña (isotipo del zorro, título y lugar) y tres ondas lineales tenues detrás.
- **Sombras:** el sistema es plano. Solo hay sombras muy difusas y bajas en elementos flotantes (la tarjeta del hero y el menú móvil).
- **Formularios:** no existen por ahora; el sitio es estático. Si se agregan, usar campos blancos con radio de 8px sin borde sobre fondo oscuro, o con borde de arena sobre fondo claro.

## 5. Layout Principles

- **Contenedor** de 1180px de ancho útil con canal lateral fluido (16px en móvil y hasta 40px en desktop).
- **Ritmo vertical** de 64 a 100px por sección (`clamp`), con fondos que alternan crema y blanco para marcar el paso entre bloques sin necesidad de divisores pesados.
- **Grillas:** hero 1.05fr / 0.95fr; cifras en 4 columnas con divisores verticales; manifiesto y fundadores en 4 columnas; eventos en 2; trayectoria en 0.9fr / 1.1fr. Todo colapsa a 2 y luego a 1 columna en móvil, sin scroll horizontal.
- **Header** sticky de 72px, blanco con leve transparencia y desenfoque; en móvil (menos de 900px) el menú pasa a un panel desplegable con el ícono de hamburguesa.
- **Alineación** siempre a la izquierda; los titulares de sección van arriba y a la izquierda con un párrafo introductorio de 600px como máximo.
