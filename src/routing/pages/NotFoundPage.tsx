import { useNavigate } from 'react-router-dom';
import { ErrorScreen } from '@ieee-ui/ui';
import { ROUTES } from '@/constants';

/**
 * Not Found Page (404)
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md">
        <ErrorScreen
          title="Page Not Found"
          message="The page you are looking for does not exist."
          actionText="Go back to Home"
          onAction={() => navigate(ROUTES.HOME)}
        />
      </div>
    </div>
  );
};
