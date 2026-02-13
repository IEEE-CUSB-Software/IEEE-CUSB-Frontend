import { useNavigate } from 'react-router-dom';
import { UnderConstructionScreen } from '@ieee-ui/ui';

/**
 * Under Construction Page
 * Displayed for pages that are still being built
 */
export const UnderConstructionPage = () => {
  const navigate = useNavigate();

  return (
    <UnderConstructionScreen
      title="Under Construction"
      message="We're working hard to bring you this feature. Please check back soon!"
      onGoBack={() => navigate(-1)}
    />
  );
};
