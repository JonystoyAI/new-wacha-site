import React from 'react';
import { ShoppingBag, Flame, Sparkles, ArrowRight, Check } from 'lucide-react';
import { getStoredMerchProducts } from '../services/cmsService';
import { MerchItem } from '../types';

interface DropStoreGadgetProps {
  onAddToCart?: (item: MerchItem, size: string) => void;
  onNavigateToStore: () => void;
  title?: string;
  subtitle?: string;
}

export const DropStoreGadget: React.FC<DropStoreGadgetProps> = ({
  onAddToCart,
  onNavigateToStore,
  title = "WACHA EL TIANGUIS // OFERTAS & MÁS VENDIDOS",
  subtitle = "Piezas limitadas, indumentaria de alto gramaje y hardware de estudio exclusivo antes de agotar existencia."
}) => {
  // Select top 3-4 items for the gadget spotlight
  const featuredDrops = getStoredMerchProducts().slice(0, 4);

  return (
    <section className="py-12 bg-zinc-950 text-white border-t-2 border-b-2 border-black dark:border-zinc-800 relative overflow-hidden">
      {/* Background Subtle Tech Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Gadget Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b-2 border-zinc-800 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-1.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4400] animate-pulse"></span>
              <span>// GADGET OFICIAL • EDICIONES POR AGOTARSE</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide flex items-center gap-3">
              {title}
            </h2>
            <p className="font-space-grotesk text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onNavigateToStore}
            className="px-5 py-2.5 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>VER EN WACHA EL TIANGUIS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Items Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDrops.map((drop, idx) => (
            <div
              key={drop.id}
              className="bg-[#121411] border-2 border-black dark:border-zinc-800 flex flex-col justify-between group hover:border-[#D4FF00] transition-all duration-150 brutal-shadow-black"
            >
              {/* Image & Badges */}
              <div className="relative aspect-square overflow-hidden bg-black border-b-2 border-black dark:border-zinc-800">
                <img
                  src={drop.image}
                  alt={drop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/wacha_logo.jpg';
                  }}
                />
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className={`text-[10px] font-jetbrains font-bold px-2 py-0.5 border border-black ${
                    idx === 0 
                      ? 'bg-[#FF4400] text-white' 
                      : idx === 1 
                        ? 'bg-[#D4FF00] text-black' 
                        : 'bg-black text-[#00E599]'
                  }`}>
                    {idx === 0 ? '🔥 ¡OFERTA RELÁMPAGO!' : idx === 1 ? '⚡ POR AGOTARSE' : (drop.badge || 'MÁS VENDIDO')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-jetbrains text-zinc-400 uppercase font-bold">
                    {drop.category}
                  </span>
                  <h3 className="font-anton text-base sm:text-lg text-white uppercase group-hover:text-[#D4FF00] transition-colors line-clamp-1 mt-0.5">
                    {drop.name}
                  </h3>
                  <p className="font-space-grotesk text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {drop.description}
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-anton text-lg text-[#D4FF00]">
                      ${drop.priceMxn} <span className="text-[11px] font-jetbrains text-zinc-400 font-normal">MXN</span>
                    </div>
                    <div className="text-[10px] font-jetbrains text-zinc-500">
                      (~${drop.priceUsd} USD)
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        const defaultSize = drop.availableSizes ? drop.availableSizes[0] : 'ÚNICA';
                        onAddToCart(drop, defaultSize);
                      } else {
                        onNavigateToStore();
                      }
                    }}
                    title="Añadir a carrito o ver en tienda"
                    className="px-3 py-1.5 bg-white text-black hover:bg-[#D4FF00] font-jetbrains text-xs font-bold border border-black transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>COMPRAR</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-3 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs font-jetbrains text-zinc-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E599]" />
            <span>Envíos seguros a todo México y envíos internacionales rastreados.</span>
          </div>
          <button
            onClick={onNavigateToStore}
            className="text-[#D4FF00] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            Ver tallas y detalles en Tienda Oficial &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
