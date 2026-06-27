import { useState, useMemo } from 'react';
import {
  Modal,
  Table,
  type ColumnDef,
  Button,
  Loader,
  ErrorScreen,
} from '@ieee-ui/ui';
import { Pagination } from '@/shared/components/ui/Pagination';
import { SearchBar } from '@/features/admin/components/shared/AdminPageComponents';
import {
  useGetWorkshopRegistrations,
  useUpdateRegistrationStatus,
} from '@/shared/queries/workshops';
import {
  type WorkshopRegistration,
  WorkshopRegistrationStatus,
} from '@/shared/types/workshops.types';
import { useTheme } from '@/shared/hooks/useTheme';
import { MobileWorkshopRegistrationCard } from './MobileWorkshopRegistrationCard';

interface WorkshopRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
  workshopTitle: string;
}

export const WorkshopRegistrationsModal = ({
  isOpen,
  onClose,
  workshopId,
  workshopTitle,
}: WorkshopRegistrationsModalProps) => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useGetWorkshopRegistrations(
    workshopId,
    page,
    limit
  );

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRegistrationStatus();

  const registrations = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.totalPages ?? 1;

  // Filtered registrations (in-memory filtering for current page)
  const filteredRegistrations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return registrations;
    return registrations.filter(
      r =>
        (r.user?.name && r.user.name.toLowerCase().includes(q)) ||
        (r.user?.email && r.user.email.toLowerCase().includes(q))
    );
  }, [registrations, search]);

  const handleUpdateStatus = (
    registrationId: string,
    status: WorkshopRegistrationStatus
  ) => {
    updateStatus({
      id: workshopId,
      registrationId,
      status: { status },
    });
  };

  const columns = useMemo<ColumnDef<WorkshopRegistration>[]>(
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
          const statusColors: Record<WorkshopRegistrationStatus, string> = {
            [WorkshopRegistrationStatus.REGISTERED]: isDark
              ? 'bg-blue-900/30 text-blue-300'
              : 'bg-blue-50 text-blue-700',
            [WorkshopRegistrationStatus.WAITLISTED]: isDark
              ? 'bg-yellow-900/30 text-yellow-300'
              : 'bg-yellow-50 text-yellow-700',
            [WorkshopRegistrationStatus.CANCELLED]: isDark
              ? 'bg-red-900/30 text-red-300'
              : 'bg-red-50 text-red-700',
            [WorkshopRegistrationStatus.ACCEPTED]: isDark
              ? 'bg-green-900/30 text-green-300'
              : 'bg-green-50 text-green-700',
            [WorkshopRegistrationStatus.REJECTED]: isDark
              ? 'bg-red-900/30 text-red-300'
              : 'bg-red-50 text-red-700',
            [WorkshopRegistrationStatus.ATTENDED]: isDark
              ? 'bg-gray-800 text-gray-300'
              : 'bg-gray-100 text-gray-700',
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
            {item.status !== WorkshopRegistrationStatus.ACCEPTED && (
                <Button
                  buttonText="Accept"
                  onClick={() =>
                    handleUpdateStatus(
                      item.id,
                      WorkshopRegistrationStatus.ACCEPTED
                    )
                  }
                  disabled={isUpdating}
                  className="text-xs px-2 py-1"
                  width="fit"
                  darkMode={isDark}
                  type="primary"
                />
              )}
            {item.status !== WorkshopRegistrationStatus.REJECTED && (
              <Button
                buttonText="Reject"
                onClick={() =>
                  handleUpdateStatus(item.id, WorkshopRegistrationStatus.REJECTED)
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
      title={`Registrations: ${workshopTitle}`}
      size="full"
      darkMode={isDark}
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader text="Loading registrations..." />
          </div>
        ) : isError ? (
          <ErrorScreen
            title="Failed to load registrations"
            message="Please try again later."
            className="h-64"
            darkMode={isDark}
          />
        ) : registrations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No registrations found for this workshop.
          </div>
        ) : (
          <>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search registrations by name or email..."
              isDark={isDark}
            />
            
            {/* Mobile View - Cards */}
            <div className="block md:hidden space-y-3">
              {filteredRegistrations.map(reg => (
                <MobileWorkshopRegistrationCard
                  key={reg.id}
                  registration={reg}
                  isDark={isDark}
                  isUpdating={isUpdating}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>
            
            {/* Desktop View - Table */}
            <div className="hidden md:block w-full overflow-x-auto">
              <Table
                data={filteredRegistrations}
                columns={columns}
                darkMode={isDark}
                emptyMessage="No registrations found"
              />
            </div>
            
            {totalPages > 1 && !search && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
