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
  darkMode?: boolean;
}

export const EventDetailsContent = ({
  about,
  learningPoints,
  prerequisites,
  darkMode,
}: EventDetailsContentProps) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`rounded-2xl shadow-lg p-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-blue-900/40' : 'bg-blue-50'
            }`}
          >
            <HiInformationCircle
              className={`w-6 h-6 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            />
          </div>
          <h2
            className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            About this Event
          </h2>
        </div>

        <div
          className={`prose prose-lg max-w-none leading-relaxed space-y-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 dark:bg-green-900/40 rounded-lg">
              <HiLightningBolt className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 dark:from-green-900/10 dark:hover:from-green-900/20 transition-all duration-200"
              >
                <HiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {point}
                </p>
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
          className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg p-8 border-l-4 border-amber-500"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <HiInformationCircle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Prerequisites
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {prerequisites[0]}
              </p>
            </div>
          </div>

          {prerequisites.length > 1 && (
            <ul className="space-y-2 ml-14">
              {prerequisites.slice(1).map((prereq, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-amber-600 dark:text-amber-300 mt-1">
                    •
                  </span>
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
