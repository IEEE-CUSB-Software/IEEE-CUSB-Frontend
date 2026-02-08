import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';

interface EventCardProps {
  event: {
    id: number;
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
}

export const EventCard = ({ event, index }: EventCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return 'bg-blue-100 text-blue-700';
      case 'social':
        return 'bg-orange-100 text-orange-700';
      case 'soft skills':
        return 'bg-purple-100 text-purple-700';
      case 'design':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-150 h-full flex flex-col group ${
        event.status === 'Completed' ? 'opacity-75' : ''
      }`}
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
          className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-150 ${
            event.status === 'Completed' ? 'text-gray-500' : 'text-gray-900'
          }`}
        >
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-3 text-xs text-gray-600">
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
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg ${
              event.status === 'Completed'
                ? 'bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-gray-100'
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
