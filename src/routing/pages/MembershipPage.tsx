import { useEffect } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { MembershipHeroSection } from '@/features/membership/components/MembershipHeroSection';
import { WhyJoinSection } from '@/features/membership/components/WhyJoinSection';
import { MembershipBenefitsSection } from '@/features/membership/components/MembershipBenefitsSection';
import { MembershipContactForm } from '@/features/membership/components/MembershipContactForm';

export const MembershipPage = () => {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-background">
      <MembershipHeroSection />
      <WhyJoinSection />
      <MembershipBenefitsSection />
      <MembershipContactForm />
    </div>
  );
};

export default MembershipPage;
