import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

export const JoinLegacyCTA = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-info rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
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
              <p className="text-xl text-gray-300">
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
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl group"
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
            <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse" />
                <span>400+ Active Members</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>50+ Events Yearly</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
