import { useEffect, useRef, useState } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { CommitteeHeroSection } from '@/features/committees/components/CommitteeHeroSection';
import { OrgChartView } from '@/features/committees/components/OrgChartView';
import { TabbedView } from '@/features/committees/components/TabbedView';
import { CommitteeDetailModal } from '@/features/committees/components/CommitteeDetailModal';
import { Committee } from '@/features/committees/constants/committeeData';
import Lenis from 'lenis';

export const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(
    null
  );
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const cleanup = initSmoothScroll(lenisRef);
    return cleanup;
  }, []);

  // Pause Lenis while modal is open so the modal content can scroll
  useEffect(() => {
    if (selectedCommittee) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedCommittee]);

  const handleViewDetails = (committee: Committee) => {
    setSelectedCommittee(committee);
  };

  const handleCloseModal = () => {
    setSelectedCommittee(null);
  };

  return (
    <div className="bg-background">
      <CommitteeHeroSection />
      {/* Org chart — visible on md and above */}
      <div className="hidden md:block">
        <OrgChartView onViewDetails={handleViewDetails} />
      </div>
      {/* Browse by section — visible on mobile only */}
      <div className="block md:hidden">
        <TabbedView onViewDetails={handleViewDetails} />
      </div>
      <CommitteeDetailModal
        committee={selectedCommittee}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CommitteesPage;
