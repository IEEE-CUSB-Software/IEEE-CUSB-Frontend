import React from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

interface Action {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'danger' | 'info';
}

export interface AdminMobileCardProps {
  isDark: boolean;
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  avatar?: React.ReactNode;
  onClick?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  extraActions?: Action[];
}

const colorMap = {
  primary: {
    dark: 'text-gray-400 hover:text-primary hover:bg-primary/10 border border-gray-800 hover:border-primary/30',
    light:
      'text-gray-600 hover:text-primary hover:bg-primary/5 border border-gray-100 hover:border-primary/20',
  },
  danger: {
    dark: 'text-gray-400 hover:text-red-400 hover:bg-red-400/10 border border-gray-800 hover:border-red-400/30',
    light:
      'text-gray-600 hover:text-red-500 hover:bg-red-50 border border-gray-100 hover:border-red-200',
  },
  info: {
    dark: 'text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 border border-gray-800 hover:border-blue-400/30',
    light:
      'text-gray-600 hover:text-blue-500 hover:bg-blue-50 border border-gray-100 hover:border-blue-200',
  },
};

export const AdminMobileCard: React.FC<AdminMobileCardProps> = ({
  isDark,
  title,
  subtitle,
  badge,
  description,
  avatar,
  onClick,
  onEdit,
  onView,
  onDelete,
  extraActions = [],
}) => {
  const allActions: Action[] = [
    ...(onEdit
      ? [
          {
            icon: <FiEdit2 className="w-3.5 h-3.5" />,
            label: 'Edit',
            onClick: onEdit,
            color: 'primary' as const,
          },
        ]
      : []),
    ...(onView
      ? [
          {
            icon: <FiEye className="w-3.5 h-3.5" />,
            label: 'View',
            onClick: onView,
            color: 'info' as const,
          },
        ]
      : []),
    ...extraActions,
    ...(onDelete
      ? [
          {
            icon: <FiTrash2 className="w-3.5 h-3.5" />,
            label: 'Delete',
            onClick: onDelete,
            color: 'danger' as const,
          },
        ]
      : []),
  ];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ease-out select-none ${
        onClick
          ? 'cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]'
          : ''
      } ${
        isDark
          ? 'bg-gray-900 border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-black/30'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
      }`}
    >
      {/* Accent strip */}
      <div
        className={`h-1 w-full ${isDark ? 'bg-primary/60' : 'bg-primary'}`}
      />
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-2.5 mb-2">
          {avatar && <div className="flex-shrink-0">{avatar}</div>}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`font-bold text-sm leading-tight truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {title}
              </h3>
              {badge && (
                <span
                  className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-lg border whitespace-nowrap ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-gray-300'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p
                className={`text-xs mt-0.5 truncate ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p
            className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            {description}
          </p>
        )}

        {/* Actions */}
        {allActions.length > 0 && (
          <div
            className={`flex items-center gap-2 pt-3 border-t ${
              isDark ? 'border-gray-800' : 'border-gray-100'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {allActions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  colorMap[action.color ?? 'primary'][isDark ? 'dark' : 'light']
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
