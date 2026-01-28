import { useState, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Table, type ColumnDef } from '@ieee-ui/ui';
import AddEditPostModal from '../../../features/admin/components/posts/AddEditPostModal';

// Mock Data
const posts = [
  {
    id: 1,
    title: 'Recap: Annual Welcome Party',
    author: 'Sarah Ahmed',
    date: 'Oct 21, 2025',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Upcoming Workshop: React JS',
    author: 'Ahmed Fathy',
    date: 'Oct 10, 2025',
    status: 'Draft',
  },
  {
    id: 3,
    title: 'IEEE CUSB Achievements 2024',
    author: 'Board Member',
    date: 'Jan 15, 2025',
    status: 'Published',
  },
];

export const PostsPage = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const columns = useMemo<ColumnDef<(typeof posts)[0]>[]>(
    () => [
      {
        header: 'Post Title',
        accessorKey: 'title',
        className: 'font-medium text-gray-900',
      },
      {
        header: 'Author',
        accessorKey: 'author',
        className: 'text-gray-600',
      },
      {
        header: 'Date',
        accessorKey: 'date',
        className: 'text-gray-600',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: item => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.status === 'Published'
                ? 'bg-green-50 text-green-700'
                : 'bg-yellow-50 text-yellow-700'
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-center">
            Blog Posts
          </h1>
          <p className="text-gray-500 sm:text-center">
            Manage blog posts and articles
          </p>
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <MdAdd className="text-xl" />
          <span>Create Post</span>
        </button>
      </div>

      <Table data={posts} columns={columns} emptyMessage="No posts found" />

      {isPostModalOpen && (
        <AddEditPostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
    </div>
  );
};
