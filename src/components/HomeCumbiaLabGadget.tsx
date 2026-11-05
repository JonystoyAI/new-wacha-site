import React, { useState } from 'react';
import { RELEASES_DATA } from '../data/releasesData';
import { MusicRelease } from '../types';
import { Disc, Play, Download, Radio, ArrowRight, Music, Share2, Sparkles, Sliders } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { MusicDownloadModal } from './MusicDownloadModal';

interface HomeCumbiaLabGadgetProps {
  onNavigateToCumbiaLab: () => void;
  audioActive?: boolean;
}

export const HomeCumbiaLabGadget: React.FC<HomeCumbiaLabGadgetProps> = ({
  onNavigateToCumbiaLab,
  audioActive = true
}) => {
  const [downloadRelease, setDownloadRelease] = useState<MusicRelease | null>(null);
  const [activePlayerView, setActivePlayerView] = useState<'tracks' | 'flowmusic'>('tracks');

  // Top 4 most recent tracks
  const recentTracks = RELEASES_DATA.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[#121411] text-white border-b-2 border-black dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-zinc-800 pb-5 mb-8 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#FF4400] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4400] animate-pulse"></span>
              <span>// GADGET 03: LABORATORIO SONORO & CUMBIA EXPERIMENTAL</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide flex flex-wrap items-center gap-3">
              <span>CUMBIA LAB.</span>
              <span className="text-xs font-jetbrains px-3 py-1 bg-[#FF4400] text-white border border-black font-bold">
                (PROYECTO DE CUMBIA DECRÉPITA)
              </span>
            </h2>
            <p className="font-space-grotesk text-xs sm:text-sm text-zinc-400 max-w-xl mt-1 leading-relaxed">
              Las 4 pistas subidas más recientes, descargas gratuitas con desbloqueo social y gadget de SoundCloud sincronizado con la playlist oficial.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePlayerView(prev => prev === 'tracks' ? 'flowmusic' : 'tracks')}
              className={`px-4 py-2 font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black flex items-center gap-2 cursor-pointer border-2 ${
                activePlayerView === 'flowmusic'
                  ? 'bg-[#00E599] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-zinc-900 text-white border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00]'
              }`}
              title="Abrir reproductor oficial de Flow Music"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Reproductor Flow Music {activePlayerView === 'flowmusic' ? '● [ACTIVO]' : ''}</span>
            </button>

            <button
              onClick={onNavigateToCumbiaLab}
              className="px-5 py-2.5 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Disc className="w-4 h-4" />
              <span>EXPLORAR CUMBIA LAB COMPLETO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View 1: 4 Recent Tracks Grid */}
        {activePlayerView === 'tracks' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentTracks.map((track, idx) => (
              <div
                key={track.id}
                className="bg-zinc-900 border-2 border-zinc-800 flex flex-col justify-between brutal-shadow-black hover:border-[#D4FF00] transition-all duration-150 group"
              >
                <div>
                  {/* Vinyl Image */}
                  <div className="relative aspect-square overflow-hidden bg-black border-b-2 border-zinc-800">
                    <ImageWithSkeleton
                      src={track.coverImage}
                      alt={track.title}
                      aspectRatioClassName="aspect-square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-jetbrains font-bold px-2 py-0.5 bg-black text-[#D4FF00] border border-zinc-700 uppercase">
                        {track.type || 'SINGLE'} • {track.year}
                      </span>
                    </div>
                    {track.status && (
                      <div className="absolute bottom-2 right-2">
                        <span className="text-[10px] font-jetbrains font-bold px-1.5 py-0.5 bg-[#FF4400] text-white">
                          {track.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="text-[10px] font-jetbrains text-[#00E599] font-bold">
                      [{idx + 1}] PISTA RECIENTE // {track.duration || 'AUDIO'}
                    </div>

                    <h3 className="font-anton text-lg text-white uppercase group-hover:text-[#D4FF00] transition-colors line-clamp-1">
                      {track.title}
                    </h3>

                    <p className="font-space-grotesk text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {track.subtitle}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 border-t border-zinc-800 mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setDownloadRelease(track)}
                    className="flex-1 py-2 px-2 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold border border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DESCARGAR</span>
                  </button>

                  {track.soundcloudUrl && (
                    <a
                      href={track.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Escuchar en SoundCloud"
                      className="p-2 bg-zinc-800 hover:bg-[#FF4400] text-white border border-zinc-700 transition-colors cursor-pointer"
                    >
                      <Radio className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View 2: Flow Music Gadget Player */
          <div className="border-4 border-black bg-zinc-950 p-4 sm:p-6 brutal-shadow-black space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-jetbrains text-xs">
              <div className="flex items-center gap-2 text-[#00E599] font-bold">
                <Radio className="w-4 h-4 animate-pulse text-[#D4FF00]" />
                <span>REPRODUCTOR FLOW MUSIC OFICIAL // PLAYLIST CUMBIA DECRÉPITA</span>
              </div>
              <span className="text-zinc-400 text-[11px] font-mono">STREAMING ALTA RESOLUCIÓN</span>
            </div>

            <div className="w-full overflow-hidden bg-black rounded-2xl flex justify-center">
              <iframe 
                src="https://flowmusic.app/playlist/a8a6f758-cd63-4262-ba4f-4c84c98c666b" 
                width="100%" 
                height="480" 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                style={{ borderRadius: '16px', border: '1px solid #27272a', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                loading="lazy"
                title="Playlist Cumbia Decrépita Flow Music"
              />
            </div>
          </div>
        )}

        {/* SoundCloud Bottom Player Bar */}
        <div className="mt-8 bg-zinc-950 border-2 border-zinc-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-jetbrains text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black border border-[#D4FF00] flex items-center justify-center shrink-0">
              <Disc className="w-5 h-5 text-[#D4FF00] animate-spin" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>SOUNDCLOUD STREAMING OFICIAL</span>
                <span className="px-1.5 py-0.2 bg-[#00E599] text-black text-[9px]">EN VIVO</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                Sincronizado con pistas subidas y agregadas a la playlist de Sonido Decrépito.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://soundcloud.com/sonidodecrepito"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#FF4400] text-white hover:bg-black border border-black font-bold flex items-center gap-1.5 transition-all"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>PERFIL SOUNDCLOUD &rarr;</span>
            </a>
            <button
              onClick={onNavigateToCumbiaLab}
              className="px-3.5 py-1.5 bg-black text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black border border-[#D4FF00] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>ABRIR CONSOLA & SINTETIZADOR &rarr;</span>
            </button>
          </div>
        </div>

        {/* Social Gate Music Download Modal */}
        {downloadRelease && (
          <MusicDownloadModal
            release={downloadRelease}
            onClose={() => setDownloadRelease(null)}
          />
        )}
      </div>
    </section>
  );
};
