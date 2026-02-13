import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

interface JoinLegacyCTAProps {
  darkMode?: boolean;
}

export const JoinLegacyCTA = ({ darkMode }: JoinLegacyCTAProps) => {
  return (
    <section
      className={`relative overflow-hidden py-12 md:py-24 px-6 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-600 to-blue-800'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Join the Legacy
              </h2>
              <p className="text-xl text-blue-100">
                Be part of our next achievement.
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-2xl group ${
                darkMode
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-white text-blue-900 hover:bg-blue-50'
              }`}
            >
              <span>Apply Now</span>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <HiArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8"
          >
            <div
              className={`flex items-center justify-center gap-8 text-sm ${
                darkMode ? 'text-gray-400' : 'text-blue-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    darkMode ? 'bg-info' : 'bg-white'
                  }`}
                />
                <span>400+ Active Members</span>
              </div>
              <div
                className={`w-px h-4 ${darkMode ? 'bg-gray-600' : 'bg-white/30'}`}
              />
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    darkMode ? 'bg-primary' : 'bg-white'
                  }`}
                />
                <span>50+ Events Yearly</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
