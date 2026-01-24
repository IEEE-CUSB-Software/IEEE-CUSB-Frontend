import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Reusable scroll-based reveal animation component
 * Fades in and slides up when entering viewport
 */
export const SectionReveal = ({
    children,
    delay = 0,
    className = '',
}: SectionRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Respect reduced motion
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <motion.div
            ref={ref}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
            animate={
                prefersReducedMotion
                    ? {}
                    : isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 50 }
            }
            transition={{
                duration: 0.6,
                delay,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
