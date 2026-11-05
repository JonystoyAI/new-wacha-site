import React, { useState, useEffect, useRef } from 'react';
import { RELEASES_DATA } from '../data/releasesData';
import { MusicRelease } from '../types';
import { Disc, Play, Pause, Volume2, ExternalLink, Music, Radio, Sparkles, Youtube, Download, Share2 } from 'lucide-react';
import { MusicDownloadModal } from './MusicDownloadModal';

interface SoundLabProps {
  audioActive?: boolean;
}

export const SoundLab: React.FC<SoundLabProps> = ({ audioActive = true }) => {
  const [isPlayingTape, setIsPlayingTape] = useState(false);
  const [playingReleaseId, setPlayingReleaseId] = useState<string | null>(null);
  const [pitch, setPitch] = useState<number>(0.85); // Slowed cumbia rebajada pitch
  const [volume, setVolume] = useState<number>(0.8);
  const [tubeSaturation, setTubeSaturation] = useState(true);
  const [activeTab, setActiveTab] = useState<'space' | 'cabaret' | 'soundcloud'>('space');
  const [downloadRelease, setDownloadRelease] = useState<MusicRelease | null>(null);

  // Audio Context Ref for Web Audio API Synth Engine
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // SoundCloud Mute / Unmute Controller
  useEffect(() => {
    const iframe = document.getElementById('soundcloud-player-iframe') as HTMLIFrameElement;

    const applyVolume = () => {
      const vol = audioActive ? 100 : 0;
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            JSON.stringify({ method: 'setVolume', value: vol }),
            '*'
          );
        } catch (e) {
          // ignore
        }
      }

      if (typeof window !== 'undefined' && (window as any).SC && (window as any).SC.Widget && iframe) {
        try {
          const widget = (window as any).SC.Widget(iframe);
          if (widget && typeof widget.setVolume === 'function') {
            widget.setVolume(vol);
          }
        } catch (e) {
          // ignore
        }
      }
    };

    applyVolume();
    const interval = setInterval(applyVolume, 500);
    return () => clearInterval(interval);
  }, [audioActive]);

  // Simple Web Audio API Cumbia Rebajada Beat Generator
  const startSynth = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    isLoopingRef.current = true;
    setIsPlayingTape(true);

    let step = 0;
    const playStep = () => {
      if (!isLoopingRef.current || !audioCtxRef.current) return;

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const speedFactor = pitch; // Affects tempo and pitch

      // Kick drum on beats 0, 2, 4, 6
      if (step % 2 === 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(120 * speedFactor, now);
        osc.frequency.exponentialRampToValueAtTime(30 * speedFactor, now + 0.15);
        gain.gain.setValueAtTime(volume * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }

      // Guacharaca / Cumbia Snare Rimshot on beats 1, 3, 5, 7
      if (step % 2 === 1) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 * speedFactor, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }

      // Slow Psychedelic Bass Synth Line
      const bassNotes = [110, 110, 130.81, 146.83, 98, 98, 123.47, 130.81];
      const noteFreq = bassNotes[step % bassNotes.length] * speedFactor;

      const bassOsc = ctx.createOscillator();
      const bassFilter = ctx.createBiquadFilter();
      const bassGain = ctx.createGain();

      bassOsc.type = tubeSaturation ? 'sawtooth' : 'sine';
      bassOsc.frequency.setValueAtTime(noteFreq, now);

      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(tubeSaturation ? 400 : 250, now);

      bassGain.gain.setValueAtTime(volume * 0.5, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(ctx.destination);

      bassOsc.start(now);
      bassOsc.stop(now + 0.35);

      step = (step + 1) % 16;
      const intervalMs = (160 / speedFactor); // Tempo adjustment
      timerRef.current = window.setTimeout(playStep, intervalMs);
    };

    playStep();
  };

  const stopSynth = () => {
    isLoopingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPlayingTape(false);
    setPlayingReleaseId(null);
  };

  const toggleTape = () => {
    if (isPlayingTape) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  const handleToggleReleasePlay = (releaseId: string) => {
    if (playingReleaseId === releaseId && isPlayingTape) {
      stopSynth();
    } else {
      setPlayingReleaseId(releaseId);
      if (!isPlayingTape) {
        startSynth();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section id="soundlab" className="py-16 bg-[#121411] border-b-2 border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-zinc-800 pb-4 mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-black bg-black brutal-shadow-orange shrink-0 hidden sm:block">
              <img
                src="/wacha_logo.jpg"
                alt="Logo Oficial Wacha Sound Lab"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-jetbrains text-xs text-[#FF4400] font-bold tracking-wider mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF4400]"></span>
                // CUMBIA LAB & MÚSICA EXPERIMENTAL DECRÉPITA
              </div>
              <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide flex flex-wrap items-center gap-3">
                <span>CUMBIA LAB.</span>
                <span className="text-xs font-jetbrains px-3 py-1 bg-[#FF4400] text-white border border-black font-bold">
                  (PROYECTO DE CUMBIA DECRÉPITA)
                </span>
              </h2>
            </div>
          </div>
          <p className="font-jetbrains text-xs text-zinc-400 max-w-md">
            Texturas analógicas, pitch frenado de 33 a 16 RPM, cumbia psicodélica y masterización de pegada monumental.
          </p>
        </div>

        {/* Console Deck & Tape Deck Module */}
        <div className="bg-white dark:bg-zinc-900 border-4 border-black p-6 mb-12 brutal-shadow-black">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-800 pb-4 mb-6 gap-4 font-jetbrains text-xs">
            <div className="flex items-center gap-3">
              <Disc className={`w-6 h-6 text-[#B8006E] dark:text-[#D4FF00] ${isPlayingTape ? 'animate-spin' : ''}`} />
              <div>
                <h3 className="font-anton text-xl text-black dark:text-white">VISUALIZADOR SPACE 3D // CABARET DECRÉPITO</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-[10px] font-bold">FLOW MUSIC SPACE (GLSL 60 FPS) // REPRODUCTORES MULTIMEDIA DECRÉPITO</p>
              </div>
            </div>

            {/* Console Player Switcher & Social Gate Trigger */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const targetSong = RELEASES_DATA.find((r) => r.id === playingReleaseId) || RELEASES_DATA[0];
                  setDownloadRelease(targetSong);
                }}
                className="px-3 py-1.5 border-2 font-bold transition-all duration-150 bg-[#D4FF00] text-black border-black hover:bg-[#D9008F] hover:text-white flex items-center gap-1.5 text-xs brutal-shadow-black hover:-translate-y-1 active:translate-y-0 active:scale-95 group/sg cursor-pointer"
                title="Abrir Social Gate para descargar la canción actual"
              >
                <Download className="w-3.5 h-3.5 text-black group-hover/sg:text-white" />
                <span className="text-black group-hover/sg:text-white font-bold">DESCARGAR PISTA // SOCIAL GATE</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('space')}
                className={`px-3 py-1.5 border-2 font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer brutal-shadow-black ${
                  activeTab === 'space'
                    ? 'bg-[#00E5FF] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white dark:bg-zinc-800 text-black dark:text-zinc-300 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
                title="Visualizador Flow Music Space 3D en tiempo real con Shaders GLSL"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visualizador Space 3D</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cabaret')}
                className={`px-3 py-1.5 border-2 font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer brutal-shadow-black ${
                  activeTab === 'cabaret'
                    ? 'bg-[#D4FF00] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white dark:bg-zinc-800 text-black dark:text-zinc-300 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
                title="Reproductor oficial Cabaret Decrépito en Flow Music"
              >
                <Music className="w-3.5 h-3.5" />
                <span>Cabaret Decrépito</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('soundcloud')}
                className={`px-3 py-1.5 border-2 font-bold transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer brutal-shadow-black ${
                  activeTab === 'soundcloud'
                    ? 'bg-[#FF4400] text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white dark:bg-zinc-800 text-black dark:text-zinc-300 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>SOUNDCLOUD EMBED</span>
              </button>
            </div>
          </div>

          {activeTab === 'space' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 font-jetbrains text-xs">
                <div className="flex items-center gap-2 text-black dark:text-[#00E5FF] font-bold">
                  <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                  <span>ESPACIO VISUALIZADOR 3D // FLOW MUSIC SPACE (GLSL 60 FPS)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono">FLOWMUSIC.APP/SPACE • WEBGL REACTIVO</span>
                  <a
                    href="https://flowmusic.app/space/8e9aea2c-6b13-43d9-baca-6174ab5325cc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF4400] hover:underline font-bold text-xs"
                  >
                    PANTALLA COMPLETA ↗
                  </a>
                </div>
              </div>
              <div className="w-full flex justify-center bg-black rounded-2xl overflow-hidden brutal-shadow-black">
                <iframe 
                  src="https://flowmusic.app/space/8e9aea2c-6b13-43d9-baca-6174ab5325cc" 
                  width="100%" 
                  height="700" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  style={{
                    borderRadius: '20px',
                    border: '1px solid #3f3f46',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.85)',
                    overflow: 'hidden'
                  }}
                  loading="lazy"
                  title="Flow Music Space 3D Visualizer"
                />
              </div>
            </div>
          ) : activeTab === 'cabaret' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 font-jetbrains text-xs">
                <div className="flex items-center gap-2 text-black dark:text-[#D4FF00] font-bold">
                  <Radio className="w-4 h-4 text-[#FF4400] animate-pulse" />
                  <span>CABARET DECRÉPITO // REPRODUCTOR FLOW MUSIC PLAYLIST OFICIAL</span>
                </div>
                <span className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono">FLOWMUSIC.APP • ALTA RESOLUCIÓN</span>
              </div>
              <div className="w-full bg-black rounded-2xl overflow-hidden brutal-shadow-black flex justify-center">
                <iframe 
                  src="https://flowmusic.app/playlist/a8a6f758-cd63-4262-ba4f-4c84c98c666b" 
                  width="100%" 
                  height="480" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  style={{ borderRadius: '16px', border: '1px solid #27272a', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                  loading="lazy"
                  title="Cabaret Decrépito Flow Music Playlist"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full bg-black border-2 border-zinc-800 overflow-hidden brutal-shadow-black">
                <iframe
                  id="soundcloud-player-iframe"
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay; encrypted-media"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/sonidodecrepito/sets/decrepito-papu&color=%23d4ff00&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-jetbrains text-xs p-3 bg-zinc-100 dark:bg-black border-2 border-black dark:border-zinc-800">
                <div className="text-xs text-black dark:text-zinc-200 font-mono truncate font-bold">
                  <a
                    href="https://soundcloud.com/sonidodecrepito"
                    title="Sonido Decrépito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B8006E] dark:text-[#D4FF00] hover:underline font-bold"
                  >
                    Sonido Decrépito
                  </a>{' '}
                  <span className="text-zinc-400">·</span>{' '}
                  <a
                    href="https://on.soundcloud.com/485W8PONR0OfSHWVVj"
                    title="Decrépito Papu - Playlist Oficial de Sonido Decrépito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-zinc-200 hover:underline font-bold"
                  >
                    Decrépito Papu // Playlist Oficial
                  </a>
                </div>
                <a
                  href="https://on.soundcloud.com/485W8PONR0OfSHWVVj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF4400] text-white px-3 py-1 font-bold hover:bg-orange-600 transition-colors flex items-center gap-1 shrink-0 text-xs border border-black"
                >
                  ABRIR EN SOUNDCLOUD ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 4 Releases Quadrants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELEASES_DATA.map((release) => {
            const isThisPlaying = (playingReleaseId === release.id && isPlayingTape) || (isPlayingTape && playingReleaseId === null);

            return (
              <div
                key={release.id}
                className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-4 brutal-shadow-black hover:border-[#B8006E] dark:hover:border-[#D4FF00] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Cover Image Frame with Vinyl Rotation Effect */}
                  <div
                    className={`relative aspect-square bg-black border border-zinc-800 overflow-hidden transition-all duration-500 cursor-pointer group/cover ${
                      isThisPlaying ? 'rounded-full border-2 border-[#D4FF00] brutal-shadow-lime shadow-[0_0_20px_rgba(212,255,0,0.25)]' : 'rounded-none group-hover:border-[#D4FF00]'
                    }`}
                    onClick={() => handleToggleReleasePlay(release.id)}
                    title={isThisPlaying ? 'Pausar Reproducción Vinilo' : 'Reproducir Canción en Vinilo'}
                  >
                    <img
                      src={release.coverImage}
                      alt={release.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isThisPlaying ? 'animate-vinyl-spin rounded-full' : 'group-hover/cover:scale-105'
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8i70w32C0zX8sW29mY2QYJqR_bYt1tTstPZ464K_50E1GfG5Zq-k1L3D3J2P1L8hM-P8Z9q";
                      }}
                    />

                    {/* Vinyl Record Center Spindle & Groove Overlay when Playing */}
                    {isThisPlaying && (
                      <>
                        <div className="absolute inset-4 rounded-full border border-white/20 pointer-events-none animate-vinyl-spin" />
                        <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none animate-vinyl-spin" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black border-2 border-[#D4FF00] z-20 flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                        </div>
                      </>
                    )}

                    {/* Hover / Playing Control Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      isThisPlaying ? 'opacity-100 hover:bg-black/60 z-20' : 'opacity-0 group-hover/cover:opacity-100'
                    }`}>
                      <div className="bg-[#D4FF00] text-black p-2.5 rounded-full border-2 border-black brutal-shadow-black transition-transform hover:scale-110">
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 fill-current text-black" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5 text-black" />
                        )}
                      </div>
                    </div>

                    {/* Badges Overlay */}
                    {release.id !== 'decrepito-papu-short' && !isThisPlaying && (
                      <>
                        {release.type && (
                          <div className="absolute top-2 left-2 bg-[#D4FF00] text-black font-jetbrains text-[10px] font-bold px-2 py-0.5 border border-black z-10">
                            {release.type === 'Single' ? 'DESCARGA' : release.type}
                          </div>
                        )}
                        {release.status && (
                          <div className={`absolute top-2 right-2 font-jetbrains text-[10px] font-bold px-2 py-0.5 border border-black z-10 ${
                            (release.status === 'Disponible' || release.status === 'GRATIS') ? 'bg-[#FF4400] text-white' : 'bg-black text-white'
                          }`}>
                            {release.status === 'Disponible' ? 'GRATIS' : release.status}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                {/* Release Meta */}
                <div>
                  <div className="flex justify-between items-center font-jetbrains text-[10px] text-zinc-700 dark:text-zinc-400 font-bold mb-1">
                    <span>AÑO: {release.year}</span>
                    <span>{release.tracksCount} TRACKS ({release.duration || 'EP'})</span>
                  </div>
                  <h4 className="font-anton text-lg text-black dark:text-white group-hover:text-[#B8006E] dark:group-hover:text-[#D4FF00] transition-colors">
                    {release.title}
                  </h4>
                  <p className="font-space-grotesk text-xs text-zinc-800 dark:text-zinc-300 font-medium mt-1">
                    {release.subtitle}
                  </p>
                </div>
              </div>

              {/* Platform Action Links */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4 space-y-1.5 font-jetbrains text-xs">
                {/* Download Button with Mandatory Social Gate */}
                <button
                  type="button"
                  onClick={() => setDownloadRelease(release)}
                  className="w-full bg-[#D4FF00] hover:bg-[#D9008F] text-black hover:text-white font-bold py-2 border-2 border-black brutal-shadow-black transition-all duration-150 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-1.5 uppercase text-xs group/btn cursor-pointer"
                >
                  <Download className="w-4 h-4 shrink-0 text-black group-hover/btn:text-white" />
                  <span className="text-black group-hover/btn:text-white font-bold">DESCARGAR GRATIS // SHARE GATE ↗</span>
                </button>

                {/* Direct Share Button */}
                <button
                  type="button"
                  onClick={() => setDownloadRelease(release)}
                  className="w-full bg-white dark:bg-black text-black dark:text-zinc-200 hover:bg-[#FF4400] hover:text-white py-1.5 border-2 border-black dark:border-zinc-700 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 text-[11px] font-bold brutal-shadow-black cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>COMPARTIR TRACK (X, SOUNDCLOUD, FB, WA)</span>
                </button>

                {release.bandcampUrl && (
                  <a
                    href={release.bandcampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-[#D4FF00] hover:bg-[#FF4400] hover:text-white py-1.5 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 text-[11px] font-bold brutal-shadow-black group/bc cursor-pointer"
                  >
                    <span className="text-[#D4FF00] group-hover/bc:text-white font-bold">BANDCAMP MASTER ↗</span>
                  </a>
                )}

                {release.soundcloudUrl && (
                  <a
                    href={release.soundcloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#FF4400] text-white hover:bg-orange-600 py-1.5 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 text-[11px] font-bold brutal-shadow-black cursor-pointer"
                  >
                    <span className="text-white font-bold">ESCUCHAR EN SOUNDCLOUD ↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Interactive Music Download & Social Paywall Modal */}
      <MusicDownloadModal
        release={downloadRelease}
        isOpen={!!downloadRelease}
        onClose={() => setDownloadRelease(null)}
      />
    </section>
  );
};
