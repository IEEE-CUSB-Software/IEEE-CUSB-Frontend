import { useEffect, useState } from 'react';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { CommitteeHeroSection } from '@/features/committees/components/CommitteeHeroSection';
import { ViewToggle } from '@/features/committees/components/ViewToggle';
import { OrgChartView } from '@/features/committees/components/OrgChartView';
import { TabbedView } from '@/features/committees/components/TabbedView';

export const CommitteesPage = () => {
    const [activeView, setActiveView] = useState<'orgChart' | 'tabbed'>('tabbed');

    useEffect(() => {
        const cleanup = initSmoothScroll();
        return cleanup;
    }, []);

    return (
        <div className="bg-background">
            <CommitteeHeroSection />
            <ViewToggle activeView={activeView} onViewChange={setActiveView} />
            {activeView === 'orgChart' ? <OrgChartView /> : <TabbedView />}
        </div>
    );
};

export default CommitteesPage;
