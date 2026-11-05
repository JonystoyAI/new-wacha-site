import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export type FaqCategory = 'general' | 'blog' | 'produccion' | 'cumbialab' | 'tienda';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  category?: FaqCategory;
  title?: string;
  subtitle?: string;
}

const FAQS_BY_CATEGORY: Record<FaqCategory, FaqItem[]> = {
  general: [
    {
      question: "¿Qué es Wacha Multimedia y cuál es su propuesta de valor?",
      answer: "Wacha Multimedia es un laboratorio multidisciplinario que combina ingeniería de contenidos (investigación, redacción, animación cinematográfica), optimización algorítmica para IA (AEO/GEO), un sello de música experimental (Cumbia Lab / Sonido Decrépito) y una boutique de drops de streetwear y hardware de estudio."
    },
    {
      question: "¿Cómo trabajan la producción de contenidos para marcas, redes y canales?",
      answer: "Desarrollamos pipelines integrales de producción: desde la investigación periodística y redacción de guiones con técnicas neuro-visuales de retención hasta la animación 3D/CGI, desarrollo de avatares con IA y masterización de audio para YouTube, TikTok y campañas de marca."
    },
    {
      question: "¿Qué diferencia a Wacha de una agencia de marketing tradicional?",
      answer: "Operamos nuestra propia red de 8 canales de YouTube con más de 2.4 millones de impresiones diarias. No teorizamos sobre algoritmos; los probamos y optimizamos a diario en nuestra propia infraestructura."
    },
    {
      question: "¿Cómo puedo solicitar una cotización o colaborar?",
      answer: "Puedes utilizar nuestra Terminal Cotizadora AEO interactiva o pulsar el botón de WhatsApp directo para agendar una sesión de scoping con el equipo directivo."
    }
  ],
  blog: [
    {
      question: "¿Por qué optimizar para AEO (Answer Engine Optimization) y GEO en 2026?",
      answer: "Más del 50% de las consultas en buscadores y móviles ahora se resuelven mediante resúmenes de IA generativa (Gemini Overviews, SearchGPT, Perplexity). Si tu contenido no cuenta con entidades estructuradas (Schema.org) y 'Information Gain' real, los modelos sintéticos citarán a tus competidores."
    },
    {
      question: "¿Cómo uso las plantillas JSON-LD y recursos descargables de los artículos?",
      answer: "Cada artículo cuenta con archivos descargables gratuitos (JSON-LD anidados, matrices en CSV y checklists en Markdown). Solo haz clic en 'DESCARGAR' o en el código fuente HTML5 para copiarlos e integrarlos directamente en la cabecera de tu web."
    },
    {
      question: "¿Cómo funciona el Modo Lectura y el motor de Lectura en Voz Alta?",
      answer: "El Modo Lectura expande el contenido al centro de la pantalla eliminando elementos pesados y permitiendo cambiar tamaño tipográfico y temas (Día, Sepia, Noche). El botón 'ESCUCHAR' activa la síntesis de voz nativa en español para escuchar el artículo mientras trabajas."
    },
    {
      question: "¿Cuál es el trámite real para registrar canciones en INDAUTOR según el artículo?",
      answer: "El registro formal se realiza con el formato RPDA-01 y pago de $367 MXN. Para autores en México, el servicio Express Autor en la Roma Norte (CDMX) emite la constancia el mismo día, la cual cuenta con validez internacional bajo el Convenio de Berna."
    }
  ],
  produccion: [
    {
      question: "¿Qué abarca el servicio de 'INVESTIGACIÓN, REDACCIÓN, ANIMACIÓN Y CREACIÓN DE CONTENIDO'?",
      answer: "Abarca todo el ciclo de creación audiovisual: investigación documental rigurosa, guionismo optimizado para el ratio 3s/4.5s de retención, diseño de personajes y avatares con IA, animación 2D/3D y edición dinámica con diseño sonoro profesional."
    },
    {
      question: "¿Trabajan con marcas comerciales, creadores e instituciones públicas?",
      answer: "Sí. Contamos con casos de éxito comprobados para FinTechs (CETES Premier), empresas constructoras e industriales (JF Construcciones), startups SaaS (unitIA) y creadores de contenido que buscan escalar sus canales orgánicos."
    },
    {
      question: "¿Quién mantiene los derechos patrimoniales y de autor del contenido producido?",
      answer: "El cliente adquiere la totalidad de los derechos patrimoniales y licencias comerciales de explotación sobre los videos, guiones, animaciones y materiales entregados una vez liquidado el proyecto."
    },
    {
      question: "¿Cuáles son los tiempos de entrega promedio de una serie o video de marca?",
      answer: "Dependiendo de la complejidad y duración: un paquete de piezas cortas (Shorts/TikToks) toma de 3 a 5 días hábiles; una producción cinematográfica o documental de canal toma de 7 a 14 días hábiles con revisiones intermedias."
    }
  ],
  cumbialab: [
    {
      question: "¿Qué es Cumbia Lab y el Proyecto de Cumbia Decrépita?",
      answer: "Es el laboratorio sonoro y sello independiente de Wacha Multimedia, especializado en cumbia rebajada, pitch frenado a 16 RPM, texturas analógicas de cinta magnética y experimentación con sintetizadores modulares."
    },
    {
      question: "¿Las canciones y pistas son de descarga gratuita?",
      answer: "Sí. Varios de nuestros EPs y sencillos están disponibles para descarga directa en alta resolución (WAV / MP3) a través de un Social Gate que te invita a compartir el proyecto en redes antes de desbloquear el archivo."
    },
    {
      question: "¿Puedo sincronizar las pistas para mis videos de YouTube o proyectos audiovisuales?",
      answer: "Sí, permitimos el uso libre no comercial con atribución ('Música por Sonido Decrépito / Cumbia Lab'). Para sincronización comercial en spots o cine, contáctanos para emitir una licencia personalizada de sincronización."
    },
    {
      question: "¿Dónde puedo escuchar la playlist oficial en streaming?",
      answer: "En nuestro canal oficial de SoundCloud integrado en este laboratorio, así como en Bandcamp, Spotify y las listas oficiales de YouTube Music."
    }
  ],
  tienda: [
    {
      question: "¿A qué países realizan envíos de los drops de WACHA STORE?",
      answer: "Realizamos envíos asegurados a toda la República Mexicana (3-5 días hábiles) y envíos internacionales rastreados por paquetería express a Estados Unidos, Latinoamérica y Europa."
    },
    {
      question: "¿Qué calidad tienen las prendas de la boutique?",
      answer: "Utilizamos algodón pesado premium de 240g/m² con lavado ácido artesanal, costuras dobles reforzadas y serigrafía de alto relieve/tacto cero. Las gorras cuentan con bordado 3D de alta densidad."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de débito y crédito (Visa, Mastercard, AMEX), transferencias bancarias SPEI, Mercado Pago y PayPal con cifrado bancario seguro SSL de extremo a extremo."
    },
    {
      question: "¿Cómo funcionan las piezas de edición limitada ('Drops')?",
      answer: "Cada drop se produce en tirajes limitados (generalmente de 50 a 100 piezas numeradas). Una vez agotado el stock del drop, no se vuelve a reeditar el mismo diseño para preservar la exclusividad del coleccionable."
    }
  ]
};

export const FaqSection: React.FC<FaqSectionProps> = ({
  category = 'general',
  title = "PREGUNTAS FRECUENTES // FAQ OFICIAL",
  subtitle = "Respuestas claras sobre metodología, producción multimedia, licencias sonoras y procesos de entrega."
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = FAQS_BY_CATEGORY[category] || FAQS_BY_CATEGORY.general;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b-2 border-black dark:border-zinc-800 pb-5 mb-8">
          <div className="font-jetbrains text-xs text-[#B8006E] dark:text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#FF4400]" />
            <span>// BASE DE CONOCIMIENTO & PREGUNTAS FRECUENTES</span>
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-wide">
            {title}
          </h2>
          <p className="font-space-grotesk text-xs sm:text-sm text-zinc-700 dark:text-zinc-400 mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 font-space-grotesk">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-2 border-black dark:border-zinc-800 bg-[#FAF9F5] dark:bg-zinc-950 brutal-shadow-black transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-jetbrains font-bold text-sm sm:text-base text-black dark:text-white hover:text-[#B8006E] dark:hover:text-[#D4FF00] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#FF4400] text-xs">[{index + 1 < 10 ? `0${index + 1}` : index + 1}]</span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="p-1 bg-black text-[#D4FF00] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-0 sm:px-5 sm:pb-5 text-sm sm:text-base text-zinc-800 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-jetbrains">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <MessageCircle className="w-4 h-4 text-[#FF4400]" />
            <span>¿Tienes una duda técnica o requerimiento específico no listado?</span>
          </div>
          <a
            href="https://wa.me/524424344406?text=Hola%20Wacha%20Multimedia,%20tengo%20una%20consulta%20específica"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-black text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black border border-black font-bold transition-all"
          >
            CONSULTAR VÍA WHATSAPP &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
