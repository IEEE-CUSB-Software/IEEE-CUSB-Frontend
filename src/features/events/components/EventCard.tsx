import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: {
    id: string | number;
    title: string;
    category: string;
    categoryBadge: string;
    status: string;
    statusBadge: string;
    date: string;
    time: string;
    location: string;
    image: string;
    description: string;
  };
  index: number;
  darkMode?: boolean;
}

export const EventCard = ({ event, index, darkMode }: EventCardProps) => {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return darkMode
          ? 'bg-blue-900/40 text-blue-300'
          : 'bg-blue-100 text-blue-700';
      case 'social':
        return darkMode
          ? 'bg-orange-900/40 text-orange-300'
          : 'bg-orange-100 text-orange-700';
      case 'soft skills':
        return darkMode
          ? 'bg-purple-900/40 text-purple-300'
          : 'bg-purple-100 text-purple-700';
      case 'design':
        return darkMode
          ? 'bg-pink-900/40 text-pink-300'
          : 'bg-pink-100 text-pink-700';
      default:
        return darkMode
          ? 'bg-gray-800 text-gray-300'
          : 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return darkMode
          ? 'bg-green-900/40 text-green-300'
          : 'bg-green-100 text-green-700';
      case 'completed':
        return darkMode
          ? 'bg-gray-800 text-gray-300'
          : 'bg-gray-100 text-gray-700';
      default:
        return darkMode
          ? 'bg-gray-800 text-gray-300'
          : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group ${
        darkMode ? 'bg-gray-800 shadow-blue-900/5' : 'bg-white'
      } ${event.status === 'Completed' ? 'opacity-75' : ''}`}
    >
      {/* Event Image */}
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-110 ${
            event.status === 'Completed' ? 'grayscale' : ''
          }`}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getCategoryColor(event.category)} transition-all duration-200`}
          >
            {event.categoryBadge}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(event.status)} transition-all duration-200`}
          >
            {event.statusBadge}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 ${
            event.status === 'Completed'
              ? 'text-gray-500'
              : darkMode
                ? 'text-white'
                : 'text-gray-900'
          }`}
        >
          {event.title}
        </h3>

        <div
          className={`space-y-1.5 mb-3 text-xs transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          <div className="flex items-center gap-2">
            <HiCalendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
            <span>•</span>
            <HiClock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <HiLocationMarker className="w-4 h-4 text-primary mt-0.5" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={() => navigate(`/events/${event.id}`)}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg ${
              event.status === 'Completed'
                ? darkMode
                  ? 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-gray-100'
                : darkMode
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-100 hover:text-gray-900'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-200'
            }`}
          >
            {event.status === 'Completed' ? 'View Recap' : 'View Details'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
