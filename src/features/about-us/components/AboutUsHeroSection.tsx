import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';

interface AboutUsHeroSectionProps {
  darkMode?: boolean;
}

export const AboutUsHeroSection = ({ darkMode }: AboutUsHeroSectionProps) => {
  return (
    <section
      className={`relative min-h-screen px-6 flex items-center ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full py-12 md:py-20">
        {/* Split Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Heading & Description */}
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
                ESTABLISHED 2011
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
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Engineering the <span className="text-info">Future Together</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className={`text-base md:text-lg leading-relaxed mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We are a community of passionate students at Cairo University,
              dedicated to advancing technology and fostering innovation through
              technical excellence and professional development.
            </motion.p>

            {/* Download Brochure Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-info text-white px-6 py-3 rounded-full font-semibold hover:bg-info/90 transition-all shadow-xl hover:shadow-2xl group"
              >
                <HiDownload className="w-5 h-5" />
                <span>Download Brochure</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-info"
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
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-info/10 to-info/5">
              {/* Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                  alt="IEEE CUSB Excellence"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 text-white"
                  >
                    <div className="text-4xl font-bold mb-1">12+ Years</div>
                    <div className="text-sm text-gray-300">
                      of Technical Excellence
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
