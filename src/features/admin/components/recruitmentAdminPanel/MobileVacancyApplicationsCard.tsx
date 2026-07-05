import React, { useState } from 'react';
import { Button } from '@ieee-ui/ui';
import {
  ApplicationStatus,
  Application,
} from '@/shared/types/recruitment.types';
import { FaUser } from 'react-icons/fa';
import UserInfo from '../shared/UserInfo';

interface MobileVacancyApplicationsCardProps {
  application: Application;
  isDark: boolean;
  isUpdating: boolean;
  onUpdateStatus: (id: string, data: ApplicationStatus) => void;
}

export const MobileVacancyApplicationsCard: React.FC<
  MobileVacancyApplicationsCardProps
> = ({ application, isDark, isUpdating, onUpdateStatus }) => {
  const statusColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.ACCEPTED]: isDark
      ? 'bg-green-900/30 text-green-300'
      : 'bg-green-50 text-green-700',
    [ApplicationStatus.REJECTED]: isDark
      ? 'bg-red-900/30 text-red-300'
      : 'bg-red-50 text-red-700',
    [ApplicationStatus.PENDING]: isDark
      ? 'bg-gray-800 text-gray-300'
      : 'bg-gray-100 text-gray-700',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`rounded-xl p-4 mb-3 border transition-all ${
        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4
            className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {application.user?.name || 'Unknown User'}
          </h4>
          <p
            className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {application.user?.email || application.user_id}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
            statusColors[application.status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {application.status}
        </span>
      </div>

      <div
        className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
      >
        Applied on: {formatDate(application.created_at)}
      </div>

      <div className="flex gap-2 justify-end">
        {application.status !== ApplicationStatus.ACCEPTED && (
          <Button
            buttonText="Accept"
            onClick={() =>
              onUpdateStatus(application.id, ApplicationStatus.ACCEPTED)
            }
            disabled={isUpdating}
            className="text-xs px-3 py-1.5 h-auto min-h-0"
            width="fit"
            darkMode={isDark}
            type="primary"
          />
        )}
        {application.status !== ApplicationStatus.REJECTED && (
          <Button
            buttonText="Reject"
            onClick={() =>
              onUpdateStatus(application.id, ApplicationStatus.REJECTED)
            }
            disabled={isUpdating}
            className="text-xs px-3 py-1.5 h-auto min-h-0 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            width="fit"
            darkMode={isDark}
            type="basic"
          />
        )}

        <button
          onClick={() => setMenuOpen(true)}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
          }`}
          title="User Info"
        >
          <FaUser className="w-4 h-4" />
        </button>
      </div>

      <UserInfo
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        User={application?.user}
        extraDetails={application?.extra_data}
        width="400px"
      />
    </div>
  );
};
