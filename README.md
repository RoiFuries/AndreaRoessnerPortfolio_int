# Andrea Roessner — Portfolio

Sitio de portafolio de **Andrea Roessner**, directora de arte / production
designer. Home animado, categorías de trabajo (comerciales, videoclips,
escenografías), páginas de detalle de proyecto y contacto — en español,
inglés y alemán.

## Stack

HTML, CSS y JavaScript planos. **Sin build step ni dependencias** — se sirve
como archivos estáticos desde cualquier hosting (Netlify, Vercel, GitHub
Pages, nginx, etc.).

## Estructura

| Archivo / carpeta            | Contenido                                                              |
| ----------------------------- | ----------------------------------------------------------------------- |
| `index.html`                  | Home — hero animado, hover que cambia el fondo por categoría           |
| `comerciales.html`            | Grid de proyectos — Comerciales                                        |
| `videoclips.html`             | Grid de proyectos — Videoclips                                         |
| `escenografias.html`          | Grid de proyectos — Escenografías                                      |
| `proyecto.html?p=<slug>`      | Detalle de proyecto (dinámico, lee el slug desde la URL)               |
| `contacto.html`               | Contacto                                                                |
| `css/style.css`                | Estilos — tokens de color y tipografía al inicio del archivo          |
| `js/data.js`                  | Datos de proyectos (título, id de Vimeo, director, productora, cliente) |
| `js/i18n.js`                  | Traducción ES/EN/DE (diccionario embebido) + switcher de idioma        |
| `js/partials.js`              | Genera el nav y el footer en cada página                               |
| `js/home.js`                  | Lógica del home (hover, animaciones)                                   |
| `js/category.js`              | Lógica de los grids por categoría                                      |
| `js/detail.js`                | Lógica de la página de detalle de proyecto                             |
| `js/contact.js`               | Lógica de la página de contacto                                        |
| `assets/`                     | Imágenes, fondos y fuentes                                              |

## Cómo correrlo localmente

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Decisiones tomadas

- **Comerciales, Videoclips y Escenografías comparten los mismos 12 proyectos
  placeholder** (mismos videos de Vimeo) mientras no haya contenido real por
  categoría. Para poner proyectos reales, solo hay que editar `js/data.js`.
- **Las 7 imágenes de la galería del detalle** (`assets/detail-g1..g7.png`)
  son las mismas para cualquier proyecto — son placeholders, reemplazar
  cuando haya fotos reales por proyecto.
- **Las traducciones EN/DE fueron redactadas por IA**, no por un traductor
  nativo — conviene revisarlas antes de publicar, sobre todo el alemán.

## Pendientes

- [ ] Contenido real de Videoclips y Escenografías (proyectos distintos a Comerciales)
- [ ] Fotos reales de galería por proyecto
- [ ] Revisión nativa de las traducciones EN/DE
- [ ] Definir hosting final (Netlify / Vercel / GitHub Pages / otro)
