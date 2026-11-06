import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle, Share, PlusSquare } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running in standalone mode, do not show button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="px-2.5 py-1.5 font-jetbrains text-xs flex items-center gap-1.5 border-2 border-black bg-[#D4FF00] text-black font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer hover:bg-white hover:text-black"
        title="Instalar Wacha Multimedia como App en tu dispositivo"
        aria-label="Instalar Wacha Multimedia como App nativa"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">INSTALAR APP</span>
        <span className="sm:hidden">APP</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="px-2.5 py-1.5 font-jetbrains text-xs flex items-center gap-1.5 border-2 border-black bg-white text-black font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer hover:bg-[#D4FF00]"
          title="Instalar en iPhone o iPad"
          aria-label="Instalar en iPhone o iPad"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">INSTALAR iOS</span>
          <span className="sm:hidden">iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-jetbrains">
            <div className="w-full max-w-md bg-[#121411] border-4 border-black dark:border-[#D4FF00] text-white p-6 brutal-shadow-lime space-y-4">
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#D4FF00]" />
                  <h3 className="font-anton text-xl tracking-wider text-white">
                    INSTALAR EN IPHONE / IPAD
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 bg-zinc-800 text-white hover:bg-[#FF4400] transition-colors cursor-pointer"
                  aria-label="Cerrar guía"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-300 font-space-grotesk leading-relaxed">
                Safari en iOS no admite la instalación en un solo clic, pero puedes instalar **Wacha Multimedia** como App nativa en 2 pasos:
              </p>

              <div className="space-y-3 bg-black border border-zinc-800 p-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#D4FF00] text-black font-bold flex items-center justify-center shrink-0 border border-black">
                    1
                  </span>
                  <div>
                    <span className="text-white font-bold block">Toca el botón Compartir</span>
                    <span className="text-zinc-400 text-[11px]">En la barra inferior de Safari (ícono con flecha hacia arriba <Share className="w-3.5 h-3.5 inline mx-1 text-[#00E5FF]" />).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#D4FF00] text-black font-bold flex items-center justify-center shrink-0 border border-black">
                    2
                  </span>
                  <div>
                    <span className="text-white font-bold block">Añadir a la pantalla de inicio</span>
                    <span className="text-zinc-400 text-[11px]">Desliza hacia abajo y selecciona <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-[#D4FF00]" /> <strong>"Añadir a pantalla de inicio"</strong>.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <CheckCircle className="w-4 h-4 text-[#00E599] shrink-0" />
                <span>La app se abrirá a pantalla completa y guardará la música y artículos en caché.</span>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 bg-[#D4FF00] text-black font-bold text-xs border-2 border-black brutal-shadow-black hover:bg-white transition-all cursor-pointer"
              >
                ENTENDIDO, CERRAR
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers before beforeinstallprompt fires: provide a subtle manual install trigger
  return (
    <button
      onClick={install}
      className="hidden md:flex px-2.5 py-1.5 font-jetbrains text-xs items-center gap-1.5 border-2 border-black bg-[#D4FF00] text-black font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 brutal-shadow-black cursor-pointer hover:bg-white hover:text-black"
      title="Instalar aplicación en tu equipo o móvil"
      aria-label="Instalar app"
    >
      <Download className="w-3.5 h-3.5" />
      <span>INSTALAR APP</span>
    </button>
  );
};
