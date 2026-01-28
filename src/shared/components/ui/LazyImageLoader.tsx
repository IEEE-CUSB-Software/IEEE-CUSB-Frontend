import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
}

export const LazyImageLoader: React.FC<LazyImageLoaderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};
