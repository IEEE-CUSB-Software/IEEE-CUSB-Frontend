import { motion } from 'framer-motion';
import { HiEye, HiLightningBolt } from 'react-icons/hi';

interface VisionMissionSectionProps {
  darkMode?: boolean;
}

export const VisionMissionSection = ({
  darkMode,
}: VisionMissionSectionProps) => {
  return (
    <section
      className={`py-12 md:py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-blue-900/40' : 'bg-blue-50'
                }`}
              >
                <HiEye
                  className={`w-6 h-6 ${
                    darkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}
                />
              </div>
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Our Vision
              </h2>
            </div>

            <div className="pl-15">
              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                "To be the leading student organization empowering future
                engineers to drive technological innovation globally."
              </p>
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1], delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-primary/20' : 'bg-primary/10'
                }`}
              >
                <HiLightningBolt className="w-6 h-6 text-primary" />
              </div>
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Our Mission
              </h2>
            </div>

            <div
              className={`border-l-4 pl-6 ${
                darkMode ? 'border-blue-900/40' : 'border-blue-50'
              }`}
            >
              <p
                className={`text-lg leading-relaxed mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Provide a platform for technical growth, professional networking
                and soft skills development.
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We aim to bridge the gap between academic knowledge and industry
                requirements through workshops, competitions, and conferences.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
