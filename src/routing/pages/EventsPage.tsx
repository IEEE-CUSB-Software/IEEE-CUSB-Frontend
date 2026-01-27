import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { EventsListSection } from '@/features/events/components/EventsListSection';

export const EventsPage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-white">
      <EventsListSection />
    </div>
  );
};

export default EventsPage;
