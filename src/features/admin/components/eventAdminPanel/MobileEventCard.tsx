import React from 'react';
import {
  FiEdit2,
  FiUsers,
  FiTrash2,
  FiMapPin,
  FiCalendar,
  FiClock,
} from 'react-icons/fi';
import { Event } from '@/shared/types/events.types';

interface MobileEventCardProps {
  event: Event;
  isDark: boolean;
  onEdit: (event: Event) => void;
  onViewRegistrations: (event: Event) => void;
  onDelete: (event: Event) => void;
  getEventStatus: (event: Event) => 'Upcoming' | 'Ongoing' | 'Completed';
}

export const MobileEventCard: React.FC<MobileEventCardProps> = ({
  event,
  isDark,
  onEdit,
  onViewRegistrations,
  onDelete,
  getEventStatus,
}) => {
  const status = getEventStatus(event);
  const statusColors = {
    Upcoming: isDark
      ? 'bg-blue-900/30 text-blue-300'
      : 'bg-blue-50 text-blue-700',
    Ongoing: isDark
      ? 'bg-green-900/30 text-green-300'
      : 'bg-green-50 text-green-700',
    Completed: isDark
      ? 'bg-gray-800 text-gray-400'
      : 'bg-gray-50 text-gray-700',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      className={`rounded-xl p-4 mb-4 border transition-all ${
        isDark
          ? 'bg-gray-900/50 border-gray-800'
          : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={`font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {event.title}
          </h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
        >
          Cap: {event.capacity}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div
          className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <FiCalendar className="w-4 h-4" />
          <span>{formatDate(event.start_time)}</span>
        </div>
        <div
          className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <FiClock className="w-4 h-4" />
          <span>{formatTime(event.start_time)}</span>
        </div>
        <div
          className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <FiMapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>

      <div
        className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
      >
        <button
          onClick={() => onEdit(event)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-primary hover:bg-primary/10'
              : 'text-gray-600 hover:text-primary hover:bg-primary/5'
          }`}
        >
          <FiEdit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onViewRegistrations(event)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-400/10'
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
          }`}
        >
          <FiUsers className="w-4 h-4" />
          Regs
        </button>
        <button
          onClick={() => onDelete(event)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
              : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <FiTrash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};
