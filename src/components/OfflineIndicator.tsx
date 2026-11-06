import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, HardDrive } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Aviso de modo sin conexión"
      className="fixed bottom-20 right-4 z-50 flex items-center gap-2.5 bg-black text-[#D4FF00] border-2 border-[#D4FF00] px-3.5 py-2 font-jetbrains text-xs font-bold brutal-shadow-black animate-pulse select-none"
    >
      <WifiOff className="w-4 h-4 text-[#FF4400]" />
      <div>
        <span className="block text-white text-[11px] font-mono">MODO OFFLINE ACTIVADO</span>
        <span className="text-[10px] text-zinc-400 font-normal">Cargando desde el Service Worker en caché local.</span>
      </div>
      <HardDrive className="w-4 h-4 text-[#00E5FF] shrink-0" />
    </aside>
  );
};
