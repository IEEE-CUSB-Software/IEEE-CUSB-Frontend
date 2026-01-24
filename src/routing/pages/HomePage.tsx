import { useEffect, useState } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { LatestNewsSection } from './components/LatestNewsSection';
import { EmpoweringSection } from './components/EmpoweringSection';
import { Footer } from './components/Footer';

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
      setActiveCardIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection activeCardIndex={activeCardIndex} onCardExpand={setActiveCardIndex} />
      <StatsSection />
      <LatestNewsSection />
      <EmpoweringSection />
      <Footer />
    </div>
  );
};
