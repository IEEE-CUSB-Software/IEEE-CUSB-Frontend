import { useState } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  FiAward,
  FiDownload,
  FiEye,
  FiFileText,
  FiLoader,
  FiMail,
  FiPhone,
  FiShield,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { Modal } from '@ieee-ui/ui';
import { usersApi } from '@/shared/queries/users/users.queries';
import type { User } from '@/shared/types/auth.types';
import toast from 'react-hot-toast';

import { useAppSelector } from '@/shared/store/hooks';
import { RoleName } from '@/shared/types/auth.types';

const value = (input: string | number | null | undefined) =>
  input === null || input === undefined || input === '' ? 'Not provided' : String(input);

const hasCv = (user: User) => Boolean(user.cv_file_key || user.cv_url);

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
  onOpenChangeRole: (user: User) => void;
}

export const UserDetailModal = ({
  user,
  onClose,
  onOpenChangeRole,
}: UserDetailModalProps) => {
  const { isDark } = useTheme();
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const isSuperAdmin = currentUser?.role?.name === RoleName.SUPER_ADMIN;
  const [cvLoading, setCvLoading] = useState<'view' | 'download' | null>(null);

  if (!user) return null;

  const initials =
    user.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'U';

  const details = [
    { label: 'Email', value: user.email, icon: FiMail },
    { label: 'Phone', value: user.phone, icon: FiPhone },
    { label: 'Faculty', value: user.faculty, icon: FiAward },
    { label: 'University', value: user.university, icon: FiAward },
    { label: 'Academic year', value: user.academic_year, icon: FiUsers },
    { label: 'Major', value: user.major, icon: FiAward },
  ];

  const handleCv = async (action: 'view' | 'download') => {
    if (!hasCv(user)) return;

    setCvLoading(action);
    try {
      if (action === 'view') {
        await usersApi.adminViewCv(user.id);
      } else {
        await usersApi.adminDownloadCv(user.id, `${user.name.replace(/\s+/g, '_')}_CV.pdf`);
      }
    } catch {
      toast.error(`Failed to ${action} CV. Please try again.`);
    } finally {
      setCvLoading(null);
    }
  };

  return (
    <Modal isOpen={!!user} onClose={onClose} size="4xl" darkMode={isDark}>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background px-6 py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                {initials}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{user.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
                {user.role?.name || 'Visitor'}
              </span>
              {isSuperAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenChangeRole(user);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  title="Change user role"
                >
                  <FiShield className="h-3.5 w-3.5" />
                  Change Role
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <FiUser className="h-5 w-5 text-primary" />
                About
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {user.bio || 'No bio added yet.'}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <FiAward className="h-5 w-5 text-primary" />
                Account details
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {details.map(({ label, value: detailValue, icon: Icon }) => (
                  <div key={label} className="rounded-xl border border-border bg-background px-3 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      {label}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{value(detailValue)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-5">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FiFileText className="h-5 w-5 text-primary" />
              CV
            </div>
            {hasCv(user) ? (
              <div className="mt-5 rounded-xl border border-dashed border-border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  {user.name.replace(/\s+/g, '_')}_CV.pdf
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PDF document</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleCv('view')}
                    disabled={cvLoading !== null}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-60"
                  >
                    {cvLoading === 'view' ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiEye className="h-4 w-4" />}
                    View CV
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCv('download')}
                    disabled={cvLoading !== null}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-60"
                  >
                    {cvLoading === 'download' ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiDownload className="h-4 w-4" />}
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                No CV uploaded for this user.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
