import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { MdAdd } from 'react-icons/md';
import { FiEdit2, FiTrash2, FiAward, FiSearch } from 'react-icons/fi';
import { HiTrophy } from 'react-icons/hi2';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Table, type ColumnDef, Modal, Button } from '@ieee-ui/ui';
import { MobileAwardCard } from '@/features/admin/components/awardAdminPanel/MobileAwardCard';
import AddEditAwardModal from '@/features/admin/components/awardAdminPanel/AddEditAwardModal';
import AwardDetailModal from '@/features/admin/components/awardAdminPanel/AwardDetailModal';
import {
  useAwards,
  useCreateAward,
  useUpdateAward,
  useDeleteAward,
} from '@/shared/queries/awards';
import type {
  Award,
  CreateAwardRequest,
  UpdateAwardRequest,
} from '@/shared/types/award.types';
import IEEETrophy from '@/assets/IEEE_Trophy.png';

/* ── Stat card sub-component (used when stats row is enabled) ── */
// const StatCard = ({
//   label,
//   value,
//   isDark,
//   accent,
// }: {
//   label: string;
//   value: string | number;
//   isDark: boolean;
//   accent: string;
// }) => (
//   <div
//     className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 ${
//       isDark
//         ? 'bg-gray-900 border-gray-800'
//         : 'bg-white border-gray-100 shadow-sm'
//     }`}
//   >
//     <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 ${accent}`} />
//     <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
//       {label}
//     </p>
//     <p className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
//       {value}
//     </p>
//   </div>
// );

/* ── Delete confirmation modal ───────────────────────────────── */
const DeleteAwardModal = ({
  award,
  isDark,
  isPending,
  onConfirm,
  onClose,
}: {
  award: Award | null;
  isDark: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) => (
  <Modal
    title="Delete Award"
    isOpen={!!award}
    onClose={onClose}
    size="small"
    darkMode={isDark}
  >
    {award && (
      <div className="space-y-5">
        <div className="flex justify-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              isDark ? 'bg-red-900/30' : 'bg-red-50'
            }`}
          >
            <FaExclamationTriangle
              className={`w-7 h-7 ${isDark ? 'text-red-400' : 'text-red-500'}`}
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Are you sure you want to delete this award?
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You are about to delete{' '}
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              "{award.title}"
            </span>
            . This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
            disabled={isPending}
          />
          <Button
            buttonText={isPending ? 'Deleting…' : 'Delete Award'}
            onClick={onConfirm}
            type="danger"
            width="fit"
            darkMode={isDark}
            disabled={isPending}
          />
        </div>
      </div>
    )}
  </Modal>
);

/* ── Main page ───────────────────────────────────────────────── */
export const AwardsPage = () => {
  const { isDark } = useTheme();

  /* API hooks */
  const { data: awardsData, isLoading } = useAwards();
  const createAward = useCreateAward();
  const updateAward = useUpdateAward();
  const deleteAward = useDeleteAward();

  const awards = useMemo(() => awardsData ?? [], [awardsData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | undefined>(
    undefined
  );
  const [viewAward, setViewAward] = useState<Award | null>(null);
  const [deleteAwardTarget, setDeleteAwardTarget] = useState<Award | null>(null);
  const [search, setSearch] = useState('');

  /* filtered list */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return awards;
    return awards.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        String(a.won_count).includes(q)
    );
  }, [awards, search]);

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
    setDeleteAwardTarget(award);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteAwardTarget) return;
    deleteAward.mutate(deleteAwardTarget.id, {
      onSuccess: () => setDeleteAwardTarget(null),
    });
  }, [deleteAward, deleteAwardTarget]);

  const handleSave = useCallback(
    (data: CreateAwardRequest | UpdateAwardRequest, id?: string) => {
      if (id) {
        updateAward.mutate(
          { id, data: data as UpdateAwardRequest },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedAward(undefined);
            },
          }
        );
      } else {
        createAward.mutate(data as CreateAwardRequest, {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        });
      }
    },
    [createAward, updateAward]
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
              <img
                src={item.image_url || IEEETrophy}
                alt="trophy"
                className="w-6 h-6 object-contain"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = IEEETrophy;
                }}
              />
            </div>
            <div className="min-w-0">
              <p
                className={`font-semibold text-sm truncate hover:underline ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </p>
              {item.won_count > 0 && (
                <p
                  className={`text-xs truncate flex items-center gap-1 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                >
                  <HiTrophy className="w-3 h-3" />
                  {item.won_count}× won
                </p>
              )}
            </div>
          </div>
        ),
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
              {new Date(item.created_at).getFullYear()}
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

  const isPending = createAward.isPending || updateAward.isPending;

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

      {/* ── Stats row ─────────────────────────────────────────
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Awards"
          value={isLoading ? '…' : awards.length}
          isDark={isDark}
          accent="bg-yellow-400"
        />
        <StatCard
          label="Total Wins"
          value={isLoading ? '…' : totalWins}
          isDark={isDark}
          accent="bg-purple-400"
        />
        <StatCard
          label="Latest Year"
          value={isLoading ? '…' : latestYear}
          isDark={isDark}
          accent="bg-blue-400"
        />
      </div> */}

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
          placeholder="Search by title or description…"
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
      {isLoading ? (
        <div
          className={`rounded-2xl p-12 flex items-center justify-center border ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          <p
            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Loading awards…
          </p>
        </div>
      ) : filtered.length === 0 ? (
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
          isPending={isPending}
        />
      )}

      {/* Detail Modal */}
      <AwardDetailModal award={viewAward} onClose={handleCloseView} />

      {/* Delete Confirmation Modal */}
      <DeleteAwardModal
        award={deleteAwardTarget}
        isDark={isDark}
        isPending={deleteAward.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteAwardTarget(null)}
      />
    </div>
  );
};
