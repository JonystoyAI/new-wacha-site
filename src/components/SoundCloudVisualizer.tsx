import React, { useEffect, useRef, useState } from 'react';
import { Activity, Radio, Volume2, Sparkles, Maximize2, X } from 'lucide-react';

interface SoundCloudVisualizerProps {
  isPlaying: boolean;
  audioActive: boolean;
  currentTrackTitle?: string;
  onClose?: () => void;
}

export const SoundCloudVisualizer: React.FC<SoundCloudVisualizerProps> = ({
  isPlaying,
  audioActive,
  currentTrackTitle = 'Decrépito Papu // Cumbia Rebajada',
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState<boolean>(false);
  const [visualMode, setVisualMode] = useState<'bars' | 'wave' | 'pulse'>('bars');

  // Initialize Web Audio API Analyser & Synthesized Reactive Audio for Visualizer
  const initWebAudio = () => {
    if (isAudioInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      // Create subtle low-frequency sub-bass oscillator synced with cumbia tempo (e.g. 80 BPM ambient pulse)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      // Cumbia sub bass frequency (approx 55Hz - 110Hz)
      osc.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 note
      
      const gain = ctx.createGain();
      // Keep gain extremely low or muted if audioActive is false, so it acts as visual driver
      gain.gain.setValueAtTime(audioActive && isPlaying ? 0.05 : 0.0, ctx.currentTime);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      
      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      setIsAudioInitialized(true);
    } catch (e) {
      console.warn('Web Audio API initialization note:', e);
    }
  };

  // Sync Gain with isPlaying and audioActive
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        const targetGain = audioActive && isPlaying ? 0.04 : 0.0;
        gainNodeRef.current.gain.setValueAtTime(targetGain, audioContextRef.current.currentTime);
      } catch {}
    }
  }, [isPlaying, audioActive]);

  // Canvas Animation Loop for Web Audio Analyser
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const renderVisualizer = () => {
      animationFrameId = requestAnimationFrame(renderVisualizer);

      if (analyserRef.current && isPlaying && audioActive) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Fallback gentle wave simulation when paused or muted
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.floor(20 + Math.sin(Date.now() * 0.005 + i * 0.2) * 15);
        }
      }

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      if (visualMode === 'bars') {
        const barWidth = (width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.9;

          // Gradient color: #D4FF00 to #00E5FF
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#00E5FF');
          gradient.addColorStop(0.7, '#D4FF00');
          gradient.addColorStop(1, '#FF4400');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

          x += barWidth + 1;
        }
      } else if (visualMode === 'wave') {
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#D4FF00';
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      } else {
        // Pulse circle mode
        const centerX = width / 2;
        const centerY = height / 2;
        const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        const radius = Math.min(centerX, centerY) * 0.3 + (avg / 255) * 40;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(212, 255, 0, 0.15)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00E5FF';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
        ctx.strokeStyle = '#D4FF00';
        ctx.stroke();
      }
    };

    renderVisualizer();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, audioActive, visualMode]);

  return (
    <div className="bg-black border-2 border-[#D4FF00] p-3 text-white brutal-shadow-lime font-jetbrains max-w-sm w-full">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D4FF00] animate-pulse" />
          <span className="font-anton text-xs uppercase tracking-wider text-[#D4FF00]">
            WEB AUDIO API // VISUALIZADOR REACTIVO
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setVisualMode(visualMode === 'bars' ? 'wave' : visualMode === 'wave' ? 'pulse' : 'bars')}
            className="px-1.5 py-0.5 bg-zinc-900 hover:bg-[#00E5FF] hover:text-black border border-zinc-700 text-[10px] font-mono transition-all cursor-pointer"
            title="Cambiar modo de visualización"
          >
            MODO: {visualMode.toUpperCase()}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="py-2 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="truncate max-w-[200px] text-zinc-200">🎵 {currentTrackTitle}</span>
          <span className={isPlaying && audioActive ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
            {isPlaying && audioActive ? '● SYNCED' : '○ PAUSED'}
          </span>
        </div>

        {/* Canvas Visualizer */}
        <div className="relative bg-zinc-950 border border-zinc-800 overflow-hidden h-28">
          <canvas
            ref={canvasRef}
            width={320}
            height={110}
            className="w-full h-full object-cover"
          />

          {!isAudioInitialized && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2">
              <button
                type="button"
                onClick={initWebAudio}
                className="px-3 py-1.5 bg-[#D4FF00] text-black font-bold text-xs border border-black hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVAR MOTOR WEB AUDIO</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span>ANALYSER FFT: 128 BINS</span>
        <span className="text-[#00E5FF]">SONIDO DECREPITO 2026</span>
      </div>
    </div>
  );
};
