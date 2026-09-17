import React, { useState } from 'react';
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
import { CartItem, MerchItem } from './types';

export default function App() {
  // Global States
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [isCetesModalOpen, setIsCetesModalOpen] = useState(false);
  const [isDroModalOpen, setIsDroModalOpen] = useState(false);

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
    <div className={`min-h-screen flex flex-col bg-[#121411] text-[#E3E3DE] relative selection:bg-[#D4FF00] selection:text-black font-['Space_Grotesk',sans-serif]`}>
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
      />

      {/* Main Content Modules */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero onPlayVideo={(url, title) => setActiveVideo({ url, title })} />

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
        <SoundLab />

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

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
