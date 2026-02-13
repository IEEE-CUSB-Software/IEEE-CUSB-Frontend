import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

interface SwishUnderlineProps {
    children: string;
}

/**
 * Hand-drawn swish/underline animation component
 * Animates an SVG underline that draws in beneath text
 */
export const SwishUnderline = ({ children }: SwishUnderlineProps) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        // Animate the underline drawing in
        animate(
            'path',
            { pathLength: [0, 1] },
            { duration: 1, delay: 0.8, ease: [0.4, 0.0, 0.2, 1] }
        );
    }, [animate]);

    return (
        <span className="relative inline-block" ref={scope}>
            <span className="relative z-10">{children}</span>
            <svg
                className="absolute left-0 bottom-0 w-full h-4 -mb-2"
                viewBox="0 0 300 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M 5 15 Q 75 5, 150 12 T 295 15"
                    stroke="#00AEEF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                />
            </svg>
        </span>
    );
};
