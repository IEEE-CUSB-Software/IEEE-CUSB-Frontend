import { useEffect } from 'react';
import { User } from '@/shared/types/auth.types';
import { ApplicationExtraData } from '@/shared/types/recruitment.types';

interface UserInfoProps {
  isOpen: boolean;
  onClose: () => void;
  User: User;
  extraDetails?: ApplicationExtraData;
  side?: 'left' | 'right';
  width?: string; // e.g. "300px", "20rem", "80vw"
}

// Small reusable row for label/value pairs — keeps the JSX below readable
function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-800 text-right break-all">
        {value}
      </span>
    </div>
  );
}

export default function UserInfo({
  isOpen,
  onClose,
  User,
  extraDetails,
  side = 'right',
  width = '500px',
}: UserInfoProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const sideClasses = side === 'right' ? 'right-0' : 'left-0';
  const translateClosed =
    side === 'right' ? 'translate-x-full' : '-translate-x-full';

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : undefined;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={User?.name ? 'slideout-title' : undefined}
        className={`fixed top-0 ${sideClasses} h-full bg-white shadow-xl z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : translateClosed}`}
        style={{ width }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b">
          {User?.avatar_url ? (
            <img
              src={User.avatar_url}
              alt={User.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
              {User?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1
              id="slideout-title"
              className="text-xl font-semibold text-gray-800 truncate"
            >
              {User?.name || 'User Information'}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">@{User?.username}</span>
              {User?.role?.name && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {User.role.name}
                </span>
              )}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  User?.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {User?.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 pl-2 pr-2 rounded-lg text-3xl leading-none self-start"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-84px)] space-y-6">
          {User?.bio && (
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Bio</h2>
              <p className="text-sm text-gray-600">{User.bio}</p>
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
              Contact
            </h2>
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Email"
                value={
                  User?.email
                    ? `${User.email}${User.verified_email ? ' ✓' : ' (unverified)'}`
                    : undefined
                }
              />
              <InfoRow label="Phone" value={User?.phone} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
              Academic
            </h2>
            <div className="divide-y divide-gray-100">
              <InfoRow label="University" value={User?.university} />
              <InfoRow label="Faculty" value={User?.faculty} />
              <InfoRow label="Major" value={User?.major} />
              <InfoRow label="Academic Year" value={User?.academic_year} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
              Account
            </h2>
            <div className="divide-y divide-gray-100">
              <InfoRow label="Joined" value={formatDate(User?.created_at)} />
              <InfoRow
                label="Last Updated"
                value={formatDate(User?.updated_at)}
              />
              <InfoRow
                label="Sign-in Method"
                value={
                  User?.oauth_provider ||
                  (User?.github_id
                    ? 'GitHub'
                    : User?.google_id
                      ? 'Google'
                      : 'Email')
                }
              />
            </div>
          </div>

          {extraDetails && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                Extra Details
              </h2>
              <h2 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                Why Join
              </h2>
              <p className="text-sm text-gray-600">{extraDetails?.why_join}</p>
            </div>
          )}

          {extraDetails?.portfolio && (
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                Portfolio
              </h2>
              <a
                href={extraDetails?.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {extraDetails?.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
