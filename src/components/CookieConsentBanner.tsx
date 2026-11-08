import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check, Sliders } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
    marketing: false
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem('wacha_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('wacha_cookie_consent', JSON.stringify({ status: 'all', ...preferences }));
    } catch {}
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('wacha_cookie_consent', JSON.stringify({ status: 'essential', analytics: false, functional: true, marketing: false }));
    } catch {}
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('wacha_cookie_consent', JSON.stringify({ status: 'custom', ...preferences }));
    } catch {}
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de cookies y privacidad"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-black/95 backdrop-blur-md border-t-4 border-black dark:border-[#D4FF00] font-jetbrains text-xs shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Info Text */}
        <div className="space-y-1.5 max-w-4xl">
          <div className="flex items-center gap-2 text-[#D4FF00] font-bold">
            <Cookie className="w-4 h-4 text-[#FF4400] animate-bounce shrink-0" />
            <span>POLÍTICA DE COOKIES & ALMACENAMIENTO LOCAL • WACHA MULTIMEDIA</span>
          </div>
          <p className="text-zinc-300 font-space-grotesk text-xs leading-relaxed">
            Utilizamos cookies propias y de terceros (como Google Analytics GA4 para telemetría de AEO y rendimiento web), almacenamiento local para el reproductor de SoundCloud, preferencias de audio y el carrito del Tianguis. Puedes aceptar todas, configurar tus preferencias o rechazar las no esenciales.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="px-3.5 py-2 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border-2 border-zinc-700 font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>CONFIGURAR</span>
          </button>
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="px-3.5 py-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border-2 border-zinc-700 font-bold transition-all duration-150 cursor-pointer"
          >
            RECHAZAR NO ESENCIALES
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-5 py-2 bg-[#D4FF00] text-black hover:bg-white border-2 border-black font-bold transition-all duration-150 brutal-shadow-black hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            ACEPTAR TODAS
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-jetbrains">
          <div className="w-full max-w-lg bg-[#121411] border-4 border-black dark:border-[#D4FF00] text-white p-6 brutal-shadow-lime space-y-5">
            <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4FF00]" />
                <h3 className="font-anton text-xl tracking-wider text-white">
                  CONFIGURACIÓN DE PRIVACIDAD Y COOKIES
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 bg-zinc-800 text-white hover:bg-[#FF4400] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-space-grotesk text-zinc-300">
              <div className="flex items-start justify-between gap-4 p-3 bg-black border border-zinc-800">
                <div>
                  <span className="font-bold text-white block font-jetbrains">Cookies Estrictamente Necesarias (Siempre Activas)</span>
                  <span className="text-[11px] text-zinc-400">Requeridas para el funcionamiento del carrito de compras, estado del tema (claro/oscuro) y caché del Service Worker PWA.</span>
                </div>
                <input type="checkbox" checked disabled className="accent-[#D4FF00] mt-1 cursor-not-allowed" />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 bg-black border border-zinc-800">
                <div>
                  <span className="font-bold text-white block font-jetbrains">Analítica & Telemetría AEO (Google Analytics)</span>
                  <span className="text-[11px] text-zinc-400">Mide consultas de búsqueda, tráfico y rendimiento para optimizar nuestro posicionamiento en motores generativos.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="accent-[#D4FF00] mt-1 cursor-pointer w-4 h-4"
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 bg-black border border-zinc-800">
                <div>
                  <span className="font-bold text-white block font-jetbrains">Funcionalidad & Multimedia (SoundCloud)</span>
                  <span className="text-[11px] text-zinc-400">Permite recordar tus preferencias de volumen, reproducción en segundo plano y listas de Cumbia Lab.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="accent-[#D4FF00] mt-1 cursor-pointer w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2 bg-[#D4FF00] text-black hover:bg-white font-bold text-xs border-2 border-black brutal-shadow-black cursor-pointer"
              >
                GUARDAR PREFERENCIAS
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
