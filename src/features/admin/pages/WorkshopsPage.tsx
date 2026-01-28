import React, { useMemo } from 'react';
import {
  FiPlus,
  FiMoreVertical,
  FiClock,
  FiUser,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
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
  const columns = useMemo<ColumnDef<(typeof workshops)[0]>[]>(
    () => [
      {
        header: 'Workshop Title',
        accessorKey: 'title',
        className: 'font-medium text-gray-900',
      },
      {
        header: 'Instructor',
        accessorKey: 'instructor',
        cell: item => (
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser className="w-4 h-4" />
            <span>{item.instructor}</span>
          </div>
        ),
      },
      {
        header: 'Time',
        accessorKey: 'time',
        cell: item => (
          <div className="flex items-center gap-2 text-gray-600">
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
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.status === 'Upcoming'
                ? 'bg-blue-50 text-blue-600'
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
        cell: item => (
          <div className="flex items-center justify-end gap-2">
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workshops</h1>
          <p className="text-gray-500">
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
      />
    </div>
  );
};
