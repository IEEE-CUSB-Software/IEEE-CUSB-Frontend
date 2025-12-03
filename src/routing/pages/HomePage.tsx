import { ExampleFeature } from '@/features/example';
import { PageWrapper } from '@/shared/components/generic';

/**
 * Home Page
 */
export const HomePage = () => {
  return (
    <PageWrapper>
      <h1>Home Page</h1>
      <p>Welcome to IEEE CUSB Frontend!</p>
      <ExampleFeature />
    </PageWrapper>
  );
};
