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
import { SoundCloudGlobalPlayer } from './components/SoundCloudGlobalPlayer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { INITIAL_BLOG_ARTICLES } from './data/blogData';
import { captureAeoQueryFromUrl } from './services/aeoQueryLogger';
import { CartItem, MerchItem, BlogPost } from './types';

type AppRoute = 'home' | 'blog' | 'produccion' | 'cumbia-lab' | 'tienda';

/**
 * Dynamically generates and updates Open-Graph, Twitter Card, and SEO meta tags
 * based on the currently active route and any open article to maximize search engine visibility.
 */
export function updateOpenGraphMetadata(route: AppRoute, articleId?: string | null): void {
  if (typeof document === 'undefined') return;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://whacha.site';

  const routeMetaMap: Record<AppRoute, {
    title: string;
    description: string;
    url: string;
    image: string;
    type: string;
  }> = {
    home: {
      title: "WACHA MULTIMEDIA // Blog de Ingeniería, Arte y Diseño Digital & AEO 2026",
      description: "Estudio de ingeniería de contenidos, Blog de Ingeniería, Arte y Diseño Digital & AEO 2026, producción cinematográfica y Sonido Decrépito.",
      url: `${origin}/`,
      image: `${origin}/wacha_logo.jpg`,
      type: "website"
    },
    blog: {
      title: "BLOG DE INGENIERÍA, ARTE Y DISEÑO DIGITAL & AEO 2026 // Wacha Multimedia",
      description: "Guías técnicas de AEO, optimización de motores generativos (GEO), Core Web Vitals en SPAs, registro en INDAUTOR y algoritmos de retención de video.",
      url: `${origin}/#blog`,
      image: `${origin}/assets/aistudio/GEO__La_muerte_del_keyword_stuffing_2f325e9d.png`,
      type: "blog"
    },
    produccion: {
      title: "INVESTIGACIÓN, REDACCIÓN, ANIMACIÓN Y CREACIÓN DE CONTENIDO // Wacha Multimedia",
      description: "Portafolio cinematográfico, personalidades creativas con IA, animación 2D/3D y producción de contenido de alto impacto para marcas e instituciones.",
      url: `${origin}/#produccion`,
      image: `${origin}/wacha_logo.jpg`,
      type: "website"
    },
    'cumbia-lab': {
      title: "CUMBIA LAB. (Proyecto de Cumbia Decrépita) // Sonido Decrépito",
      description: "Laboratorio de cumbia experimental rebajada, tracks descargables con Social Gate, playlists oficiales de SoundCloud y sintetizadores sonideros.",
      url: `${origin}/#cumbia-lab`,
      image: `${origin}/cumbia_del_futuro.jpg`,
      type: "music.playlist"
    },
    tienda: {
      title: "WACHA EL TIANGUIS ONLINE // Streetwear & Hardware de Estudio",
      description: "Piezas de edición limitada, mercancía oficial, hoodies, gorras y hardware de estudio creado por el colectivo Wacha Multimedia.",
      url: `${origin}/#tienda`,
      image: `${origin}/wacha_logo.jpg`,
      type: "website"
    }
  };

  let meta = routeMetaMap[route] || routeMetaMap.home;

  // Enrich with specific article data when viewing a blog post
  if (route === 'blog' && articleId) {
    const article = INITIAL_BLOG_ARTICLES.find(a => a.id === articleId);
    if (article) {
      const rawImg = article.image || '/wacha_logo.jpg';
      const imgPath = rawImg.startsWith('http')
        ? rawImg
        : `${origin}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`;

      meta = {
        title: `${article.title} | Wacha Multimedia`,
        description: article.excerpt.length > 155 ? `${article.excerpt.slice(0, 152)}...` : article.excerpt,
        url: `${origin}/#blog/${article.slug || article.id}`,
        image: imgPath,
        type: "article"
      };
    }
  }

  // Update document title
  document.title = meta.title;

  // Dynamic tag helper
  const setMetaTag = (attr: string, key: string, val: string) => {
    let tag = document.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', val);
  };

  // Standard SEO Meta Tags
  setMetaTag('name', 'description', meta.description);

  // Open Graph (og:*)
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', meta.url);
  setMetaTag('property', 'og:image', meta.image);
  setMetaTag('property', 'og:type', meta.type);
  setMetaTag('property', 'og:site_name', 'Wacha Multimedia');

  // Twitter / X Cards (twitter:*)
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:url', meta.url);
  setMetaTag('name', 'twitter:image', meta.image);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', meta.url);
}

export default function App() {
  // Global States - Always start in dark mode (versión nocturna)
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [audioActive, setAudioActive] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Multi-Page Routing State - Always start on Home page
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');

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

      // Capture any AEO search queries in the URL hash
      captureAeoQueryFromUrl(window.location.hash ? window.location.hash.split('?')[0].replace('#', '') : 'home');
    };

    // Always enforce starting on home page and night mode on fresh launch
    setCurrentRoute('home');
    if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#home') {
      try {
        window.history.replaceState(null, '', '#');
      } catch {}
    }
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.setItem('wacha_theme', 'dark');
    } catch {}

    // Initial capture on load
    captureAeoQueryFromUrl('home');

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Update Page Title and Open Graph / Twitter Meta Tags dynamically based on active route and article
  useEffect(() => {
    updateOpenGraphMetadata(currentRoute, selectedArticleId);
  }, [currentRoute, selectedArticleId]);

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

      {/* Global SoundCloud Auto-Player Dock (https://on.soundcloud.com/485W8PONR0OfSHWVVj) */}
      <SoundCloudGlobalPlayer
        audioActive={audioActive}
        onToggleAudio={() => setAudioActive(!audioActive)}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* PWA Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* GDPR / Cookie Consent Banner */}
      <CookieConsentBanner />
    </div>
  );
}
