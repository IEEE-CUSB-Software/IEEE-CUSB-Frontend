import React, { useState, useEffect } from 'react';
import { Modal } from '@ieee-ui/ui';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { useTheme } from '@/shared/hooks/useTheme';
import type { Award, AwardCategory } from '../../types/awardTypes';
import IEEETrophy from '../../../../assets/IEEE_Trophy.png';

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

interface AwardDetailModalProps {
  award: Award | null;
  onClose: () => void;
}

const AwardDetailModal: React.FC<AwardDetailModalProps> = ({ award, onClose }) => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (award) {
      const t = setTimeout(() => setVisible(true), 180);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [award]);

  const palette = award
    ? isDark
      ? (CATEGORY_COLORS_DARK[award.category] ?? { bg: 'bg-gray-800', text: 'text-gray-200', dot: 'bg-gray-500' })
      : (CATEGORY_COLORS[award.category] ?? { bg: 'bg-gray-100', text: 'text-gray-900', dot: 'bg-gray-500' })
    : null;

  return (
    <Modal isOpen={!!award} onClose={onClose} size="large" darkMode={isDark}>
      {award && palette && (
        <div
          data-lenis-prevent
          className={`transition-all duration-[350ms] ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Award image */}
          <div
            className={`relative w-full h-52 rounded-2xl overflow-hidden mb-6 flex items-center justify-center ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <img
              src={award.imageUrl || IEEETrophy}
              alt={award.title}
              className="h-full w-full object-contain p-4"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = IEEETrophy;
              }}
            />
            <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${palette.dot}`} />
          </div>

          {/* Category badge */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${palette.bg} ${palette.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${palette.dot}`} />
              {award.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className={`text-xl font-bold mb-4 leading-snug ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {award.title}
          </h2>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-2">
              <FiUser className={`w-4 h-4 shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {award.recipient}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className={`w-4 h-4 shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {award.year}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src={IEEETrophy} alt="IEEE Trophy" className="w-4 h-4 shrink-0 object-contain" />
              <span className={`text-sm font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                IEEE Award
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className={`border-t mb-5 ${isDark ? 'border-gray-800' : 'border-gray-100'}`} />

          {/* Description */}
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {award.description}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default AwardDetailModal;
