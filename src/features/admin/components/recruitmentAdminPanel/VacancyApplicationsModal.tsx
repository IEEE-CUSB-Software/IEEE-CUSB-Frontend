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
import { FaUser } from 'react-icons/fa';
import { useTheme } from '@/shared/hooks/useTheme';
import { MobileVacancyApplicationsCard } from './MobileVacancyApplicationsCard';
import {
  Application,
  ApplicationStatus,
} from '@/shared/types/recruitment.types';
import {
  useGetAllApplications,
  useUpdateApplicationStatus,
} from '@/shared/queries/recruitment/recruitment.queries';
import { ApplicationsFilterBar } from './ApplicationsFilterBar';
import UserInfo from '../shared/UserInfo';

type ApplicationFilter = 'ALL' | ApplicationStatus;

interface VacancyApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancyId: string;
  vacancyTitle: string;
}

export const VacancyApplicationsModal = ({
  isOpen,
  onClose,
  vacancyId,
  vacancyTitle,
}: VacancyApplicationsModalProps) => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeApps, setActiveApps] = useState<ApplicationFilter>('ALL');
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllApplications({
    vacancyId,
    page,
    limit,
    /////// to be implemented later for filtering by date range
    // startDate: startDate || undefined,
    // endDate: endDate || undefined,
  });

  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus(vacancyId);
  const applications = Array.isArray(data) ? data : [];
  const totalPages = 1;

  // Filtered applications (in-memory filtering for current page)
  const dateFilteredApplications = useMemo(() => {
    return !startDate && !endDate
      ? applications
        : applications.filter((app: Application) => {
          // Date filter
          const applicationDate = new Date(app.created_at);

          const matchesStart =
            !startDate || applicationDate >= new Date(startDate);

          const matchesEnd = !endDate || applicationDate <= new Date(endDate);

          return matchesStart && matchesEnd;
        });
  }, [applications, startDate, endDate]);

  // Transform and filter applications based on the active filter
  const getFilteredApplications = () => {
    if (activeApps === 'ALL') return dateFilteredApplications;
    return dateFilteredApplications.filter((app: Application) => app.status === activeApps);
  };

  const filteredApplications = getFilteredApplications();

  const handleUpdateStatus = async (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    await updateStatus({
      id: applicationId,
      data: { status },
    });
  };

  const [selectedApplication, setSelectedApplication] = useState<Application>(
    {} as Application
  );
  // const [selectedExtraDetails, setSelectedExtraDetails] = useState<
  //   Application['extra_data']
  // >({} as Application['extra_data']);

  const handleUserInfoClick = (application: Application) => {
    setSelectedApplication(application);
    setMenuOpen(true);
  };

  const columns = useMemo<ColumnDef<Application>[]>(
    () => [
      {
        header: 'Applicant',
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
        header: 'Applied on',
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
            {item.status !== ApplicationStatus.ACCEPTED && (
              <Button
                buttonText="Accept"
                onClick={() =>
                  handleUpdateStatus(item.id, ApplicationStatus.ACCEPTED)
                }
                disabled={isUpdating}
                className="text-xs px-2 py-1"
                width="fit"
                darkMode={isDark}
                type="primary"
              />
            )}
            {item.status !== ApplicationStatus.REJECTED && (
              <Button
                buttonText="Reject"
                onClick={() =>
                  handleUpdateStatus(item.id, ApplicationStatus.REJECTED)
                }
                disabled={isUpdating}
                className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                width="fit"
                darkMode={isDark}
                type="basic"
              />
            )}
            <button
              onClick={() => handleUserInfoClick(item)}
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
        ),
      },
    ],
    [isDark, isUpdating]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Vacancy Applications: ${vacancyTitle}`}
      size="full"
      darkMode={isDark}
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader text="Loading applications..." />
          </div>
        ) : isError ? (
          <ErrorScreen
            title="Failed to load applications"
            message="Please try again later."
            className="h-64"
            darkMode={isDark}
          />
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No applications found for this vacancy.
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4 mb-6">
              <ApplicationsFilterBar
                activeFilter={activeApps}
                onFilterChange={filter => setActiveApps(filter as ApplicationFilter)}
                darkMode={isDark}
              />
              <div className="flex flex-row items-end gap-4 mb-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="h-[42px] rounded-lg border border-gray-300 px-4 text-sm font-medium hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>

            <UserInfo
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              User={selectedApplication.user}
              extraDetails={selectedApplication.extra_data}
            />

            {/* Mobile View - Cards */}
            <div className="block md:hidden space-y-3">
              {filteredApplications.map((app: Application) => (
                <MobileVacancyApplicationsCard
                  key={app.id}
                  application={app}
                  isDark={isDark}
                  isUpdating={isUpdating}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block w-full overflow-x-auto">
              <Table
                data={filteredApplications}
                columns={columns}
                darkMode={isDark}
                emptyMessage="No applications found"
              />
            </div>

            {totalPages > 1 && !startDate && !endDate && (
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
