import { BlogPost } from '../types';
import { 
  ARTICLE_1_RESOURCES, 
  ARTICLE_2_RESOURCES, 
  ARTICLE_3_RESOURCES,
  ARTICLE_CWV_RESOURCES,
  ARTICLE_VOZ_RESOURCES,
  ARTICLE_CORE_RESOURCES,
  ARTICLE_GEO_RESOURCES,
  ARTICLE_INDAUTOR_RESOURCES,
  ARTICLE_YOUTUBE_RESOURCES
} from './blogResources';
import {
  ARTICLE_1_HTML,
  ARTICLE_2_HTML,
  ARTICLE_3_HTML,
  ARTICLE_GEO_HTML,
  ARTICLE_INDAUTOR_HTML,
  ARTICLE_YOUTUBE_HTML
} from './articleHtmlData';

export const INITIAL_BLOG_ARTICLES: BlogPost[] = [
  {
    id: 'aeo-2026-guia-definitiva-gemini-perplexity',
    slug: 'aeo-2026-guia-definitiva-gemini-perplexity',
    title: 'AEO 2026: La Guía Definitiva para Dominar Respuestas en Gemini, SearchGPT y Perplexity',
    excerpt: 'Cómo reestructurar el contenido semántico y las entidades de marca para ser la fuente primaria citada en motores de respuesta sintéticos.',
    category: 'AEO',
    tags: ['AEO', 'Gemini', 'SearchGPT', 'Perplexity', 'JSON-LD', 'GEO'],
    publishedAt: '28 Oct 2026',
    readTime: '12 min',
    image: '/aeo_2026_guide_cover.jpg',
    isFeatured: true,
    stats: {
      views: '4.8K lecturas',
      impact: 'Top #1 en Gemini Overview'
    },
    author: {
      name: 'Mr. Decrépito',
      role: 'Head of Engineering & AEO Wacha Studios',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Los LLMs no buscan coincidencia exacta de keywords; indexan grafos de conocimiento, autoridad factual y credibilidad de entidad.',
      'El marcado JSON-LD estructurado anidado con SameAs y HasPart reduce en 70% las alucinaciones de IA sobre tu producto o servicio.',
      'La tasa de citación en respuestas sintéticas aumenta cuando los artículos responden preguntas directas en los primeros 120 caracteres de cada sección con datos empíricos.'
    ],
    content: [
      'El SEO tradicional ha cambiado para siempre. Mientras que en 2023 el objetivo era competir por la posición azul #1 en la página de resultados (SERP), en 2026 más del 52% de las consultas en Google, Bing y navegadores móviles son resueltas de manera instantánea mediante resúmenes de inteligencia artificial generativa.',
      'AEO (Answer Engine Optimization) y GEO (Generative Engine Optimization) no se basan en saturar párrafos con palabras clave repetitivas. Los modelos como Gemini 2.5 Flash, Perplexity Sonar y SearchGPT descomponen los sitios en fragmentos de hechos atómicos (factoids). Si tu web no tiene claridad semántica, el modelo simplemente seleccionará a tu competidor como referencia.',
      'En Wacha Multimedia implementamos una estrategia de 3 capas: primero, validación de entidad de marca mediante marcado Schema.org enriquecido; segundo, redacción con "Information Gain" real, aportando métricas y metodologías originales; y tercero, micro-formatos de pregunta/respuesta que permiten a los rastreadores de IA ingerir definiciones exactas sin ambigüedad.'
    ],
    sections: [
      {
        heading: '1. Contexto y Evolución de AEO / GEO frente a SEO tradicional',
        body: 'El paradigma de búsqueda transitó de indexar páginas a comprender entidades del mundo real. Los motores sintéticos no envían a los usuarios a explorar diez enlaces azules; leen, razonan y sintetizan una respuesta única citando entre dos y cuatro fuentes con máxima autoridad semántica. Si tu contenido no contiene respuestas concisas y verificables en su primer tercio, queda invisible para los agentes de IA.'
      },
      {
        heading: '2. Diferencias Técnicas entre Motores (Google Gemini vs SearchGPT vs Perplexity AI)',
        body: 'Google Gemini se apoya en el Grafo de Conocimiento institucional y en rastreos en tiempo real con Gemini 2.5 Flash, ponderando el marcado Schema.org y los enlaces sameAs. SearchGPT (OpenAI) prioriza el pipeline de embeddings neuronales y fragmentos concisos orientados a la intención conversacional del usuario. Perplexity AI (Sonar) rastrea con bots activos (PerplexityBot), favoreciendo páginas con tablas de datos, fuentes académicas y formatos de Preguntas Frecuentes (FAQPage).'
      },
      {
        heading: '3. Grafos de Conocimiento, Datos Vinculados y Entidades (Things, Not Strings)',
        body: 'Las entidades son conceptos únicos identificables (personas, organizaciones, obras creativas, productos) definidos por sus propiedades y relaciones. La propiedad sameAs en JSON-LD vincula tu dominio con Wikidata, perfiles oficiales de YouTube, TikTok, Bandcamp o Spotify, certificando ante los LLMs que no se trata de una alucinación o dominio falso.'
      },
      {
        heading: '4. Integración y Acceso Vía APIs Oficiales',
        body: 'Para auditar sistemáticamente tu visibilidad, los equipos de ingeniería deben consultar directamente los endpoints de Gemini API (@google/genai), OpenAI API y Perplexity API con prompts automatizados que midan el "Citation Share" (cuota de citación) frente a los competidores del sector.'
      },
      {
        heading: '5. Estrategia de Contenido y Marcado Semántico (Information Gain)',
        body: 'Cada encabezado H2 y H3 debe responder a la pregunta fundamental en menos de 120 caracteres. Posteriormente, añade datos cuantitativos originales, casos de estudio propios y tablas comparativas. Google penaliza páginas sintéticas recicladas; la única defensa es aportar "Information Gain" genuino con metodologías registradas.'
      },
      {
        heading: '6. Ejemplo Práctico de Código JSON-LD Anidado',
        body: 'Implementa un bloque script type="application/ld+json" en la cabecera que contenga un grafo semántico (@graph) unificando Organization, Person (autor), TechArticle y FAQPage. Puedes descargar la plantilla completa lista para producción en los recursos descargables de este artículo.'
      },
      {
        heading: '7. Prompts de Prueba y Auditoría de Entidad',
        body: 'Valida tu autoridad ejecutando prompts estructurados en Gemini y Perplexity: solicita un resumen de tu marca exigiendo fuentes primarias y verifica que el modelo no confunda servicios ni atribuya información de terceros.'
      },
      {
        heading: '8. Checklist Técnico y Editorial de Implementación',
        body: 'Revisa: marcado JSON-LD libre de errores en Rich Results Test, sitemap.xml con fechas ISO 8601, robots.txt con acceso abierto a GPTBot y PerplexityBot, Core Web Vitals con INP < 50ms y cero CLS, y metadatos Open Graph / Twitter Card sincronizados.'
      },
      {
        heading: '9. Métricas, KPIs y Medición del Éxito (Citation Share)',
        body: 'Sustituye la métrica obsoleta de "posicionamiento promedio por keyword" por el Citation Share (% de consultas resueltas citando tu web), el tráfico de referencia proveniente de dominios de IA y la coherencia de atributos en el Knowledge Graph.'
      },
      {
        heading: '10. Riesgos Legales, Éticos y Sostenibilidad',
        body: 'Protégete de alucinaciones corporativas manteniendo registros públicos actualizados. En Wacha Studios auditamos semanalmente la coherencia de catálogo y propiedad intelectual en los principales índices generativos.'
      },
      {
        heading: '11. Conclusión y Hoja de Ruta 2026',
        body: 'El AEO no es una moda pasajera; es la arquitectura de supervivencia digital para los próximos cinco años. Las marcas que estructuran sus entidades hoy serán las fuentes irremplazables del ecosistema de inteligencia artificial de mañana.'
      }
    ],
    resources: ARTICLE_1_RESOURCES
  },
  {
    id: 'schema-grafos-conocimiento-entidades',
    slug: 'schema-grafos-conocimiento-entidades',
    title: 'Schema.org y Grafos de Conocimiento: De HTML Básico a Entidades Reconocidas por Google',
    excerpt: 'Aprende a usar datos estructurados (Schema.org, JSON-LD, microdatos) para que Google entienda tus páginas, mejore el SEO/AEO y reconozca entidades en su Knowledge Graph.',
    category: 'SEO Técnico',
    tags: ['Schema.org', 'JSON-LD', 'Knowledge Graph', 'SEO Técnico', 'Entidades', 'Microdatos'],
    publishedAt: '25 Oct 2026',
    readTime: '14 min',
    image: '/schema_org_knowledge_graph.png',
    isFeatured: false,
    stats: {
      views: '3.2K lecturas',
      impact: '100% Rich Snippets Valid'
    },
    author: {
      name: 'Equipo Técnico Wacha',
      role: 'DevSecOps & Web Architecture',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Google prioriza entidades sobre cadenas de texto (Things not Strings) para alimentar su Knowledge Graph.',
      'Vincular perfiles oficiales mediante la propiedad sameAs consolida la autoridad semántica del dominio.',
      'JSON-LD es el formato oficialmente recomendado por Google para estructurar Person, Organization, Article, Product y Event.'
    ],
    content: [
      'Los datos estructurados (Schema.org) son un formato estandarizado que facilita a Google comprender el contenido de tus páginas web. Al marcar elementos clave (persona, organización, artículo, producto, evento) con vocabulario de Schema.org, Google puede indexar esa información en su Knowledge Graph y mostrar rich results o fragmentos enriquecidos en las búsquedas. Por ejemplo, sitios como Rotten Tomatoes aumentaron en un 25% su tasa de clics usando datos estructurados.',
      'Google recomienda usar JSON-LD por ser fácil de implementar y mantener, aunque también acepta Microdatos y RDFa. En esta guía técnica mostramos desde cero cómo integrar Schema.org en HTML básico hasta lograr que Google reconozca tus entidades (Person, Organization, Article, Product, Event).',
      'Incluimos ejemplos en HTML (Microdatos) y JSON-LD, mejores prácticas SEO/AEO (vocabularios, datos vinculados, canonical, hreflang), un checklist de implementación, una tabla comparativa de formatos y pautas de diagnóstico de errores con la Prueba de Resultados Enriquecidos y Search Console.'
    ],
    sections: [
      {
        heading: '¿Qué son Schema.org y los datos estructurados?',
        body: 'Schema.org es un vocabulario estandarizado de datos estructurados que define tipos (Person, Organization, Article, Product, Event, etc.) y sus propiedades (name, datePublished, location, price, etc.). Permite etiquetar partes del contenido HTML de forma semántica, ya sea mediante Microdatos (atributos en etiquetas HTML), RDFa o JSON-LD (un bloque script en JSON). Google y otros motores de búsqueda usan estos datos para entender el significado real de tu página.'
      },
      {
        heading: '¿Cómo aprovecha Google los datos estructurados?',
        body: 'Google Search utiliza los datos estructurados del sitio web para comprender el contenido de la página y recopilar información sobre el mundo real. Además, los datos estructurados alimentan el Knowledge Graph de Google, que es la base de datos de hechos y entidades (personas, lugares, organizaciones) que nutre las fichas de conocimiento (knowledge panels) y respuestas directas. Usar la propiedad sameAs con enlaces a Wikipedia o perfiles oficiales vincula tu contenido a la entidad correcta.'
      },
      {
        heading: 'Ejemplos de marcado estructurado (Person, Organization, Article, Product, Event)',
        body: 'Para Person: define name, jobTitle, email, sameAs e image. Para Organization: vincula address (PostalAddress), telephone, url y logo. Para NewsArticle / Article: incluye headline, image, datePublished, dateModified y author. Para Product: detalla offers con priceCurrency, price y availability. Para Event: especifica startDate, location y offers.'
      },
      {
        heading: 'Buenas prácticas SEO y AEO con datos estructurados',
        body: 'Google prefiere JSON-LD cuando sea posible porque no altera el HTML visible, reduciendo errores de marcado. Asegúrate de incluir @context: "https://schema.org" y @type correctos. Utiliza propiedades de Linked Data como sameAs para enlazar a Wikidata y perfiles oficiales. No marques contenido oculto al usuario para evitar sanciones por spam estructurado.'
      },
      {
        heading: 'Comparativa de formatos: Microdatos vs RDFa vs JSON-LD',
        body: 'Microdatos se integra directamente en las etiquetas HTML, lo que dificulta el mantenimiento a largo plazo. RDFa es flexible para grafos complejos pero muy verboso. JSON-LD es modular, reside en un bloque script independiente, no estorba el DOM y es la recomendación oficial de Google Search Central.'
      },
      {
        heading: 'Checklist de implementación y errores comunes',
        body: 'Verifica: presencia de campos obligatorios, fechas en formato ISO 8601 (YYYY-MM-DD), precios numéricos sin símbolos de moneda, URLs canónicas absolutas y eliminación de vocabularios obsoletos como data-vocabulary.org.'
      },
      {
        heading: 'Pruebas y herramientas oficiales',
        body: 'Utiliza la Prueba de Resultados Enriquecidos (Rich Results Test) de Google durante el desarrollo y revisa el informe de Resultados Enriquecidos en Google Search Console tras el despliegue para detectar anomalías de rastreo.'
      },
      {
        heading: 'Meta tags Open Graph, Twitter Cards e Imagen Conceptual SVG',
        body: 'Acompaña siempre el marcado Schema.org con etiquetas Open Graph (og:title, og:description, og:image, og:url) y Twitter Cards (summary_large_image). En los recursos descargables encontrarás la infografía conceptual SVG lista para usar.'
      },
      {
        heading: 'Conclusión y Fuentes Oficiales',
        body: 'El uso riguroso de Schema.org y datos estructurados conecta tu contenido con la inteligencia de Google. Fuentes: Documentación oficial Schema.org, Guías de Google Search Central y estudios de caso de aumentos de CTR de Google.'
      }
    ],
    resources: ARTICLE_2_RESOURCES
  },
  {
    id: 'algoritmo-retencion-youtube-shorts-tiktok',
    slug: 'algoritmo-retencion-youtube-shorts-tiktok',
    title: 'Algoritmo de Retención en Shorts & TikTok: El Ratio 3s / 4.5s de Wacha Studios',
    excerpt: 'Análisis de más de 450 horas de video: cómo la sincronización de ganchos de audición y cortes visuales multiplica el Average View Duration.',
    category: 'Video SEO',
    tags: ['YouTube CTR', 'TikTok', 'Video SEO', 'Retención', 'Shorts', 'Foley'],
    publishedAt: '21 Oct 2026',
    readTime: '10 min',
    image: '/retencion_shorts_tiktok_cover.jpg',
    isFeatured: true,
    stats: {
      views: '6.1K lecturas',
      impact: '+140% AVD Promedio'
    },
    author: {
      name: 'Mr. Decrépito',
      role: 'Head of Engineering & AEO Wacha Studios',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Los primeros 3 segundos determinan si el algoritmo categoriza el video como "Engaging" o "Skipped".',
      'Cada 4.5 segundos debe existir una renovación sensorial: corte de cámara, foley sonoro, tipografía reactiva o zoom dinámico.',
      'El guión con cierre en bucle sin fisuras (seamless loop) dispara el re-watching multiplicando el AVD por encima del 100%.'
    ],
    content: [
      'El mayor error de los creadores y marcas que migran a video corto es tratar un Short como un anuncio de televisión de los años noventa con intros lentas o logotipos flotantes al inicio. En la economía de la atención, un usuario desliza su pulgar en menos de 800 milisegundos si no detecta una promesa de valor instantánea.',
      'En la red de canales de Wacha Multimedia, que supera los 2.4 millones de impresiones diarias, aplicamos la regla de oro: cero intros, ganchos de audio en el segundo 0.2 y subtítulos kinetic brutalistas que refuerzan cada palabra clave.',
      'Además, los algoritmos de transcripción automática de YouTube y TikTok leen cada palabra hablada para indexar el video en el buscador. Hablar con términos semánticos precisos es hoy tan importante como la etiqueta o el título del video.'
    ],
    sections: [
      {
        heading: '1. La Deconstrucción de la Economía de Atención: 800ms para Detener el Pulgar',
        body: 'El feed vertical es un flujo constante de dopamina rápida. Los usuarios toman la decisión subconsciente de omitir o quedarse en los primeros 800 milisegundos. Cualquier elemento que genere fricción —una cortinilla animada, un saludo genérico o un silencio ambiental— incrementa la tasa de abandono hasta en un 68%.'
      },
      {
        heading: '2. El Ratio 3s / 4.5s de Wacha Studios: Gancho de Audición y Renovación Sensorial',
        body: 'Nuestra fórmula empírica divide el video en dos fases críticas: la fase de anclaje (0 a 3 segundos) con un gancho auditivo agudo y promesa de beneficio, seguida de ventanas de renovación sensorial cada 4.5 segundos (cortes de plano, efectos de sonido foley y cambios de perspectiva) para reiniciar la atención del cerebro.'
      },
      {
        heading: '3. Psicología del Gancho en 0-3 Segundos: Micro-historias y Preguntas de Tensión',
        body: 'Evita afirmaciones predecibles. Inicia con una contradicción aparente, una estadística chocante o una pregunta que abra un bucle de curiosidad imposible de ignorar antes del segundo 3.'
      },
      {
        heading: '4. Edición Kinetic Brutalista: Subtítulos de Alto Contraste y Tipografías Reactivas',
        body: 'Más del 60% de los usuarios consumen videos en silencio o en entornos ruidosos. Los subtítulos kinetic en amarillo (#D4FF00) o blanco sobre fondos negros, sincronizados al milisegundo con cada palabra pronunciada, garantizan la comprensión instantánea.'
      },
      {
        heading: '5. El Bucle Infinito (Seamless Loop): Estructuración del Fin con el Inicio',
        body: 'Estructurar la última oración del guión para que se enlace de forma gramatical y auditiva con la primera oración del inicio hace que el usuario vuelva a ver el video sin darse cuenta, disparando el Average View Duration (AVD) por encima del 100%.'
      },
      {
        heading: '6. Indexación de Transcripción Fonética y Video SEO',
        body: 'Los modelos de transcripción automática de YouTube (Whisper) analizan el audio para detectar entidades. Mencionar explícitamente los términos técnicos en los primeros cinco segundos posiciona el video en búsquedas sugeridas de Google y YouTube Search.'
      },
      {
        heading: '7. Matriz de Retención: Estudio de Caso Empírico con +2.4M de Impresiones Diarias',
        body: 'Al aplicar esta metodología en los canales de Wacha Studios, redujimos la tasa de swipe-away del 46% al 19%, y elevamos la retención promedio a los 30 segundos en un 82%.'
      },
      {
        heading: '8. Plantilla Práctica de Guión de 30-45 Segundos',
        body: 'Descarga en la sección de complementos la plantilla estructurada segundo a segundo con marcadores de foley, giros de guión y cierre en bucle sin fisuras.'
      },
      {
        heading: '9. Conclusión: El Video Corto como Embudo de Conversión de Alta Fidelidad',
        body: 'El formato corto no es solo entretenimiento efímero; es el punto de entrada de mayor velocidad hacia productos digitales, servicios profesionales y suscripciones de marca.'
      }
    ],
    resources: ARTICLE_3_RESOURCES
  },
  {
    id: 'geo-muerte-keyword-stuffing-citation-authority',
    slug: 'geo-muerte-keyword-stuffing-citation-authority',
    title: 'GEO (Generative Engine Optimization): La muerte del Keyword Stuffing',
    excerpt: 'Cómo ser una fuente confiable en la era de la IA. Por qué repetir palabras clave ya no funciona y cómo posicionar en Gemini, SearchGPT y Perplexity mediante coherencia, entidades de marca y citas verificables.',
    category: 'AEO',
    tags: ['GEO', 'AEO', 'Keyword Stuffing', 'Motores Generativos', 'Entidades', 'Gemini', 'Perplexity', 'SearchGPT'],
    publishedAt: '02 Nov 2026',
    readTime: '9 min',
    image: '/GEO__La_muerte_del_keyword_stuffing_2f325e9d.png',
    isFeatured: true,
    stats: {
      views: '5.2K lecturas',
      impact: '100% Citable Citation Rate'
    },
    author: {
      name: 'WACHA Producciones Multimedia',
      role: 'DevSecOps & Web Architecture',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'GEO sustituye la densidad de keywords por relevancia semántica, fuentes citadas y coherencia entre plataformas.',
      'Los modelos de lenguaje no cuentan palabras; comprenden conceptos, contrastan hechos y evalúan entidades del Knowledge Graph.',
      'La pérdida de tráfico de los "10 enlaces azules" se compensa con conversiones de mayor intención cuando tu marca es la fuente de la respuesta sintética.',
      'El marcado JSON-LD con sameAs y la coherencia en redes sociales son la base técnica imprescindible para la autoridad generativa.'
    ],
    content: [
      'Durante más de dos décadas, el SEO funcionó bajo una lógica predecible: encuentra una palabra clave con volumen, inclúyela en el título, en los subtítulos y a lo largo del texto, consigue algunos enlaces y espera a que Google te premie con tráfico. Esa lógica está muerta.',
      'La llegada y consolidación de motores de búsqueda generativos —como Google con sus resúmenes de IA (AI Overviews), ChatGPT Search, Perplexity AI y Copilot— ha cambiado las reglas de juego. Ya no se trata de quién repite más veces un término, sino de quién aporta la respuesta más completa, estructurada y verificable.',
      'GEO (Generative Engine Optimization) es el conjunto de estrategias destinadas a que tu contenido sea encontrado, comprendido y citado por modelos de lenguaje grande (LLMs) y motores de búsqueda basados en IA. A diferencia del SEO tradicional, cuyo fin era aparecer en los diez enlaces azules, el objetivo de GEO es que tu marca o contenido sea la fuente directa que la IA utiliza para responder.'
    ],
    sections: [
      {
        heading: '1. ¿Qué es GEO y en qué se diferencia del SEO tradicional?',
        body: 'El SEO tradicional optimizaba para rastreadores de concordancia léxica y PageRank. GEO optimiza para LLMs que procesan semántica contextual y grafos de conocimiento. El resultado buscado no es un clic en una lista, sino ser la fuente citada dentro de la síntesis de IA, logrando usuarios con mucha mayor intención de conversión.'
      },
      {
        heading: '2. Por qué el Keyword Stuffing ya no funciona en la era de los LLMs',
        body: 'Los modelos no buscan coincidencias literales de texto; procesan embeddings semánticos y vectores de significado. Además, los motores integran filtros anti-spam que penalizan patrones artificiales de repetición. Si un texto es repetitivo, el LLM concluye que carece de valor informativo ("Information Gain") y lo descarta como fuente de síntesis.'
      },
      {
        heading: '3. Los 4 pilares fundamentales de GEO',
        body: 'Pilar 1: Coherencia informativa y datos verificables (cifras, fechas y fuentes directas). Pilar 2: Estructura clara y lenguaje natural (H2/H3 en forma de preguntas directas con respuestas inmediatas). Pilar 3: Entidad de marca y autoridad de autor (E-E-A-T transparente, experiencia demostrada y contacto verificable). Pilar 4: Presencia cruzada y consistencia digital (mismos datos en web, redes sociales, registros públicos y directorios).'
      },
      {
        heading: '4. Cómo estructurar tu contenido para que la IA te cite',
        body: 'Utiliza el principio de la pirámide invertida: responde a la pregunta principal en el primer párrafo (40-60 palabras). Desarrolla los matices a continuación con listas ordenadas, tablas comparativas y datos cuantitativos. Los LLMs extraen tablas y listas con facilidad para elaborar comparaciones sintéticas.'
      },
      {
        heading: '5. La base técnica imprescindible: Schema.org y datos estructurados',
        body: 'Los modelos de IA dependen de datos estructurados para validar entidades. Implementa Organization, TechArticle, FAQPage y Person con enlaces sameAs a Wikidata y perfiles oficiales para que los rastreadores identifiquen unívocamente a tu organización.'
      },
      {
        heading: '6. Métricas: Cómo medir el éxito en la era de GEO',
        body: 'Mide menciones en respuestas de IA (Gemini, Perplexity, SearchGPT), tráfico de referencia proveniente de dominios de IA (chatgpt.com, perplexity.ai), Share of Model (porcentaje de consultas del sector que te mencionan) y conversiones cualificadas de usuarios informados.'
      },
      {
        heading: '7. Conclusión: El contenido de valor sigue ganando',
        body: 'La muerte del keyword stuffing no es una mala noticia: es una liberación para quienes generan valor genuino. En la era de la inteligencia artificial, la ventaja competitiva no está en engañar a un algoritmo, sino en construir autoridad verificable y conocimiento citable.'
      }
    ],
    resources: ARTICLE_GEO_RESOURCES,
    htmlContent: ARTICLE_GEO_HTML
  },
  {
    id: 'core-web-vitals-spa-inp-cls',
    slug: 'core-web-vitals-spa-inp-cls',
    title: 'Core Web Vitals en SPAs: mejorar INP y CLS sin romper la interactividad',
    excerpt: 'Una puntuación perfecta en Lighthouse no garantiza buenos Core Web Vitals en usuarios reales de una SPA. Chrome 151 ya permite medir soft navigations; aquí tienes qué cambia y cómo actuar sobre INP y CLS sin sacrificar la interacción.',
    category: 'SEO Técnico',
    tags: ['Core Web Vitals', 'SPA', 'INP', 'CLS', 'Chrome 151', 'soft navigations', 'rendimiento web', 'CrUX'],
    publishedAt: '29 Oct 2026',
    readTime: '11 min',
    image: '/assets/aistudio/Core_web_4a9d509c.jpg',
    isFeatured: true,
    stats: {
      views: '3.9K lecturas',
      impact: 'Chrome 151 Soft Navs Ready'
    },
    author: {
      name: 'WACHA Producciones Multimedia',
      role: 'Head of Engineering & Web Performance',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Una puntuación perfecta en Lighthouse no garantiza buenos Core Web Vitals en usuarios reales de una SPA.',
      'Chrome 151 emite eventos soft-navigation y navigationId, permitiendo a CrUX medir LCP, INP y CLS segmentados por ruta.',
      'scheduler.yield() permite fragmentar tareas de más de 50ms para evitar bloqueos en el hilo principal.',
      'Reservar aspect-ratio y dimensiones para imágenes y embeds antes de su carga resuelve la mayor parte de los problemas de CLS.'
    ],
    content: [
      'Una SPA puede obtener 100/100 en Lighthouse y, aun así, fallar INP o CLS en datos de campo. La razón es estructural: Lighthouse simula una carga; una SPA real pasa minutos —o horas— ejecutando JavaScript, cambiando rutas y respondiendo a interacciones dentro del mismo documento.',
      'La API de Soft Navigations, disponible desde Chrome 151, define una soft navigation cuando se cumplen tres condiciones: la inicia el usuario, cambia la URL visible y produce una pintura de contenido visible. Con la API activada, Chrome emite eventos soft-navigation y añade un navigationId a las entradas de rendimiento.',
      'INP mide la latencia completa de una interacción: retardo de entrada, procesamiento y pintura. Un INP bueno es ≤ 200 ms en el percentil 75. La técnica más efectiva es fragmentar tareas largas con scheduler.yield(). En cuanto al CLS, el secreto es reservar las cajas geométricas antes de que el contenido asíncrono responda.'
    ],
    sections: [
      {
        heading: '1. El problema del 100/100 que no se traduce en usuarios reales',
        body: 'Lighthouse mide la carga inicial en condiciones de laboratorio estáticas. En una SPA, el usuario ejecuta cientos de eventos tras el montaje. Hasta Chrome 151, las interacciones tardías se imputaban erróneamente a la primera vista, distorsionando la auditoría de campo.'
      },
      {
        heading: '2. Qué cambió con Chrome 151 y las soft navigations',
        body: 'Por primera vez, CrUX publica versiones experimentales con soft navigations. Puedes segmentar el rendimiento de la carga inicial del de cada transición interna, aunque Safari y Firefox aún no emiten estas señales en abril de 2026.'
      },
      {
        heading: '3. Por qué INP es el CWV que más castiga a las SPAs',
        body: 'Cada clic compite con el hilo principal saturado por listeners globales y frameworks. La solución recomendada es dividir la ejecución en bloques menores de 50 ms usando scheduler.yield() con fallback a setTimeout(0), o delegar procesos pesados a Web Workers.'
      },
      {
        heading: '4. CLS en SPAs: el problema no es la carga, es la re-renderización',
        body: 'El layout shift ocurre tras cambios de ruta cuando los componentes se montan sin dimensiones precalculadas. Usa aspect-ratio: 16/9 y contain-intrinsic-size en CSS, junto con font-display: optional para fuentes tipográficas.'
      },
      {
        heading: '5. Checklist de intervención inmediata para SPAs',
        body: 'Identifica tareas mayores a 50ms con Chrome DevTools, difiere scripts de analítica, audita listeners en document y garantiza que toda imagen o iframe posea contenedor con geometría reservada.'
      }
    ],
    resources: ARTICLE_CWV_RESOURCES,
    htmlContent: ARTICLE_1_HTML
  },
  {
    id: 'seo-busqueda-por-voz-contenido-conversacional',
    slug: 'seo-busqueda-por-voz-contenido-conversacional',
    title: 'SEO para búsqueda por voz: contenido conversacional, respuestas claras y accesibilidad de audio',
    excerpt: 'Google ya no convierte necesariamente tu voz en texto antes de buscar. Con Speech-to-Retrieval, la intención hablada se mapea directamente a la recuperación. Esto es lo que cambia —y lo que no— para el contenido orientado a búsqueda por voz.',
    category: 'AEO',
    tags: ['búsqueda por voz', 'SEO conversacional', 'Speech-to-Retrieval', 'AEO', 'accesibilidad de audio', 'contenido conversacional'],
    publishedAt: '29 Oct 2026',
    readTime: '9 min',
    image: '/assets/aistudio/image_8ef8e7bb_daf9c4dd.jpg',
    isFeatured: false,
    stats: {
      views: '3.4K lecturas',
      impact: 'S2R Intent Mapping'
    },
    author: {
      name: 'WACHA Producciones Multimedia',
      role: 'Voice SEO & AEO Architecture',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Speech-to-Retrieval (S2R) mapea la intención hablada directamente hacia la recuperación sin depender de una transcripción léxica perfecta.',
      'Las respuestas directas ideales para lectura por asistentes se sitúan en el rango de 20 a 30 palabras.',
      'Los encabezados formulados como preguntas naturales aumentan drásticamente la probabilidad de selección en snippets hablados.',
      'La accesibilidad del audio (subtítulos precisos y estructura no exclusivamente visual) es indispensable para el rastreo por voz.'
    ],
    content: [
      'Durante años, la optimización para búsqueda por voz se construyó sobre una premisa: el asistente transcribe tu voz a texto y busca ese texto. Speech-to-Retrieval (S2R), presentado por Google Research en octubre de 2025, cambia la arquitectura interpretando directamente la intención de recuperación de la consulta hablada.',
      'La evidencia práctica de SEO para voz apunta a un patrón estable: consultas más largas, formuladas como preguntas completas, frecuentemente con intención local. El contenido que mejor funciona no es el que “suena coloquial”, sino el que abre con una respuesta directa de 20-30 palabras.',
      'No existe un factor de clasificación aislado llamado "Voice SEO": existe una superficie de recuperación multimodal (asistentes, auriculares inteligentes, S2R) que favorece contenidos con semántica autocontenida y marcado estructurado FAQPage.'
    ],
    sections: [
      {
        heading: '1. El matiz que cambia el punto de partida: S2R y la transcripción',
        body: 'El sistema ya no se pregunta qué palabras exactas se dijeron, sino qué información busca el usuario. Si la intención se comprende a nivel fonético y conceptual, el contenido relevante es recuperado aunque la transcripción contenga ruido fonético.'
      },
      {
        heading: '2. Qué es exactamente “contenido conversacional” para voz',
        body: 'Estructurar respuestas en dos rangos: 20-30 palabras para lectura instantánea por sintetizador de voz, y 40-60 palabras para párrafos explicativos que resuelvan la duda de principio a fin sin depender del contexto anterior.'
      },
      {
        heading: '3. La estructura que sí puedes implementar',
        body: 'Encabezados en forma de preguntas reales, respuestas directas en las primeras tres líneas, esquemas FAQPage / HowTo válidos y accesibilidad universal de audio mediante transcripciones sincronizadas.'
      },
      {
        heading: '4. Plantilla de respuesta hablada en tres niveles',
        body: 'Nivel 1 para la respuesta atómica inmediata; Nivel 2 para el desarrollo del cómo y el por qué; Nivel 3 para excepciones, fuentes y detalles técnicos avanzados.'
      }
    ],
    resources: ARTICLE_VOZ_RESOURCES,
    htmlContent: ARTICLE_2_HTML
  },
  {
    id: 'google-core-updates-contenido-asistido-ia',
    slug: 'google-core-updates-contenido-asistido-ia',
    title: 'Actualizaciones Core de Google y contenido asistido por IA: experiencia, precisión y responsabilidad editorial',
    excerpt: 'La actualización de las guías de Google de octubre de 2026 no crea un factor de ranking nuevo, pero hace explícito lo que antes estaba en las quality rater guidelines: el contenido asistido por IA debe revisarse, atribuirse y aportar valor verificable.',
    category: 'Algoritmos',
    tags: ['Core Updates', 'contenido asistido por IA', 'E-E-A-T', 'Google Search', 'calidad editorial', 'autoría', 'precisión'],
    publishedAt: '29 Oct 2026',
    readTime: '10 min',
    image: '/assets/aistudio/Core_update_b5a1b387.jpg',
    isFeatured: false,
    stats: {
      views: '4.5K lecturas',
      impact: 'E-E-A-T Quality Compliant'
    },
    author: {
      name: 'WACHA Producciones Multimedia',
      role: 'Editorial Standards & DevSecOps',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Google no penaliza el uso de herramientas de IA; penaliza el escalado masivo automatizado sin valor añadido ni esfuerzo humano.',
      'Los evaluadores de calidad buscan cuatro atributos indispensables: esfuerzo, originalidad, habilidad y precisión.',
      'El "contenido principal" incluye títulos, metadatos, alt text y elementos interactivos, no solo el cuerpo del artículo.',
      'Citar fuentes ajenas no sustituye al esfuerzo original: se exigen datos empíricos, casos propios y autorías transparentes.'
    ],
    content: [
      'Google mantiene desde febrero de 2023 una posición firme: el uso de IA para generar contenido no está prohibido. El riesgo aparece cuando la automatización se usa para producir contenido a escala con el propósito principal de manipular rankings sin aportar valor suficiente.',
      'Las actualizaciones de octubre de 2026 sincronizan la documentación oficial de Google Search Central con los criterios de los Quality Raters. La discusión útil ya no es si usas IA, sino si demuestras esfuerzo humano verificable, autoría real y precisión factual.',
      'Para protegerse ante Core Updates, la revisión editorial humana debe ser integral: abarcando el cuerpo del artículo, pero también títulos, resúmenes, esquemas estructurados y textos alternativos de imagen.'
    ],
    sections: [
      {
        heading: '1. El marco correcto: esfuerzo humano verificable',
        body: 'El contenido generado con IA no tiene penalización inherente, pero el escalado sin valor añadido viola las políticas anti-spam. La clave está en demostrar que detrás de cada publicación hay un profesional con experiencia de primera mano.'
      },
      {
        heading: '2. Qué cuenta como “contenido principal” según Google',
        body: 'Todo elemento que permita cumplir el propósito de la página: calculadoras, herramientas interactivas, tablas, pestañas y encabezados visibles. Un encabezado engañoso devalúa todo el documento.'
      },
      {
        heading: '3. Lo que Google penaliza de verdad: escalado y autoría falsa',
        body: 'Se persiguen enérgicamente las biografías inventadas, avatares generados por IA que fingen ser expertos y la republiación pasiva de resúmenes sin análisis crítico.'
      },
      {
        heading: '4. Checklist de publicación en 4 niveles para contenido asistido por IA',
        body: 'Nivel 1: Verificación factual de cifras y nombres. Nivel 2: Autoría y canales de contacto transparentes. Nivel 3: Valor original e innovación práctica. Nivel 4: Gestión de expectativas continuas.'
      }
    ],
    resources: ARTICLE_CORE_RESOURCES,
    htmlContent: ARTICLE_3_HTML
  },
  {
    id: 'registrar-cancion-indautor-subir-spotify-isrc-mexico',
    slug: 'registrar-cancion-indautor-subir-spotify-isrc-mexico',
    title: 'Cómo Registrar una Canción en INDAUTOR y Subirla a Spotify (2026)',
    excerpt: 'Proteger la propiedad intelectual de una obra musical y comercializarla en tiendas de streaming son dos procesos independientes. Conoce los requisitos documentales ante INDAUTOR en México ($367 MXN), el trámite express el mismo día en CDMX, la comparativa con el Copyright de EE. UU. y cómo gestionar los códigos ISRC para cobrar regalías en Spotify y Apple Music.',
    category: 'Music Business',
    tags: ['DerechosDeAutor', 'INDAUTOR', 'MusicaIndependiente', 'ISRC', 'DistribucionDigital', 'SpotifyForArtists', 'MusicBusiness'],
    publishedAt: '03 Nov 2026',
    readTime: '9 min',
    image: '/assets/aistudio/Gemini_Generated_Image_vz5l0wvz5l0wvz5l_1bffc25a.jpg',
    isFeatured: true,
    stats: {
      views: '6.2K lecturas',
      impact: 'Guía de Trámite Legal & Streaming'
    },
    author: {
      name: 'Wacha Multimedia & Sonido Decrépito',
      role: 'Music Production & Rights Management',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Tener el certificado de INDAUTOR otorga protección legal moral y patrimonial, pero para distribuir en streaming se requiere obligatoriamente un código ISRC emitido por agregadora o IFPI.',
      'El costo oficial de registro en México para 2026 es de $367 MXN por obra, con opción de entrega el mismo día mediante el servicio Express Autor en la Roma Norte (CDMX).',
      'Bajo el Convenio de Berna, el registro en INDAUTOR tiene plena validez jurídica internacional en Estados Unidos sin necesidad de pagar las tarifas en dólares de la U.S. Copyright Office salvo litigios federales.'
    ],
    content: [
      'En la gestión de proyectos musicales independientes, es indispensable diferenciar entre la protección del derecho patrimonial y moral y la identificación comercial en entornos digitales.',
      'Tener la constancia de registro ante el Instituto Nacional del Derecho de Autor (INDAUTOR) acredita la titularidad legal de la creación, pero no habilita la distribución del archivo en plataformas como Spotify, Apple Music, Tidal o Deezer. Para la comercialización digital se requiere una clave estandarizada de rastreo conocida como Código ISRC.',
      'El trámite ordinario demora 15 días hábiles, pero acudiendo a las oficinas centrales en Calle Puebla 143 en la CDMX con los formatos RPDA-01 y pago e5cinco realizado, se obtiene el certificado el mismo día en el módulo Express Autor.'
    ],
    sections: [
      {
        heading: '1. Protección Legal vs. Distribución Digital',
        body: 'El registro legal ante INDAUTOR protege la titularidad moral y económica, mientras que el código ISRC es la cédula numérica que permite a Spotify liquidar regalías a través de las agregadoras.'
      },
      {
        heading: '2. Formatos y Costos Oficiales 2026',
        body: 'Tarifa de $367 MXN. Para composición se entregan dos partituras/letras impresas; para máster o fonograma se entregan dos discos compactos o dos memorias USB con WAVs en alta fidelidad.'
      },
      {
        heading: '3. Trámite Presencial Express en CDMX',
        body: 'Oficinas centrales en Puebla 143, Roma Norte. Recepción matutina de 9:00 a 11:30 hrs y entrega el mismo día por la tarde.'
      },
      {
        heading: '4. Validez Internacional (Convenio de Berna)',
        body: 'Reconocimiento mutuo automático entre los 181 países firmantes, garantizando protección de catálogo mexicano en el extranjero.'
      }
    ],
    resources: ARTICLE_INDAUTOR_RESOURCES,
    htmlContent: ARTICLE_INDAUTOR_HTML
  },
  {
    id: 'algoritmo-youtube-miniaturas-ctr-retencion-psicologia-visual',
    slug: 'algoritmo-youtube-miniaturas-ctr-retencion-psicologia-visual',
    title: 'Algoritmo de YouTube y Miniaturas: Matriz de CTR, Retención y Psicología Visual',
    excerpt: 'Una puntuación alta de CTR con retención baja destruye el alcance orgánico. El algoritmo de YouTube selecciona las miniaturas ganadoras por watch time share (cuota de tiempo de visualización), no por clics superficiales. Conoce los parámetros visuales, la psicología del color, la legibilidad móvil a 120px y la matriz de auditoría previa a la publicación.',
    category: 'Video SEO',
    tags: ['YouTubeAlgorithm', 'ThumbnailDesign', 'CTR', 'Retention', 'WatchTimeShare', 'PsicologiaVisual', 'SEOYouTube'],
    publishedAt: '04 Nov 2026',
    readTime: '11 min',
    image: '/assets/aistudio/Man_viewing_glowing_formula_67bc91c9_593fa41a.jpg',
    isFeatured: true,
    stats: {
      views: '7.8K lecturas',
      impact: 'Fórmula Watch Time Share 2026'
    },
    author: {
      name: 'Equipo de Video SEO Wacha',
      role: 'Creative Packaging & Analytics Lab',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'El algoritmo de YouTube no premia el CTR aislado: premia CTR × Retención Temprana. Un clic con abandono en los primeros 30 segundos activa penalizaciones orgánicas por brecha de expectativa.',
      'El contraste de texto interior superior al 70% activa la ceguera publicitaria (efecto neón). El rango óptimo comprobado es del 35% al 45% con tipografía Sans-Serif gruesa.',
      'En la herramienta Test & Compare de YouTube Studio, las variantes deben competir por ángulos psicológicos radicalmente distintos y evaluarse por cuota de tiempo de visualización.'
    ],
    content: [
      'Durante años, el análisis de diseño para YouTube se concentró en una sola métrica: el Porcentaje de Clics (CTR). La estrategia convencional dictaba aumentar la saturación, rostros sobreactuados y tipografía gigante. Sin embargo, este enfoque ignoraba el factor determinante del posicionamiento orgánico.',
      'La arquitectura del algoritmo de distribución opera mediante una heurística centrada en la satisfacción del usuario: CTR × Retención Temprana. Esto implica que un video con un 12% de CTR pero solo 20% de retención promedio pierde distribución frente a una pieza con 6% de CTR y 55% de retención. El sistema no busca predecir clics aislados; predice tiempo de visualización satisfecho por impresión.',
      'Más del 70% de las reproducciones en YouTube ocurren en dispositivos móviles, donde el tamaño renderizado de una miniatura en el feed es de aproximadamente 120 píxeles de ancho. El rango óptimo se sitúa entre 0 y 3 palabras ubicadas en el tercio superior.'
    ],
    sections: [
      {
        heading: '1. La Trampa del CTR Aislado',
        body: 'El clic que abandona antes de 30 segundos genera penalización de distribución por fast click-away.'
      },
      {
        heading: '2. La Matriz de Evaluación: 3 Ejes',
        body: 'Eje 1: Potencial de Clic (1.5s scroll stop). Eje 2: Coherencia de Promesa (primeros 30s). Eje 3: Contribución a la Sesión (Watch Time Share).'
      },
      {
        heading: '3. Psicología del Color y Ceguera Publicitaria',
        body: 'El contraste óptimo texto-fondo es del 35-45%. Contrastes estridentes mayores a 70% son clasificados por el cerebro como anuncios intrusivos reduciendo CTR un 12%.'
      },
      {
        heading: '4. Matriz de Auditoría Previa a Publicación (CSV)',
        body: '15 variables ponderadas de 0 a 14 puntos para auditar legibilidad a 120px, área de rostro (20-30%) y contacto visual directo.'
      }
    ],
    resources: ARTICLE_YOUTUBE_RESOURCES,
    htmlContent: ARTICLE_YOUTUBE_HTML
  }
];

export async function loadBlogArticles(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/data/articles.json', {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data as BlogPost[];
      }
    }
  } catch (err) {
    console.warn('[BlogFeed] Fallback to bundled dataset:', err);
  }
  return INITIAL_BLOG_ARTICLES;
}
