import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../types';

interface Props {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: Props) {
  const image = images[currentIndex];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-stone-800/60 hover:bg-stone-700 rounded-full p-2 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-stone-800/60 hover:bg-stone-700 rounded-full p-3 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center gap-4 px-16 max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.title}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
        />
        <div className="text-center">
          <p className="text-white font-medium text-lg">{image.title}</p>
          {image.description && <p className="text-stone-400 text-sm mt-1">{image.description}</p>}
          <p className="text-stone-500 text-xs mt-2">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-stone-800/60 hover:bg-stone-700 rounded-full p-3 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
