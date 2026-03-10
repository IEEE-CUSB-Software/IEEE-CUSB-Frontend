import Lenis from 'lenis';
import { MutableRefObject } from 'react';

/**
 * Initialize Lenis smooth scroll.
 * Pass an optional ref and the Lenis instance will be stored in it so the
 * caller can pause/resume scrolling (e.g. when a modal is open).
 */
export const initSmoothScroll = (
    lenisRef?: MutableRefObject<Lenis | null>
): (() => void) => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    if (lenisRef) {
        lenisRef.current = lenis;
    }

    let rafId: number;
    function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        if (lenisRef) {
            lenisRef.current = null;
        }
    };
};
