import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiGlobe,
  HiUserGroup,
  HiStar,
  HiTrendingUp,
  HiCode,
} from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Award {
  icon: React.ElementType;
  title: string;
  year: string;
  description: string;
  color: string;
}

const awards: Award[] = [
  {
    icon: HiTrophy,
    title: 'Best Student Branch',
    year: 'EGYPT SECTION • 2019',
    description:
      'Ranked for exceptional performance in organizing technical events and member engagement across Egypt, Middle East, and Africa.',
    color: 'text-yellow-500',
  },
  {
    icon: HiGlobe,
    title: 'Global Website Award',
    year: 'GLOBAL • 2021',
    description:
      'Recognized for outstanding website design, content accessibility, and user experience among all IEEE student branches worldwide.',
    color: 'text-blue-500',
  },
  {
    icon: HiUserGroup,
    title: 'Exemplary Volunteer',
    year: 'REGION 8 • 2020',
    description:
      'Honoring the collective effort of our volunteers in community service and STEM outreach programs at local schools.',
    color: 'text-purple-500',
  },
  {
    icon: HiStar,
    title: 'Membership Growth',
    year: 'EGYPT AWARDS • 2018',
    description:
      'Achieved the highest percentage increase in student membership within the Egypt Section for the fiscal year.',
    color: 'text-orange-500',
  },
  {
    icon: HiCode,
    title: 'IEEE Xtreme Top 100',
    year: 'GLOBAL • 2021',
    description:
      'Our coding teams ranked within the top 100 globally out of 4500+ teams in the 24-hour programming challenge.',
    color: 'text-green-500',
  },
];

interface TrophiesAwardsSectionProps {
  darkMode?: boolean;
}

export const TrophiesAwardsSection = ({
  darkMode,
}: TrophiesAwardsSectionProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const itemsPerView = 3;

  const handlePrev = () => {
    setDirection('right');
    setCarouselIndex(prev =>
      prev === 0 ? awards.length - itemsPerView : prev - 1
    );
  };

  const handleNext = () => {
    setDirection('left');
    setCarouselIndex(prev =>
      prev === awards.length - itemsPerView ? 0 : prev + 1
    );
  };

  const getVisibleAwards = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(awards[(carouselIndex + i) % awards.length]);
    }
    return visible;
  };
  return (
    <section
      className={`py-12 md:py-24 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-xs font-bold tracking-widest text-info uppercase mb-3">
            HALL OF FAME
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className={`text-4xl md:text-5xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Trophies & Awards
            </h2>
            <p
              className={`max-w-xl ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Recognition of our dedication to excellence in technical
              education, volunteering, and website development on a global
              scale.
            </p>
          </div>
        </motion.div>

        {/* New Awards grid */}

        {/* Awards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 h-full border transition-all group ${
                  darkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-info/30 hover:shadow-xl'
                    : 'bg-gradient-to-br from-gray-50 to-white border-gray-100 hover:border-info/30 hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:from-info/10 group-hover:to-info/5 ${
                    darkMode
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                      : 'bg-gradient-to-br from-gray-100 to-gray-50'
                  }`}
                >
                  <award.icon className={`w-7 h-7 ${award.color}`} />
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {award.title}
                  </h3>
                  <div className="text-xs font-semibold tracking-wide text-info uppercase">
                    {award.year}
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {award.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Additional Achievement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: awards.length * 0.1,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-info to-info/90 rounded-2xl p-6 h-full text-white hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <HiTrendingUp className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">More Achievements</h3>
                  <div className="text-xs font-semibold tracking-wide uppercase opacity-90">
                    2011 - 2024
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Over 50+ technical events, 10+ international collaborations,
                    and countless success stories from our amazing community.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trophy Shelf Carousel */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="text-xs font-bold tracking-widest text-info uppercase mb-3">
              TROPHY SHOWCASE
            </div>
            <h3
              className={`text-3xl md:text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Our Prized Achievements
            </h3>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className={`flex-shrink-0 p-3 rounded-full transition-all ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-info'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
              aria-label="Previous trophies"
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
                className={`absolute bottom-1/3 left-0 right-0 h-6 rounded-full ${
                  darkMode
                    ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                    : 'bg-gradient-to-r from-[#4b2e1e] via-[#5a3824] to-[#4b2e1e]'
                } 
  shadow-[0_14px_18px_-8px_rgba(0,0,0,0.6)]
  before:absolute before:inset-0 before:rounded-full
  before:bg-gradient-to-b before:from-transparent before:to-black/30`}
              ></div>

              {/* Trophy Carousel Grid */}
              <div className="grid grid-cols-3 gap-8 relative z-10">
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
                        className={`relative  rounded-lg overflow-hidden shadow-xl ${
                          darkMode
                            ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                            : 'bg-white'
                        }`}
                      >
                        <img
                          src="/src/assets/trophy.jpg"
                          alt={award.title}
                          className="w-40 h-48 object-cover"
                        />
                        <div
                          className={`absolute inset-0 ${award.color} opacity-20`}
                        />
                      </motion.div>

                      {/* Trophy Info - Below Shelf Line */}
                      <div className="text-center w-full ">
                        <motion.h4
                          whileHover={{
                            backgroundPosition: ['0% center', '100% center'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className={`text-lg font-bold mb-2 mt-8 bg-gradient-to-r from-info via-blue-400 to-info bg-clip-text text-transparent bg-size-200 ${
                            darkMode ? '' : ''
                          }`}
                          style={{
                            backgroundSize: '200% 200%',
                          }}
                        >
                          {award.title}
                        </motion.h4>
                        <div className="text-sm font-semibold tracking-wide text-info uppercase mb-2 line-clamp-1">
                          {award.year}
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
              className={`flex-shrink-0 p-3 rounded-full transition-all ${
                darkMode
                  ? 'bg-info/20 hover:bg-info/30 text-info'
                  : 'bg-info/15 hover:bg-info/25 text-info'
              }`}
              aria-label="Next trophies"
            >
              <HiChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Carousel Indicators - Below */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: awards.length - itemsPerView + 1 }).map(
                (_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === carouselIndex
                        ? 'bg-info w-8'
                        : darkMode
                          ? 'bg-gray-600 w-2'
                          : 'bg-gray-300 w-2'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    aria-label={`Go to trophy set ${idx + 1}`}
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
