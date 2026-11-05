import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CHANNELS_DATA } from '../data/channelsData';
import { Play, ArrowRight, Video, Sparkles, ExternalLink, Clapperboard, Youtube } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface HomeMultimediaGadgetProps {
  onPlayVideo: (url: string, title: string) => void;
  onNavigateToMultimedia: () => void;
  onOpenCetesModal?: () => void;
  onOpenDroModal?: () => void;
}

export const HomeMultimediaGadget: React.FC<HomeMultimediaGadgetProps> = ({
  onPlayVideo,
  onNavigateToMultimedia,
  onOpenCetesModal,
  onOpenDroModal
}) => {
  // Combine 4 recent highlighted works of clients (redes, marca, institucional) & channels
  const clientWorks = [
    {
      id: PORTFOLIO_DATA[0].id,
      title: PORTFOLIO_DATA[0].title,
      client: "Wacha Multimedia Studios",
      type: "REDES & MARCA",
      tag: "ANIMACIÓN 3D & AVATARES IA",
      image: PORTFOLIO_DATA[0].image,
      videoUrl: PORTFOLIO_DATA[0].videoEmbed || 'https://www.youtube.com/embed/LZJX5EWePrA',
      metrics: "+2.8M Vistas Orgánicas",
      desc: "Desarrollo de personajes y avatares IA con edición dinámica y animación cinematográfica de marca."
    },
    {
      id: PORTFOLIO_DATA[1].id,
      title: "CETES PREMIER (FinTech Luxury App)",
      client: "Dinero Sin Censura",
      type: "FINTECH & INSTITUCIONAL",
      tag: "WEB APP & ESTRATEGIA AEO",
      image: PORTFOLIO_DATA[1].image,
      videoUrl: PORTFOLIO_DATA[1].videoEmbed || 'https://www.youtube.com/embed/LZJX5EWePrA',
      metrics: "+340K Visitas Orgánicas",
      desc: "Calculadora financiera Art Déco con integración a Banxico y arquitectura semántica AEO.",
      demoType: 'cetes'
    },
    {
      id: PORTFOLIO_DATA[2].id,
      title: "JF CONSTRUCCIONES (Identidad & Web)",
      client: "JF Construcciones",
      type: "CLIENTE INSTITUCIONAL",
      tag: "IMAGEN CORPORATIVA & WEB",
      image: PORTFOLIO_DATA[2].image,
      videoUrl: PORTFOLIO_DATA[2].videoEmbed || 'https://www.youtube.com/embed/Nu2z-pWWGIk',
      metrics: "+85% Leads Cualificados",
      desc: "Identidad visual completa, logotipo vectorial y portal web oficial para constructora de gran escala.",
      demoType: 'dro'
    },
    {
      id: CHANNELS_DATA[0].id,
      title: "RED OFICIAL DE CANALES YOUTUBE",
      client: "Wacha Media Network",
      type: "PRODUCCIÓN MULTIMEDIA",
      tag: "8 CANALES // 2.4M IMP/DÍA",
      image: CHANNELS_DATA[0].image,
      videoUrl: CHANNELS_DATA[0].videoUrl,
      metrics: "2.4 Millones Impresiones/Día",
      desc: "Pipeline de guionismo, investigación y animación para red de divulgación científica y finanzas."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with full requested name */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-black dark:border-zinc-800 pb-5 mb-8 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#00E599] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00E599] inline-block border border-black"></span>
              <span>// GADGET 02: PORTAFOLIO MULTIMEDIA & TRABAJOS DE CLIENTES</span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white uppercase tracking-wide leading-tight">
              INVESTIGACIÓN, REDACCIÓN, ANIMACIÓN Y CREACIÓN DE CONTENIDO MULTIMEDIA
            </h2>
            <p className="font-space-grotesk text-xs sm:text-sm text-zinc-700 dark:text-zinc-400 max-w-2xl mt-1.5 leading-relaxed">
              Trabajos creados últimamente para redes, marcas e instituciones públicas, junto a nuestra red oficial de canales.
            </p>
          </div>

          <button
            onClick={onNavigateToMultimedia}
            className="px-5 py-2.5 bg-[#FF4400] text-white hover:bg-black font-jetbrains text-xs font-bold border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-2 self-start lg:self-auto cursor-pointer"
          >
            <Clapperboard className="w-4 h-4" />
            <span>VER PORTAFOLIO COMPLETO & CANALES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientWorks.map((work) => (
            <div
              key={work.id}
              className="bg-[#FAF9F5] dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 flex flex-col justify-between brutal-shadow-black hover:border-black dark:hover:border-[#00E599] transition-all duration-150 group"
            >
              <div>
                {/* Media Preview Box */}
                <div className="relative aspect-video overflow-hidden bg-black border-b-2 border-black dark:border-zinc-800">
                  <ImageWithSkeleton
                    src={work.image}
                    alt={work.title}
                    aspectRatioClassName="aspect-video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-jetbrains font-bold px-2 py-0.5 bg-[#D4FF00] text-black border border-black uppercase">
                      {work.type}
                    </span>
                  </div>
                  {/* Play video overlay button */}
                  <button
                    onClick={() => onPlayVideo(work.videoUrl, work.title)}
                    title="Reproducir reel o demostración en video"
                    className="absolute inset-0 m-auto w-12 h-12 bg-black/80 hover:bg-[#FF4400] text-white rounded-full flex items-center justify-center border-2 border-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-jetbrains">
                    <span className="text-zinc-500 uppercase font-bold">{work.client}</span>
                    <span className="text-[#FF4400] font-bold">{work.metrics}</span>
                  </div>

                  <h3 className="font-anton text-base sm:text-lg text-black dark:text-white uppercase leading-snug group-hover:text-[#FF4400] transition-colors line-clamp-2">
                    {work.title}
                  </h3>

                  <div className="inline-block px-1.5 py-0.5 bg-black text-[#D4FF00] font-jetbrains text-[9px] font-bold">
                    {work.tag}
                  </div>

                  <p className="font-space-grotesk text-xs text-zinc-700 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {work.desc}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 border-t border-zinc-200 dark:border-zinc-900 mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onPlayVideo(work.videoUrl, work.title)}
                  className="flex-1 py-1.5 px-2 bg-black text-white hover:bg-[#FF4400] font-jetbrains text-[11px] font-bold border border-black transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>VER VIDEO</span>
                </button>

                {work.demoType === 'cetes' && onOpenCetesModal && (
                  <button
                    onClick={onOpenCetesModal}
                    title="Probar simulador interactivo"
                    className="py-1.5 px-2 bg-[#D4FF00] text-black font-jetbrains text-[11px] font-bold border border-black transition-all hover:bg-black hover:text-white cursor-pointer"
                  >
                    DEMO APP
                  </button>
                )}

                {work.demoType === 'dro' && onOpenDroModal && (
                  <button
                    onClick={onOpenDroModal}
                    title="Probar chatbot interactivo"
                    className="py-1.5 px-2 bg-[#D4FF00] text-black font-jetbrains text-[11px] font-bold border border-black transition-all hover:bg-black hover:text-white cursor-pointer"
                  >
                    DEMO BOT
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom invitation */}
        <div className="mt-8 text-center">
          <button
            onClick={onNavigateToMultimedia}
            className="inline-flex items-center gap-2 font-jetbrains text-xs font-bold text-black dark:text-[#FF4400] hover:underline cursor-pointer"
          >
            <span>Explorar los canales de YouTube, casos de éxito de marcas y cotizar producción personalizada</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
