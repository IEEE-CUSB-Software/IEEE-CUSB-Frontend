import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

/**
 * Dashboard Page
 */
export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected dashboard page.</p>
      <div>
        <button onClick={() => navigate(ROUTES.PROFILE)}>Go to Profile</button>
      </div>
    </div>
  );
};
