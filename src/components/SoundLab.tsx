import React, { useState, useEffect, useRef } from 'react';
import { RELEASES_DATA } from '../data/releasesData';
import { MusicRelease } from '../types';
import { Disc, Play, Pause, Volume2, Sliders, ExternalLink, Music, Radio, Sparkles, Youtube } from 'lucide-react';

interface SoundLabProps {
  audioActive?: boolean;
}

export const SoundLab: React.FC<SoundLabProps> = ({ audioActive = true }) => {
  const [isPlayingTape, setIsPlayingTape] = useState(false);
  const [playingReleaseId, setPlayingReleaseId] = useState<string | null>(null);
  const [pitch, setPitch] = useState<number>(0.85); // Slowed cumbia rebajada pitch
  const [volume, setVolume] = useState<number>(0.8);
  const [tubeSaturation, setTubeSaturation] = useState(true);
  const [activeTab, setActiveTab] = useState<'synth' | 'soundcloud'>('soundcloud');

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
          <div>
            <div className="font-jetbrains text-xs text-[#FF4400] font-bold tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4400]"></span>
              // SECCIÓN 03: SOUND LAB & MÚSICA EXPERIMENTAL
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide flex items-center gap-3">
              SONIDO DECRÉPITO // LAB
              <span className="text-xs font-jetbrains px-3 py-1 bg-[#FF4400] text-white border border-black font-bold">
                CUMBIA REBAJADA
              </span>
            </h2>
          </div>
          <p className="font-jetbrains text-xs text-zinc-400 max-w-md">
            Texturas analógicas, pitch frenado de 33 a 16 RPM, cumbia psicodélica y masterización de pegada monumental.
          </p>
        </div>

        {/* Console Deck & Tape Deck Module */}
        <div className="bg-zinc-900 border-4 border-black p-6 mb-12 brutal-shadow-lime">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-zinc-800 pb-4 mb-6 gap-4 font-jetbrains text-xs">
            <div className="flex items-center gap-3">
              <Disc className={`w-6 h-6 text-[#D4FF00] ${isPlayingTape ? 'animate-spin' : ''}`} />
              <div>
                <h3 className="font-anton text-xl text-white">CONSOLA ANALÓGICA REBAJADA V3.0</h3>
                <p className="text-zinc-400 text-[10px]">WEB AUDIO HARDWARE SYNTH ENGINE // DECRÉPITO STEREO</p>
              </div>
            </div>

            {/* Console Player Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('synth')}
                className={`px-3 py-1.5 border-2 font-bold transition-all ${
                  activeTab === 'synth'
                    ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                🎛️ SYNTH ENGINE
              </button>
              <button
                onClick={() => setActiveTab('soundcloud')}
                className={`px-3 py-1.5 border-2 font-bold transition-all ${
                  activeTab === 'soundcloud'
                    ? 'bg-[#FF4400] text-white border-black brutal-shadow-black'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                ☁️ SOUNDCLOUD EMBED
              </button>
            </div>
          </div>

          {activeTab === 'synth' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Console Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTape}
                    className={`w-full py-4 font-jetbrains text-sm font-bold border-2 border-black brutal-shadow-black transition-all flex items-center justify-center gap-3 ${
                      isPlayingTape
                        ? 'bg-[#FF4400] text-white hover:bg-red-600'
                        : 'bg-[#D4FF00] text-black hover:bg-lime-400'
                    }`}
                  >
                    {isPlayingTape ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    <span>{isPlayingTape ? 'PAUSAR CONSOLA DE CUMBIA' : 'REPRODUCIR RITMO REBAJADO'}</span>
                  </button>
                </div>

                {/* Hardware Controls */}
                <div className="space-y-4 bg-black p-4 border border-zinc-800 font-jetbrains text-xs">
                  {/* Pitch Slowdown Control */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>PITCH REBAJADA (RPM SPEED):</span>
                      <span className="text-[#D4FF00] font-bold">{(pitch * 100).toFixed(0)}% ({pitch < 1 ? 'SLOW 16 RPM' : 'NORM 33 RPM'})</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.2"
                      step="0.05"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-[#D4FF00] bg-zinc-800 h-2 rounded cursor-pointer"
                    />
                  </div>

                  {/* Master Volume */}
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>VOLUMEN MASTER DE CINTA:</span>
                      <span className="text-[#D4FF00] font-bold">{(volume * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#D4FF00] bg-zinc-800 h-2 rounded cursor-pointer"
                    />
                  </div>

                  {/* Tube Saturation Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-zinc-400">SATURACIÓN DE BULBO ANALÓGICO:</span>
                    <button
                      onClick={() => setTubeSaturation(!tubeSaturation)}
                      className={`px-3 py-1 border text-[10px] font-bold ${
                        tubeSaturation ? 'bg-amber-500 text-black border-black' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {tubeSaturation ? 'CALIDEZ BULBO ON' : 'LIMPIO OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Telemetry VU Meter Display */}
              <div className="lg:col-span-7 bg-black p-4 border-2 border-zinc-800 font-jetbrains space-y-4">
                <div className="flex justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                  <span>SPECTRUM ANALYZER // L+R AUDIO METERS</span>
                  <span className={isPlayingTape ? 'text-[#D4FF00] animate-pulse' : 'text-zinc-600'}>
                    {isPlayingTape ? '● SIGNAL ACTIVE' : '○ STANDBY'}
                  </span>
                </div>

                {/* Animated Spectrum Equalizer Bar Graphs */}
                <div className="h-24 flex items-end justify-between gap-1.5 px-2 bg-zinc-950 border border-zinc-800">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-zinc-800 h-full flex items-end">
                      <div
                        className={`w-full transition-all duration-150 ${
                          i % 3 === 0 ? 'bg-[#FF4400]' : 'bg-[#D4FF00]'
                        }`}
                        style={{
                          height: isPlayingTape
                            ? `${Math.max(15, Math.floor(Math.random() * 95))}%`
                            : '8%'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>FORMATO: 24-BIT FLAC / WAV 48KHZ</span>
                  <span>ESTILO: REBAJADA SUBTERRÁNEA</span>
                </div>
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
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2108495635&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-jetbrains text-xs text-zinc-400 pt-1">
                <div className="text-[11px] text-zinc-300 font-mono truncate">
                  <a
                    href="https://soundcloud.com/sonidodecrepito"
                    title="Sonido Decrépito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4FF00] hover:underline font-bold"
                  >
                    Sonido Decrépito
                  </a>{' '}
                  <span className="text-zinc-600">·</span>{' '}
                  <a
                    href="https://soundcloud.com/sonidodecrepito/sets/ecos"
                    title="Ecos - Sonido decrépito - Cumbia Sound"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-white"
                  >
                    Ecos - Sonido decrépito - Cumbia Sound
                  </a>
                </div>
                <a
                  href="https://soundcloud.com/sonidodecrepito/sets/ecos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF4400] hover:underline flex items-center gap-1 font-bold shrink-0 text-xs"
                >
                  ABRIR PLAYLIST EN SOUNDCLOUD ↗
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
                className="bg-zinc-900 border-2 border-zinc-800 p-4 brutal-shadow-black hover:border-[#D4FF00] transition-all flex flex-col justify-between group"
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
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
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
                            (release.status === 'Disponible' || release.status === 'GRATIS') ? 'bg-[#FF4400] text-white' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {release.status === 'Disponible' ? 'GRATIS' : release.status}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                {/* Release Meta */}
                <div>
                  <div className="flex justify-between items-center font-jetbrains text-[10px] text-zinc-500 mb-1">
                    <span>AÑO: {release.year}</span>
                    <span>{release.tracksCount} TRACKS ({release.duration || 'EP'})</span>
                  </div>
                  <h4 className="font-anton text-lg text-white group-hover:text-[#D4FF00] transition-colors">
                    {release.title}
                  </h4>
                  <p className="font-space-grotesk text-xs text-zinc-400 mt-1">
                    {release.subtitle}
                  </p>
                </div>
              </div>

              {/* Platform Action Links */}
              <div className="pt-4 border-t border-zinc-800 mt-4 space-y-1.5 font-jetbrains text-xs">
                {release.bandcampUrl && (
                  <a
                    href={release.bandcampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#D4FF00] text-black font-bold py-1.5 border border-black hover:bg-[#FF4400] hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>BANDCAMP ALBUM ↗</span>
                  </a>
                )}

                {release.soundcloudUrl && (
                  <a
                    href={release.soundcloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 py-1.5 border border-zinc-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>SOUNDCLOUD ↗</span>
                  </a>
                )}

                {release.youtubeUrl && (
                  <a
                    href={release.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-zinc-900 text-zinc-400 hover:text-[#D4FF00] py-1 border border-zinc-800 transition-all flex items-center justify-center gap-1 text-[11px]"
                  >
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span>VER EN YOUTUBE ↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
