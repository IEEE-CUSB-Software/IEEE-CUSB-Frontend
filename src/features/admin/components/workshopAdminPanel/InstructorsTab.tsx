import React, { useMemo, useState } from 'react';
import { type ColumnDef } from '@ieee-ui/ui';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import { useTheme } from '@/shared/hooks/useTheme';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import { SectionHeader, AddButton, SearchBar, ResponsiveDataList, LoadingBlock, EmptyBlock } from '@/features/admin/components/shared/AdminPageComponents';
import AddEditInstructorModal from './AddEditInstructorModal';
import {
  useGetInstructors,
  useCreateInstructor,
  useUpdateInstructor,
  useDeleteInstructor,
  useUploadInstructorImage,
} from '@/shared/queries/workshops';
import type { Instructor, CreateInstructorRequest, UpdateInstructorRequest } from '@/shared/types/workshops.types';

const InstructorsTab: React.FC = () => {
  const { isDark } = useTheme();
  
  // Queries & Mutations
  const { data: instructors = [], isLoading } = useGetInstructors();
  const createMutation = useCreateInstructor();
  const updateMutation = useUpdateInstructor();
  const deleteMutation = useDeleteInstructor();
  const uploadImageMutation = useUploadInstructorImage();

  // State
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | undefined>(undefined);
  const [search, setSearch] = useState('');

  // Filtered list
  const filteredInstructors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return instructors;
    return instructors.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.bio.toLowerCase().includes(q)
    );
  }, [instructors, search]);

  // Handlers
  const handleAdd = () => {
    setSelectedInstructor(undefined);
    setIsAddEditOpen(true);
  };

  const handleEdit = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsAddEditOpen(true);
  };

  const handleDeleteClick = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsDeleteOpen(true);
  };

  const handleSave = async (
    data: CreateInstructorRequest | UpdateInstructorRequest,
    id?: string,
    file?: File | null
  ) => {
    let savedInstructor: Instructor;
    
    if (id) {
      savedInstructor = await updateMutation.mutateAsync({ id, data });
    } else {
      savedInstructor = await createMutation.mutateAsync(data as CreateInstructorRequest);
    }

    if (file && savedInstructor?.id) {
      await uploadImageMutation.mutateAsync({ id: savedInstructor.id, file });
    }

    setIsAddEditOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedInstructor) {
      await deleteMutation.mutateAsync(selectedInstructor.id);
      setIsDeleteOpen(false);
      setSelectedInstructor(undefined);
    }
  };

  const columns = useMemo<ColumnDef<Instructor>[]>(
    () => [
      {
        header: 'Instructor',
        accessorKey: 'name',
        cell: item => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <FiUser className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
              <p className={`text-sm truncate max-w-[200px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.bio}</p>
            </div>
          </div>
        ),
      },
      {
        header: 'Created At',
        accessorKey: 'created_at',
        cell: item => (
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: item => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleEdit(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteClick(item)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<FiUser className="w-5 h-5 text-primary" />}
        title="Instructors Directory"
        subtitle="Manage instructors for workshops."
        isDark={isDark}
        action={<AddButton label="Add Instructor" onClick={handleAdd} />}
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name or bio..."
        isDark={isDark}
      />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading instructors..." />
      ) : filteredInstructors.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching instructors' : 'No instructors found. Click \'Add Instructor\' to create one.'}
          onAdd={!search ? handleAdd : undefined}
          addLabel="Add Instructor"
        />
      ) : (
        <ResponsiveDataList
          data={filteredInstructors}
          columns={columns}
          isDark={isDark}
          renderMobileCard={(instructor) => (
            <AdminMobileCard
              isDark={isDark}
              title={instructor.name}
              subtitle={`Joined ${new Date(instructor.created_at).toLocaleDateString()}`}
              description={instructor.bio}
              avatar={
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  {instructor.image_url ? (
                    <img src={instructor.image_url} alt={instructor.name} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              }
              onEdit={() => handleEdit(instructor)}
              onDelete={() => handleDeleteClick(instructor)}
            />
          )}
        />
      )}

      <AddEditInstructorModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        instructor={selectedInstructor}
        onSave={handleSave}
        isPending={createMutation.isPending || updateMutation.isPending || uploadImageMutation.isPending}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Instructor"
        itemName={selectedInstructor?.name || ''}
        entityLabel="instructor"
        isDark={isDark}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
};

export default InstructorsTab;
