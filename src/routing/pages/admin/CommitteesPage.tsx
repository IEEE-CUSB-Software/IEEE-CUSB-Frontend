import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { MdAdd } from 'react-icons/md';
import { HiChevronRight } from 'react-icons/hi2';
import {
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiGrid,
  FiSearch,
  FiChevronLeft,
} from 'react-icons/fi';
import { Table, type ColumnDef } from '@ieee-ui/ui';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';

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
          category={view.category}
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
   Section Header helper
   ============================================================ */
const SectionHeader = ({
  icon,
  title,
  subtitle,
  isDark,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isDark: boolean;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <div
        className={`p-2.5 rounded-xl ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}
      >
        {icon}
      </div>
      <div>
        <h2
          className={`text-xl font-bold leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      </div>
    </div>
    {action}
  </div>
);

/* ============================================================
   Add Button helper
   ============================================================ */
const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20"
  >
    <MdAdd className="text-xl" />
    {label}
  </button>
);

/* ============================================================
   HOME VIEW – Board table + Categories cards
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
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
              }`}
            >
              {item.name.charAt(0)}
            </div>
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
              isDark
                ? 'bg-primary/15 text-primary'
                : 'bg-primary/10 text-primary'
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
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
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
        icon={<FiUsers className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-primary'}`} />}
        title="High Board"
        subtitle="Manage executive board members"
        isDark={isDark}
        action={
          <AddButton
            label="Add Board Member"
            onClick={() => { setEditTarget(undefined); setModalOpen(true); }}
          />
        }
      />

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} isDark={isDark} />

      {/* Table */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading board…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching board members' : 'No board members yet'}
          onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined}
          addLabel="Add Board Member"
        />
      ) : (
        <div
          className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
            isDark ? 'border-gray-800' : 'border-gray-100 shadow-sm'
          }`}
        >
          <Table data={filtered} columns={columns} emptyMessage="" darkMode={isDark} />
        </div>
      )}

      {/* Modals */}
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

  const categories = useMemo(() => cats ?? [], [cats]);

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

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<FiGrid className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-primary'}`} />}
        title="Categories"
        subtitle="Click a category to manage its committees"
        isDark={isDark}
        action={
          <AddButton
            label="Add Category"
            onClick={() => { setEditTarget(undefined); setModalOpen(true); }}
          />
        }
      />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading categories…" />
      ) : categories.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message="No categories yet"
          onAdd={() => { setEditTarget(undefined); setModalOpen(true); }}
          addLabel="Add Category"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigate({ kind: 'committees', category: cat })}
              className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-gray-900 border-gray-800 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {cat.name}
                </h3>
                <div
                  className="flex items-center gap-1"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => { setEditTarget(cat); setModalOpen(true); }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? 'text-gray-600 hover:text-primary hover:bg-primary/10'
                        : 'text-gray-400 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? 'text-gray-600 hover:text-red-400 hover:bg-red-400/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p
                className={`text-sm line-clamp-2 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                {cat.description}
              </p>
              <div
                className={`mt-3 flex items-center gap-1 text-xs font-semibold ${
                  isDark ? 'text-primary/70' : 'text-primary'
                } group-hover:gap-2 transition-all`}
              >
                View Committees
                <HiChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
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
          if (deleteTarget)
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ============================================================
   COMMITTEES VIEW – table of committees for a category
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
            className="flex items-center gap-3 min-w-0 cursor-pointer"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}
            >
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold text-sm truncate hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'About',
        cell: (item: Committee) => (
          <span className={`line-clamp-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {item.about}
          </span>
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
                isDark
                  ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View members"
            >
              <FiUsers className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
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
        icon={<FiUsers className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-primary'}`} />}
        title={`${category.name} Committees`}
        subtitle="Manage committees in this category"
        isDark={isDark}
        action={
          <AddButton
            label="Add Committee"
            onClick={() => { setEditTarget(undefined); setModalOpen(true); }}
          />
        }
      />

      <SearchBar value={search} onChange={setSearch} isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading committees…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching committees' : 'No committees in this category yet'}
          onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined}
          addLabel="Add Committee"
        />
      ) : (
        <div
          className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
            isDark ? 'border-gray-800' : 'border-gray-100 shadow-sm'
          }`}
        >
          <Table data={filtered} columns={columns} emptyMessage="" darkMode={isDark} />
        </div>
      )}

      {/* Modals */}
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
          if (deleteTarget)
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ============================================================
   MEMBERS VIEW – table of members for a committee
   ============================================================ */
const MembersView = ({
  isDark,
  committee,
  category,
}: {
  isDark: boolean;
  committee: Committee;
  category: CommitteeCategory;
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

  const columns = useMemo<ColumnDef<CommitteeMember>[]>(
    () => [
      {
        header: 'Member',
        cell: (item: CommitteeMember) => (
          <div className="flex items-center gap-3 min-w-0">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'
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
        cell: (item: CommitteeMember) => {
          const colors: Record<string, string> = {
            head: isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700',
            vice_head: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700',
            member: isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700',
          };
          return (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                colors[item.role] ?? colors.member
              }`}
            >
              {MEMBER_ROLE_LABELS[item.role] ?? item.role}
            </span>
          );
        },
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: CommitteeMember) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => { setEditTarget(item); setModalOpen(true); }}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setDeleteTarget(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
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
        icon={<FiUsers className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-primary'}`} />}
        title={`${committee.name} Members`}
        subtitle={`Members of ${committee.name} — ${category.name}`}
        isDark={isDark}
        action={
          <AddButton
            label="Add Member"
            onClick={() => { setEditTarget(undefined); setModalOpen(true); }}
          />
        }
      />

      <SearchBar value={search} onChange={setSearch} isDark={isDark} />

      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading members…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching members' : 'No members yet'}
          onAdd={!search ? () => { setEditTarget(undefined); setModalOpen(true); } : undefined}
          addLabel="Add Member"
        />
      ) : (
        <div
          className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
            isDark ? 'border-gray-800' : 'border-gray-100 shadow-sm'
          }`}
        >
          <Table data={filtered} columns={columns} emptyMessage="" darkMode={isDark} />
        </div>
      )}

      {/* Modals */}
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
          if (deleteTarget)
            deleteMutation.mutate(
              { id: deleteTarget.id, committee_id: committee.id },
              { onSuccess: () => setDeleteTarget(null) }
            );
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

/* ============================================================
   Shared UI helpers
   ============================================================ */
const SearchBar = ({
  value,
  onChange,
  isDark,
}: {
  value: string;
  onChange: (v: string) => void;
  isDark: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900 border-gray-800 focus-within:border-primary/50'
        : 'bg-white border-gray-200 focus-within:border-primary/40 shadow-sm'
    }`}
  >
    <FiSearch className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
    <input
      type="text"
      placeholder="Search…"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`flex-1 text-sm bg-transparent outline-none ${
        isDark ? 'text-white placeholder:text-gray-600' : 'text-gray-900 placeholder:text-gray-400'
      }`}
    />
    {value && (
      <button
        onClick={() => onChange('')}
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
);

const LoadingBlock = ({ isDark, text }: { isDark: boolean; text: string }) => (
  <div
    className={`rounded-2xl p-12 flex items-center justify-center border ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{text}</p>
    </div>
  </div>
);

const EmptyBlock = ({
  isDark,
  message,
  onAdd,
  addLabel,
}: {
  isDark: boolean;
  message: string;
  onAdd?: () => void;
  addLabel?: string;
}) => (
  <div
    className={`rounded-2xl p-12 flex flex-col items-center gap-4 border transition-colors duration-300 ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}
  >
    <p className={`font-semibold text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {message}
    </p>
    {onAdd && addLabel && (
      <button
        onClick={onAdd}
        className="mt-2 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        <MdAdd className="text-base" />
        {addLabel}
      </button>
    )}
  </div>
);
