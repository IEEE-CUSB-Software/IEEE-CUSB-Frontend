import { useMemo, useState, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  FiEye,
  FiTrash2,
  FiUsers,
} from 'react-icons/fi';
import { type ColumnDef } from '@ieee-ui/ui';
import { Pagination } from '@/shared/components/ui/Pagination';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import {
  SectionHeader,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
  AddButton,
} from '@/features/admin/components/shared/AdminPageComponents';
import AddUserModal from '@/features/admin/components/usersAdminPanel/AddUserModal';
import UserDetailModal from '@/features/admin/components/usersAdminPanel/UserDetailModal';
import ChangeUserRoleModal from '@/features/admin/components/usersAdminPanel/ChangeUserRoleModal';
import { useUsers, useDeleteUser } from '@/shared/queries/users/users.queries';
import type { User } from '@/shared/types/auth.types';

const value = (input: string | number | null | undefined) =>
  input === null || input === undefined || input === '' ? 'Not provided' : String(input);

const hasCv = (user: User) => Boolean(user.cv_file_key || user.cv_url);

export const UsersPage = () => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(1);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [roleTarget, setRoleTarget] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const limit = 10;
  const { data, isLoading } = useUsers({ page, limit });
  const deleteUserMutation = useDeleteUser();

  const users = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const totalPages = data?.meta?.totalPages ?? 1;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) =>
      [user.name, user.username, user.email, user.phone, user.faculty, user.university, user.role?.name]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );
  }, [users, search]);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return;

    deleteUserMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }, [deleteUserMutation, deleteTarget]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'User',
        cell: (item) => (
          <button
            type="button"
            onClick={() => setSelectedUser(item)}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {item.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className={`truncate text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
              <p className={`truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                @{item.username}
              </p>
            </div>
          </button>
        ),
      },
      {
        header: 'Role',
        cell: (item) => (
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'}`}>
            {item.role?.name || 'Visitor'}
          </span>
        ),
      },
      {
        header: 'Contact',
        cell: (item) => (
          <div className="min-w-0 space-y-1">
            <p className={`truncate text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.email}</p>
            <p className={`truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{value(item.phone)}</p>
          </div>
        ),
      },
      {
        header: 'Academic Info',
        cell: (item) => (
          <div className="min-w-0 space-y-1">
            <p className={`truncate text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{value(item.university)}</p>
            <p className={`truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {value(item.faculty)}{item.academic_year ? ` · Year ${item.academic_year}` : ''}
            </p>
          </div>
        ),
      },
      {
        header: 'CV',
        cell: (item) => (
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${hasCv(item) ? (isDark ? 'bg-green-950/40 text-green-300' : 'bg-green-50 text-green-700') : (isDark ? 'bg-amber-950/40 text-amber-300' : 'bg-amber-50 text-amber-700')}`}>
            {hasCv(item) ? 'Uploaded' : 'No CV'}
          </span>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => setSelectedUser(item)}
              className={`group rounded-lg p-2 transition-all duration-200 ${isDark ? 'text-gray-500 hover:bg-primary/10 hover:text-primary' : 'text-gray-400 hover:bg-primary/5 hover:text-primary'}`}
              title="View user details"
            >
              <FiEye className="h-4 w-4 transition-transform group-hover:scale-110" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget(item)}
              className={`group rounded-lg p-2 transition-all duration-200 ${isDark ? 'text-gray-500 hover:bg-red-400/10 hover:text-red-400' : 'text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
              title="Delete user"
            >
              <FiTrash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
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
        icon={<FiUsers className="h-5 w-5 text-primary" />}
        title="User Management"
        subtitle="View and manage student branch users and their CVs"
        isDark={isDark}
        action={<AddButton label="Add User" onClick={() => setIsAddUserModalOpen(true)} />}
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email, username, phone, university, or role..."
        isDark={isDark}
      />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading users..." />
      ) : filtered.length === 0 ? (
        <EmptyBlock isDark={isDark} message={search ? 'No matching users found.' : 'No users yet.'} />
      ) : (
        <>
          <ResponsiveDataList
            data={filtered}
            columns={columns}
            isDark={isDark}
            renderMobileCard={(user) => (
              <AdminMobileCard
                isDark={isDark}
                title={user.name}
                subtitle={`@${user.username} · ${user.role?.name || 'Visitor'}`}
                badge={hasCv(user) ? 'CV uploaded' : 'No CV'}
                description={`${user.email}${user.phone ? ` · ${user.phone}` : ''}`}
                avatar={
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                }
                onView={() => setSelectedUser(user)}
                onDelete={() => setDeleteTarget(user)}
              />
            )}
          />

          {search && (
            <p className={`text-center text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              Showing {filtered.length} of {users.length} users
            </p>
          )}
        </>
      )}

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

      {isAddUserModalOpen && (
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onCreateUser={() => setIsAddUserModalOpen(false)}
        />
      )}

      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onOpenChangeRole={(user) => setRoleTarget(user)}
      />

      <ChangeUserRoleModal
        user={roleTarget}
        isOpen={!!roleTarget}
        onClose={() => setRoleTarget(null)}
        isDark={isDark}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ''}
        entityLabel="user"
        isDark={isDark}
        isPending={deleteUserMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
