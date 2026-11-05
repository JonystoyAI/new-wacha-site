import React, { useState } from 'react';
import { ChannelsGrid } from '../components/ChannelsGrid';
import { PortfolioCollage } from '../components/PortfolioCollage';
import { AeoTerminal } from '../components/AeoTerminal';
import { DropStoreGadget } from '../components/DropStoreGadget';
import { FaqSection } from '../components/FaqSection';
import { MerchItem } from '../types';
import { Clapperboard, Video, Sparkles, ArrowLeft, Tv, Briefcase, Users } from 'lucide-react';

interface ProduccionViewProps {
  onPlayVideo: (url: string, title: string) => void;
  onOpenCetesModal: () => void;
  onOpenDroModal: () => void;
  onNavigate: (route: string) => void;
  onAddToCart: (item: MerchItem, size: string) => void;
}

export const ProduccionView: React.FC<ProduccionViewProps> = ({
  onPlayVideo,
  onOpenCetesModal,
  onOpenDroModal,
  onNavigate,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'channels'>('all');

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <div className="bg-[#121411] text-white border-b-2 border-black dark:border-zinc-800 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 font-jetbrains text-xs font-bold text-zinc-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER AL INICIO</span>
            </button>
            <span className="text-[11px] font-jetbrains px-2.5 py-1 bg-black text-[#00E599] border border-zinc-700 font-bold uppercase">
              ESTUDIO MULTIMEDIA 360°
            </span>
          </div>

          <div>
            <div className="font-jetbrains text-xs text-[#00E599] font-bold tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00E599] animate-pulse"></span>
              <span>// DEPARTAMENTO DE PRODUCCIÓN AUDIOVISUAL & ESTRATEGIA</span>
            </div>
            <h1 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
              INVESTIGACIÓN, REDACCIÓN, ANIMACIÓN Y CREACIÓN DE CONTENIDO MULTIMEDIA
            </h1>
            <p className="font-space-grotesk text-sm sm:text-base text-zinc-300 max-w-3xl mt-2 leading-relaxed">
              Desarrollo de campañas y piezas de alto impacto para clientes de redes sociales, identidad de marca, entidades institucionales y la operación de nuestra propia red de 8 canales de YouTube.
            </p>
          </div>

          {/* View Filter Switcher */}
          <div className="flex flex-wrap gap-2 pt-4 font-jetbrains text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 border-2 font-bold transition-all cursor-pointer brutal-shadow-black ${
                activeTab === 'all'
                  ? 'bg-[#00E599] text-black border-black'
                  : 'bg-black text-zinc-300 border-zinc-700 hover:border-white'
              }`}
            >
              TODOS LOS TRABAJOS Y CANALES
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 border-2 font-bold transition-all cursor-pointer brutal-shadow-black flex items-center gap-1.5 ${
                activeTab === 'clients'
                  ? 'bg-[#D4FF00] text-black border-black'
                  : 'bg-black text-zinc-300 border-zinc-700 hover:border-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>CLIENTES (REDES, MARCA, INSTITUCIONAL)</span>
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-4 py-2 border-2 font-bold transition-all cursor-pointer brutal-shadow-black flex items-center gap-1.5 ${
                activeTab === 'channels'
                  ? 'bg-[#FF4400] text-white border-black'
                  : 'bg-black text-zinc-300 border-zinc-700 hover:border-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>RED OFICIAL 8 CANALES YOUTUBE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Sub-components based on activeTab */}
      {(activeTab === 'all' || activeTab === 'clients') && (
        <PortfolioCollage
          onPlayVideo={onPlayVideo}
          onOpenCetesModal={onOpenCetesModal}
          onOpenDroModal={onOpenDroModal}
        />
      )}

      {(activeTab === 'all' || activeTab === 'channels') && (
        <ChannelsGrid onPlayVideo={onPlayVideo} />
      )}

      {/* Terminal de Cotización Interactivo */}
      <AeoTerminal />

      {/* Gadget Wacha Drop Store */}
      <DropStoreGadget
        onAddToCart={onAddToCart}
        onNavigateToStore={() => onNavigate('tienda')}
        title="WACHA DROP STORE // MERCHANDISING OFICIAL"
        subtitle="Viste la cultura del estudio con nuestra indumentaria oficial de alta densidad y edición numerada."
      />

      {/* Preguntas Frecuentes de Producción */}
      <FaqSection
        category="produccion"
        title="PREGUNTAS FRECUENTES // PRODUCCIÓN MULTIMEDIA"
        subtitle="Tiempos de entrega, derechos de autor, guionismo para retención y desarrollo de marcas."
      />
    </div>
  );
};
