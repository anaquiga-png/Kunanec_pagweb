# Kunan Salud Ecuador — landing

Vite + React + TypeScript + Tailwind CSS. Los leads del formulario van a **HubSpot** (recomendado) y, opcionalmente, a Supabase (`kunan_leads`).

**Hosting recomendado:** [Vercel](https://vercel.com) + dominio en [GoDaddy](https://www.godaddy.com) (HTTPS automático, previews por rama, encaja con Vite). El repo incluye [`vercel.json`](vercel.json) con build y salida `dist`.

## Setup

```bash
npm install
# Si no existe .env.local:
cp .env.example .env.local
```

### Subir el proyecto a GitHub con SSH (recomendado)

En la carpeta del proyecto **ya está inicializado Git** y hay commits listos. Autenticación por **SSH** (sin contraseña de GitHub en cada `push`).

#### 1) Clave SSH en tu Mac

Si **no** existe `~/.ssh/id_ed25519` todavía, créala:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com" -f ~/.ssh/id_ed25519
```

(Pulsa Enter para la frase opcional, o elige una para más seguridad.) Si ese archivo **ya existe**, no vuelvas a generar con el mismo `-f` o la sobrescribirías; pasa directo al paso 2.

Muestra la clave **pública** (toda una sola línea que empieza por `ssh-ed25519`):

```bash
cat ~/.ssh/id_ed25519.pub
```

#### 2) Registrar la clave en GitHub

1. Copia el contenido de `id_ed25519.pub`.  
2. GitHub → tu avatar → **Settings** → **SSH and GPG keys** → **New SSH key**.  
3. Título: por ejemplo `Mac personal`. Pega la clave → **Add SSH key**.

#### 3) Probar conexión

```bash
ssh -T git@github.com
```

Debería salir algo como: `Hi TU-USUARIO! You've successfully authenticated...`

#### 4) Crear el repo vacío y hacer push

1. [github.com/new](https://github.com/new) → nombre (ej. `pagweb-kunan`) → **Private** si quieres → **sin** README / .gitignore / licencia → **Create repository**.  
2. En la carpeta del proyecto (sustituye `TU-USUARIO` y `TU-REPO`):

```bash
cd "/Users/anaquirola/pagweb kunan"
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:TU-USUARIO/TU-REPO.git
git push -u origin main
```

Si ya habías añadido `origin` con HTTPS: `git remote set-url origin git@github.com:TU-USUARIO/TU-REPO.git`

**Opcional:** en `~/.ssh/config` puedes fijar la clave para GitHub:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

Para que tus commits muestren tu nombre y correo: `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu@email.com"`.

### Conectar Supabase (opcional)

Solo si quieres una copia en base de datos además de HubSpot.

1. En [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **Settings → API**.
2. Copia **Project URL** y la clave **anon public** (no uses `service_role` en el front).
3. En `.env.local` rellena:
   - `VITE_SUPABASE_URL=https://xxxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=eyJ...`
4. En **SQL Editor**, ejecuta el script [`supabase/migrations/001_kunan_leads.sql`](supabase/migrations/001_kunan_leads.sql) (tabla `kunan_leads` + RLS para insert anónimo).
5. Reinicia el servidor: `npm run dev`.

### Opcional: GA4, Meta Pixel y URLs (mismo `.env.local`)

Todo esto es **opcional**: si dejas las claves vacías, la web funciona igual; solo no cargan scripts de terceros o usan valores por defecto en SEO.

| Variable | Para qué sirve | Dónde obtenerla |
|----------|----------------|-----------------|
| `VITE_GTM_CONTAINER_ID` | Snippet de **Google Tag Manager** en el HTML (lo que pide “Instalar GTM”). Prioridad sobre GA4 en el build. | [Google Tag Manager](https://tagmanager.google.com/) → tu contenedor → **ID** `GTM-XXXXXXX`. Configura GA4 como tag dentro de GTM. |
| `VITE_GA4_MEASUREMENT_ID` | Snippet **GA4 (gtag)** en el HTML si no hay GTM; eventos `form_view`, `lead_submit`, `cta_click`, etc. | [Google Analytics](https://analytics.google.com/) → Admin → **Data streams** → **Measurement ID** `G-XXXXXXXX`. |
| `VITE_META_PIXEL_ID` | Carga el pixel de Meta: `PageView` al cargar; en la app también `Lead` (envío exitoso del formulario) y `Contact` (“Hablar con un asesor”). | [Meta Events Manager](https://business.facebook.com/events_manager) → **Fuentes de datos** → tu pixel → **ID del pixel** (solo números). |
| `VITE_SITE_CANONICAL_URL` | `<link rel="canonical">` y URL en JSON-LD del negocio local. Debe ser la URL **definitiva** de esta landing (con `https://`). | La URL pública real, ej. `https://ecuador.kunansalud.com` o la de Vercel/Netlify en producción. |
| `VITE_PUBLIC_SITE_URL` | Origen público **sin barra final**: JSON-LD `@id`, `og:url` si no hay canonical, y fallback del logo en datos estructurados. | Ej. `https://ecuador.kunansalud.com` |
| `VITE_OG_IMAGE_URL` | Imagen absoluta para **Open Graph** / LinkedIn (1200×630 recomendado). Si no la pones, se usa `{VITE_PUBLIC_SITE_URL}/favicon.svg`. | URL completa a un `.png` o `.jpg` en tu CDN o `public/` servido en producción. |

Implementación: inyección en `index.html` al hacer `npm run build` ([`vite-plugin-inject-analytics.ts`](vite-plugin-inject-analytics.ts)); eventos en [`src/lib/tracking.ts`](src/lib/tracking.ts). **En Vercel** debes definir las mismas `VITE_*` en *Settings → Environment Variables* y volver a desplegar, o el HTML de producción no llevará tags.

**CRM (HubSpot):** destino principal de leads — ver [HubSpot](#hubspot-formulario-de-leads). Supabase es opcional.

### HubSpot (formulario de leads)

**Modo recomendado (solo HubSpot):** no configures `VITE_SUPABASE_*`. En Vercel define `HUBSPOT_PORTAL_ID` y `HUBSPOT_FORM_GUID`; cada envío va directo a HubSpot.

**Modo dual:** con Supabase + HubSpot, primero se guarda en Supabase y HubSpot se intenta en paralelo (si HubSpot falla, el usuario igual ve éxito).

#### Flujo al enviar el formulario (importante)

Cada envío dispara **en paralelo** (mismo formulario de la landing):

| Destino | Para qué | ¿Depende de Supabase? |
|---------|----------|------------------------|
| **n8n** (`VITE_N8N_WEBHOOK_URL`) | Correos y automatizaciones | **No** — va directo desde el navegador |
| **HubSpot** (`HUBSPOT_*` en Vercel) | CRM / contactos | **No** |
| **Supabase** (`VITE_SUPABASE_*`) | Copia en base de datos | — |

Si **Supabase está pausado** (plan gratis sin actividad ~7 días), el formulario **sigue funcionando** siempre que **n8n** o **HubSpot** respondan. El usuario ve éxito y el correo puede salir igual.

**Supabase pausado:** en el [dashboard de Supabase](https://supabase.com/dashboard) → tu proyecto → **Restore project**. Para evitar pausas: plan de pago, o un ping periódico al API (p. ej. cron semanal); lo crítico (correo + CRM) ya no depende solo de Supabase.

Código: [`src/lib/lead-delivery.ts`](src/lib/lead-delivery.ts).

#### 1) Crear el formulario en HubSpot

1. [HubSpot](https://app.hubspot.com) → **Marketing** → **Formularios** → **Crear formulario** (formulario normal, no popup).
2. Añade campos con estos **nombres internos** (deben coincidir):

| Campo en la landing | Nombre interno en HubSpot | Tipo sugerido |
|---------------------|---------------------------|---------------|
| Nombre | `firstname` + `lastname` | Nombre (HubSpot lo parte solo; enviamos ambos) |
| Email | `email` | Email |
| Teléfono | `phone` | Teléfono |
| Empresa | `company` | Texto de una línea |
| Cargo | `jobtitle` | Texto de una línea |
| Mensaje + metadatos | `message` | Área de texto multilínea |

3. Activa **Crear contacto** / asociar envíos a contactos (opción del formulario).
4. Publica el formulario.
5. Obtén:
   - **Portal ID** (ID de cuenta): *Configuración* → *Información de la cuenta* → ID del portal, o en la URL `app.hubspot.com/contacts/{portalId}/...`
   - **Form GUID**: en el formulario → *Compartir* / *Integrar* → API de envío, o URL `.../forms/{formGuid}`.

#### 2) Variables en Vercel

En **Settings → Environment Variables** (Production):

| Variable | Valor |
|----------|--------|
| `HUBSPOT_PORTAL_ID` | Tu ID de portal (solo números) |
| `HUBSPOT_FORM_GUID` | GUID del formulario |

**Redeploy** después de guardar.

#### 3) Probar

1. Envía el formulario en producción.
2. En HubSpot → **Contactos** o **Envíos de formulario** debe aparecer el lead.
3. Tipo de organización, volumen y UTM van dentro del campo **message** (bloque bajo `---`).

#### Desarrollo local

- Con API serverless: `npx vercel dev` y las mismas `HUBSPOT_*` en `.env.local`.
- Sin Vercel: añade `VITE_HUBSPOT_PORTAL_ID` y `VITE_HUBSPOT_FORM_GUID` en `.env.local` (el navegador llama directo a HubSpot).

Código: [`src/lib/crm.ts`](src/lib/crm.ts), [`src/lib/hubspot-lead.ts`](src/lib/hubspot-lead.ts), [`api/hubspot-lead.ts`](api/hubspot-lead.ts).

### Banner LinkedIn

| Uso | Archivo | Contenido |
|-----|---------|-----------|
| Página / empresa | [`public/linkedin-banner-kunan-ec.png`](public/linkedin-banner-kunan-ec.png) | Degradado + frase (sin logo) |
| Perfiles de empleados | [`public/linkedin-banner-kunan-empleado.png`](public/linkedin-banner-kunan-empleado.png) | Degradado + logo + frase en la **mitad derecha** (izquierda libre para la foto de perfil) |

Tamaño: **1584 × 396 px**. Subir en LinkedIn → **Editar imagen de portada**.

Logo transparente (icono + texto blanco, para fondos morados): [`public/logo_kunan-negativo-transparent.png`](public/logo_kunan-negativo-transparent.png) — generado desde `logo_kunan-1.png` con `node scripts/process-logo-transparent.mjs`.

Regenerar banners:

```bash
npm install --no-save sharp   # solo si falta
node scripts/process-logo-transparent.mjs
node scripts/generate-linkedin-banner.mjs
node scripts/generate-linkedin-banner-empleado.mjs
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview production build

Si aún no ejecutaste el SQL en Supabase, los inserts del formulario fallarán hasta que exista la tabla `kunan_leads` y las políticas RLS. **Si usas solo HubSpot, puedes ignorar Supabase.**

## Publicar en internet (Vercel + dominio GoDaddy)

Esta app es estática: `npm run build` genera **`dist/`**. La opción que usamos como referencia es **Vercel** (archivo [`vercel.json`](vercel.json): framework Vite, mismo comando de build que en local).

### Otras plataformas (si no usas Vercel)

| Plataforma | Nota |
|------------|------|
| [Netlify](https://www.netlify.com) | Mismo idea: `npm run build`, carpeta `dist`. |
| [Cloudflare Pages](https://pages.cloudflare.com) | Build `npm run build`, salida `dist`. |

### 2. Variables de entorno en Vercel (importante)

En Vite, las variables `VITE_*` se **inyectan al compilar**. En Vercel: proyecto → **Settings** → **Environment Variables** → añade las mismas claves que en `.env.local` (marca al menos **Production**; opcional **Preview** para ramas).

Mínimo para leads: `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`. Opcional: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Cuando tengas dominio propio: `VITE_SITE_CANONICAL_URL` y `VITE_PUBLIC_SITE_URL` con tu URL real (`https://tudominio.com`; en `VITE_PUBLIC_SITE_URL` **sin** `/` final). Luego **Redeploy** para que el nuevo build las incluya.

### 3. Conectar el dominio de GoDaddy a Vercel

Tienes **dos caminos** (Vercel te indica cuál al añadir el dominio):

**A) Cambiar nameservers en GoDaddy** (a menudo lo más simple)  
1. Vercel → proyecto → **Settings** → **Domains** → añade `tudominio.com` y copia los **nameservers** (p. ej. `ns1.vercel-dns.com`).  
2. GoDaddy → **Mis productos** → tu dominio → **DNS** / **Servidores de nombres** → sustituir por los de Vercel → guardar.  
3. Espera propagación (minutos u horas).

**B) Mantener DNS en GoDaddy**  
1. En **Domains**, Vercel muestra registros **A** / **CNAME** concretos.  
2. GoDaddy → **DNS** → **Administrar zonas** → créalos tal cual (incluido `www` si lo añadiste en Vercel).

Vercel emitirá **HTTPS** cuando el dominio quede verificado.

### 4. Comprobar

- Abre `https://tudominio.com` y prueba el formulario.  
- En Supabase deberían seguir apareciendo filas en `kunan_leads`.  
- El proyecto declara **`engines.node`: `>=20`** en `package.json` para alinear con el runtime de Vercel.

### Paso a paso: Vercel + GitHub + dominio en GoDaddy

Asumimos que el código del proyecto está en un repositorio **GitHub** (si no, créalo y sube la carpeta del proyecto).

#### A) Subir la web a Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión (puedes usar **Continue with GitHub**).
2. **Add New…** → **Project** → **Import** tu repositorio `pagweb-kunan` (o como se llame).
3. Vercel suele detectar **Vite** solo. Comprueba:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist` (si no aparece solo, ponlo a mano).
4. Antes de **Deploy**, abre **Environment Variables** y añade (mínimo, copiando de tu `.env.local`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`  
   Opcional: `VITE_GA4_MEASUREMENT_ID`, `VITE_META_PIXEL_ID`, `VITE_SITE_CANONICAL_URL`, `VITE_PUBLIC_SITE_URL`, `VITE_OG_IMAGE_URL`.  
   Para la primera publicación puedes poner en `VITE_SITE_CANONICAL_URL` y `VITE_PUBLIC_SITE_URL` la URL temporal que te da Vercel (`https://tu-proyecto.vercel.app`) y **cuando tengas el dominio**, cámbialas a `https://tudominio.com` y vuelve a desplegar (**Redeploy**).
5. Pulsa **Deploy**. Cuando termine, tendrás una URL `https://….vercel.app` funcionando.

#### B) Enlazar tu dominio de GoDaddy

1. En Vercel: tu proyecto → **Settings** → **Domains** → escribe tu dominio (ej. `tudominio.com` y también `www.tudominio.com`) → **Add**.
2. Vercel te mostrará qué hacer en DNS. Suele ser una de estas dos cosas:
   - **Nameservers:** Vercel te da 2–4 nameservers (tipo `ns1.vercel-dns.com`). En GoDaddy: **Mis productos** → dominio → **DNS** / **Servidores de nombres** → sustituir los de GoDaddy por los de Vercel → guardar.
   - **Solo registros:** si no quieres cambiar nameservers, en GoDaddy **DNS** → **Administrar zonas** y añade exactamente los registros **A** / **CNAME** que indique Vercel (copiar y pegar).
3. Espera unos minutos (a veces más). Vercel marcará el dominio como válido y activará **HTTPS** solo.

#### C) Último ajuste

Cuando `https://tudominio.com` ya abra la web, en Vercel vuelve a **Environment Variables**, pon `VITE_SITE_CANONICAL_URL` y `VITE_PUBLIC_SITE_URL` con esa URL real (`VITE_PUBLIC_SITE_URL` **sin** `/` al final) y haz **Deployments** → **⋯** en el último deploy → **Redeploy**.

---

**Si no usas GitHub:** en Vercel también puedes instalar la CLI (`npm i -g vercel`), ejecutar `npm run build` en tu PC y `vercel --prod` en la carpeta del proyecto; el dominio se configura igual en **Settings → Domains**. Sin Git, cada cambio lo subes con la CLI o arrastrando carpeta en otros hosts (p. ej. Netlify Drop).
