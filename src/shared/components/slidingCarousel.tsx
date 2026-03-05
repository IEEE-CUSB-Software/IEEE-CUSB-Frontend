import React from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import useSlidingCarousel from '../hooks/useSlidingCarousel';

interface SlidingCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  darkMode?: boolean;
}

export default function SlidingCarousel<T>({
  items,
  renderItem,
  darkMode,
}: SlidingCarouselProps<T>) {
  const {
    clonedItems,
    trackWidthPercent,
    cardWidthPercent,
    trackXPercent,
    isInstant,
    pageIndex,
    dotCount,
    handleNext,
    handlePrev,
    goToIndex,
    handleAnimationComplete,
  } = useSlidingCarousel(items);

  if (items.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center gap-6">
      {/* Left Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className={`flex-shrink-0 p-3 rounded-full ${
          darkMode
            ? 'bg-info/20 hover:bg-info/30 text-info'
            : 'bg-info/15 hover:bg-info/25 text-info'
        }`}
      >
        <HiChevronLeft className="w-8 h-8" />
      </motion.button>

      {/* Container: background + padding + clips overflow */}
      <div
        className={`relative flex-1 rounded-3xl p-8 overflow-hidden ${
          darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'
        }`}
      >
        <div className="overflow-hidden w-full">
          {/* Sliding track */}
          <motion.div
            className="flex"
            style={{ width: `${trackWidthPercent}%` }}
            animate={{ x: `${trackXPercent}%` }}
            transition={
              isInstant
                ? { duration: 0 }
                : { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {clonedItems.map((item, i) => (
              <div
                key={i}
                style={{
                  width: `${cardWidthPercent}%`,
                  flexShrink: 0,
                  padding: '0 1rem',
                  boxSizing: 'border-box',
                }}
              >
                {renderItem(item, i % items.length)}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className={`flex-shrink-0 p-3 rounded-full ${
          darkMode
            ? 'bg-info/20 hover:bg-info/30 text-info'
            : 'bg-info/15 hover:bg-info/25 text-info'
        }`}
      >
        <HiChevronRight className="w-8 h-8" />
      </motion.button>

      {/* Dot indicators */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: dotCount }).map((_, idx) => (
          <motion.button
            key={idx}
            layout
            onClick={() => goToIndex(idx)}
            className="h-2 rounded-full"
            animate={{
              width: idx === pageIndex ? 32 : 8,
              backgroundColor:
                idx === pageIndex ? 'var(--color-info)' : 'var(--color-border)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        ))}
      </div>
    </div>
  );
}
