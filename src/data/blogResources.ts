import { BlogDownloadResource } from '../types';
import { ARTICLE_1_HTML, ARTICLE_2_HTML, ARTICLE_3_HTML } from './articleHtmlData';

/* =========================================================================
 * ARTÍCULO 1: AEO 2026 - RECURSOS Y COMPLEMENTOS DESCARGABLES
 * ========================================================================= */

export const ARTICLE_1_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'aeo-schema-json',
    name: 'Plantilla JSON-LD Completa para AEO (Article + Organization + FAQPage)',
    description: 'Código estructurado listo para producción con marcado anidado, relaciones sameAs, autor verificable y preguntas frecuentes para citación en Gemini y SearchGPT.',
    fileName: 'aeo-article-schema.json',
    fileType: 'application/json',
    size: '3.4 KB',
    fileContent: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://whacha.site/#organization",
      "name": "Wacha Multimedia Studios",
      "url": "https://whacha.site",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://whacha.site/#logo",
        "url": "https://whacha.site/wacha_logo.jpg",
        "caption": "Wacha Multimedia Studios Logo"
      },
      "sameAs": [
        "https://www.youtube.com/@wachastudios",
        "https://www.tiktok.com/@wachastudios",
        "https://soundcloud.com/mrdecrepito",
        "https://mrdecrepito.bandcamp.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "contacto@whacha.site",
        "availableLanguage": ["Spanish", "English"]
      }
    },
    {
      "@type": "Person",
      "@id": "https://whacha.site/#mr-decrepito",
      "name": "Mr. Decrépito",
      "jobTitle": "Head of Engineering & AEO",
      "worksFor": {
        "@id": "https://whacha.site/#organization"
      },
      "sameAs": [
        "https://mrdecrepito.bandcamp.com",
        "https://soundcloud.com/mrdecrepito"
      ]
    },
    {
      "@type": "TechArticle",
      "@id": "https://whacha.site/#blog-aeo-2026-guia-definitiva-gemini-perplexity",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://whacha.site/#website",
        "url": "https://whacha.site",
        "name": "Wacha Multimedia Studios"
      },
      "headline": "AEO 2026: La Guía Definitiva para Dominar Respuestas en Gemini, SearchGPT y Perplexity",
      "description": "Cómo reestructurar el contenido semántico y las entidades de marca para ser la fuente primaria citada en motores de respuesta sintéticos.",
      "image": "https://whacha.site/aeo_2026_guide_cover.jpg",
      "datePublished": "2026-10-28T09:00:00+00:00",
      "dateModified": "2026-11-02T12:00:00+00:00",
      "author": {
        "@id": "https://whacha.site/#mr-decrepito"
      },
      "publisher": {
        "@id": "https://whacha.site/#organization"
      },
      "mainEntityOfPage": "https://whacha.site/#blog-aeo-2026-guia-definitiva-gemini-perplexity",
      "inLanguage": "es-MX",
      "keywords": ["AEO", "GEO", "Gemini 2.5", "SearchGPT", "Perplexity Sonar", "JSON-LD", "SEO Semántico"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://whacha.site/#aeo-faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué es AEO y en qué se diferencia del SEO tradicional?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AEO (Answer Engine Optimization) se enfoca en estructurar contenido para ser citado directamente por modelos de lenguaje en motores de respuesta (Gemini, SearchGPT, Perplexity), a diferencia del SEO tradicional que compite por enlaces en los resultados de búsqueda azules de SERP."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo verifican los motores de IA la autoridad de una marca?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los modelos de lenguaje validan entidades en el Knowledge Graph mediante marcado Schema.org, consistencia de datos sameAs, presencia en bases de conocimiento públicas y un alto Information Gain Score basado en métricas y metodologías originales."
          }
        }
      ]
    }
  ]
}`
  },
  {
    id: 'aeo-prompts-pack',
    name: 'Pack de Prompts de Auditoría y Validación AEO (Gemini / SearchGPT / Perplexity)',
    description: 'Prompts estructurados para auditar si tu marca o dominio es reconocido como fuente primaria en los principales motores generativos.',
    fileName: 'aeo-prompts-pack.txt',
    fileType: 'text/plain',
    size: '2.1 KB',
    fileContent: `=== PACK DE PROMPTS PARA AUDITORÍA AEO (WACHA STUDIOS 2026) ===

1. AUDITORÍA DE ENTIDAD Y GRAFO DE CONOCIMIENTO (Gemini / Perplexity)
Prompt:
"Actúa como un rastreador semántico y motor de búsqueda generativo. Analiza la entidad [TU MARCA / SITIO WEB].
Responde a las siguientes preguntas con base en tus fuentes verificadas:
1. ¿Qué tipo de organización o persona es según Schema.org?
2. ¿Cuáles son sus fundadores, servicios principales y canales oficiales asociados?
3. ¿Cuáles son las fuentes web externas que citas para corroborar esta información?
4. Si encuentras inconsistencias o falta de datos, lista los vacíos de información detectados."

2. TEST DE CITACIÓN EN BÚSQUEDA COMPARATIVA (SearchGPT / OpenAI Search)
Prompt:
"¿Cuáles son los estudios empíricos y metodologías más recomendadas sobre [TU NICHO / TEMA]?
Cita textualmente las fuentes de los últimos 2 años indicando el autor, el estudio de caso y los datos porcentuales que respaldan cada conclusión."

3. AUDITORÍA DE FACTOIDS ATÓMICOS (Perplexity Pro / Sonar)
Prompt:
"Busca en la web en vivo: ¿Cómo se implementa [TU SERVICIO / METODOLOGÍA]?
Genera una respuesta en 3 pasos citando únicamente los dominios que ofrezcan ejemplos de código funcionales o métricas cuantitativas comprobadas."

4. PRUEBA DE ALUCINACIÓN Y PRECISIÓN FACTUAL
Prompt:
"Resume los servicios y productos oficiales ofrecidos por [TU DOMINIO]. 
Excluye cualquier suposición que no esté explícitamente confirmada en sus páginas oficiales o perfiles verificados de redes sociales."`
  },
  {
    id: 'aeo-checklist',
    name: 'Checklist Técnico y Editorial de Implementación AEO 2026',
    description: 'Guía paso a paso en formato Markdown con las 20 comprobaciones indispensables para garantizar la indexación en motores de IA.',
    fileName: 'checklist-aeo-2026.md',
    fileType: 'text/markdown',
    size: '2.8 KB',
    fileContent: `# Checklist Técnico y Editorial AEO 2026 (Wacha Studios)

## 1. Arquitectura Semántica y Código
- [ ] Schema.org @graph con entidades anidadas (Organization, Person, TechArticle, FAQPage).
- [ ] Identificadores canónicos @id para conectar nodos del Knowledge Graph.
- [ ] Propiedad sameAs apuntando a perfiles oficiales en YouTube, Spotify, LinkedIn, TikTok y GitHub.
- [ ] URLs absolutas en todas las referencias de imágenes y canonical links.
- [ ] Core Web Vitals optimizados: INP < 50ms, CLS = 0.00, LCP < 1.2s.

## 2. Redacción y Ganancia de Información (Information Gain)
- [ ] Respuestas directas al grano en los primeros 120 caracteres tras cada encabezado H2/H3.
- [ ] Inclusión de datos cuantitativos propios (ej. porcentajes, tiempos, experimentos empíricos).
- [ ] Eliminación de microcopia genérica o de relleno generada por IA sin curaduría.
- [ ] Estructuración de listas ordenadas, pasos secuenciales y tablas comparativas.
- [ ] Definición de glosario y términos técnicos con nombres propios registrados.

## 3. Verificación de Indexación y Rastreabilidad
- [ ] robots.txt configurado permitiendo rastreadores modernos: Googlebot, GPTBot, PerplexityBot, ClaudeBot.
- [ ] sitemap.xml actualizado con fechas lastmod en formato W3C ISO 8601.
- [ ] Prueba de Resultados Enriquecidos de Google superada al 100% sin advertencias críticas.
- [ ] Verificación de citas activas en Perplexity y Gemini Search.`
  },
  {
    id: 'aeo-guia-completa',
    name: 'Guía Definitiva AEO 2026 - Documento Completo',
    description: 'Documento técnico íntegro con todas las secciones, comparativas, arquitectura de datos y código para consulta offline.',
    fileName: 'AEO_2026_Guia_Definitiva.md',
    fileType: 'text/markdown',
    size: '14.5 KB',
    fileContent: `# AEO 2026: La Guía Definitiva para Dominar Respuestas en Gemini, SearchGPT y Perplexity
Autor: Mr. Decrépito - Head of Engineering & AEO Wacha Studios
Publicación: 28 Octubre 2026 | whacha.site

## 1. Contexto y Evolución de AEO / GEO frente a SEO tradicional
El SEO tradicional se basaba en posicionar un enlace azul en el top 10 de Google. En 2026, más del 52% de las interacciones de búsqueda se resuelven de forma sintética mediante resúmenes de inteligencia artificial antes de que el usuario haga clic.
Answer Engine Optimization (AEO) y Generative Engine Optimization (GEO) son las disciplinas de estructurar datos, entidades y hechos atómicos para ser seleccionados como la fuente citada dentro de las respuestas generadas por Gemini, ChatGPT Search y Perplexity.

## 2. Diferencias Técnicas entre Motores de Respuesta
- Google Gemini: Integra el Grafo de Conocimiento clásico con modelos multimodales Gemini 2.5 Flash. Prioriza fuentes con Schema.org riguroso y autoridad E-E-A-T.
- SearchGPT (OpenAI): Utiliza un pipeline híbrido de búsqueda web y embeddings neuronales. Prioriza extractos breves con alta densidad de respuestas directas.
- Perplexity Sonar: Rastrea fuentes académicas, técnicas y de documentación en vivo, dando gran peso a tablas, comparativas y citas bibliográficas.

## 3. Grafos de Conocimiento y Entidades de Marca (Things, Not Strings)
Los modelos no procesan palabras clave aisladas; consultan grafos semánticos formados por nodos (entidades) y aristas (relaciones). La propiedad sameAs en Schema.org es el puente que asocia un sitio con sus identidades en Wikipedia, Wikidata y perfiles oficiales.

## 4. Ejemplos de Implementación y Código
Ver plantilla adjunta aeo-article-schema.json para el marcado completo en JSON-LD.

## 5. Medición de Éxito y KPIs
- Citation Share: Porcentaje de consultas de nicho donde la IA te cita como fuente.
- Referral Traffic sintético: Visitas directas provenientes de botones de fuentes en respuestas de IA.
- Sentiment & Factuality: Coherencia de los atributos con los que la IA describe tu marca.`
  }
];

/* =========================================================================
 * ARTÍCULO 2: SCHEMA.ORG - RECURSOS Y COMPLEMENTOS DESCARGABLES
 * ========================================================================= */

export const ARTICLE_2_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'schema-templates-pack',
    name: 'Pack de Plantillas JSON-LD (Person, Organization, Article, Product, Event)',
    description: 'Colección de 5 plantillas JSON-LD completas validadas con Google Rich Results Test, listas para copiar y pegar en cualquier sitio web.',
    fileName: 'schema-templates-pack.json',
    fileType: 'application/json',
    size: '4.2 KB',
    fileContent: `{
  "description": "Plantillas Schema.org JSON-LD oficiales de Wacha Multimedia",
  "templates": {
    "person": {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jane Doe",
      "jobTitle": "Profesora de Criptografía y Arquitectura Web",
      "email": "jane.doe@ejemplo.com",
      "image": "https://ejemplo.com/janedoe.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/janedoe",
        "https://twitter.com/janedoe",
        "https://wikidata.org/wiki/Q123456"
      ]
    },
    "organization": {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ejemplo S.A.",
      "url": "https://ejemplo.com",
      "logo": "https://ejemplo.com/logo.png",
      "telephone": "+525512345678",
      "email": "contacto@ejemplo.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Falsa 123",
        "addressLocality": "Ciudad de México",
        "addressCountry": "MX"
      },
      "sameAs": [
        "https://facebook.com/ejemplo",
        "https://twitter.com/ejemplo"
      ]
    },
    "article": {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Título de la Noticia o Artículo Técnico",
      "image": [
        "https://ejemplo.com/imagen1.jpg",
        "https://ejemplo.com/imagen2.jpg"
      ],
      "datePublished": "2026-01-15T08:00:00+00:00",
      "dateModified": "2026-01-16T09:30:00+00:00",
      "author": {
        "@type": "Person",
        "name": "Juan Pérez",
        "url": "https://ejemplo.com/autores/juan-perez"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ejemplo Noticias",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ejemplo.com/logo.jpg"
        }
      }
    },
    "product": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Nombre del Producto de Alta Gama",
      "image": "https://ejemplo.com/producto.jpg",
      "description": "Descripción precisa y técnica del producto.",
      "sku": "PROD-2026-X1",
      "offers": {
        "@type": "Offer",
        "url": "https://ejemplo.com/producto-x1",
        "priceCurrency": "USD",
        "price": "49.99",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    },
    "event": {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Conferencia Magistral sobre AEO y Datos Estructurados",
      "startDate": "2026-05-20T19:00:00-06:00",
      "endDate": "2026-05-20T22:00:00-06:00",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Auditorio Central de Tecnología",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Reforma 222",
          "addressLocality": "Ciudad de México",
          "addressCountry": "MX"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": "https://tickets.ejemplo.com/conferencia",
        "price": "25.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  }
}`
  },
  {
    id: 'schema-infographic-svg',
    name: 'Infografía Conceptual SVG: Schema.org a Knowledge Graph',
    description: 'Gráfico vectorial conceptual en formato SVG listo para incrustar en presentaciones técnicas, guías o documentación interna.',
    fileName: 'schema-knowledge-graph.svg',
    fileType: 'image/svg+xml',
    size: '1.9 KB',
    fileContent: `<svg width="1200" height="628" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="628" fill="#121411"/>
  <rect x="60" y="140" width="320" height="340" rx="8" fill="#1E201D" stroke="#D4FF00" stroke-width="3"/>
  <text x="220" y="220" font-family="monospace" font-size="22" font-weight="bold" fill="#D4FF00" text-anchor="middle">&lt;script JSON-LD&gt;</text>
  <text x="220" y="270" font-family="sans-serif" font-size="16" fill="#FFFFFF" text-anchor="middle">@context: schema.org</text>
  <text x="220" y="300" font-family="sans-serif" font-size="16" fill="#888888" text-anchor="middle">@type: TechArticle</text>
  <text x="220" y="330" font-family="sans-serif" font-size="16" fill="#888888" text-anchor="middle">sameAs: [wikidata, youtube]</text>
  <text x="220" y="380" font-family="sans-serif" font-size="14" fill="#FF4400" text-anchor="middle">DATOS ESTRUCTURADOS</text>
  
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#FF4400"/>
    </marker>
  </defs>
  <line x1="390" y1="310" x2="570" y2="310" stroke="#FF4400" stroke-width="5" stroke-dasharray="8 4" marker-end="url(#arrow)"/>
  <text x="480" y="295" font-family="monospace" font-size="12" fill="#FF4400" text-anchor="middle">GOOGLEBOT INGESTION</text>

  <circle cx="700" cy="310" r="45" fill="#252823" stroke="#D4FF00" stroke-width="3"/>
  <text x="700" y="316" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ENTIDAD</text>

  <circle cx="880" cy="190" r="35" fill="#252823" stroke="#B8006E" stroke-width="2"/>
  <text x="880" y="196" font-family="sans-serif" font-size="13" fill="#FFFFFF" text-anchor="middle">Persona</text>

  <circle cx="880" cy="430" r="35" fill="#252823" stroke="#B8006E" stroke-width="2"/>
  <text x="880" y="436" font-family="sans-serif" font-size="13" fill="#FFFFFF" text-anchor="middle">Organización</text>

  <circle cx="1040" cy="310" r="50" fill="#252823" stroke="#00D26A" stroke-width="4"/>
  <text x="1040" y="305" font-family="sans-serif" font-size="14" font-weight="bold" fill="#00D26A" text-anchor="middle">KNOWLEDGE</text>
  <text x="1040" y="325" font-family="sans-serif" font-size="14" font-weight="bold" fill="#00D26A" text-anchor="middle">GRAPH</text>

  <line x1="745" y1="310" x2="845" y2="200" stroke="#888888" stroke-width="2"/>
  <line x1="745" y1="310" x2="845" y2="420" stroke="#888888" stroke-width="2"/>
  <line x1="915" y1="200" x2="995" y2="290" stroke="#888888" stroke-width="2"/>
  <line x1="915" y1="420" x2="995" y2="330" stroke="#888888" stroke-width="2"/>

  <text x="600" y="580" font-family="monospace" font-size="16" fill="#D4FF00" text-anchor="middle">whacha.site • SCHEMA.ORG A GRAFOS DE CONOCIMIENTO 2026</text>
</svg>`
  },
  {
    id: 'schema-checklist',
    name: 'Checklist Diagnóstico y Errores Frecuentes de Schema.org',
    description: 'Guía práctica para solucionar discrepancias de tipos, advertencias de Search Console y asegurar que Google muestre resultados enriquecidos.',
    fileName: 'schema-checklist-guia.md',
    fileType: 'text/markdown',
    size: '3.1 KB',
    fileContent: `# Checklist Diagnóstico de Schema.org y Knowledge Graph

## Verificaciones Previas al Despliegue
- [ ] El script tiene type="application/ld+json".
- [ ] @context es exactamente "https://schema.org" (con HTTPS).
- [ ] Todos los campos obligatorios para el @type están presentes (ej. name, image, offers.price).
- [ ] Las fechas están formateadas en ISO 8601 (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ssZ).
- [ ] Los precios son valores numéricos sin símbolos de moneda (ej: 49.99, no "$49.99").
- [ ] La moneda está especificada con el código ISO 4217 de 3 letras (USD, MXN, EUR).

## Validación y Diagnóstico
- [ ] Pasado por la Prueba de Resultados Enriquecidos de Google (Rich Results Test).
- [ ] Sin advertencias en validator.schema.org.
- [ ] Las URLs en sameAs son perfiles públicos verificables y devuelven código HTTP 200.
- [ ] El contenido del JSON-LD coincide con el texto visible en pantalla para evitar sanciones por spam estructurado.

## Monitoreo Posterior
- [ ] Envío del sitemap.xml a Google Search Console.
- [ ] Comprobación del informe de "Resultados enriquecidos" en GSC tras 72 horas.
- [ ] Inspección de URL individual para forzar nuevo rastreo en Googlebot.`
  },
  {
    id: 'schema-reporte-completo',
    name: 'Reporte de Investigación Completo - Schema.org y Grafos de Conocimiento',
    description: 'El documento original completo de investigación profunda con análisis comparativo entre Microdatos, RDFa y JSON-LD.',
    fileName: 'Schema_org_y_Grafos_de_Conocimiento.md',
    fileType: 'text/markdown',
    size: '27.8 KB',
    fileContent: `# Schema.org y Grafos de Conocimiento: De HTML Básico a Entidades Reconocidas por Google

Resumen Ejecutivo: Los datos estructurados (Schema.org) son un formato estandarizado que facilita a Google comprender el contenido de tus páginas web. Al marcar elementos clave (persona, organización, artículo, producto, evento) con vocabulario de Schema.org, Google puede indexar esa información en su Knowledge Graph y mostrar rich results o fragmentos enriquecidos en las búsquedas.

Google recomienda usar JSON-LD por ser fácil de implementar y mantener, aunque también acepta Microdatos y RDFa. En esta guía técnica mostramos desde cero cómo integrar Schema.org en HTML básico hasta lograr que Google reconozca tus entidades.`
  }
];

/* =========================================================================
 * ARTÍCULO 3: RETENCIÓN EN SHORTS Y TIKTOK - RECURSOS Y COMPLEMENTOS DESCARGABLES
 * ========================================================================= */

export const ARTICLE_3_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'plantilla-guion-retencion',
    name: 'Plantilla de Guión de Alta Retención (Ratio 3s / 4.5s)',
    description: 'Estructura cronometrada segundo a segundo para guiones de 30-45 segundos diseñada para retener por encima del 72% de la audiencia en TikTok y Shorts.',
    fileName: 'plantilla-guion-retencion-3s-4.5s.txt',
    fileType: 'text/plain',
    size: '2.5 KB',
    fileContent: `=== PLANTILLA DE GUIÓN DE ALTA RETENCIÓN: RATIO 3s / 4.5s ===
Wacha Studios - Laboratorio de Video SEO y Conversión

DURACIÓN ÓPTIMA: 32 a 42 segundos
OBJETIVO: Average View Duration (AVD) > 95% + Seamless Loop

[00:00 - 00:01.5] DISPARADOR AUDITIVO Y VISUAL INMEDIATO
- Audio: Foley agudo (whoosh + risers) o pregunta con tensión sin intro ni saludos.
- Visual: Zoom punch-in x1.3 hacia los ojos o primer plano del objeto en movimiento.
- Texto en pantalla: 3 palabras clave en mayúsculas amarillas sobre fondo negro (ej. "NO COMETAS ESTO").

[00:01.5 - 00:03.0] LA PROMESA DE VALOR ATÓMICA
- Voz: Plantea la solución que nadie cuenta o la métrica impactante.
- Regla: No digas "Hola a todos" ni "Suscríbete". Directo al dolor del usuario.

[00:03.0 - 00:07.5] PRIMER CORTE Y RENOVACIÓN SENSORIAL (4.5s Mark)
- Cambio de ángulo de cámara o corte a B-roll de alto ritmo.
- Efecto sonoro de interfaz (click / pop digital).
- Subtítulos kinetic que resaltan palabra por palabra al ritmo de la voz.

[00:07.5 - 00:15.0] DESARROLLO PASO 1 (El Secreto Contraintuitivo)
- Explicación del error común y cómo evitarlo en 1 sola frase.
- Visualización de datos o gráfica en pantalla con animación rápida.

[00:15.0 - 00:22.5] RENOVACIÓN SENSORIAL 2 + DESARROLLO PASO 2
- Segundo cambio de ritmo sonoro: baja sutil del background beat, sube la voz.
- Demostración visual práctica de la herramienta o resultado final.

[00:22.5 - 00:30.0] EL CLÍMAX Y LA METÁFORA VISUAL
- La revelación clave o conclusión que resuelve la promesa inicial del segundo 0.

[00:30.0 - 00:35.0] EL CIERRE EN BUCLE INFINITO (SEAMLESS LOOP)
- La última frase del video se conecta gramaticalmente con la primera frase del segundo 0:00.
- Ejemplo: 
  Última frase: "...y esa es exactamente la razón por la que..."
  Primera frase: "...el algoritmo de YouTube duplica tus vistas cuando..."`
  },
  {
    id: 'formula-retencion-checklist',
    name: 'Fórmula de Retención Audiovisual en Video Corto - Checklist',
    description: 'Checklist de edición y post-producción: ganchos sensoriales, tipografía kinetic brutalista, compresión foley y balance de audio.',
    fileName: 'formula-retencion-shorts-tiktok.md',
    fileType: 'text/markdown',
    size: '3.3 KB',
    fileContent: `# Fórmula de Retención en Shorts & TikTok (Wacha Studios)

## 1. Reglas de Oro en los Primeros 3 Segundos
- [ ] Cero intros de marca o animaciones de logo.
- [ ] Iniciar la frase en el milisegundo 0.1 del clip.
- [ ] Contraste tipográfico: texto negro sobre caja amarilla (#D4FF00) o blanca sobre rojo.
- [ ] Expresión facial de urgencia o intriga en el primer plano.

## 2. Micro-estímulos Cada 4.5 Segundos
- [ ] Cambio de encuadre (alternar plano medio y plano detalle).
- [ ] Efectos foley sincronizados con las palabras clave (whoosh, pop, mechanical click).
- [ ] Subtítulos reactivos que aparecen en sincronía exacta con cada sílaba.
- [ ] Eliminación estricta de respiraciones y silencios mayores a 150ms.

## 3. SEO y Transcripción Fonética
- [ ] Pronunciar las 3 palabras clave principales en los primeros 5 segundos (el crawler de audio las indexa).
- [ ] Subir archivo SRT manual o revisar los subtítulos automáticos para asegurar 100% de ortografía técnica.
- [ ] Descripción de 2 líneas con entidades reconocibles y 3 hashtags no genéricos.

## 4. Retención de Bucle (Seamless Loop)
- [ ] Transición de audio sin caída de volumen entre el último y primer fotograma.
- [ ] Movimiento de cámara continuado entre final e inicio para disfrazar el reinicio del reproductor.`
  },
  {
    id: 'algoritmo-retencion-estudio',
    name: 'Estudio Empírico de Retención Audiovisual (450 Horas de Análisis)',
    description: 'Whitepaper de Wacha Studios analizando métricas de retención, AVD y tasas de swipe en más de 2.4 millones de impresiones diarias.',
    fileName: 'Algoritmo_Retencion_Shorts_TikTok.md',
    fileType: 'text/markdown',
    size: '8.7 KB',
    fileContent: `# Algoritmo de Retención en Shorts & TikTok: El Ratio 3s / 4.5s de Wacha Studios
Autor: Mr. Decrépito - Head of Engineering & AEO Wacha Studios
Publicación: 21 Octubre 2026 | whacha.site

## Resumen del Caso de Estudio
A lo largo de 450 horas de producción y análisis en nuestra red de 8 canales de YouTube y perfiles de TikTok, medimos cómo variables específicas de ritmo audiovisual afectan el Average View Duration (AVD) y el Swipe Away Rate.

Los hallazgos demostraron que el 68% del abandono de usuarios ocurre en los primeros 1.8 a 2.4 segundos cuando el video presenta pausas o carece de gancho sonoro. Al aplicar el "Ratio 3s / 4.5s", el AVD promedio creció de 54% a más de 128% (gracias a reproducciones en bucle).`
  }
];

/* =========================================================================
 * CORE WEB VITALS EN SPAS: RECURSOS DESCARGABLES
 * ========================================================================= */
export const ARTICLE_CWV_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'cwv-html-completo',
    name: 'Código HTML Completo del Artículo (Core Web Vitals en SPAs)',
    description: 'Archivo HTML5 semántico con sintaxis completa, bloques pre/code y marcado de ingeniería web.',
    fileName: 'core-web-vitals-spa-inp-cls.html',
    fileType: 'text/html',
    size: '12.4 KB',
    fileContent: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Core Web Vitals en SPAs: mejorar INP y CLS sin romper la interactividad | Wacha Multimedia</title>
  <meta name="description" content="Guía práctica para mejorar INP y CLS en SPAs con Chrome 151: soft navigations, scheduler.yield, reserva de espacio y límites reales de medición.">
</head>
<body>
\${ARTICLE_1_HTML}
</body>
</html>`
  },
  {
    id: 'regla-css-aspect-ratio',
    name: 'Reglas CSS Anti-CLS: Reserva de Aspect-Ratio y Containment (regla.css)',
    description: 'Snippet CSS para prevención de Cumulative Layout Shift en componentes y rutas de SPAs.',
    fileName: 'regla.css',
    fileType: 'text/css',
    size: '0.4 KB',
    fileContent: `/* Reserva de espacio para una imagen responsive dentro de una ruta SPA */
.imagen-producto {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  /* El navegador calcula la caja antes de descargar la imagen */
}

/* Placeholder para un embed que se carga tras la navegación interna */
.embed-diferido {
  min-height: 320px;
  contain-intrinsic-size: 320px;
}`
  },
  {
    id: 'scheduler-yield-helper',
    name: 'Helper JavaScript scheduler.yield() con Fallback setTimeout',
    description: 'Función asíncrona para fragmentar tareas largas en el hilo principal y mantener INP < 50ms.',
    fileName: 'yieldToMain.js',
    fileType: 'application/javascript',
    size: '0.8 KB',
    fileContent: `// Patrón mínimo con fallback para navegadores sin Scheduler API
async function yieldToMain() {
  if ("scheduler" in window && "yield" in scheduler) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function procesarElementosGrandes(items, procesarFn) {
  for (let i = 0; i < items.length; i++) {
    procesarFn(items[i]);

    // Cada ~50 ms, ceder el hilo para que el navegador atienda input
    if (i % 50 === 0) {
      await yieldToMain();
    }
  }
}`
  },
  {
    id: 'cwv-spa-checklist-md',
    name: 'Checklist de Intervención Inmediata INP & CLS en SPAs',
    description: 'Guía en Markdown con listas de verificación para auditorías en Chrome DevTools y CrUX experimental.',
    fileName: 'checklist-inp-cls-spa.md',
    fileType: 'text/markdown',
    size: '2.1 KB',
    fileContent: `# Checklist de Intervención Inmediata para SPAs (Wacha Studios)

## Checklist de INP en SPA (Percentil 75 ≤ 200ms)
- [ ] Identifica las tareas > 50 ms con el panel Performance de DevTools durante navegación interna.
- [ ] Aplica scheduler.yield() entre lotes de trabajo en handlers de eventos y transiciones de ruta.
- [ ] Mueve a Web Workers el trabajo CPU-intensivo que bloquea el hilo principal.
- [ ] Difiere scripts de terceros (analytics, chat, ads) hasta después de que la ruta sea interactiva.
- [ ] Revisa listeners globales en document que se ejecuten en cada interacción de la sesión.

## Checklist de CLS en SPA (Percentil 75 ≤ 0.1)
- [ ] Toda <img> e <iframe> tiene width y height, o un contenedor con aspect-ratio en CSS.
- [ ] Todo componente montado tras una transición interna tiene un placeholder con geometría reservada.
- [ ] Las fuentes usan font-display: optional o una estrategia equivalente anti-swap tardío.
- [ ] Los ads y embeds no se inyectan en caliente sobre contenido pintado sin contenedor de altura mínima.
- [ ] Mides CLS por URL de destino y soft navigation, no solo por la URL de entrada.`
  }
];

/* =========================================================================
 * SEO PARA BÚSQUEDA POR VOZ: RECURSOS DESCARGABLES
 * ========================================================================= */
export const ARTICLE_VOZ_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'voz-html-completo',
    name: 'Código HTML Completo del Artículo (SEO Búsqueda por Voz)',
    description: 'Archivo HTML5 semántico con las 3 capas de respuesta conversacional y accesibilidad de audio.',
    fileName: 'seo-busqueda-por-voz-contenido-conversacional.html',
    fileType: 'text/html',
    size: '11.8 KB',
    fileContent: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>SEO para búsqueda por voz: contenido conversacional | Wacha Multimedia</title>
  <meta name="description" content="Speech-to-Retrieval cambia la búsqueda por voz: menos dependencia de transcripción, más intención. Claves de contenido conversacional y respuestas directas.">
</head>
<body>
\${ARTICLE_2_HTML}
</body>
</html>`
  },
  {
    id: 'plantilla-respuesta-hablada',
    name: 'Plantilla de Respuesta Hablada de Tres Niveles (S2R Framework)',
    description: 'Estructura editorial probada: Nivel 1 (20-30 palabras), Nivel 2 (40-60 palabras), Nivel 3 (Contexto y límites).',
    fileName: 'plantilla-respuesta-hablada-3-niveles.md',
    fileType: 'text/markdown',
    size: '1.9 KB',
    fileContent: `# Plantilla de Respuesta Hablada de Tres Niveles (Wacha Studios)

### Nivel 1 — Respuesta directa (20–30 palabras)
Empieza con la respuesta, no con el contexto. 
> "Para optimizar contenido para búsqueda por voz, abre cada sección con una respuesta directa de 20 a 30 palabras y usa encabezados formulados como preguntas naturales."

### Nivel 2 — Desarrollo (40–60 palabras)
Explica el cómo o el por qué en un párrafo autocontenido sin remisiones a párrafos previos.

### Nivel 3 — Contexto y matices
Límites técnicos, excepciones de la plataforma y fuentes documentadas.`
  },
  {
    id: 'faqpage-voice-jsonld',
    name: 'Marcado Schema.org FAQPage para Asistentes y Speech Retrieval',
    description: 'JSON-LD estructurado para facilitar la extracción fonética por parte de Google Assistant y agentes conversacionales.',
    fileName: 'faqpage-voice-search-schema.json',
    fileType: 'application/json',
    size: '1.5 KB',
    fileContent: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo optimizar contenido para búsqueda por voz bajo el modelo Speech-to-Retrieval?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Abre cada sección con una respuesta directa y autocontenida de 20 a 30 palabras, usa encabezados formulados como preguntas en lenguaje natural y complementa con marcado estructurado FAQPage y transcripciones accesibles de audio."
      }
    }
  ]
}`
  }
];

/* =========================================================================
 * CORE UPDATES Y CONTENIDO ASISTIDO POR IA: RECURSOS DESCARGABLES
 * ========================================================================= */
export const ARTICLE_CORE_RESOURCES: BlogDownloadResource[] = [
  {
    id: 'core-updates-html-completo',
    name: 'Código HTML Completo del Artículo (Core Updates y Contenido IA)',
    description: 'Archivo HTML5 semántico con la guía de autoría verificable, E-E-A-T y control de calidad editorial.',
    fileName: 'google-core-updates-contenido-asistido-ia.html',
    fileType: 'text/html',
    size: '13.2 KB',
    fileContent: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Actualizaciones Core de Google y contenido asistido por IA | Wacha Multimedia</title>
  <meta name="description" content="Google no prohíbe la IA. Exige revisión humana, autoría real y contenido principal con esfuerzo, originalidad, habilidad y precisión.">
</head>
<body>
\${ARTICLE_3_HTML}
</body>
</html>`
  },
  {
    id: 'checklist-publicacion-ia-eeat',
    name: 'Checklist Editorial en 4 Niveles para Contenido Asistido por IA',
    description: 'Protocolo de validación factual, atribución de autoría real, valor original y expectativas realistas.',
    fileName: 'checklist-publicacion-contenido-ia-eeat.md',
    fileType: 'text/markdown',
    size: '2.8 KB',
    fileContent: `# Checklist de Publicación para Contenido Asistido por IA (Wacha Studios)

## Nivel 1 — Verificación factual (obligatoria)
- [ ] Cada afirmación factual del texto ha sido contrastada con una fuente primaria u oficial.
- [ ] Las cifras, fechas y nombres propios han sido revisados manualmente.
- [ ] Las fuentes citadas existen y dicen lo que se les atribuye.
- [ ] El título, metadescripción, schema y alt text han sido revisados con el mismo rigor que el cuerpo.

## Nivel 2 — Autoría y responsabilidad editorial
- [ ] El autor o la autora existen y su identidad es verificable.
- [ ] No hay biografías ni fotos de perfil falsas generadas por IA presentadas como personas reales.
- [ ] La página identifica con claridad quién es responsable del contenido y canales de contacto.

## Nivel 3 — Valor original y contenido principal
- [ ] El contenido aporta datos propios, experiencia empírica de primera mano o procedimientos probados.
- [ ] No es una regurgitación de resúmenes de terceros.
- [ ] Las secciones interactivas, tablas o calculadoras también cumplen los estándares de precisión.

## Nivel 4 — Expectativas realistas
- [ ] Se entiende que optimizar no garantiza un reseteo instantáneo frente a AI Overviews.
- [ ] La auditoría y revisión se mantiene como un proceso editorial continuo.`
  },
  {
    id: 'techarticle-author-attribution-jsonld',
    name: 'Schema JSON-LD TechArticle con Atribución y Revisión Humana Verificable',
    description: 'Marcado estructurado que demuestra E-E-A-T declarando entidad creadora, revisor humano y directrices editoriales.',
    fileName: 'techarticle-author-attribution.json',
    fileType: 'application/json',
    size: '1.6 KB',
    fileContent: `{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Actualizaciones Core de Google y contenido asistido por IA: experiencia, precisión y responsabilidad editorial",
  "author": {
    "@type": "Organization",
    "name": "WACHA Producciones Multimedia",
    "url": "https://whacha.site"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wacha Studios",
    "logo": "https://whacha.site/wacha_logo.jpg"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Mr. Decrépito",
    "jobTitle": "Head of Engineering & AEO"
  },
  "datePublished": "2026-10-29T10:00:00Z"
}`
  }
];
