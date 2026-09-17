import React from 'react';
import { Youtube, Linkedin, Facebook, Disc, Radio, Terminal, ExternalLink, ShieldCheck, Heart, Music, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const SOCIAL_LINKS = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@wachanos',
      color: 'hover:bg-red-600 hover:text-white',
      badge: '@wachanos',
      icon: <Youtube className="w-4 h-4 text-red-500 group-hover:text-white" />
    },
    {
      name: 'SoundCloud',
      url: 'https://on.soundcloud.com/65NrLGKtwr50Oz7AaY',
      color: 'hover:bg-[#FF5500] hover:text-white',
      badge: 'Playlist Oficial',
      icon: (
        <svg className="w-4 h-4 fill-amber-500 group-hover:fill-white" viewBox="0 0 24 24">
          <path d="M1.175 12.225c-.04 0-.075.025-.075.075v4.95c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-4.95c0-.05-.035-.075-.075-.075h-.35zm.9 1.15c-.04 0-.075.025-.075.075v3.8c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-3.8c0-.05-.035-.075-.075-.075h-.35zm.9-2.3c-.04 0-.075.025-.075.075v6.1c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-6.1c0-.05-.035-.075-.075-.075h-.35zm.9-1.25c-.04 0-.075.025-.075.075v7.35c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V9.9c0-.05-.035-.075-.075-.075h-.35zm.9-.85c-.04 0-.075.025-.075.075v8.2c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-8.2c0-.05-.035-.075-.075-.075h-.35zm.9-.9c-.04 0-.075.025-.075.075v9.1c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-9.1c0-.05-.035-.075-.075-.075h-.35zm.9-.85c-.04 0-.075.025-.075.075v9.95c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V7.225c0-.05-.035-.075-.075-.075h-.35zm.9-.75c-.04 0-.075.025-.075.075v10.7c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-10.7c0-.05-.035-.075-.075-.075h-.35zm.9-.65c-.04 0-.075.025-.075.075v11.35c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075V5.825c0-.05-.035-.075-.075-.075h-.35zm.9-.55c-.04 0-.075.025-.075.075v11.9c0 .05.035.075.075.075h.35c.04 0 .075-.025.075-.075v-11.9c0-.05-.035-.075-.075-.075h-.35zm1.25 12.025c.425.05.8.125 1.15.225V4.65c0-.05-.035-.075-.075-.075h-.35c-.04 0-.075.025-.075.075v12.2c.1-.125.2-.25.35-.35zm8.975-4.15c-.4 0-.775.075-1.125.2-1.075-2.025-3.15-3.425-5.575-3.425-.6 0-1.175.1-1.725.275v10.25h8.425c1.825 0 3.3-1.475 3.3-3.3 0-1.825-1.475-3.35-3.3-3.35z"/>
        </svg>
      )
    },
    {
      name: 'Bandcamp',
      url: 'https://sonidodecrepito.bandcamp.com/album/el-sonido-decr-pito-vol-1',
      color: 'hover:bg-[#1DA0C3] hover:text-white',
      badge: 'Vol. 1 Official',
      icon: (
        <svg className="w-4 h-4 fill-cyan-400 group-hover:fill-white" viewBox="0 0 24 24">
          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@wachamultimed.ia',
      color: 'hover:bg-black hover:text-cyan-400 border-cyan-500/30',
      badge: '@wachamultimed.ia',
      icon: (
        <svg className="w-4 h-4 fill-zinc-200 group-hover:fill-cyan-400" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.25a6.34 6.34 0 0 0-5.18 6.18 6.34 6.34 0 1 0 11.52-3.43 8.3 8.3 0 0 0 5.48 2.07V9.6a4.84 4.84 0 0 1-1.71-2.91z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61593007179166',
      color: 'hover:bg-blue-600 hover:text-white',
      badge: 'Wacha Multimedia',
      icon: <Facebook className="w-4 h-4 text-blue-500 group-hover:text-white" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/wacha-multimedia',
      color: 'hover:bg-blue-700 hover:text-white',
      badge: 'Oficial',
      icon: <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-white" />
    }
  ];

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
              <li><a href="#faq" className="hover:text-[#D4FF00] transition-colors">[07] Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Direct WhatsApp Contact Card */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-anton text-lg text-white tracking-wider border-b border-zinc-800 pb-1">
              // CONTACTO DIRECTO
            </h4>
            <div className="space-y-2">
              <a
                href="https://wa.me/524424655478?text=Hola%20mi%20nombre%20es%20,%20visite%20tu%20sitio%20y%20me%20interesa%20cotizar%20un%20servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#FF4400] text-white font-bold p-3 text-center border-2 border-black brutal-shadow-lime hover:bg-orange-600 transition-all font-jetbrains text-sm"
              >
                🔥 COTIZAR VÍA WHATSAPP OFICIAL ↗
              </a>
              <p className="text-[11px] text-zinc-500 italic text-center">
                Respuesta inmediata en menos de 15 minutos en horario de estudio.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Social Media Bar */}
        <div className="border-t-2 border-zinc-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h4 className="font-anton text-lg text-white tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4FF00]"></span>
              REDES SOCIALES & PLATAFORMAS OFICIALES
            </h4>
            <span className="text-[11px] text-zinc-500 font-mono">
              SÍGUENOS EN NUESTROS CANALES OFICIALES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-zinc-900 border border-zinc-800 p-3 flex flex-col justify-between transition-all duration-200 brutal-shadow-black ${social.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-black border border-zinc-800 group-hover:border-transparent">
                    {social.icon}
                  </div>
                  <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-white" />
                </div>
                <div>
                  <span className="font-anton text-sm text-white block group-hover:text-white">
                    {social.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200 font-mono block truncate">
                    {social.badge}
                  </span>
                </div>
              </a>
            ))}
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
