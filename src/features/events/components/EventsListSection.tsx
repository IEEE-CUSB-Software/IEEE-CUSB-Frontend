import { useState } from 'react';
import { EventsFilterBar } from './EventsFilterBar';
import { EventCard } from './EventCard';
import { useEvents } from '@/shared/queries/events';
import { Pagination } from '@/shared/components/ui/Pagination';
import type { Event } from '@/shared/types/events.types';

type FilterType = 'All' | 'Technical' | 'Non-Technical' | 'Social';

// Helper function to determine event status based on dates
const getEventStatus = (event: Event): 'Upcoming' | 'Ongoing' | 'Completed' => {
  const now = new Date();
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  if (now < startTime) return 'Upcoming';
  if (now >= startTime && now <= endTime) return 'Ongoing';
  return 'Completed';
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Transform API event to display format
const transformEvent = (event: Event) => {
  const status = getEventStatus(event);
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    date: formatDate(event.start_time),
    time: formatTime(event.start_time),
    endTime: formatTime(event.end_time),
    status,
    statusBadge: status,
    capacity: event.capacity,
    registrationDeadline: event.registration_deadline,
    // Default category since API doesn't have it - can be extended later
    category: 'Technical',
    categoryBadge: 'TECHNICAL',
    // Placeholder image - can be extended when API supports images
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  };
};

export const EventsListSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError, error, isFetching } = useEvents({
    page,
    limit,
  });

  // Debug log to see the data structure
  console.log('Events API Response:', data);

  // Safely extract events array - handle different response structures
  const events = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.totalPages ?? 1;

  // Transform and filter events
  const getFilteredEvents = () => {
    const transformedEvents = events.map(transformEvent);

    if (activeFilter === 'All') return transformedEvents;
    if (activeFilter === 'Non-Technical') {
      return transformedEvents.filter(
        event =>
          event.category === 'Social' ||
          event.category === 'Design' ||
          event.category === 'Soft Skills'
      );
    }
    return transformedEvents.filter(event => event.category === activeFilter);
  };

  const filteredEvents = getFilteredEvents();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top of the events section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Events & Workshops
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover our latest technical sessions, social gatherings, and
              hands-on workshops designed to empower future engineers.
            </p>
          </div>

          <EventsFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Loading skeleton grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Events & Workshops
            </h1>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">
              Failed to load events. Please try again later.
            </p>
            <p className="text-gray-500">
              {error instanceof Error
                ? error.message
                : 'Unknown error occurred'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16">
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

        {/* Empty state */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events found. Check back later for upcoming events!
            </p>
          </div>
        ) : (
          <>
            {/* Events Grid - 4 columns */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isFetching}
              className="mt-12"
            />
          </>
        )}
      </div>
    </section>
  );
};
