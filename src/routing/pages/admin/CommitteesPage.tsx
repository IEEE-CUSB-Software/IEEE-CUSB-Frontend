import { useTheme } from '@/shared/hooks/useTheme';
import { Committee } from '@/shared/types/committees.types';
import { Table, type ColumnDef, Loader, ErrorScreen } from '@ieee-ui/ui';
import { useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const CommitteesPage = () => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;

  // API queries
  const { data, isLoading, isError } = useEvents({ page, limit });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns = useMemo<ColumnDef<Committee>[]>(
    () => [
      {
        header: 'Event Name',
        accessorKey: 'title',
        className: `font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`,
      },
      {
        header: 'Date',
        cell: item => formatDate(item.start_time),
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Location',
        accessorKey: 'location',
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        className: `text-center transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Status',
        cell: item => {
          const status = getEventStatus(item);
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
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: item => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleEditEvent(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit event"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewRegistrations(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View registrations"
            >
              <FiUsers className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteEvent(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete event"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [handleEditEvent, handleDeleteEvent, handleViewRegistrations, isDark]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Committees Management
            </h1>
            <p
              className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Create ,manage and see Committees and members
            </p>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center">
          <Loader text="Loading events..." size="large" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Committees Management
            </h1>
            <p
              className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Create ,manage and see Committees and members
            </p>
          </div>
        </div>
        <ErrorScreen
          title="Failed to load events"
          message="Please try again later."
          className="h-64"
          darkMode={isDark}
        />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'} sm:text-center`}
          >
            Committees Management
          </h1>
          <p
            className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'} sm:text-center`}
          >
            Create ,manage and see Committees and members
          </p>
        </div>

        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <MdAdd className="text-xl" />
          <span>Add Event</span>
        </button>
      </div>

      {events.length === 0 ? (
        <div
          className={`rounded-lg p-8 text-center transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}
        >
          <p>No events found. Create your first event to get started!</p>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="block md:hidden space-y-4">
            {events.map(event => (
              <MobileEventCard
                key={event.id}
                event={event}
                isDark={isDark}
                onEdit={handleEditEvent}
                onViewRegistrations={handleViewRegistrations}
                onDelete={handleDeleteEvent}
                getEventStatus={getEventStatus}
              />
            ))}
          </div>
          {/* Desktop View - Table */}
          <div className="hidden md:block w-full overflow-x-auto">
            <Table
              data={events}
              columns={columns}
              emptyMessage="No events found"
              darkMode={isDark}
            />
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      )}

      {isEventModalOpen && (
        <AddEditEventModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(undefined);
            setSelectedAdminEvent(undefined);
          }}
          onSave={handleSaveEvent}
          event={selectedAdminEvent}
          isLoading={
            createEventMutation.isPending || updateEventMutation.isPending
          }
        />
      )}

      {isRegistrationsModalOpen && selectedEventForRegistrations && (
        <EventRegistrationsModal
          isOpen={isRegistrationsModalOpen}
          onClose={() => {
            setIsRegistrationsModalOpen(false);
            setSelectedEventForRegistrations(undefined);
          }}
          eventId={selectedEventForRegistrations.id}
          eventTitle={selectedEventForRegistrations.title}
        />
      )}
    </div>
  );
};
