import React from 'react';
import { Hero } from '../components/Hero';
import { Mastermind } from '../components/Mastermind';
import { HomeBlogGadget } from '../components/HomeBlogGadget';
import { HomeMultimediaGadget } from '../components/HomeMultimediaGadget';
import { HomeCumbiaLabGadget } from '../components/HomeCumbiaLabGadget';
import { AeoTerminal } from '../components/AeoTerminal';
import { DropStoreGadget } from '../components/DropStoreGadget';
import { FaqSection } from '../components/FaqSection';
import { BlogPost, MerchItem } from '../types';

interface HomeViewProps {
  onPlayVideo: (url: string, title: string) => void;
  onOpenWhatsAppCotizador: () => void;
  onOpenArticle: (article: BlogPost, readingMode?: boolean) => void;
  onNavigate: (route: string) => void;
  onAddToCart: (item: MerchItem, size: string) => void;
  onOpenCetesModal: () => void;
  onOpenDroModal: () => void;
  audioActive: boolean;
  isSpeaking?: boolean;
  isPaused?: boolean;
  speakingArticleId?: string | null;
  onToggleSpeech?: (article: BlogPost, e: React.MouseEvent) => void;
  onShareArticle?: (article: BlogPost, e: React.MouseEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onPlayVideo,
  onOpenWhatsAppCotizador,
  onOpenArticle,
  onNavigate,
  onAddToCart,
  onOpenCetesModal,
  onOpenDroModal,
  audioActive,
  isSpeaking,
  isPaused,
  speakingArticleId,
  onToggleSpeech,
  onShareArticle
}) => {
  return (
    <div className="space-y-0">
      {/* Hero Banner Section */}
      <Hero
        onPlayVideo={(url, title) => onPlayVideo(url, title)}
        onOpenWhatsAppCotizador={onOpenWhatsAppCotizador}
      />

      {/* 00 // Mastermind // Mr. Decrépito Manifesto */}
      <Mastermind />

      {/* GADGET 01: Blog 4 publicaciones más recientes */}
      <HomeBlogGadget
        onOpenArticle={onOpenArticle}
        onNavigateToBlog={() => onNavigate('blog')}
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        speakingArticleId={speakingArticleId}
        onToggleSpeech={onToggleSpeech}
        onShareArticle={onShareArticle}
      />

      {/* GADGET 02: Multimedia / Clientes / Canales */}
      <HomeMultimediaGadget
        onPlayVideo={onPlayVideo}
        onNavigateToMultimedia={() => onNavigate('produccion')}
        onOpenCetesModal={onOpenCetesModal}
        onOpenDroModal={onOpenDroModal}
      />

      {/* GADGET 03: Cumbia Lab / 4 pistas + SoundCloud Embed */}
      <HomeCumbiaLabGadget
        onNavigateToCumbiaLab={() => onNavigate('cumbia-lab')}
        audioActive={audioActive}
      />

      {/* Cotizador Rápido AEO */}
      <AeoTerminal />

      {/* GADGET WACHA DROP STORE (Ofertas & Más Vendidos) */}
      <DropStoreGadget
        onAddToCart={onAddToCart}
        onNavigateToStore={() => onNavigate('tienda')}
      />

      {/* Preguntas Frecuentes Generales */}
      <FaqSection
        category="general"
        title="PREGUNTAS FRECUENTES // WACHA HUB"
        subtitle="Todo sobre nuestros servicios multimedia, optimización algorítmica y procesos creativos."
      />
    </div>
  );
};
