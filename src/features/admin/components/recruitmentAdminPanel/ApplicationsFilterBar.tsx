import { motion } from 'framer-motion';

type FilterType = 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface ApplicationsFilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  darkMode?: boolean;
}

export const ApplicationsFilterBar = ({
  activeFilter,
  onFilterChange,
  darkMode,
}: ApplicationsFilterBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`flex flex-col-reverse md:flex-row items-stretch md:items-center gap-4 mb-8 p-3 rounded-lg shadow-sm transition-all duration-300 ${
        darkMode ? 'bg-gray-800 shadow-blue-900/5' : 'bg-white shadow-gray-100'
      }`}
    >
      {/* Filters Group - Horizontal Scroll on Mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 -mx-1 px-1 no-scrollbar md:overflow-visible">
        <motion.button
          onClick={() => onFilterChange('ALL')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeFilter === 'ALL'
              ? 'bg-primary text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </motion.button>

        <motion.button
          onClick={() => onFilterChange('PENDING')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeFilter === 'PENDING'
              ? 'bg-primary text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </motion.button>

        <motion.button
          onClick={() => onFilterChange('ACCEPTED')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeFilter === 'ACCEPTED'
              ? 'bg-primary text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Accepted
        </motion.button>

        <motion.button
          onClick={() => onFilterChange('REJECTED')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeFilter === 'REJECTED'
              ? 'bg-primary text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Rejected
        </motion.button>
      </div>
    </motion.div>
  );
};
