import { PageWrapper } from '@/shared/components/generic';

/**
 * Home Page
 */
export const HomePage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">IEEE CUSB</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to IEEE CUSB Frontend
        </p>
      </div>
    </PageWrapper>
  );
};
