import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiUsers, FiTrash2, FiMail, FiPhone, FiAward } from 'react-icons/fi';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import { type ColumnDef } from '@ieee-ui/ui';
import { Pagination } from '@/shared/components/ui/Pagination';
import {
  SectionHeader,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
  AddButton,
} from '@/features/admin/components/shared/AdminPageComponents';
import {
  useAdminUsers,
  useDeleteAdminUser,
} from '@/shared/queries/admin/users.queries';
import type { User } from '@/shared/types/auth.types';
import AddUserModal from '@/features/admin/components/usersAdminPanel/AddUserModal';

/**
 * UsersPage - Admin panel for user management
 *
 * Features:
 * - View all users with pagination
 * - Search users by name, email, username, or role
 * - Delete users with confirmation
 * - Responsive table and mobile card views
 * - User details including role, faculty, university, and contact info
 *
 * Note: Create user and update role features require POST and PATCH endpoints
 */
export const UsersPage = () => {
  const { isDark } = useTheme();

  /* API hooks */
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useAdminUsers(page, limit);
  const deleteUserMutation = useDeleteAdminUser();

  const users = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );
  const totalPages = data?.meta?.totalPages ?? 1;

  /* Modal state */
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = useState<User | null>(null);
  const [search, setSearch] = useState('');

  /* Filtered list */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.role?.name.toLowerCase().includes(q)
    );
  }, [users, search]);

  /* Handlers */
  const handleAdd = useCallback(() => {
    setIsAddUserModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsAddUserModalOpen(false);
  }, []);

  const handleDelete = useCallback((user: User) => {
    setDeleteUserTarget(user);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteUserTarget) return;
    deleteUserMutation.mutate(deleteUserTarget.id, {
      onSuccess: () => setDeleteUserTarget(null),
    });
  }, [deleteUserMutation, deleteUserTarget]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Table columns */
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'User',
        cell: (item: User) => (
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                isDark ? 'bg-primary/30' : 'bg-primary/20'
              }`}
            >
              {item.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p
                className={`font-semibold text-sm truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.name}
              </p>
              <p
                className={`text-xs truncate ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                @{item.username}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Role',
        cell: (item: User) => {
          const roleColors: Record<string, string> = {
            'Super Admin': isDark
              ? 'bg-red-900/30 text-red-300'
              : 'bg-red-50 text-red-700',
            Admin: isDark
              ? 'bg-orange-900/30 text-orange-300'
              : 'bg-orange-50 text-orange-700',
            'Faculty Member': isDark
              ? 'bg-blue-900/30 text-blue-300'
              : 'bg-blue-50 text-blue-700',
            Visitor: isDark
              ? 'bg-gray-800 text-gray-400'
              : 'bg-gray-50 text-gray-700',
          };
          const color =
            roleColors[item.role?.name || 'Visitor'] ||
            (isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-700');
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
            >
              {item.role?.name || 'Visitor'}
            </span>
          );
        },
      },
      {
        header: 'Email',
        cell: (item: User) => (
          <div className="flex items-center gap-2 min-w-0">
            <FiMail
              className={`flex-shrink-0 w-4 h-4 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm truncate ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {item.email}
            </span>
          </div>
        ),
      },
      {
        header: 'Contact',
        cell: (item: User) => (
          <div className="flex items-center gap-2 min-w-0">
            {item.phone ? (
              <>
                <FiPhone
                  className={`flex-shrink-0 w-4 h-4 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-sm truncate ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {item.phone}
                </span>
              </>
            ) : (
              <span
                className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
              >
                —
              </span>
            )}
          </div>
        ),
      },
      {
        header: 'Academic Info',
        cell: (item: User) => (
          <div className="flex items-center gap-2 min-w-0">
            {item.academic_year ? (
              <>
                <FiAward
                  className={`flex-shrink-0 w-4 h-4 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-sm truncate ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Year {item.academic_year}
                </span>
              </>
            ) : (
              <span
                className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
              >
                —
              </span>
            )}
          </div>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: User) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleDelete(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete user"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  return (
    <div className="space-y-6">
      {/* ── Page header ─────────────────────────────────────── */}
      <SectionHeader
        icon={<FiUsers className="w-5 h-5 text-primary" />}
        title="User Management"
        subtitle="View and manage all users"
        isDark={isDark}
        action={<AddButton label="Add User" onClick={handleAdd} />}
      />

      {/* ── Search bar ──────────────────────────────────────── */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email, username, or role…"
        isDark={isDark}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading users…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching users' : 'No users yet'}
        />
      ) : (
        <>
          <ResponsiveDataList
            data={filtered}
            columns={columns}
            isDark={isDark}
            renderMobileCard={user => (
              <AdminMobileCard
                isDark={isDark}
                title={user.name}
                subtitle={`@${user.username} · ${user.role?.name || 'Visitor'}`}
                badge={user.role?.name || 'Visitor'}
                description={`${user.email}${user.phone ? ` · ${user.phone}` : ''}`}
                avatar={
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      isDark ? 'bg-primary/30' : 'bg-primary/20'
                    }`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                }
                onDelete={() => handleDelete(user)}
              />
            )}
          />

          {/* Result count */}
          {search && (
            <p
              className={`text-xs text-center ${
                isDark ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              Showing {filtered.length} of {users.length} users
            </p>
          )}
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

      {/* Add new user Modal */}

      {isAddUserModalOpen && (
        <AddUserModal
          onClose={handleClose}
          isOpen={isAddUserModalOpen}
          onCreateUser={() => {
            setIsAddUserModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteUserTarget}
        itemName={deleteUserTarget?.name ?? ''}
        entityLabel="user"
        isDark={isDark}
        isPending={deleteUserMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteUserTarget(null)}
      />
    </div>
  );
};
