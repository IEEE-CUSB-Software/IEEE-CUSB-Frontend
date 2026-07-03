import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  BadgeCheck,
  Building2,
  GraduationCap,
  Loader2,
  Mail,
  Pencil,
  Phone,
  UserCircle2,
  Users,
  X,
} from 'lucide-react';
import {
  useCurrentUser,
  useUpdateUser,
} from '@/shared/queries/auth/auth.queries';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi2';

const formatValue = (value: string | number | boolean | null | undefined) => {
  if (value === null || value === undefined || value === '')
    return 'Not provided';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: '',
    faculty: '',
    university: '',
    academic_year: 1,
    major: '',
  });

  const resetForm = () => {
    if (!user) return;

    setFormData({
      name: user.name || '',
      bio: user.bio || '',
      phone: user.phone || '',
      faculty: user.faculty || '',
      university: user.university || '',
      academic_year: user.academic_year || 1,
      major: user.major || '',
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'academic_year' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!user) return;

    updateUserMutation.mutate({
      id: user.id,
      data: {
        ...formData,
        academic_year: Number(formData.academic_year),
      },
    });
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 shadow-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading your profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    const message =
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response &&
      error.response.status === 401
        ? 'Your session has expired. Please log in again.'
        : 'Unable to load your profile right now. Please try again later.';

    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response &&
      error.response.status === 401
    ) {
      navigate('/login', { replace: true });
    }

    return (
      <div className="min-h-screen bg-background py-8 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm">
          <AlertCircle className="mb-4 h-10 w-10 text-destructive" />
          <h1 className="text-2xl font-semibold text-foreground">
            Profile unavailable
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    );
  }

  const initials =
    user.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase() || 'U';

  const profileDetails = [
    { label: 'Email', value: user.email, icon: Mail },
    { label: 'Phone', value: user.phone, icon: Phone },
    { label: 'Faculty', value: user.faculty, icon: Building2 },
    { label: 'University', value: user.university, icon: GraduationCap },
    { label: 'Academic year', value: user.academic_year, icon: Users },
    { label: 'Major', value: user.major, icon: BadgeCheck },
  ];

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Back Button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <HiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back</span>
          </motion.button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Edit profile
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                {initials}
              </div>
              <div>
                <h1 className="mt-2 text-3xl font-semibold text-foreground">
                  {user.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-background/70 p-5">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <UserCircle2 className="h-5 w-5 text-primary" />
                  About
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {user.bio || 'No bio added yet.'}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-5">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Account details
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {profileDetails.map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border bg-background px-3 py-3"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        {label}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {formatValue(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-5">
              <h2 className="text-lg font-semibold text-foreground">
                My Applications
              </h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-foreground">
                    Events
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    my events
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-foreground">
                    Workshops
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    my workshops
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-foreground">
                    IEEE Membership
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    my membership
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Edit personal information
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update your contact and academic details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">Full name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">Phone</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">Faculty</span>
                  <input
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">University</span>
                  <input
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">Academic year</span>
                  <input
                    type="number"
                    name="academic_year"
                    min="1"
                    max="6"
                    value={formData.academic_year}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-foreground">
                  <span className="mb-2 block">Major</span>
                  <input
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-foreground">
                <span className="mb-2 block">Bio</span>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition disabled:opacity-70"
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
