# Izakaya — contexto del proyecto

Guía de arquitectura y convenciones para quien (persona o Claude) retome este
proyecto. El [web/README.md](web/README.md) cubre instalación, build y
despliegue; este archivo explica **cómo está construido por dentro** y por
qué, para poder extenderlo sin romper los patrones existentes.

## Estructura de carpetas (raíz)

```
Izakaya/
  assets-originales/   Fotos y carta originales del cliente (no tocar).
  web/                  El proyecto Vite/React. Todo el código vive aquí.
  .claude/launch.json   Preview de npm run dev, apuntando a web/.
```

**Abre Claude Code en esta carpeta raíz** (`Izakaya/`), no dentro de `web/`:
el panel de vista previa del navegador usa `.claude/launch.json`, que está
aquí y arranca `npm --prefix web run dev` — así ya apunta al sitio correcto
sin configuración extra.

## Qué es esto, en una frase

Mockup de la web de un restaurante japonés ("Izakaya"), que incluye reservas,
emails y un panel de administración **totalmente funcionales en el navegador**,
pero sin ningún backend real: todo vive en `localStorage`. Es para enseñárselo
a un cliente como si fuera el producto final, no para producción tal cual.

## Stack y comandos

Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router. Sin SSR, sin
backend, sin dependencias de runtime más allá de React. Todos los comandos se
ejecutan dentro de `web/`:

```bash
cd web
npm install
npm run dev              # servidor de desarrollo
npm run build             # tsc -b && vite build → web/dist/
npm run lint               # oxlint
npm run optimize-images   # regenera los WebP desde ../assets-originales
```

No hay suite de tests (proyecto pequeño, de un solo flujo principal). Antes de
dar por bueno un cambio: `npm run build` sin errores y revisión manual en el
navegador (móvil + escritorio, ES + EN).

## Mapa de `web/src/`

```
pages/            Una carpeta/archivo por ruta. pages/admin y pages/reservation
                   agrupan sub-rutas relacionadas.
components/        Organizados por dominio: ui/ (genéricos), layout/,
                   home/, menu/, gallery/, reservation/, admin/, contact/,
                   about/, legal/. Si un componente se usa en más de un
                   dominio, va en ui/.
config/            Constantes editables "de fábrica": datos del
                   restaurante, horarios y mesas por defecto, reglas de
                   reserva, credenciales demo, datos legales.
data/              Contenido largo/estructurado: carta, alérgenos,
                   galería, textos de "Nosotros", textos legales.
i18n/               LanguageContext + diccionarios es/en.
services/          La "capa de backend simulada" (ver más abajo).
email-templates/   Generadores de HTML de email (funciones puras).
lib/                Utilidades sin estado: fechas, formato, horarios,
                   datos estructurados SEO.
hooks/              Hooks reutilizables (incluye dos contexts: idioma y
                   consentimiento de cookies).
types/              Tipos compartidos.
```

## La pieza central: servicios simulados

`services/storage.ts` es la única capa que toca `localStorage` directamente
(prefijo de claves `izakaya:`). Todo lo demás pasa por uno de estos
servicios, cada uno con **funciones `async`** aunque por dentro sean
síncronas — así, el día que haya una API real, se sustituye el cuerpo de las
funciones sin tocar ningún componente que las llame:

- **`reservationService.ts`** — el más grande. Calcula franjas horarias a
  partir del horario vigente (`settingsService.getSchedule()`), decide qué
  mesa asignar (mejor ajuste por zona preferida, con *fallback* a otra zona),
  comprueba solapes de 90 min entre reservas, y genera ~80 reservas de
  prueba al primer arranque (`seedReservations`). Exporta también
  `isDateBookable`, `getAllSlotsForDate` y `getSlotsByService`, que usa la UI
  directamente (no son parte del "service" async porque son cálculos puros).
- **`emailService.ts`** — en vez de enviar nada, guarda cada email en un
  "buzón" (`localStorage`) y devuelve el objeto `{subject, html, to}`. Las
  plantillas están en `email-templates/` como funciones puras
  (`renderXxxEmail(reservation, locale) → {subject, html}`), para poder
  previsualizarlas sin "enviarlas" (ver `ConfirmationScreen.tsx`, que llama a
  los templates directamente, y `emailService.previewReminder`).
- **`settingsService.ts`** — horarios, mesas y días bloqueados. Por defecto
  lee de `config/hours.config.ts` y `config/tables.config.ts`; en cuanto el
  panel de admin guarda un cambio, lo persiste en `localStorage` y a partir
  de ahí manda eso. **Todo lo que muestra horario/mesas en la web pública
  (Footer, Contacto, Inicio) lee de `settingsService`, nunca de los config
  estáticos directamente** — si añades un sitio nuevo que muestre el
  horario, sigue ese patrón.
- **`adminAuthService.ts`** — compara con `config/admin.config.ts` y guarda
  una bandera. No es seguridad real, es deliberado (ver README). **Ahora
  mismo no está conectado a nada**: `/admin` es público (sin login), para
  poder enseñárselo al cliente sin fricción — hay un botón "Admin" junto al
  de "Reservar" en la cabecera. `AdminLogin.tsx` / `useAdminAuth.ts` /
  `adminAuthService.ts` siguen en el proyecto, listos para volver a
  exigirse en `AdminApp.tsx` cuando se conecte autenticación real.

`ReservationError` (clase exportada de `reservationService.ts`) es el único
tipo de error que lanzan los services; los componentes lo capturan para
mostrar mensajes amigables (p. ej. "esa franja se acaba de llenar").

## i18n

Español por defecto, inglés como alternativa, sin prefijo de idioma en la
URL (el toggle cambia el contenido al vuelo). Dos mecanismos que **no hay
que mezclar**:

1. **Textos de interfaz** (botones, títulos, labels): viven en
   `i18n/translations/{es,en}.ts`, tipados por `i18n/translations/types.ts`
   (`Dictionary`). Se consumen con `const { t } = useLanguage()` → `t.nav.home`,
   `t.reservation.summary.submit`, etc. Si añades una pantalla nueva, añade su
   sección a `types.ts` primero y luego rellena `es.ts` y `en.ts` — TypeScript
   avisará si falta alguna clave en alguno de los dos.
2. **Contenido/datos** (carta, textos legales, nombres de zona...): se
   modela como `Bilingual = { es: string; en: string }` (en `types/common.ts`)
   directamente en los archivos de `data/`. Se lee con
   `const { pick } = useLanguage()` → `pick(dish.name)`.

`useLanguage()` (de `i18n/LanguageContext.tsx`) expone `{ locale, setLocale,
toggleLocale, t, pick }`. El idioma persiste en `localStorage` y, si no hay
preferencia guardada, se detecta por `navigator.language`.

## Diseño

Tokens definidos en `src/index.css` (bloque `@theme` de Tailwind v4, no hay
`tailwind.config.js`): `paper`/`ink` (blanco/negro casi puro), `accent`
(bermellón `#bc3a2d`), fuente display `Shippori Mincho` (títulos) y `Inter`
(texto). El logo es tipográfico (`components/ui/Logo.tsx`) con un sello
("hanko") en SVG propio, **no es un carácter japonés real** — es un trazo
abstracto, a propósito, para no usar mal un kanji. Si se sustituye por un
logo de verdad del cliente, solo hay que tocar `Logo.tsx` y `Hanko.tsx` (y
los favicons en `public/`, generados desde el mismo SVG).

Animación de aparición al hacer scroll: componente `<Reveal>`
(`components/ui/Reveal.tsx`) + hook `useReveal` (IntersectionObserver). Se
usa envolviendo cualquier bloque que deba aparecer con fade-up.

## Rutas

Definidas en `App.tsx`. Dos árboles separados: `/admin/*` (su propio layout,
sin el header/footer públicos, gestionado por `pages/admin/AdminApp.tsx`
según haya sesión o no) y todo lo demás bajo `RootLayout` (header, footer,
banner de cookies, badge de demo, datos estructurados SEO).

| Ruta | Qué es |
| --- | --- |
| `/`, `/nosotros`, `/carta`, `/galeria`, `/contacto` | Páginas de marketing |
| `/reservas` | Formulario de reserva en 5 pasos |
| `/reserva/:token/{confirmar,cancelar,modificar}` | Enlaces del email de recordatorio |
| `/legal/{aviso-legal,privacidad,cookies}` | Legal |
| `/demo` | Accesos rápidos para enseñar la demo + reset de datos |
| `/admin`, `/admin/reservas`, `/admin/configuracion` | Panel (login: ver README) |

## Convenciones a seguir

- **Nunca** importar `config/hours.config.ts` o `config/tables.config.ts`
  directamente en un componente — pasar por `settingsService`, si no el
  componente no reflejará los cambios hechos desde `/admin`.
- Estado que debe compartirse entre componentes **no emparentados** va en un
  Context (ver `i18n/LanguageContext.tsx` o `hooks/CookieConsentContext.tsx`),
  nunca en un hook tipo `useLocalStorage` llamado por separado en cada sitio
  — cada llamada crea su propio estado aislado y no se sincronizan entre sí
  (nos pasó con el banner de cookies: el botón "Configurar" no lo reabría
  hasta que se movió a un Context compartido).
- No confiar en el *orden* de clases de Tailwind dentro del string de
  `className` para que una gane sobre otra (p. ej. `"opacity-50
  disabled:opacity-0"` no es fiable) — la especificidad la decide el orden
  en el CSS generado, no el orden escrito. Si hace falta forzar un valor,
  usar una clase arbitraria distinta o reestructurar para que no haya dos
  utilidades del mismo grupo compitiendo.
- `Button` (`components/ui/Button.tsx`) es polimórfico: con `to` renderiza
  `<Link>`, con `href` renderiza `<a>`, si no, `<button>`. Pasa siempre
  `type="button"` cuando sea un botón de acción fuera de un `<form>`.
- Páginas usan `useDocumentHead({ title, description })` (de
  `hooks/useDocumentHead.ts`) para título, meta-descripción y Open Graph;
  si no se pasa `description`, cae en la del sitio por defecto.
- Los 14 alérgenos UE y sus iconos SVG están centralizados en
  `data/allergens.data.ts` + `components/menu/AllergenIcon.tsx` — para
  añadir un plato nuevo, usar los `id` ya definidos ahí, no inventar otros.

## Qué falta / limitaciones conocidas

- **No hay SSR/prerender**: al ser una SPA 100% cliente, el SEO real
  (lo que ve un crawler antes de ejecutar JS) es limitado. Los datos
  estructurados, OG tags, etc. se inyectan con JS — vale para Google (que
  renderiza JS) pero no para crawlers más simples. Si el SEO es crítico,
  habría que migrar a algo con SSR/SSG (Next.js, Astro) o añadir un
  servicio de prerender.
- La lista completa de contenidos de ejemplo pendientes de confirmar con el
  cliente está en el
  [README](web/README.md#todos-para-revisar-con-el-cliente) (direcciones,
  textos legales, descripciones de carta inventadas, etc.) — no la
  dupliques aquí, mantenla solo en el README para no desincronizar.
- Sin tests automáticos. Si el proyecto crece, sería el primer hueco a
  cubrir (sobre todo `reservationService` — la lógica de disponibilidad y
  asignación de mesas es la parte con más riesgo de regresión silenciosa).
