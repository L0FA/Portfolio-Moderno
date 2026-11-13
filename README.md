# Portfolio — Santiago López Fabbri

Portfolio personal de desarrollador Full Stack. En producción en [portfolioslf.com](https://portfolioslf.com).

**Stack:** React 19, Vite, Tailwind CSS 4, EmailJS, lucide-react.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
npm run lint
```

El formulario de contacto necesita un `.env` con:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

La plantilla de EmailJS usa las variables `{{Nombre}}`, `{{Email}}` y `{{Mensaje}}`.

## Sumar un proyecto

Todo el contenido (proyectos, experiencia, stack, testimonios, redes) está en `src/data/portfolio.js`.

1. Guardá una captura 16:9 en `public/projects/<nombre>.webp` (1280 px de ancho alcanza).
2. Agregá un objeto al array `proyectos`:

```js
{
  title: "Nombre",
  summary: "Una oración: qué es y para quién.",
  highlights: ["Qué resolviste", "Cómo", "Un dato concreto"],
  tags: ["React", "Node.js"],
  fecha: "2026-12-01",   // inicio del proyecto; ordena la grilla (más reciente primero)
  image: "/projects/nombre.webp",
  demo: "https://...",   // opcional
  repo: "https://...",   // opcional
  status: "En desarrollo · repo privado", // opcional, para proyectos sin link público
}
```

Si `demo` o `repo` no existen, el link no se muestra. Con al menos uno de los dos, al pasar el mouse (o tocar la imagen en mobile) aparece el overlay con los botones.

## Estructura

```
src/
  data/portfolio.js   contenido del sitio
  components/         Button, Section, Tag
  layout/             Navbar, Footer
  sections/           Hero, Proyectos, Experiencia, Acerca_De, Testimonios, Contacto
  index.css           tokens de diseño (colores, fuentes)
public/               CV, foto, capturas, favicon, imagen Open Graph
```

## Sistema de diseño

- Espaciado en escala de 4 px (unidades de Tailwind).
- Un único radio (`rounded-lg`) para tarjetas, botones, inputs y etiquetas.
- Un acento (`--color-primary`); sin sombras ni gradientes.
- Tipografía: Geist para texto, Geist Mono para etiquetas y metadatos.
