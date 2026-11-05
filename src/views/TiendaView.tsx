import React from 'react';
import { MerchStore } from '../components/MerchStore';
import { DropStoreGadget } from '../components/DropStoreGadget';
import { FaqSection } from '../components/FaqSection';
import { CartItem, MerchItem } from '../types';
import { ShoppingBag, Flame, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

interface TiendaViewProps {
  cart: CartItem[];
  onAddToCart: (item: MerchItem, selectedSize: string) => void;
  onRemoveFromCart: (itemId: string, selectedSize: string) => void;
  onUpdateQuantity: (itemId: string, selectedSize: string, qty: number) => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
  onNavigate: (route: string) => void;
}

export const TiendaView: React.FC<TiendaViewProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  isCartOpen,
  onCloseCart,
  onNavigate
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
            <span className="text-[11px] font-jetbrains px-2.5 py-1 bg-[#D4FF00] text-black border border-black font-bold uppercase">
              TIENDA OFICIAL ONLINE
            </span>
          </div>

          <div>
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D4FF00] animate-pulse"></span>
              <span>// WACHA EL TIANGUIS • STREETWEAR & HARDWARE BOUTIQUE</span>
            </div>
            <h1 className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight">
              WACHA EL TIANGUIS ONLINE
            </h1>
            <p className="font-space-grotesk text-sm sm:text-base text-zinc-300 max-w-3xl mt-2 leading-relaxed">
              Coleccionables numerados, textiles de alto gramaje con lavado ácido, accesorios de estudio y hardware a medida. Envíos asegurados a todo México e internacional.
            </p>
          </div>
        </div>
      </div>

      {/* Main Merch Store Component */}
      <MerchStore
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
        isCartOpen={isCartOpen}
        onCloseCart={onCloseCart}
      />

      {/* Gadget Wacha Drop Store Spotlight */}
      <DropStoreGadget
        onAddToCart={onAddToCart}
        onNavigateToStore={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
        title="OFERTAS DESTACADAS & EDICIONES LIMITADAS"
        subtitle="Artículos con pocas unidades en inventario antes del cierre de temporada."
      />

      {/* Faq Section Tienda */}
      <FaqSection
        category="tienda"
        title="PREGUNTAS FRECUENTES // TIENDA & ENVÍOS"
        subtitle="Información detallada sobre compras seguras, tiempos de paquetería, tallas y devoluciones."
      />
    </div>
  );
};
