import { BlogPost } from '../types';

export const INITIAL_BLOG_ARTICLES: BlogPost[] = [
  {
    id: 'aeo-2026-guia-definitiva-gemini-perplexity',
    slug: 'aeo-2026-guia-definitiva-gemini-perplexity',
    title: 'AEO 2026: La Guía Definitiva para Dominar Respuestas en Gemini, SearchGPT y Perplexity',
    excerpt: 'Cómo reestructurar el contenido semántico y las entidades de marca para ser la fuente primaria citada en motores de respuesta sintéticos.',
    category: 'AEO',
    tags: ['AEO', 'Gemini', 'SearchGPT', 'Perplexity', 'JSON-LD'],
    publishedAt: '28 Oct 2026',
    readTime: '6 min',
    image: '/unitia_promo.jpg',
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
      'Los LLMs no buscan coincidencia exacta de keywords; indexan grafos de conocimiento y credibilidad de entidad.',
      'El marcado JSON-LD estructurado con SameAs y HasPart reduce en 70% las alucinaciones de IA sobre tu producto.',
      'La tasa de citación en respuestas sintéticas aumenta cuando los artículos responden preguntas directas en los primeros 120 caracteres de cada encabezado.'
    ],
    content: [
      'El SEO tradicional ha cambiado para siempre. Mientras que en 2023 el objetivo era competir por la posición azul #1 en la página de resultados (SERP), en 2026 más del 52% de las consultas en Google, Bing y Safari son resueltas de manera instantánea mediante resúmenes de inteligencia artificial generativa.',
      'AEO (Answer Engine Optimization) y GEO (Generative Engine Optimization) no se basan en saturar párrafos con palabras clave repetitivas. Los modelos como Gemini 2.5 Flash, Perplexity Sonar y SearchGPT descomponen los sitios en fragmentos de hechos atómicos (factoids). Si tu web no tiene claridad semántica, el modelo simplemente seleccionará a tu competidor como referencia.',
      'En Wacha Multimedia implementamos una estrategia de 3 capas: primero, validación de entidad de marca mediante marcado Schema.org enriquecido; segundo, redacción con "Information Gain" real, aportando métricas y metodologías originales; y tercero, micro-formatos de pregunta/respuesta que permiten a los rastreadores de IA ingerir definiciones exactas sin ambigüedad.'
    ]
  },
  {
    id: 'schema-grafos-conocimiento-entidades',
    slug: 'schema-grafos-conocimiento-entidades',
    title: 'Schema.org y Grafos de Conocimiento: De HTML Básico a Entidades Reconocidas por Google',
    excerpt: 'Por qué las meta etiquetas tradicionales ya no bastan y cómo implementar esquemas multinivel ProfessionalService y VideoObject.',
    category: 'SEO Técnico',
    tags: ['JSON-LD', 'Schema', 'Entidades', 'SEO Técnico'],
    publishedAt: '25 Oct 2026',
    readTime: '8 min',
    image: '/jf_construcciones_brand.jpg',
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
      'Google prioriza entidades sobre cadenas de texto (Things not Strings).',
      'Vincular tus perfiles oficiales de YouTube, TikTok y Spotify mediante la propiedad sameAs consolida la autoridad del dominio.',
      'El esquema VideoObject en producciones audiovisuales incrementa el CTR en carruseles de búsqueda hasta en un 85%.'
    ],
    content: [
      'Muchas marcas invierten miles de dólares en rediseños visuales pero dejan su HTML estructurado en blanco. Cuando un robot de Googlebot o el crawler de OpenAI analiza una página, necesita descifrar inequívocamente qué tipo de organización eres, qué servicios ofreces y qué reputación tienes.',
      'Implementar JSON-LD multinivel permite anidar esquemas como ProfessionalService, delimitando geolocalizaciones precisas, horarios, canales de transmisión oficiales y obras publicadas. Esto transforma un sitio web pasivo en un nodo verificable dentro del Grafo de Conocimiento global.',
      'En este artículo técnico revisamos los patrones de validación con el Rich Results Test de Google, cómo resolver errores de atributos requeridos y cómo evitar el marcado engañoso que penaliza algoritmos modernos.'
    ]
  },
  {
    id: 'algoritmo-retencion-youtube-shorts-tiktok',
    slug: 'algoritmo-retencion-youtube-shorts-tiktok',
    title: 'Algoritmo de Retención en Shorts & TikTok: El Ratio 3s / 4.5s de Wacha Studios',
    excerpt: 'Análisis de más de 450 horas de video: cómo la sincronización de ganchos de audición y cortes visuales multiplica el Average View Duration.',
    category: 'Video SEO',
    tags: ['YouTube CTR', 'TikTok', 'Video SEO', 'Retención'],
    publishedAt: '21 Oct 2026',
    readTime: '5 min',
    image: '/cetes_premier_promo.jpg',
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
      'Cada 4.5 segundos debe haber un estímulo sensorial: cambio de plano, efecto foley, tipografía reactiva o zoom dinámico.',
      'La retención final (Shorts que terminan en bucle infinito o "loop") genera reenvíos automáticos en el feed algorítmico.'
    ],
    content: [
      'El mayor error de los creadores y marcas que migran a video corto es tratar un Short como un anuncio de televisión de los años noventa con intros lentas o logotipos flotantes al inicio. En la economía de la atención, un usuario desliza su pulgar en menos de 800 milisegundos si no detecta una promesa de valor instantánea.',
      'En la red de canales de Wacha Multimedia, que supera los 2.4 millones de impresiones diarias, aplicamos la regla de oro: cero intros, ganchos de audio en el segundo 0.2 y subtítulos kinetic brutalistas que refuerzan cada palabra clave.',
      'Además, los algoritmos de transcripción automática de YouTube y TikTok leen cada palabra hablada para indexar el video en el buscador. Hablar con términos semánticos precisos es hoy tan importante como la etiqueta o el título del video.'
    ]
  },
  {
    id: 'geo-muerte-keyword-stuffing-citation-authority',
    slug: 'geo-muerte-keyword-stuffing-citation-authority',
    title: 'GEO (Generative Engine Optimization): La Muerte del Keyword Stuffing',
    excerpt: 'Los LLMs priorizan coherencia factual, citas cruzadas y marcas registradas verificadas. La métrica que sustituye al PageRank.',
    category: 'AEO',
    tags: ['GEO', 'AEO', 'Algoritmos', 'IA Generativa'],
    publishedAt: '18 Oct 2026',
    readTime: '7 min',
    image: '/unitia_software_app.jpg',
    isFeatured: false,
    stats: {
      views: '2.9K lecturas',
      impact: 'Citas verificadas en ChatGPT Search'
    },
    author: {
      name: 'Mr. Decrépito',
      role: 'Head of Engineering & AEO Wacha Studios',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'El "Citation Share" (porcentaje de veces que tu web es citada como fuente) es el nuevo Domain Authority.',
      'La consistencia de datos entre redes sociales, registros públicos y sitios oficiales previene la exclusión algorítmica.',
      'El contenido generado por IA sin curaduría humana sufre degradación por pérdida de entropía informativa.'
    ],
    content: [
      'El auge de la inteligencia artificial generativa inundó la web con millones de artículos sintéticos redundantes. En respuesta, las actualizaciones de motores de búsqueda han implementado filtros de "Information Gain Score" para descartar páginas que simplemente repiten lo que ya existe en el índice.',
      'Generative Engine Optimization (GEO) es la disciplina de construir autoridad citacional. No se trata de qué tan largo es tu texto, sino de si contiene datos empíricos, casos de estudio propios, metodologías con nombre registrado y opiniones fundamentadas que un modelo de lenguaje considere dignas de citar con un enlace de fuente.',
      'En Wacha Studios combinamos desarrollo full-stack, ingeniería de sonido y producción de video para crear piezas multimedia que ninguna IA puede sintetizar de la nada, blindando la autoridad orgánica de nuestros clientes.'
    ]
  },
  {
    id: 'core-web-vitals-spa-inp-cls-optimizacion',
    slug: 'core-web-vitals-spa-inp-cls-optimizacion',
    title: 'Core Web Vitals en la Era de IA: Reduciendo INP y CLS en SPAs Modernas',
    excerpt: 'Optimizaciones prácticas para lograr 100/100 en Google Lighthouse sin sacrificar interactividad en tiempo real o animaciones reactivas.',
    category: 'SEO Técnico',
    tags: ['Core Web Vitals', 'INP', 'CLS', 'SEO Técnico', 'Vite'],
    publishedAt: '14 Oct 2026',
    readTime: '9 min',
    image: '/cetes_premier_app.jpg',
    isFeatured: false,
    stats: {
      views: '2.1K lecturas',
      impact: 'INP < 45ms en móviles'
    },
    author: {
      name: 'Equipo Técnico Wacha',
      role: 'DevSecOps & Web Architecture',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'INP (Interaction to Next Paint) reemplazó a FID: el renderizado en hilo principal debe desbloquearse en menos de 50ms.',
      'Los Skeleton Loaders previenen Cumulative Layout Shift (CLS) reservando el espacio de aspect-ratio antes del fetch de imágenes.',
      'Empaquetar fuentes con preconnect y font-display: swap elimina bloqueos de renderizado en redes móviles lentas.'
    ],
    content: [
      'Google no solo mide qué tan relevante es tu contenido; también evalúa la experiencia física del usuario al interactuar con tu plataforma. Una página con retrasos al presionar botones o con imágenes que saltan durante la carga recibe sanciones directas en su posicionamiento en búsquedas móviles.',
      'En aplicaciones React sobre Vite, optimizamos los paquetes mediante code-splitting, compresión Brotli, carga diferida de reproductores pesados (como widgets de audio o iframes de YouTube) y componentes de imagen con skeleton integrado que garantizan un CLS de exactamente 0.00.',
      'La velocidad y el feedback táctil instantáneo (como microinteracciones active:scale-95 con transiciones de 150ms) no son lujos cosméticos: son factores de ranking SEO certificados.'
    ]
  },
  {
    id: 'voice-engine-sintesis-neuronal-asistentes',
    slug: 'voice-engine-sintesis-neuronal-asistentes',
    title: 'Voice Engine & Síntesis Neuronal: Posicionamiento en Búsquedas por Voz',
    excerpt: 'Cómo el audio estructurado, transcripciones enriquecidas y huellas vocales sintéticas alimentan las respuestas en dispositivos conectados.',
    category: 'IA Generativa',
    tags: ['Voice Engine', 'IA Generativa', 'AEO', 'Audio'],
    publishedAt: '10 Oct 2026',
    readTime: '6 min',
    image: '/sonido_decrepito_vol1.jpg',
    isFeatured: false,
    stats: {
      views: '3.8K lecturas',
      impact: '+80% tráfico por asistentes de voz'
    },
    author: {
      name: 'Mr. Decrépito',
      role: 'Head of Engineering & AEO Wacha Studios',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Más del 35% de las búsquedas hogareñas y en automóviles se realizan mediante consultas de lenguaje natural hablado.',
      'Las transcripciones con marcas de tiempo (SRT/VTT) y microdatos de audio permiten a los motores de búsqueda saltar directo al punto exacto de la respuesta.',
      'Las identidades sonoras consistentes generan "Sonic Branding Recognition" en plataformas de streaming y podcasts.'
    ],
    content: [
      'Cuando un usuario pregunta en voz alta a su dispositivo: "¿Quién es el mejor productor de cumbia experimental o cómo optimizo mi canal para Gemini?", el motor no lee un párrafo de texto plano: reproduce un extracto de audio o sintetiza una respuesta basada en transcripciones indexadas.',
      'En nuestro laboratorio de audio "Sonido Decrépito", experimentamos con masterización analógica y modelos de clonación de voz neuronal autorizados. Cada podcast o pieza audiovisual que producimos incluye transcripciones semánticas que indexan conceptos clave con timestamps exactos.',
      'El futuro del SEO no es silencioso: es auditivo, conversacional y multimodal.'
    ]
  },
  {
    id: 'actualizacion-core-google-ia-eeat',
    slug: 'actualizacion-core-google-ia-eeat',
    title: 'El Impacto de las Actualizaciones Core de Google en Sitios con Asistencia de IA',
    excerpt: 'Directrices E-E-A-T: cómo demostrar autoría humana real detrás de flujos acelerados por modelos de lenguaje sin perder posicionamiento.',
    category: 'Algoritmos',
    tags: ['Algoritmos', 'Google Core', 'EEAT', 'IA Generativa'],
    publishedAt: '05 Oct 2026',
    readTime: '7 min',
    image: '/MR DECREPITO.jpg',
    isFeatured: false,
    stats: {
      views: '4.1K lecturas',
      impact: 'Cero penalizaciones en Core Updates'
    },
    author: {
      name: 'Mr. Decrépito',
      role: 'Head of Engineering & AEO Wacha Studios',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'Google no penaliza el uso de IA; penaliza el contenido no original creado exclusivamente para manipular motores de búsqueda.',
      'La primera "E" de E-E-A-T (Experience / Experiencia de primera mano) solo puede demostrarse con evidencia fotográfica, código funcional, audio y video real.',
      'Las firmas de autor con bio verificable, perfiles sociales conectados y reseñas comprobables son el escudo definitivo contra bajadas de tráfico.'
    ],
    content: [
      'Las últimas actualizaciones de algoritmos de Google causaron estragos en miles de sitios nicho automatizados con scripts que vomitaban artículos genéricos sin revisión. Aquellos que perdieron el 80% de su tráfico sufrieron la aplicación estricta de las directrices Helpful Content y E-E-A-T.',
      'En Wacha Multimedia utilizamos la inteligencia artificial como un amplificador creativo y técnico, nunca como un reemplazo de la experiencia vivida. Cada artículo y solución técnica surge de 20 años en la trinchera de la producción audiovisual, el desarrollo web y la creación de comunidades urbanas.',
      'Para proteger tu sitio: incorpora testimonios verificables, enlaces a repositorios de código o demostraciones interactivas, metadatos de autor transparentes y casos de estudio documentados con métricas reales.'
    ]
  },
  {
    id: 'thumbnail-ctr-matrix-psicologia-contraste',
    slug: 'thumbnail-ctr-matrix-psicologia-contraste',
    title: 'Thumbnail CTR Matrix: Psicología del Color, Alto Contraste y Tipografía',
    excerpt: 'Deconstrucción de 80 miniaturas de alta conversión en nuestra red de canales con más de 2.4M de impresiones diarias.',
    category: 'Video SEO',
    tags: ['YouTube CTR', 'Thumbnails', 'Video SEO', 'Diseño'],
    publishedAt: '01 Oct 2026',
    readTime: '6 min',
    image: '/sigue_bailando.jpg',
    isFeatured: false,
    stats: {
      views: '5.4K lecturas',
      impact: 'CTR promedio superior a 11.8%'
    },
    author: {
      name: 'Equipo de Diseño Wacha',
      role: 'Creative Direction & Art Lab',
      avatar: '/wacha_logo.jpg'
    },
    keyTakeaways: [
      'El 82% de las visualizaciones de YouTube provienen de dispositivos móviles donde la miniatura mide menos de 3.5 cm de ancho.',
      'El texto en miniatura no debe repetir el título del video: debe complementar la intriga con máximo 3 palabras de alto impacto.',
      'El contraste de borde de 1px o halo recortado sobre fondos oscuros asegura separación visual en el feed oscuro nativo de YouTube.'
    ],
    content: [
      'Una excelente producción de video no sirve de nada si nadie hace clic en la miniatura. En un feed saturado con cientos de opciones compitiendo en fracciones de segundo, la miniatura es el único vendedor de tu contenido.',
      'Nuestra matriz de diseño se basa en 3 reglas: Regla de los 3 Elementos (sujeto principal en primer plano, fondo contextualizado con desenfoque de profundidad y palabra clave de anclaje), regla de colores complementarios de alta saturación (amarillo lima #D4FF00 y naranja de seguridad #FF4400 sobre negro neutro), y regla de legibilidad en miniatura de 120px.',
      'El Video SEO moderno comienza en el diseño visual de la portada antes de escribir la primera línea de la descripción.'
    ]
  }
];

/**
 * Loads blog articles asynchronously from local JSON endpoint `/data/articles.json`
 * with immediate reliable fallback to bundled `INITIAL_BLOG_ARTICLES`.
 */
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
