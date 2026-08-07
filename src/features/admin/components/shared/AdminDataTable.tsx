import { ReactNode } from 'react';
import { ColumnDef } from '@ieee-ui/ui';
import { Pagination } from '@/shared/components/ui/Pagination';
import {
  SectionHeader,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
  ResponsiveDataList,
} from './AdminPageComponents';

export interface AdminDataTableProps<T> {
  /** The list of data items to render */
  data: T[];
  /** Column definitions for the desktop table */
  columns: ColumnDef<T>[];
  /** Render function for the mobile card view */
  renderMobileCard: (item: T) => ReactNode;

  /** Header title */
  title: string;
  /** Header subtitle */
  subtitle?: string;
  /** Header icon */
  icon?: ReactNode;
  /** Button label for adding a new item */
  addLabel?: string;
  /** Handler for adding a new item */
  onAdd?: () => void;

  /** Search text state */
  search?: string;
  /** Search text change handler */
  onSearchChange?: (val: string) => void;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;

  /** Slot for custom filter components (e.g., dropdowns) */
  customFilters?: ReactNode;

  /** Indicates if data is currently loading */
  isLoading?: boolean;
  /** Custom message when there are no items to display */
  emptyMessage?: string;

  /** Current active page */
  page?: number;
  /** Total number of pages (if undefined or 0, pagination is hidden) */
  totalPages?: number;
  /** Total count of items */
  totalCount?: number;
  /** Page change handler */
  onPageChange?: (page: number) => void;

  /** Indicates if dark mode is active */
  isDark?: boolean;
}

export function AdminDataTable<T extends { id: string }>({
  data,
  columns,
  renderMobileCard,
  title,
  subtitle,
  icon,
  addLabel,
  onAdd,
  search = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  customFilters,
  isLoading,
  emptyMessage = 'No items found',
  page,
  totalPages,
  totalCount,
  onPageChange,
  isDark = false,
}: AdminDataTableProps<T>) {
  const hasPagination =
    totalPages !== undefined &&
    totalPages > 0 &&
    page !== undefined &&
    onPageChange !== undefined;

  return (
    <div className="space-y-6">
      {/* ── Page Header ──────────────────────────────────────── */}
      <SectionHeader
        icon={icon}
        title={title}
        subtitle={subtitle || ''}
        isDark={isDark}
        action={
          onAdd && addLabel ? (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 flex-shrink-0"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              {addLabel}
            </button>
          ) : undefined
        }
      />

      {/* ── Filters & Search ─────────────────────────────────── */}
      {(onSearchChange || customFilters) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {onSearchChange && (
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
                isDark={isDark}
              />
            </div>
          )}
          {customFilters && (
            <div className="flex flex-shrink-0 items-center gap-3">
              {customFilters}
            </div>
          )}
        </div>
      )}

      {/* ── Content Area ─────────────────────────────────────── */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading data..." />
      ) : data.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching results found.' : emptyMessage}
          onAdd={!search ? onAdd : undefined}
          addLabel={addLabel}
        />
      ) : (
        <>
          <ResponsiveDataList
            data={data}
            columns={columns}
            isDark={isDark}
            renderMobileCard={renderMobileCard}
          />

          {/* ── Footer Stats & Pagination ──────────────────────── */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 ${
              hasPagination ? 'justify-between' : 'justify-center'
            }`}
          >
            {totalCount !== undefined && (
              <p
                className={`text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                Showing {data.length} of {totalCount} items
              </p>
            )}

            {hasPagination && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
