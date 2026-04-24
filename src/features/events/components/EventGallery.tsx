import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPhotograph, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import type { EventGalleryImage } from '@/shared/types/events.types';

interface EventGalleryProps {
  images: EventGalleryImage[];
  darkMode?: boolean;
}

export const EventGallery = ({ images, darkMode }: EventGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`rounded-2xl shadow-lg p-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-indigo-900/40' : 'bg-indigo-50'
            }`}
          >
            <HiPhotograph
              className={`w-6 h-6 ${
                darkMode ? 'text-indigo-300' : 'text-indigo-600'
              }`}
            />
          </div>
          <h2
            className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Gallery
          </h2>
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {images.length} photo{images.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              onClick={() => openLightbox(index)}
              className="relative group overflow-hidden rounded-xl aspect-square focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src={image.image_url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (() => {
          const idx = selectedIndex;
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                >
                  <HiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                >
                  <HiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.img
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={images[idx]!.image_url}
              alt={`Gallery ${idx + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={e => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
              {idx + 1} / {images.length}
            </div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
};
