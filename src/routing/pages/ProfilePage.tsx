import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { PageWrapper } from '@/shared/components/generic';

/**
 * Profile Page
 */
export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <h1>User Profile</h1>
      <p>Manage your profile settings here.</p>
      <button onClick={() => navigate(ROUTES.DASHBOARD)}>
        Back to Dashboard
      </button>
    </PageWrapper>
  );
};
