import { useState } from 'react';
import { motion } from 'framer-motion';
import { EventsFilterBar } from './EventsFilterBar';
import { EventCard } from './EventCard';

export interface Event {
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

        {/* Filter, Search and Sort Bar */}
        <EventsFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Events Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
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
