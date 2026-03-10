import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { EventDetailsSection } from '@/features/events/components/EventDetailsSection';

export const EventDetailsPage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background md:pt-28 px-4 md:px-8">
      <EventDetailsSection />
    </div>
  );
};

export default EventDetailsPage;
