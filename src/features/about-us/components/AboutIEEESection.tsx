import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import logo from '@/assets/logo.png';

interface AboutIEEESectionProps {
  darkMode?: boolean;
}

export const AboutIEEESection = ({ darkMode }: AboutIEEESectionProps) => {
  return (
    <section
      className={`py-12 md:py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* IEEE Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            className="flex items-center justify-center"
          >
            <a
              href="https://www.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="IEEE Logo"
                className="w-56 h-56 md:w-72 md:h-72 object-contain hover:scale-105 transition-transform duration-300"
              />
            </a>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.2,
            }}
            className="space-y-6"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              About IEEE
            </h2>

            <p
              className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              IEEE (Institute of Electrical and Electronics Engineers) is the
              world's largest technical professional organization with +450,000
              members dedicated to advancing technology for the benefit of
              humanity.
            </p>

            <p
              className={`leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              IEEE and its members inspire a global community through its highly
              cited publications, conferences, technology standards, and
              professional and educational activities. IEEE is, and remains,
              strongly committed to diversity, equity, and inclusion and we see
              no place for hatred and discrimination in our communities.
            </p>

            <div
              className={`border-l-4 pl-6 ${
                darkMode ? 'border-blue-900/40' : 'border-blue-50'
              }`}
            >
              <h3
                className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                IEEE Egypt Section
              </h3>
              <p
                className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Part of IEEE Region 8 (Europe, Middle East &amp; Africa), the
                Egypt Section supports a vibrant community of student branches
                across the country, fostering innovation and technical excellence
                among Egyptian engineering students.
              </p>
            </div>

            <a
              href="https://www.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-300"
            >
              Visit IEEE.org
              <HiExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
