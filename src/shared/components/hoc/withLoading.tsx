import { ComponentType } from 'react';

/**
 * Higher-Order Component example
 * Wraps a component with loading state handling
 *
 * @param Component - The component to wrap
 * @returns Enhanced component with loading UI
 */
export const withLoading = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P & { isLoading: boolean }> => {
  return ({ isLoading, ...props }: P & { isLoading: boolean }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-gray-600">Loading...</div>
        </div>
      );
    }

    return <Component {...(props as P)} />;
  };
};
