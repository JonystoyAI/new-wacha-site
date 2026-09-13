import React from 'react';
import { Award, Brain, Disc, ShieldCheck, Sparkles, MessageSquare, Terminal } from 'lucide-react';

export const Mastermind: React.FC = () => {
  return (
    <section id="mastermind" className="py-16 bg-[#121411] border-b-2 border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-zinc-800 pb-4 mb-10 gap-4">
          <div>
            <div className="font-jetbrains text-xs text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4FF00]"></span>
              // SECCIÓN 00: FUNDADOR & DIRECTOR CREATIVO
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide">
              MASTERMIND // MR. DECRÉPITO
            </h2>
          </div>
          <p className="font-jetbrains text-xs text-zinc-400 max-w-md">
            Rigor analítico, investigación empírica y sound design disruptivo sin fórmulas corporativas endulzadas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Photo Frame with Neo-Brutalist Stacking */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-4 border-black bg-zinc-900 brutal-shadow-lime overflow-hidden group">
              <img
                src="/MR DECREPITO.jpg"
                alt="Mr. Decrépito - Fundador & Director Creativo de Wacha Multimedia"
                className="w-full h-auto max-h-[520px] object-cover object-top contrast-105 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/mr_decrepito_portrait.jpg";
                }}
              />

              {/* Hardware Overlay Tag */}
              <div className="absolute bottom-0 inset-x-0 bg-black/90 p-3 border-t-2 border-zinc-800 font-jetbrains text-xs">
                <div className="flex justify-between items-center text-zinc-300">
                  <span className="font-bold text-[#D4FF00]">MR. DECRÉPITO</span>
                  <span className="text-[10px] bg-zinc-800 px-2 py-0.5 border border-zinc-700">FOUNDER & ART DIRECTOR</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">
                  SYS ID: WM-001 // SOUND DESIGNER & DATA ANALYST
                </p>
              </div>
            </div>

            {/* Sticker Tag */}
            <div className="absolute -top-4 -right-4 bg-[#FF4400] text-white font-jetbrains text-xs font-bold px-3 py-1.5 border-2 border-black brutal-shadow-black transform rotate-3">
              ★ 20+ AÑOS TRAYECTORIA
            </div>
          </div>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 font-space-grotesk text-zinc-300 text-base leading-relaxed">
              <p className="text-xl text-white font-bold border-l-4 border-[#D4FF00] pl-4">
                "+20 años de experiencia creando marcas de alto impacto con rigor quirúrgico. Analista de datos, autodidacta en IA, producción digital, edición cinematográfica de video, música y pionero del concepto vanguardista de 'Sonido Decrépito'."
              </p>

              <p className="bg-zinc-900/80 p-4 border border-zinc-800 font-jetbrains text-xs text-zinc-300 italic">
                "Investigador en busca constante de contenido basado en evidencias. Ateo cristiano y creyente tanto en el progreso incesante como en la decadencia intelectual contemporánea."
              </p>

              <p>
                A través de la red de 8 canales temáticos de Wacha Multimedia, combinamos narrativas visuales de alta retención, investigación rigurosa sin sensationalismo y sistemas de síntesis de voz impulsados por algoritmos LLM y generadores de audio analógico.
              </p>
            </div>

            {/* Competency Badge Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-jetbrains text-xs">
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#D4FF00]" />
                <span>IA & Data Analysis</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#FF4400]" />
                <span>Sonido Decrépito Lab</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Rigor Científico</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4FF00]" />
                <span>Arquitectura de Marca</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF4400]" />
                <span>Retención Algorítmica</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D4FF00]" />
                <span>SEO/AEO Generativo</span>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-4">
              <a
                href="https://wa.me/524424655478?text=Hola%20Mr.%20Decr%C3%A9pito,%20quiero%20agendar%20una%20consultor%C3%ADa%20estrat%C3%A9gica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#D4FF00] text-black font-jetbrains font-bold text-sm px-6 py-3.5 border-2 border-black brutal-shadow-black hover:bg-[#FF4400] hover:text-white transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>AGENDAR CONSULTORÍA DIRECTA CON MR. DECRÉPITO (WHATSAPP)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
