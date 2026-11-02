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
  Monitor,
  Sun,
  Moon,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  crtEnabled,
  onToggleCrt,
  audioActive,
  onToggleAudio,
  theme,
  onToggleTheme,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#mastermind', label: '[00] Mastermind' },
    { href: '#canales', label: '[01] Red Canales' },
    { href: '#portafolio', label: '[02] Portafolio' },
    { href: '#soundlab', label: '[03] Sound Lab' },
    { href: '#tienda', label: '[04] Drop Store' },
    { href: '#servicios-aeo', label: '[05] AEO / SEO' },
    { href: '#blog', label: '[06] Blog AEO' },
    { href: '#cotizador', label: '[07] Cotizador' },
    { href: '#faq', label: '[08] FAQ' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121411]/95 backdrop-blur-md border-b-2 border-black dark:border-zinc-800">
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
          <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border-2 border-black brutal-shadow-lime group-hover:scale-105 group-hover:border-[#D4FF00] transition-all bg-black flex items-center justify-center">
            <img
              src="/wacha_logo.jpg"
              alt="Logotipo Oficial de Wacha Multimedia Producciones"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="font-anton tracking-wider text-lg sm:text-xl text-black dark:text-white group-hover:text-[#D9008F] dark:group-hover:text-[#D4FF00] transition-colors leading-none flex items-center gap-2">
              WACHA MULTIMEDIA
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-jetbrains bg-[#FF4400]/20 text-[#FF4400] border border-[#FF4400]/40 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-ping mr-1"></span>
                REC ⏺
              </span>
            </div>
            <p className="font-jetbrains text-[10px] text-zinc-700 dark:text-zinc-400 tracking-tight font-semibold">
              PRODUCCIONES & SOUND LAB // ¡PAPÚUU!
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 font-jetbrains text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-black dark:text-zinc-300 hover:text-white dark:hover:text-black hover:bg-[#D9008F] dark:hover:bg-[#D4FF00] transition-all border border-transparent hover:border-black font-bold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className="px-2.5 py-1.5 font-jetbrains text-xs flex items-center gap-1.5 border-2 border-black bg-white text-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer font-bold"
            title={theme === 'dark' ? 'Cambiar a Modo Claro (Luz de día)' : 'Cambiar a Modo Oscuro'}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-black" />
                <span className="font-bold text-[11px] text-black hidden sm:inline">LUZ</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-black" />
                <span className="font-bold text-[11px] text-black hidden sm:inline">NOCHE</span>
              </>
            )}
          </button>

          {/* Audio Synthesizer Master Toggle */}
          <button
            onClick={onToggleAudio}
            className={`px-2.5 py-1.5 font-jetbrains text-xs flex items-center gap-1.5 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer font-bold ${
              audioActive
                ? 'bg-[#D4FF00] text-black'
                : 'bg-white text-black'
            }`}
            title={audioActive ? 'Silenciar todos los reproductores y audio' : 'Activar Audio Master'}
            aria-label="Toggle Sound Engine"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-black animate-bounce" /> : <VolumeX className="w-4 h-4 text-black" />}
            <span className="font-bold text-[11px] text-black sm:inline">
              AUDIO {audioActive ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* CRT Overlay Toggle */}
          <button
            onClick={onToggleCrt}
            className={`px-2.5 py-1.5 font-jetbrains text-xs flex items-center gap-1.5 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer font-bold ${
              crtEnabled
                ? 'bg-black text-[#D4FF00]'
                : 'bg-white text-black'
            }`}
            title="Alternar filtro CRT Telemetría"
            aria-label="Toggle CRT Effect"
          >
            <Monitor className={`w-4 h-4 ${crtEnabled ? 'text-[#D4FF00]' : 'text-black'}`} />
            <span className={`font-bold text-[11px] ${crtEnabled ? 'text-[#D4FF00]' : 'text-black'}`}>
              CRT {crtEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-white text-black p-2 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-2 font-jetbrains text-xs cursor-pointer font-bold brutal-shadow-black"
            aria-label={`Ver carrito de compras con ${cartCount} ítems`}
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="font-bold text-black hidden sm:inline">CARRITO</span>
            {cartCount > 0 && (
              <span className="bg-[#FF4400] text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center border border-black rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Panel Access */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="bg-white text-black p-2 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-1.5 font-jetbrains text-xs cursor-pointer font-bold brutal-shadow-black hover:bg-[#D4FF00]"
              title="Panel Administrativo & Telemetría Google Analytics (IAM)"
              aria-label="Abrir panel administrativo"
            >
              <Lock className="w-4 h-4 text-black" />
              <span className="font-bold text-black hidden xl:inline">ADMIN</span>
            </button>
          )}

          {/* Cotizar Direct CTA: Fondo anaranjado texto e icono blanco */}
          <a
            href="#cotizador"
            className="hidden sm:flex bg-[#FF4400] text-white hover:bg-orange-600 font-jetbrains font-bold text-xs px-3.5 py-2 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 items-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-bold">[ COTIZAR ]</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-white text-black border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer font-bold"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <img
                src="/wacha_logo.jpg"
                alt="Wacha Multimedia"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full border border-black dark:border-[#D4FF00] object-cover"
              />
              <span className="text-black dark:text-white font-bold tracking-wider">// WACHA MULTIMEDIA</span>
            </div>
            <span className="text-[#D9008F] dark:text-[#D4FF00] font-bold">MASTER V3.9</span>
          </div>

          {/* Mobile Quick Action Toggles Bar */}
          <div className="grid grid-cols-2 gap-2 pb-1">
            <button
              onClick={onToggleTheme}
              className={`py-2 px-3 font-jetbrains text-xs font-bold border-2 flex items-center justify-center gap-2 brutal-shadow-black transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-zinc-900 text-amber-300 border-zinc-700 hover:bg-[#D4FF00] hover:text-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-[#D9008F]'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-black" />}
              <span className="text-black dark:text-inherit">{theme === 'dark' ? 'MODO CLARO' : 'MODO OSCURO'}</span>
            </button>

            <button
              onClick={onToggleAudio}
              className={`py-2 px-3 font-jetbrains text-xs font-bold border-2 flex items-center justify-center gap-2 brutal-shadow-black transition-all cursor-pointer ${
                audioActive ? 'bg-[#D4FF00] text-black border-black' : 'bg-white dark:bg-zinc-900 text-black dark:text-zinc-400 border-black dark:border-zinc-700'
              }`}
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-black" /> : <VolumeX className="w-4 h-4 text-black dark:text-zinc-500" />}
              <span className="text-black dark:text-inherit">AUDIO {audioActive ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <nav className="grid grid-cols-1 gap-1 font-jetbrains text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-zinc-200 hover:bg-[#D9008F] hover:text-white dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all border border-zinc-300 dark:border-zinc-800 flex justify-between items-center font-bold"
              >
                <span>{link.label}</span>
                <span className="text-zinc-600 dark:text-zinc-500">↗</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center bg-black text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black font-jetbrains font-bold text-xs py-2.5 border-2 border-black dark:border-zinc-700 brutal-shadow-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>[ ACCESO PANEL ADMIN // GA4 ]</span>
              </button>
            )}
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
