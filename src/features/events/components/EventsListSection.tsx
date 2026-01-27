import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/features/home/components/SectionReveal';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';

interface Event {
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
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Intro to React & Modern UI',
    category: 'Technical',
    categoryBadge: 'TECHNICAL',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    date: 'Oct 15, 2025',
    time: '10:50 AM',
    location: 'Hall 5, Engineering Bldg',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    description: 'Learn modern UI development with React',
  },
  {
    id: 2,
    title: 'Annual Welcome Party',
    category: 'Social',
    categoryBadge: 'SOCIAL',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    date: 'Oct 20, 2025',
    time: '5:00 PM',
    location: 'Main Campus Garden',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    description: 'Join us for our annual welcome celebration',
  },
  {
    id: 3,
    title: 'Project Management 101',
    category: 'Soft Skills',
    categoryBadge: 'SOFT SKILLS',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    date: 'Nov 02, 2025',
    time: '12:00 PM',
    location: 'Room 204, Library',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    description: 'Master project management fundamentals',
  },
  {
    id: 4,
    title: 'Embedded Systems Basics',
    category: 'Technical',
    categoryBadge: 'TECHNICAL',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    date: 'Sep 28, 2025',
    time: '9:00 AM',
    location: 'Electronics Lab',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    description: 'Explore embedded systems and hardware programming',
  },
  {
    id: 5,
    title: 'UI/UX Design Week',
    category: 'Design',
    categoryBadge: 'DESIGN',
    status: 'Completed',
    statusBadge: 'Completed',
    date: 'Aug 03, 2025',
    time: '11:00 AM',
    location: 'Main Hall',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    description: 'Week-long design workshop and bootcamp',
  },
  {
    id: 6,
    title: 'Mid-Year Hiking Trip',
    category: 'Social',
    categoryBadge: 'SOCIAL',
    status: 'Completed',
    statusBadge: 'Completed',
    date: 'Jul 20, 2025',
    time: '7:00 AM',
    location: 'Sinai, Egypt',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    description: 'Adventure trip to the mountains',
  },
];

type FilterType = 'All' | 'Technical' | 'Non-Technical' | 'Social';

export const EventsListSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const getFilteredEvents = () => {
    if (activeFilter === 'All') return mockEvents;
    if (activeFilter === 'Non-Technical') {
      return mockEvents.filter(
        event =>
          event.category === 'Social' ||
          event.category === 'Design' ||
          event.category === 'Soft Skills'
      );
    }
    return mockEvents.filter(event => event.category === activeFilter);
  };

  const filteredEvents = getFilteredEvents();

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
    <section className="bg-gradient-to-br from-gray-50 to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover our latest technical sessions, social gatherings, and
            hands-on workshops designed to empower future engineers.
          </p>
        </div>

        {/* Filter, Search and Sort Bar - All in one row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 mb-8 bg-white p-3 rounded-lg shadow-sm"
        >
          {/* Filter Buttons */}
          <motion.button
            onClick={() => setActiveFilter('All')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === 'All'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            All
          </motion.button>

          <motion.button
            onClick={() => setActiveFilter('Technical')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === 'Technical'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Technical
          </motion.button>

          <motion.button
            onClick={() => setActiveFilter('Non-Technical')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === 'Non-Technical'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Non-Technical
          </motion.button>

          <motion.button
            onClick={() => setActiveFilter('Social')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === 'Social'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Social
          </motion.button>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Search Bar */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-4 py-2 pl-10 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Sort Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <span className="font-medium text-gray-700">Sort</span>
          </motion.button>
        </motion.div>

        {/* Events Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.2 }}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200 h-full flex flex-col group ${
                event.status === 'Completed' ? 'opacity-75' : ''
              }`}
            >
              {/* Event Image */}
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 ${
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
                  className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200 ${
                    event.status === 'Completed'
                      ? 'text-gray-500'
                      : 'text-gray-900'
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
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg ${
                      event.status === 'Completed'
                        ? 'bg-gray-100 text-gray-500 hover:bg-gray-500 hover:text-gray-100'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-200'
                    }`}
                  >
                    {event.status === 'Completed'
                      ? 'View Recap'
                      : 'View Details'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl group"
          >
            Load More Events
            <motion.svg
              className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
