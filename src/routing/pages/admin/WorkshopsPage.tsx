import { useMemo } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiPlus, FiClock, FiUser, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Table, type ColumnDef } from '@ieee-ui/ui';

// Mock Data
const workshops = [
  {
    id: 1,
    title: 'React JS Fundamentals',
    instructor: 'Ahmed Fathy',
    time: 'Oct 15 • 10:00 AM',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    instructor: 'Sarah Smith',
    time: 'Oct 18 • 2:00 PM',
    status: 'Active',
  },
  {
    id: 3,
    title: 'UI/UX Design Systems',
    instructor: 'John Doe',
    time: 'Oct 20 • 11:00 AM',
    status: 'Upcoming',
  },
  {
    id: 4,
    title: 'Embedded Systems 101',
    instructor: 'Mike Ross',
    time: 'Nov 01 • 9:00 AM',
    status: 'Upcoming',
  },
];

export const WorkshopsPage = () => {
  const { isDark } = useTheme();
  const columns = useMemo<ColumnDef<(typeof workshops)[0]>[]>(
    () => [
      {
        header: 'Workshop Title',
        accessorKey: 'title',
        className: `font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`,
      },
      {
        header: 'Instructor',
        accessorKey: 'instructor',
        cell: item => (
          <div
            className={`flex items-center gap-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FiUser className="w-4 h-4" />
            <span>{item.instructor}</span>
          </div>
        ),
      },
      {
        header: 'Time',
        accessorKey: 'time',
        cell: item => (
          <div
            className={`flex items-center gap-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FiClock className="w-4 h-4" />
            <span>{item.time}</span>
          </div>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: item => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${
              item.status === 'Upcoming'
                ? isDark
                  ? 'bg-blue-900/30 text-blue-300'
                  : 'bg-blue-50 text-blue-600'
                : isDark
                  ? 'bg-green-900/30 text-green-300'
                  : 'bg-green-50 text-green-600'
            }`}
          >
            {item.status}
          </span>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: () => (
          <div className="flex items-center justify-end gap-2">
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'} sm:text-center`}
          >
            Workshops
          </h1>
          <p
            className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'} sm:text-center`}
          >
            Manage technical workshops and sessions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <FiPlus className="w-5 h-5" />
          <span>Add Workshop</span>
        </button>
      </div>

      <Table
        data={workshops}
        columns={columns}
        emptyMessage="No workshops found"
        darkMode={isDark}
      />
    </div>
  );
};
