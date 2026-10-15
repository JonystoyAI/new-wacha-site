import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { WhatsAppCotizadorModal } from './WhatsAppCotizadorModal';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 font-jetbrains">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold text-xs px-4 py-3 border-2 border-black brutal-shadow-black flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          aria-label="Cotizar por WhatsApp"
        >
          {/* Pulsing indicator dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>

          <MessageSquare className="w-4 h-4 fill-current text-black" />
          <span className="font-bold tracking-wider hidden sm:inline">COTIZAR WHATSAPP ↗</span>
          <span className="font-bold tracking-wider sm:hidden">WHATSAPP</span>

          {/* New business promo badge */}
          <span className="absolute -top-3 -right-2 bg-[#FF4400] text-white text-[9px] font-bold px-1.5 py-0.5 border border-black shadow-md uppercase">
            0% RIESGO
          </span>
        </button>
      </div>

      {/* Express Cotizador Modal */}
      <WhatsAppCotizadorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
