import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { AboutUsHeroSection } from '@/features/about-us/components/AboutUsHeroSection';
import { AboutIEEESection } from '@/features/about-us/components/AboutIEEESection';
import { VisionMissionSection } from '@/features/about-us/components/VisionMissionSection';
import { CounselorSection } from '@/features/about-us/components/CounselorSection';
import { LegacyTimelineSection } from '@/features/about-us/components/LegacyTimelineSection';
import { TrophiesAwardsSection } from '@/features/about-us/components/TrophiesAwardsSection';
import { JoinLegacyCTA } from '@/features/about-us/components/JoinLegacyCTA';

import { useTheme } from '@/shared/hooks/useTheme';

export const AboutUsPage = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background">
      <AboutUsHeroSection darkMode={isDark} />
      <AboutIEEESection darkMode={isDark} />
      <VisionMissionSection darkMode={isDark} />
      <CounselorSection darkMode={isDark} />
      <LegacyTimelineSection darkMode={isDark} />
      <TrophiesAwardsSection darkMode={isDark} />
      <JoinLegacyCTA darkMode={isDark} />
    </div>
  );
};

export default AboutUsPage;
