import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { HiChevronRight } from 'react-icons/hi2';
import { FiEdit2, FiTrash2, FiUsers, FiGrid } from 'react-icons/fi';
import { type ColumnDef } from '@ieee-ui/ui';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import {
  SectionHeader,
  AddButton,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
} from '@/features/admin/components/shared/AdminPageComponents';

// ── Queries ─────────────────────────────────────────────────
import {
  useBoard,
  useCreateBoardMember,
  useUpdateBoardMember,
  useDeleteBoardMember,
} from '@/shared/queries/board';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCommitteesByCategory,
  useCreateCommittee,
  useUpdateCommittee,
  useDeleteCommittee,
  useCommitteeMembers,
  useCreateCommitteeMember,
  useUpdateCommitteeMember,
  useDeleteCommitteeMember,
} from '@/shared/queries/committees';

// ── Types ───────────────────────────────────────────────────
import type {
  BoardMember,
  CreateBoardMember,
  UpdateBoardMember,
  CommitteeCategory,
  CreateCategory,
  UpdateCategory,
  Committee,
  CreateCommittee,
  UpdateCommittee,
  CommitteeMember,
  AddCommitteeMember,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';
import { MEMBER_ROLE_LABELS } from '@/shared/types/committees.types';

// ── Modals ──────────────────────────────────────────────────
import AddEditBoardMemberModal from '@/features/admin/components/committeeAdminPanel/AddEditBoardMemberModal';
import AddEditCategoryModal from '@/features/admin/components/committeeAdminPanel/AddEditCategoryModal';
import AddEditCommitteeModal from '@/features/admin/components/committeeAdminPanel/AddEditCommitteeModal';
import AddEditMemberModal from '@/features/admin/components/committeeAdminPanel/AddEditMemberModal';

/* ============================================================
   View state — drives which section is visible
   ============================================================ */
type View =
  | { kind: 'home' }
  | { kind: 'committees'; category: CommitteeCategory }
  | { kind: 'members'; category: CommitteeCategory; committee: Committee };

/* ============================================================
   Main Page Component
   ============================================================ */
export const CommitteesPage = () => {
  const { isDark } = useTheme();
  const [view, setView] = useState<View>({ kind: 'home' });

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <Breadcrumb view={view} onNavigate={setView} isDark={isDark} />

      {view.kind === 'home' && <HomeView isDark={isDark} onNavigate={setView} />}
      {view.kind === 'committees' && (
        <CommitteesView
          isDark={isDark}
          category={view.category}
          onNavigate={setView}
        />
      )}
      {view.kind === 'members' && (
        <MembersView
          isDark={isDark}
          committee={view.committee}
        />
      )}
    </div>
  );
};

/* ============================================================
   Breadcrumb
   ============================================================ */
const Breadcrumb = ({
  view,
  onNavigate,
  isDark,
}: {
  view: View;
  onNavigate: (v: View) => void;
  isDark: boolean;
}) => {
  const crumbs: { label: string; action?: () => void }[] = [
    { label: 'Committees', action: () => onNavigate({ kind: 'home' }) },
  ];
  if (view.kind === 'committees' || view.kind === 'members') {
    crumbs.push({
      label: view.category.name,
      action:
        view.kind === 'members'
          ? () => onNavigate({ kind: 'committees', category: view.category })
          : undefined,
    });
  }
  if (view.kind === 'members') {
    crumbs.push({ label: view.committee.name });
  }

  return (
    <div className="flex items-center gap-1 text-sm flex-wrap">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <HiChevronRight
              className={`w-3.5 h-3.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
            />
          )}
          {c.action ? (
            <button
              onClick={c.action}
              className={`font-medium hover:underline transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {c.label}
            </button>
          ) : (
            <span
              className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {c.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
};


/* ============================================================
   HOME VIEW – Board table + Categories table
   ============================================================ */
const HomeView = ({
  isDark,
  onNavigate,
}: {
  isDark: boolean;
  onNavigate: (v: View) => void;
}) => {
  return (
    <div className="space-y-10">
      <BoardSection isDark={isDark} />
      <hr className={isDark ? 'border-gray-800' : 'border-gray-200'} />
      <CategoriesSection isDark={isDark} onNavigate={onNavigate} />
    </div>
  );
};

/* ── Board Section ───────────────────────────────────────── */
const BoardSection = ({ isDark }: { isDark: boolean }) => {
  const { data: board, isLoading } = useBoard();
  const createMutation = useCreateBoardMember();
  const updateMutation = useUpdateBoardMember();
  const deleteMutation = useDeleteBoardMember();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BoardMember | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<BoardMember | null>(null);
  const [search, setSearch] = useState('');

  const members = useMemo(() => board ?? [], [board]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }, [members, search]);

  const handleSave = useCallback(
    (data: CreateBoardMember | UpdateBoardMember, id?: string) => {
      if (id) {
        updateMutation.mutate(
          { id, data: data as UpdateBoardMember },
          { onSuccess: () => { setModalOpen(false); setEditTarget(undefined); } }
        );
      } else {
        createMutation.mutate(data as CreateBoardMember, {
          onSuccess: () => setModalOpen(false),
        });
      }
    },
    [createMutation, updateMutation]
  );

  const columns = useMemo<ColumnDef<BoardMember>[]>(
    () => [
      {
        header: 'Name',
        cell: (item: BoardMember) => (
          <div className="flex items-center gap-3 min-w-0">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} className="flex-shrink-0 w-9 h-9 rounded-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                }`}
              >
                {item.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
              <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {item.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Role',
        cell: (item: BoardMember) => (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
              isDark ? 'bg-primary/15 text-primary' : 'bg-primary/10 text-primary'
            }`}
          >
            {item.role}
          </span>
        ),
      },
      {
        header: 'Order',
        cell: (item: BoardMember) => (
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            #{item.display_order}
          </span>
        ),
        className: 'text-center',
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: BoardMember) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<FiUsers className="w-5 h-5 text-primary" />}
        title="High Board"
        subtitle="Manage executive board members"
        isDark={isDark}
        action={
          <AddButton label="Add Member" onClick={() => { setEditTarget(undefined); setModalOpen(true); }} />
        }
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search board members…" isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading board…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock isDark={isDark} message={search ? 'No matching board members' : 'No board members yet'} onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined} addLabel="Add Board Member" />
      ) : (
        <ResponsiveDataList
          data={filtered}
          columns={columns}
          isDark={isDark}
          renderMobileCard={item => (
            <AdminMobileCard
              isDark={isDark}
              title={item.name}
              subtitle={item.email}
              badge={`#${item.display_order}`}
              description={item.role}
              avatar={
                item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="flex-shrink-0 w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                    {item.name.charAt(0)}
                  </div>
                )
              }
              onEdit={() => { setEditTarget(item); setModalOpen(true); }}
              onDelete={() => setDeleteTarget(item)}
            />
          )}
        />
      )}

      {modalOpen && (
        <AddEditBoardMemberModal
          member={editTarget}
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditTarget(undefined); }}
          onSave={handleSave}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ''}
        entityLabel="board member"
        isDark={isDark}
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ── Categories Section ──────────────────────────────────── */
const CategoriesSection = ({
  isDark,
  onNavigate,
}: {
  isDark: boolean;
  onNavigate: (v: View) => void;
}) => {
  const { data: cats, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CommitteeCategory | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<CommitteeCategory | null>(null);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => cats ?? [], [cats]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [categories, search]);

  const handleSave = useCallback(
    (data: CreateCategory | UpdateCategory, id?: string) => {
      if (id) {
        updateMutation.mutate(
          { id, data: data as UpdateCategory },
          { onSuccess: () => { setModalOpen(false); setEditTarget(undefined); } }
        );
      } else {
        createMutation.mutate(data as CreateCategory, {
          onSuccess: () => setModalOpen(false),
        });
      }
    },
    [createMutation, updateMutation]
  );

  const columns = useMemo<ColumnDef<CommitteeCategory>[]>(
    () => [
      {
        header: 'Category',
        cell: (item: CommitteeCategory) => (
          <div
            onClick={() => onNavigate({ kind: 'committees', category: item })}
            className="flex items-center gap-3 min-w-0 cursor-pointer group"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                isDark ? 'bg-purple-900/30 text-purple-400 group-hover:bg-purple-900/50' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
              } transition-colors`}
            >
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold text-sm truncate group-hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Description',
        cell: (item: CommitteeCategory) => (
          <div
            onClick={() => onNavigate({ kind: 'committees', category: item })}
            className="cursor-pointer"
          >
            <span className={`line-clamp-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.description}
            </span>
          </div>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: CommitteeCategory) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => onNavigate({ kind: 'committees', category: item })}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View committees"
            >
              <FiUsers className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark, onNavigate]
  );

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<FiGrid className="w-5 h-5 text-primary" />}
        title="Categories"
        subtitle="Manage available committee categories"
        isDark={isDark}
        action={
          <AddButton label="Add Category" onClick={() => { setEditTarget(undefined); setModalOpen(true); }} />
        }
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search categories…" isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading categories…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock isDark={isDark} message={search ? 'No matching categories' : 'No categories yet'} onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined} addLabel="Add Category" />
      ) : (
        <ResponsiveDataList
          data={filtered}
          columns={columns}
          isDark={isDark}
          renderMobileCard={cat => (
            <AdminMobileCard
              isDark={isDark}
              title={cat.name}
              description={cat.description}
              onClick={() => onNavigate({ kind: 'committees', category: cat })}
              avatar={
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                  {cat.name.charAt(0)}
                </div>
              }
              onEdit={() => { setEditTarget(cat); setModalOpen(true); }}
              onDelete={() => setDeleteTarget(cat)}
              extraActions={[
                {
                  icon: <FiUsers className="w-3.5 h-3.5" />,
                  label: 'Committees',
                  onClick: () => onNavigate({ kind: 'committees', category: cat }),
                  color: 'info',
                },
              ]}
            />
          )}
        />
      )}

      {modalOpen && (
        <AddEditCategoryModal
          category={editTarget}
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditTarget(undefined); }}
          onSave={handleSave}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ''}
        entityLabel="category"
        isDark={isDark}
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ============================================================
   COMMITTEES VIEW
   ============================================================ */
const CommitteesView = ({
  isDark,
  category,
  onNavigate,
}: {
  isDark: boolean;
  category: CommitteeCategory;
  onNavigate: (v: View) => void;
}) => {
  const { data: allCategories } = useCategories();
  const { data: comms, isLoading } = useCommitteesByCategory(category.id);
  const createMutation = useCreateCommittee();
  const updateMutation = useUpdateCommittee();
  const deleteMutation = useDeleteCommittee();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Committee | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Committee | null>(null);
  const [search, setSearch] = useState('');

  const committees = useMemo(() => comms ?? [], [comms]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return committees;
    return committees.filter(
      c => c.name.toLowerCase().includes(q) || c.about.toLowerCase().includes(q)
    );
  }, [committees, search]);

  const handleSave = useCallback(
    (data: CreateCommittee | UpdateCommittee, id?: string) => {
      if (id) {
        updateMutation.mutate(
          { id, data: data as UpdateCommittee },
          { onSuccess: () => { setModalOpen(false); setEditTarget(undefined); } }
        );
      } else {
        createMutation.mutate(data as CreateCommittee, {
          onSuccess: () => setModalOpen(false),
        });
      }
    },
    [createMutation, updateMutation]
  );

  const columns = useMemo<ColumnDef<Committee>[]>(
    () => [
      {
        header: 'Committee',
        cell: (item: Committee) => (
          <div
            onClick={() => onNavigate({ kind: 'members', category, committee: item })}
            className="flex items-center gap-3 min-w-0 cursor-pointer group"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                isDark ? 'bg-blue-900/30 text-blue-400 group-hover:bg-blue-900/50' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
              } transition-colors`}
            >
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold text-sm truncate group-hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'About',
        cell: (item: Committee) => (
          <div
            onClick={() => onNavigate({ kind: 'members', category, committee: item })}
            className="cursor-pointer"
          >
            <span className={`line-clamp-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.about}
            </span>
          </div>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: Committee) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => onNavigate({ kind: 'members', category, committee: item })}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View members"
            >
              <FiUsers className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark, category, onNavigate]
  );

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<FiGrid className="w-5 h-5 text-primary" />}
        title="Committees"
        subtitle={`Manage committees in ${category.name}`}
        isDark={isDark}
        action={
          <AddButton label="Add Committee" onClick={() => { setEditTarget(undefined); setModalOpen(true); }} />
        }
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search committees…" isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading committees…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock isDark={isDark} message={search ? 'No matching committees' : 'No committees yet'} onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined} addLabel="Add Committee" />
      ) : (
        <ResponsiveDataList
          data={filtered}
          columns={columns}
          isDark={isDark}
          renderMobileCard={item => (
            <AdminMobileCard
              isDark={isDark}
              title={item.name}
              description={item.about}
              onClick={() => onNavigate({ kind: 'members', category, committee: item })}
              avatar={
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  {item.name.charAt(0)}
                </div>
              }
              onEdit={() => { setEditTarget(item); setModalOpen(true); }}
              onDelete={() => setDeleteTarget(item)}
              extraActions={[
                {
                  icon: <FiUsers className="w-3.5 h-3.5" />,
                  label: 'Members',
                  onClick: () => onNavigate({ kind: 'members', category, committee: item }),
                  color: 'info',
                },
              ]}
            />
          )}
        />
      )}

      {modalOpen && (
        <AddEditCommitteeModal
          committee={editTarget}
          categories={allCategories ?? []}
          defaultCategoryId={category.id}
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditTarget(undefined); }}
          onSave={handleSave}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ''}
        entityLabel="committee"
        isDark={isDark}
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ============================================================
   MEMBERS VIEW
   ============================================================ */
const MembersView = ({
  isDark,
  committee,
}: {
  isDark: boolean;
  committee: Committee;
}) => {
  const { data: mems, isLoading } = useCommitteeMembers(committee.id);
  const createMutation = useCreateCommitteeMember();
  const updateMutation = useUpdateCommitteeMember();
  const deleteMutation = useDeleteCommitteeMember();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CommitteeMember | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<CommitteeMember | null>(null);
  const [search, setSearch] = useState('');

  const members = useMemo(() => mems ?? [], [mems]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
    );
  }, [members, search]);

  const handleSave = useCallback(
    (data: AddCommitteeMember | UpdateCommitteeMember, id?: string) => {
      if (id) {
        updateMutation.mutate(
          { id, committee_id: committee.id, data: data as UpdateCommitteeMember },
          { onSuccess: () => { setModalOpen(false); setEditTarget(undefined); } }
        );
      } else {
        createMutation.mutate(data as AddCommitteeMember, {
          onSuccess: () => setModalOpen(false),
        });
      }
    },
    [createMutation, updateMutation, committee.id]
  );

  const roleColors = (role: string, dark: boolean) => {
    const map: Record<string, string> = {
      head: dark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700',
      vice_head: dark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700',
      member: dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700',
    };
    return map[role] ?? map.member;
  };

  const columns = useMemo<ColumnDef<CommitteeMember>[]>(
    () => [
      {
        header: 'Member',
        cell: (item: CommitteeMember) => (
          <div className="flex items-center gap-3 min-w-0">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} className="flex-shrink-0 w-9 h-9 rounded-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
                {item.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
              <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.email}</p>
            </div>
          </div>
        ),
      },
      {
        header: 'Role',
        cell: (item: CommitteeMember) => (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${roleColors(item.role, isDark)}`}>
            {MEMBER_ROLE_LABELS[item.role] ?? item.role}
          </span>
        ),
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: CommitteeMember) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-500 hover:text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/5'}`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark]
  );

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<FiUsers className="w-5 h-5 text-primary" />}
        title="Members"
        subtitle={`Manage members of ${committee.name}`}
        isDark={isDark}
        action={
          <AddButton label="Add Member" onClick={() => { setEditTarget(undefined); setModalOpen(true); }} />
        }
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search members…" isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading members…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock isDark={isDark} message={search ? 'No matching members' : 'No members yet'} onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined} addLabel="Add Member" />
      ) : (
        <ResponsiveDataList
          data={filtered}
          columns={columns}
          isDark={isDark}
          renderMobileCard={item => (
            <AdminMobileCard
              isDark={isDark}
              title={item.name}
              subtitle={item.email}
              badge={MEMBER_ROLE_LABELS[item.role] ?? item.role}
              avatar={
                item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="flex-shrink-0 w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
                    {item.name.charAt(0)}
                  </div>
                )
              }
              onEdit={() => { setEditTarget(item); setModalOpen(true); }}
              onDelete={() => setDeleteTarget(item)}
            />
          )}
        />
      )}

      {modalOpen && (
        <AddEditMemberModal
          member={editTarget}
          committeeId={committee.id}
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditTarget(undefined); }}
          onSave={handleSave}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ''}
        entityLabel="member"
        isDark={isDark}
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate({ id: deleteTarget.id, committee_id: committee.id }, { onSuccess: () => setDeleteTarget(null) });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

