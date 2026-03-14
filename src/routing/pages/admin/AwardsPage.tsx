import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2, FiAward, FiSearch } from 'react-icons/fi';
import { Table, type ColumnDef } from '@ieee-ui/ui';
import { MobileAwardCard } from '@/features/admin/components/awardAdminPanel/MobileAwardCard';
import AddEditAwardModal from '@/features/admin/components/awardAdminPanel/AddEditAwardModal';
import AwardDetailModal from '@/features/admin/components/awardAdminPanel/AwardDetailModal';
import { MOCK_AWARDS } from '@/features/admin/constants/awardsData';
import type { Award, AwardCategory } from '@/features/admin/types/awardTypes';
import toast from 'react-hot-toast';
import IEEETrophy from '@/assets/IEEE_Trophy.png';

/* ── Category colour mapping ─────────────────────────────────── */
const CATEGORY_COLORS: Record<
  AwardCategory,
  { bg: string; text: string; dot: string }
> = {
  'Technical Excellence': {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    dot: 'bg-blue-600',
  },
  Leadership: {
    bg: 'bg-purple-100',
    text: 'text-purple-900',
    dot: 'bg-purple-600',
  },
  'Community Impact': {
    bg: 'bg-green-100',
    text: 'text-green-900',
    dot: 'bg-green-600',
  },
  Innovation: {
    bg: 'bg-orange-100',
    text: 'text-orange-900',
    dot: 'bg-orange-600',
  },
  'Academic Achievement': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-900',
    dot: 'bg-yellow-600',
  },
  'Volunteer of the Year': {
    bg: 'bg-rose-100',
    text: 'text-rose-900',
    dot: 'bg-rose-600',
  },
};

const CATEGORY_COLORS_DARK: Record<
  AwardCategory,
  { bg: string; text: string; dot: string }
> = {
  'Technical Excellence': {
    bg: 'bg-blue-900/30',
    text: 'text-blue-200',
    dot: 'bg-blue-400',
  },
  Leadership: {
    bg: 'bg-purple-900/30',
    text: 'text-purple-200',
    dot: 'bg-purple-400',
  },
  'Community Impact': {
    bg: 'bg-green-900/30',
    text: 'text-green-200',
    dot: 'bg-green-400',
  },
  Innovation: {
    bg: 'bg-orange-900/30',
    text: 'text-orange-200',
    dot: 'bg-orange-400',
  },
  'Academic Achievement': {
    bg: 'bg-yellow-900/30',
    text: 'text-yellow-200',
    dot: 'bg-yellow-400',
  },
  'Volunteer of the Year': {
    bg: 'bg-rose-900/30',
    text: 'text-rose-200',
    dot: 'bg-rose-400',
  },
};

const getCategoryStyle = (category: AwardCategory, isDark: boolean) => {
  return isDark
    ? (CATEGORY_COLORS_DARK[category] ?? {
        bg: 'bg-gray-800',
        text: 'text-gray-200',
        dot: 'bg-gray-500',
      })
    : (CATEGORY_COLORS[category] ?? {
        bg: 'bg-gray-100',
        text: 'text-gray-900',
        dot: 'bg-gray-500',
      });
};

/* ── Stat card sub-component ─────────────────────────────────── */
const StatCard = ({
  label,
  value,
  isDark,
  accent,
}: {
  label: string;
  value: string | number;
  isDark: boolean;
  accent: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 ${
      isDark
        ? 'bg-gray-900 border-gray-800'
        : 'bg-white border-gray-100 shadow-sm'
    }`}
  >
    {/* decorative gradient blob */}
    <div
      className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 ${accent}`}
    />
    <p
      className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}
    >
      {label}
    </p>
    <p
      className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
    >
      {value}
    </p>
  </div>
);

/* ── Main page ───────────────────────────────────────────────── */
export const AwardsPage = () => {
  const { isDark } = useTheme();

  const [awards, setAwards] = useState<Award[]>(MOCK_AWARDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | undefined>(
    undefined
  );
  const [viewAward, setViewAward] = useState<Award | null>(null);
  const [search, setSearch] = useState('');

  /* filtered list */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return awards;
    return awards.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.recipient.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        String(a.year).includes(q)
    );
  }, [awards, search]);

  /* stats */
  const uniqueCategories = useMemo(
    () => new Set(awards.map(a => a.category)).size,
    [awards]
  );
  const latestYear = useMemo(
    () => (awards.length ? Math.max(...awards.map(a => a.year)) : '—'),
    [awards]
  );

  /* handlers */
  const handleAdd = useCallback(() => {
    setSelectedAward(undefined);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((award: Award) => {
    setSelectedAward(award);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((award: Award) => {
    if (window.confirm(`Are you sure you want to delete "${award.title}"?`)) {
      setAwards(prev => prev.filter(a => a.id !== award.id));
      toast.success(`"${award.title}" deleted.`);
    }
  }, []);

  const handleSave = useCallback(
    (data: Omit<Award, 'id'> & { id?: string }) => {
      if (data.id) {
        setAwards(prev =>
          prev.map(a => (a.id === data.id ? (data as Award) : a))
        );
        toast.success('Award updated successfully.');
      } else {
        setAwards(prev => [
          { ...data, id: String(Date.now()) } as Award,
          ...prev,
        ]);
        toast.success('Award created successfully.');
      }
      setIsModalOpen(false);
      setSelectedAward(undefined);
    },
    []
  );

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAward(undefined);
  }, []);

  const handleView = useCallback((award: Award) => {
    setViewAward(award);
  }, []);

  const handleCloseView = useCallback(() => {
    setViewAward(null);
  }, []);

  /* table columns */
  const columns = useMemo<ColumnDef<Award>[]>(
    () => [
      {
        header: 'Award',
        cell: (item: Award) => (
          <div
            onClick={() => handleView(item)}
            className="flex items-center gap-3 min-w-0 cursor-pointer"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden ${
                isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'
              }`}
            >
              <img src={IEEETrophy} alt="trophy" className="w-6 h-6 object-contain" />
            </div>
            <div className="min-w-0">
              <p
                className={`font-semibold text-sm truncate hover:underline ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </p>
              <p
                className={`text-xs truncate ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {item.recipient}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Category',
        cell: (item: Award) => {
          const style = getCategoryStyle(item.category, isDark);
          return (
            <div onClick={() => handleView(item)} className="cursor-pointer">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style.bg} ${style.text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`}
                />
                {item.category}
              </span>
            </div>
          );
        },
      },
      {
        header: 'Year',
        cell: (item: Award) => (
          <div onClick={() => handleView(item)} className="cursor-pointer">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              {item.year}
            </span>
          </div>
        ),
        className: 'text-center',
      },
      {
        header: 'Description',
        cell: (item: Award) => (
          <div onClick={() => handleView(item)} className="cursor-pointer">
            <span
              className={`line-clamp-2 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              title={item.description}
            >
              {item.description}
            </span>
          </div>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: Award) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleEdit(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit award"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleDelete(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete award"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark, handleEdit, handleDelete, handleView]
  );

  return (
    <div className="space-y-6">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${
              isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'
            }`}
          >
            <FiAward
              className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`}
            />
          </div>
          <div>
            <h1
              className={`text-2xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Awards Management
            </h1>
            <p
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Manage IEEE awards and recognitions
            </p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20"
        >
          <MdAdd className="text-xl" />
          Add Award
        </button>
      </div>

      {/* ── Stats row ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Awards"
          value={awards.length}
          isDark={isDark}
          accent="bg-yellow-400"
        />
        <StatCard
          label="Categories"
          value={uniqueCategories}
          isDark={isDark}
          accent="bg-purple-400"
        />
        <StatCard
          label="Latest Year"
          value={latestYear}
          isDark={isDark}
          accent="bg-blue-400"
        />
      </div>

      {/* ── Search bar ──────────────────────────────────────── */}
      <div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-900 border-gray-800 focus-within:border-primary/50'
            : 'bg-white border-gray-200 focus-within:border-primary/40 shadow-sm'
        }`}
      >
        <FiSearch
          className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        />
        <input
          type="text"
          placeholder="Search by title, recipient, category or year…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`flex-1 text-sm bg-transparent outline-none placeholder:transition-colors ${
            isDark
              ? 'text-white placeholder:text-gray-600'
              : 'text-gray-900 placeholder:text-gray-400'
          }`}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className={`text-xs px-2 py-0.5 rounded-md transition-colors ${
              isDark
                ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div
          className={`rounded-2xl p-12 flex flex-col items-center gap-4 border transition-colors duration-300 ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <FiAward
              className={`w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}
            />
          </div>
          <div className="text-center">
            <p
              className={`font-semibold text-base ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {search ? 'No matching awards' : 'No awards yet'}
            </p>
            <p
              className={`text-sm mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
            >
              {search
                ? 'Try a different search term.'
                : 'Click "Add Award" to create your first one.'}
            </p>
          </div>
          {!search && (
            <button
              onClick={handleAdd}
              className="mt-2 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <MdAdd className="text-base" />
              Add Award
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile – Cards */}
          <div className="block md:hidden space-y-3">
            {filtered.map(award => (
              <MobileAwardCard
                key={award.id}
                award={award}
                isDark={isDark}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>

          {/* Desktop – Table */}
          <div
            className={`hidden md:block rounded-2xl overflow-hidden border transition-colors duration-300 ${
              isDark ? 'border-gray-800' : 'border-gray-100 shadow-sm'
            }`}
          >
            <Table
              data={filtered}
              columns={columns}
              emptyMessage="No awards found"
              darkMode={isDark}
            />
          </div>

          {/* Result count */}
          {search && (
            <p
              className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Showing {filtered.length} of {awards.length} awards
            </p>
          )}
        </>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <AddEditAwardModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
          award={selectedAward}
        />
      )}

      {/* Detail Modal */}
      <AwardDetailModal award={viewAward} onClose={handleCloseView} />
    </div>
  );
};
