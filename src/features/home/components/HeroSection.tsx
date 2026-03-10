import { motion } from 'framer-motion';
import { SwishUnderline } from './SwishUnderline';
import { FeatureCard } from './FeatureCard';
import { SponsorsMarquee } from './SponsorsMarquee';
import { LightRays } from '@/shared/components/ui/LightRays';
import { FloatingParticles } from '@/shared/components/ui/FloatingParticles';
import { HiUsers, HiLightningBolt, HiGlobeAlt } from 'react-icons/hi';

interface HeroSectionProps {
  activeCardIndex: number;
  onCardExpand: (index: number) => void;
}

export const HeroSection = ({
  activeCardIndex,
  onCardExpand,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center bg-background overflow-hidden md:-mt-32">
      {/* ── Light Rays Background ── */}
      <LightRays
        backgroundColor="var(--color-background)"
        raysColor={{ mode: 'multi', color1: '#00529b', color2: '#00aeef' }}
        rayCount={14}
        opacity={0.75}
        style={{ zIndex: 0 }}
      />

      {/* ── Floating Particles ── */}
      <FloatingParticles count={24} color="var(--color-info)" className="z-1" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-16 pb-8 md:pt-32 md:pb-16 flex-1 flex flex-col justify-center">
        {/* Split Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="mb-3"
            >
              <span className="text-xs font-bold tracking-widest text-info uppercase">
                Student Innovation • Technology • Community
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
            >
              Discover the <SwishUnderline>power</SwishUnderline> of engineering
              on your terms
            </motion.h1>
          </div>

          {/* Right Column - Description & CTA */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-base md:text-lg text-text-muted leading-relaxed mb-6"
            >
              Join IEEE Cairo University Student Branch and unlock opportunities
              for professional growth, technical excellence, and innovation.
            </motion.p>

            {/* Pill CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="flex items-center gap-4"
            >
              <motion.a
                href="#join"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl group"
              >
                <span>Join IEEE CUSB</span>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-border text-foreground hover:bg-surface transition-all"
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards - Auto-Expanding Flex Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
          className="flex gap-4"
        >
          <FeatureCard
            variant="main"
            title="Student Community"
            description="Join 500+ engineering students advancing technology through collaborative projects."
            bgPattern="waves1"
            icon={<HiUsers />}
            index={0}
            activeIndex={activeCardIndex}
            onExpand={onCardExpand}
            delay={0}
          />
          <FeatureCard
            variant="secondary"
            title="Technical Excellence"
            description="World-class workshops in AI, robotics, and emerging technologies."
            bgPattern="waves2"
            icon={<HiLightningBolt />}
            index={1}
            activeIndex={activeCardIndex}
            onExpand={onCardExpand}
            delay={0.1}
          />
          <FeatureCard
            variant="secondary"
            title="Global Network"
            description="Connect with 400,000+ IEEE members across 160 countries."
            bgPattern="waves3"
            icon={<HiGlobeAlt />}
            index={2}
            activeIndex={activeCardIndex}
            onExpand={onCardExpand}
            delay={0.2}
          />
        </motion.div>

        {/* ── Sponsors Marquee ── */}
        <SponsorsMarquee />
      </div>
    </section>
  );
};
