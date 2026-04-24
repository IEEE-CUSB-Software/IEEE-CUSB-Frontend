import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { HiTrophy } from 'react-icons/hi2';
import { FiEdit2, FiTrash2, FiAward } from 'react-icons/fi';
import { type ColumnDef } from '@ieee-ui/ui';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import {
  SectionHeader,
  AddButton,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
} from '@/features/admin/components/shared/AdminPageComponents';
import AddEditAwardModal from '@/features/admin/components/awardAdminPanel/AddEditAwardModal';
import AwardDetailModal from '@/features/admin/components/awardAdminPanel/AwardDetailModal';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
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
import { AWARD_SOURCE_LABELS } from '@/shared/types/award.types';
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
  const [deleteAwardTarget, setDeleteAwardTarget] = useState<Award | null>(
    null
  );
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
              {AWARD_SOURCE_LABELS[item.source]} • {item.year}
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
      <SectionHeader
        icon={<FiAward className="w-5 h-5 text-primary" />}
        title="Awards Management"
        subtitle="Manage IEEE awards and recognitions"
        isDark={isDark}
        action={<AddButton label="Add Award" onClick={handleAdd} />}
      />

      {/* ── Search bar ──────────────────────────────────────── */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by title or description…"
        isDark={isDark}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading awards…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching awards' : 'No awards yet'}
          onAdd={!search ? handleAdd : undefined}
          addLabel="Add Award"
        />
      ) : (
        <>
          <ResponsiveDataList
            data={filtered}
            columns={columns}
            isDark={isDark}
            renderMobileCard={award => (
              <AdminMobileCard
                isDark={isDark}
                title={award.title}
                subtitle={award.description}
                badge={`${AWARD_SOURCE_LABELS[award.source]} • ${award.year}`}
                avatar={
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}
                  >
                    <img
                      src={award.image_url || IEEETrophy}
                      alt="trophy"
                      className="w-6 h-6 object-contain"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src = IEEETrophy;
                      }}
                    />
                  </div>
                }
                onEdit={() => handleEdit(award)}
                onDelete={() => handleDelete(award)}
                onView={() => handleView(award)}
              />
            )}
          />

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
      <ConfirmDeleteModal
        isOpen={!!deleteAwardTarget}
        itemName={deleteAwardTarget?.title ?? ''}
        entityLabel="award"
        isDark={isDark}
        isPending={deleteAward.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteAwardTarget(null)}
      />
    </div>
  );
};
