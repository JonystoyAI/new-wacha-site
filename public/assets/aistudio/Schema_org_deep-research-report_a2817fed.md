# Schema.org y Grafos de Conocimiento: De HTML Básico a Entidades Reconocidas por Google

**Resumen Ejecutivo:** Los datos estructurados (Schema.org) son un formato estandarizado que facilita a Google comprender el contenido de tus páginas web. Al marcar elementos clave (persona, organización, artículo, producto, evento) con vocabulario de Schema.org, Google puede indexar esa información en su Knowledge Graph y mostrar *rich results* o fragmentos enriquecidos en las búsquedas. Por ejemplo, sitios como Rotten Tomatoes aumentaron en un 25% su tasa de clics usando datos estructurados. Google **recomienda usar JSON-LD** por ser fácil de implementar y mantener, aunque también acepta Microdatos y RDFa. En esta guía técnica mostraremos desde cero cómo integrar Schema.org en HTML básico hasta lograr que Google reconozca tus entidades (Person, Organization, Article, Product, Event). Incluiremos ejemplos en HTML (Microdatos) y JSON-LD, mejores prácticas SEO/AEO (vocabularios, datos vinculados, canonical, hreflang), un checklist de implementación, una tabla comparativa de formatos y pautas de diagnóstico de errores (con el uso de la **Prueba de Resultados Enriquecidos** y Search Console). Finalmente, se presentan sugerencias para redes sociales, meta tags Open Graph/Twitter Card, un diagrama mermaid del flujo y una imagen conceptual SVG/PNG para ilustrar el proceso.

## Meta información recomendada

- **Meta Title:** Schema.org y Grafos de Conocimiento: Guía práctica SEO (≤60 caracteres)  
- **Meta Description:** Aprende a usar datos estructurados (Schema.org, JSON-LD, microdatos) para que Google entienda tus páginas, mejore el SEO/AEO y reconozca entidades en su Knowledge Graph (≤160 caracteres).  
- **URL Slug sugerido:** `schema-org-grafos-conocimiento`  
- **Encabezados sugeridos:**  
  - `# Schema.org y Grafos de Conocimiento: De HTML Básico a Entidades Reconocidas por Google` (título principal)  
  - `## Resumen ejecutivo`  
  - `## ¿Qué son Schema.org y los datos estructurados?`  
  - `## ¿Cómo aprovecha Google los datos estructurados?`  
  - `## Ejemplos de marcado estructurado`  
    - `### Persona (Person)`  
    - `### Organización (Organization)`  
    - `### Artículo (Article/NewsArticle)`  
    - `### Producto (Product)`  
    - `### Evento (Event)`  
  - `## Buenas prácticas SEO y AEO con datos estructurados`  
  - `## Comparativa de formatos: Microdatos vs RDFa vs JSON-LD`  
  - `## Checklist de implementación y errores comunes`  
  - `## Pruebas y herramientas`  
  - `## Conclusión`

## ¿Qué son Schema.org y los datos estructurados?

Schema.org es un vocabulario estandarizado de *datos estructurados* que define **tipos** (Person, Organization, Article, Product, Event, etc.) y sus **propiedades** (name, datePublished, location, price, etc.). Permite etiquetar partes del contenido HTML de forma semántica, ya sea mediante **Microdatos** (atributos en etiquetas HTML), **RDFa** o **JSON-LD** (un bloque `<script>` en JSON). Google y otros motores de búsqueda usan estos datos para entender el significado real de tu página. Por ejemplo, en una página de recetas, los ingredientes o el tiempo de cocción marcados como datos estructurados permiten a Google ofrecer un resultado enriquecido específico para recetas. La mayoría de las implementaciones usan el vocabulario de Schema.org, y Google sugiere consultar su documentación para conocer las propiedades requeridas y recomendadas para cada tipo de contenido.

Schema.org provee cientos de tipos y propiedades; puedes explorar la [vocabularios oficiales](https://schema.org) para elegir el adecuado según tu contenido. Al incluir estos marcados, indicas a Google exactamente *qué* representa cada fragmento de tu página. **Importante:** no crees páginas vacías o datos ocultos solo para markup – el contenido marcado debe ser visible al usuario. También debes incluir todas las propiedades *requeridas* para que tu objeto sea elegible y cuantas más propiedades recomendadas precisas añadas, mayores serán las probabilidades de un resultado enriquecido. Evita vocabularios obsoletos (por ejemplo, data-vocabulary.org ya no es válido para Google).

## ¿Cómo aprovecha Google los datos estructurados?

Google Search utiliza los datos estructurados del sitio web para **comprender el contenido de la página y recopilar información sobre el mundo real**. Por ejemplo, si marcas una página de noticia con un `NewsArticle`, Google mostrará el título, la fecha y el autor en el resultado de búsqueda (como se ve en *Top stories*). Esto también permite búsquedas más ricas: un usuario podría filtrar noticias por autor o tema gracias a este etiquetado.

Además, los datos estructurados contribuyen al **Knowledge Graph** de Google, que es la base de datos de hechos y entidades (personas, lugares, organizaciones) que alimenta las fichas de conocimiento (knowledge panels) y respuestas directas. El Knowledge Graph se genera automáticamente con información pública (Wikipedia, datos oficiales, datos de usuario). Si tu sitio marca correctamente los datos, Google puede asociarlos a entidades del Knowledge Graph. Por ejemplo, usar la propiedad `sameAs` con enlaces a la página de Wikipedia o perfil oficial vincula tu contenido a la entidad correcta, reforzando la veracidad de la información. 

En resumen, bien aplicado, el marcado Schema.org ayuda a Google a indexar tu contenido (desde HTML básico hasta sus tablas estructuradas) y a presentar esos datos como resultados enriquecidos o en un Knowledge Panel.

```mermaid
flowchart LR
  HTML[HTML básico] --> Schema[Datos estructurados (Schema.org)]
  Schema --> Index[Indexación de Google]
  Index --> KG[Grafo de Conocimiento]
  KG --> Rich[Resultado enriquecido en búsqueda]
```

## Ejemplos de marcado estructurado

A continuación se muestran ejemplos de cómo marcar con Schema.org cinco tipos comunes de entidades. Cada ejemplo incluye **Microdatos** embebidos en HTML y **JSON-LD** en un bloque `<script>`.

- **Persona (`Person`)**: Ideal para autores, figuras públicas, staff. Propiedades típicas: `name`, `jobTitle`, `email`, `affiliation`, `sameAs`, etc. Ejemplo de microdatos:
  ```html
  <div itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Jane Doe</span><br/>
    <img src="janedoe.jpg" itemprop="image" alt="Foto de Jane Doe"/>
    <span itemprop="jobTitle">Profesora</span><br/>
    <span itemprop="email">jane.doe@ejemplo.com</span>
  </div>
  ```.  
  El equivalente en JSON-LD (en `<head>` o antes del `</body>`):
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jane Doe",
    "jobTitle": "Profesora",
    "email": "jane.doe@ejemplo.com",
    "image": "https://ejemplo.com/janedoe.jpg"
  }
  </script>
  ```.  
  Google podrá reconocer a “Jane Doe” como persona si existe contexto público (p.ej. Wikipedia) y enlazar el perfil con su Knowledge Graph. Es recomendable agregar `sameAs` con enlaces a perfiles oficiales (LinkedIn, Twitter, Wikipedia) para mayor exactitud.

- **Organización (`Organization`)**: Para empresas, ONG, instituciones. Propiedades: `name`, `address`, `telephone`, `email`, `url`, `logo`, etc. Ejemplo de microdatos:
  ```html
  <div itemscope itemtype="https://schema.org/Organization">
    <span itemprop="name">Ejemplo S.A.</span><br/>
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      Calle Falsa 123, <span itemprop="addressLocality">Ciudad</span>
    </div>
    <span itemprop="telephone">+52 55 1234 5678</span><br/>
    <a href="mailto:contacto@ejemplo.com" itemprop="email">contacto@ejemplo.com</a>
  </div>
  ```.  
  En JSON-LD:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ejemplo S.A.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Falsa 123",
      "addressLocality": "Ciudad"
    },
    "telephone": "+525512345678",
    "email": "contacto@ejemplo.com",
    "url": "https://ejemplo.com"
  }
  </script>
  ```.  
  Marcar la dirección (`PostalAddress`) y otros datos ayuda a Google a entender la entidad Organizacional, útil para mostrar perfiles de empresa en búsquedas locales.

- **Artículo (`Article`/`NewsArticle`/`BlogPosting`)**: Indicado para noticias y blogs. Propiedades clave: `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`, etc. Ejemplo JSON-LD para una noticia:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Título de la Noticia",
    "image": [
      "https://ejemplo.com/imagen1.jpg",
      "https://ejemplo.com/imagen2.jpg"
    ],
    "datePublished": "2025-01-15T08:00:00+00:00",
    "dateModified": "2025-01-16T09:30:00+00:00",
    "author": [
      {
        "@type": "Person",
        "name": "Juan Pérez"
      }
    ]
  }
  </script>
  ```.  
  Con microdatos sería:
  ```html
  <div itemscope itemtype="https://schema.org/NewsArticle">
    <div itemprop="headline">Título de la Noticia</div>
    <meta itemprop="image" content="https://ejemplo.com/imagen1.jpg" />
    <span itemprop="datePublished" content="2025-01-15T08:00:00+00:00">
      15 de enero de 2025
    </span>
    por 
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">Juan Pérez</span>
    </span>
  </div>
  ```.  
  Google usará estos datos para mostrar fecha de publicación, autor e incluso imágenes en los resultados de búsqueda (véase *Top stories* o resultados enriquecidos de noticias).

- **Producto (`Product`)**: Para tiendas y catálogos. Propiedades importantes: `name`, `image`, `description`, `offers` (precio y disponibilidad), `aggregateRating`, `review`. Ejemplo JSON-LD:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Nombre del Producto",
    "image": "https://ejemplo.com/producto.jpg",
    "description": "Descripción breve del producto",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "49.99",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
  ```.  
  Un ejemplo con microdatos (RDFa) sería:
  ```html
  <div itemscope itemtype="https://schema.org/Product">
    <span itemprop="name">Producto X</span><br/>
    <img itemprop="image" src="producto.jpg" alt="Producto X"/><br/>
    <span itemprop="description">Breve descripción.</span><br/>
    <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      <span itemprop="priceCurrency" content="USD">$</span>
      <span itemprop="price" content="49.99">49.99</span>
      <link itemprop="availability" href="https://schema.org/InStock"/> En stock
    </div>
  </div>
  ```.  
  Con esto, Google puede mostrar precio y estado de stock directamente en los resultados (rich snippet de producto).

- **Evento (`Event`)**: Para conferencias, conciertos, etc. Propiedades: `name`, `location`, `startDate`, `endDate`, `offers` (entradas). Ejemplo microdatos (visto dentro de una página de músico):
  ```html
  <div itemscope itemtype="https://schema.org/Event">
    <a itemprop="name" href="#">Concierto Foo Fighters</a><br/>
    <span itemprop="location">Ciudad de México</span><br/>
    <meta itemprop="startDate" content="2026-05-20">20 de mayo de 2026<br/>
    <a itemprop="offers" href="https://tickets.ejemplo.com">Comprar boletos</a>
  </div>
  ```.  
  Y el mismo evento en JSON-LD podría ser:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Concierto Foo Fighters",
    "location": "Ciudad de México, MX",
    "startDate": "2026-05-20",
    "offers": {
      "@type": "Offer",
      "url": "https://tickets.ejemplo.com"
    }
  }
  </script>
  ```.  
  En buscadores, esto puede generar cards de evento con fecha y lugar visibles en los resultados.

En todos los casos anteriores, Google interpreta el marcado y, si es correcto, puede mostrar el contenido marcado directamente en el resultado de búsqueda (como valoraciones, precios, fechas, etc.), lo que mejora la visibilidad y el *click-through rate*.

## Buenas prácticas SEO y AEO con datos estructurados

- **Formato recomendado:** Google *prefiere JSON-LD* cuando sea posible. JSON-LD se implementa vía `<script>` y no altera el HTML visible, lo que reduce errores de marcado. Sin embargo, si tu CMS o entorno lo requiere, Microdatos o RDFa también son compatibles. Independientemente del formato, asegúrate de incluir `@context: "https://schema.org"` y `@type` correctos.
- **Propiedades requeridas:** Usa las [páginas de Search Central de Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) (Guía en español) para saber qué propiedades son *requeridas* o *recomendadas* por tipo de dato (p. ej., `name`, `image` para Product). Incluir todos los requeridos es obligatorio para ser elegible a resultados enriquecidos.
- **Datos enlazados (`linked data`):** Cuando sea posible, utiliza propiedades de **Linked Data** como `sameAs` o `url` para apuntar a URLs oficiales de la entidad (Wikipedia, Wikidata, perfiles sociales oficiales). Esto ayuda a Google a validar la identidad de la entidad y mejora el ranking semántico.
- **Canonical y hreflang:** Asegúrate de tener etiquetas `<link rel="canonical">` en páginas multiparte o duplicadas para evitar contenido duplicado. Si tienes versiones en otros idiomas, usa `hreflang` adecuado. En SEO/AEO es vital que Google identifique la URL canónica de tu contenido y la versión de idioma pertinente.
- **Pruebas y validación:** Durante el desarrollo, valida el marcado con la **Prueba de Resultados Enriquecidos** de Google. Corrige errores críticos que indique la herramienta. Después del despliegue, monitorea los **Informes de resultados enriquecidos** en Google Search Console para detectar páginas inválidas o cambios inesperados. También verifica que Google acceda a las páginas (sin bloqueo por `robots.txt` ni `noindex`).
- **Tiempo de carga:** Aunque el JSON-LD es ligero, procura que no bloquee el renderizado. El AEO (Answer Engine Optimization) también valora la velocidad. Si tu sitio es lento, considera diferir scripts hasta después del contenido principal.
- **Redes sociales y metadatos:** Además del Schema, incluye meta tags **Open Graph** y **Twitter Card** apropiadas para mejorar la apariencia al compartir en redes sociales. Por ejemplo:
  ```
  <meta property="og:title" content="Schema.org y Grafos de Conocimiento: guía completa">
  <meta property="og:description" content="Aprende a usar datos estructurados (JSON-LD, microdatos) para mejorar tu SEO y aparecer en el Knowledge Graph de Google.">
  <meta property="og:image" content="URL_de_la_imagen.png">
  <meta property="og:url" content="https://whacha.site/schema-org-grafos-conocimiento">
  <meta name="twitter:card" content="summary_large_image">
  ```
- **Contenido de calidad:** Schema.org mejora el SEO, pero nunca exceda el contenido visible. El contenido marcado debe coincidir con lo que el usuario ve. Evita keyword stuffing en las propiedades. Google penaliza el spam estructurado.
- **Optimización para voz/respuestas (AEO):** Estructurar los datos de forma clara (por ejemplo, usar `FAQPage` o `QAPage` si aplica a tu contenido) puede aumentar la probabilidad de aparecer como respuesta directa (rich answers) en Asistentes y paneles de conocimiento. También ayuda tener encabezados semánticos (`<h1>…</h1>`, `<h2>…</h2>` claros) y contenido formateado (listas, tablas) que las herramientas de AI pueden utilizar para respuestas.

Implementar estas prácticas asegura que tus datos estructurados no solo estén sintácticamente correctos, sino también alineados con las políticas de Google, maximizando la probabilidad de rich results y reconocimiento en el Knowledge Graph.

## Comparativa de formatos: Microdatos vs RDFa vs JSON-LD

| Formato   | Ventajas | Desventajas | Compatibilidad con Google |
|-----------|----------|-------------|--------------------------|
| **Microdatos** (HTML) | Se integra en el HTML visible (texto semántico asociado a etiquetas reales). Utilizado ampliamente desde antes de JSON-LD.  | Agrega atributos al HTML, lo que complica mantenimiento. Menos intuitivo para grandes volúmenes de datos. | Google lo acepta; lo lee sin problemas. |
| **RDFa** (HTML) | Similar a microdatos, pero usa atributos `vocab`/`typeof` y `property`. Facilita datos muy interconectados. | Atributos más verbosos; sintaxis más compleja. Menos popular en sitios web modernos. | Completamente soportado por Google. |
| **JSON-LD** | Separado del HTML, fácil de implementar y mantener (especialmente en entornos modernos). Menor riesgo de errores de marcado. | Depende de la ejecución del script (aunque Google puede procesarlo sin problemas). No ancla directamente al contenido visible. | **Recomendado por Google** para la mayoría de casos. Google lee JSON-LD de forma completa.  |

Google *recomienda usar JSON-LD* siempre que sea posible, ya que es “la solución más fácil de implementar y mantener”. Sin embargo, el buscador sigue aceptando los tres formatos; no existe penalización por usar Microdata o RDFa en su lugar. Algunos sitios optan por implementar doble marcado (JSON-LD + microdatos) para cobertura total, aunque Google en general no requiere la redundancia. 

## Checklist de implementación y errores comunes

- **Checklist básico:**  
  - Incluir `@context: "https://schema.org"` y `@type` correcto en JSON-LD, o `itemscope itemtype="https://schema.org/..."` en HTML.  
  - Agregar todas las propiedades **requeridas** por Google (ver documentación oficial).  
  - Verificar la validez del JSON (con un linter) y la correspondencia de tipo de datos (fechas en formato ISO, URLs válidas).  
  - Usar URLs absolutas para imágenes y enlaces.  
  - Confirmar que el marcado describe contenido visible, no información oculta.  
  - Añadir `rel=canonical` y `hreflang` si corresponde, asegurando que Google no considere la página duplicada o fuera de idioma.  
  - Enviar sitemap a Search Console y usar la Herramienta de Inspección de URL para comprobar que Google detecta el marcado.  

- **Errores frecuentes y soluciones:**  
  - *Error de sintaxis JSON o etiquetas no cerradas:* revisa el bloque `<script>` con un validador JSON-LD. Google no procesará un JSON mal formado.  
  - *Campos requeridos faltantes:* por ejemplo, un `Product` sin `name` o `Offers` sin `price`. Rellena todas las propiedades obligatorias según la guía de Google.  
  - *Valores mal formateados:* fechas deben ser ISO 8601 (`YYYY-MM-DD`), los precios en formato numérico, etc. Corrige el tipo de dato (p. ej. un texto donde debería ir un número).  
  - *Uso de vocabularios obsoletos:* actualiza cualquier uso de `data-vocabulary.org` a Schema.org. El primero ya no activa rich results en Google.  
  - *Markup en páginas incorrectas:* evita agregar un tipo `Recipe` en una página de listado de productos, por ejemplo. Cada página debe describir su propio tema.  
  - *Etiquetas mal jerarquizadas:* si usas microdatos, asegúrate de anidar correctamente (p. ej., `<div itemprop="offers" itemscope itemtype="Offer">`).  
  - *`sameAs` incorrecto o faltante:* para entidades conocidas, agrega URLs oficiales en `sameAs` para evitar confusiones del Knowledge Graph.  
  - *No actualización de datos:* tras cambiar el contenido, recurre a Search Console para pedir una nueva indexación. Los cambios en datos estructurados no se reflejarán hasta que Google vuelva a rastrear la página.  

En cada caso, la **Prueba de Resultados Enriquecidos** es la primera herramienta de diagnóstico. Allí se mostrarán los errores bloqueantes (marcados en rojo) y avisos opcionales (en amarillo). Después de corregir, revisa el informe de *Resultados enriquecidos* en Search Console para asegurarte de que no haya errores nuevos. 

## Pruebas y herramientas

- **Rich Results Test (Google):** Permite validar cualquier página con datos estructurados. Inserta la URL o el código y obtén un reporte de errores y una vista previa (cuando esté disponible).  
- **Search Console:** En la sección de *Resultados enriquecidos* verás métricas de las páginas que contienen tu esquema. El informe indica cuántas páginas válidas/en error tienes, y te da detalles de cada tipo de esquema.  
- **Validator.schema.org:** Es la herramienta oficial de Schema.org para comprobar sintaxis ( útil especialmente para RDFa).  
- **Herramienta de inspección de URL:** Útil para ver cómo Google ve el marcado en una página específica.  
- **Depuración manual:** Verifica que el `<script type="application/ld+json">` esté en el lugar correcto (idealmente en `<head>` o al final de `<body>`) y que no haya caracteres extraños.  

Ejemplo de prueba con Rich Results Test: ingresar la página de muestra con marcado JSON-LD de un **producto** debería mostrar “✔️ 1 tipo de resultado” válido si todo es correcto. En Search Console, tras publicar, verás en el informe “Productos” cuántas páginas se indexaron y si tienen errores. 

## Sugerencias de publicaciones en redes sociales

1. **Variante A:**  
   “👉 Descubre cómo *Schema.org* y los **datos estructurados** hacen que Google entienda tu contenido. Aprende a marcar tu HTML (con JSON‑LD, microdatos, etc.) para aparecer en el *Knowledge Graph* y obtener más resultados enriquecidos. #SEO #DataStructurada #KnowledgeGraph”

2. **Variante B:**  
   “¿Tienes blog o web? Usar **Schema.org** puede mejorar tu tráfico🚀. En este artículo explicamos paso a paso cómo implementar JSON-LD, microdatos o RDFa para que Google reconozca tus entidades (Personas, Organizaciones, Artículos, Productos, Eventos). ¡Dale una ventaja a tu SEO! #SchemaOrg #MarketingDigital”

3. **Variante C:**  
   “Aprende a hablarle el idioma a Google: implementa marcado *Schema.org* en tu sitio. 🤖 En nuestra guía vemos ejemplos prácticos de microdatos y JSON-LD para productos, eventos, artículos y más, ¡y cómo comprobarlos con las herramientas oficiales de Google! #SEOTecnico #SearchConsole #RichResults”

## Meta tags Open Graph y Twitter Card

```html
<meta property="og:title" content="Schema.org y Grafos de Conocimiento: Guía práctica SEO">
<meta property="og:description" content="Aprende a usar datos estructurados (JSON-LD, microdatos) para mejorar tu SEO y aparecer en los Knowledge Graph de Google. Ejemplos de Person, Article, Product, Event con técnicas recomendadas.">
<meta property="og:image" content="https://whacha.site/assets/images/schema-knowledgegraph.png">
<meta property="og:url" content="https://whacha.site/schema-org-grafos-conocimiento">
<meta name="twitter:card" content="summary_large_image">
```

En estas etiquetas, `og:title` y `og:description` resumen el tema principal, `og:image` es la URL de la imagen conceptual (1200×628 px), y `twitter:card` indica el tipo de tarjeta para Twitter (uso de imagen grande). 

## Imagen conceptual

Crearemos una imagen conceptual que ilustre el flujo de datos desde HTML hasta el Knowledge Graph. **Composición:** A la izquierda, un fragmento de código HTML (por ejemplo, etiquetas `<div>` o `{"<script>..."}` estilizado), apuntando con una flecha hacia la derecha donde se encuentra un conjunto de nodos interconectados (representando un grafo de conocimiento) junto al logotipo de Google (o la letra “G” estilizada) para indicar indexación. **Paleta de colores:** Tonos azules y grises (modernos, tecnológicos), con blanco de fondo y acentos naranjas o verdes para texto/íconos. **Texto en la imagen:** Puede incluir un título breve como “Schema.org → Knowledge Graph” y etiquetas pequeñas “JSON-LD”, “Microdatos” sobre la sección de HTML.  

Código SVG de ejemplo:
```svg
<svg width="1200" height="628" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo -->
  <rect width="1200" height="628" fill="#ffffff"/>
  <!-- Código HTML estilizado -->
  <rect x="50" y="150" width="300" height="300" rx="10" fill="#e6f2ff" stroke="#3a7bd5" stroke-width="4"/>
  <text x="200" y="250" font-family="Arial" font-size="24" fill="#3a7bd5" text-anchor="middle">{ &lt;div&gt; ... &lt;/div&gt; }</text>
  <text x="200" y="290" font-family="Arial" font-size="18" fill="#3a7bd5" text-anchor="middle">Ejemplo: Persona</text>
  <!-- Flecha al grafo -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3a7bd5"/>
    </marker>
  </defs>
  <line x1="350" y1="300" x2="600" y2="300" stroke="#3a7bd5" stroke-width="6" marker-end="url(#arrowhead)"/>
  <!-- Grafo de conocimiento -->
  <circle cx="750" cy="250" r="40" fill="#3a7bd5"/>
  <circle cx="850" cy="200" r="30" fill="#5c9ed1"/>
  <circle cx="850" cy="300" r="30" fill="#5c9ed1"/>
  <circle cx="950" cy="250" r="40" fill="#3a7bd5"/>
  <line x1="750" y1="250" x2="850" y2="200" stroke="#76b2de" stroke-width="4"/>
  <line x1="750" y1="250" x2="850" y2="300" stroke="#76b2de" stroke-width="4"/>
  <line x1="950" y1="250" x2="850" y2="200" stroke="#76b2de" stroke-width="4"/>
  <line x1="950" y1="250" x2="850" y2="300" stroke="#76b2de" stroke-width="4"/>
  <!-- Texto final -->
  <text x="750" y="250" font-family="Arial" font-size="18" fill="#ffffff" text-anchor="middle">KG</text>
  <text x="750" y="330" font-family="Arial" font-size="20" fill="#3a7bd5" text-anchor="middle">Knowledge Graph</text>
</svg>
```

*Prompt para generación de PNG con IA:*  
```
Infografía moderna mostrando un fragmento de código HTML (tal como etiquetas <div> y <script>) a la izquierda y, a la derecha, un grafo de nodos conectados que representa el Knowledge Graph de Google. Use un estilo minimalista con paleta tecnológica en tonos azules y grises. Incluir texto: "Schema.org → Knowledge Graph".
```  
Este prompt (ideal para Midjourney o Stable Diffusion) produciría una imagen vectorial conceptual en 1200×628 px.

## Conclusión

El uso correcto de **Schema.org** y datos estructurados conecta tu contenido con la inteligencia de Google. Desde marcar una simple página HTML hasta ver tu entidad destacada en una ficha de conocimiento, cada paso –configurar `<link rel="canonical">`, usar JSON-LD preciso, validar en Search Console– es crucial para el éxito SEO/AEO. En resumen:

- Los datos estructurados **no son una garantía automática** de mejoras, pero sí una señal potente que Google valora. Siguiendo las guías oficiales y usando estructuras claras, tu contenido será indexado de forma más rica.
- Implementa ejemplos reales (Person, Article, Product, Event) como se mostró arriba y verifica con las herramientas de Google. Corrige cualquier error según el diagnóstico.
- Mantente al día con la documentación oficial (Schema.org y Google Search Central) para adaptarte a cambios futuros. 

Con datos estructurados bien implementados, no sólo mejoras la apariencia en buscadores (rich snippets), sino que también aumentas las probabilidades de que Google entienda tu contenido en profundidad, influyendo positivamente en el tráfico orgánico y en la visibilidad de tu marca en la web.

**Fuentes:** Documentación oficial Schema.org (tipos Person, Organization, Article, Product, Event), Guías de Google Search Central (datos estructurados, article schema), y estudios de casos de Google (ej. aumentos de CTR con datos estructurados). También se usaron ejemplos oficiales de Schema.org para ilustrar el marcado.

