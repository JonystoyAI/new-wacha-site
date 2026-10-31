import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-40 bg-[#D4FF00] hover:bg-[#D9008F] text-black hover:text-white font-jetbrains font-bold text-xs px-3.5 py-3 border-2 border-black brutal-shadow-black flex items-center gap-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer group"
    >
      <ArrowUp className="w-4 h-4 stroke-[3] text-black group-hover:text-white transition-colors" />
      <span className="hidden sm:inline tracking-wider text-black group-hover:text-white transition-colors">TOP</span>
    </button>
  );
};
