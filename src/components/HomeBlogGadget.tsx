import React from 'react';
import { INITIAL_BLOG_ARTICLES } from '../data/blogData';
import { BlogPost } from '../types';
import { BookOpen, ArrowRight, Maximize2, Volume2, Play, Pause, Sparkles, Share2 } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface HomeBlogGadgetProps {
  onOpenArticle: (article: BlogPost, readingMode?: boolean) => void;
  onNavigateToBlog: () => void;
  isSpeaking?: boolean;
  isPaused?: boolean;
  speakingArticleId?: string | null;
  onToggleSpeech?: (article: BlogPost, e: React.MouseEvent) => void;
  onShareArticle?: (article: BlogPost, e: React.MouseEvent) => void;
}

export const HomeBlogGadget: React.FC<HomeBlogGadgetProps> = ({
  onOpenArticle,
  onNavigateToBlog,
  isSpeaking = false,
  isPaused = false,
  speakingArticleId = null,
  onToggleSpeech,
  onShareArticle
}) => {
  // Take the 4 most recent articles
  const recentArticles = INITIAL_BLOG_ARTICLES.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F5] dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-zinc-800 pb-5 mb-8 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#B8006E] dark:text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4400] inline-block border border-black"></span>
              <span>// GADGET 01: BLOG DE INGENIERÍA, ARTE Y DISEÑO DIGITAL & AEO 2026</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-black dark:text-white uppercase tracking-wide flex items-center gap-3">
              PUBLICACIONES MÁS RECIENTES
              <span className="text-xs font-jetbrains px-2.5 py-1 bg-black text-[#D4FF00] border border-black font-bold hidden sm:inline-block">
                TOP 4
              </span>
            </h2>
            <p className="font-space-grotesk text-xs sm:text-sm text-zinc-700 dark:text-zinc-400 max-w-xl mt-1 leading-relaxed">
              Ingeniería de búsqueda para Gemini, SearchGPT y Perplexity, Core Web Vitals en SPAs, registro en INDAUTOR y algoritmos de retención.
            </p>
          </div>

          <button
            onClick={onNavigateToBlog}
            className="px-5 py-2.5 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>VER TODOS LOS ARTÍCULOS EN EL BLOG</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid / Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentArticles.map((article, index) => {
            const isThisSpeaking = isSpeaking && speakingArticleId === article.id;
            return (
              <div
                key={article.id}
                className="bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 flex flex-col justify-between brutal-shadow-black hover:border-black dark:hover:border-[#D4FF00] transition-all duration-150 group"
              >
                <div>
                  {/* Image with skeleton */}
                  <div className="relative aspect-video overflow-hidden bg-black border-b-2 border-black dark:border-zinc-800">
                    <ImageWithSkeleton
                      src={article.image}
                      alt={article.title}
                      aspectRatioClassName="aspect-video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className="text-[10px] font-jetbrains font-bold px-2 py-0.5 bg-black text-[#D4FF00] border border-zinc-700 uppercase">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="text-[10px] font-jetbrains font-bold px-1.5 py-0.5 bg-black/80 text-white backdrop-blur-xs">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <div className="text-[10px] font-jetbrains text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span className="text-[#B8006E] dark:text-[#D4FF00]">#{index + 1}</span>
                    </div>

                    <h3 
                      onClick={() => onOpenArticle(article, false)}
                      className="font-anton text-lg text-black dark:text-white uppercase leading-snug group-hover:text-[#B8006E] dark:group-hover:text-[#D4FF00] transition-colors cursor-pointer line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    <p className="font-space-grotesk text-xs text-zinc-700 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Actions: Leer, Modo Lectura, Escuchar */}
                <div className="p-4 pt-0 border-t border-zinc-200 dark:border-zinc-900 mt-2 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-1.5 font-jetbrains text-[11px]">
                    <button
                      onClick={() => onOpenArticle(article, false)}
                      className="py-1.5 px-2 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-bold border border-black transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>LEER</span>
                    </button>
                    <button
                      onClick={() => onOpenArticle(article, true)}
                      title="Abrir en Modo Lectura centrado"
                      className="py-1.5 px-2 bg-white dark:bg-black text-black dark:text-zinc-200 hover:bg-[#D4FF00] hover:text-black font-bold border border-black dark:border-zinc-700 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>ZEN</span>
                    </button>
                  </div>

                  {/* Voice Button */}
                  {onToggleSpeech && (
                    <button
                      onClick={(e) => onToggleSpeech(article, e)}
                      title="Escuchar artículo en voz alta"
                      className={`py-1.5 px-2 border font-jetbrains text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isThisSpeaking
                          ? 'bg-[#00E599] text-black border-black animate-pulse'
                          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:bg-[#00E599] hover:text-black border-zinc-300 dark:border-zinc-800'
                      }`}
                    >
                      {isThisSpeaking ? (
                        isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />
                      ) : (
                        <Volume2 className="w-3 h-3" />
                      )}
                      <span>
                        {isThisSpeaking ? (isPaused ? 'REANUDAR VOZ' : 'ESCUCHANDO') : 'ESCUCHAR EN VOZ ALTA'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom invitation link */}
        <div className="mt-8 text-center">
          <button
            onClick={onNavigateToBlog}
            className="inline-flex items-center gap-2 font-jetbrains text-xs font-bold text-black dark:text-[#D4FF00] hover:underline cursor-pointer"
          >
            <span>Ver los 8 artículos técnicos con código HTML descargable y esquemas Schema.org</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
