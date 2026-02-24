import { useEffect, useState } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { HeroSection } from '@/features/home/components/HeroSection';
import { StatsSection } from '@/features/home/components/StatsSection';
import { LatestNewsSection } from '@/features/home/components/LatestNewsSection';
import { EmpoweringSection } from '@/features/home/components/EmpoweringSection';
import { TeamSection } from '@/features/home/components/TeamSection';

export const HomePage = () => {
  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  // Auto-expanding cards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Auto-rotate cards every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background">
      <HeroSection
        activeCardIndex={activeCardIndex}
        onCardExpand={setActiveCardIndex}
      />
      <StatsSection />
      <LatestNewsSection />
      <EmpoweringSection />
      <TeamSection/>
    </div>
  );
};
