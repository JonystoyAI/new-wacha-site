/**
 * Código HTML completo de los 3 nuevos artículos técnicos para Wacha Studios
 * Cumple con estándares HTML5 semánticos, metadatos estructurados y bloques <pre><code>
 */

export const ARTICLE_1_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">SEO TÉCNICO</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">CHROME 151</span>
      <span class="text-zinc-500 py-0.5">SLUG: core-web-vitals-spa-inp-cls</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      Core Web Vitals en SPAs: mejorar INP y CLS sin romper la interactividad
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      ¿Cómo se miden y mejoran INP y CLS en una single-page application?
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>WACHA Producciones Multimedia</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      El problema del 100/100 que no se traduce en usuarios reales
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Una SPA puede obtener 100/100 en Lighthouse y, aun así, fallar INP o CLS en datos de campo. La razón es estructural: Lighthouse simula una carga; una SPA real pasa minutos —o horas— ejecutando JavaScript, cambiando rutas y respondiendo a interacciones dentro del mismo documento. Hasta hace poco, los Core Web Vitals atribuían todas las interacciones y shifts posteriores a la carga inicial, no a la “página” que el usuario estaba viendo. Esa brecha de medición es la que Chrome 151 empieza a cerrar, y es también la que explica por qué tu laboratorio puede ir bien mientras tu campo va mal.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Qué cambió con Chrome 151 y las soft navigations
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La API de Soft Navigations, disponible desde Chrome 151, define una soft navigation cuando se cumplen tres condiciones: la inicia el usuario, cambia la URL visible y produce una pintura de contenido visible. Con la API activada, Chrome emite eventos <code>soft-navigation</code> y añade un <code>navigationId</code> a las entradas de rendimiento, lo que permite segmentar LCP, INP y CLS por navegación suave.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Desde octubre de 2026, CrUX publica <strong>versiones experimentales</strong> de los tres Core Web Vitals con soft navigations: <code>experimental_largest_contentful_paint_with_softnavs</code>, <code>experimental_interaction_to_next_paint_with_softnavs</code> y <code>experimental_cumulative_layout_shift_with_softnavs</code>. Google mantiene intactas sus puntuaciones estables mientras evalúa estas variantes.
    </p>
    
    <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-2">
      <h3 class="font-jetbrains text-sm font-bold text-black dark:text-white uppercase flex items-center gap-2">
        <span class="w-2.5 h-2.5 bg-[#FF4400]"></span>
        Dos advertencias que conviene tener presentes:
      </h3>
      <ul class="list-disc list-inside space-y-1.5 text-sm text-zinc-800 dark:text-zinc-300">
        <li><strong>Solo Chromium:</strong> Las métricas de soft navigation no se reportan en Safari ni Firefox, así que tu dato cubrirá solo una parte de la audiencia.</li>
        <li><strong>CrUX sigue atribuyendo a la URL original:</strong> Las métricas de soft navigation no coinciden necesariamente con lo que ves en CrUX o Search Console.</li>
      </ul>
    </div>
    
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Para una SPA, esto significa que por primera vez puedes separar el rendimiento de la carga inicial del de cada transición interna. Pero también significa que no puedes asumir que CrUX “ya mide lo mismo”: la API es el instrumento nuevo; CrUX experimental es el dataset nuevo; tus herramientas de RUM deben adaptarse.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Por qué INP es el CWV que más castiga a las SPAs
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      INP mide la latencia completa de una interacción: retardo de entrada, procesamiento y pintura. Un INP bueno es ≤ 200 ms en el percentil 75; poor es &gt; 500 ms. En una SPA, cada clic, tap o tecla compite con el mismo hilo principal que ya está ejecutando el framework, los listeners globales y los scripts de terceros. No existe el “reset” que supone una navegación dura.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La técnica más efectiva no es microoptimizar un handler, sino <strong>fragmentar las tareas largas</strong>. <code>scheduler.yield()</code> permite ceder el hilo principal al navegador entre fragmentos, de modo que las entradas pendientes se procesen antes de continuar. El patrón recomendado es dividir la ejecución en bloques de menos de 50 ms, que es el umbral de Long Tasks del W3C.
    </p>

    <!-- BLOQUE DE CÓDIGO JS CON ETIQUETAS PRE CODE -->
    <pre><code class="language-javascript">// Patrón mínimo con fallback para navegadores sin Scheduler API
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
}</code></pre>

    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Dos límites honestos: <code>scheduler.yield()</code> es compatible con Chromium 129+ y Firefox 135+, pero Safari aún no lo implementa (a abril de 2026), por lo que el fallback con <code>setTimeout(0)</code> no es opcional. Además, para trabajo verdaderamente intensivo —procesamiento de imágenes, transformación de grandes volúmenes de datos— el destino correcto es un Web Worker, no fragmentar el hilo principal.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      CLS en SPAs: el problema no es la carga, es la re-renderización
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      CLS mide inestabilidad visual. El umbral “good” sigue siendo ≤ 0.1 en campo; el “poor”, &gt; 0.25. En una SPA, el CLS puede aparecer después de la carga inicial: un componente que se monta cuando el usuario navega internamente, una imagen que llega tras una transición de ruta, un banner inyectado en una vista que ya estaba pintada.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La regla que resuelve la mayor parte del problema es una: <strong>reservar el espacio antes de que el contenido llegue</strong>. Para imágenes y vídeos, esto significa width y height explícitos, o aspect-ratio en CSS. Para contenido asíncrono —ads, embeds, banners inyectados—, el espacio debe reservarse en el primer paint del componente, no cuando el recurso responde.
    </p>

    <!-- BLOQUE DE CÓDIGO CSS CON ETIQUETAS PRE CODE -->
    <pre><code class="language-css">/* Reserva de espacio para una imagen responsive dentro de una ruta SPA */
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
}</code></pre>

    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Para fuentes, <code>font-display: optional</code> evita el swap visible en la mayoría de los casos, y <code>size-adjust</code> puede reducir el shift si la fuente de reserva y la definitiva tienen métricas distintas. Para componentes que se montan dinámicamente, el patrón es renderizar un skeleton con las mismas dimensiones que el contenido final antes de que los datos lleguen. No es una optimización de lujo: en una SPA, cada transición interna es una oportunidad de CLS.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Un recurso práctico: checklist de intervención inmediata para SPAs
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Antes de tocar código, mide con la API correcta. Si tu RUM no reporta soft navigations, no puedes saber si tu INP bajo corresponde a la carga o a una ruta interna. Verifica que tu herramienta use la Soft Navigations API y que segmente por <code>navigationId</code>.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div class="bg-zinc-50 dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-4 space-y-3">
        <h3 class="font-jetbrains font-bold text-sm text-[#FF4400] uppercase border-b border-zinc-300 dark:border-zinc-800 pb-2">
          Checklist de INP en SPA
        </h3>
        <ul class="space-y-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-300 font-jetbrains">
          <li class="flex items-start gap-2"><span>[✓]</span><span>Identifica las tareas &gt; 50 ms con el panel Performance de DevTools durante una navegación interna.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Aplica <code>scheduler.yield()</code> entre lotes de trabajo en handlers y transiciones de ruta.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Mueve a Web Workers el trabajo CPU-intensivo que hoy bloquea el hilo principal.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Difiere scripts de terceros (analytics, chat, ads) hasta que la ruta sea interactiva.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Revisa listeners globales en document que se ejecuten en cada interacción.</span></li>
        </ul>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-4 space-y-3">
        <h3 class="font-jetbrains font-bold text-sm text-[#B8006E] dark:text-[#D4FF00] uppercase border-b border-zinc-300 dark:border-zinc-800 pb-2">
          Checklist de CLS en SPA
        </h3>
        <ul class="space-y-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-300 font-jetbrains">
          <li class="flex items-start gap-2"><span>[✓]</span><span>Toda &lt;img&gt; y &lt;iframe&gt; tiene width y height, o un contenedor con aspect-ratio.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Todo componente montado dinámicamente tiene un placeholder con geometría reservada.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Las fuentes usan font-display: optional o estrategia equivalente anti-swap.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Los ads y embeds cuentan con contenedor de altura mínima definida.</span></li>
          <li class="flex items-start gap-2"><span>[✓]</span><span>Mides CLS por URL de destino, no solo por la URL de entrada.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="space-y-4 pt-4 border-t-2 border-black dark:border-zinc-800">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00]">
      Conclusión
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Chrome 151 no “arregla” el rendimiento de las SPAs, pero por primera vez ofrece un instrumento para medir lo que antes quedaba oculto. La consecuencia práctica es incómoda: muchas SPAs descubrirán que su INP real es peor de lo que creían, porque ahora se cuenta cada interacción dentro de cada ruta. La buena noticia es que las intervenciones de mayor impacto —fragmentar tareas, reservar espacio, diferir terceros— son conocidas, verificables y no exigen renunciar a la interactividad. Lo que sí exigen es dejar de confundir el laboratorio con el campo.
    </p>

    <div class="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 text-xs font-jetbrains space-y-1 text-zinc-700 dark:text-zinc-400">
      <div class="font-bold text-black dark:text-white uppercase mb-1">Fuentes oficiales:</div>
      <div>• web.dev, <em>How SPA architectures affect Core Web Vitals</em> (actualizado 11/08/2026).</div>
      <div>• Chrome for Developers, <em>衡量软导航</em> (actualizado 20/09/2026).</div>
      <div>• web.dev, <em>Experimental soft navigation metrics now available in CrUX</em> (13/10/2026).</div>
      <div>• DebugBear, <em>How To Monitor Single Page Application Performance</em> (actualizado 2025).</div>
    </div>
  </section>
</article>`;

export const ARTICLE_2_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">AEO & VOZ</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">SPEECH-TO-RETRIEVAL (S2R)</span>
      <span class="text-zinc-500 py-0.5">SLUG: seo-busqueda-por-voz-contenido-conversacional</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      SEO para búsqueda por voz: contenido conversacional, respuestas claras y accesibilidad de audio
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      ¿Cómo optimizar contenido para búsqueda por voz cuando el motor ya no depende de una transcripción perfecta?
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>WACHA Producciones Multimedia</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      El matiz que cambia el punto de partida: S2R y la transcripción que ya no es el centro
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Durante años, la optimización para búsqueda por voz se construyó sobre una premisa: el asistente transcribe tu voz a texto y busca ese texto. Si la transcripción falla, la búsqueda falla. El ejemplo clásico de Google es “The Scream painting” mal transcrito como “screen painting”: el sistema busca técnicas de pintura de pantallas en lugar de la obra de Munch.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      <strong>Speech-to-Retrieval (S2R)</strong>, presentado por Google Research el 7 de octubre de 2025, cambia la arquitectura. En lugar de convertir la consulta hablada en una transcripción textual y buscar sobre ella, S2R interpreta directamente la intención de recuperación de la consulta hablada. La pregunta que guía el sistema deja de ser “¿qué palabras se dijeron?” y pasa a ser “¿qué información se busca?”.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Esto no significa que la transcripción haya desaparecido ni que el texto pierda valor. Significa que el contenido que responde bien a una intención hablada completa —no solo a una cadena de palabras clave— tiene una ventaja estructural. Y significa que la accesibilidad del audio deja de ser un añadido de cumplimiento para convertirse en parte de la superficie de recuperación.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Qué es exactamente “contenido conversacional” para voz (sin caer en el relleno)
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La evidencia práctica de SEO para voz apunta a un patrón estable: consultas más largas, formuladas como preguntas completas, frecuentemente con intención local. El contenido que mejor funciona no es el que “suena coloquial” de forma artificial, sino el que abre con una respuesta directa y autocontenida, y luego desarrolla.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-1">
        <div class="font-jetbrains text-xs font-bold text-[#FF4400]">[ RANGO 1: 20-30 PALABRAS ]</div>
        <div class="font-bold text-sm text-black dark:text-white">Respuestas Directas Inmediatas</div>
        <p class="text-xs text-zinc-700 dark:text-zinc-300">
          Diseñadas para que un asistente (Google Assistant, Siri, Alexa) pueda leerlas en voz alta sin cortes ni contextualización excesiva.
        </p>
      </div>

      <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-1">
        <div class="font-jetbrains text-xs font-bold text-[#B8006E] dark:text-[#D4FF00]">[ RANGO 2: 40-60 PALABRAS ]</div>
        <div class="font-bold text-sm text-black dark:text-white">Párrafos de Desarrollo Autocontenido</div>
        <p class="text-xs text-zinc-700 dark:text-zinc-300">
          Cuando la pregunta requiere una explicación breve pero completa sin depender de información previa.
        </p>
      </div>
    </div>

    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      No son reglas de ranking de Google. Son convenciones de formato que aumentan la probabilidad de que tu contenido sea seleccionable como respuesta hablada, especialmente si compites por featured snippets o por respuestas de asistente. La distinción es importante: Google no describe en 2026 un sistema de clasificación independiente llamado “voice SEO”. Lo que existe es una superficie de recuperación —asistentes, respuestas habladas, S2R— que favorece ciertas estructuras.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      La estructura que sí puedes implementar
    </h2>
    <ul class="space-y-3 text-base text-zinc-800 dark:text-zinc-300">
      <li class="bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white block font-jetbrains text-sm mb-1">• Encabezados como preguntas naturales:</strong>
        Si tu H2 es “Optimización de contenido para búsqueda por voz”, un asistente tiene que inferir la pregunta. Si tu H2 es “¿Cómo optimizar contenido para búsqueda por voz?”, la pregunta y la respuesta están alineadas. No se trata de convertir todo el artículo en un FAQ, sino de que los encabezados de las secciones que quieres que sean recuperables formulen la pregunta que un usuario haría en voz alta.
      </li>
      <li class="bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white block font-jetbrains text-sm mb-1">• Respuesta directa en las primeras 2–3 frases:</strong>
        Después de cada encabezado-pregunta, la respuesta debe poder leerse sola. Si el lector —o el asistente— se detiene después de tres frases, debe tener una respuesta útil. El desarrollo viene después.
      </li>
      <li class="bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white block font-jetbrains text-sm mb-1">• Marcado estructurado FAQPage y HowTo:</strong>
        El schema no “hace” que te posicionen, pero hace explícita la estructura pregunta-respuesta para los sistemas que la consumen. Es especialmente relevante cuando el contenido se sirve a través de asistentes que necesitan identificar pares pregunta-respuesta de forma inequívoca.
      </li>
      <li class="bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white block font-jetbrains text-sm mb-1">• Accesibilidad de audio real, no solo “tener un podcast”:</strong>
        La accesibilidad de audio incluye subtítulos y transcripciones precisas, pero también una estructura de página que no dependa exclusivamente de información visual. Un asistente que lee tu página en voz alta se encuentra con los mismos problemas que un usuario de lector de pantalla: encabezados que no describen la sección, enlaces “haz clic aquí”, texto alternativo ausente o decorativo mal marcado.
      </li>
    </ul>

    <!-- BLOQUE DE CÓDIGO JSON-LD DE VOZ -->
    <pre><code class="language-json">{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo optimizar contenido para búsqueda por voz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Abre cada sección con una respuesta directa y autocontenida de 20 a 30 palabras, usa encabezados formulados como preguntas en lenguaje natural y complementa con marcado estructurado FAQPage y transcripciones accesibles de audio."
      }
    }
  ]
}</code></pre>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Un recurso práctico: plantilla de respuesta hablada
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Para cada sección que quieras hacer recuperable por voz, usa esta plantilla de tres niveles:
    </p>

    <div class="space-y-3 font-jetbrains text-xs sm:text-sm">
      <div class="bg-zinc-100 dark:bg-zinc-900 border-l-4 border-[#FF4400] p-4">
        <div class="font-bold text-[#FF4400] uppercase">Nivel 1 — Respuesta directa (20–30 palabras)</div>
        <p class="mt-1 text-zinc-800 dark:text-zinc-300">
          Empieza con la respuesta, no con el contexto. <em>Ejemplo: “Para optimizar contenido para búsqueda por voz, abre cada sección con una respuesta directa de 20 a 30 palabras y usa encabezados formulados como preguntas naturales.”</em>
        </p>
      </div>

      <div class="bg-zinc-100 dark:bg-zinc-900 border-l-4 border-[#B8006E] dark:border-[#D4FF00] p-4">
        <div class="font-bold text-[#B8006E] dark:text-[#D4FF00] uppercase">Nivel 2 — Desarrollo (40–60 palabras)</div>
        <p class="mt-1 text-zinc-800 dark:text-zinc-300">
          Explica el “cómo” o el “por qué” en un párrafo autocontenido. Sin remisiones a párrafos anteriores.
        </p>
      </div>

      <div class="bg-zinc-100 dark:bg-zinc-900 border-l-4 border-black dark:border-white p-4">
        <div class="font-bold text-black dark:text-white uppercase">Nivel 3 — Contexto y matices</div>
        <p class="mt-1 text-zinc-800 dark:text-zinc-300">
          Aquí van los límites, las excepciones y las fuentes. Este nivel no está pensado para ser leído en voz alta, sino para el lector que necesita profundidad.
        </p>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Checklist rápida de voz y audio
    </h2>
    <div class="bg-zinc-50 dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-5 space-y-2.5 font-jetbrains text-xs sm:text-sm">
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>Cada sección recuperable tiene un H2 en forma de pregunta natural.</span>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>La primera respuesta de cada sección funciona sin el resto del artículo.</span>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>El schema FAQPage o HowTo refleja preguntas y respuestas reales de la página, no un FAQ inventado al final.</span>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>Las transcripciones de audio son precisas y están sincronizadas; los subtítulos no son generados sin revisión.</span>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>Los encabezados describen la sección sin ambigüedad cuando se leen en voz alta.</span>
      </div>
      <div class="flex items-start gap-2.5">
        <span class="text-[#D4FF00] bg-black px-1 font-bold">[✓]</span>
        <span>Los enlaces tienen texto significativo; el texto alternativo de imágenes describe la función o el contenido, no “imagen”.</span>
      </div>
    </div>
  </section>

  <section class="space-y-4 pt-4 border-t-2 border-black dark:border-zinc-800">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00]">
      Conclusión
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La búsqueda por voz no exige un “SEO paralelo”. Exige que el contenido sea recuperable por intención, no solo por coincidencia léxica. S2R hace que la intención hablada pese más que la transcripción perfecta, pero la estructura que permite recuperar esa intención sigue siendo la misma que funciona para AEO: preguntas claras, respuestas directas, desarrollo autocontenido y accesibilidad real. Lo que cambia es el estándar de exigencia: si tu contenido no se puede leer en voz alta y seguir teniendo sentido, probablemente tampoco sea fácil de recuperar como respuesta hablada.
    </p>

    <div class="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 text-xs font-jetbrains space-y-1 text-zinc-700 dark:text-zinc-400">
      <div class="font-bold text-black dark:text-white uppercase mb-1">Fuentes oficiales:</div>
      <div>• Google Research, <em>Speech-to-Retrieval (S2R): A new approach to voice search</em> (07/10/2025).</div>
      <div>• Google Research, <em>Simple Voice Questions (SVQ) dataset</em> (misma publicación).</div>
      <div>• Referencias prácticas sobre contenido conversacional y formato de respuesta hablada: Webflow, Promptwatch y SEOGraphy (2026).</div>
    </div>
  </section>
</article>`;

export const ARTICLE_3_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">E-E-A-T & ALGORITMOS</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">CORE UPDATES 2026</span>
      <span class="text-zinc-500 py-0.5">SLUG: google-core-updates-contenido-asistido-ia</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      Actualizaciones Core de Google y contenido asistido por IA: experiencia, precisión y responsabilidad editorial
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      ¿Qué exige Google al contenido asistido por IA después de las actualizaciones de 2026?
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>WACHA Producciones Multimedia</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      El marco correcto: no es “IA sí o no”, es “esfuerzo humano verificable”
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Google mantiene desde febrero de 2023 una posición que no ha cambiado en lo esencial: el uso de IA para generar contenido no está prohibido. El riesgo aparece cuando la automatización se usa para producir contenido a escala con el propósito principal de manipular los resultados, sin aportar valor suficiente. Esa es la formulación de la guía sobre contenido generado por IA, y sigue siendo la referencia.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Lo que sí cambió en octubre de 2026 fue el nivel de explicitud. Google actualizó dos documentos: la guía sobre contenido generativo (1 de octubre) y la página sobre contenido útil centrado en personas (última actualización, 5 de octubre). La actualización no introdujo un nuevo factor de ranking ni anunció una penalización nueva; sincronizó la documentación oficial con criterios que ya estaban en las quality rater guidelines.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La consecuencia editorial es clara: la discusión útil ya no es si usas IA, sino si puedes demostrar <strong>esfuerzo, originalidad, talento o habilidad, y precisión</strong> en el contenido principal. Google nombra esos cuatro atributos explícitamente y entrena a los evaluadores de calidad para aplicarlos.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Qué cuenta como “contenido principal” (y por qué esto importa para la IA)
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La definición de contenido principal de Google es más amplia de lo que muchos equipos asumen: cualquier parte de la página que contribuya directamente a que la página cumpla su propósito. Eso incluye el texto y los medios principales, pero también calculadoras, herramientas interactivas, secciones con pestañas, reseñas de usuarios y los títulos y encabezados visibles.
    </p>

    <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-2">
      <div class="font-jetbrains text-xs font-bold text-[#FF4400] uppercase">Dos implicaciones críticas que suelen pasarse por alto:</div>
      <ul class="list-disc list-inside space-y-1.5 text-sm text-zinc-800 dark:text-zinc-300">
        <li><strong>El contenido detrás de pestañas puede ser contenido principal:</strong> La afirmación de que “lo que está en tabs no cuenta” es falsa según la propia definición de Google.</li>
        <li><strong>Los títulos y encabezados son contenido principal:</strong> Un título sensacionalista o un encabezado que no representa la página puede degradar la calidad del contenido principal, no solo el CTR.</li>
      </ul>
    </div>

    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Para el contenido asistido por IA, esto significa que la revisión no puede limitarse al cuerpo del artículo. Si la IA generó el título, la metadescripción, el schema o el alt text, esos elementos también requieren verificación humana. Google lo dice de forma explícita: la revisión debe cubrir títulos, metadescripciones, datos estructurados y texto alternativo de imágenes.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Lo que Google penaliza de verdad: escalado sin esfuerzo y autoría falsa
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Las spam policies siguen apuntando a dos conductas concretas:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-300 dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-[#FF4400] uppercase">1. Contenido escalado sin valor añadido</h3>
        <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          Usar IA para generar grandes volúmenes de páginas sin aportar valor puede violar las reglas sobre <em>scaled content abuse</em>. El problema no es la IA; es la ecuación “más páginas = más tráfico” cuando la producción es la parte más fácil.
        </p>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-300 dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-[#B8006E] dark:text-[#D4FF00] uppercase">2. Autoría engañosa y perfiles falsos</h3>
        <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          Google describe explícitamente las biografías inventadas, nombres falsos y credenciales fabricadas —incluidas fotos de perfil generadas por IA— como señales de baja calidad. La sección “Acerca de” es parte de la superficie de confianza.
        </p>
      </div>
    </div>

    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Un matiz igualmente importante: citar fuentes no equivale a esfuerzo original. Google ha declarado que la atribución “no reemplaza la necesidad de esfuerzo original”; resumir otros sitios y enlazarlos no es suficiente. Para el contenido asistido por IA, esto descarta el patrón de “investigación” que consiste en pedirle al modelo que resuma cinco resultados de búsqueda y publicar el resumen con enlaces.
    </p>

    <!-- BLOQUE DE CÓDIGO JSON-LD DE ATRIBUCIÓN EDITORIAL -->
    <pre><code class="language-json">{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Actualizaciones Core de Google y contenido asistido por IA",
  "author": {
    "@type": "Organization",
    "name": "WACHA Producciones Multimedia",
    "url": "https://whacha.site"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wacha Studios"
  },
  "review": {
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "author": { "@type": "Person", "name": "Mr. Decrépito" }
  }
}</code></pre>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Un recurso práctico: checklist de publicación para contenido asistido por IA
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Esta checklist está pensada para usarse antes de publicar, no después de una caída de tráfico. No garantiza recuperación —Google lo dice explícitamente: no promete que las mejoras produzcan un aumento visible inmediato en resultados—, pero reduce el riesgo de infracción evitable.
    </p>

    <div class="space-y-4">
      <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-[#FF4400] uppercase">Nivel 1 — Verificación factual (obligatoria)</h3>
        <ul class="space-y-1.5 text-xs sm:text-sm font-jetbrains text-zinc-800 dark:text-zinc-300">
          <li>[✓] Cada afirmación factual del texto ha sido contrastada con una fuente primaria u oficial, no solo con la salida del modelo.</li>
          <li>[✓] Las cifras, fechas y nombres propios han sido revisados manualmente.</li>
          <li>[✓] Las fuentes citadas existen y dicen lo que se les atribuye.</li>
          <li>[✓] El título, la metadescripción, el schema y el alt text han sido revisados con el mismo estándar que el cuerpo.</li>
        </ul>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-[#B8006E] dark:text-[#D4FF00] uppercase">Nivel 2 — Autoría y responsabilidad editorial</h3>
        <ul class="space-y-1.5 text-xs sm:text-sm font-jetbrains text-zinc-800 dark:text-zinc-300">
          <li>[✓] El autor o la autora existen y su identidad es verificable.</li>
          <li>[✓] Si hay una biografía, las credenciales son reales; no hay headshots generados por IA presentados como personas reales.</li>
          <li>[✓] La página identifica quién es responsable del contenido y cómo contactar.</li>
          <li>[✓] Si se usó IA, la página no lo oculta ni lo presenta como trabajo exclusivamente humano cuando no lo es.</li>
        </ul>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-black dark:text-white uppercase">Nivel 3 — Valor original y contenido principal</h3>
        <ul class="space-y-1.5 text-xs sm:text-sm font-jetbrains text-zinc-800 dark:text-zinc-300">
          <li>[✓] El contenido aporta algo que no está ya en los primeros resultados: datos propios, experiencia de primera mano, procedimiento probado.</li>
          <li>[✓] No es un resumen de resúmenes ni una reformulación de fuentes secundarias.</li>
          <li>[✓] Las secciones interactivas, calculadoras, tablas y tabs también cumplen el estándar de precisión y esfuerzo.</li>
          <li>[✓] Los títulos y encabezados describen el contenido con precisión sin clickbait engañoso.</li>
        </ul>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 space-y-2">
        <h3 class="font-jetbrains text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase">Nivel 4 — Expectativas realistas</h3>
        <ul class="space-y-1.5 text-xs sm:text-sm font-jetbrains text-zinc-800 dark:text-zinc-300">
          <li>[✓] El equipo entiende que corregir contenido no garantiza recuperar tráfico: el entorno ha cambiado con AI Overviews, foros y video.</li>
          <li>[✓] La revisión se trata como un proceso continuo, no como un parche único tras una actualización.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="space-y-4 pt-4 border-t-2 border-black dark:border-zinc-800">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00]">
      Conclusión
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Las actualizaciones Core y las guías de contenido de Google no han convertido la IA en un factor de penalización automática. Han hecho algo más exigente: han trasladado al contenido asistido por IA el mismo estándar que siempre se aplicó al contenido humano de calidad —esfuerzo real, autoría verificable, precisión comprobada y valor original—, pero ahora con la expectativa explícita de que la revisión humana cubra también los metadatos y el marcado estructurado. La responsabilidad editorial no es un adorno de E-E-A-T; es la condición que separa el contenido asistido por IA que Google considera útil del que considera escalado sin valor.
    </p>

    <div class="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 text-xs font-jetbrains space-y-1 text-zinc-700 dark:text-zinc-400">
      <div class="font-bold text-black dark:text-white uppercase mb-1">Fuentes oficiales:</div>
      <div>• Google Search Central, <em>Google Search's guidance about AI-generated content</em> (actualizada 01/10/2026; referencia original de 2023).</div>
      <div>• Google Search Central, <em>Creating helpful, reliable, people-first content</em> (actualizada 05/10/2026).</div>
      <div>• Análisis de la actualización: MarTech, <em>Google changed its content guidance. Don’t expect a reset</em> (13/10/2026); Linksurge, <em>Google Spells Out Four Quality Attributes…</em> (09/10/2026).</div>
    </div>
  </section>
</article>`;

export const ARTICLE_GEO_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">AEO & GEO</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">PRINCETON KDD 2024</span>
      <span class="text-zinc-500 py-0.5">SLUG: geo-la-muerte-del-keyword-stuffing</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      GEO (Generative Engine Optimization): La muerte del Keyword Stuffing
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      Cómo convertir tu marca en una fuente confiable, estructurada y citable en la era de los modelos de IA
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>WACHA Producciones Multimedia</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <p class="text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium">
      La nueva visibilidad digital no consiste únicamente en aparecer entre los primeros resultados de Google: también consiste en convertirse en una fuente que los sistemas de inteligencia artificial puedan encontrar, interpretar, verificar y citar.
    </p>
    <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-2">
      <div class="font-jetbrains text-xs font-bold text-[#FF4400] uppercase">Precisión importante de partida:</div>
      <p class="text-xs sm:text-sm text-zinc-800 dark:text-zinc-300">
        GEO no sustituye al PageRank ni existe una métrica universal que haya ocupado su lugar. Tampoco hay evidencia suficiente para afirmar que todos los LLM priorizan marcas registradas verificadas o que las citas cruzadas funcionen como un factor de posicionamiento único. Lo que sí está documentado es una transformación en la forma de descubrir, recuperar, sintetizar y mostrar información.
      </p>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      1. La idea central: de posicionar palabras a ser una fuente recuperable y citable
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Durante años, muchas estrategias SEO se concentraron en conseguir que una página coincidiera con determinadas búsquedas: palabras clave en títulos, encabezados, textos, enlaces y metadescripciones. Esa lógica sigue teniendo utilidad, pero su versión abusiva —repetir términos sin aportar información— no construye autoridad.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Los motores generativos introducen otra capa: además de recuperar páginas, algunos sistemas seleccionan fuentes, extraen información, comparan afirmaciones y generan respuestas que pueden incluir citas y enlaces. Google explica que sus experiencias generativas utilizan sistemas de recuperación apoyados en sus sistemas tradicionales de búsqueda y pueden ampliar una consulta mediante búsquedas relacionadas (<em>query fan-out</em>).
    </p>

    <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 space-y-2">
      <h3 class="font-jetbrains text-sm font-bold text-black dark:text-white uppercase">¿Qué significa GEO?</h3>
      <p class="text-xs sm:text-sm text-zinc-800 dark:text-zinc-300">
        <strong>Generative Engine Optimization (GEO)</strong> es el conjunto de prácticas destinadas a mejorar la posibilidad de que el contenido de una organización sea descubierto, recuperado, comprendido y utilizado como fuente en respuestas generadas por sistemas de inteligencia artificial.
      </p>
      <p class="text-xs text-zinc-600 dark:text-zinc-400">
        El término obtuvo respaldo académico con el estudio <em>GEO: Generative Engine Optimization</em> presentado en KDD 2024 por investigadores de Princeton, demostrando mejoras de visibilidad de hasta un 40% bajo condiciones controladas (benchmark GEO-bench).
      </p>
    </div>

    {/* Tabla SEO vs GEO */}
    <div class="border-2 border-black dark:border-zinc-700 overflow-x-auto my-4 brutal-shadow-black">
      <table class="w-full text-left text-xs sm:text-sm font-space-grotesk">
        <thead class="bg-black text-[#D4FF00] uppercase font-jetbrains border-b-2 border-black">
          <tr>
            <th class="p-3 border-r border-zinc-700">SEO Tradicional</th>
            <th class="p-3">GEO (Generative Engine Optimization)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          <tr>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Busca visibilidad en resultados de búsqueda (SERP).</td>
            <td class="p-3 font-medium">Busca que una fuente pueda aparecer o ser utilizada en respuestas generativas.</td>
          </tr>
          <tr>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Trabaja consultas, intención, indexación y enlaces.</td>
            <td class="p-3 font-medium">También necesita contenido recuperable, claro, verificable y atribuible.</td>
          </tr>
          <tr>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Mide impresiones, clics, posiciones y conversiones.</td>
            <td class="p-3 font-medium">Puede medir citas, páginas citadas y consultas de referencia (grounding).</td>
          </tr>
          <tr>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Compite por relevancia en una lista de enlaces.</td>
            <td class="p-3 font-medium">Compite por ser una fuente útil dentro de una respuesta sintetizada.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      2. La muerte del Keyword Stuffing: por qué repetir palabras ya no es una estrategia
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      El keyword stuffing consiste en introducir palabras clave o variaciones de ellas de manera excesiva, artificial o fuera de contexto con la intención de manipular la visibilidad.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-red-950/20 border-2 border-red-500/50 p-4 space-y-2">
        <div class="font-jetbrains text-xs font-bold text-red-500 uppercase flex items-center gap-1.5">
          <span>✕ EJEMPLO DEFICIENTE (SPAM DE KEYWORDS):</span>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400 italic">
          “GEO, posicionamiento GEO, estrategia GEO, GEO para empresas, GEO para SEO, optimización GEO y herramientas GEO son fundamentales para mejorar el GEO de cualquier negocio.”
        </p>
        <div class="text-[11px] text-red-400 font-mono">
          Repite el término pero no define, no explica un proceso y no aporta evidencia factual.
        </div>
      </div>

      <div class="bg-emerald-950/20 border-2 border-emerald-500/50 p-4 space-y-2">
        <div class="font-jetbrains text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
          <span>✓ VERSIÓN ÚTIL Y CITABLE:</span>
        </div>
        <p class="text-xs sm:text-sm text-zinc-200">
          “GEO (Generative Engine Optimization) es una estrategia para mejorar la visibilidad de una marca y de sus contenidos en respuestas generadas por inteligencia artificial. Para trabajarla, conviene asegurar que el sitio sea rastreable, publicar información original, identificar claramente a sus autores y respaldar las afirmaciones con fuentes.”
        </p>
        <div class="text-[11px] text-emerald-400 font-mono">
          Define el concepto, incluye relaciones semánticas y provee una explicación autosuficiente.
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      3. Qué puede hacer que una página sea utilizada como fuente
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      No existe una fórmula mágica secreta, pero la documentación técnica de Google Search Central, OpenAI y Microsoft permite identificar cinco áreas de trabajo indispensables:
    </p>

    <div class="space-y-3 font-jetbrains text-xs sm:text-sm">
      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 space-y-1">
        <strong class="text-black dark:text-[#D4FF00] uppercase block">• 3.1. Accesibilidad y rastreo:</strong>
        <p class="text-zinc-700 dark:text-zinc-300 font-space-grotesk text-xs sm:text-sm">
          Asegúrate de que no existan etiquetas <code>noindex</code> accidentales, enlaces rotos o bloqueos por robots.txt. OpenAI documenta expresamente la diferencia entre <code>OAI-SearchBot</code> (destinado al descubrimiento y búsqueda en tiempo real) y <code>GPTBot</code> (entrenamiento de modelos fundacionales).
        </p>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 space-y-1">
        <strong class="text-black dark:text-[#D4FF00] uppercase block">• 3.2. Coherencia factual y afirmaciones verificables:</strong>
        <p class="text-zinc-700 dark:text-zinc-300 font-space-grotesk text-xs sm:text-sm">
          Evita estadísticas inventadas ("el 80% fracasa sin GEO"). Cada cifra debe citar su fuente primaria, fecha de revisión y alcance metodológico.
        </p>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 space-y-1">
        <strong class="text-black dark:text-[#D4FF00] uppercase block">• 3.3. Entidades reconocibles:</strong>
        <p class="text-zinc-700 dark:text-zinc-300 font-space-grotesk text-xs sm:text-sm">
          Nombres consistentes entre el sitio web, registros comerciales, perfiles sociales y autores con biografías verificables.
        </p>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 space-y-1">
        <strong class="text-black dark:text-[#D4FF00] uppercase block">• 3.4. Citas cruzadas y reputación externa:</strong>
        <p class="text-zinc-700 dark:text-zinc-300 font-space-grotesk text-xs sm:text-sm">
          Aparición en medios especializados, asociaciones y documentación institucional independiente.
        </p>
      </div>

      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 space-y-1">
        <strong class="text-black dark:text-[#D4FF00] uppercase block">• 3.5. Estructura comprensible y contenido original:</strong>
        <p class="text-zinc-700 dark:text-zinc-300 font-space-grotesk text-xs sm:text-sm">
          Definiciones concretas, respuestas directas en los primeros párrafos, tablas comparativas y metodologías documentadas.
        </p>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      4. ¿El PageRank ha sido sustituido por una métrica GEO?
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      No. PageRank es un algoritmo histórico de Google y no existe una sola métrica transversal pública en los motores generativos. Sin embargo, las herramientas analíticas han comenzado a reportar nuevas dimensiones de visibilidad:
    </p>

    <div class="border-2 border-black dark:border-zinc-700 overflow-x-auto my-4 brutal-shadow-black">
      <table class="w-full text-left text-xs sm:text-sm font-space-grotesk">
        <thead class="bg-zinc-900 text-white uppercase font-jetbrains">
          <tr>
            <th class="p-3 border-r border-zinc-700">Métrica</th>
            <th class="p-3 border-r border-zinc-700">Qué permite observar</th>
            <th class="p-3">Qué NO demuestra</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          <tr>
            <td class="p-3 font-bold font-jetbrains border-r border-zinc-200 dark:border-zinc-800 text-[#FF4400]">Citas en respuestas IA</td>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Cuántas veces aparece el contenido como fuente en un sistema medido.</td>
            <td class="p-3 text-zinc-500">Que la página sea la mejor posicionada o más confiable.</td>
          </tr>
          <tr>
            <td class="p-3 font-bold font-jetbrains border-r border-zinc-200 dark:border-zinc-800 text-[#FF4400]">Páginas citadas</td>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Qué URLs del sitio aparecen como referencias específicas.</td>
            <td class="p-3 text-zinc-500">Que todo el dominio goce de autoridad global.</td>
          </tr>
          <tr>
            <td class="p-3 font-bold font-jetbrains border-r border-zinc-200 dark:border-zinc-800 text-[#FF4400]">Consultas de grounding</td>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Temas o frases asociados con la recuperación del contenido.</td>
            <td class="p-3 text-zinc-500">El prompt exacto introducido por cada usuario.</td>
          </tr>
          <tr>
            <td class="p-3 font-bold font-jetbrains border-r border-zinc-200 dark:border-zinc-800 text-[#FF4400]">Tráfico referido desde IA</td>
            <td class="p-3 border-r border-zinc-200 dark:border-zinc-800">Visitas procedentes de ChatGPT, Perplexity o Gemini.</td>
            <td class="p-3 text-zinc-500">Todas las impresiones donde el usuario leyó sin hacer clic.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      5. Ejemplo de marcado estructurado JSON-LD para una Organización
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Este fragmento ilustra cómo describir una organización mediante JSON-LD para clarificar relaciones de entidad y enlaces oficiales <code>sameAs</code>.
    </p>

    <!-- BLOQUE DE CÓDIGO CON ETIQUETAS PRE CODE (BOTÓN COPIAR AUTOMÁTICO) -->
    <pre><code class="language-json">&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Estudio Norte",
  "url": "https://www.ejemplo.com/",
  "description": "Estudio de diseño y comunicación visual.",
  "sameAs": [
    "https://www.linkedin.com/company/perfil-oficial/",
    "https://www.instagram.com/perfil-oficial/"
  ]
}
&lt;/script&gt;</code></pre>

    <p class="text-xs text-zinc-600 dark:text-zinc-400 font-jetbrains">
      * <code>sameAs</code> debe apuntar a perfiles oficiales que representen realmente a la misma organización. No agregues perfiles de terceros o directorios genéricos.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      6. Protocolo: Cómo comprobar si tu sitio aparece en respuestas de IA
    </h2>
    <div class="bg-zinc-50 dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-4 space-y-2 font-jetbrains text-xs sm:text-sm">
      <ol class="list-decimal list-inside space-y-1.5 text-zinc-800 dark:text-zinc-300">
        <li>Selecciona entre cinco y diez preguntas que un cliente potencial formularía.</li>
        <li>Incluye preguntas informativas, comparativas y de resolución de problemas.</li>
        <li>Ejecuta las mismas consultas en los motores que quieras evaluar (Gemini, SearchGPT, Perplexity).</li>
        <li>Registra si aparece la marca, si se cita una URL propia y qué otras fuentes se mencionan.</li>
        <li>Repite las pruebas en fechas distintas.</li>
        <li>Compara resultados antes y después de cambios editoriales o técnicos.</li>
      </ol>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      7. Recurso práctico: Kit de auditoría GEO
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Descarga el kit complementario que incluye cuatro herramientas en una sola hoja de trabajo:
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-jetbrains text-xs">
      <div class="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white uppercase">[1] Auditoría GEO:</strong>
        <p class="text-zinc-600 dark:text-zinc-400 mt-1">Lista de control para rastreo, evidencia, entidades y reputación.</p>
      </div>
      <div class="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white uppercase">[2] Ficha de Entidad:</strong>
        <p class="text-zinc-600 dark:text-zinc-400 mt-1">Registro de nombre oficial, dominio, perfiles y autores.</p>
      </div>
      <div class="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white uppercase">[3] Pruebas de Citación:</strong>
        <p class="text-zinc-600 dark:text-zinc-400 mt-1">Bitácora para guardar consultas, motor, fecha y URLs citadas.</p>
      </div>
      <div class="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
        <strong class="text-black dark:text-white uppercase">[4] Guía de Uso:</strong>
        <p class="text-zinc-600 dark:text-zinc-400 mt-1">Instrucciones para interpretar resultados sin confundir citas con tráfico.</p>
      </div>
    </div>
  </section>

  <section class="space-y-4 pt-4 border-t-2 border-black dark:border-zinc-800">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00]">
      Conclusión y Fuentes Oficiales
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      GEO no es el fin del SEO tradicional ni un truco para engañar a los modelos de lenguaje: es el reconocimiento de que la web sintética exige máxima claridad, consistencia factual y atribución verificable.
    </p>

    <div class="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 text-xs font-jetbrains space-y-1 text-zinc-700 dark:text-zinc-400">
      <div class="font-bold text-black dark:text-white uppercase mb-1">Fuentes y documentación oficial:</div>
      <div>• Princeton University, <em>GEO: Generative Engine Optimization</em> (KDD 2024).</div>
      <div>• Google Search Central, <em>Generative AI in Search & Query Fan-out Documentation</em>.</div>
      <div>• OpenAI Developers, <em>OAI-SearchBot & GPTBot Crawling Guidance</em>.</div>
      <div>• Microsoft Bing Webmaster Tools, <em>AI Performance Report & Grounding Guidelines</em> (2026).</div>
    </div>
  </section>
</article>`;

export const ARTICLE_INDAUTOR_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">MUSIC BUSINESS</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">INDAUTOR MÉXICO</span>
      <span class="bg-[#00E599] text-black px-2 py-0.5 font-bold border border-black">CÓDIGOS ISRC</span>
      <span class="text-zinc-500 py-0.5">SLUG: registrar-cancion-indautor-subir-spotify-isrc-mexico</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      Cómo Registrar una Canción en INDAUTOR y Subirla a Spotify (2026)
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      ¿Cuáles son los requisitos, costos y trámites para registrar derechos de autor y obtener códigos ISRC en México?
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>Wacha Multimedia & Sonido Decrépito</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Protección Legal vs. Distribución Digital: Dos Capas Diferentes
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      En la gestión de proyectos musicales independientes, es indispensable diferenciar entre la <strong>protección del derecho patrimonial y moral</strong> y la <strong>identificación comercial en entornos digitales</strong>.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Tener la constancia de registro ante el <strong>Instituto Nacional del Derecho de Autor (INDAUTOR)</strong> acredita la titularidad legal de la creación, pero no habilita la distribución del archivo en plataformas como Spotify, Apple Music, Tidal o Deezer. Para la comercialización digital se requiere una clave estandarizada de rastreo conocida como <strong>Código ISRC</strong>.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Requisitos, Formatos y Costos en INDAUTOR (2026)
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      El marco legal en México distingue dos figuras principales dentro de una producción musical:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-base text-zinc-800 dark:text-zinc-300">
      <li><strong>La Composición (Obra Músico-Literaria):</strong> Protege la melodía, armonía y letra.</li>
      <li><strong>El Fonograma (La Grabación Sonora):</strong> Protege la fijación de los sonidos de una interpretación o ejecución específica (el máster).</li>
    </ol>

    <div class="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 space-y-3">
      <h3 class="font-jetbrains text-sm font-bold text-black dark:text-white uppercase flex items-center gap-2">
        <span class="w-2.5 h-2.5 bg-[#FF4400]"></span>
        Documentación Necesaria:
      </h3>
      <ul class="list-disc list-inside space-y-1.5 text-sm text-zinc-800 dark:text-zinc-300 font-jetbrains">
        <li>Formato oficial de solicitud <strong>RPDA-01</strong> debidamente requisitado.</li>
        <li>Comprobante de pago de derechos bancario (Formato e5cinco).</li>
        <li>Identificación oficial vigente del autor o titular de derechos patrimoniales (INE / Pasaporte).</li>
        <li>Dos ejemplares idénticos de la obra en soporte físico.</li>
      </ul>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#B8006E] dark:text-[#D4FF00]">A. Solo Composición (Sin Grabación):</h4>
        <p class="text-xs font-space-grotesk text-zinc-700 dark:text-zinc-400">
          Se presentan dos ejemplares idénticos de la partitura (guion musical que incluya letra, melodía y cifrado armónico).
        </p>
      </div>
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#FF4400]">B. Producción Grabada (Máster Terminado):</h4>
        <p class="text-xs font-space-grotesk text-zinc-700 dark:text-zinc-400">
          Se presentan dos copias físicas tangibles en formato CD o unidad USB que contengan los archivos de audio en alta resolución (WAV 24-bit).
        </p>
      </div>
    </div>

    <div class="p-4 bg-[#D4FF00]/10 border-2 border-black dark:border-[#D4FF00] text-sm space-y-1">
      <p class="font-bold font-jetbrains text-black dark:text-[#D4FF00]">
        Costo oficial (2026): $367 MXN por concepto de recepción, examen y registro de cada obra.
      </p>
      <p class="text-xs text-zinc-700 dark:text-zinc-300">
        Tiempo del trámite ordinario: 15 días hábiles a través de las delegaciones federales o ventanilla general.
      </p>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Trámite Presencial "Express Autor" en CDMX
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Para obtener el certificado de registro el mismo día, el INDAUTOR dispone del servicio <strong>Express Autor</strong> en sus oficinas centrales:
    </p>
    <div class="p-4 bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 font-jetbrains text-xs space-y-2">
      <div class="text-[#FF4400] font-bold uppercase">📍 Sede Central INDAUTOR:</div>
      <div class="text-zinc-800 dark:text-zinc-200">Calle de Puebla No. 143, Colonia Roma Norte, Alcaldía Cuauhtémoc, C.P. 06700, Ciudad de México.</div>
      <div class="text-zinc-600 dark:text-zinc-400">
        Procedimiento: Acude en horario matutino con los formatos RPDA-01, el pago bancario de $367 MXN efectuado y los dos ejemplares idénticos. Si no existen prevenciones técnicas, el certificado sellado se entrega por la tarde del mismo día.
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Validez Internacional: Convenio de Berna vs. U.S. Copyright Office
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      El <strong>Convenio de Berna para la Protección de las Obras Literarias y Artísticas</strong> establece que los países firmantes (incluidos México y EE. UU.) reconocen automáticamente los derechos de autor concedidos en sus respectivos territorios.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#B8006E] dark:text-[#D4FF00]">U.S. Copyright Office ($45 - $85 USD):</h4>
        <p class="text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed">
          Exige pago en dólares y depósito en estándar <em>best edition</em>. Su ventaja es que habilita la reclamación de daños estatutarios en tribunales federales de Estados Unidos.
        </p>
      </div>
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#00E599]">INDAUTOR México ($367 MXN):</h4>
        <p class="text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed">
          Ofrece una vía sumamente económica, resolución rápida en CDMX e idéntica validez probatoria internacional bajo el Convenio de Berna.
        </p>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Códigos ISRC: La Llave de Rastreo para Plataformas Digitales
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      El <strong>Código ISRC</strong> (<em>International Standard Recording Code</em>) es el identificador único internacional para grabaciones sonoras y videos musicales. Funciona como la cédula de identidad digital de cada fonograma.
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm text-zinc-800 dark:text-zinc-300">
      <li><strong>Rastreo de Regalías:</strong> Spotify, Apple Music y sociedades de gestión colectiva (SACM, SOMEXFON) usan el ISRC para asociar cada stream con tu cuenta.</li>
      <li><strong>Inmutabilidad:</strong> Si la pieza tiene una nueva mezcla, remasterización, versión en vivo o remix, esa versión debe recibir un ISRC distinto.</li>
      <li><strong>Mecanismo de Obtención:</strong> La ruta más ágil para sellos independientes y creadores es a través de agregadoras digitales (DistroKid, ONErpm, TuneCore, CD Baby), las cuales emiten códigos ISRC automáticamente con el prefijo asignado por la IFPI.</li>
    </ul>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Prompt Maestro para Miniaturas de la Industria Musical
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Copia el siguiente prompt diseñado para generar portadas de alta conversión visual y autoridad técnica sobre trámites de derechos de autor:
    </p>
    <pre><code class="language-text">Actúa como un estratega visual para YouTube y plataformas digitales, especializado en diseño de miniaturas de alto impacto sobre la industria musical, trámites legales y monetización.

Objetivo:
Diseñar una miniatura visualmente atractiva, profesional y de alta conversión para el tema: "Cómo registrar tu música en INDAUTOR y subirla a Spotify con códigos ISRC".

Especificaciones:
1. Composición y Punto Focal:
- Lado izquierdo: Persona o creador musical en plano medio mirando a cámara con expresión de seguridad y determinación, señalando los elementos clave.
- Lado derecho: Diagrama visual de 3 pasos claros [1: INDAUTOR RPDA-01 / $367 MXN] -> [2: ONDA DE AUDIO CON CÓDIGO ISRC] -> [3: LOGO SPOTIFY / STREAMING].

2. Texto Superpuesto (Regla móvil a 120px):
- Texto principal: "PASO A PASO" (Tipografía Sans-Serif gruesa, máximo contraste sobre placa limpia).

3. Iluminación y Paleta de Color:
- Iluminación de borde (rim light) en tonos cian (#00E5FF) y magenta eléctrico (#FF007F).
- Fondo en gris carbón profundo (#121411) con sutil textura de estudio de grabación.
- Contraste moderado en el texto interno (35-45%) para evitar ceguera publicitaria.</code></pre>
  </section>
</article>`;

export const ARTICLE_YOUTUBE_HTML = `<article class="article-content font-space-grotesk text-zinc-900 dark:text-zinc-100 space-y-6">
  <header class="border-b-2 border-black dark:border-zinc-800 pb-6 space-y-3">
    <div class="flex flex-wrap gap-2 text-xs font-jetbrains">
      <span class="bg-[#FF4400] text-white px-2 py-0.5 font-bold border border-black">VIDEO SEO</span>
      <span class="bg-black text-[#D4FF00] dark:bg-zinc-800 px-2 py-0.5 font-bold border border-zinc-700">ALGORITMO 2026</span>
      <span class="bg-[#D4FF00] text-black px-2 py-0.5 font-bold border border-black">CTR × RETENCIÓN</span>
      <span class="text-zinc-500 py-0.5">SLUG: algoritmo-youtube-miniaturas-ctr-retencion-psicologia-visual</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-anton uppercase tracking-wide leading-tight text-black dark:text-white">
      Algoritmo de YouTube y Miniaturas: Matriz de CTR, Retención y Psicología Visual
    </h1>
    <p class="text-base sm:text-lg font-bold text-[#B8006E] dark:text-[#D4FF00] font-jetbrains">
      ¿Cómo evalúa el algoritmo de YouTube las miniaturas en 2026 para otorgar impresiones?
    </p>
    <div class="text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
      Por <strong>Wacha Producciones Multimedia & Video Lab</strong> • https://whacha.site
    </div>
  </header>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      La Trampa del CTR Aislado: Por Qué el Clic que No Se Queda es un Pasivo
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Durante años, el análisis de diseño para YouTube se concentró en una sola métrica: el Porcentaje de Clics (CTR). La estrategia convencional dictaba aumentar la saturación, incluir rostros con expresiones exageradas y utilizar tipografías gigantescas. Sin embargo, este enfoque ignoraba el factor determinante del posicionamiento orgánico.
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      La arquitectura del algoritmo de distribución opera mediante una heurística centrada en la satisfacción del usuario: <strong>CTR × Retención Temprana</strong>. Esto implica que un video con un 12% de CTR pero solo 20% de retención promedio pierde distribución frente a una pieza con 6% de CTR y 55% de retención. El sistema no busca predecir clics aislados; predice <strong>tiempo de visualización satisfecho por impresión</strong>.
    </p>
    <div class="p-4 bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 font-jetbrains text-xs">
      <strong class="text-[#FF4400] uppercase">El riesgo del fast click-away:</strong>
      <p class="text-zinc-700 dark:text-zinc-300 mt-1">
        Cuando una miniatura genera una expectativa que el contenido no cumple en los primeros 30 segundos, el usuario detecta la brecha de contenido y abandona. Como respuesta, la métrica de retención cae drásticamente y el algoritmo restringe la entrega de impresiones.
      </p>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      La Matriz de Evaluación: Los 3 Ejes de la Miniatura
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#D4FF00] bg-black p-1 inline-block">Eje 1 — CTR Potencial</h4>
        <p class="text-xs text-zinc-700 dark:text-zinc-400">
          Capacidad de detener el scroll en 1.5 segundos. Depende de la prominencia del elemento central y la claridad conceptual.
        </p>
      </div>
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#00E599] bg-black p-1 inline-block">Eje 2 — Coherencia</h4>
        <p class="text-xs text-zinc-700 dark:text-zinc-400">
          Verificación de la promesa en los primeros 30 segundos. Evita caídas abruptas en la curva de retención temprana.
        </p>
      </div>
      <div class="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-2">
        <h4 class="font-jetbrains font-bold text-xs uppercase text-[#FF4400] bg-black p-1 inline-block">Eje 3 — Watch Time Share</h4>
        <p class="text-xs text-zinc-700 dark:text-zinc-400">
          Habilidad para atraer al espectador adecuado que completará la sesión sin penalizaciones de rebote.
        </p>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Psicología del Color y el Mito del Contraste Máximo
    </h2>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Un error común en el diseño gráfico para plataformas digitales es asumir que el texto de una miniatura debe contar con el máximo contraste posible (100% blanco puro sobre negro).
    </p>
    <p class="text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
      Estudios sobre más de 50,000 variantes demuestran que el texto con un contraste superior al 70% contra el fondo reduce el CTR en un 12%. El rango óptimo se ubica entre el <strong>35% y el 45%</strong>, donde el rendimiento se incrementa hasta en un 9%.
    </p>
    <p class="text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed">
      Este fenómeno se conoce como el <strong>efecto letrero de neón</strong>: cuando el contraste es excesivo, el cerebro clasifica el elemento como publicidad intrusiva y activa la ceguera publicitaria subconsciente.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Legibilidad Móvil: Reglas Tipográficas a 120px
    </h2>
    <ul class="list-disc list-inside space-y-2 text-sm text-zinc-800 dark:text-zinc-300">
      <li><strong>Límite de Palabras:</strong> El rango óptimo se sitúa entre 0 y 3 palabras (máximo absoluto de 5). Superar este límite reduce el CTR promedio a 4.3%.</li>
      <li><strong>Familia Tipográfica:</strong> Exclusivamente fuentes Sans-Serif en pesos Bold o ExtraBold (Montserrat ExtraBold, Bebas Neue, Impact).</li>
      <li><strong>Posición Estratégica:</strong> Tercio superior izquierdo o central. La esquina inferior derecha debe mantenerse libre para evitar la superposición con el indicador de duración del video.</li>
    </ul>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Matriz de Auditoría Previa a la Publicación (CSV)
    </h2>
    <p class="text-sm text-zinc-700 dark:text-zinc-300">
      Copia o descarga la matriz ponderada (0 a 14 puntos) para auditar cada variante antes de subirla a la herramienta Test & Compare de YouTube Studio:
    </p>
    <pre><code class="language-csv">ID_Variante,Concepto_Promesa,Palabras_Texto,Paleta_Colores,Contraste_Texto_Estimado_Pct,Presencia_Rostro,Emocion_Rostro,Rostro_Area_Pct,Contacto_Visual,Contraste_Interfaz,Fuente_Sans_Serif_Negrita,Legible_120px,Diferencial_Promesa_vs_Otras_Variantes,Riesgo_Brecha_Contenido,Puntuacion_Total
A,Resultado final tangible,3,Amarillo/Negro,40,Si,Determinacion,18,Si,Alto,Si,Si,Si,Bajo,9
B,Conflicto o error comun,2,Rojo/Blanco,38,Si,Curiosidad,20,Si,Medio,Si,Si,Si,Medio,8
C,Proceso o metodo,4,Azul/Naranja,42,No,N/A,0,No,Alto,Si,No,Si,Bajo,6</code></pre>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-anton uppercase text-black dark:text-[#D4FF00] border-l-4 border-black dark:border-[#D4FF00] pl-3">
      Prompt Maestro para Generación de Conceptos
    </h2>
    <p class="text-sm text-zinc-700 dark:text-zinc-300">
      Prompt estructurado para someter conceptos a modelos de lenguaje o diseñadores:
    </p>
    <pre><code class="language-text">Actúa como un estratega de conversión visual y empaquetado para YouTube, especializado en analítica de retención, experiencia de usuario (UX móvil) y psicología del color. Tu objetivo es diseñar conceptos visuales que maximicen el 'watch time share' evitando cualquier táctica de clickbait que perjudique la retención temprana.

Contexto de la pieza:
- Título del video: [¿Cómo evalúa el algoritmo de YouTube las miniaturas en 2026 para otorgar impresiones?]
- Nicho/Sector: [marketing multimedia]
- Promesa central (lo que el video entrega genuinamente en los primeros 30 segundos): [que premia el algoritmo de YouTube: premia CTR × retención y penaliza el CTR aislado]
- Audiencia objetivo: [Diseñadores Gráficos, SEO, creadores de contenido]

Instrucciones de conceptualización:
Genera 3 conceptos de miniatura altamente diferenciados para someterlos a la herramienta Test & Compare de YouTube. Cada concepto debe apelar a un ángulo psicológico radicalmente distinto (Resultado final tangible, Conflicto/Error común, o Trámite/Método revelado). Se prohíbe proponer variantes que únicamente modifiquen el color de fondo.

Para cada concepto proporciona:
1. Ángulo Psicológico
2. Elemento Humano / Ancla Visual (20-30% del área con contacto visual directo)
3. Reglas de Texto (UX Móvil, máximo 3 palabras en el tercio superior)
4. Ingeniería de Color y Contraste (contraste texto-fondo 35-45%)
5. Auditoría de Fricción (Mitigación de brecha promesa-contenido)</code></pre>
  </section>
</article>`;


