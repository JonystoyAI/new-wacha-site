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
      className="fixed bottom-6 right-6 z-40 bg-[#D4FF00] hover:bg-[#FF4400] text-black hover:text-white font-jetbrains font-bold text-xs px-3.5 py-3 border-2 border-black brutal-shadow-black flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:shadow-none"
    >
      <ArrowUp className="w-4 h-4 stroke-[3]" />
      <span className="hidden sm:inline tracking-wider">TOP ⬆</span>
    </button>
  );
};
