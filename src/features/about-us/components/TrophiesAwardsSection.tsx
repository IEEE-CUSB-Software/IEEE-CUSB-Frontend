import { motion } from 'framer-motion';
import { useAwards } from '@/shared/queries/awards';
import TrophyCard from './TrophyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
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
              Achievements Hall
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
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
<<<<<<< awards-admin
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
=======
          
            <div className=" relative w-full p-10 min-h-[400px]">
            <button
              className={`prev-btn absolute left-2  top-1/2 -translate-y-1/2 z-10 flex-shrink-0 p-2 sm:p-2.5 md:p-3 rounded-full  cursor-pointer
  transition-colors duration-200 ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-white'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
            >
              <HiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <button
              className={`next-btn absolute right-2 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 p-2 sm:p-2.5 md:p-3 rounded-full cursor-pointer
  transition-colors duration-200  ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-white'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
            >
              <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={45}
              slidesPerView={1}
              navigation={{
                nextEl: '.next-btn',
                prevEl: '.prev-btn',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 25 },
                768: { slidesPerView: 2, spaceBetween: 35 },
                1024: { slidesPerView: 3, spaceBetween: 45 },
              }}
              className="!py-8 !px-2 sm:!py-10 sm:!px-5 md:!py-11 md:!px-8 lg:!py-14 lg:!px-10"
            >
              {awards.map((item, i) => (
                <SwiperSlide key={i} style={{ overflow: 'visible' }}>
                  <TrophyCard award={item} darkMode={darkMode ?? false} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
>>>>>>> main
          </motion.div>
        </div>
      </div>
    </section>
  );
};
