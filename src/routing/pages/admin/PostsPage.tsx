import { useState, useMemo } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { type ColumnDef } from '@ieee-ui/ui';
import { DataTable } from '@ieee-ui/ui';
import AddEditPostModal from '../../../features/admin/components/posts/AddEditPostModal';
// Mock Data
const posts = [
  {
    id: '1',
    title: 'Recap: Annual Welcome Party',
    author: 'Sarah Ahmed',
    date: 'Oct 21, 2025',
    status: 'Published',
  },
  {
    id: '2',
    title: 'Upcoming Workshop: React JS',
    author: 'Ahmed Fathy',
    date: 'Oct 10, 2025',
    status: 'Draft',
  },
  {
    id: '3',
    title: 'IEEE CUSB Achievements 2024',
    author: 'Board Member',
    date: 'Jan 15, 2025',
    status: 'Published',
  },
];

export const PostsPage = () => {
  const { isDark } = useTheme();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const columns = useMemo<ColumnDef<(typeof posts)[0]>[]>(
    () => [
      {
        header: 'Post Title',
        accessorKey: 'title',
        className: `font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`,
      },
      {
        header: 'Author',
        accessorKey: 'author',
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Date',
        accessorKey: 'date',
        className: `transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: item => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${
              item.status === 'Published'
                ? isDark
                  ? 'bg-green-900/30 text-green-300'
                  : 'bg-green-50 text-green-700'
                : isDark
                  ? 'bg-yellow-900/30 text-yellow-300'
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

  const [search, setSearch] = useState('');
  
  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <DataTable
        title="Blog Posts"
        subtitle="Manage blog posts and articles"
        headerIcon={<FiEdit2 className="w-5 h-5 text-primary" />}
        headerAction={
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 flex-shrink-0"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Create Post
          </button>
        }
        data={filteredPosts}
        columns={columns}
        isLoading={false}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search posts..."
        emptyMessage="No posts found"
        darkMode={isDark}
        renderMobileCard={post => (
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} space-y-4`}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.author} • {post.date}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  post.status === 'Published'
                    ? isDark
                      ? 'bg-green-900/30 text-green-300'
                      : 'bg-green-50 text-green-700'
                    : isDark
                      ? 'bg-yellow-900/30 text-yellow-300'
                      : 'bg-yellow-50 text-yellow-700'
                }`}
              >
                {post.status}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-500 hover:text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/5'}`}>
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {isPostModalOpen && (
        <AddEditPostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
    </div>
  );
};
