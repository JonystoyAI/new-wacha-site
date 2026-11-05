import React from 'react';
import { BlogFeed } from '../components/BlogFeed';
import { DropStoreGadget } from '../components/DropStoreGadget';
import { FaqSection } from '../components/FaqSection';
import { MerchItem } from '../types';
import { BookOpen, Sparkles, Terminal, ArrowLeft } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (route: string) => void;
  onAddToCart: (item: MerchItem, size: string) => void;
  selectedArticleId?: string | null;
  readingMode?: boolean;
}

export const BlogView: React.FC<BlogViewProps> = ({ 
  onNavigate, 
  onAddToCart,
  selectedArticleId = null,
  readingMode = false
}) => {
  return (
    <div className="space-y-0">
      {/* Blog Hero Banner */}
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
            <span className="text-[11px] font-jetbrains px-2.5 py-1 bg-black text-[#D4FF00] border border-zinc-700 font-bold uppercase">
              8 PUBLICACIONES OFICIALES
            </span>
          </div>

          <div>
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D4FF00] animate-pulse"></span>
              <span>// RADAR AEO & CENTRO DE INVESTIGACIÓN EDITORIAL</span>
            </div>
            <h1 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              BLOG DE INGENIERÍA, ARTE Y DISEÑO DIGITAL & AEO 2026
            </h1>
            <p className="font-space-grotesk text-sm sm:text-base text-zinc-300 max-w-3xl mt-2 leading-relaxed">
              Guías completas, código HTML5 listo para producción, esquemas Schema.org anidados, normativas de derechos de autor en INDAUTOR, Core Web Vitals en SPAs y matrices algorítmicas de retención para YouTube.
            </p>
          </div>
        </div>
      </div>

      {/* Full Blog Feed Component */}
      <BlogFeed
        initialArticleId={selectedArticleId}
        initialReadingMode={readingMode}
      />

      {/* Gadget Wacha Drop Store */}
      <DropStoreGadget
        onAddToCart={onAddToCart}
        onNavigateToStore={() => onNavigate('tienda')}
        title="WACHA EL TIANGUIS // OFERTAS DESTACADAS"
        subtitle="Acompaña tu lectura con piezas de edición limitada de nuestro taller de streetwear y hardware."
      />

      {/* Faq Section Blog */}
      <FaqSection
        category="blog"
        title="PREGUNTAS FRECUENTES // RADAR AEO & ARTÍCULOS"
        subtitle="Dudas habituales sobre indexación generativa, esquemas JSON-LD, licencias y trámites legales."
      />
    </div>
  );
};
