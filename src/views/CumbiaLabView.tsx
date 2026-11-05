import React from 'react';
import { SoundLab } from '../components/SoundLab';
import { DropStoreGadget } from '../components/DropStoreGadget';
import { FaqSection } from '../components/FaqSection';
import { MerchItem } from '../types';
import { Disc, Radio, Sparkles, ArrowLeft, Download, Music } from 'lucide-react';

interface CumbiaLabViewProps {
  audioActive: boolean;
  onNavigate: (route: string) => void;
  onAddToCart: (item: MerchItem, size: string) => void;
}

export const CumbiaLabView: React.FC<CumbiaLabViewProps> = ({
  audioActive,
  onNavigate,
  onAddToCart
}) => {
  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <div className="bg-[#121411] text-white border-b-2 border-black dark:border-zinc-800 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 font-jetbrains text-xs font-bold text-zinc-400 hover:text-[#D4FF00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER AL INICIO</span>
            </button>
            <span className="text-[11px] font-jetbrains px-2.5 py-1 bg-[#FF4400] text-white border border-black font-bold uppercase">
              SELLO & MÚSICA SUBTERRÁNEA
            </span>
          </div>

          <div>
            <div className="font-jetbrains text-xs text-[#FF4400] font-bold tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4400] animate-pulse"></span>
              <span>// LABORATORIO SONORO ANALÓGICO & DISQUERA INDEPENDIENTE</span>
            </div>
            <h1 className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight flex flex-wrap items-center gap-3">
              <span>CUMBIA LAB.</span>
              <span className="text-sm sm:text-base font-jetbrains px-3 py-1 bg-[#D4FF00] text-black border border-black font-bold">
                PROYECTO DE CUMBIA DECRÉPITA
              </span>
            </h1>
            <p className="font-space-grotesk text-sm sm:text-base text-zinc-300 max-w-3xl mt-2 leading-relaxed">
              Exploración de cumbia rebajada, cintas magnéticas de 16 RPM, compresión valvular analógica y descargas gratuitas con desbloqueo social.
            </p>
          </div>
        </div>
      </div>

      {/* Main SoundLab & SoundCloud Module */}
      <SoundLab audioActive={audioActive} />

      {/* Gadget Wacha Drop Store */}
      <DropStoreGadget
        onAddToCart={onAddToCart}
        onNavigateToStore={() => onNavigate('tienda')}
        title="WACHA DROP STORE // MERCH DE CUMBIA DECRÉPITA"
        subtitle="Playeras con lavado ácido '¡PAPÚUU!', gorras camper bordadas y pósters numerados de colección."
      />

      {/* Preguntas Frecuentes Cumbia Lab */}
      <FaqSection
        category="cumbialab"
        title="PREGUNTAS FRECUENTES // CUMBIA LAB."
        subtitle="Todo sobre las descargas gratis, Social Gate, derechos de sincronización y reproductor SoundCloud."
      />
    </div>
  );
};
