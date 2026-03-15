import { awards } from '../../features/about-us/constants/trophies';
import AwardsHeroSection from '@/features/awards/components/AwardsHeroSection';
import TrophyRow from '@/features/awards/components/TrophyRow';
import { useTheme } from '@/shared/hooks/useTheme';

export const AwardsPage = () => {
  const { isDark } = useTheme();
  return (
    <>
      <AwardsHeroSection />
      <section>
        <div className="grid grid-cols-1 gap-16 p-6 max-w-3xl mx-auto">
          {awards.map((award, i) => {
            return (
              <TrophyRow key={i} award={award} index={i} darkMode={isDark} />
            );
          })}
        </div>
      </section>
    </>
  );
};
