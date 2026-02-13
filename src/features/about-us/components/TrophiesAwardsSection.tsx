import React from 'react';
import { motion } from 'framer-motion';
import {
  HiGlobe,
  HiUserGroup,
  HiStar,
  HiTrendingUp,
  HiCode,
} from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';

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

export const TrophiesAwardsSection = () => {
  return (
    <section className="bg-white py-24 px-6">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Trophies & Awards
            </h2>
            <p className="text-gray-600 max-w-xl">
              Recognition of our dedication to excellence in technical
              education, volunteering, and website development on a global
              scale.
            </p>
          </div>
        </motion.div>

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
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 h-full border border-gray-100 hover:border-info/30 hover:shadow-xl transition-all group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-4 group-hover:from-info/10 group-hover:to-info/5 transition-all`}
                >
                  <award.icon className={`w-7 h-7 ${award.color}`} />
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {award.title}
                  </h3>
                  <div className="text-xs font-semibold tracking-wide text-info uppercase">
                    {award.year}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
      </div>
    </section>
  );
};
