import { motion } from 'framer-motion';
import {
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiUserCircle,
} from 'react-icons/hi';
import { useState, ChangeEvent, FormEvent } from 'react';
import { InputField } from '@ieee-ui/ui';
import { Select } from '@/shared/components/ui/Select';
import DepartmentList from '@/constants/departmentList';

interface EventDetailsSidebarProps {
  date: string;
  time: string;
  endTime: string;
  location: string;
  instructor?: {
    name: string;
    title: string;
    avatar?: string;
  };
  registrationDeadline: string;
}

export const EventDetailsSidebar = ({
  date,
  time,
  endTime,
  location,
  instructor,
  registrationDeadline,
}: EventDetailsSidebarProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    department: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      department: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    // Handle registration logic here
  };

  // Check if registration is still open
  const isRegistrationOpen = new Date() < new Date(registrationDeadline);

  return (
    <div className="space-y-6">
      {/* Event Details Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-primary"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>

        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <HiCalendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date
              </p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {date}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <HiClock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Time
              </p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {time} - {endTime}
              </p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <HiLocationMarker className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Venue
              </p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {location}
              </p>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors mt-1 font-medium">
                View Map
              </button>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        {instructor && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
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
                <p className="font-semibold text-gray-900">{instructor.name}</p>
                <p className="text-sm text-gray-600">{instructor.title}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Registration Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Secure your spot
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <InputField
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <InputField
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="2023xxxx"
              required
            />
          </div>

          {/* University Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University Email
            </label>
            <InputField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@eng.cu.edu.eg"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <Select
              value={formData.department}
              onChange={handleSelectChange}
              options={DepartmentList.map(dept => ({
                value: dept,
                label: dept,
              }))}
              placeholder="Select your department"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={!isRegistrationOpen}
          >
            {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
          </button>
        </form>

        {/* Registration Info */}
        {isRegistrationOpen && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Limited seats available. Registration closes Oct 20.
          </p>
        )}
      </motion.div>
    </div>
  );
};
