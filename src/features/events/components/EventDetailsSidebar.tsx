import { motion } from 'framer-motion';
import {
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiUserCircle,
  HiExclamation,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import {
  useRegisterForEvent,
  useCancelRegistration,
} from '@/shared/queries/events';
import { RoleName } from '@/shared/types/auth.types';
import { format } from 'date-fns/format';

interface EventDetailsSidebarProps {
  startTime: string;
  endTime: string;
  location: string;
  instructor?: {
    name: string;
    title: string;
    avatar?: string;
  };
  registrationDeadline: string;
  eventId: string | number;
  isRegistered?: boolean;
  registrationId?: string;
  darkMode?: boolean;
}

export const EventDetailsSidebar = ({
  startTime,
  endTime,
  location,
  instructor,
  registrationDeadline,
  eventId,
  isRegistered,
  darkMode,
}: EventDetailsSidebarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const isAdmin =
    user?.role?.name === RoleName.ADMIN ||
    user?.role?.name === RoleName.SUPER_ADMIN;

  const { mutate: register, isPending: isRegistering } = useRegisterForEvent();
  const { mutate: cancelRegistration, isPending: isCancelling } =
    useCancelRegistration();

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    register(eventId.toString());
  };

  const handleCancelRegistration = () => {
    if (eventId) {
      cancelRegistration(eventId.toString());
    }
  };

  const isPending = isRegistering || isCancelling;

  // Check if events have valid dates
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Check if registration is still open
  const now = new Date();
  const deadline = isValidDate(registrationDeadline)
    ? new Date(registrationDeadline)
    : new Date(0); // Default to closed if invalid
  const isRegistrationOpen =
    isValidDate(registrationDeadline) && now < deadline;

  // Format dates
  const startDateObj = isValidDate(startTime)
    ? new Date(startTime)
    : new Date();
  const endDateObj = isValidDate(endTime) ? new Date(endTime) : new Date();
  const isSameDay =
    startDateObj.getDate() === endDateObj.getDate() &&
    startDateObj.getMonth() === endDateObj.getMonth() &&
    startDateObj.getFullYear() === endDateObj.getFullYear();

  const renderDateTime = () => {
    if (!isValidDate(startTime) || !isValidDate(endTime)) {
      return (
        <div
          className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          Date and time to be announced
        </div>
      );
    }

    if (isSameDay) {
      return (
        <>
          {/* Date */}
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-900/40' : 'bg-blue-50'
              }`}
            >
              <HiCalendar
                className={`w-5 h-5 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}
              />
            </div>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Date
              </p>
              <p
                className={`text-base font-semibold mt-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {format(startDateObj, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-green-900/40' : 'bg-green-50'
              }`}
            >
              <HiClock
                className={`w-5 h-5 ${
                  darkMode ? 'text-green-300' : 'text-green-600'
                }`}
              />
            </div>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Time
              </p>
              <p
                className={`text-base font-semibold mt-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {format(startDateObj, 'h:mm a')} -{' '}
                {format(endDateObj, 'h:mm a')}
              </p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {/* Start */}
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-blue-900/40' : 'bg-blue-50'
            }`}
          >
            <HiCalendar
              className={`w-5 h-5 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            />
          </div>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Start
            </p>
            <p
              className={`text-base font-semibold mt-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {format(startDateObj, 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>

        {/* End */}
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-blue-900/40' : 'bg-blue-50'
            }`}
          >
            <HiClock
              className={`w-5 h-5 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            />
          </div>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              End
            </p>
            <p
              className={`text-base font-semibold mt-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {format(endDateObj, 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Event Details Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`rounded-2xl shadow-lg p-6 border-t-4 ${
          darkMode
            ? 'bg-gray-800 border-primary-light'
            : 'bg-white border-primary'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Event Details
        </h2>

        <div className="space-y-4">
          {renderDateTime()}

          {/* Registration Deadline */}
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-red-900/40' : 'bg-red-50'
              }`}
            >
              <HiExclamation
                className={`w-5 h-5 ${
                  darkMode ? 'text-red-300' : 'text-red-600'
                }`}
              />
            </div>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Registration Deadline
              </p>
              <p
                className={`text-base font-semibold mt-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {isValidDate(registrationDeadline)
                  ? format(deadline, 'MMMM d, yyyy • h:mm a')
                  : 'No deadline set'}
              </p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-purple-900/40' : 'bg-purple-50'
              }`}
            >
              <HiLocationMarker
                className={`w-5 h-5 ${
                  darkMode ? 'text-purple-300' : 'text-purple-600'
                }`}
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Venue
              </p>
              <p
                className={`text-base font-semibold mt-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {location}
              </p>
              <button
                className={`text-sm hover:underline transition-colors mt-1 font-medium ${
                  darkMode
                    ? 'text-primary-light hover:text-primary-light/80'
                    : 'text-primary hover:text-primary/80'
                }`}
              >
                View Map
              </button>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        {instructor && (
          <div
            className={`mt-6 pt-6 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <h3
              className={`text-xs font-semibold uppercase tracking-wide mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Instructors
            </h3>
            <div className="flex items-center gap-3">
              {instructor.avatar ? (
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <HiUserCircle className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <p
                  className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {instructor.name}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {instructor.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Registration Action - Hide for Admins */}
      {!isAdmin && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-2xl shadow-lg p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isRegistered ? 'You are registered!' : 'Secure your spot'}
          </h2>

          {isRegistered ? (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  darkMode
                    ? 'bg-green-900/40 text-green-300'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="font-medium">Registration Confirmed</p>
              </div>

              <button
                onClick={handleCancelRegistration}
                disabled={isPending}
                className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-red-900/40 hover:bg-red-900/50 text-red-300'
                    : 'bg-red-50 hover:bg-red-100 text-red-600'
                }`}
              >
                {isPending ? 'Processing...' : 'Cancel Registration'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p
                className={`mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Join us for this exciting event. Click below to register.
              </p>

              <button
                onClick={handleRegister}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!isRegistrationOpen || isPending}
              >
                {isPending
                  ? 'Processing...'
                  : isRegistrationOpen
                    ? 'Register Now'
                    : 'Registration Closed'}
              </button>
            </div>
          )}

          {/* Registration Info */}
          {isRegistrationOpen && !isRegistered && (
            <p
              className={`text-xs text-center mt-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Limited seats available. Register soon!
            </p>
          )}

          {!isRegistrationOpen && !isRegistered && (
            <p
              className={`text-xs text-center mt-4 font-medium ${
                darkMode ? 'text-red-300' : 'text-red-500'
              }`}
            >
              Registration deadline has passed.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};
