import { useTheme } from '@/shared/hooks/useTheme';
import { Committee } from '@/shared/types/committees.types';
import { Table, type ColumnDef, Loader, ErrorScreen } from '@ieee-ui/ui';
import { useState, useMemo, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import {
  useCommitteesOneCategory,
  useCreateCommittee,
  useDeleteCommittee,
  useUpdateCommittee,
} from '@/shared/queries/committees';

export const CommitteesPage = ({ categoryId }: { categoryId: string }) => {
  const { isDark } = useTheme();
  // const [page, setPage] = useState(1);
  // const limit = 10;

  // API queries
  const { data, isLoading, isError } = useCommitteesOneCategory(categoryId);
  const createCommitteeMutation = useCreateCommittee();
  const updateCommitteeMutation = useUpdateCommittee();
  const deleteCommitteeMutation = useDeleteCommittee();
  const [selectedCommittee, setSelectedCommittee] = useState<
    Committee | undefined
  >(undefined);
  const committees = Array.isArray(data) ? data : [];
  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };
  console.log('committees', committees);
  const handleEditCommittee = useCallback((committee: Committee) => {
    setSelectedCommittee(committee);
  }, []);

  const handleDeleteCommittee = useCallback((committee: Committee) => {
    deleteCommitteeMutation.mutate(committee.id);
  }, []);

  const handleViewCommitteeMembers = useCallback((committee: Committee) => {
    setSelectedCommittee(committee);
  }, []);

  const handleAddCommittee = useCallback(() => {}, []);

  const columns = useMemo<ColumnDef<Committee>[]>(
    () => [
      {
        header: 'Committee Name',
        accessorKey: 'name',
        className: `font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`,
      },
      {
        header: 'Category',
        accessorKey: 'category',
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Location',
        accessorKey: 'name',
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'members',
        className: `text-center transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: item => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleEditCommittee(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit committee"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewCommitteeMembers(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View committee members"
            >
              <FiUsers className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteCommittee(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete committee"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [
      handleEditCommittee,
      handleDeleteCommittee,
      handleViewCommitteeMembers,
      isDark,
    ]
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
            className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
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
          onClick={handleAddCommittee}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <MdAdd className="text-xl" />
          <span>Add Committee</span>
        </button>
      </div>

      {committees.length === 0 ? (
        <div
          className={`rounded-lg p-8 text-center transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}
        >
          <p>
            No committees found. Create your first committee to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          {/* <div className="block md:hidden space-y-4">
            {committees.map(committee => (
              <MobileEventCard
                key={committee.id}
                committee={committee}
                isDark={isDark}
                onEdit={handleEditCommittee}
                onViewRegistrations={handleViewCommitteeMembers}
                onDelete={handleDeleteCommittee}
              />
            ))}
          </div> */}
          {/* Desktop View - Table */}
          <div className="hidden md:block w-full overflow-x-auto">
            <Table
              data={committees}
              columns={columns}
              emptyMessage="No committees found"
              darkMode={isDark}
            />
          </div>
        </>
      )}
    </div>
  );
};
