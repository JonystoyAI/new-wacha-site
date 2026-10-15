import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mastermind } from './components/Mastermind';
import { ChannelsGrid } from './components/ChannelsGrid';
import { PortfolioCollage } from './components/PortfolioCollage';
import { SoundLab } from './components/SoundLab';
import { MerchStore } from './components/MerchStore';
import { AeoTerminal } from './components/AeoTerminal';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { VideoModal } from './components/VideoModal';
import { CetesModal } from './components/CetesModal';
import { DroAgentModal } from './components/DroAgentModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { WhatsAppCotizadorModal } from './components/WhatsAppCotizadorModal';
import { CartItem, MerchItem } from './types';

export default function App() {
  // Global States
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('wacha_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sync theme changes with DOM, meta theme-color and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wacha_theme', theme);
    } catch {
      // Ignore localStorage exceptions
    }

    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#F4F4EE');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#121411');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Global Audio Mute Handler
  useEffect(() => {
    // Mute/Unmute any standard HTML media elements
    const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach((el) => {
      (el as HTMLMediaElement).muted = !audioActive;
    });

    // Control iframe volumes (SoundCloud / YouTube)
    const sendIframeVolume = () => {
      const iframes = document.querySelectorAll('iframe');
      const vol = audioActive ? 100 : 0;
      iframes.forEach((iframe) => {
        if (iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(
              JSON.stringify({ method: 'setVolume', value: vol }),
              '*'
            );
          } catch (e) {
            // Ignore cross-origin exceptions
          }
        }
      });
    };

    sendIframeVolume();
  }, [audioActive]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [isCetesModalOpen, setIsCetesModalOpen] = useState(false);
  const [isDroModalOpen, setIsDroModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Cart Handler Functions
  const handleAddToCart = (item: MerchItem, selectedSize: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        c => c.item.id === item.id && c.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { item, selectedSize, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string, selectedSize: string) => {
    setCart(prev => prev.filter(c => !(c.item.id === itemId && c.selectedSize === selectedSize)));
  };

  const handleUpdateQuantity = (itemId: string, selectedSize: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(itemId, selectedSize);
      return;
    }

    setCart(prev =>
      prev.map(c => {
        if (c.item.id === itemId && c.selectedSize === selectedSize) {
          return { ...c, quantity: qty };
        }
        return c;
      })
    );
  };

  const totalCartItemsCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'light' ? 'bg-[#F4F4EE] text-[#121411]' : 'bg-[#121411] text-[#E3E3DE]'
      } relative selection:bg-[#D4FF00] selection:text-black font-['Space_Grotesk',sans-serif] transition-colors duration-200`}
    >
      {/* Optional CRT Retro Scanline Overlay */}
      {crtEnabled && (
        <div className="fixed inset-0 crt-overlay z-50 pointer-events-none opacity-80" aria-hidden="true" />
      )}

      {/* Main Sticky Navbar */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        audioActive={audioActive}
        onToggleAudio={() => setAudioActive(!audioActive)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Modules */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero
          onPlayVideo={(url, title) => setActiveVideo({ url, title })}
          onOpenWhatsAppCotizador={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 00 // Mastermind // Mr. Decrépito */}
        <Mastermind />

        {/* 01 // Red Oficial 8 Canales YouTube */}
        <ChannelsGrid onPlayVideo={(url, title) => setActiveVideo({ url, title })} />

        {/* 02 // Portafolio Multidisciplinario Collage */}
        <PortfolioCollage
          onPlayVideo={(url, title) => setActiveVideo({ url, title })}
          onOpenCetesModal={() => setIsCetesModalOpen(true)}
          onOpenDroModal={() => setIsDroModalOpen(true)}
        />

        {/* 03 // Sonido Decrépito // Sound Lab Console */}
        <SoundLab audioActive={audioActive} />

        {/* 04 // Wacha Drop Store // Merch Boutique */}
        <MerchStore
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          isCartOpen={isCartOpen}
          onCloseCart={() => setIsCartOpen(false)}
        />

        {/* 05 // Servicios AEO/SEO & Terminal Cotizador Interactivo */}
        <AeoTerminal />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Overlay Modal */}
      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* CETES Premier Calculator Modal */}
      <CetesModal
        isOpen={isCetesModalOpen}
        onClose={() => setIsCetesModalOpen(false)}
      />

      {/* JF Construcciones DRO AI Bot Modal */}
      <DroAgentModal
        isOpen={isDroModalOpen}
        onClose={() => setIsDroModalOpen(false)}
      />

      {/* WhatsApp Express Cotizador Modal */}
      <WhatsAppCotizadorModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppWidget />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
