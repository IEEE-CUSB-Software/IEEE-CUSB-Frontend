import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiEye, FiUser, FiMail, FiPhone, FiBookOpen, FiClock, FiFileText, FiDownload, FiLoader } from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa';
import { Modal } from '@ieee-ui/ui';
import { type ColumnDef } from '@ieee-ui/ui';
import {
  SectionHeader,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
} from '@/features/admin/components/shared/AdminPageComponents';
import { useUsers, usersApi } from '@/shared/queries/users/users.queries';
import type { User } from '@/shared/types/auth.types';
import toast from 'react-hot-toast';


// User Details Modal Component
interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [cvLoading, setCvLoading] = useState<'view' | 'download' | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(!!user), user ? 100 : 0);
    return () => clearTimeout(t);
  }, [user]);

  if (!user) return null;

  const handleViewCv = async () => {
    setCvLoading('view');
    try {
      await usersApi.adminViewCv(user.id);
    } catch {
      toast.error('Failed to open CV. Please try again.');
    } finally {
      setCvLoading(null);
    }
  };

  const handleDownloadCv = async () => {
    setCvLoading('download');
    try {
      const fileName = `${user.name.replace(/\s+/g, '_')}_CV.pdf`;
      await usersApi.adminDownloadCv(user.id, fileName);
    } catch {
      toast.error('Failed to download CV. Please try again.');
    } finally {
      setCvLoading(null);
    }
  };

  return (
    <Modal isOpen={!!user} onClose={onClose} size="large" darkMode={isDark}>
      <div
        className={`transition-all duration-[300ms] ease-out space-y-6 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b pb-5 transition-colors duration-300 border-gray-200 dark:border-gray-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              @{user.username}
            </p>
          </div>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiMail className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Email Address</span>
            </div>
            <p className={`text-sm font-medium break-all ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {user.email}
            </p>
          </div>

          {/* Phone */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiPhone className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Phone Number</span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {user.phone}
            </p>
          </div>

          {/* University & Faculty */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiBookOpen className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">University & Faculty</span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {user.university}
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.faculty}
            </p>
          </div>

          {/* Academic Info */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiBookOpen className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Academic Year & Major</span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              Year {user.academic_year}
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.major || 'General'}
            </p>
          </div>

          {/* Account Status / Role */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiUser className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Role & Status</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'
              }`}>
                {user.role?.name || 'Visitor'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.is_active
                  ? isDark ? 'bg-green-950 text-green-300' : 'bg-green-50 text-green-700'
                  : isDark ? 'bg-red-950 text-red-300' : 'bg-red-50 text-red-700'
              }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Join Date */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-gray-50 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-2.5 mb-1.5 text-primary">
              <FiClock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Joined Date</span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* CV (PDF) Details Card */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          isDark ? 'bg-gray-800/20 border-gray-700/65' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Attached Curriculum Vitae (CV)
          </h4>
          {user.cv_url ? (
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-dashed ${
              isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-500/10 text-red-500">
                  <FaFilePdf className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {user.name.replace(/\s+/g, '_')}_CV.pdf
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Document format: PDF
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleViewCv}
                  disabled={cvLoading !== null}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/95 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cvLoading === 'view' ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiFileText className="w-3.5 h-3.5" />
                  )}
                  View CV
                </button>
                <button
                  onClick={handleDownloadCv}
                  disabled={cvLoading !== null}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark
                      ? 'border-gray-700 hover:bg-gray-800/80 text-gray-200'
                      : 'border-gray-200 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {cvLoading === 'download' ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiDownload className="w-3.5 h-3.5" />
                  )}
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className={`text-center py-6 border border-dashed rounded-xl ${
              isDark ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'
            }`}>
              <FiFileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No CV uploaded for this user.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
              isDark
                ? 'bg-gray-850 hover:bg-gray-800 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Users Page Component
export const UsersPage: React.FC = () => {
  const { isDark } = useTheme();
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = Array.isArray(users) ? users : [];
    if (!q) return list;
    return list.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.faculty.toLowerCase().includes(q) ||
        u.university.toLowerCase().includes(q)
    );
  }, [users, search]);

  // Table Columns Definition
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'User details',
        cell: (item: User) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
              {item.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                @{item.username}
              </span>
            </div>
          </div>
        ),
      },
      {
        header: 'Email / Phone',
        cell: (item: User) => (
          <div className="flex flex-col">
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.email}
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.phone}
            </span>
          </div>
        ),
      },
      {
        header: 'Education',
        cell: (item: User) => (
          <div className="flex flex-col">
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.university}
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.faculty} (Year {item.academic_year})
            </span>
          </div>
        ),
      },
      {
        header: 'CV status',
        cell: (item: User) => (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            item.cv_url
              ? isDark ? 'bg-green-950/40 text-green-300' : 'bg-green-50 text-green-700'
              : isDark ? 'bg-amber-950/40 text-amber-300' : 'bg-amber-50 text-amber-700'
          }`}>
            {item.cv_url ? 'Uploaded' : 'No CV'}
          </span>
        ),
      },
      {
        header: 'Role',
        cell: (item: User) => (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'
          }`}>
            {item.role?.name || 'Visitor'}
          </span>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: User) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setSelectedUser(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="View full details"
            >
              <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  // Render Mobile Card helper
  const renderMobileCard = (item: User) => (
    <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors duration-300 ${
      isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white border-gray-200/80 shadow-xs'
    }`}>
      <div className="flex items-center justify-between border-b pb-2 border-gray-200/60 dark:border-gray-700/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {item.name}
            </h4>
            <span className={`text-xs block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              @{item.username}
            </span>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(item)}
          className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline"
        >
          <FiEye className="w-3.5 h-3.5" />
          Details
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className={`block font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</span>
          <span className={`truncate block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.email}</span>
        </div>
        <div>
          <span className={`block font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</span>
          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.phone}</span>
        </div>
        <div>
          <span className={`block font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Education</span>
          <span className={`block truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {item.faculty} ({item.university})
          </span>
        </div>
        <div>
          <span className={`block font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>CV Status</span>
          <span className={`inline-block mt-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold ${
            item.cv_url
              ? isDark ? 'bg-green-950/40 text-green-300' : 'bg-green-50 text-green-700'
              : isDark ? 'bg-amber-950/40 text-amber-300' : 'bg-amber-50 text-amber-700'
          }`}>
            {item.cv_url ? 'Uploaded' : 'No CV'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        icon={<FiUser className="w-5 h-5 text-primary" />}
        title="User Management"
        subtitle="View and manage student branch users and their CVs"
        isDark={isDark}
      />

      {/* Search Bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users by name, username, email, phone, university..."
        isDark={isDark}
      />

      {/* Users Data List */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading users list..." />
      ) : filteredUsers.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching users found.' : 'No registered users found.'}
        />
      ) : (
        <ResponsiveDataList
          data={filteredUsers}
          columns={columns}
          isDark={isDark}
          renderMobileCard={renderMobileCard}
        />
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};
