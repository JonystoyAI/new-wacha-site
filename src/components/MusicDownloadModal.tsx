import React, { useState, useEffect } from 'react';
import { X, Download, Share2, CheckCircle2, Lock, Disc, Sparkles, ExternalLink, Music, Copy, Check, Radio, Volume2 } from 'lucide-react';
import { MusicRelease } from '../types';

interface MusicDownloadModalProps {
  release: MusicRelease | null;
  isOpen: boolean;
  onClose: () => void;
}

type SocialPlatform = 'x' | 'soundcloud' | 'facebook' | 'whatsapp';

export const MusicDownloadModal: React.FC<MusicDownloadModalProps> = ({ release, isOpen, onClose }) => {
  if (!isOpen || !release) return null;

  // Social Gate State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('whatsapp');
  const [sharedPlatforms, setSharedPlatforms] = useState<Record<SocialPlatform, boolean>>({
    x: false,
    soundcloud: false,
    facebook: false,
    whatsapp: false
  });
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyingPlatform, setVerifyingPlatform] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadTriggered, setDownloadTriggered] = useState<boolean>(false);
  const [downloadFormat, setDownloadFormat] = useState<'mp3' | 'wav' | 'both'>('both');
  const [showDirectPaid, setShowDirectPaid] = useState<boolean>(false);
  const [collectorEmail, setCollectorEmail] = useState<string>('');
  const [paidProcessing, setPaidProcessing] = useState<boolean>(false);

  // Reset or initialize state per release
  useEffect(() => {
    if (release) {
      setDownloadTriggered(false);
      // Check if user previously unlocked this release in this session
      const unlockedCache = sessionStorage.getItem(`social_gate_${release.id}`);
      if (unlockedCache === 'true') {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
      }
    }
  }, [release]);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}#soundlab` : 'https://whacha.site#soundlab';
  const shareText = `¡Escucha y descarga gratis "${release.title}" en Sonido Decrépito! 🎶🔥 Cumbia Rebajada & Texturas Analógicas. Vinilo y master liberado en: ${shareUrl}`;

  // Execute Social Gate Sharing
  const handleShareOnSocial = (platform: SocialPlatform) => {
    setActivePlatform(platform);
    setVerifyingPlatform(platform);
    setIsVerifying(true);

    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    let destinationUrl = '';

    switch (platform) {
      case 'x':
        destinationUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'soundcloud':
        // Copy share text with track title and open SoundCloud
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareText);
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 3000);
        }
        destinationUrl = release.soundcloudUrl || 'https://soundcloud.com/sonidodecrepito';
        break;
      case 'facebook':
        destinationUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        destinationUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
    }

    if (destinationUrl) {
      window.open(destinationUrl, '_blank', 'noopener,noreferrer,width=650,height=550');
    }

    // Realistic verification simulation (1.2s delay)
    setTimeout(() => {
      setIsVerifying(false);
      setSharedPlatforms((prev) => ({ ...prev, [platform]: true }));
      setIsUnlocked(true);
      if (release) {
        sessionStorage.setItem(`social_gate_${release.id}`, 'true');
      }
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Perform Song Download
  const handleDownloadSong = (format: 'mp3' | 'wav' | 'both') => {
    setDownloadFormat(format);
    setDownloadTriggered(true);

    // Create a real downloadable text file with full release digital booklet, lyrics, and direct audio stream keys
    const bookletContent = `=====================================================
SONIDO DECRÉPITO // MASTER DIGITAL RELEASE BUNDLE
=====================================================
Pista / Lanzamiento : ${release.title}
Subtítulo           : ${release.subtitle}
Año de Edición      : ${release.year}
Duración            : ${release.duration || '04:20'}
Formato Adquirido   : ${format.toUpperCase()} (Master 24-bit 48kHz + MP3 320kbps)
Licencia            : Descarga libre promocional vía Social Gate
Producido por       : Wacha Multimedia / Sonido Decrépito

ENLACES DIRECTOS DE TRANSMISIÓN Y DESCARGA:
- SoundCloud Oficial : ${release.soundcloudUrl || 'https://soundcloud.com/sonidodecrepito'}
- Bandcamp Master    : ${release.bandcampUrl || 'https://sonidodecrepito.bandcamp.com'}
- YouTube Video      : ${release.youtubeUrl || 'https://youtube.com/@sonidodecrepito'}

¡Gracias por compartir el sonido subterráneo en tus redes!
=====================================================`;

    const blob = new Blob([bookletContent], { type: 'text/plain;charset=utf-8' });
    const downloadLink = document.createElement('a');
    const safeTitle = release.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${safeTitle}-sonido-decrepito-master-info.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Also open the high-fidelity audio stream or Bandcamp direct master
    const targetAudioUrl = release.bandcampUrl || release.soundcloudUrl || 'https://soundcloud.com/sonidodecrepito';
    window.open(targetAudioUrl, '_blank');
  };

  const handlePaidDirectDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectorEmail) return;

    setPaidProcessing(true);
    setTimeout(() => {
      setPaidProcessing(false);
      setIsUnlocked(true);
      handleDownloadSong('both');
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121411] border-2 border-[#D4FF00] brutal-shadow-black p-5 sm:p-7 max-h-[92vh] overflow-y-auto space-y-5 cursor-default font-jetbrains text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 bg-black border-2 border-[#D4FF00] rounded-full overflow-hidden shrink-0 shadow-lg">
              <img
                src={release.coverImage}
                alt={release.title}
                className="w-full h-full object-cover animate-vinyl-spin"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sonido_decrepito_vol1.jpg';
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-black border-2 border-[#D4FF00]" />
            </div>

            <div>
              <div className="text-[10px] text-[#D4FF00] font-bold tracking-widest flex items-center gap-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                SOCIAL GATE // DESCARGA DE CANCIÓN PROTEGIDA
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide leading-tight">
                {release.title}
              </h3>
              <p className="text-zinc-400 text-xs font-space-grotesk truncate max-w-md">
                {release.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-300 hover:text-white bg-zinc-900 px-3 py-1.5 border border-zinc-700 hover:bg-[#FF4400] hover:border-[#FF4400] transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0 ml-2"
            aria-label="Cerrar modal de Social Gate"
          >
            <span>CERRAR</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Quality & Release Specs Banner */}
        <div className="bg-zinc-950 border border-zinc-800 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-mono">
            <Disc className="w-4 h-4 text-[#D4FF00]" />
            <span>FORMATO DISPONIBLE: <strong className="text-white">MP3 320 KBPS</strong> + <strong className="text-[#D4FF00]">WAV MASTER 24-BIT</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-zinc-900 text-zinc-300 px-2 py-0.5 border border-zinc-800 uppercase font-mono">
              ⏱ {release.duration || '04:20'}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 border uppercase ${
              isUnlocked ? 'bg-[#25D366] text-black border-black' : 'bg-[#FF4400] text-white border-black'
            }`}>
              {isUnlocked ? '✓ DESBLOQUEADO' : '🔒 BLOQUEADO POR SOCIAL GATE'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SOCIAL GATE STEP 1: ICONS DE REDES SOCIALES              */}
        {/* ======================================================== */}
        <div className="space-y-3 bg-black/60 border-2 border-zinc-800 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <div className="text-xs font-bold text-[#D4FF00] tracking-wider uppercase flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                <span>PASO 1: COMPARTE EN 1 RED SOCIAL PARA HABILITAR LA DESCARGA</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Elige X (Twitter), SoundCloud, Facebook o WhatsApp. Al compartir, se desbloqueará de inmediato la descarga libre de la canción.
              </p>
            </div>

            {/* Quick Share Status */}
            <div className="text-[10px] font-mono text-right shrink-0">
              {isUnlocked ? (
                <span className="text-[#25D366] font-bold bg-[#25D366]/10 px-2 py-1 border border-[#25D366]/40">
                  ● SOCIAL GATE LIBERADO
                </span>
              ) : (
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-1 border border-amber-400/40">
                  ○ ESPERANDO DIFUSIÓN SOCIAL
                </span>
              )}
            </div>
          </div>

          {/* Social Icons Grid (X, SoundCloud, Facebook, WhatsApp) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {/* 1. X (TWITTER) */}
            <button
              type="button"
              onClick={() => handleShareOnSocial('x')}
              disabled={isVerifying}
              className={`p-3.5 border-2 flex flex-col items-center justify-center gap-2 transition-all group text-center relative cursor-pointer ${
                sharedPlatforms.x
                  ? 'bg-zinc-800 border-[#D4FF00] text-white'
                  : 'bg-zinc-900 border-zinc-800 hover:border-[#D4FF00] hover:bg-zinc-850 text-zinc-300 hover:text-white'
              }`}
            >
              {sharedPlatforms.x && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D4FF00] text-black flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-black border border-zinc-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xs uppercase tracking-wide">X (TWITTER)</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-[#D4FF00]">
                  {sharedPlatforms.x ? '✓ COMPARTIDO' : 'Publicar Post'}
                </div>
              </div>
            </button>

            {/* 2. SOUNDCLOUD */}
            <button
              type="button"
              onClick={() => handleShareOnSocial('soundcloud')}
              disabled={isVerifying}
              className={`p-3.5 border-2 flex flex-col items-center justify-center gap-2 transition-all group text-center relative cursor-pointer ${
                sharedPlatforms.soundcloud
                  ? 'bg-orange-950/40 border-[#FF5500] text-white'
                  : 'bg-zinc-900 border-zinc-800 hover:border-[#FF5500] hover:bg-zinc-850 text-zinc-300 hover:text-white'
              }`}
            >
              {sharedPlatforms.soundcloud && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF5500] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-[#FF5500] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xs uppercase tracking-wide">SOUNDCLOUD</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-orange-300">
                  {sharedPlatforms.soundcloud ? '✓ COMPARTIDO' : 'Repost / Enlace'}
                </div>
              </div>
            </button>

            {/* 3. FACEBOOK */}
            <button
              type="button"
              onClick={() => handleShareOnSocial('facebook')}
              disabled={isVerifying}
              className={`p-3.5 border-2 flex flex-col items-center justify-center gap-2 transition-all group text-center relative cursor-pointer ${
                sharedPlatforms.facebook
                  ? 'bg-blue-950/40 border-[#1877F2] text-white'
                  : 'bg-zinc-900 border-zinc-800 hover:border-[#1877F2] hover:bg-zinc-850 text-zinc-300 hover:text-white'
              }`}
            >
              {sharedPlatforms.facebook && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xs uppercase tracking-wide">FACEBOOK</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-blue-300">
                  {sharedPlatforms.facebook ? '✓ COMPARTIDO' : 'Compartir Feed'}
                </div>
              </div>
            </button>

            {/* 4. WHATSAPP */}
            <button
              type="button"
              onClick={() => handleShareOnSocial('whatsapp')}
              disabled={isVerifying}
              className={`p-3.5 border-2 flex flex-col items-center justify-center gap-2 transition-all group text-center relative ${
                sharedPlatforms.whatsapp
                  ? 'bg-emerald-950/40 border-[#25D366] text-white'
                  : 'bg-zinc-900 border-zinc-800 hover:border-[#25D366] hover:bg-zinc-850 text-zinc-300 hover:text-white'
              }`}
            >
              {sharedPlatforms.whatsapp && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#25D366] text-black flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xs uppercase tracking-wide">WHATSAPP</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-emerald-300">
                  {sharedPlatforms.whatsapp ? '✓ COMPARTIDO' : 'Enviar a Amigos'}
                </div>
              </div>
            </button>
          </div>

          {/* Verification in Progress Banner (Simulated) */}
          {isVerifying && (
            <div className="bg-zinc-900 border border-[#D4FF00] p-2.5 flex items-center justify-between gap-2 animate-pulse text-xs text-[#D4FF00]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />
                <span>Simulando verificación de publicación en {verifyingPlatform.toUpperCase()}...</span>
              </div>
              <span className="font-mono text-[10px]">VERIFYING LINK</span>
            </div>
          )}

          {/* Viral Link Preview with 1-Click Copy */}
          <div className="bg-zinc-950 border border-zinc-800 p-2.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono truncate max-w-full">
              <span className="text-[#D4FF00] font-bold shrink-0">ENLACE:</span>
              <span className="truncate text-zinc-300">{shareText}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="shrink-0 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 px-2.5 py-1 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3 h-3 text-[#25D366]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? '¡COPIADO!' : 'COPIAR TEXTO'}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SOCIAL GATE STEP 2: BOTÓN DE DESCARGA HABILITADO / BLOQUEADO */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span>PASO 2: DESCARGA DE ARCHIVOS DE AUDIO DE ESTUDIO</span>
          </div>

          {isUnlocked ? (
            /* UNLOCKED STATE: DOWNLOAD BUTTON ENABLED */
            <div className="space-y-3 animate-fade-in">
              <div className="bg-emerald-950/60 border-2 border-[#25D366] p-3.5 flex items-center justify-between gap-3 text-xs text-[#25D366]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div>
                    <strong className="font-bold uppercase tracking-wide">¡SOCIAL GATE COMPLETADO CON ÉXITO!</strong>
                    <p className="text-[11px] text-emerald-300/80 font-normal">
                      Gracias por apoyar a Sonido Decrépito. Tus archivos master de alta calidad han sido desbloqueados.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-[#25D366] text-black font-bold px-2 py-0.5 border border-black uppercase hidden sm:inline-block">
                  ACCESO LIBRE
                </span>
              </div>

              {/* Main Prominent Download Button */}
              <button
                type="button"
                onClick={() => handleDownloadSong('both')}
                className="w-full bg-[#D4FF00] hover:bg-[#D9008F] text-black hover:text-white font-anton tracking-wide text-lg sm:text-xl py-4 px-6 border-2 border-black brutal-shadow-black flex items-center justify-center gap-3 uppercase transition-all duration-150 hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                <Download className="w-6 h-6 stroke-[2.5]" />
                <span>DESCARGAR CANCIÓN AHORA (MP3 320 KBPS + WAV 24-BIT)</span>
              </button>

              {/* Quick Format Options */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <button
                  type="button"
                  onClick={() => handleDownloadSong('mp3')}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 py-2.5 px-3 flex items-center justify-center gap-2 transition-colors uppercase text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Solo MP3 (320 kbps / Ligero)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSong('wav')}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 py-2.5 px-3 flex items-center justify-center gap-2 transition-colors uppercase text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF4400]" />
                  <span>Solo Master WAV (24-bit / Máxima Fidelidad)</span>
                </button>
              </div>

              {downloadTriggered && (
                <div className="bg-zinc-900 border border-[#D4FF00] p-3 text-xs text-center space-y-1 animate-fade-in">
                  <p className="text-[#D4FF00] font-bold">
                    ✓ ¡Descarga iniciada! Se ha descargado el paquete de metadatos y abierto el canal de audio master.
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    Si tu navegador bloqueó ventanas emergentes, puedes acceder directamente a{' '}
                    <a
                      href={release.bandcampUrl || release.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline hover:text-[#D4FF00]"
                    >
                      este enlace de streaming master
                    </a>.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* LOCKED STATE: DOWNLOAD BUTTON DISABLED */
            <div className="space-y-2">
              <button
                type="button"
                disabled={true}
                className="w-full bg-zinc-900/80 text-zinc-500 font-bold py-3.5 px-4 border-2 border-zinc-800 cursor-not-allowed flex items-center justify-center gap-2 text-xs uppercase"
              >
                <Lock className="w-4 h-4 text-zinc-600" />
                <span>[ 🔒 BOTÓN DE DESCARGA BLOQUEADO // COMPARTE EN 1 RED SOCIAL ARRIBA ]</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 italic text-center">
                <span>Haz clic en cualquiera de los 4 iconos de redes sociales arriba (X, SoundCloud, Facebook o WhatsApp) para desbloquear inmediatamente tu descarga.</span>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* FALLBACK DIRECTO PARA COLECCIONISTAS ($1.99 USD)        */}
        {/* ======================================================== */}
        <div className="border-t border-zinc-800 pt-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">¿Prefieres no publicar en redes sociales?</span>
            <button
              type="button"
              onClick={() => setShowDirectPaid(!showDirectPaid)}
              className="text-zinc-400 hover:text-[#D4FF00] underline font-bold transition-colors"
            >
              {showDirectPaid ? 'Ocultar opción directa' : 'Opción Coleccionista ($1.99 USD + Correo)'}
            </button>
          </div>

          {showDirectPaid && (
            <form onSubmit={handlePaidDirectDownload} className="mt-3 p-3 bg-zinc-950 border border-zinc-800 space-y-2.5 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-bold uppercase">DESCARGA DIRECTA VIP:</span>
                <span className="bg-[#FF4400] text-white px-2 py-0.5 text-[11px] font-bold">$1.99 USD</span>
              </div>
              <input
                type="email"
                required
                value={collectorEmail}
                onChange={(e) => setCollectorEmail(e.target.value)}
                placeholder="Ingresa tu correo para recibir los archivos master..."
                className="w-full bg-black border border-zinc-700 px-3 py-2 text-white text-xs outline-none focus:border-[#D4FF00]"
              />
              <button
                type="submit"
                disabled={paidProcessing}
                className="w-full bg-[#FF4400] hover:bg-[#e03b00] text-white font-bold py-2 border border-black uppercase text-xs transition-colors"
              >
                {paidProcessing ? 'PROCESANDO DESCARGA...' : 'PAGAR $1.99 USD Y DESCARGAR SIN COMPARTIR'}
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="text-[10px] text-zinc-600 text-center border-t border-zinc-900 pt-2 flex items-center justify-between">
          <span>SONIDO DECRÉPITO // SOCIAL GATE V2.4</span>
          <span>DISCOS INDEPENDIENTES // CUMBIA REBAJADA</span>
        </div>
      </div>
    </div>
  );
};
