# PAQUETE DE ARTÍCULOS PARA WACHA.SITE
**Autor:** WACHA Producciones Multimedia
**Sitio:** https://whacha.site

---

# ARTÍCULO 1

**Título SEO:** Core Web Vitals en SPAs: mejorar INP y CLS sin romper la interactividad
**Título secundario AEO:** ¿Cómo se miden y mejoran INP y CLS en una single-page application?
**Slug:** `core-web-vitals-spa-inp-cls`
**Metadescripción:** Guía práctica para mejorar INP y CLS en SPAs con Chrome 151: soft navigations, `scheduler.yield`, reserva de espacio y límites reales de medición.
**Extracto:** Una puntuación perfecta en Lighthouse no garantiza buenos Core Web Vitals en usuarios reales de una SPA. Chrome 151 ya permite medir soft navigations; aquí tienes qué cambia y cómo actuar sobre INP y CLS sin sacrificar la interacción.
**Etiquetas:** Core Web Vitals, SPA, INP, CLS, Chrome 151, soft navigations, rendimiento web, CrUX
**Hashtags:** #CoreWebVitals #INP #CLS #SPA #WebPerformance #Chrome151

## El problema del 100/100 que no se traduce en usuarios reales

Una SPA puede obtener 100/100 en Lighthouse y, aun así, fallar INP o CLS en datos de campo. La razón es estructural: Lighthouse simula una carga; una SPA real pasa minutos —o horas— ejecutando JavaScript, cambiando rutas y respondiendo a interacciones dentro del mismo documento. Hasta hace poco, los Core Web Vitals atribuían todas las interacciones y shifts posteriores a la carga inicial, no a la “página” que el usuario estaba viendo. Esa brecha de medición es la que Chrome 151 empieza a cerrar, y es también la que explica por qué tu laboratorio puede ir bien mientras tu campo va mal.

## Qué cambió con Chrome 151 y las soft navigations

La API de Soft Navigations, disponible desde Chrome 151, define una soft navigation cuando se cumplen tres condiciones: la inicia el usuario, cambia la URL visible y produce una pintura de contenido visible. Con la API activada, Chrome emite eventos `soft-navigation` y añade un `navigationId` a las entradas de rendimiento, lo que permite segmentar LCP, INP y CLS por navegación suave.

Desde octubre de 2026, CrUX publica **versiones experimentales** de los tres Core Web Vitals con soft navigations: `experimental_largest_contentful_paint_with_softnavs`, `experimental_interaction_to_next_paint_with_softnavs` y `experimental_cumulative_layout_shift_with_softnavs`. Google mantiene intactas sus puntuaciones estables mientras evalúa estas variantes.

Dos advertencias que conviene tener presentes:

- **Solo Chromium.** Las métricas de soft navigation no se reportan en Safari ni Firefox, así que tu dato cubrirá solo una parte de la audiencia.
- **CrUX sigue atribuyendo a la URL original.** Las métricas de soft navigation no coinciden necesariamente con lo que ves en CrUX o Search Console.

Para una SPA, esto significa que por primera vez puedes separar el rendimiento de la carga inicial del de cada transición interna. Pero también significa que no puedes asumir que CrUX “ya mide lo mismo”: la API es el instrumento nuevo; CrUX experimental es el dataset nuevo; tus herramientas de RUM deben adaptarse.

## Por qué INP es el CWV que más castiga a las SPAs

INP mide la latencia completa de una interacción: retardo de entrada, procesamiento y pintura. Un INP bueno es ≤ 200 ms en el percentil 75; poor es > 500 ms. En una SPA, cada clic, tap o tecla compite con el mismo hilo principal que ya está ejecutando el framework, los listeners globales y los scripts de terceros. No existe el “reset” que supone una navegación dura.

La técnica más efectiva no es microoptimizar un handler, sino **fragmentar las tareas largas**. `scheduler.yield()` permite ceder el hilo principal al navegador entre fragmentos, de modo que las entradas pendientes se procesen antes de continuar. El patrón recomendado es dividir la ejecución en bloques de menos de 50 ms, que es el umbral de Long Tasks del W3C.

```javascript
// Patrón mínimo con fallback para navegadores sin Scheduler API
async function yieldToMain() {
  if ("scheduler" in window && "yield" in scheduler) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function procesarElementosGrandes(items) {
  for (let i = 0; i < items.length; i++) {
    procesar(items[i]);

    // Cada ~50 ms, ceder el hilo para que el navegador atienda input
    if (i % 50 === 0) {
      await yieldToMain();
    }
  }
}
Dos límites honestos: scheduler.yield() es compatible con Chromium 129+ y Firefox 135+, pero Safari aún no lo implementa (a abril de 2026), por lo que el fallback con setTimeout(0) no es opcional. Además, para trabajo verdaderamente intensivo —procesamiento de imágenes, transformación de grandes volúmenes de datos— el destino correcto es un Web Worker, no fragmentar el hilo principal.

CLS en SPAs: el problema no es la carga, es la re-renderización
CLS mide inestabilidad visual. El umbral “good” sigue siendo ≤ 0.1 en campo; el “poor”, > 0.25. En una SPA, el CLS puede aparecer después de la carga inicial: un componente que se monta cuando el usuario navega internamente, una imagen que llega tras una transición de ruta, un banner inyectado en una vista que ya estaba pintada.

La regla que resuelve la mayor parte del problema es una: reservar el espacio antes de que el contenido llegue. Para imágenes y vídeos, esto significa width y height explícitos, o aspect-ratio en CSS. Para contenido asíncrono —ads, embeds, banners inyectados—, el espacio debe reservarse en el primer paint del componente, no cuando el recurso responde.

css
/* Reserva de espacio para una imagen responsive dentro de una ruta SPA */
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
}
Para fuentes, font-display: optional evita el swap visible en la mayoría de los casos, y size-adjust puede reducir el shift si la fuente de reserva y la definitiva tienen métricas distintas. Para componentes que se montan dinámicamente, el patrón es renderizar un skeleton con las mismas dimensiones que el contenido final antes de que los datos lleguen. No es una optimización de lujo: en una SPA, cada transición interna es una oportunidad de CLS.

Un recurso práctico: checklist de intervención inmediata para SPAs
Antes de tocar código, mide con la API correcta. Si tu RUM no reporta soft navigations, no puedes saber si tu INP bajo corresponde a la carga o a una ruta interna. Verifica que tu herramienta use la Soft Navigations API y que segmente por navigationId.

Checklist de INP en SPA

□ Identifica las tareas > 50 ms con el panel Performance de DevTools durante una navegación interna, no solo en la carga.
□ Aplica scheduler.yield() entre lotes de trabajo en handlers de eventos y en código de transición de ruta.
□ Mueve a Web Workers el trabajo CPU-intensivo que hoy bloquea el hilo principal.
□ Difiere scripts de terceros (analytics, chat, ads) hasta después de que la ruta sea interactiva.
□ Revisa listeners globales: un listener en document que se ejecuta en cada interacción de toda la sesión puede arruinar INP aunque su coste individual sea bajo.
Checklist de CLS en SPA

□ Toda <img> y <iframe> tiene width y height, o un contenedor con aspect-ratio.
□ Todo componente que se monta tras una transición interna tiene un placeholder con geometría reservada.
□ Las fuentes usan font-display: optional o una estrategia equivalente que evite el swap tardío.
□ Los ads y embeds no se inyectan “en caliente” sobre contenido ya pintado sin un contenedor de altura mínima.
□ Mides CLS por URL de destino, no solo por la URL de entrada.
Conclusión
Chrome 151 no “arregla” el rendimiento de las SPAs, pero por primera vez ofrece un instrumento para medir lo que antes quedaba oculto. La consecuencia práctica es incómoda: muchas SPAs descubrirán que su INP real es peor de lo que creían, porque ahora se cuenta cada interacción dentro de cada ruta. La buena noticia es que las intervenciones de mayor impacto —fragmentar tareas, reservar espacio, diferir terceros— son conocidas, verificables y no exigen renunciar a la interactividad. Lo que sí exigen es dejar de confundir el laboratorio con el campo.

Fuentes oficiales:

web.dev, How SPA architectures affect Core Web Vitals (actualizado 11/08/2026).

Chrome for Developers, 衡量软导航 (actualizado 20/09/2026).

web.dev, Experimental soft navigation metrics now available in CrUX (13/10/2026).

DebugBear, How To Monitor Single Page Application Performance (actualizado 2025).

ARTÍCULO 2
Título SEO: SEO para búsqueda por voz: contenido conversacional, respuestas claras y accesibilidad de audio
Título secundario AEO: ¿Cómo optimizar contenido para búsqueda por voz cuando el motor ya no depende de una transcripción perfecta?
Slug: seo-busqueda-por-voz-contenido-conversacional
Metadescripción: Speech-to-Retrieval cambia la búsqueda por voz: menos dependencia de transcripción, más intención. Claves de contenido conversacional, respuestas directas y audio accesible.
Extracto: Google ya no convierte necesariamente tu voz en texto antes de buscar. Con Speech-to-Retrieval, la intención hablada se mapea directamente a la recuperación. Esto es lo que cambia —y lo que no— para el contenido orientado a búsqueda por voz.
Etiquetas: búsqueda por voz, SEO conversacional, Speech-to-Retrieval, AEO, accesibilidad de audio, contenido conversacional
Hashtags: #VoiceSearch #SEO #S2R #AEO #Accesibilidad #ContenidoConversacional

El matiz que cambia el punto de partida: S2R y la transcripción que ya no es el centro
Durante años, la optimización para búsqueda por voz se construyó sobre una premisa: el asistente transcribe tu voz a texto y busca ese texto. Si la transcripción falla, la búsqueda falla. El ejemplo clásico de Google es “The Scream painting” mal transcrito como “screen painting”: el sistema busca técnicas de pintura de pantallas en lugar de la obra de Munch.

Speech-to-Retrieval (S2R), presentado por Google Research el 7 de octubre de 2025, cambia la arquitectura. En lugar de convertir la consulta hablada en una transcripción textual y buscar sobre ella, S2R interpreta directamente la intención de recuperación de la consulta hablada. La pregunta que guía el sistema deja de ser “¿qué palabras se dijeron?” y pasa a ser “¿qué información se busca?”.

Esto no significa que la transcripción haya desaparecido ni que el texto pierda valor. Significa que el contenido que responde bien a una intención hablada completa —no solo a una cadena de palabras clave— tiene una ventaja estructural. Y significa que la accesibilidad del audio deja de ser un añadido de cumplimiento para convertirse en parte de la superficie de recuperación.

Qué es exactamente “contenido conversacional” para voz (sin caer en el relleno)
La evidencia práctica de SEO para voz apunta a un patrón estable: consultas más largas, formuladas como preguntas completas, frecuentemente con intención local. El contenido que mejor funciona no es el que “suena coloquial” de forma artificial, sino el que abre con una respuesta directa y autocontenida, y luego desarrolla.

Dos rangos que aparecen repetidamente en la literatura de optimización para voz:

Respuestas directas de 20–30 palabras para que un asistente pueda leerlas en voz alta sin cortes ni contextualización excesiva.

Párrafos de respuesta de 40–60 palabras cuando la pregunta requiere una explicación breve pero completa.

No son reglas de ranking de Google. Son convenciones de formato que aumentan la probabilidad de que tu contenido sea seleccionable como respuesta hablada, especialmente si compites por featured snippets o por respuestas de asistente. La distinción es importante: Google no describe en 2026 un sistema de clasificación independiente llamado “voice SEO”. Lo que existe es una superficie de recuperación —asistentes, respuestas habladas, S2R— que favorece ciertas estructuras.

La estructura que sí puedes implementar
Encabezados como preguntas naturales. Si tu H2 es “Optimización de contenido para búsqueda por voz”, un asistente tiene que inferir la pregunta. Si tu H2 es “¿Cómo optimizar contenido para búsqueda por voz?”, la pregunta y la respuesta están alineadas. No se trata de convertir todo el artículo en un FAQ, sino de que los encabezados de las secciones que quieres que sean recuperables formulen la pregunta que un usuario haría en voz alta.

Respuesta directa en las primeras 2–3 frases. Después de cada encabezado-pregunta, la respuesta debe poder leerse sola. Si el lector —o el asistente— se detiene después de tres frases, debe tener una respuesta útil. El desarrollo viene después.

Marcado estructurado FAQPage y HowTo. El schema no “hace” que te posicionen, pero hace explícita la estructura pregunta-respuesta para los sistemas que la consumen. Es especialmente relevante cuando el contenido se sirve a través de asistentes que necesitan identificar pares pregunta-respuesta de forma inequívoca.

Accesibilidad de audio real, no solo “tener un podcast”. La accesibilidad de audio incluye subtítulos y transcripciones precisas, pero también una estructura de página que no dependa exclusivamente de información visual. Un asistente que lee tu página en voz alta se encuentra con los mismos problemas que un usuario de lector de pantalla: encabezados que no describen la sección, enlaces “haz clic aquí”, texto alternativo ausente o decorativo mal marcado. La accesibilidad no es un factor de posicionamiento declarado; es una condición de posibilidad para que el contenido funcione en la superficie hablada.

Un recurso práctico: plantilla de respuesta hablada
Para cada sección que quieras hacer recuperable por voz, usa esta plantilla de tres niveles:

Nivel 1 — Respuesta directa (20–30 palabras).
Empieza con la respuesta, no con el contexto. Ejemplo: “Para optimizar contenido para búsqueda por voz, abre cada sección con una respuesta directa de 20 a 30 palabras y usa encabezados formulados como preguntas naturales.”

Nivel 2 — Desarrollo (40–60 palabras).
Explica el “cómo” o el “por qué” en un párrafo autocontenido. Sin remisiones a párrafos anteriores.

Nivel 3 — Contexto y matices.
Aquí van los límites, las excepciones y las fuentes. Este nivel no está pensado para ser leído en voz alta, sino para el lector que necesita profundidad.

Checklist rápida de voz y audio

□ Cada sección recuperable tiene un H2 en forma de pregunta natural.
□ La primera respuesta de cada sección funciona sin el resto del artículo.
□ El schema FAQPage o HowTo refleja preguntas y respuestas reales de la página, no un FAQ inventado al final.
□ Las transcripciones de audio son precisas y están sincronizadas; los subtítulos no son generados sin revisión.
□ Los encabezados describen la sección sin ambigüedad cuando se leen en voz alta.
□ Los enlaces tienen texto significativo; el texto alternativo de imágenes describe la función o el contenido, no “imagen”.
Conclusión
La búsqueda por voz no exige un “SEO paralelo”. Exige que el contenido sea recuperable por intención, no solo por coincidencia léxica. S2R hace que la intención hablada pese más que la transcripción perfecta, pero la estructura que permite recuperar esa intención sigue siendo la misma que funciona para AEO: preguntas claras, respuestas directas, desarrollo autocontenido y accesibilidad real. Lo que cambia es el estándar de exigencia: si tu contenido no se puede leer en voz alta y seguir teniendo sentido, probablemente tampoco sea fácil de recuperar como respuesta hablada.

Fuentes oficiales:

Google Research, Speech-to-Retrieval (S2R): A new approach to voice search (07/10/2025).

Google Research, Simple Voice Questions (SVQ) dataset (misma publicación).

Referencias prácticas sobre contenido conversacional y formato de respuesta hablada: Webflow, Promptwatch y SEOGraphy (2026).

ARTÍCULO 3
Título SEO: Actualizaciones Core de Google y contenido asistido por IA: experiencia, precisión y responsabilidad editorial
Título secundario AEO: ¿Qué exige Google al contenido asistido por IA después de las actualizaciones de 2026?
Slug: google-core-updates-contenido-asistido-ia
Metadescripción: Google no prohíbe la IA. Exige revisión humana, autoría real y contenido principal con esfuerzo, originalidad, habilidad y precisión. Claves tras las guías de 2026.
Extracto: La actualización de las guías de Google de octubre de 2026 no crea un factor de ranking nuevo, pero hace explícito lo que antes estaba en las quality rater guidelines: el contenido asistido por IA debe revisarse, atribuirse y aportar valor verificable.
Etiquetas: Core Updates, contenido asistido por IA, E-E-A-T, Google Search, calidad editorial, autoría, precisión
Hashtags: #CoreUpdates #ContenidoIA #EEAT #SEO #CalidadEditorial #GoogleSearch

El marco correcto: no es “IA sí o no”, es “esfuerzo humano verificable”
Google mantiene desde febrero de 2023 una posición que no ha cambiado en lo esencial: el uso de IA para generar contenido no está prohibido. El riesgo aparece cuando la automatización se usa para producir contenido a escala con el propósito principal de manipular los resultados, sin aportar valor suficiente. Esa es la formulación de la guía sobre contenido generado por IA, y sigue siendo la referencia.

Lo que sí cambió en octubre de 2026 fue el nivel de explicitud. Google actualizó dos documentos: la guía sobre contenido generativo (1 de octubre) y la página sobre contenido útil centrado en personas (última actualización, 5 de octubre). La actualización no introdujo un nuevo factor de ranking ni anunció una penalización nueva; sincronizó la documentación oficial con criterios que ya estaban en las quality rater guidelines.

La consecuencia editorial es clara: la discusión útil ya no es si usas IA, sino si puedes demostrar esfuerzo, originalidad, talento o habilidad, y precisión en el contenido principal. Google nombra esos cuatro atributos explícitamente y entrena a los evaluadores de calidad para aplicarlos.

Qué cuenta como “contenido principal” (y por qué esto importa para la IA)
La definición de contenido principal de Google es más amplia de lo que muchos equipos asumen: cualquier parte de la página que contribuya directamente a que la página cumpla su propósito. Eso incluye el texto y los medios principales, pero también calculadoras, herramientas interactivas, secciones con pestañas, reseñas de usuarios y los títulos y encabezados visibles.

Dos implicaciones que suelen pasarse por alto:

El contenido detrás de pestañas puede ser contenido principal. La afirmación de que “lo que está en tabs no cuenta” es falsa según la propia definición de Google.

Los títulos y encabezados son contenido principal. Un título sensacionalista o un encabezado que no representa la página puede degradar la calidad del contenido principal, no solo el CTR.

Para el contenido asistido por IA, esto significa que la revisión no puede limitarse al cuerpo del artículo. Si la IA generó el título, la metadescripción, el schema o el alt text, esos elementos también requieren verificación humana. Google lo dice de forma explícita: la revisión debe cubrir títulos, metadescripciones, datos estructurados y texto alternativo de imágenes.

Lo que Google penaliza de verdad: escalado sin esfuerzo y autoría falsa
Las spam policies siguen apuntando a dos conductas concretas:

Contenido escalado sin valor añadido. Usar IA para generar grandes volúmenes de páginas sin aportar valor puede violar las reglas sobre scaled content abuse. El problema no es la IA; es la ecuación “más páginas = más tráfico” cuando la IA convierte la producción en la parte más fácil del proceso.

Autoría engañosa. Google describe explícitamente las biografías inventadas, los nombres falsos y las credenciales fabricadas —incluidas las fotos de perfil generadas por IA— como engaños y señales de baja calidad. Esto no significa que un autor deba tener un perfil público exhaustivo; significa que si lo tiene, debe ser real y verificable. La sección “Acerca de” no es decorativa: es parte de la superficie de confianza.

Un matiz igualmente importante: citar fuentes no equivale a esfuerzo original. Google ha declarado que la atribución “no reemplaza la necesidad de esfuerzo original”; resumir otros sitios y enlazarlos no es suficiente. Para el contenido asistido por IA, esto descarta el patrón de “investigación” que consiste en pedirle al modelo que resuma cinco resultados de búsqueda y publicar el resumen con enlaces.

Un recurso práctico: checklist de publicación para contenido asistido por IA
Esta checklist está pensada para usarse antes de publicar, no después de una caída de tráfico. No garantiza recuperación —Google lo dice explícitamente: no promete que las mejoras produzcan una mejora visible en resultados—, pero reduce el riesgo de infracción evitable.

Nivel 1 — Verificación factual (obligatoria)

□ Cada afirmación factual del texto ha sido contrastada con una fuente primaria u oficial, no solo con la salida del modelo.
□ Las cifras, fechas y nombres propios han sido revisados manualmente.
□ Las fuentes citadas existen y dicen lo que se les atribuye.
□ El título, la metadescripción, el schema y el alt text han sido revisados con el mismo estándar que el cuerpo.
Nivel 2 — Autoría y responsabilidad editorial

□ El autor o la autora existen y su identidad es verificable.
□ Si hay una biografía, las credenciales son reales; no hay headshots generados por IA presentados como personas reales.
□ La página identifica quién es responsable del contenido y cómo contactar.
□ Si se usó IA, la página no lo oculta ni lo presenta como trabajo exclusivamente humano cuando no lo es.
Nivel 3 — Valor original y contenido principal

□ El contenido aporta algo que no está ya en los primeros resultados: datos propios, experiencia de primera mano, un procedimiento probado, un análisis con criterio.
□ No es un resumen de resúmenes ni una reformulación de fuentes secundarias.
□ Las secciones interactivas, calculadoras, tablas y tabs —si existen— también cumplen el estándar de precisión y esfuerzo, porque cuentan como contenido principal.
□ Los títulos y encabezados describen el contenido con precisión; no hay exageración ni shock value para ganar clics.
Nivel 4 — Expectativas realistas

□ El equipo entiende que corregir contenido no garantiza recuperar tráfico: el entorno de resultados ha cambiado con AI Overviews, foros y vídeo, y un ranking recuperado no siempre equivale a clics recuperados.
□ La revisión se trata como un proceso continuo, no como un parche único tras una actualización.
Conclusión
Las actualizaciones Core y las guías de contenido de Google no han convertido la IA en un factor de penalización automática. Han hecho algo más exigente: han trasladado al contenido asistido por IA el mismo estándar que siempre se aplicó al contenido humano de calidad —esfuerzo real, autoría verificable, precisión comprobada y valor original—, pero ahora con la expectativa explícita de que la revisión humana cubra también los metadatos y el marcado estructurado. La responsabilidad editorial no es un adorno de E-E-A-T; es la condición que separa el contenido asistido por IA que Google considera útil del que considera escalado sin valor.

Fuentes oficiales:

Google Search Central, Google Search's guidance about AI-generated content (actualizada 01/10/2026; referencia original de 2023).

Google Search Central, Creating helpful, reliable, people-first content (actualizada 05/10/2026).

Análisis de la actualización: MarTech, Google changed its content guidance. Don’t expect a reset. (13/10/2026); Linksurge, Google Spells Out Four Quality Attributes… (09/10/2026).

text
