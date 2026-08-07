import { useState, useMemo } from 'react';
import {
  Modal,
  type ColumnDef,
  Button,
  ErrorScreen,
  DataTable,
} from '@ieee-ui/ui';

import {
  useEventRegistrations,
  useUpdateRegistrationStatus,
} from '@/shared/queries/events';
import {
  type EventRegistration,
  EventRegistrationStatus,
} from '@/shared/types/events.types';
import { useTheme } from '@/shared/hooks/useTheme';
import { useDebounce } from '@/shared/hooks/useDebounce';
import UniversityList from '@/constants/universityList';
import { MobileRegistrationCard } from './MobileRegistrationCard';

interface EventRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export const EventRegistrationsModal = ({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: EventRegistrationsModalProps) => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  
  const searchType = filterValues.searchBy || 'name';

  const { data, isLoading, isError } = useEventRegistrations(
    eventId,
    { 
      page, 
      limit,
      search: searchType === 'name' ? debouncedSearch : undefined,
      username: searchType === 'username' ? debouncedSearch : undefined,
      email: searchType === 'email' ? debouncedSearch : undefined,
      university: filterValues.university || undefined,
    },
    isOpen
  );

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRegistrationStatus();

  const registrations = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.totalPages ?? 1;

  const handleUpdateStatus = (
    registrationId: string,
    status: EventRegistrationStatus
  ) => {
    updateStatus({
      eventId,
      registrationId,
      data: { status },
    });
  };

  const columns = useMemo<ColumnDef<EventRegistration>[]>(
    () => [
      {
        header: 'User',
        cell: item => (
          <div className="flex flex-col">
            <span
              className={`font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {item.user?.name || 'Unknown User'}
            </span>
            <span
              className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {item.user?.email || item.user_id}
            </span>
          </div>
        ),
      },
      {
        header: 'Date',
        cell: item => (
          <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {new Date(item.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        ),
      },
      {
        header: 'Status',
        cell: item => {
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

          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                statusColors[item.status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {item.status}
            </span>
          );
        },
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: item => (
          <div className="flex justify-end gap-2">
            {item.status !== EventRegistrationStatus.ATTENDED &&
              item.status !== EventRegistrationStatus.CANCELLED && (
                <Button
                  buttonText="Mark Attended"
                  onClick={() =>
                    handleUpdateStatus(
                      item.id,
                      EventRegistrationStatus.ATTENDED
                    )
                  }
                  disabled={isUpdating}
                  className="text-xs px-2 py-1"
                  width="fit"
                  darkMode={isDark}
                  type="primary"
                />
              )}
            {item.status !== EventRegistrationStatus.CANCELLED && (
              <Button
                buttonText="Cancel"
                onClick={() =>
                  handleUpdateStatus(item.id, EventRegistrationStatus.CANCELLED)
                }
                disabled={isUpdating}
                className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                width="fit"
                darkMode={isDark}
                type="basic"
              />
            )}
          </div>
        ),
      },
    ],
    [isDark, isUpdating]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Registrations: ${eventTitle}`}
      size="full"
      darkMode={isDark}
    >
      <div className="space-y-4">
        {isError ? (
          <ErrorScreen
            title="Failed to load registrations"
            message="Please try again later."
            className="h-64"
            darkMode={isDark}
          />
        ) : (
          <DataTable
            data={registrations}
            columns={columns}
            darkMode={isDark}
            emptyMessage="No registrations found for this event."
            isLoading={isLoading}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder={`Search by ${filterValues.searchBy || 'name'}...`}
            filters={[
              {
                key: 'searchBy',
                label: 'Search Field',
                placeholder: 'Name',
                options: [
                  { label: 'Name', value: 'name' },
                  { label: 'Username', value: 'username' },
                  { label: 'Email', value: 'email' },
                ],
              },
              {
                key: 'university',
                label: 'University',
                placeholder: 'All Universities',
                options: UniversityList.map(u => ({
                  label: u,
                  value: u,
                })),
              },
            ]}
            filterValues={filterValues}
            onFilterChange={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
            onClearFilters={() => setFilterValues({})}
            renderMobileCard={reg => (
              <MobileRegistrationCard
                registration={reg}
                isDark={isDark}
                isUpdating={isUpdating}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </Modal>
  );
};
