# Izakaya — mockup de web

Mockup de la web de **Izakaya**, restaurante japonés de diseño. Está pensado para
presentárselo al cliente: se ve y funciona como una web real (incluida la
reserva de mesa, los emails de confirmación y un panel de administración),
pero **no tiene backend real**. Todo lo que normalmente dependería de un
servidor (base de datos, envío de emails, tareas programadas) está simulado
en el propio navegador, guardado en `localStorage`.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com) (rutas en el cliente)
- Sin backend: los "servicios" (`src/services/*`) simulan una API con
  `localStorage` y una pequeña latencia artificial, usando funciones `async`
  para que sustituirlos por llamadas reales no obligue a tocar los
  componentes que los usan.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. Si cambian las fotos de `assets-originales/`
(la carpeta hermana de `web/`), puedes volver a generar las versiones
optimizadas en WebP con:

```bash
npm run optimize-images
```

## Compilar para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio estático completo (HTML, CSS, JS
e imágenes optimizadas). `npm run preview` sirve esa carpeta localmente para
comprobarla antes de subirla.

## Subir a Hostinger (hosting compartido)

1. Ejecuta `npm run build`.
2. Entra al **Administrador de archivos** de Hostinger (o conéctate por FTP).
3. Sube **todo el contenido** de la carpeta `dist/` (no la carpeta en sí) a
   `public_html` (o al subdirectorio donde quieras publicar la web).
4. Asegúrate de que el archivo `.htaccess` incluido en `dist/` se sube
   también — es el que permite que rutas como `/carta` o `/admin`
   funcionen al entrar directamente o recargar la página, en vez de dar
   error 404.
5. Si vas a publicar la web en un subdirectorio (p. ej.
   `tudominio.com/izakaya/` en vez de en el dominio raíz), cambia `base` en
   `vite.config.ts` a `'/izakaya/'` antes de compilar.

No hace falta Node.js ni ninguna base de datos en el servidor: es HTML, CSS
y JS estáticos.

## Modo demo

La ruta [`/demo`](http://localhost:5173/demo) centraliza accesos rápidos
para enseñar el ciclo completo al cliente: hacer una reserva, ver los
emails simulados, las páginas de confirmar/cancelar/modificar de una
reserva de ejemplo, el panel de administración y un botón para reiniciar
los datos de prueba.

**Panel de administración:** `/admin` — usuario `admin`, contraseña
`izakaya2026` (definidos en `src/config/admin.config.ts`). Es solo un
mockup: no hay autenticación real detrás.

Los datos de reservas, horarios y mesas se guardan en el `localStorage` del
navegador, así que cada visitante/dispositivo tiene su propia copia de la
demo. El botón "Reiniciar datos" de `/demo` lo borra todo y vuelve a
generar las reservas de ejemplo.

## Dónde cambiar cada tipo de contenido

Todo el contenido editable está centralizado para no tener que tocar
componentes:

| Qué quieres cambiar | Archivo |
| --- | --- |
| Nombre, dirección, teléfono, email, redes sociales | `src/config/site.config.ts` |
| Horarios por defecto | `src/config/hours.config.ts` (editable también desde `/admin`) |
| Mesas por defecto | `src/config/tables.config.ts` (editable también desde `/admin`) |
| Reglas de reserva (días vista, duración, tamaño máximo online) | `src/config/reservation.config.ts` |
| Datos del titular para Aviso Legal / Privacidad | `src/config/legal.config.ts` |
| Carta (platos, precios, alérgenos) | `src/data/menu.data.ts` |
| Textos de Nosotros | `src/data/about.data.ts` |
| Fotos de la galería | `src/data/gallery.data.ts` |
| Textos legales | `src/data/legal.data.ts` |
| Credenciales de demo del panel | `src/config/admin.config.ts` |

## Paso a producción

Esto es un mockup: antes de lanzarlo de verdad hay que conectar tres piezas
de backend. La interfaz de cada servicio (`src/services/*.ts`) ya está
pensada para que sustituir su interior no obligue a tocar los componentes
que los usan.

### 1. Base de datos (reservas, mesas, horarios, días bloqueados)

Hoy todo se guarda en `localStorage` a través de `src/services/storage.ts`.
Para conectarlo a una base de datos real:

- Sustituir las funciones de `src/services/reservationService.ts` y
  `src/services/settingsService.ts` por llamadas `fetch` a una API propia
  (o a un backend tipo Supabase/Firebase), manteniendo la misma forma de
  cada función (mismos parámetros, mismo tipo de retorno).
- El "token" de cada reserva (usado en las URLs de confirmar/cancelar/
  modificar) debería pasar a generarse en el servidor.

### 2. Envío de emails

`src/services/emailService.ts` simula el envío guardando cada email en un
"buzón" en `localStorage`. Las plantillas ya están listas en
`src/email-templates/` (HTML con estilos en línea, pensado para clientes de
correo). Para conectarlo:

- Sustituir la función `dispatch()` de `emailService.ts` por la llamada
  real a un proveedor transaccional (p. ej. [Resend](https://resend.com),
  mencionado como ejemplo en el propio código).
- Probar las plantillas en varios clientes de correo (Gmail, Outlook, Apple
  Mail) antes de darlas por buenas: el HTML de email es más limitado que el
  de una web normal.

### 3. Tarea programada diaria (recordatorios)

El botón **"Simular envío de recordatorios de mañana"** del panel de admin
(`src/components/admin/ReminderSimulatorModal.tsx`) hace manualmente lo que
en producción debería ejecutarse solo, una vez al día: buscar las reservas
de mañana y enviarles el email de recordatorio
(`src/email-templates/reminderEmail.ts`).

Al no haber servidor propio en un hosting estático, esto requiere alguna
pieza adicional, por ejemplo:

- Una función programada (cron job) en el backend que se conecte en el
  paso 1, o
- Una Edge Function / Scheduled Function (Supabase, Vercel Cron, etc.) que
  llame a la misma lógica que ya usa `ReminderSimulatorModal.tsx`.

### 4. Autenticación del panel de administración

`src/services/adminAuthService.ts` compara usuario/contraseña con un valor
fijo en `src/config/admin.config.ts` y guarda una bandera en `localStorage`.
Antes de usarlo en producción hay que sustituirlo por autenticación real
(usuario/contraseña con hash en servidor, o un proveedor tipo Auth0/
Supabase Auth), y proteger las rutas `/admin/*` también del lado servidor.

## TODOs para revisar con el cliente

El código marca con `// TODO: confirmar con el cliente` todo lo que es un
valor de ejemplo y no un dato real. Resumen de lo más importante:

- **Datos de contacto**: teléfono, email y redes sociales son de ejemplo
  (`src/config/site.config.ts`). La dirección ya es la real.
- **Coordenadas del mapa**: aproximadas (centro de Galapagar); el mapa de
  Contacto ya apunta a la dirección correcta porque usa la dirección en
  texto, no estas coordenadas — solo afecta a los datos estructurados SEO.
- **Horarios**: los de prueba que indicaste (martes a domingo, comidas y
  cenas; lunes cerrado), no había `horarios.txt`.
- **Carta**: descripciones inventadas donde la carta fotografiada no las
  traía (ambas Tempuras, Panacotta, Crumble). El plato **Carpaccio** es
  completamente de ejemplo (nombre real tomado de la foto suelta en
  `assets-originales/`, pero descripción, precio y alérgenos inventados) —
  probablemente pertenecía a otra página de la carta que no se incluyó.
- **Alérgenos**: asignados a partir de los iconos de la carta original más
  los ingredientes citados explícitamente en cada descripción; conviene que
  cocina confirme la lista definitiva y las trazas.
- **Textos de "Nosotros"**: historia, filosofía y cocina son un texto de
  ejemplo con tono coherente, pensado para que el cliente lo reescriba con
  la historia real del restaurante.
- **Datos identificativos legales**: razón social, CIF, domicilio social e
  inscripción registral son de ejemplo (`src/config/legal.config.ts`);
  necesarios para el Aviso Legal y la Política de Privacidad.
- **Cookies de analítica**: la política de cookies menciona Google
  Analytics como ejemplo de cookie analítica, pero no está activa en el
  sitio — si se añade analítica real hay que actualizar esa tabla.
- **Mesas de prueba**: el plano de 16 mesas (`src/config/tables.config.ts`)
  es el que describiste; edítalo libremente desde `/admin` si el real es
  distinto.
