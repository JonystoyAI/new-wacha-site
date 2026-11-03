import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Check, Copy, Share2, ExternalLink } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ArticleShareModalProps {
  article: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleShareModal: React.FC<ArticleShareModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://whacha.site';
  const shareUrl = `${origin}#blog-${article.slug}`;
  const imageUrl = article.image.startsWith('http') ? article.image : `${origin}${article.image.startsWith('/') ? article.image : '/' + article.image}`;

  const shareText = `${article.title} — Vía Wacha Multimedia (AEO & Ingeniería Digital)`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=600');
  };

  const handleShareX = () => {
    const text = `${article.title} — Lectura recomendada sobre ${article.category} en Wacha Multimedia:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=550');
  };

  const handleShareWhatsApp = () => {
    const text = `*${article.title}*\n${article.excerpt}\n\nLee el artículo completo aquí:\n${shareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=600');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=600');
  };

  const handleShareDiscord = () => {
    // Discord Embed markup format
    const discordPayload = `**${article.title}**\n${article.excerpt}\n🔗 ${shareUrl}\n🖼️ ${imageUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(discordPayload).then(() => {
        setCopiedDiscord(true);
        setTimeout(() => setCopiedDiscord(false), 3000);
      });
    }
    // Launch Discord web
    window.open('https://discord.com/channels/@me', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#121411] border-2 border-black dark:border-zinc-700 w-full max-w-lg brutal-shadow-black dark:brutal-shadow-lime overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border-b-2 border-black dark:border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-jetbrains text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8006E] dark:bg-[#D4FF00] animate-pulse"></span>
            <span className="text-black dark:text-white font-bold tracking-wider uppercase">
              COMPARTIR ARTÍCULO
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white dark:bg-black border border-black dark:border-zinc-700 text-black dark:text-zinc-300 hover:bg-[#FF4400] hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Preview Card with Thumbnail */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="border-2 border-black dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 flex gap-3.5 items-start">
            <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 border border-black dark:border-zinc-700 overflow-hidden bg-black">
              <ImageWithSkeleton
                src={article.image}
                alt={article.title}
                aspectRatioClassName="aspect-video"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-jetbrains">
                <span className="px-1.5 py-0.5 bg-black text-[#D4FF00] font-bold uppercase">
                  {article.category}
                </span>
                <span className="text-zinc-500 font-bold">
                  {article.readTime}
                </span>
              </div>
              <h4 className="font-anton text-sm sm:text-base text-black dark:text-white uppercase leading-tight line-clamp-2">
                {article.title}
              </h4>
              <p className="font-space-grotesk text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Social Destinations Grid */}
          <div className="space-y-2">
            <div className="font-jetbrains text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center justify-between">
              <span>SELECCIONA PLATAFORMA DE DIFUSIÓN:</span>
              <span className="text-[10px] text-[#B8006E] dark:text-[#D4FF00]">INCLUYE MINIATURA</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {/* 1. LinkedIn */}
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="p-3 bg-[#0077B5] hover:bg-[#005f93] text-white border-2 border-black font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LINKEDIN</span>
              </button>

              {/* 2. X (Twitter) */}
              <button
                type="button"
                onClick={handleShareX}
                className="p-3 bg-black hover:bg-zinc-900 text-white border-2 border-black font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X (TWITTER)</span>
              </button>

              {/* 3. WhatsApp */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="p-3 bg-[#25D366] hover:bg-[#1faa53] text-black font-jetbrains text-xs font-bold border-2 border-black transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WHATSAPP</span>
              </button>

              {/* 4. Discord */}
              <button
                type="button"
                onClick={handleShareDiscord}
                className="p-3 bg-[#5865F2] hover:bg-[#4752c4] text-white border-2 border-black font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm relative"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>{copiedDiscord ? '¡COPIADO!' : 'DISCORD'}</span>
              </button>

              {/* 5. Facebook */}
              <button
                type="button"
                onClick={handleShareFacebook}
                className="p-3 bg-[#1877F2] hover:bg-[#125ecc] text-white border-2 border-black font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>FACEBOOK</span>
              </button>

              {/* 6. Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className={`p-3 border-2 border-black font-jetbrains text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  copiedLink
                    ? 'bg-[#00E599] text-black'
                    : 'bg-[#D4FF00] hover:bg-[#D9008F] hover:text-white text-black'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡COPIADO!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR ENLACE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct Link Display */}
          <div className="bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-800 p-2.5 flex items-center justify-between gap-2 text-xs font-jetbrains">
            <span className="truncate text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
              {shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="text-black dark:text-[#D4FF00] hover:underline font-bold text-[11px] shrink-0"
            >
              {copiedLink ? '✓ Listo' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-3 text-[11px] font-jetbrains text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <span>WACHA RADAR AEO // RED DE DIFUSIÓN</span>
          <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold">OPEN GRAPH &amp; TWITTER CARDS SYNC</span>
        </div>
      </div>
    </div>
  );
};
