import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useAwards } from '@/shared/queries/awards';
import TrophyCard from './TrophyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

interface TrophiesAwardsSectionProps {
  darkMode?: boolean;
}

export const TrophiesAwardsSection = ({
  darkMode,
}: TrophiesAwardsSectionProps) => {
  const { data: awards = [], isLoading } = useAwards();
  const swiperRef = useRef<SwiperType | null>(null);

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
              Achievements Hall
            </div>
            <div className="flex items-center justify-between">
              <h3
                className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              >
                Trophies and Awards
              </h3>
              <NavLink
                to="/awards"
                className="text-primary font-semibold hover:underline"
              >
                View All Trophies →
              </NavLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {isLoading ? (
              <div
                className={`flex items-center justify-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <p className="text-sm">Loading awards…</p>
              </div>
            ) : awards.length > 0 ? (
              <div className="relative">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                  slidesPerView={2}
                  spaceBetween={16}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={awards.length > 3}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  }}
                  className="!pb-4"
                >
                  {awards.map(award => (
                    <SwiperSlide key={award.id}>
                      <TrophyCard award={award} darkMode={darkMode || false} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom nav buttons */}
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
