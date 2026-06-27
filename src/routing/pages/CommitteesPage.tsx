import { useEffect, useRef, useState } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { PageHeroSection } from '@/shared/components/PageHeroSection';
import { OrgChartView } from '@/features/committees/components/OrgChartView';
import { TabbedView } from '@/features/committees/components/TabbedView';
import { CommitteeDetailModal } from '@/features/committees/components/CommitteeDetailModal';
import { ChaptersSection } from '@/features/committees/components/ChaptersSection';
import { useBoard } from '@/shared/queries/board';
import { useCategories, useCommittees } from '@/shared/queries/committees';
import type { Committee } from '@/shared/types/committees.types';
import Lenis from 'lenis';

export const CommitteesPage = () => {
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string | null>(
    null
  );
  const lenisRef = useRef<Lenis | null>(null);

  const { data: boardMembers = [], isLoading: isLoadingBoard } = useBoard();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: committees = [], isLoading: isLoadingCommittees } = useCommittees();

  const isLoading = isLoadingBoard || isLoadingCategories || isLoadingCommittees;

  useEffect(() => {
    const cleanup = initSmoothScroll(lenisRef);
    return cleanup;
  }, []);

  // Pause Lenis while modal is open so the modal content can scroll
  useEffect(() => {
    if (selectedCommitteeId) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedCommitteeId]);

  const handleViewDetails = (committee: Committee) => {
    setSelectedCommitteeId(committee.id);
  };

  const handleCloseModal = () => {
    setSelectedCommitteeId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-background ">
      <PageHeroSection
        eyebrow="Our Structure"
        title="Committees & Structure"
        description="Explore the organizational structure of IEEE Cairo University Student Branch. Discover our executive board, technical sections, chapters and affinity groups, and the teams behind every achievement."
      />
      {/* Org chart — visible on md and above */}
      <div className="hidden md:block">
        <OrgChartView
          boardMembers={boardMembers}
          categories={categories}
          committees={committees}
          onViewDetails={handleViewDetails}
        />
      </div>
      {/* Browse by section — visible on mobile only */}
      <div className="block md:hidden">
        <TabbedView
          boardMembers={boardMembers}
          categories={categories}
          committees={committees}
          onViewDetails={handleViewDetails}
        />
      </div>
      
      <ChaptersSection />
      
      <CommitteeDetailModal
        committeeId={selectedCommitteeId}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CommitteesPage;
