import React from 'react';
import { X, Youtube, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, title, onClose }) => {
  if (!videoUrl) return null;

  // Extract YouTube ID if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return `https://www.youtube.com/embed/${url}?autoplay=1`;
  };

  const embedSrc = getEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121411] border-4 border-black w-full max-w-4xl p-4 sm:p-6 brutal-shadow-lime space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 font-jetbrains">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            <h3 className="font-anton text-xl text-white truncate max-w-xl">
              {title || 'VIDEO DESTACADO WACHA MULTIMEDIA'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 focus:outline-none"
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Embed */}
        <div className="relative aspect-video bg-black border-2 border-zinc-800 overflow-hidden">
          <iframe
            className="w-full h-full"
            src={embedSrc}
            title={title || 'YouTube Video Player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-jetbrains text-xs text-zinc-400">
          <span>SISTEMA DE RETENCIÓN DE VIDEO WACHA MULTIMEDIA</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#D4FF00] text-black font-bold border border-black hover:bg-[#FF4400] hover:text-white transition-all"
          >
            [ CERRAR REPRODUCTOR ]
          </button>
        </div>
      </div>
    </div>
  );
};
