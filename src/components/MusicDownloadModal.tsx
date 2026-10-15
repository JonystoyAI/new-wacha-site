import React, { useState } from 'react';
import { X, Download, Share2, Mail, DollarSign, CheckCircle2, Lock, Disc, Sparkles, ExternalLink, Music, Heart, ShieldCheck, Copy } from 'lucide-react';
import { MusicRelease } from '../types';

interface MusicDownloadModalProps {
  release: MusicRelease | null;
  isOpen: boolean;
  onClose: () => void;
}

type DownloadMethod = 'social' | 'paid';

export const MusicDownloadModal: React.FC<MusicDownloadModalProps> = ({ release, isOpen, onClose }) => {
  if (!isOpen || !release) return null;

  const [activeTab, setActiveTab] = useState<DownloadMethod>('social');
  const [selectedSocial, setSelectedSocial] = useState<'whatsapp' | 'facebook' | 'twitter' | 'instagram' | 'tiktok'>('whatsapp');
  const [hasShared, setHasShared] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const shareText = `¡Escucha y descarga gratis "${release.title}" (Cumbia Rebajada & Texturas Analógicas en Sonido Decrépito)! 🎶🔥 Entra directo aquí: https://www.wacha.multimedia/#soundlab`;

  const handleShareClick = () => {
    const encodedText = encodeURIComponent(shareText);
    const siteUrl = encodeURIComponent('https://www.wacha.multimedia/#soundlab');

    let shareUrl = '';
    switch (selectedSocial) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'instagram':
      case 'tiktok':
        // Copy text to clipboard for Instagram / TikTok stories
        navigator.clipboard?.writeText(shareText);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
        shareUrl = selectedSocial === 'instagram' ? 'https://www.instagram.com' : 'https://www.tiktok.com';
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=500');
    }

    // Unlock free download after sharing
    setHasShared(true);
  };

  const handleCopyText = () => {
    navigator.clipboard?.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleFreeDownload = () => {
    setDownloadSuccess(true);
    // Trigger download or fallback audio direct link
    const downloadUrl = release.downloadMp3Url || release.soundcloudUrl || release.bandcampUrl || 'https://soundcloud.com/sonidodecrepito';
    window.open(downloadUrl, '_blank');
  };

  const handlePaidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    setIsProcessingPayment(true);

    // Simulate instant payment checkout connection
    setTimeout(() => {
      setIsProcessingPayment(false);
      setDownloadSuccess(true);
      const downloadUrl = release.downloadWavUrl || release.bandcampUrl || 'https://sonidodecrepito.bandcamp.com';
      window.open(downloadUrl, '_blank');
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121411] border-2 border-[#D4FF00] brutal-shadow-black p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 cursor-default font-jetbrains text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black border-2 border-[#D4FF00] rounded-full overflow-hidden shrink-0 animate-vinyl-spin shadow-md">
              <img src={release.coverImage} alt={release.title} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="text-[10px] text-[#D4FF00] font-bold tracking-widest flex items-center gap-1.5 uppercase">
                <Music className="w-3.5 h-3.5" />
                CENTRO DE DESCARGA // AUDIO MASTER 24-BIT
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                {release.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-300 hover:text-white bg-zinc-900 px-3 py-1.5 border border-zinc-700 hover:bg-[#FF4400] hover:border-[#FF4400] transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
            aria-label="Cerrar modal de descarga"
          >
            <span>CERRAR</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Release Format Badge Banner */}
        <div className="bg-zinc-900 border border-zinc-800 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Disc className="w-4 h-4 text-[#D4FF00]" />
            <span>INCLUYE: <strong className="text-white">MP3 HQ (320 kbps)</strong> + <strong className="text-[#D4FF00]">WAV Master (24-bit / 48kHz)</strong></span>
          </div>
          <span className="text-[11px] bg-[#D4FF00] text-black font-bold px-2 py-0.5 border border-black uppercase">
            {release.year} // {release.tracksCount} TRACKS
          </span>
        </div>

        {/* Download Strategy Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`p-3 border-2 transition-all flex flex-col items-center justify-center gap-1 ${
              activeTab === 'social'
                ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black scale-[1.01]'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-sm uppercase">
              <Share2 className="w-4 h-4" />
              <span>OPCIÓN A: GRATIS (COMPARTIR)</span>
            </div>
            <span className="text-[10px] font-normal opacity-90">Comparte en tu red social y descarga gratis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paid')}
            className={`p-3 border-2 transition-all flex flex-col items-center justify-center gap-1 ${
              activeTab === 'paid'
                ? 'bg-[#FF4400] text-white border-black brutal-shadow-black scale-[1.01]'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5 text-sm uppercase">
              <DollarSign className="w-4 h-4" />
              <span>OPCIÓN B: DIRECTO ($1.99 USD)</span>
            </div>
            <span className="text-[10px] font-normal opacity-90">Sin publicar en redes + Suscripción de Correo</span>
          </button>
        </div>

        {/* TAB A: Social Paywall (Free Download with Share) */}
        {activeTab === 'social' && (
          <div className="space-y-4 bg-zinc-950/80 border-2 border-zinc-800 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>1. PASO 1: ELIGE DÓNDE COMPARTIR CON TUS AMIGOS O SEGUIDORES</span>
            </div>

            {/* Social Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: 'whatsapp', label: 'WhatsApp', color: 'border-[#25D366] text-[#25D366]' },
                { id: 'facebook', label: 'Facebook', color: 'border-blue-500 text-blue-400' },
                { id: 'instagram', label: 'Instagram', color: 'border-pink-500 text-pink-400' },
                { id: 'tiktok', label: 'TikTok', color: 'border-cyan-400 text-cyan-300' },
                { id: 'twitter', label: 'X / Twitter', color: 'border-zinc-400 text-zinc-200' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSocial(s.id as any)}
                  className={`p-2 border font-bold text-center transition-all text-[11px] uppercase ${
                    selectedSocial === s.id
                      ? `${s.color} bg-black border-2 scale-105 shadow-md`
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Message Preview Box */}
            <div className="bg-black border border-zinc-800 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold">
                <span>MENSAJE PUBLICITARIO QUE SE COMPARTIRÁ:</span>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="text-[#D4FF00] hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLink ? '¡COPIADO!' : 'COPIAR TEXTO'}</span>
                </button>
              </div>
              <p className="text-zinc-200 italic leading-relaxed text-[11px] border-l-2 border-[#D4FF00] pl-2">
                "{shareText}"
              </p>
            </div>

            {/* Action Share & Unlock Button */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleShareClick}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold py-3 px-4 border-2 border-black brutal-shadow-black flex items-center justify-center gap-2 text-xs transition-transform hover:scale-[1.01]"
              >
                <Share2 className="w-4 h-4 fill-current" />
                <span>[ 📢 COMPARTIR EN {selectedSocial.toUpperCase()} Y DESBLOQUEAR DESCARGA ]</span>
              </button>

              {/* Free Download Unlocked Button */}
              {hasShared ? (
                <div className="bg-emerald-950/60 border-2 border-[#25D366] p-4 text-center space-y-2 animate-fade-in">
                  <div className="flex items-center justify-center gap-2 text-[#25D366] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡GRACIAS POR COMPARTIR LA CUMBIA Y APOYAR EL PROYECTO!</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFreeDownload}
                    className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-bold py-3.5 px-4 border-2 border-black brutal-shadow-black flex items-center justify-center gap-2 text-sm uppercase transition-transform hover:scale-[1.01]"
                  >
                    <Download className="w-5 h-5" />
                    <span>⬇ DESCARGAR AHORA (ARCHIVOS MP3 320kbps + WAV)</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 italic">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Haz clic arriba para compartir públicamente en tu red y activar tu enlace de descarga directa gratis.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB B: Paid Instant Download ($1.99 USD + Email) */}
        {activeTab === 'paid' && (
          <form onSubmit={handlePaidSubmit} className="space-y-4 bg-zinc-950/80 border-2 border-zinc-800 p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-bold text-[#FF4400] uppercase">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>DESCARGA DIRECTA COLECCIONISTA MASTER HQ</span>
              </div>
              <span className="bg-[#FF4400] text-white px-2 py-0.5 font-anton text-sm">$1.99 USD</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Si prefieres no publicar en redes sociales, puedes obtener los archivos de audio de estudio (**WAV 24-bit / 48kHz sin compresión + MP3 320kbps**) suscribiéndote a nuestra lista de correo.
            </p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-300">Tu Correo Electrónico (para recibir tus enlaces y novedades):</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 focus:border-[#FF4400] pl-9 pr-3 py-2 text-white outline-none text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full bg-[#FF4400] hover:bg-[#e03b00] text-white font-bold py-3.5 px-4 border-2 border-black brutal-shadow-black flex items-center justify-center gap-2 text-xs uppercase transition-transform hover:scale-[1.01] disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>PROCESANDO PAGO SEGURO...</span>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>PAGAR $1.99 USD Y DESCARGAR MASTER WAV + MP3 DIRECTO ↗</span>
                  </>
                )}
              </button>
            </div>

            {downloadSuccess && (
              <div className="bg-emerald-950/80 border-2 border-[#25D366] p-3 text-center text-xs text-[#25D366] font-bold">
                ¡Pago confirmado! Tus archivos MP3 + WAV se han abierto en tu navegador.
              </div>
            )}
          </form>
        )}

        {/* Footer Note */}
        <div className="text-[10px] text-zinc-500 text-center border-t border-zinc-800 pt-3">
          Sonido Decrépito // Todos los derechos reservados. Licencia para uso comercial en videos o spots disponible bajo pedido.
        </div>
      </div>
    </div>
  );
};
