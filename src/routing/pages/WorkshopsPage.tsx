import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { PageHeroSection } from '@/shared/components/PageHeroSection';
import { WorkshopsListSection } from '@/features/workshops/components/WorkshopsListSection';

export const WorkshopsPage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background">
      <PageHeroSection
        eyebrow="Events • Workshops • Networking"
        title="Workshops"
        description="Discover our latest technical, social,  and hands-on workshops designed to empower future engineers. Join us for unforgettable experiences that shape your career."
      />
      <WorkshopsListSection />
    </div>
  );
};

export default WorkshopsPage;
