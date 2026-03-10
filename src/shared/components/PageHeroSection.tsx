import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeroSectionProps {
  /** Small uppercase eyebrow label above the title */
  eyebrow: string;
  /** Main heading — accepts strings or JSX (e.g. with SwishUnderline) */
  title: ReactNode;
  /** Supporting paragraph text */
  description: string;
  /** Optional extra content rendered below the description */
  children?: ReactNode;
}

/**
 * Generic page-level hero section.
 *
 * Mobile  — flows naturally from the top with a small top padding.
 *           MobileNavbar is at the bottom so no large clearance is needed.
 * Desktop — uses the md:-mt-32 overlap trick so the section slides behind
 *           the fixed navbar, then md:pt-32 clears the navbar content area.
 */
export const PageHeroSection = ({
  eyebrow,
  title,
  description,
  children,
}: PageHeroSectionProps) => {
  return (
    <section className="relative px-6 bg-background pt-16 pb-8 md:h-[60vh] md:flex md:items-center md:-mt-32">
      <div className="max-w-7xl mx-auto w-full md:pt-32 md:pb-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mb-3"
        >
          <span className="text-xs font-bold tracking-widest text-info uppercase">
            {eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 max-w-3xl"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>

        {/* Slot for page-specific extras (CTAs, feature cards, etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Decorative dot grid */}
      <div className="absolute top-16 right-12 w-32 h-32 opacity-20 hidden sm:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(25)].map((_, i) => (
            <circle
              key={i}
              cx={(i % 5) * 25 + 12.5}
              cy={Math.floor(i / 5) * 25 + 12.5}
              r="2"
              fill="currentColor"
              className="text-primary"
            />
          ))}
        </svg>
      </div>
    </section>
  );
};
