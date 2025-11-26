import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

/**
 * Not Found Page (404)
 */
export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME}>Go back to Home</Link>
    </div>
  );
};
