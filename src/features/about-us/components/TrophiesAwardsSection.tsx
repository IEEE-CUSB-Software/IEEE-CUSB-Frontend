import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiGlobe, HiUserGroup, HiStar, HiCode } from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Award {
  icon: React.ElementType;
  title: string;
  year: string;
  description: string;
  color: string;
  won: string;
}

const awards: Award[] = [
  {
    icon: HiTrophy,
    title: 'Best Student Branch',
    year: 'EGYPT SECTION • 2019',
    description:
      'Ranked for exceptional performance in organizing technical events and member engagement across Egypt, Middle East, and Africa.',
    color: 'text-yellow-500',
    won: 'twice',
  },
  {
    icon: HiGlobe,
    title: 'Global Website Award',
    year: 'GLOBAL • 2021',
    description:
      'Recognized for outstanding website design, content accessibility, and user experience among all IEEE student branches worldwide.',
    color: 'text-blue-500',
    won: '3 times',
  },
  {
    icon: HiUserGroup,
    title: 'Exemplary Volunteer',
    year: 'REGION 8 • 2020',
    description:
      'Honoring the collective effort of our volunteers in community service and STEM outreach programs at local schools.',
    color: 'text-purple-500',
    won: '',
  },
  {
    icon: HiStar,
    title: 'Membership Growth',
    year: 'EGYPT AWARDS • 2018',
    description:
      'Achieved the highest percentage increase in student membership within the Egypt Section for the fiscal year.',
    color: 'text-orange-500',
    won: 'Won once',
  },
  {
    icon: HiCode,
    title: 'IEEE Xtreme Top 100',
    year: 'GLOBAL • 2021',
    description:
      'Our coding teams ranked within the top 100 globally out of 4500+ teams in the 24-hour programming challenge.',
    color: 'text-green-500',
    won: '',
  },
];

function useItemsPerView() {
  const getItems = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItems);

  useEffect(() => {
    const handler = () => setItemsPerView(getItems());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return itemsPerView;
}
interface TrophiesAwardsSectionProps {
  darkMode?: boolean;
}

export const TrophiesAwardsSection = ({
  darkMode,
}: TrophiesAwardsSectionProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const itemsPerView = useItemsPerView();

  useEffect(() => {
    const maxIndex = awards.length - itemsPerView;
    if (carouselIndex > maxIndex) {
      setCarouselIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, carouselIndex]);

  const maxIndex = awards.length - itemsPerView;

  const handlePrev = () => {
    setDirection('right');
    setCarouselIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setDirection('left');
    setCarouselIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const getVisibleAwards = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(awards[(carouselIndex + i) % awards.length]);
    }
    return visible;
  };

  const gridClass =
    itemsPerView === 1
      ? 'grid-cols-1'
      : itemsPerView === 2
        ? 'grid-cols-2'
        : 'grid-cols-3';

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
              className={`text-3xl md:text-4xl font-bold mb-8 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Trophies and Awards
            </h3>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 18,
              }}
              className={`flex-shrink-0 p-3 rounded-full  ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-info'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
            >
              <HiChevronLeft className="w-8 h-8" />
            </motion.button>

            {/* Trophy Shelf */}
            <div
              className={`relative flex-1 rounded-3xl p-8 overflow-visible ${
                darkMode ? 'bg-gray-800/40' : 'bg-gray-50/50'
              }`}
            >
              <div
                className={`absolute top-[255px] left-0 right-0 h-9 rounded-xl ${
                  darkMode
                    ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                    : 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                } 
                    shadow-[0_14px_18px_-8px_rgba(0,0,0,0.6)]
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-gradient-to-b before:from-transparent before:to-black/30`}
              ></div>

              {/* Trophy Carousel Grid — responsive column count */}
              <div className={`grid ${gridClass} gap-8 relative z-10`}>
                {getVisibleAwards().map((award, index) => (
                  <motion.div
                    key={`${award.title}-${carouselIndex}-${index}`}
                    initial={{
                      opacity: 0,
                      x: direction === 'left' ? -300 : 300,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: direction === 'left' ? 300 : -300,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                      ease: 'easeInOut',
                    }}
                    className="flex flex-col items-center pt-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center w-full"
                    >
                      {/* Trophy Image */}
                      <motion.div
                        className={`relative  rounded-lg overflow-hidden  `}
                      >
                        <img
                          src="/src/assets/trophy.png"
                          alt={award.title}
                          className="w-40 h-48 object-cover"
                        />
                      </motion.div>

                      {/* Trophy Info*/}
                      <div className="text-center w-full ">
                        <motion.h4
                          initial={{ backgroundPosition: '0% center' }}
                          whileHover={{
                            backgroundPosition: '100% center',
                          }}
                          transition={{
                            duration: 2.5,
                            ease: 'linear',
                          }}
                          className="text-lg font-bold mb-2 bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(
                            105deg,
                            var(--color-primary)            0%,
                            var(--color-info)               20%,
                            var(--color-primary)            35%,
                            var(--color-primary-foreground) 50%,
                            var(--color-primary)            65%,
                            var(--color-info)               80%,
                            var(--color-primary)            100%
                          )`,
                            backgroundSize: '300% 100%',
                          }}
                        >
                          {award.title}
                        </motion.h4>
                        <div className="text-sm font-semibold tracking-wide text-info uppercase mb-2 pt-2 line-clamp-1">
                          {award.won
                            ? `${award.year} • ${award.won}`
                            : award.year}
                        </div>
                        <p
                          className={`text-xs leading-relaxed line-clamp-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {award.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 18,
              }}
              className={`flex-shrink-0 p-3 rounded-full ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-info'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
            >
              <HiChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Carousel Indicators - Below */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: awards.length - itemsPerView + 1 }).map(
                (_, idx) => (
                  <motion.button
                    key={idx}
                    layout
                    onClick={() => setCarouselIndex(idx)}
                    className="h-2 rounded-full"
                    animate={{
                      width: idx === carouselIndex ? 32 : 8,
                      backgroundColor:
                        idx === carouselIndex
                          ? 'var(--color-info)'
                          : 'var(--color-border)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
