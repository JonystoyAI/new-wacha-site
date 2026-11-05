import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume1, Volume2, VolumeX, Radio, ChevronUp, ChevronDown, ExternalLink, Disc } from 'lucide-react';

interface SoundCloudGlobalPlayerProps {
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const SoundCloudGlobalPlayer: React.FC<SoundCloudGlobalPlayerProps> = ({
  audioActive,
  onToggleAudio
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85);
  const [currentTrackTitle, setCurrentTrackTitle] = useState<string>('Decrépito Papu // Playlist Oficial');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<any>(null);

  const playlistUrl = "https://soundcloud.com/sonidodecrepito/sets/decrepito-papu";
  const shareShortlink = "https://on.soundcloud.com/485W8PONR0OfSHWVVj";
  const embedSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(playlistUrl)}&color=%23d4ff00&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;

  // Initialize SoundCloud Widget API and handle Autoplay
  useEffect(() => {
    let checkInterval: any = null;

    const setupWidget = () => {
      if (!iframeRef.current) return;
      const SC = (window as any).SC;

      if (SC && SC.Widget) {
        try {
          const widget = SC.Widget(iframeRef.current);
          widgetRef.current = widget;

          widget.bind(SC.Widget.Events.READY, () => {
            // Unmute / set initial volume
            widget.setVolume(audioActive ? volume : 0);
            widget.play();
            setIsPlaying(true);

            widget.getCurrentSound((sound: any) => {
              if (sound && sound.title) {
                setCurrentTrackTitle(sound.title);
              }
            });
          });

          widget.bind(SC.Widget.Events.PLAY, () => {
            setIsPlaying(true);
            widget.getCurrentSound((sound: any) => {
              if (sound && sound.title) {
                setCurrentTrackTitle(sound.title);
              }
            });
          });

          widget.bind(SC.Widget.Events.PAUSE, () => {
            setIsPlaying(false);
          });

          widget.bind(SC.Widget.Events.FINISH, () => {
            setIsPlaying(false);
          });
        } catch (e) {
          // Fallback if widget script is still loading
        }
      }
    };

    // If SC script is already present, setup immediately, else poll for up to 5 seconds
    if ((window as any).SC && (window as any).SC.Widget) {
      setupWidget();
    } else {
      let attempts = 0;
      checkInterval = setInterval(() => {
        attempts++;
        if ((window as any).SC && (window as any).SC.Widget) {
          setupWidget();
          clearInterval(checkInterval);
        } else if (attempts > 20) {
          clearInterval(checkInterval);
        }
      }, 250);
    }

    // Modern Browser Autoplay Policy Fallback:
    // If the browser blocks unmuted sound until user interaction, start on first click/touch
    const handleFirstInteraction = () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.isPaused((paused: boolean) => {
            if (paused) {
              widgetRef.current.play();
              setIsPlaying(true);
            }
          });
        } catch {}
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        } catch {}
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Sync Volume / Mute with Audio active and Volume changes
  useEffect(() => {
    const vol = audioActive ? volume : 0;
    if (widgetRef.current) {
      try {
        widgetRef.current.setVolume(vol);
      } catch {}
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'setVolume', value: vol }),
          '*'
        );
      } catch {}
    }
  }, [audioActive, volume]);

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && !audioActive) {
      onToggleAudio();
    } else if (newVol === 0 && audioActive) {
      onToggleAudio();
    }
    if (widgetRef.current) {
      try {
        widgetRef.current.setVolume(newVol);
      } catch {}
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'setVolume', value: newVol }),
          '*'
        );
      } catch {}
    }
  };

  const togglePlayPause = () => {
    if (widgetRef.current) {
      try {
        widgetRef.current.toggle();
        setIsPlaying(!isPlaying);
      } catch {
        // Fallback postMessage
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ method: isPlaying ? 'pause' : 'play' }),
            '*'
          );
          setIsPlaying(!isPlaying);
        }
      }
    }
  };

  return (
    <aside
      aria-label="Reproductor global de SoundCloud"
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-md font-jetbrains"
    >
      <div className="bg-black text-white border-2 border-black dark:border-[#D4FF00] brutal-shadow-black overflow-hidden transition-all duration-200">
        {/* Header Bar */}
        <div className="px-3 py-2 bg-zinc-950 flex items-center justify-between gap-2 border-b border-zinc-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2.5 h-2.5 bg-[#FF4400] animate-pulse shrink-0"></span>
            <div className="flex items-center gap-1.5 text-xs font-bold truncate">
              <span className="text-[#D4FF00]">SOUNDCLOUD //</span>
              <span className="truncate text-white text-[11px] font-mono">{currentTrackTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Play / Pause toggle */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="p-1.5 bg-[#D4FF00] text-black hover:bg-white font-bold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer text-xs"
              title={isPlaying ? "Pausar playlist SoundCloud" : "Reproducir playlist SoundCloud"}
              aria-label={isPlaying ? "Pausar playlist" : "Reproducir playlist"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Mute and Volume Moderator Control */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5">
              <button
                type="button"
                onClick={onToggleAudio}
                className={`p-1 font-bold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer text-xs ${
                  audioActive ? 'text-[#00E599] hover:text-white' : 'text-red-400 hover:text-red-300'
                }`}
                title={audioActive ? "Silenciar audio" : "Activar sonido"}
                aria-label={audioActive ? "Silenciar audio" : "Activar sonido"}
              >
                {audioActive && volume > 0 ? (
                  volume > 50 ? <Volume2 className="w-3.5 h-3.5" /> : <Volume1 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                )}
              </button>

              {/* Volume Slider to moderate sound level */}
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={audioActive ? volume : 0}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                className="w-14 sm:w-20 h-1.5 accent-[#D4FF00] bg-zinc-800 rounded cursor-pointer"
                title={`Nivel de volumen: ${audioActive ? volume : 0}%`}
                aria-label="Moderador de volumen de SoundCloud"
              />
              <span className="text-[10px] font-mono text-zinc-300 w-6 text-right select-none font-bold">
                {audioActive ? volume : 0}%
              </span>
            </div>

            {/* External link */}
            <a
              href={shareShortlink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-zinc-800 hover:bg-[#FF4400] text-white transition-colors text-xs"
              title="Abrir playlist en SoundCloud (https://on.soundcloud.com/485W8PONR0OfSHWVVj)"
              aria-label="Abrir playlist en SoundCloud"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Expand / Collapse toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer text-xs"
              title={isExpanded ? "Ocultar panel detallado" : "Ver reproductor completo"}
              aria-label={isExpanded ? "Ocultar panel" : "Ver reproductor"}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable / Collapsible Container (Persistent iframe to prevent reload on toggle) */}
        <div className={`bg-black transition-all duration-200 overflow-hidden ${isExpanded ? 'p-2 max-h-96' : 'h-0 p-0 max-h-0'}`}>
          <div className="w-full bg-black border border-zinc-800 overflow-hidden">
            <iframe
              ref={iframeRef}
              id="global-soundcloud-iframe"
              width="100%"
              height="200"
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media"
              src={embedSrc}
              title="SoundCloud Playlist Oficial Decrépito Papu"
            />
          </div>

          {/* Expanded Volume Master Fader */}
          <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2 text-zinc-300">
              <Volume2 className="w-4 h-4 text-[#D4FF00]" />
              <span className="font-bold text-[11px] font-mono">VOLUMEN MASTER:</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={audioActive ? volume : 0}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                className="w-28 sm:w-40 h-2 accent-[#D4FF00] bg-zinc-800 rounded cursor-pointer"
                aria-label="Moderador de volumen de SoundCloud expandido"
              />
              <span className="font-mono text-[#D4FF00] font-bold text-xs w-9 text-right">
                {audioActive ? volume : 0}%
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>PLAYLIST OFICIAL // DECRÉPITO PAPÚ</span>
            <a
              href={shareShortlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4FF00] hover:underline"
            >
              on.soundcloud.com/485W8PONR0OfSHWVVj ↗
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
