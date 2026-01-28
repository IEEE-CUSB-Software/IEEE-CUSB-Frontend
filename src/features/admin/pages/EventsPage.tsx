import { useState, useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import AddEditEventModal from '../components/eventAdminPanel/AddEditEventModal';
import type { EventFormData } from '../types/eventModalTypes';
import { Table, type ColumnDef } from '@ieee-ui/ui';

// Mock Data
const upcomingEvents = [
  {
    id: 1,
    title: 'Intro to React & Modern UI',
    date: 'Oct 15, 2025',
    location: 'Hall 5, Engineering Bldg',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Annual Welcome Party',
    date: 'Oct 20, 2025',
    location: 'Main Campus Garden',
    status: 'Upcoming',
  },
];

export const EventsPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleSaveEvent = async (data: EventFormData) => {
    console.log('Mock save event:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEventModalOpen(false);
  };

  const columns = useMemo<ColumnDef<(typeof upcomingEvents)[0]>[]>(
    () => [
      {
        header: 'Event Name',
        accessorKey: 'title',
        className: 'font-medium text-gray-900',
      },
      {
        header: 'Date',
        accessorKey: 'date',
        className: 'text-gray-600',
      },
      {
        header: 'Location',
        accessorKey: 'location',
        className: 'text-gray-600',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: item => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-500">Create and manage upcoming events</p>
        </div>

        <button
          onClick={() => setIsEventModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <MdAdd className="text-xl" />
          <span>Add Event</span>
        </button>
      </div>

      <Table
        data={upcomingEvents}
        columns={columns}
        emptyMessage="No events found"
      />

      {isEventModalOpen && (
        <AddEditEventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};
