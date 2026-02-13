import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas';
import { useRegister } from '@/shared/queries/auth';
import { Button, InputField } from '@ieee-ui/ui';
import logo from '@/assets/logo.png';

/**
 * Register Page Component
 * Role is automatically set to "Visitor" on backend - users cannot select role
 */
export const RegisterPage = () => {
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Enable live validation
    defaultValues: {
      major: 'General',
    },
  });

  // Watch password fields for live matching
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const onSubmit = (data: RegisterFormData) => {
    // Send all data including confirmPassword for backend validation
    register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-xy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="IEEE CUSB Logo"
                className="h-20 w-20 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join IEEE CUSB community today</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* University */}
              <div>
                <label
                  htmlFor="university"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  University *
                </label>
                <InputField
                  id="university"
                  type="text"
                  placeholder="Cairo University"
                  {...registerField('university')}
                  error={errors.university?.message}
                  disabled={isPending}
                />
              </div>

              {/* Faculty */}
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Faculty *
                </label>
                <InputField
                  id="faculty"
                  type="text"
                  placeholder="Engineering"
                  {...registerField('faculty')}
                  error={errors.faculty?.message}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Year */}
              <div>
                <label
                  htmlFor="academic_year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Academic Year *
                </label>
                <InputField
                  id="academic_year"
                  type="number"
                  min="1"
                  max="6"
                  placeholder="1"
                  {...registerField('academic_year', { valueAsNumber: true })}
                  error={errors.academic_year?.message}
                  disabled={isPending}
                />
              </div>

              {/* Major */}
              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Major
                </label>
                <InputField
                  id="major"
                  type="text"
                  placeholder="Computer Engineering"
                  {...registerField('major')}
                  error={errors.major?.message}
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-xs text-blue-800 dark:text-blue-200 font-medium mb-2">
                Password must contain:
              </p>
              <ul className="text-xs space-y-1">
                <li
                  className={
                    password?.length >= 8
                      ? 'text-green-600'
                      : 'text-blue-600 dark:text-blue-300'
                  }
                >
                  {password?.length >= 8 ? '✓' : '•'} At least 8 characters
                </li>
                <li
                  className={
                    /[A-Z]/.test(password || '')
                      ? 'text-green-600'
                      : 'text-blue-600 dark:text-blue-300'
                  }
                >
                  {/[A-Z]/.test(password || '') ? '✓' : '•'} One uppercase
                  letter
                </li>
                <li
                  className={
                    /[a-z]/.test(password || '')
                      ? 'text-green-600'
                      : 'text-blue-600 dark:text-blue-300'
                  }
                >
                  {/[a-z]/.test(password || '') ? '✓' : '•'} One lowercase
                  letter
                </li>
                <li
                  className={
                    /\d/.test(password || '')
                      ? 'text-green-600'
                      : 'text-blue-600 dark:text-blue-300'
                  }
                >
                  {/\d/.test(password || '') ? '✓' : '•'} One number
                </li>
                <li
                  className={
                    /[@$!%*?&]/.test(password || '')
                      ? 'text-green-600'
                      : 'text-blue-600 dark:text-blue-300'
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
              onClick={() => {}}
              type="primary"
              className="w-full"
              disabled={isPending}
              loading={isPending}
            >
              {isPending ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
