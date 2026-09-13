import React, { useState } from 'react';
import { 
  Radio, 
  ShoppingBag, 
  Menu, 
  X, 
  Tv, 
  Flame, 
  Music, 
  Terminal, 
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Monitor
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  crtEnabled,
  onToggleCrt,
  audioActive,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#mastermind', label: '[00] Mastermind' },
    { href: '#canales', label: '[01] Red Canales' },
    { href: '#portafolio', label: '[02] Portafolio' },
    { href: '#soundlab', label: '[03] Sound Lab' },
    { href: '#tienda', label: '[04] Drop Store' },
    { href: '#servicios-aeo', label: '[05] AEO / SEO' },
    { href: '#cotizador', label: '[06] Cotizador' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#121411]/95 backdrop-blur-md border-b-2 border-zinc-800">
      {/* Top Marquee Bar */}
      <div className="bg-[#D4FF00] text-black font-jetbrains text-xs font-bold py-1 overflow-hidden border-b border-black select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          <span>★ WACHA MULTIMEDIA // PRODUCCIÓN DE ALTO IMPACTO ★</span>
          <span>⚡ ESTRATEGIA AEO & SEO GENERATIVO ★</span>
          <span>📼 SONIDO DECRÉPITO: EXPERIMENTAL CUMBIA ★</span>
          <span>🎯 CLONACIÓN DE VOZ IA & RETENCIÓN DE VIDEO ★</span>
          <span>🔥 MERCH BOUTIQUE OFFICAL DROP ★</span>
          <span>¡PAPÚUU! REAL CONTENT ENGINEERING ★</span>
          <span>★ WACHA MULTIMEDIA // PRODUCCIÓN DE ALTO IMPACTO ★</span>
          <span>⚡ ESTRATEGIA AEO & SEO GENERATIVO ★</span>
          <span>📼 SONIDO DECRÉPITO: EXPERIMENTAL CUMBIA ★</span>
          <span>🎯 CLONACIÓN DE VOZ IA & RETENCIÓN DE VIDEO ★</span>
          <span>🔥 MERCH BOUTIQUE OFFICAL DROP ★</span>
          <span>¡PAPÚUU! REAL CONTENT ENGINEERING ★</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
          aria-label="Wacha Multimedia Inicio"
        >
          <div className="w-10 h-10 bg-[#D4FF00] text-black font-anton text-xl flex items-center justify-center border-2 border-black brutal-shadow-black group-hover:bg-[#FF4400] group-hover:text-white transition-colors">
            WM
          </div>
          <div>
            <div className="font-anton tracking-wider text-lg sm:text-xl text-white group-hover:text-[#D4FF00] transition-colors leading-none flex items-center gap-2">
              WACHA MULTIMEDIA
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-jetbrains bg-[#FF4400]/20 text-[#FF4400] border border-[#FF4400]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-ping mr-1"></span>
                REC ⏺
              </span>
            </div>
            <p className="font-jetbrains text-[10px] text-zinc-400 tracking-tight">
              PRODUCCIÓN & SOUND LAB // ¡PAPÚUU!
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 font-jetbrains text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-zinc-300 hover:text-black hover:bg-[#D4FF00] transition-all border border-transparent hover:border-black font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Master Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2 font-jetbrains text-xs flex items-center gap-1.5 border-2 transition-all ${
              audioActive
                ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-500'
            }`}
            title={audioActive ? 'Desactivar Audio Master' : 'Activar Audio Master Synth'}
            aria-label="Toggle Sound Engine"
          >
            {audioActive ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-bold">
              {audioActive ? 'AUDIO ON' : 'AUDIO OFF'}
            </span>
          </button>

          {/* CRT Overlay Toggle */}
          <button
            onClick={onToggleCrt}
            className={`hidden md:flex p-2 font-jetbrains text-xs items-center gap-1.5 border-2 transition-all ${
              crtEnabled
                ? 'bg-emerald-500 text-black border-black brutal-shadow-black'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white'
            }`}
            title="Alternar filtro CRT Telemetría"
            aria-label="Toggle CRT Effect"
          >
            <Monitor className="w-4 h-4" />
            <span>CRT {crtEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-zinc-900 hover:bg-[#D4FF00] hover:text-black text-white p-2 border-2 border-zinc-700 hover:border-black transition-all flex items-center gap-2 font-jetbrains text-xs"
            aria-label={`Ver carrito de compras con ${cartCount} ítems`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold hidden sm:inline">CARRITO</span>
            {cartCount > 0 && (
              <span className="bg-[#FF4400] text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center border border-black rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Cotizar Direct CTA */}
          <a
            href="#cotizador"
            className="hidden sm:flex bg-[#D4FF00] text-black font-jetbrains font-bold text-xs px-3 py-2 border-2 border-black brutal-shadow-black hover:bg-[#FF4400] hover:text-white transition-all items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>[ COTIZAR ]</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-zinc-900 text-white border-2 border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121411] border-b-2 border-zinc-800 px-4 py-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-jetbrains text-zinc-400">
            <span>// NAVEGACIÓN RÁPIDA</span>
            <span className="text-[#D4FF00]">WACHA SYSTEM</span>
          </div>

          <nav className="grid grid-cols-1 gap-1 font-jetbrains text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-zinc-900 text-zinc-200 hover:bg-[#D4FF00] hover:text-black transition-all border border-zinc-800 flex justify-between items-center"
              >
                <span>{link.label}</span>
                <span className="text-zinc-500 hover:text-black">↗</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://wa.me/524424655478?text=Hola%20mi%20nombre%20es%20,%20visite%20tu%20sitio%20y%20me%20interesa%20cotizar%20un%20servicio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#FF4400] text-white font-jetbrains font-bold text-xs py-2.5 border-2 border-black brutal-shadow-black"
            >
              🔥 CONTACTAR POR WHATSAPP ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
