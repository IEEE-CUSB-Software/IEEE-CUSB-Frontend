import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { PageWrapper } from '@/shared/components/generic';

/**
 * Dashboard Page
 */
export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <h1>Dashboard</h1>
      <p>This is a protected dashboard page.</p>
      <div>
        <button onClick={() => navigate(ROUTES.PROFILE)}>Go to Profile</button>
      </div>
    </PageWrapper>
  );
};
