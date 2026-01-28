import React from 'react';
import { FiUsers, FiCalendar, FiMapPin, FiBarChart2 } from 'react-icons/fi';

const StatsCard = ({
  title,
  value,
  trend,
  icon,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <div className={`p-3 rounded-xl ${color} text-white`}>{icon}</div>
  </div>
);

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="1,234"
          trend="+12% this month"
          icon={<FiUsers className="w-6 h-6" />}
          color="bg-primary"
        />
        <StatsCard
          title="Total Events"
          value="42"
          trend="+5 new"
          icon={<FiCalendar className="w-6 h-6" />}
          color="bg-secondary"
        />
        <StatsCard
          title="Locations"
          value="15"
          trend="Active"
          icon={<FiMapPin className="w-6 h-6" />}
          color="bg-accent"
        />
        <StatsCard
          title="Engagement"
          value="89%"
          trend="+2.5%"
          icon={<FiBarChart2 className="w-6 h-6" />}
          color="bg-success"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Placeholder for Recent Activity or Charts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                  U{i}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    User {i} registered for an event
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Upcoming Workshops
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <FiCalendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Workshop Title {i}
                  </p>
                  <p className="text-sm text-gray-500">Tomorrow • 10:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
