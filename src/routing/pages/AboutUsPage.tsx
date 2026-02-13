import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { AboutUsHeroSection } from '@/features/about-us/components/AboutUsHeroSection';
import { VisionMissionSection } from '@/features/about-us/components/VisionMissionSection';
import { LegacyTimelineSection } from '@/features/about-us/components/LegacyTimelineSection';
import { TrophiesAwardsSection } from '@/features/about-us/components/TrophiesAwardsSection';
import { JoinLegacyCTA } from '@/features/about-us/components/JoinLegacyCTA';

export const AboutUsPage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background">
      <AboutUsHeroSection />
      <VisionMissionSection />
      <LegacyTimelineSection />
      <TrophiesAwardsSection />
      <JoinLegacyCTA />
    </div>
  );
};

export default AboutUsPage;
