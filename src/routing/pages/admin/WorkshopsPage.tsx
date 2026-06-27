import React from 'react';
import WorkshopAdminView from '@/features/admin/components/workshopAdminPanel/WorkshopAdminView';
// Removed PageHeroSection import

export const AdminWorkshopsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <WorkshopAdminView />
    </div>
  );
};
