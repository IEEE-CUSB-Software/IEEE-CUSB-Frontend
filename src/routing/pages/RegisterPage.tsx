import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema } from '@/features/auth/schemas';
import { useRegister } from '@/shared/queries/auth';
import { Button, InputField, Select } from '@ieee-ui/ui';
import UniversityList from '@/constants/universityList';
import FacultyList from '@/constants/facultyList';
import DepartmentList from '@/constants/departmentList';
import logo from '@/assets/logo.png';
import { useTheme } from '@/shared/hooks/useTheme';

/**
 * Register Page Component
 * Role is automatically set to "Visitor" on backend - users cannot select role
 */
export const RegisterPage = () => {
  const { isDark } = useTheme();
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Enable live validation
    defaultValues: {
      email: '',
      username: '',
      name: '',
      phone: '',
      faculty: '',
      university: '',
      academic_year: '' as unknown as number,
      major: 'General',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password fields for live matching
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const onSubmit = (data: any) => {
    // Send data to backend — Zod coerces academic_year to number
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { major, ...rest } = data;
    register({
      ...rest,
      // Only include major if it's not the default
      ...(major && major !== 'General' ? { major } : {}),
    } as any);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br transition-colors duration-500 ${isDark
          ? 'from-gray-900 via-blue-900 to-gray-900'
          : 'from-blue-50 via-purple-50 to-pink-50'
          } animate-gradient-xy`}
      >
        <div
          className={`absolute inset-0 ${isDark
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,10,50,0.5),rgba(0,0,0,0))]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]'
            }`}
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div
          className={`backdrop-blur-xl rounded-2xl shadow-2xl border transition-all duration-300 p-8 ${isDark
            ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-900/20'
            : 'bg-white/80 border-white/20 shadow-gray-200'
            }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="IEEE CUSB Logo"
                className={`h-20 w-20 object-contain transition-all duration-300 ${isDark ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]' : ''}`}
              />
            </div>
            <h1
              className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Create Account
            </h1>
            <p
              className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Join IEEE CUSB community today
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Full Name *
                </label>
                <InputField
                  id="name"
                  type="text"
                  placeholder="Ahmed Wagih"
                  {...registerField('name')}
                  error={errors.name?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Username *
                </label>
                <InputField
                  id="username"
                  type="text"
                  placeholder="ahmedwagih"
                  {...registerField('username')}
                  error={errors.username?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Email Address *
                </label>
                <InputField
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  {...registerField('email')}
                  error={errors.email?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Phone Number *
                </label>
                <InputField
                  id="phone"
                  type="tel"
                  placeholder="+201001234567"
                  {...registerField('phone')}
                  error={errors.phone?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* University */}
              <div>
                <label
                  htmlFor="university"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  University *
                </label>
                <Select
                  id="university"
                  {...registerField('university')}
                  options={UniversityList.map(u => ({ value: u, label: u }))}
                  error={errors.university?.message}
                  disabled={isPending}
                  darkMode={isDark}
                  placeholder="Select university"
                />
              </div>

              {/* Faculty */}
              <div>
                <label
                  htmlFor="faculty"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Faculty *
                </label>
                <Select
                  id="faculty"
                  {...registerField('faculty')}
                  options={FacultyList.map(f => ({ value: f, label: f }))}
                  error={errors.faculty?.message}
                  disabled={isPending}
                  darkMode={isDark}
                  placeholder="Select faculty"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Year */}
              <div>
                <label
                  htmlFor="academic_year"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Academic Year *
                </label>
                <Select
                  id="academic_year"
                  {...registerField('academic_year')}
                  options={Array.from({ length: 5 }, (_, i) => ({
                    value: String(i + 1),
                    label: `Year ${i + 1}`,
                  }))}
                  error={errors.academic_year?.message}
                  disabled={isPending}
                  darkMode={isDark}
                  placeholder="Select year"
                />
              </div>

              {/* Department (Major) */}
              <div>
                <label
                  htmlFor="major"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Department
                </label>
                <Select
                  id="major"
                  {...registerField('major')}
                  options={DepartmentList.map(d => ({ value: d, label: d }))}
                  error={errors.major?.message}
                  disabled={isPending}
                  darkMode={isDark}
                  placeholder="Select department"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Password *
                </label>
                <InputField
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...registerField('password')}
                  error={errors.password?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  Confirm Password *
                </label>
                <InputField
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...registerField('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  disabled={isPending}
                  darkMode={isDark}
                />
                {confirmPassword && !errors.confirmPassword && (
                  <span
                    className={`text-xs font-medium mt-1 ${passwordsMatch ? 'text-green-600' : 'text-amber-600'}`}
                  >
                    {passwordsMatch
                      ? '✓ Passwords match'
                      : '✗ Passwords do not match'}
                  </span>
                )}
              </div>
            </div>

            {/* Password Requirements - Live Validation */}
            <div
              className={`rounded-lg p-4 transition-colors duration-300 ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}
            >
              <p
                className={`text-xs font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-blue-200' : 'text-blue-800'}`}
              >
                Password must contain:
              </p>
              <ul className="text-xs space-y-1">
                <li
                  className={
                    password?.length >= 8
                      ? 'text-green-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-600'
                  }
                >
                  {password?.length >= 8 ? '✓' : '•'} At least 8 characters
                </li>
                <li
                  className={
                    /[A-Z]/.test(password || '')
                      ? 'text-green-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-600'
                  }
                >
                  {/[A-Z]/.test(password || '') ? '✓' : '•'} One uppercase
                  letter
                </li>
                <li
                  className={
                    /[a-z]/.test(password || '')
                      ? 'text-green-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-600'
                  }
                >
                  {/[a-z]/.test(password || '') ? '✓' : '•'} One lowercase
                  letter
                </li>
                <li
                  className={
                    /\d/.test(password || '')
                      ? 'text-green-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-600'
                  }
                >
                  {/\d/.test(password || '') ? '✓' : '•'} One number
                </li>
                <li
                  className={
                    /[@$!%*?&]/.test(password || '')
                      ? 'text-green-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-600'
                  }
                >
                  {/[@$!%*?&]/.test(password || '') ? '✓' : '•'} One special
                  character (@$!%*?&)
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              htmlType="submit"
              onClick={() => { }}
              type="primary"
              className="w-full"
              disabled={isPending}
              loading={isPending}
              darkMode={isDark}
            >
              {isPending ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p
            className={`mt-6 text-center text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className={`font-medium transition-colors duration-300 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
