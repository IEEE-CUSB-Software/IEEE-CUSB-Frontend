import { motion } from 'framer-motion';
import {
  HiCheckCircle,
  HiInformationCircle,
  HiLightningBolt,
} from 'react-icons/hi';

interface EventDetailsContentProps {
  about: string;
  learningPoints?: string[];
  prerequisites?: string[];
}

export const EventDetailsContent = ({
  about,
  learningPoints,
  prerequisites,
}: EventDetailsContentProps) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <HiInformationCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">About this Event</h2>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          {about.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      {/* Learning Points Section */}
      {learningPoints && learningPoints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <HiLightningBolt className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              What You Will Learn
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {learningPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-all duration-200"
              >
                <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Prerequisites Section */}
      {prerequisites && prerequisites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border-l-4 border-amber-500"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <HiInformationCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Prerequisites
              </h2>
              <p className="text-gray-600">{prerequisites[0]}</p>
            </div>
          </div>

          {prerequisites.length > 1 && (
            <ul className="space-y-2 ml-14">
              {prerequisites.slice(1).map((prereq, index) => (
                <li
                  key={index}
                  className="text-gray-700 flex items-start gap-2"
                >
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  );
};
