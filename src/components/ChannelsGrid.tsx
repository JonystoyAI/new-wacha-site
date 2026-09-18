import React, { useState } from 'react';
import { CHANNELS_DATA } from '../data/channelsData';
import { YouTubeChannel } from '../types';
import { Play, ExternalLink, Youtube, Radio, Sparkles, Globe } from 'lucide-react';

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
    <section id="canales" className="py-16 bg-[#121411] border-b-2 border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-zinc-800 pb-4 mb-8 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4400]"></span>
              // SECCIÓN 01: RED OFICIAL DE CONTENIDO
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide flex items-center gap-3">
              RED 8 CANALES YOUTUBE
              <span className="text-xs font-jetbrains px-3 py-1 bg-[#D4FF00] text-black border border-black rounded-none font-bold">
                2.4M IMP/DÍA
              </span>
            </h2>
          </div>
          <p className="font-jetbrains text-xs text-zinc-400 max-w-lg">
            Canales especializados en divulgación científica, economía pragmática, historia oculta, automatización y sound design urbano.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-jetbrains text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 border-2 transition-all font-bold ${
                selectedCategory === cat
                  ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-zinc-900 border-2 border-zinc-800 hover:border-[#D4FF00] transition-all duration-300 p-4 flex flex-col justify-between group brutal-shadow-black"
            >
              <div className="space-y-4">
                {/* Header Image & Handle */}
                <div className="relative aspect-square bg-black border border-zinc-800 overflow-hidden group-hover:border-[#D4FF00] transition-colors">
                  <img
                    src={channel.image}
                    alt={channel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/90 text-[#D4FF00] font-jetbrains text-[10px] font-bold px-2 py-0.5 border border-zinc-700">
                    {channel.subscribers || 'OFICIAL'}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-[#FF4400] text-white font-jetbrains text-[10px] font-bold px-2 py-0.5 border border-black">
                    {channel.handle}
                  </div>
                </div>

                {/* Title & Category */}
                <div>
                  <span className="text-[10px] font-jetbrains bg-zinc-800 text-zinc-300 px-2 py-0.5 border border-zinc-700 inline-block mb-1">
                    {channel.category}
                  </span>
                  <h3 className="font-anton text-xl text-white group-hover:text-[#D4FF00] transition-colors leading-snug">
                    {channel.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-space-grotesk text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {channel.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 font-jetbrains text-[10px] text-zinc-500 pt-1">
                  {channel.tags.map(tag => (
                    <span key={tag} className="bg-black/50 px-1.5 py-0.5 border border-zinc-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 mt-4 space-y-2 font-jetbrains text-xs">
                <button
                  onClick={() => onPlayVideo(channel.videoUrl, channel.videoTitle)}
                  className="w-full bg-[#D4FF00] text-black font-bold py-2 border border-black hover:bg-[#FF4400] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>▶ VER VIDEO DESTACADO</span>
                </button>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 py-1.5 border border-zinc-700 transition-all flex items-center justify-center gap-1.5 text-[11px]"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>CANAL OFICIAL YOUTUBE ↗</span>
                </a>

                {/* Additional Social & Web Links */}
                {(channel.facebookUrl || channel.instagramUrl || channel.soundcloudUrl || channel.bandcampUrl || channel.webUrl) && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {channel.facebookUrl && (
                      <a
                        href={channel.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/40 text-[10px] font-bold py-1 px-2 transition-all flex items-center justify-center gap-1 truncate"
                        title="Facebook Oficial"
                      >
                        <span>Facebook ↗</span>
                      </a>
                    )}
                    {channel.webUrl && (
                      <a
                        href={channel.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D4FF00]/15 text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black border border-[#D4FF00]/40 text-[10px] font-bold py-1 px-2 transition-all flex items-center justify-center gap-1 truncate"
                        title="Sitio Web CETES Premier"
                      >
                        <Globe className="w-3 h-3" />
                        <span>Web Site ↗</span>
                      </a>
                    )}
                    {channel.instagramUrl && (
                      <a
                        href={channel.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E4405F]/15 text-[#E4405F] hover:bg-[#E4405F] hover:text-white border border-[#E4405F]/40 text-[10px] font-bold py-1 px-2 transition-all flex items-center justify-center gap-1 truncate"
                        title="Instagram Oficial"
                      >
                        <span>Instagram ↗</span>
                      </a>
                    )}
                    {channel.soundcloudUrl && (
                      <a
                        href={channel.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FF5500]/15 text-[#FF5500] hover:bg-[#FF5500] hover:text-white border border-[#FF5500]/40 text-[10px] font-bold py-1 px-2 transition-all flex items-center justify-center gap-1 truncate"
                        title="SoundCloud Oficial"
                      >
                        <span>SoundCloud ↗</span>
                      </a>
                    )}
                    {channel.bandcampUrl && (
                      <a
                        href={channel.bandcampUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 bg-[#629AA9]/15 text-[#629AA9] hover:bg-[#629AA9] hover:text-white border border-[#629AA9]/40 text-[10px] font-bold py-1 px-2 transition-all flex items-center justify-center gap-1 truncate"
                        title="Bandcamp Album"
                      >
                        <span>Bandcamp Album Official ↗</span>
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
