import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle, Zap, Shield, Gift, PhoneCall } from 'lucide-react';

interface WhatsAppCotizadorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES_OPTIONS = [
  { id: 'branding', title: 'Diseño de Logo & Imagen Corporativa', priceMxn: 3500, priceUsd: 175, desc: 'Identidad visual completa, vector SVG, paleta de color y manual de marca.' },
  { id: 'website', title: 'Sitio Web / Landing Page de Alto Impacto', priceMxn: 8500, priceUsd: 425, desc: 'Diseño React ultrarrápido, optimizado para móvil y posicionado en buscadores IA.' },
  { id: 'video', title: 'Producción de Video YouTube / Shorts', priceMxn: 4800, priceUsd: 240, desc: 'Edición dinámica de alta retención, voz IA, miniatura y guionismo.' },
  { id: 'jingle', title: 'Jingle Comercial & Audio Branding', priceMxn: 3200, priceUsd: 160, desc: 'Firma sonora memorable, cumbia/synth y máster de audio para anuncios.' },
  { id: 'saas-ia', title: 'Software / Asistente IA & Calculadoras Web', priceMxn: 6500, priceUsd: 325, desc: 'Desarrollo de chatbots IA, cotizadores interactivos y calculadoras a medida.' },
  { id: 'full-pack', title: '🚀 PAQUETE LANZAMIENTO NEGOCIO TOTAL', priceMxn: 14500, priceUsd: 725, desc: 'Logo + Sitio Web + Jingle de Entrada + Asesoría de Estrategia Digital.' },
];

export const WhatsAppCotizadorModal: React.FC<WhatsAppCotizadorModalProps> = ({ isOpen, onClose }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['branding']);
  const [requestFreeSample, setRequestFreeSample] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>(''); // OWASP anti-bot honeypot

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const selectedObjects = SERVICES_OPTIONS.filter(s => selectedServices.includes(s.id));
  const totalMxn = selectedObjects.reduce((acc, curr) => acc + curr.priceMxn, 0);
  const totalUsd = selectedObjects.reduce((acc, curr) => acc + curr.priceUsd, 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot honeypot check (OWASP Rule #5)
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked.');
      return;
    }

    const serviceNames = selectedObjects.map(s => `• ${s.title}`).join('\n');
    const freeSampleText = requestFreeSample ? '\n🎁 *Solicita Muestra / Asesoría de Lanzamiento GRATIS*' : '';

    const text = `Hola Wacha Multimedia / Mr. Decrépito, me interesa cotizar para mi nuevo negocio:

👤 *Nombre:* ${clientName || 'Cliente Prospecto'}
🏢 *Giro / Negocio:* ${businessType || 'Comenzando nuevo proyecto'}
📱 *WhatsApp:* ${whatsappNumber || 'Sin especificar'}

📋 *Servicios Seleccionados:*
${serviceNames}
${freeSampleText}

💰 *Estimado Aproximado:* $${totalMxn.toLocaleString()} MXN / $${totalUsd} USD

📝 *Detalles Adicionales:*
${notes || 'Sin notas adicionales. ¡Solicito atención por WhatsApp!'}

_Enviado desde el Cotizador Exprés Wacha Multimedia_`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/524424655478?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121411] border-2 border-[#25D366] brutal-shadow-black p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#25D366] bg-black shrink-0 brutal-shadow-black">
              <img
                src="/wacha_logo.jpg"
                alt="Wacha Producciones Multimedia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-jetbrains text-[10px] text-[#25D366] font-bold tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                COTIZADOR EXPRÉS WHATSAPP // WACHA PRODUCCIONES
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                IMPULSA TU NEGOCIO DESDE CERO
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-300 hover:text-white bg-zinc-900 px-3 py-1.5 border border-zinc-700 hover:bg-[#FF4400] hover:border-[#FF4400] transition-colors flex items-center gap-1.5 font-jetbrains text-xs font-bold shrink-0"
            aria-label="Cerrar cotizador"
          >
            <span>CERRAR</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Sample Incentive Banner for New Businesses */}
        <div className="bg-[#25D366]/10 border-2 border-[#25D366] p-3.5 flex items-center gap-3 font-jetbrains text-xs text-white">
          <Gift className="w-6 h-6 text-[#25D366] shrink-0" />
          <div>
            <span className="font-bold text-[#25D366] block">BONO DE BIENVENIDA PARA NUEVOS EMPRENDEDORES:</span>
            <span>Incluye **asesoría inicial gratis** y propuesta visual previa al iniciar tu proyecto.</span>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-6">
          {/* OWASP Anti-Bot Honeypot */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Step 1: Select Services */}
          <div>
            <label className="block font-jetbrains text-xs font-bold text-[#D4FF00] uppercase mb-2">
              1. Selecciona los Servicios para tu Negocio:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-jetbrains text-xs">
              {SERVICES_OPTIONS.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`p-3 text-left border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#25D366]/15 border-[#25D366] text-white scale-[1.01]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white text-[11px] leading-tight">{srv.title}</span>
                      <CheckCircle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#25D366]' : 'text-zinc-700'}`} />
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-snug">{srv.desc}</p>
                    <div className="mt-2 text-[10px] font-bold text-[#25D366] flex justify-between border-t border-zinc-800/80 pt-1">
                      <span>DESDE:</span>
                      <span>${srv.priceMxn.toLocaleString()} MXN / ${srv.priceUsd} USD</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-jetbrains text-xs">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Tu Nombre o Empresa:</label>
              <input
                type="text"
                required
                placeholder="Ej. Carlos Martínez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-[#25D366] px-3 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Giro / Tipo de Negocio:</label>
              <input
                type="text"
                placeholder="Ej. Restaurante, FinTech, Ropa, etc."
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-[#25D366] px-3 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Número de WhatsApp (Opcional):</label>
              <input
                type="tel"
                placeholder="Ej. +52 442 123 4567"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-[#25D366] px-3 py-2 text-white outline-none"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 p-2.5 w-full hover:border-[#25D366] transition-colors">
                <input
                  type="checkbox"
                  checked={requestFreeSample}
                  onChange={(e) => setRequestFreeSample(e.target.checked)}
                  className="accent-[#25D366] w-4 h-4"
                />
                <span className="text-[11px] text-zinc-200 font-bold">Solicitar Asesoría de Lanzamiento GRATIS</span>
              </label>
            </div>
          </div>

          {/* Step 3: Notes */}
          <div className="font-jetbrains text-xs">
            <label className="block text-zinc-300 font-bold mb-1">Cuéntanos un poco de tu idea o dudas:</label>
            <textarea
              rows={2}
              placeholder="Ej. Voy empezando mi marca de ropa y necesito logo, sitio web y un jingle para Instagram..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-black border border-zinc-800 focus:border-[#25D366] p-3 text-white outline-none text-xs"
            />
          </div>

          {/* Total Price & Send Button */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-jetbrains text-[10px] text-zinc-400 block font-bold">ESTIMADO INICIAL APROXIMADO:</span>
              <span className="font-anton text-2xl text-[#25D366]">
                ${totalMxn.toLocaleString()} MXN <span className="text-xs font-jetbrains text-zinc-400">(${totalUsd} USD)</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebd59] text-black font-jetbrains font-bold text-xs px-6 py-3 border-2 border-black brutal-shadow-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-100"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>ENVIAR COTIZACIÓN A WHATSAPP DIRECTO ↗</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
