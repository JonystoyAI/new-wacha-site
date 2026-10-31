# Despliegue de Sitio en GitHub Pages con Dominio Personalizado de Porkbun

Plan detallado para publicar el sitio web de Wacha Multimedia en GitHub Pages utilizando automatización con GitHub Actions, garantizando persistencia del dominio propio registrado en Porkbun y certificado SSL/HTTPS gratuito automático.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario:**
> - **Plataforma de Despliegue:** GitHub Pages gestionado mediante el flujo de trabajo automatizado de GitHub Actions.
> - **Estado del Repositorio:** El usuario ya cuenta con cuenta en GitHub y el repositorio preparado.
> - **Dominio Propio:** Dominio adquirido en **Porkbun** (e.g., `whacha.site` o `whachas.site`).
>
> **Punto clave a validar antes de aplicar:**
> - El archivo actual `CNAME` en la raíz contiene `whachas.site`. Si tu dominio exacto en Porkbun es `whacha.site` (sin la 's'), se corregirá a `whacha.site` tanto en la raíz como en la carpeta `public/` para que Vite lo incluya en `dist/` en cada compilación.

- **Decisión Confirmada 1**: Usar GitHub Actions con el artefacto generado por `npm run build` (`./dist`).
- **Decisión Confirmada 2**: Configurar registros DNS directos en Porkbun apuntando a las IPs oficiales de GitHub Pages con HTTPS forzado.

---

## 1. Overview & Core Concept

- **Qué hace:** Configura el flujo completo de entrega continua (CI/CD) para compilar la aplicación React + Vite y publicarla en producción en GitHub Pages cada vez que se sube un cambio a la rama `main`.
- **Integración con Porkbun:** Asocia el dominio propio adquirido en Porkbun al sitio web, proveyendo certificados SSL Let's Encrypt administrados por GitHub y redirección automática `www` <-> raíz.
- **Resultado final:** Tu sitio quedará disponible públicamente y seguro (HTTPS) bajo tu dominio en Porkbun con actualizaciones automáticas al hacer `git push`.

---

## 2. Experiencia de Usuario & Flujo Operativo

### Flujo del Desarrollador (Tú subiendo cambios)
1. **Comando único de actualización:** Realizas cambios en el código -> `git add .` -> `git commit -m "..."` -> `git push origin main`.
2. **Compilación automática en la nube:** GitHub Actions detecta el commit, instala dependencias con Node.js 20, ejecuta `npm run build` y despliega la carpeta de distribución a la red global de GitHub.
3. **Disponibilidad inmediata:** El sitio queda en línea en menos de 60 segundos sin requerir servidores manuales.

### Flujo del Visitante
1. El visitante escribe tu dominio en el navegador (ejemplo: `https://whacha.site`).
2. Los servidores DNS de Porkbun dirigen la solicitud a la red Anycast de GitHub Pages.
3. GitHub Pages entrega la aplicación compilada con compresión Brotli/Gzip, HTTPS activo y respuesta de latencia mínima.

---

## 3. Decisiones Técnicas y Ajustes de Configuración

### 1. Ubicación de `CNAME` en Vite
- **Problema:** En proyectos Vite, los archivos estáticos que deben copiarse intactos a la salida `dist/` deben estar dentro de la carpeta `/public/`. Si el archivo `CNAME` está solo en la raíz, cada ejecución de GitHub Actions compilará `dist/` sin `CNAME`, provocando que GitHub Pages desvincule el dominio personalizado.
- **Solución:** Ubicar `CNAME` en `/public/CNAME` (y mantenerlo en la raíz), garantizando que siempre se despliegue en `./dist/CNAME`.

### 2. Configuración en `vite.config.ts` (Base URL)
- Al utilizar un dominio personalizado (como `whacha.site`), la propiedad `base` en `vite.config.ts` debe permanecer como `'/'` (raíz), permitiendo rutas absolutas limpias para fuentes, scripts e imágenes como el logo `/wacha_logo.jpg`.

### 3. Configuración DNS en Porkbun
GitHub Pages requiere 4 registros tipo **A** (para el dominio raíz `@`) y un registro **CNAME** (para el subdominio `www`):

| Tipo | Host / Subdominio | Valor / Destino | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (o en blanco) | `185.199.108.153` | 600 o Auto |
| **A** | `@` (o en blanco) | `185.199.109.153` | 600 o Auto |
| **A** | `@` (o en blanco) | `185.199.110.153` | 600 o Auto |
| **A** | `@` (o en blanco) | `185.199.111.153` | 600 o Auto |
| **CNAME** | `www` | `<tu-usuario-de-github>.github.io` | 600 o Auto |

---

## 4. Arquitectura del Sistema & Secuencia de Despliegue

```
┌─────────────────────────┐
│     Repositorio Git     │
│   (Rama: origin/main)   │
└────────────┬────────────┘
             │ git push
             ▼
┌────────────────────────────────────────────────────────┐
│             GitHub Actions (.github/workflows)         │
│  1. Checkout código                                    │
│  2. Setup Node.js 20                                   │
│  3. npm install && npm run build                       │
│  4. Copia /public/CNAME -> /dist/CNAME                 │
│  5. Upload artifact & Deploy to GitHub Pages           │
└────────────┬───────────────────────────────────────────┘
             │ Servido globalmente
             ▼
┌─────────────────────────┐       DNS Lookup       ┌─────────────────────────┐
│      GitHub Pages       │ ◄───────────────────── │    Porkbun DNS Server   │
│  (Certificado SSL/TLS)  │                        │ (A: 185.199.x.x / CNAME)│
└────────────┬────────────┘                        └────────────┬────────────┘
             │                                                  ▲
             │ Carga segura HTTPS                               │ Visita web
             ▼                                                  │
┌───────────────────────────────────────────────────────────────┴────────────┐
│                        Navegador del Usuario                               │
│                     https://whacha.site                                    │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Pasos de Ejecución que Realizaremos

1. **Ajuste de Archivos en el Proyecto:**
   - Asegurar que `public/CNAME` contenga el nombre exacto de tu dominio (ej. `whacha.site`).
   - Validar y optimizar el workflow `.github/workflows/deploy.yml` para GitHub Pages con permisos nativos (`pages: write`, `id-token: write`).
   - Crear un script guía / archivo `DEPLOY_GUIDE.md` con los comandos Git listos para copiar y pegar en tu terminal.

2. **Configuración en GitHub (Pasos que harás en la interfaz web de GitHub):**
   - Ir a tu repositorio en GitHub -> **Settings** -> **Pages**.
   - En **Build and deployment** > **Source**, seleccionar: **GitHub Actions**.
   - En **Custom domain**, ingresar tu dominio (ej. `whacha.site`) y presionar **Save**.
   - Marcar la casilla **Enforce HTTPS** (se activará una vez que los DNS de Porkbun propaguen).

3. **Configuración en Porkbun (Pasos que harás en el panel de Porkbun):**
   - Entrar a [Porkbun.com](https://porkbun.com) -> **Domain Management** -> Clic en **Details** de tu dominio -> Clic en **DNS Records**.
   - Borrar cualquier registro tipo A o CNAME existente que apunte a parkings o servidores viejos.
   - Añadir los 4 registros **A** con las IPs de GitHub y el registro **CNAME** para `www`.
