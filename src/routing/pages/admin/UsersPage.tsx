import { useMemo, useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  FiEye,
  FiTrash2,
  FiUsers,
} from 'react-icons/fi';
import { type ColumnDef } from '@ieee-ui/ui';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import { DataTable } from '@ieee-ui/ui';
import AddUserModal from '@/features/admin/components/usersAdminPanel/AddUserModal';
import UserDetailModal from '@/features/admin/components/usersAdminPanel/UserDetailModal';
import ChangeUserRoleModal from '@/features/admin/components/usersAdminPanel/ChangeUserRoleModal';
import { useUsers, useDeleteUser, useRoles } from '@/shared/queries/users/users.queries';
import type { User } from '@/shared/types/auth.types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import UniversityList from '@/constants/universityList';

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
  const debouncedSearch = useDebounce(search, 300);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  
  const limit = 10;
  
  const searchType = filterValues.searchBy || 'name';

  // Pass debouncedSearch to the correct API param based on searchType
  const { data, isLoading } = useUsers({ 
    page, 
    limit, 
    search: searchType === 'name' ? debouncedSearch : undefined,
    username: searchType === 'username' ? debouncedSearch : undefined,
    email: searchType === 'email' ? debouncedSearch : undefined,
    roleId: filterValues.roleId,
    university: filterValues.university
  });
  const deleteUserMutation = useDeleteUser();
  const { data: roles } = useRoles();

  // Reset page to 1 when search or filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterValues]);

  const users = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalCount = data?.meta?.total ?? 0;

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
        cell: (item) => {
          const userRole = item.role?.name || roles?.find(r => r.id === item.role_id)?.name || 'Visitor';
          return (
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'}`}>
              {userRole}
            </span>
          );
        },
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
      <DataTable
        title="User Management"
        subtitle="View and manage student branch users and their CVs"
        headerIcon={<FiUsers className="h-5 w-5 text-primary" />}
        headerAction={
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 flex-shrink-0"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add User
          </button>
        }
        data={users}
        columns={columns}
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
            ]
          },
          {
            key: 'roleId',
            label: 'Role',
            placeholder: 'All Roles',
            options: (roles || []).map(role => ({
              label: role.name,
              value: role.id,
            })),
          },
          {
            key: 'university',
            label: 'University',
            placeholder: 'All Universities',
            options: UniversityList.map(u => ({
              label: u,
              value: u,
            })),
          }
        ]}
        filterValues={filterValues}
        onFilterChange={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
        onClearFilters={() => {
          setFilterValues({});
          setSearch('');
        }}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        emptyMessage="No users yet."
        darkMode={isDark}
        renderMobileCard={(user) => (
          <AdminMobileCard
            isDark={isDark}
            title={user.name}
            subtitle={`@${user.username} · ${user.role?.name || roles?.find(r => r.id === user.role_id)?.name || 'Visitor'}`}
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
