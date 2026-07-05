import { useTheme } from '@/shared/hooks/useTheme';
import VacanciesTab from './VacanciesTab';

const RecruitmentAdminView = () => {
  const { isDark } = useTheme();
  return (
    <div
      className={`flex h-full flex-col ${isDark ? 'text-white' : 'text-gray-900'}`}
    >
      <div className="flex-1 p-4 overflow-y-auto">
        <VacanciesTab />
      </div>
    </div>
  );
};

export default RecruitmentAdminView;
