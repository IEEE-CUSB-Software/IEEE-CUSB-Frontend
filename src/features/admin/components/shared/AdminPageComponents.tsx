import React from 'react';
import { MdAdd } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { Table, type ColumnDef } from '@ieee-ui/ui';

/* ============================================================
   Section Header helper
   ============================================================ */
export const SectionHeader = ({
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
        className={`p-2.5 rounded-xl ${
          isDark ? 'bg-primary/20' : 'bg-primary/10'
        }`}
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
export const AddButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 flex-shrink-0"
  >
    <MdAdd className="text-xl" />
    {label}
  </button>
);

/* ============================================================
   Responsive data list — table on desktop, cards on mobile
   ============================================================ */
export function ResponsiveDataList<T extends { id: string }>({
  data,
  columns,
  isDark,
  renderMobileCard,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  isDark: boolean;
  renderMobileCard: (item: T) => React.ReactNode;
}) {
  return (
    <>
      {/* Mobile – Cards */}
      <div className="block md:hidden space-y-3">
        {data.map(item => (
          <div key={item.id}>{renderMobileCard(item)}</div>
        ))}
      </div>
      {/* Desktop – Table */}
      <div
        className={`hidden md:block rounded-2xl overflow-hidden border transition-colors duration-300 ${
          isDark ? 'border-gray-800' : 'border-gray-100 shadow-sm'
        }`}
      >
        <Table data={data} columns={columns} emptyMessage="" darkMode={isDark} />
      </div>
    </>
  );
}

/* ============================================================
   Shared UI helpers
   ============================================================ */
export const SearchBar = ({
  value,
  onChange,
  placeholder,
  isDark,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  isDark: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900 border-gray-800 focus-within:border-primary/50'
        : 'bg-white border-gray-200 focus-within:border-primary/40 shadow-sm'
    }`}
  >
    <FiSearch
      className={`w-4 h-4 flex-shrink-0 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}
    />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`flex-1 text-sm bg-transparent outline-none ${
        isDark
          ? 'text-white placeholder:text-gray-600'
          : 'text-gray-900 placeholder:text-gray-400'
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

export const LoadingBlock = ({
  isDark,
  text,
}: {
  isDark: boolean;
  text: string;
}) => (
  <div
    className={`rounded-2xl p-12 flex items-center justify-center border ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {text}
      </p>
    </div>
  </div>
);

export const EmptyBlock = ({
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
    <p
      className={`font-semibold text-base ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
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
