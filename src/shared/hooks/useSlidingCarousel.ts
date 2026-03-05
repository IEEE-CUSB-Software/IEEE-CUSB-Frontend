import { useState, useEffect, useRef, useCallback } from 'react';

const getItemsPerView = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

export function useSlidingCarousel<T>(items: T[]) {
  const [itemsPerView, setItemsPerView] = useState<number>(getItemsPerView);
  const [internalIndex, setInternalIndex] = useState(items.length);
  const [isInstant, setIsInstant] = useState(false);
  const internalIndexRef = useRef(internalIndex);

  // Keep ref in sync for use inside animation complete handler
  useEffect(() => {
    internalIndexRef.current = internalIndex;
  }, [internalIndex]);

  // Listen for breakpoint changes
  useEffect(() => {
    const handler = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Reset to middle copy when breakpoint or items change
  useEffect(() => {
    setInternalIndex(items.length);
    setIsInstant(true);
  }, [itemsPerView, items.length]);

  // Re-enable animation one frame after an instant jump
  useEffect(() => {
    if (!isInstant) return;
    const id = requestAnimationFrame(() => setIsInstant(false));
    return () => cancelAnimationFrame(id);
  }, [isInstant]);

  // --- Derived calculations ---
  const clonedItems = [...items, ...items, ...items];
  const total = clonedItems.length;
  const trackWidthPercent = (total / itemsPerView) * 100;
  const cardWidthPercent = 100 / total;
  const trackXPercent = -((internalIndex / total) * 100);

  const maxPage = Math.max(0, items.length - itemsPerView);
  const rawPage = internalIndex - items.length;
  const pageIndex = Math.min(
    Math.max(((rawPage % items.length) + items.length) % items.length, 0),
    maxPage
  );
  const dotCount = maxPage + 1;

  // --- Handlers ---
  const handleNext = useCallback(() => {
    setInternalIndex(prev => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setInternalIndex(prev => prev - 1);
  }, []);

  const goToIndex = useCallback(
    (idx: number) => {
      setIsInstant(false);
      setInternalIndex(items.length + idx);
    },
    [items.length]
  );

  // Called by onAnimationComplete — silently jumps from clone back to real copy
  const handleAnimationComplete = useCallback(() => {
    if (isInstant) return;
    const idx = internalIndexRef.current;
    if (idx >= items.length * 2) {
      setInternalIndex(i => i - items.length);
      setIsInstant(true);
    } else if (idx < items.length) {
      setInternalIndex(i => i + items.length);
      setIsInstant(true);
    }
  }, [isInstant, items.length]);

  return {
    // Track animation
    clonedItems,
    trackWidthPercent,
    cardWidthPercent,
    trackXPercent,
    isInstant,
    // Dots
    pageIndex,
    dotCount,
    // Handlers
    handleNext,
    handlePrev,
    goToIndex,
    handleAnimationComplete,
  } as const;
}

export default useSlidingCarousel;
