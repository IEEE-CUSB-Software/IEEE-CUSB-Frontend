import { useState, useEffect, useCallback } from 'react';

const getItemsPerView = (): number => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

export function useSlidingCarousel<T>(items: T[]) {
  const [itemsPerView, setItemsPerView] = useState<number>(getItemsPerView);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handler = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Reset index on breakpoint change
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, items.length - itemsPerView);
  const dotCount = maxIndex + 1;

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToIndex = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  const trackWidthPercent = (items.length / itemsPerView) * 100;
  const cardWidthPercent = 100 / items.length;
  const trackXPercent = -((currentIndex / items.length) * 100);

  return {
    items,
    trackWidthPercent,
    cardWidthPercent,
    trackXPercent,
    pageIndex: currentIndex,
    dotCount,
    handleNext,
    handlePrev,
    goToIndex,
  } as const;
}

export default useSlidingCarousel;
