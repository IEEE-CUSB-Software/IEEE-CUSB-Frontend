import React from 'react';
import { Button } from '@ieee-ui/ui';
import {
  EventRegistration,
  EventRegistrationStatus,
} from '@/shared/types/events.types';

interface MobileRegistrationCardProps {
  registration: EventRegistration;
  isDark: boolean;
  isUpdating: boolean;
  onUpdateStatus: (id: string, status: EventRegistrationStatus) => void;
}

export const MobileRegistrationCard: React.FC<MobileRegistrationCardProps> = ({
  registration,
  isDark,
  isUpdating,
  onUpdateStatus,
}) => {
  const statusColors = {
    [EventRegistrationStatus.REGISTERED]: isDark
      ? 'bg-blue-900/30 text-blue-300'
      : 'bg-blue-50 text-blue-700',
    [EventRegistrationStatus.WAITLISTED]: isDark
      ? 'bg-yellow-900/30 text-yellow-300'
      : 'bg-yellow-50 text-yellow-700',
    [EventRegistrationStatus.CANCELLED]: isDark
      ? 'bg-red-900/30 text-red-300'
      : 'bg-red-50 text-red-700',
    [EventRegistrationStatus.ATTENDED]: isDark
      ? 'bg-green-900/30 text-green-300'
      : 'bg-green-50 text-green-700',
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
            {registration.user?.name || 'Unknown User'}
          </h4>
          <p
            className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {registration.user?.email || registration.user_id}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
            statusColors[registration.status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {registration.status}
        </span>
      </div>

      <div
        className={`text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
      >
        Registered: {formatDate(registration.created_at)}
      </div>

      <div className="flex gap-2 justify-end">
        {registration.status !== EventRegistrationStatus.ATTENDED &&
          registration.status !== EventRegistrationStatus.CANCELLED && (
            <Button
              buttonText="Mark Attended"
              onClick={() =>
                onUpdateStatus(
                  registration.id,
                  EventRegistrationStatus.ATTENDED
                )
              }
              disabled={isUpdating}
              className="text-xs px-3 py-1.5 h-auto min-h-0"
              width="fit"
              darkMode={isDark}
              type="primary"
            />
          )}
        {registration.status !== EventRegistrationStatus.CANCELLED && (
          <Button
            buttonText="Cancel"
            onClick={() =>
              onUpdateStatus(registration.id, EventRegistrationStatus.CANCELLED)
            }
            disabled={isUpdating}
            className="text-xs px-3 py-1.5 h-auto min-h-0 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            width="fit"
            darkMode={isDark}
            type="basic"
          />
        )}
      </div>
    </div>
  );
};
