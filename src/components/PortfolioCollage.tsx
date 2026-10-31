import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PortfolioItem } from '../types';
import { ExternalLink, Play, Calculator, Bot, Sparkles, CheckCircle, ArrowUpRight, ChevronLeft, ChevronRight, Layers, Filter, RefreshCw, Youtube, Video } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface PortfolioCollageProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
  onOpenCetesModal: () => void;
  onOpenDroModal: () => void;
}

const FILTER_CATEGORIES = [
  { id: 'all', label: 'TODOS' },
  { id: 'content-creation', label: 'CONTENIDO & PERSONALIDAD IA' },
  { id: 'animation-video', label: 'ANIMACIÓN CINEMATOGRÁFICA & VIDEO' },
  { id: 'web-design', label: 'WEB DESIGN' },
  { id: 'apps', label: 'APPS & SAAS' },
  { id: 'logo', label: 'LOGOTIPOS' },
  { id: 'graphic-design', label: 'DISEÑO GRÁFICO' },
  { id: 'marketing', label: 'MARKETING & AEO' },
  { id: 'jingle', label: 'JINGLES & AUDIO' },
];

export const PortfolioCollage: React.FC<PortfolioCollageProps> = ({
  onPlayVideo,
  onOpenCetesModal,
  onOpenDroModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

  const handlePrev = (itemId: string, imagesLength: number) => {
    setCarouselIndexes(prev => {
      const current = prev[itemId] || 0;
      const nextIndex = current === 0 ? imagesLength - 1 : current - 1;
      return { ...prev, [itemId]: nextIndex };
    });
  };

  const handleNext = (itemId: string, imagesLength: number) => {
    setCarouselIndexes(prev => {
      const current = prev[itemId] || 0;
      const nextIndex = (current + 1) % imagesLength;
      return { ...prev, [itemId]: nextIndex };
    });
  };

  // Filtering projects
  const filteredProjects = PORTFOLIO_DATA.filter((item) => {
    if (activeFilter === 'all') return true;

    if (item.filterCategories && item.filterCategories.includes(activeFilter)) {
      return true;
    }

    const filterKey = activeFilter.toLowerCase();
    const inTags = item.tags.some(tag => tag.toLowerCase().includes(filterKey));
    const inCat = item.category.toLowerCase().includes(filterKey);
    const inTitle = item.title.toLowerCase().includes(filterKey);
    const inSub = item.subtitle.toLowerCase().includes(filterKey);

    return inTags || inCat || inTitle || inSub;
  });

  // Calculate project counts for each category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return PORTFOLIO_DATA.length;
    return PORTFOLIO_DATA.filter(item => {
      if (item.filterCategories && item.filterCategories.includes(catId)) return true;
      const filterKey = catId.toLowerCase();
      return (
        item.tags.some(tag => tag.toLowerCase().includes(filterKey)) ||
        item.category.toLowerCase().includes(filterKey)
      );
    }).length;
  };

  return (
    <section id="portafolio" className="py-12 sm:py-16 bg-[#FAF9F5] dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-zinc-300 dark:border-zinc-800 pb-4 mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-black bg-black brutal-shadow-black shrink-0 flex items-center justify-center">
              <ImageWithSkeleton
                src="/wacha_logo.jpg"
                alt="Logotipo Oficial Wacha Multimedia"
                containerClassName="w-full h-full rounded-full"
                className="w-full h-full object-cover"
                showLoaderBadge={false}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-jetbrains text-xs text-black dark:text-white font-bold tracking-wider mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF4400]"></span>
                // SECCIÓN 02: CASOS DE ÉXITO & PORTAFOLIO MULTIDISCIPLINARIO
              </div>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-black dark:text-white uppercase tracking-wide leading-tight">
                PORTAFOLIO MULTIDISCIPLINARIO COLLAGE
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2.5 w-full lg:w-auto">
            <p className="font-jetbrains text-xs text-zinc-700 dark:text-zinc-400 max-w-md leading-relaxed font-semibold">
              Generación de contenidos y desarrollo de personalidades creativas con IA, edición de video de alto impacto, animaciones cinematográficas de marca, desarrollo web y sound design.
            </p>
            {/* Direct Studio Channel Badges with 44px Touch Targets on Mobile */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 font-jetbrains text-xs pt-1 w-full sm:w-auto">
              <a
                href="https://www.tiktok.com/@whacha.site"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] sm:min-h-[38px] bg-white hover:bg-[#00F2FE] text-black hover:text-black px-3.5 py-2.5 sm:py-1.5 border-2 border-black flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black font-bold group/tiktok cursor-pointer"
                title="Canal Oficial TikTok @whacha.site"
              >
                <svg className="w-4 h-4 fill-black group-hover/tiktok:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.25a6.34 6.34 0 0 0-5.18 6.18 6.34 6.34 0 1 0 11.52-3.43 8.3 8.3 0 0 0 5.48 2.07V9.6a4.84 4.84 0 0 1-1.71-2.91z"/>
                </svg>
                <span className="text-black font-bold">TIKTOK: @whacha.site ↗</span>
              </a>
              <a
                href="https://www.youtube.com/@wachanos"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] sm:min-h-[38px] bg-white hover:bg-[#CC0000] text-black hover:text-white px-3.5 py-2.5 sm:py-1.5 border-2 border-black flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black font-bold group/yt cursor-pointer"
                title="Canal de YouTube Oficial del Estudio"
              >
                <Youtube className="w-4 h-4 text-black group-hover/yt:text-white" />
                <span className="text-black group-hover/yt:text-white font-bold">YOUTUBE DEL ESTUDIO ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="mb-8 sm:mb-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 font-jetbrains text-xs text-zinc-700 dark:text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-black dark:text-white uppercase">
              <Filter className="w-3.5 h-3.5 text-[#B8006E] dark:text-[#D4FF00]" />
              FILTRAR POR CATEGORÍA DE PROYECTO:
            </span>
            <span className="text-zinc-600 dark:text-zinc-500 text-[11px] font-bold">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'PROYECTO' : 'PROYECTOS'} ENCONTRADOS
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 font-jetbrains text-xs">
            {FILTER_CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat.id);
              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-2 border-2 transition-all duration-150 flex items-center gap-2 font-bold brutal-shadow-black hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-black text-[#D4FF00] border-black scale-[1.02]'
                      : 'bg-white text-black border-black hover:bg-[#D4FF00] hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 border ${
                      isActive
                        ? 'bg-[#D4FF00] text-black border-black font-bold'
                        : 'bg-zinc-100 text-black border-black font-bold'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((item) => {
              const images = item.images && item.images.length > 0 ? item.images : [item.image];
              const currentIndex = carouselIndexes[item.id] || 0;
              const currentImgSrc = images[currentIndex] || item.image;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 sm:p-6 brutal-shadow-black hover:border-[#B8006E] dark:hover:border-[#D4FF00] transition-all flex flex-col justify-between space-y-5 sm:space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Header Tag Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 font-jetbrains text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black px-2.5 py-0.5 font-bold border border-black">
                          {item.category}
                        </span>
                        {item.featuredBadge && (
                          <span className="bg-[#FF4400] text-white px-2 py-0.5 font-bold border border-black text-[10px] tracking-wider flex items-center gap-1">
                            <span>★</span> {item.featuredBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-600 dark:text-zinc-400">CLIENTE: <strong className="text-black dark:text-white">{item.client}</strong></span>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div>
                      <h3 className="font-anton text-2xl sm:text-3xl text-black dark:text-white group-hover:text-[#B8006E] dark:group-hover:text-[#D4FF00] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-jetbrains text-xs text-[#B8006E] dark:text-[#FF4400] font-bold mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Project Image Box with Carousel Controls, Skeleton Loader & Blur-up */}
                    <div className="relative aspect-video bg-black border border-zinc-800 overflow-hidden group/img">
                      <ImageWithSkeleton
                        src={currentImgSrc}
                        alt={item.title}
                        aspectRatioClassName="aspect-video"
                        containerClassName="w-full h-full"
                        className={`${
                          currentImgSrc === '/wacha_logo.jpg'
                            ? 'object-contain p-2 bg-gradient-to-b from-black via-zinc-950 to-black'
                            : 'object-cover'
                        } group-hover:scale-105 transition-transform duration-500`}
                        loading="lazy"
                        fallbackSrc={
                          item.image.startsWith('/') 
                            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuC89geygEh6vizPQ26mMMxgdXcs524r6OVqFpn9OD3x_Q74DPWJL59usbVfNSLRNSbQ-mddS8-QK2vpg_lKI5-_rT2DBnXtccYsDSnmsPNxXa0RiETJVdWszpYYAjKZUgjTc9y_Wo1j9NABSpBa8sphOwad93prPREuKu1rQNMaAd7ojXiYsWRQ8JjGflnW6L7NDtUtxX6x1Qv3HMlQeDslQ6CU0QKmq0pk6HJp63uWE6iPgy-4T33Z6f0WSWDD0WvMMA'
                            : item.image
                        }
                        badgeLabel={images.length > 1 ? `SLIDE ${currentIndex + 1}/${images.length}` : 'ASSET'}
                      >
                        {/* Official Logo Watermark Badge when Wacha logo is shown */}
                        {currentImgSrc === '/wacha_logo.jpg' && (
                          <div className="absolute top-2 left-2 bg-[#D4FF00] text-black font-jetbrains text-[10px] font-bold px-2.5 py-1 border border-black z-10 flex items-center gap-1.5 brutal-shadow-black">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                            <span>LOGOTIPO PORTADA: WACHA MULTIMEDIA</span>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 bg-black/90 text-[#D4FF00] font-jetbrains text-[10px] px-2.5 py-1 border border-zinc-700 flex items-center gap-1 z-10 font-bold">
                          {images.length > 1 ? (
                            <>
                              <Layers className="w-3 h-3 text-[#D4FF00]" />
                              <span>CARRUSEL {currentIndex + 1}/{images.length}</span>
                            </>
                          ) : (
                            <span>SISTEMA ACTIVO</span>
                          )}
                        </div>

                        {/* Carousel Prev/Next Overlay Buttons with 44px Touch Area on Mobile */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => handlePrev(item.id, images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 bg-black/85 hover:bg-[#D4FF00] hover:text-black text-white p-2 border border-zinc-700 transition-colors z-20 flex items-center justify-center active:scale-95 touch-manipulation"
                              aria-label="Imagen anterior"
                            >
                              <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleNext(item.id, images.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 bg-black/85 hover:bg-[#D4FF00] hover:text-black text-white p-2 border border-zinc-700 transition-colors z-20 flex items-center justify-center active:scale-95 touch-manipulation"
                              aria-label="Siguiente imagen"
                            >
                              <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                            </button>

                            {/* Carousel Dots with Comfortable Tap Targets */}
                            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-20">
                              {images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCarouselIndexes(prev => ({ ...prev, [item.id]: idx }))}
                                  className="w-6 h-6 flex items-center justify-center touch-manipulation"
                                  aria-label={`Ir a diapositiva ${idx + 1}`}
                                >
                                  <span
                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black transition-all ${
                                      idx === currentIndex ? 'bg-[#D4FF00] scale-125' : 'bg-black/75 hover:bg-zinc-400'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </ImageWithSkeleton>
                    </div>

                    {/* Metrics Pill Grid */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 font-jetbrains text-xs">
                      {item.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-zinc-100 dark:bg-black/80 p-2 sm:p-2.5 border border-zinc-300 dark:border-zinc-800 text-center flex flex-col justify-center min-h-[44px]">
                          <span className="text-black dark:text-[#D4FF00] font-bold block text-[11px] leading-tight font-mono">{metric}</span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="font-space-grotesk text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 font-jetbrains text-[10px]">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300 px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons with 44px+ Accessible Touch Targets on Mobile */}
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5 font-jetbrains text-xs">
                    {/* Direct TikTok Studio Channel Link */}
                    {item.tiktokUrl && (
                      <a
                        href={item.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[46px] sm:min-h-[44px] bg-white text-black hover:bg-[#00F2FE] hover:text-black py-3 sm:py-2.5 px-3 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 font-bold group/tiktok cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-black group-hover/tiktok:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.25a6.34 6.34 0 0 0-5.18 6.18 6.34 6.34 0 1 0 11.52-3.43 8.3 8.3 0 0 0 5.48 2.07V9.6a4.84 4.84 0 0 1-1.71-2.91z"/>
                        </svg>
                        <span className="text-black font-bold">VER EN TIKTOK OFICIAL (@whacha.site) ↗</span>
                      </a>
                    )}

                    {/* Direct YouTube Studio Channel Link */}
                    {item.youtubeUrl && (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[46px] sm:min-h-[44px] bg-white text-black hover:bg-[#CC0000] hover:text-white py-3 sm:py-2.5 px-3 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 font-bold group/yt cursor-pointer"
                      >
                        <Youtube className="w-4 h-4 text-black group-hover/yt:text-white shrink-0" />
                        <span className="text-black group-hover/yt:text-white font-bold">CANAL DE YOUTUBE DEL ESTUDIO (@wachanos) ↗</span>
                      </a>
                    )}

                    {/* Interactive Special Demo Buttons */}
                    {item.hasInteractiveDemo === 'cetes' && (
                      <button
                        onClick={onOpenCetesModal}
                        className="w-full min-h-[46px] sm:min-h-[44px] bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-bold py-3 sm:py-2.5 px-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 brutal-shadow-black text-center leading-tight group/btn cursor-pointer"
                      >
                        <Calculator className="w-4 h-4 shrink-0 text-black group-hover/btn:text-white" />
                        <span className="text-black group-hover/btn:text-white font-bold">PROBAR CALCULADORA CETES PREMIER (DEMO INTERACTIVA)</span>
                      </button>
                    )}

                    {item.hasInteractiveDemo === 'dro' && (
                      <button
                        onClick={onOpenDroModal}
                        className="w-full min-h-[46px] sm:min-h-[44px] bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-bold py-3 sm:py-2.5 px-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 brutal-shadow-black text-center leading-tight group/btn cursor-pointer"
                      >
                        <Bot className="w-4 h-4 shrink-0 text-black group-hover/btn:text-white" />
                        <span className="text-black group-hover/btn:text-white font-bold">CHATBOT IA DRO QUERÉTARO (DEMO EN VIVO)</span>
                      </button>
                    )}

                    {item.videoEmbed && (
                      <button
                        onClick={() => onPlayVideo(item.videoEmbed!, item.title)}
                        className="w-full min-h-[44px] bg-white text-black hover:bg-[#D4FF00] hover:text-black active:bg-[#D4FF00] active:text-black py-2.5 px-3 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 font-bold cursor-pointer group/reel"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-black shrink-0" />
                        <span className="text-black font-bold">VER VIDEO REEL / DEMO CASO DE ÉXITO</span>
                      </button>
                    )}

                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] bg-white text-black hover:bg-[#D4FF00] hover:text-black active:bg-[#D4FF00] active:text-black py-2.5 px-3 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 text-center font-bold cursor-pointer group/live"
                      >
                        <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
                        <span className="text-black font-bold">VISITAR SITIO WEB ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-12 text-center brutal-shadow-black space-y-4 my-8">
            <Filter className="w-12 h-12 text-[#FF4400] mx-auto animate-pulse" />
            <h3 className="font-anton text-2xl text-black dark:text-white">NO HAY PROYECTOS EN ESTA CATEGORÍA EN ESTE MOMENTO</h3>
            <p className="font-jetbrains text-xs text-zinc-700 dark:text-zinc-400 max-w-md mx-auto">
              No se encontraron proyectos específicos para el filtro seleccionado. Selecciona otra categoría o restablece el filtro.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black font-jetbrains text-xs font-bold px-6 py-2.5 border-2 border-black brutal-shadow-black hover:bg-[#D9008F] hover:text-white transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>MOSTRAR TODOS LOS PROYECTOS</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
