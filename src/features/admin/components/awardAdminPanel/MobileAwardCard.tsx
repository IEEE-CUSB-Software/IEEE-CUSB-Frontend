import React from 'react';
import { FiEdit2, FiTrash2, FiAward } from 'react-icons/fi';
import type { Award, AwardCategory } from '../../types/awardTypes';

const CATEGORY_COLORS: Record<AwardCategory, { bg: string; text: string; dot: string }> = {
  'Technical Excellence': { bg: 'bg-blue-100', text: 'text-blue-900', dot: 'bg-blue-600' },
  Leadership: { bg: 'bg-purple-100', text: 'text-purple-900', dot: 'bg-purple-600' },
  'Community Impact': { bg: 'bg-green-100', text: 'text-green-900', dot: 'bg-green-600' },
  Innovation: { bg: 'bg-orange-100', text: 'text-orange-900', dot: 'bg-orange-600' },
  'Academic Achievement': { bg: 'bg-yellow-100', text: 'text-yellow-900', dot: 'bg-yellow-600' },
  'Volunteer of the Year': { bg: 'bg-rose-100', text: 'text-rose-900', dot: 'bg-rose-600' },
};

const CATEGORY_COLORS_DARK: Record<AwardCategory, { bg: string; text: string; dot: string }> = {
  'Technical Excellence': { bg: 'bg-blue-900/30', text: 'text-blue-200', dot: 'bg-blue-400' },
  Leadership: { bg: 'bg-purple-900/30', text: 'text-purple-200', dot: 'bg-purple-400' },
  'Community Impact': { bg: 'bg-green-900/30', text: 'text-green-200', dot: 'bg-green-400' },
  Innovation: { bg: 'bg-orange-900/30', text: 'text-orange-200', dot: 'bg-orange-400' },
  'Academic Achievement': { bg: 'bg-yellow-900/30', text: 'text-yellow-200', dot: 'bg-yellow-400' },
  'Volunteer of the Year': { bg: 'bg-rose-900/30', text: 'text-rose-200', dot: 'bg-rose-400' },
};

interface MobileAwardCardProps {
  award: Award;
  isDark: boolean;
  onEdit: (award: Award) => void;
  onDelete: (award: Award) => void;
  onView: (award: Award) => void;
}

export const MobileAwardCard: React.FC<MobileAwardCardProps> = ({
  award,
  isDark,
  onEdit,
  onDelete,
  onView,
}) => {
  const palette = isDark
    ? (CATEGORY_COLORS_DARK[award.category] ?? { bg: 'bg-gray-800', text: 'text-gray-400', dot: 'bg-gray-500' })
    : (CATEGORY_COLORS[award.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' });

  return (
    <div
      onClick={() => onView(award)}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ease-out cursor-pointer select-none hover:-translate-y-0.5 active:scale-[0.99] ${
        isDark
          ? 'bg-gray-900 border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-black/30'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
      }`}
    >
      {/* Card top accent strip */}
      <div className={`h-1 w-full ${palette.dot}`} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'
            }`}
          >
            <FiAward
              className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold text-sm leading-tight truncate ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {award.title}
            </h3>
            <p
              className={`text-xs mt-0.5 truncate ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {award.recipient}
            </p>
          </div>
          {/* Year badge */}
          <span
            className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-gray-300'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            {award.year}
          </span>
        </div>

        {/* Category badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${palette.bg} ${palette.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${palette.dot}`} />
            {award.category}
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          {award.description}
        </p>

        {/* Actions */}
        <div
          className={`flex items-center gap-2 pt-3 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-100'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(award)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isDark
                ? 'text-gray-400 hover:text-primary hover:bg-primary/10 border border-gray-800 hover:border-primary/30'
                : 'text-gray-600 hover:text-primary hover:bg-primary/5 border border-gray-100 hover:border-primary/20'
            }`}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(award)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isDark
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10 border border-gray-800 hover:border-red-400/30'
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50 border border-gray-100 hover:border-red-200'
            }`}
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
