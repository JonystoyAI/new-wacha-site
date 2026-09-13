import React from 'react';
import { Youtube, Disc, Radio, Terminal, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-4 border-[#D4FF00] text-zinc-400 font-jetbrains text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4FF00] text-black font-anton text-xl flex items-center justify-center border-2 border-black brutal-shadow-black">
                WM
              </div>
              <div>
                <span className="font-anton text-2xl text-white tracking-wider block leading-none">
                  WACHA MULTIMEDIA
                </span>
                <span className="text-[10px] text-[#D4FF00]">
                  FOUNDED BY MR. DECRÉPITO // ¡PAPÚUU!
                </span>
              </div>
            </div>

            <p className="font-space-grotesk text-xs text-zinc-400 leading-relaxed max-w-sm">
              Productora de medios digitales de alto impacto, ingeniería de contenido para retención algorítmica, guionizado AEO/SEO generativo y sound design de vanguardia.
            </p>

            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="bg-zinc-900 text-[#D4FF00] px-2 py-1 border border-zinc-800">
                REC ⏺ 48KHZ 32-BIT
              </span>
              <span className="bg-zinc-900 text-emerald-400 px-2 py-1 border border-zinc-800">
                STATUS: 100% ONLINE
              </span>
              <span className="bg-zinc-900 text-zinc-300 px-2 py-1 border border-zinc-800">
                WCAG 2.1 AA COMPLIANT
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-anton text-lg text-white tracking-wider border-b border-zinc-800 pb-1">
              // NAVEGACIÓN RÁPIDA
            </h4>
            <ul className="space-y-1.5 text-zinc-300">
              <li><a href="#mastermind" className="hover:text-[#D4FF00] transition-colors">[00] Mastermind (Mr. Decrépito)</a></li>
              <li><a href="#canales" className="hover:text-[#D4FF00] transition-colors">[01] Red 8 Canales YouTube</a></li>
              <li><a href="#portafolio" className="hover:text-[#D4FF00] transition-colors">[02] Portafolio Collage</a></li>
              <li><a href="#soundlab" className="hover:text-[#D4FF00] transition-colors">[03] Sound Lab (Sonido Decrépito)</a></li>
              <li><a href="#tienda" className="hover:text-[#D4FF00] transition-colors">[04] Wacha Drop Store</a></li>
              <li><a href="#servicios-aeo" className="hover:text-[#D4FF00] transition-colors">[05] Servicios AEO & SEO</a></li>
              <li><a href="#cotizador" className="hover:text-[#D4FF00] transition-colors">[06] Terminal Cotizador</a></li>
            </ul>
          </div>

          {/* Social Links & WhatsApp Direct */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-anton text-lg text-white tracking-wider border-b border-zinc-800 pb-1">
              // REDES & ENLACES OFICIALES
            </h4>
            <div className="space-y-2">
              <a
                href="https://wa.me/524424655478?text=Hola%20mi%20nombre%20es%20,%20visite%20tu%20sitio%20y%20me%20interesa%20cotizar%20un%20servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#FF4400] text-white font-bold p-2.5 text-center border border-black hover:bg-orange-600 transition-all"
              >
                🔥 WHATSAPP OFICIAL ↗
              </a>

              <a
                href="https://on.soundcloud.com/au3EsNfGYvmQQ9X8VH"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-zinc-900 text-zinc-200 p-2 text-center border border-zinc-800 hover:text-[#D4FF00] transition-all"
              >
                ☁️ PLAYLIST EN SOUNDCLOUD (SONIDO DECRÉPITO) ↗
              </a>

              <a
                href="https://sonidodecrepito.bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-zinc-900 text-zinc-200 p-2 text-center border border-zinc-800 hover:text-[#D4FF00] transition-all"
              >
                🎛️ BANDCAMP (DISCOGRAFÍA VOL. 1) ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>
            © {new Date().getFullYear()} WACHA MULTIMEDIA & MR. DECRÉPITO. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="flex items-center gap-1 text-zinc-400">
            <span>DISEÑADO CON NEO-BRUTALISMO TÉCNICO & IA EN GOOGLE AI STUDIO</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
