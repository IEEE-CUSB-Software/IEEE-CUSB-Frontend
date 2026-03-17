import { motion } from 'framer-motion';
import { useAwards } from '@/shared/queries/awards';
import TrophyCard from './TrophyCard';
import SlidingCarousel from '../../../shared/components/slidingCarousel';

interface TrophiesAwardsSectionProps {
  darkMode?: boolean;
}

export const TrophiesAwardsSection = ({
  darkMode,
}: TrophiesAwardsSectionProps) => {
  const { data: awards = [], isLoading } = useAwards();

  return (
    <section
      className={`py-12 md:py-24 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Trophy Shelf */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="text-sm font-bold tracking-widest text-info uppercase mb-3">
              Achievments Hall
            </div>
            <h3
              className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Trophies and Awards
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {isLoading ? (
              <div
                className={`flex items-center justify-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <p className="text-sm">Loading awards…</p>
              </div>
            ) : awards.length > 0 ? (
              <SlidingCarousel
                items={awards}
                darkMode={darkMode}
                renderItem={award => (
                  <TrophyCard award={award} darkMode={darkMode || false} />
                )}
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
