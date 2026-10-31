# Guía Paso a Paso: Publicar en GitHub Pages con Dominio en Porkbun

Esta guía contiene las instrucciones exactas y los comandos para poner tu sitio web en línea bajo tu dominio propio gestionado en **Porkbun**.

---

## Paso 1: Subir tus Cambios a GitHub (Terminal)

Abre la terminal en la carpeta de tu proyecto y ejecuta los siguientes comandos:

```bash
# 1. Verificar el estado de los archivos
git status

# 2. Agregar todos los cambios (incluyendo el flujo de GitHub Actions y CNAME)
git add .

# 3. Guardar el commit
git commit -m "feat: configurar despliegue automatico en GitHub Pages y CNAME de Porkbun"

# 4. Asegurar que la rama principal sea 'main'
git branch -M main

# 5. Si aún no has vinculado tu repositorio remoto de GitHub, hazlo con (reemplaza con tu usuario y repo):
# git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 6. Subir a GitHub
git push -u origin main
```

---

## Paso 2: Activar GitHub Pages en tu Repositorio

1. Entra a tu repositorio en GitHub desde el navegador: `https://github.com/TU_USUARIO/TU_REPOSITORIO`
2. Ve a la pestaña **Settings** (Configuración) en la parte superior derecha.
3. En el menú lateral izquierdo, haz clic en **Pages** (dentro de la sección *Code and automation*).
4. En la sección **Build and deployment**:
   - En el menú desplegable **Source**, selecciona: **GitHub Actions** *(¡Muy importante! No selecciones "Deploy from a branch")*.
5. En la sección **Custom domain**:
   - Escribe tu dominio tal como está en Porkbun: `whacha.site` (o tu dominio exacto).
   - Haz clic en el botón **Save**.
   - GitHub creará un registro de comprobación de DNS.
6. Espera que los DNS propaguen (Paso 3) y marca la casilla **Enforce HTTPS** para forzar navegación cifrada segura.

---

## Paso 3: Configurar los Registros DNS en Porkbun

1. Inicia sesión en tu cuenta de [Porkbun.com](https://porkbun.com).
2. Ve a **Domain Management** (Gestión de dominios).
3. Localiza tu dominio (ej. `whacha.site`) y haz clic en **Details** (Detalles).
4. Haz clic en **Edit** junto a **DNS Records**.
5. Si existen registros tipo **A** o **CNAME** anteriores (por ejemplo apuntando a parkings o páginas por defecto), elimínalos para evitar conflictos.
6. Agrega los siguientes **5 registros DNS**:

### 4 Registros Tipo A (Dominio Raíz `@`):
| Type | Host | Answer / IP Address | TTL |
| :--- | :--- | :--- | :--- |
| **A** | *(dejar vacío o poner `@`)* | `185.199.108.153` | `600` |
| **A** | *(dejar vacío o poner `@`)* | `185.199.109.153` | `600` |
| **A** | *(dejar vacío o poner `@`)* | `185.199.110.153` | `600` |
| **A** | *(dejar vacío o poner `@`)* | `185.199.111.153` | `600` |

### 1 Registro Tipo CNAME (Subdominio `www`):
| Type | Host | Answer / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `TU_USUARIO.github.io` | `600` |

*(Reemplaza `TU_USUARIO` con tu nombre de usuario exacto en GitHub, por ejemplo `jonysanchez.github.io`)*.

---

## Paso 4: Monitorear el Despliegue

1. En tu repositorio de GitHub, ve a la pestaña **Actions**.
2. Verás el flujo **Deploy to GitHub Pages** ejecutándose automáticamente.
3. Cuando aparezca con una marca verde (aprox. 1 minuto), el sitio estará en vivo.
4. Entra a tu dominio en el navegador (`https://whacha.site`) para comprobar que carga tu sitio completo con todas las animaciones, portafolio y reproductor multimedia.
