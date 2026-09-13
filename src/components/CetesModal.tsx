import React, { useState } from 'react';
import { X, Calculator, ArrowUpRight, ShieldCheck, DollarSign } from 'lucide-react';

interface CetesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CetesModal: React.FC<CetesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [capital, setCapital] = useState<number>(50000);
  const [termDays, setTermDays] = useState<number>(91);
  const [annualRate, setAnnualRate] = useState<number>(11.00); // 11% Banxico rate

  // Calculations
  const grossInterest = (capital * (annualRate / 100) * termDays) / 365;
  const isrTax = (capital * 0.005 * termDays) / 365; // 0.50% ISR withholding
  const netInterest = grossInterest - isrTax;
  const totalBalance = capital + netInterest;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border-4 border-[#D4AF37] w-full max-w-2xl p-6 brutal-shadow-black text-amber-50 space-y-6">
        {/* Header Art Déco */}
        <div className="flex items-center justify-between border-b-2 border-[#D4AF37]/40 pb-4 font-jetbrains">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] text-black font-anton flex items-center justify-center border border-black font-bold">
              CP
            </div>
            <div>
              <h3 className="font-anton text-2xl text-[#D4AF37] tracking-wider">
                CETES PREMIER // CALCULADORA DE RENDIMIENTOS
              </h3>
              <p className="text-[10px] text-amber-200/70">
                LUXURY FINTECH APP // CONECTADA CON CANAL @DINEROSINCENSURA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-900 text-amber-300 hover:text-white border border-[#D4AF37]/50"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-jetbrains text-xs">
          <div>
            <label className="block text-amber-200 text-[11px] mb-1">CAPITAL A INVERTIR ($ MXN):</label>
            <input
              type="number"
              min="100"
              step="1000"
              value={capital}
              onChange={(e) => setCapital(Math.max(100, parseFloat(e.target.value) || 0))}
              className="w-full bg-black text-[#D4AF37] font-bold p-3 border border-[#D4AF37]/60 outline-none text-base"
            />
          </div>

          <div>
            <label className="block text-amber-200 text-[11px] mb-1">PLAZO DE INVERSIÓN:</label>
            <div className="grid grid-cols-4 gap-1">
              {[28, 91, 182, 364].map((days) => (
                <button
                  key={days}
                  onClick={() => setTermDays(days)}
                  className={`py-2.5 border text-xs font-bold ${
                    termDays === days
                      ? 'bg-[#D4AF37] text-black border-black'
                      : 'bg-black text-amber-200/60 border-[#D4AF37]/30 hover:text-white'
                  }`}
                >
                  {days}D
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="bg-black/80 border-2 border-[#D4AF37]/40 p-4 space-y-3 font-jetbrains">
          <div className="flex justify-between text-xs text-amber-200/80 border-b border-[#D4AF37]/20 pb-2">
            <span>TASA INDICATIVA BANXICO:</span>
            <span className="text-[#D4AF37] font-bold">{annualRate.toFixed(2)}% ANUAL</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-zinc-400 block text-[10px]">INTERÉS BRUTO ESTIMADO:</span>
              <span className="text-emerald-400 font-bold text-sm">+${grossInterest.toFixed(2)} MXN</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">RETENCIÓN ISR (0.50%):</span>
              <span className="text-red-400 font-bold text-sm">-${isrTax.toFixed(2)} MXN</span>
            </div>
          </div>

          <div className="border-t-2 border-[#D4AF37]/40 pt-3 flex justify-between items-center">
            <div>
              <span className="text-amber-200 text-xs font-bold block">TOTAL AL FINALIZAR ({termDays} DÍAS):</span>
              <span className="text-xs text-emerald-400 font-bold">GANANCIA NETA: +${netInterest.toFixed(2)} MXN</span>
            </div>
            <div className="text-right">
              <span className="font-anton text-2xl text-[#D4AF37]">${totalBalance.toLocaleString('es-MX', { maximumFractionDigits: 2 })} MXN</span>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 font-jetbrains text-xs">
          <a
            href="http://www.cetespremier.site"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#D4AF37] text-black font-bold px-4 py-2.5 border border-black hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>ABRIR APP OFICIAL CETES PREMIER FULL (CETESPREMIER.SITE)</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-zinc-900 text-zinc-400 hover:text-white px-4 py-2.5 border border-zinc-700"
          >
            CERRAR DEMO
          </button>
        </div>
      </div>
    </div>
  );
};
