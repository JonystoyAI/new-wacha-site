import React, { useState } from 'react';
import { CHANNELS_DATA } from '../data/channelsData';
import { YouTubeChannel } from '../types';
import { Play, ExternalLink, Youtube, Radio, Sparkles, Globe, Facebook, Instagram } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ChannelsGridProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const ChannelsGrid: React.FC<ChannelsGridProps> = ({ onPlayVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');

  const categories = [
    'TODOS',
    'Psicología & Neurociencia',
    'Historia & Ciencia',
    'Finanzas & Inversión',
    'Productividad & Salud',
    'Derecho & Defensa',
    'Automatización & IA',
    'Periodismo & Análisis',
    'Música & Sound Design'
  ];

  const filteredChannels = selectedCategory === 'TODOS'
    ? CHANNELS_DATA
    : CHANNELS_DATA.filter(ch => ch.category === selectedCategory);

  return (
    <section id="canales" className="py-12 sm:py-16 bg-[#FAF9F5] dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-black dark:border-zinc-800 pb-4 mb-6 sm:mb-8 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-black dark:text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4400] inline-block border border-black"></span>
              // SECCIÓN 01: RED OFICIAL DE CONTENIDO
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-black dark:text-white uppercase tracking-wide flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span>RED DE CANALES YOUTUBE</span>
              <span className="text-xs font-jetbrains px-2.5 py-1 bg-[#FF4400] text-white border-2 border-black rounded-none font-bold shrink-0">
                2.4M IMP/DÍA
              </span>
            </h2>
          </div>
          <p className="font-jetbrains text-xs text-black dark:text-zinc-400 max-w-lg leading-relaxed font-semibold">
            Canales especializados en divulgación científica, economía pragmática, historia oculta, automatización y sound design urbano.
          </p>
        </div>

        {/* Category Filter Tabs with Touch-Friendly Heights */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8 font-jetbrains text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] sm:min-h-[38px] px-3.5 py-2 sm:py-1.5 border-2 transition-all duration-150 font-bold flex items-center justify-center hover:-translate-y-1 active:scale-95 brutal-shadow-black cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4FF00] text-black border-black scale-[1.02]'
                  : 'bg-white text-black border-black hover:bg-[#D4FF00] hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 hover:border-[#FF4400] dark:hover:border-[#D4FF00] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group brutal-shadow-black"
            >
              <div className="space-y-4">
                {/* Header Image & Handle with Skeleton & Blur-Up */}
                <ImageWithSkeleton
                  src={channel.image}
                  alt={channel.title}
                  aspectRatioClassName="aspect-square"
                  containerClassName="border-2 border-black dark:border-zinc-800 group-hover:border-[#FF4400] dark:group-hover:border-[#D4FF00] transition-colors"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  badgeLabel="CANAL YOUTUBE"
                >
                  <div className="absolute top-2 right-2 bg-black text-[#D4FF00] font-jetbrains text-[10px] font-bold px-2 py-0.5 border border-black z-10">
                    {channel.subscribers || 'OFICIAL'}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-[#FF4400] text-white font-jetbrains text-[10px] font-bold px-2.5 py-0.5 border border-black z-10">
                    {channel.handle}
                  </div>
                </ImageWithSkeleton>

                {/* Title & Category (Orange badge with white text as user requested) */}
                <div>
                  <span className="text-[10px] font-jetbrains bg-[#FF4400] text-white px-2 py-0.5 border border-black inline-block mb-1 font-bold">
                    {channel.category}
                  </span>
                  <h3 className="font-anton text-xl text-black dark:text-white group-hover:text-[#FF4400] dark:group-hover:text-[#D4FF00] transition-colors leading-snug">
                    {channel.title}
                  </h3>
                </div>

                {/* Description - Pure black ink in day mode */}
                <p className="font-space-grotesk text-xs text-black dark:text-zinc-300 line-clamp-3 leading-relaxed font-semibold">
                  {channel.description}
                </p>

                {/* Tags - Black badge with neon yellow text */}
                <div className="flex flex-wrap gap-1 font-jetbrains text-[10px] pt-1">
                  {channel.tags.map(tag => (
                    <span key={tag} className="bg-black text-[#D4FF00] px-2 py-0.5 border border-black font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons with 44px+ Accessible Touch Targets on Mobile */}
              <div className="pt-4 border-t-2 border-black dark:border-zinc-800 mt-4 space-y-2.5 font-jetbrains text-xs">
                {/* Button Ver Video Destacado: Inactive white background with black text, on hover/click yellow background with black text */}
                <button
                  onClick={() => onPlayVideo(channel.videoUrl, channel.videoTitle)}
                  className="w-full min-h-[44px] bg-white text-black hover:bg-[#D4FF00] hover:text-black active:bg-[#D4FF00] active:text-black font-bold py-2.5 px-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 brutal-shadow-black group/btn cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-black" />
                  <span className="text-black font-bold">VER VIDEO DESTACADO</span>
                </button>

                {/* Button Canal Oficial: Inactive white background with black icon/text, hover orange background with white icon/text */}
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-white text-black hover:bg-[#FF4400] hover:text-white py-2.5 px-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 text-xs font-bold brutal-shadow-black group/yt cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-black group-hover/yt:text-white" />
                  <span className="text-black group-hover/yt:text-white font-bold">CANAL OFICIAL YOUTUBE ↗</span>
                </a>

                {/* Additional Social & Web Links: Inactive white with black text/icon, hover colored with white text (except Bandcamp text remains black) */}
                {(channel.facebookUrl || channel.instagramUrl || channel.soundcloudUrl || channel.bandcampUrl || channel.webUrl) && (
                  <div className="grid grid-cols-2 gap-2 pt-1 font-bold">
                    {channel.facebookUrl && (
                      <a
                        href={channel.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] sm:min-h-[36px] bg-white text-black hover:bg-[#1877F2] hover:text-white border-2 border-black text-xs sm:text-[10px] font-bold py-2 px-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 truncate brutal-shadow-black group/fb cursor-pointer"
                        title="Facebook Oficial"
                      >
                        <Facebook className="w-3.5 h-3.5 text-black group-hover/fb:text-white shrink-0" />
                        <span className="text-black group-hover/fb:text-white truncate">Facebook ↗</span>
                      </a>
                    )}
                    {channel.webUrl && (
                      <a
                        href={channel.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] sm:min-h-[36px] bg-white text-black hover:bg-[#121411] hover:text-white border-2 border-black text-xs sm:text-[10px] font-bold py-2 px-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 truncate brutal-shadow-black group/web cursor-pointer"
                        title="Sitio Web Oficial"
                      >
                        <Globe className="w-3.5 h-3.5 text-black group-hover/web:text-white shrink-0" />
                        <span className="text-black group-hover/web:text-white truncate">Web Site ↗</span>
                      </a>
                    )}
                    {channel.instagramUrl && (
                      <a
                        href={channel.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] sm:min-h-[36px] bg-white text-black hover:bg-[#E4405F] hover:text-white border-2 border-black text-xs sm:text-[10px] font-bold py-2 px-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 truncate brutal-shadow-black group/ig cursor-pointer"
                        title="Instagram Oficial"
                      >
                        <Instagram className="w-3.5 h-3.5 text-black group-hover/ig:text-white shrink-0" />
                        <span className="text-black group-hover/ig:text-white truncate">Instagram ↗</span>
                      </a>
                    )}
                    {channel.soundcloudUrl && (
                      <a
                        href={channel.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] sm:min-h-[36px] bg-white text-black hover:bg-[#FF5500] hover:text-white border-2 border-black text-xs sm:text-[10px] font-bold py-2 px-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 truncate brutal-shadow-black group/sc cursor-pointer"
                        title="SoundCloud Oficial"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-black group-hover/sc:text-white shrink-0" viewBox="0 0 24 24">
                          <path d="M1.175 12.225c-.04 0-.075.025-.075.075v4.95c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-4.95c0-.05-.035-.075-.075-.075h-.35zm.9 1.15c-.04 0-.075.025-.075.075v3.8c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-3.8c0-.05-.035-.075-.075-.075h-.35zm.9-2.3c-.04 0-.075.025-.075.075v6.1c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-6.1c0-.05-.035-.075-.075-.075h-.35zm.9-1.25c-.04 0-.075.025-.075.075v7.35c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V9.9c0-.05-.035-.075-.075-.075h-.35zm.9-.85c-.04 0-.075.025-.075.075v8.2c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-8.2c0-.05-.035-.075-.075-.075h-.35zm.9-.9c-.04 0-.075.025-.075.075v9.1c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-9.1c0-.05-.035-.075-.075-.075h-.35zm.9-.85c-.04 0-.075.025-.075.075v9.95c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V7.225c0-.05-.035-.075-.075-.075h-.35zm.9-.75c-.04 0-.075.025-.075.075v10.7c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-10.7c0-.05-.035-.075-.075-.075h-.35zm.9-.65c-.04 0-.075.025-.075.075v11.35c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V5.825c0-.05-.035-.075-.075-.075h-.35zm.9-.55c-.04 0-.075.025-.075.075v11.9c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-11.9c0-.05-.035-.075-.075-.075h-.35zm1.25 12.025c.425.05.8.125 1.15.225V4.65c0-.05-.035-.075-.075-.075h-.35c-.04 0-.075.025-.075.075v12.2c.1-.125.2-.25.35-.35zm8.975-4.15c-.4 0-.775.075-1.125.2-1.075-2.025-3.15-3.425-5.575-3.425-.6 0-1.175.1-1.725.275v10.25h8.425c1.825 0 3.3-1.475 3.3-3.3 0-1.825-1.475-3.35-3.3-3.35z"/>
                        </svg>
                        <span className="text-black group-hover/sc:text-white truncate">SoundCloud ↗</span>
                      </a>
                    )}
                    {channel.bandcampUrl && (
                      <a
                        href={channel.bandcampUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 min-h-[42px] sm:min-h-[36px] bg-white text-black hover:bg-[#1DA0C3] hover:text-black border-2 border-black text-xs sm:text-[10px] font-bold py-2 px-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 truncate brutal-shadow-black group/bc cursor-pointer"
                        title="Bandcamp Album"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-black group-hover/bc:text-black shrink-0" viewBox="0 0 24 24">
                          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
                        </svg>
                        <span className="text-black group-hover/bc:text-black truncate">Bandcamp Album Official ↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
