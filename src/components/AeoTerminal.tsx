import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import { Terminal, Zap, Shield, Sparkles, Send, CheckCircle2, AlertTriangle, MessageSquare, ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'AEO & ESTRATEGIA',
    question: '¿Qué es la Optimización para Motores de Respuesta IA (AEO) y cómo beneficia a mi marca?',
    answer: 'AEO (Answer Engine Optimization) es la evolución del SEO tradicional. Estructuramos tus textos, transcripciones de audio y esquemas JSON-LD para que sistemas como Gemini, SearchGPT, Perplexity y ChatGPT extraigan tu contenido como la fuente primaria de información oficial, posicionando tu marca directamente en las respuestas sintéticas generadas por IA.'
  },
  {
    category: 'PRODUCCIÓN & RETENCIÓN',
    question: '¿Cómo funciona el proceso de producción de video y guionizado de alta retención?',
    answer: 'Diseñamos guiones estructurados con telemetría de atención, incorporando ganchos de audición e hitos visuales cada 4.5 segundos. Nos encargamos del concepto creativo, edición cinematográfica de video, diseño de sonido ("Sonido Decrépito") y el empaquetado final listo para publicar en YouTube, Shorts o TikTok.'
  },
  {
    category: 'TECNOLOGÍA & DERECHOS',
    question: '¿La clonación de voz por IA y el diseño sonoro respetan los derechos de autor?',
    answer: 'Absolutamente. En Wacha Multimedia operamos bajo estrictos protocolos de ética y propiedad intelectual. Las voces sintéticas e hiper-realistas se clonan a partir de modelos autorizados por el cliente o licencias exclusivas. Toda la música y el sound design cuentan con derechos comerciales totales entregados al cliente.'
  },
  {
    category: 'TIEMPOS DE ENTREGA',
    question: '¿Cuál es el tiempo de entrega promedio para un proyecto o paquete mensual?',
    answer: 'Los paquetes mensuales Starter (4 piezas) y Pro (12 piezas) se manejan en entregas semanales programadas con un tiempo de respuesta de 48 a 72 horas por pieza finalizada. Para desarrollos integrales de marca, hardware de estudio o AEO masivo, la entrega promedio se completa en 2 a 3 semanas.'
  },
  {
    category: 'COTIZACIÓN & PAGOS',
    question: '¿Cómo funcionan la cotización y las modalidades de pago?',
    answer: 'Al generar tu estimación en nuestra terminal interactiva y enviarla por WhatsApp, evaluamos los requerimientos técnicos específicos. Trabajamos con un 50% de anticipo para iniciar la producción y el 50% restante al entregar los másteres finales en resolución 4K y audio WAV de 24-bit.'
  },
  {
    category: 'REVISIONES & GARANTÍA',
    question: '¿Puedo solicitar revisiones en la edición de video o mezcla de audio?',
    answer: 'Todos nuestros servicios incluyen hasta 2 rondas completas de revisiones quirúrgicas sin costo adicional. Ajustamos cualquier detalle de ritmo, mezcla, color o texto para garantizar que el entregable cumpla con los estándares más exigentes.'
  }
];

export const AeoTerminal: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First accordion open by default
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: 'full-production',
    scope: 'pro',
    aiVoiceClone: true,
    soundDesign: true,
    retentionScripting: fontTrue(),
    contact: '',
    channelOrProject: '',
    notes: '',
    honeypot: '' // Anti-bot field
  });

  function fontTrue() {
    return true;
  }

  const [submitted, setSubmitted] = useState(false);

  // Price Calculation Logic
  const getBasePrice = () => {
    switch (formData.serviceType) {
      case 'full-production': return 1200;
      case 'ai-video-scripts': return 650;
      case 'audio-mastering': return 450;
      case 'aeo-seo-strategy': return 800;
      case 'brand-hardware': return 1500;
      default: return 1000;
    }
  };

  const getScopeMultiplier = () => {
    switch (formData.scope) {
      case 'starter': return 1.0;
      case 'pro': return 2.2;
      case 'enterprise': return 4.5;
      default: return 1.0;
    }
  };

  const basePrice = getBasePrice();
  const scopeMult = getScopeMultiplier();
  const addons = (formData.aiVoiceClone ? 250 : 0) + (formData.soundDesign ? 200 : 0) + (formData.retentionScripting ? 180 : 0);

  const estimatedUsd = Math.round((basePrice * scopeMult) + addons);
  const estimatedMxn = estimatedUsd * 20; // Approx MXN conversion rate

  const handleInputChange = (field: keyof QuoteFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot honeypot check (rule #5)
    if (formData.honeypot.trim() !== '') {
      console.warn('Honeypot triggered. Request silently discarded.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      const message = encodeURIComponent(
        `Hola Wacha Multimedia, quiero cotizar un proyecto con los siguientes parámetros:

• Servicio: ${formData.serviceType}
• Alcance: ${formData.scope}
• Voz IA: ${formData.aiVoiceClone ? 'SÍ' : 'NO'}
• Sound Design: ${formData.soundDesign ? 'SÍ' : 'NO'}
• Guiones Retención: ${formData.retentionScripting ? 'SÍ' : 'NO'}
• Contacto: ${formData.contact}
• Canal/Proyecto: ${formData.channelOrProject}
• Notas: ${formData.notes}

ESTIMADO: $${estimatedUsd} USD / $${estimatedMxn} MXN`
      );
      window.open(`https://wa.me/524424655478?text=${message}`, '_blank');
    }, 400);
  };

  return (
    <section id="servicios-aeo" className="py-16 bg-[#121411] border-b-2 border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Explanation Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4FF00]"></span>
              // SECCIÓN 05: AEO & SEO GENERATIVO
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide">
              OPTIMIZACIÓN PARA MOTORES DE RESPUESTA IA (AEO)
            </h2>
            <p className="font-space-grotesk text-zinc-300 text-sm leading-relaxed">
              Los motores de búsqueda tradicionales están cambiando por asistentes de IA como Gemini, ChatGPT y Perplexity. En Wacha Multimedia estructuramos el guionizado, metadatos JSON-LD y audio transcrito para que tu contenido sea extraído como la fuente primaria de verdad.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-jetbrains text-xs">
            <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-2 brutal-shadow-black">
              <div className="flex items-center gap-2 text-[#D4FF00]">
                <Zap className="w-4 h-4" />
                <span className="font-bold">INDEXACIÓN EN SEARCHGPT</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Estructura de párrafos con premisas empíricas directo a los modelos de lenguaje de última generación.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-2 brutal-shadow-black">
              <div className="flex items-center gap-2 text-[#FF4400]">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">RETENCIÓN ALGORÍTMICA</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Ganchos de audio y cambios visuales cada 4.5 segundos previenen la deserción de audiencia en YouTube.
              </p>
            </div>
          </div>
        </div>

        {/* Cotizador Terminal Console */}
        <div id="cotizador" className="bg-zinc-900 border-4 border-black p-6 sm:p-8 brutal-shadow-lime scroll-mt-24">
          <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-6 font-jetbrains text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <Terminal className="w-5 h-5 text-[#D4FF00]" />
              <span>TERMINAL DE COTIZACIÓN INTERACTIVA // WACHA ESTIMATOR V2.4</span>
            </div>
            <span className="text-emerald-400 hidden sm:inline">[ STATUS: READY FOR CALCULATOR ]</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anti-Bot Invisible Honeypot Field (Security Rule #5) */}
            <div className="opacity-0 absolute -left-[9999px] pointer-events-none" aria-hidden="true">
              <label htmlFor="website_url_check">Ignorar este campo</label>
              <input
                type="text"
                id="website_url_check"
                name="website_url_check"
                tabIndex={-1}
                value={formData.honeypot}
                onChange={(e) => handleInputChange('honeypot', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Input Controls */}
              <div className="lg:col-span-7 space-y-5 font-jetbrains text-xs">
                {/* Service Selection */}
                <div>
                  <label className="block text-zinc-300 font-bold mb-2">1. SELECCIONA EL TIPO DE SERVICIO:</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    className="w-full bg-black text-white p-3 border-2 border-zinc-700 focus:border-[#D4FF00] outline-none"
                  >
                    <option value="full-production">Producción Integral de Video & Contenido ($1,200 USD/mes base)</option>
                    <option value="ai-video-scripts">Guiones de Alta Retención & Clonación IA ($650 USD/mes base)</option>
                    <option value="audio-mastering">Sound Design & Masterización Decrépito ($450 USD/mes base)</option>
                    <option value="aeo-seo-strategy">Estrategia AEO / Indexación Gemini & SearchGPT ($800 USD/mes base)</option>
                    <option value="brand-hardware">Diseño de Marca & Hardware de Estudio ($1,500 USD proyecto base)</option>
                  </select>
                </div>

                {/* Scope Selection */}
                <div>
                  <label className="block text-zinc-300 font-bold mb-2">2. ALCANCE MENSUAL O VOLUMEN DE PRODUCCIÓN:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'starter', label: 'STARTER (4 PZS)' },
                      { id: 'pro', label: 'PRO (12 PZS)' },
                      { id: 'enterprise', label: 'DOMINIO (30+ PZS)' }
                    ].map((scopeItem) => (
                      <button
                        type="button"
                        key={scopeItem.id}
                        onClick={() => handleInputChange('scope', scopeItem.id)}
                        className={`p-3 border-2 font-bold text-center transition-all ${
                          formData.scope === scopeItem.id
                            ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black'
                            : 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {scopeItem.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-on Features Toggles */}
                <div>
                  <label className="block text-zinc-300 font-bold mb-2">3. MÓDULOS Y SERVICIOS ADICIONALES:</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 bg-black p-3 border border-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aiVoiceClone}
                        onChange={(e) => handleInputChange('aiVoiceClone', e.target.checked)}
                        className="accent-[#D4FF00] w-4 h-4"
                      />
                      <span className="text-zinc-200">Clonación y Síntesis de Voz IA Hiper-Realista (+$250 USD)</span>
                    </label>

                    <label className="flex items-center gap-3 bg-black p-3 border border-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.soundDesign}
                        onChange={(e) => handleInputChange('soundDesign', e.target.checked)}
                        className="accent-[#D4FF00] w-4 h-4"
                      />
                      <span className="text-zinc-200">Sound Design 'Sonido Decrépito' & Mezcla Subterránea (+$200 USD)</span>
                    </label>

                    <label className="flex items-center gap-3 bg-black p-3 border border-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.retentionScripting}
                        onChange={(e) => handleInputChange('retentionScripting', e.target.checked)}
                        className="accent-[#D4FF00] w-4 h-4"
                      />
                      <span className="text-zinc-200">Guionizado con Hooks de Retención y Referencias Científicas (+$180 USD)</span>
                    </label>
                  </div>
                </div>

                {/* Contact & Link Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-zinc-400 text-[10px] mb-1">CORREO O TELEGRAM DE CONTACTO:</label>
                    <input
                      type="text"
                      required
                      placeholder="ejemplo@wacha.media"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      className="w-full bg-black text-white p-2.5 border border-zinc-700 focus:border-[#D4FF00] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[10px] mb-1">CANAL DE YOUTUBE / PROYECTO (OPCIONAL):</label>
                    <input
                      type="text"
                      placeholder="https://youtube.com/@mi_canal"
                      value={formData.channelOrProject}
                      onChange={(e) => handleInputChange('channelOrProject', e.target.value)}
                      className="w-full bg-black text-white p-2.5 border border-zinc-700 focus:border-[#D4FF00] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Output Budget Display */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-black p-6 border-2 border-zinc-800 font-jetbrains">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                    <span>RESUMEN DE ESTIMACIÓN</span>
                    <span className="text-[#D4FF00] font-bold">PRESUPUESTO EN VIVO</span>
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span>BASE DE SERVICIO:</span>
                      <span>${basePrice} USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MULTIPLICADOR ALCANCE:</span>
                      <span>x{scopeMult}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>MÓDULOS EXTRAS:</span>
                      <span>+${addons} USD</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-4 border border-zinc-700 mt-4 text-center space-y-1">
                    <span className="text-zinc-400 text-[10px] block">ESTIMADO INVERSIÓN MENSUAL:</span>
                    <p className="font-anton text-4xl text-[#D4FF00]">
                      ${estimatedUsd} <span className="text-lg text-white">USD</span>
                    </p>
                    <p className="text-xs text-zinc-400 font-bold">
                      (~${estimatedMxn.toLocaleString()} MXN)
                    </p>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center">
                    *El valor final puede ajustarse según complejidad técnica o entregables adicionales.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#D4FF00] text-black font-bold py-4 border-2 border-black brutal-shadow-black hover:bg-[#FF4400] hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>GENERAR COTIZACIÓN EN WHATSAPP ↗</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="mt-16 border-t-2 border-zinc-800 pt-12 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b-2 border-zinc-800 pb-4">
            <div>
              <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D4FF00]" />
                // BASE DE CONOCIMIENTO & DUDAS FRECUENTES
              </div>
              <h3 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide">
                PREGUNTAS FRECUENTES (FAQ)
              </h3>
            </div>
            <p className="font-jetbrains text-xs text-zinc-400 max-w-sm">
              Respuestas directas sobre nuestros procesos de AEO, producción audiovisual, sound design y términos de servicio.
            </p>
          </div>

          <div className="space-y-3 font-jetbrains">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`border-2 transition-all ${
                    isOpen
                      ? 'bg-zinc-900 border-[#D4FF00] brutal-shadow-black'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-black text-[#D4FF00] border border-zinc-800 self-start sm:self-auto">
                        {faq.category}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`p-1.5 border border-zinc-700 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D4FF00] text-black border-black' : 'bg-zinc-900 text-zinc-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-zinc-300 leading-relaxed font-space-grotesk border-t border-zinc-800/80 pt-4">
                      <p className="bg-black/40 p-3.5 border-l-2 border-[#D4FF00]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
