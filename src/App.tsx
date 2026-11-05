import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { BlogView } from './views/BlogView';
import { ProduccionView } from './views/ProduccionView';
import { CumbiaLabView } from './views/CumbiaLabView';
import { TiendaView } from './views/TiendaView';
import { BackToTop } from './components/BackToTop';
import { VideoModal } from './components/VideoModal';
import { CetesModal } from './components/CetesModal';
import { DroAgentModal } from './components/DroAgentModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { WhatsAppCotizadorModal } from './components/WhatsAppCotizadorModal';
import { Admin } from './components/Admin';
import { CartItem, MerchItem, BlogPost } from './types';

type AppRoute = 'home' | 'blog' | 'produccion' | 'cumbia-lab' | 'tienda';

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

  // Multi-Page Routing State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'blog' || hash === 'radar-aeo') return 'blog';
      if (hash === 'produccion' || hash === 'multimedia' || hash === 'canales' || hash === 'portafolio') return 'produccion';
      if (hash === 'cumbia-lab' || hash === 'soundlab' || hash === 'cumbia') return 'cumbia-lab';
      if (hash === 'tienda' || hash === 'merch' || hash === 'drop-store') return 'tienda';
      return 'home';
    } catch {
      return 'home';
    }
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [articleReadingMode, setArticleReadingMode] = useState<boolean>(false);

  // Synchronize route with browser URL, hash and back/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setIsAdminOpen(true);
        return;
      }
      if (hash === 'blog' || hash === 'radar-aeo') {
        setCurrentRoute('blog');
      } else if (hash === 'produccion' || hash === 'multimedia' || hash === 'canales' || hash === 'portafolio') {
        setCurrentRoute('produccion');
      } else if (hash === 'cumbia-lab' || hash === 'soundlab' || hash === 'cumbia') {
        setCurrentRoute('cumbia-lab');
      } else if (hash === 'tienda' || hash === 'merch' || hash === 'drop-store') {
        setCurrentRoute('tienda');
      } else if (!hash || hash === 'home' || hash === 'mastermind') {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Update Page Title based on route for rich SEO
  useEffect(() => {
    const titles: Record<AppRoute, string> = {
      home: "WACHA MULTIMEDIA // Laboratorio de Ingeniería Digital, AEO & Medios",
      blog: "Blog de Ingeniería Digital & AEO 2026 // Wacha Multimedia",
      produccion: "Investigación, Redacción, Animación y Creación de Contenido // Wacha Multimedia",
      'cumbia-lab': "Cumbia Lab. (Proyecto de Cumbia Decrépita) // Wacha Multimedia",
      tienda: "Wacha Drop Store Online // Streetwear & Hardware de Estudio"
    };
    document.title = titles[currentRoute] || "WACHA MULTIMEDIA";
  }, [currentRoute]);

  // Navigate Handler
  const handleNavigate = (route: string, articleId?: string, readingMode = false) => {
    let target: AppRoute = 'home';
    if (route === 'blog' || route === 'produccion' || route === 'cumbia-lab' || route === 'tienda') {
      target = route;
    }
    setCurrentRoute(target);
    if (articleId) {
      setSelectedArticleId(articleId);
      setArticleReadingMode(readingMode);
    }
    try {
      window.history.pushState({}, '', target === 'home' ? '#' : `#${target}`);
    } catch {
      // Fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach((el) => {
      (el as HTMLMediaElement).muted = !audioActive;
    });

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
          } catch {
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Deep Link listener for Alt+A shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    setIsCartOpen(true);
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

      {/* Main Sticky Navbar with Multi-Page Routing */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        audioActive={audioActive}
        onToggleAudio={() => setAudioActive(!audioActive)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* View Switcher based on currentRoute */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            onPlayVideo={(url, title) => setActiveVideo({ url, title })}
            onOpenWhatsAppCotizador={() => setIsWhatsAppModalOpen(true)}
            onOpenArticle={(article, readingMode) => {
              handleNavigate('blog', article.id, readingMode);
            }}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenCetesModal={() => setIsCetesModalOpen(true)}
            onOpenDroModal={() => setIsDroModalOpen(true)}
            audioActive={audioActive}
          />
        )}

        {currentRoute === 'blog' && (
          <BlogView
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            selectedArticleId={selectedArticleId}
            readingMode={articleReadingMode}
          />
        )}

        {currentRoute === 'produccion' && (
          <ProduccionView
            onPlayVideo={(url, title) => setActiveVideo({ url, title })}
            onOpenCetesModal={() => setIsCetesModalOpen(true)}
            onOpenDroModal={() => setIsDroModalOpen(true)}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === 'cumbia-lab' && (
          <CumbiaLabView
            audioActive={audioActive}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentRoute === 'tienda' && (
          <TiendaView
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            isCartOpen={isCartOpen}
            onCloseCart={() => setIsCartOpen(false)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Admin Panel & Google Analytics Telemetry Modal */}
      <Admin
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

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
