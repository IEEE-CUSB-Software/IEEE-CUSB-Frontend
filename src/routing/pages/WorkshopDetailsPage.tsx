import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { WorkshopDetailsSection } from '@/features/workshops/components/WorkshopDetailsSection';

export const WorkshopDetailsPage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background md:pt-28 px-4 md:px-8">
      <WorkshopDetailsSection />
    </div>
  );
};

export default WorkshopDetailsPage;
