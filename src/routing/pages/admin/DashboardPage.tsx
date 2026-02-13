import React from 'react';
import { FiUsers, FiCalendar, FiMapPin, FiBarChart2 } from 'react-icons/fi';
import { useTheme } from '@/shared/hooks/useTheme';

const StatsCard = ({
  title,
  value,
  trend,
  icon,
  color,
  isDark,
}: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
  isDark: boolean;
}) => (
  <div
    className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 flex items-start justify-between ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    }`}
  >
    <div>
      <p
        className={`text-sm font-medium mb-1 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
      >
        {title}
      </p>
      <h3
        className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        {value}
      </h3>
      <span
        className={`text-sm font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
          isDark
            ? 'text-green-400 bg-green-900/20'
            : 'text-green-500 bg-green-50'
        }`}
      >
        {trend}
      </span>
    </div>
    <div className={`p-3 rounded-xl ${color} text-white shadow-lg`}>{icon}</div>
  </div>
);

export const DashboardPage = () => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          Dashboard Overview
        </h1>
        <div
          className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          Last updated: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="1,234"
          trend="+12% this month"
          icon={<FiUsers className="w-6 h-6" />}
          color="bg-primary"
          isDark={isDark}
        />
        <StatsCard
          title="Total Events"
          value="42"
          trend="+5 new"
          icon={<FiCalendar className="w-6 h-6" />}
          color="bg-secondary"
          isDark={isDark}
        />
        <StatsCard
          title="Locations"
          value="15"
          trend="Active"
          icon={<FiMapPin className="w-6 h-6" />}
          color="bg-accent"
          isDark={isDark}
        />
        <StatsCard
          title="Engagement"
          value="89%"
          trend="+2.5%"
          icon={<FiBarChart2 className="w-6 h-6" />}
          color="bg-success"
          isDark={isDark}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Placeholder for Recent Activity or Charts */}
        {/* Recent Activity */}
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 min-h-[300px] ${
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
          }`}
        >
          <h3
            className={`text-lg font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    isDark
                      ? 'bg-blue-900/30 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  U{i}
                </div>
                <div>
                  <p
                    className={`font-medium transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
                  >
                    User {i} registered for an event
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                  >
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 min-h-[300px] ${
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
          }`}
        >
          <h3
            className={`text-lg font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Upcoming Workshops
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-purple-900/30 text-purple-400'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  <FiCalendar className="w-6 h-6" />
                </div>
                <div>
                  <p
                    className={`font-medium transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
                  >
                    Workshop Title {i}
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                  >
                    Tomorrow • 10:00 AM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
