import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, ArrowRight, Bell, ShieldCheck, CheckCircle2, Globe, Flame } from 'lucide-react';

interface ComingSoonLandingProps {
  onEnterSite: () => void;
}

export const ComingSoonLanding: React.FC<ComingSoonLandingProps> = ({ onEnterSite }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({ days: 14, hours: 8, minutes: 42, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#121411] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between relative z-10 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black border-2 border-[#D4FF00] flex items-center justify-center font-anton text-[#D4FF00] text-xl brutal-shadow-lime">
            W
          </div>
          <div>
            <span className="font-anton text-lg tracking-wider text-white">WACHA MULTIMEDIA</span>
            <span className="text-[10px] font-jetbrains text-[#D4FF00] block">// INGENIERÍA DIGITAL & AEO 2026</span>
          </div>
        </div>

        <button
          onClick={onEnterSite}
          className="px-4 py-2 bg-[#D4FF00] text-black font-jetbrains text-xs font-bold border-2 border-black brutal-shadow-black hover:bg-[#B8006E] hover:text-white transition-all cursor-pointer flex items-center gap-2"
        >
          <span>ENTRAR AL SITIO WEB</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Main Hero Coming Soon Content */}
      <main className="max-w-4xl mx-auto w-full text-center space-y-8 relative z-10 py-12 sm:py-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black border-2 border-[#D4FF00] text-[#D4FF00] font-jetbrains text-xs font-bold uppercase brutal-shadow-black animate-pulse">
          <span className="w-2.5 h-2.5 bg-[#D4FF00] inline-block"></span>
          <span>ESTADO DEL SISTEMA: DESPLIEGTE OFICIAL EN CURSO</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-anton text-4xl sm:text-7xl uppercase tracking-tight text-white leading-none">
            Whacha.site <span className="text-[#D4FF00]">ya casi estamos listos</span>
          </h1>
          <p className="font-space-grotesk text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Estamos afinando los últimos detalles de nuestra plataforma de ingeniería de contenidos AEO 2026, el catálogo de <span className="text-[#D4FF00] font-bold">Wacha el Tianguis</span> y las producciones de <span className="text-[#00E5FF] font-bold">Cumbia Decrépita</span>.
          </p>
        </div>

        {/* Live Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto font-jetbrains">
          <div className="bg-black border-2 border-zinc-700 p-3 text-center brutal-shadow-black">
            <div className="font-anton text-3xl sm:text-4xl text-[#D4FF00]">{countdown.days}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Días</div>
          </div>
          <div className="bg-black border-2 border-zinc-700 p-3 text-center brutal-shadow-black">
            <div className="font-anton text-3xl sm:text-4xl text-white">{countdown.hours}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Horas</div>
          </div>
          <div className="bg-black border-2 border-zinc-700 p-3 text-center brutal-shadow-black">
            <div className="font-anton text-3xl sm:text-4xl text-white">{countdown.minutes}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Min</div>
          </div>
          <div className="bg-black border-2 border-zinc-700 p-3 text-center brutal-shadow-black">
            <div className="font-anton text-3xl sm:text-4xl text-[#00E5FF]">{countdown.seconds}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-1">Seg</div>
          </div>
        </div>

        {/* Email Notify Box */}
        <div className="max-w-lg mx-auto bg-black border-2 border-zinc-700 p-6 brutal-shadow-black space-y-4 text-left">
          <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#D4FF00]">
            <Bell className="w-4 h-4" />
            <span>¿QUIERES SER NOTIFICADO EL DÍA DEL LANZAMIENTO?</span>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-950/50 border-2 border-emerald-500 text-emerald-300 font-jetbrains text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>¡Correo registrado con éxito! Te avisaremos en exclusiva al arrancar whacha.site.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@dominio.com"
                className="flex-1 p-3 bg-zinc-950 border-2 border-zinc-700 font-jetbrains text-xs text-white focus:outline-none focus:border-[#D4FF00] font-bold"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#D4FF00] text-black font-jetbrains text-xs font-bold border-2 border-black hover:bg-[#B8006E] hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                AVÍSAME
              </button>
            </form>
          )}
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs font-jetbrains text-zinc-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Seguridad OWASP</span>
          <span className="flex items-center gap-1"><Terminal className="w-4 h-4 text-[#D4FF00]" /> API GA4 Activa</span>
          <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-[#00E5FF]" /> Indexación AEO 2026</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs font-jetbrains text-zinc-500 border-t border-zinc-800 pt-4 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 Wacha Multimedia Studio. Todos los derechos reservados.</span>
        <button
          onClick={onEnterSite}
          className="text-[#D4FF00] hover:underline font-bold cursor-pointer"
        >
          Explorar sitio actual en modo preview →
        </button>
      </footer>
    </div>
  );
};
