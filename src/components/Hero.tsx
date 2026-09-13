import React from 'react';
import { Play, Terminal, Zap, Radio, Sparkles, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';

interface HeroProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayVideo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b-2 border-zinc-800 bg-[#121411]">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f241d_1px,transparent_1px),linear-gradient(to_bottom,#1f241d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-zinc-900/90 border-2 border-zinc-700 font-jetbrains text-xs mb-8 brutal-shadow-black">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse"></span>
            <span className="text-[#D4FF00] font-bold">STREAM CHANNEL // MASTER V3.9</span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-300 hidden sm:inline">REC [00:42:19:04]</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span className="px-2 py-0.5 bg-black border border-zinc-700 text-[10px] text-[#D4FF00]">
              BITRATE: 48000Hz 32-bit
            </span>
            <span className="text-emerald-400 font-bold hidden md:inline">
              [ ESTADO: TRANSMITIENDO EN VIVO ]
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cyber Tags Badges */}
            <div className="flex flex-wrap gap-2 font-jetbrains text-xs">
              <span className="bg-[#D4FF00] text-black px-2.5 py-1 font-bold border border-black flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> IA GENERATIVE SUITE
              </span>
              <span className="bg-[#FF4400] text-white px-2.5 py-1 font-bold border border-black flex items-center gap-1">
                📼 SONIDO DECRÉPITO
              </span>
              <span className="bg-zinc-800 text-[#D4FF00] px-2.5 py-1 border border-zinc-700">
                🎯 AEO / SEO OPTIMIZED
              </span>
              <span className="bg-zinc-900 text-zinc-300 px-2.5 py-1 border border-zinc-700 font-bold">
                🔥 ¡PAPÚUU!
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-anton text-4xl sm:text-6xl xl:text-7xl uppercase text-white tracking-wide leading-none">
              DOMINAMOS EL RUIDO DIGITAL CON <span className="text-[#D4FF00] underline decoration-[#FF4400] decoration-4 underline-offset-8">IA Y CULTURA URBANA</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-base sm:text-lg font-space-grotesk leading-relaxed max-w-2xl">
              Estrategia de contenido de alto impacto, producción integral de video, guiones rankeables para motores AEO/SEO, clonación y síntesis de voz hiper-realista, y masterización sonora de pegada monumental. Hecho para creadores y marcas que no piden permiso.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 font-jetbrains">
              <a
                href="#cotizador"
                className="bg-[#D4FF00] text-black font-bold px-6 py-3.5 border-2 border-black brutal-shadow-black hover:bg-[#FF4400] hover:text-white transition-all text-sm flex items-center gap-2 group"
              >
                <Terminal className="w-4 h-4" />
                <span>[ COTIZAR EN TERMINAL ]</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#canales"
                className="bg-zinc-900 text-white font-bold px-6 py-3.5 border-2 border-zinc-700 hover:border-[#D4FF00] hover:text-[#D4FF00] transition-all text-sm flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-[#D4FF00]" />
                <span>EXPLORAR RED 8 CANALES</span>
              </a>
            </div>

            {/* Value Props Bullet Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800 font-jetbrains text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
                <span>+20 Años Trayectoria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
                <span>2.4M Impresiones/Día</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF4400] shrink-0" />
                <span>AEO Index #1 Gemini/GPT</span>
              </div>
            </div>
          </div>

          {/* Right Screen: Featured Video Deck & Telemetry Console */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border-2 border-zinc-700 p-3 brutal-shadow-lime space-y-3">
              {/* Console Header */}
              <div className="flex items-center justify-between text-xs font-jetbrains text-zinc-400 border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#FF4400] inline-block border border-black"></span>
                  <span className="font-bold text-white">REEL OFICIAL // WACHA DECK</span>
                </div>
                <span className="text-[#D4FF00]">HD 1080P 60FPS</span>
              </div>

              {/* Video Player Container */}
              <div className="relative aspect-video bg-black border-2 border-zinc-800 group overflow-hidden">
                <iframe
                  className="w-full h-full pointer-events-auto"
                  src="https://www.youtube.com/embed/videoseries?list=PLdq_tPAGsB2c&autoplay=0&mute=1"
                  title="Wacha Multimedia Official Playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Direct Fullscreen Video Modal Trigger */}
                <button
                  onClick={() => onPlayVideo('https://www.youtube.com/embed/videoseries?list=PLdq_tPAGsB2c', 'Wacha Multimedia Official Playlist')}
                  className="absolute bottom-3 right-3 bg-[#FF4400] hover:bg-[#D4FF00] hover:text-black text-white px-3 py-1.5 font-jetbrains text-xs font-bold border border-black brutal-shadow-black flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>AMPLIAR PLAYLIST ↗</span>
                </button>
              </div>

              {/* Hardware Knob & Telemetry Indicators */}
              <div className="bg-black p-3 border border-zinc-800 font-jetbrains text-xs space-y-2">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>SPECTRUM RETENCIÓN:</span>
                  <span className="text-[#D4FF00] font-bold">94.8% CTR BENCHMARK</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 border border-zinc-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#D4FF00] via-[#D4FF00] to-[#FF4400] h-full w-[94.8%] animate-pulse"></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-1">
                  <span>0Hz</span>
                  <span>1kHz</span>
                  <span>8kHz</span>
                  <span>16kHz (THD 0.001%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
