import { awards } from '../../features/about-us/constants/trophies';
import TrophyRow from '@/features/awards/components/TrophyRow';
import { PageHeroSection } from '@/shared/components/PageHeroSection';
import { useTheme } from '@/shared/hooks/useTheme';
import { AwardSparkles } from '../../features/awards/components/AwardSparkles';

export const AwardsPage = () => {
  const { isDark } = useTheme();
  return (
    <>
      <PageHeroSection
        eyebrow="Awards & Recognition"
        title="A Legacy of Excellence"
        description="From local recognition to global stages — our awards reflect the dedication of every member who gave their time, skills, and passion to make this branch extraordinary."
        layout="standard"
        backgroundContent={<AwardSparkles />}
        showDotGrid={false}
      />
      <section>
        <div className="grid grid-cols-1 gap-16 p-6 max-w-3xl mx-auto  pb-12 sm:pb-16 md:pb-24 ">
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
