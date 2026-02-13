import { motion } from 'framer-motion';
import { HiEye, HiLightningBolt } from 'react-icons/hi';

export const VisionMissionSection = () => {
  return (
    <section className="bg-white py-20 px-6">
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
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <HiEye className="w-6 h-6 text-info" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>

            <div className="pl-15">
              <p className="text-lg text-gray-700 leading-relaxed">
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
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <HiLightningBolt className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>

            <div className="pl-15 border-l-4 border-info/20 pl-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Provide a platform for technical growth, professional networking
                and soft skills development.
              </p>
              <p className="text-gray-600">
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
