import { Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '@ieee-ui/ui';
import { Navbar } from '@/shared/components/hoc/Navbar';
import { MobileNavbar } from '@/shared/components/hoc/MobileNavbar';
import { Footer } from './Footer';
import { useEffect, useState } from 'react';

/**
 * Main Layout Component
 * Includes navigation and wraps all pages with Tailwind CSS styling
 */

export const Layout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Slightly longer to show loader on navigation
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300">
      {/* Page Loader - Shows during route transitions */}
      {isLoading && (
        <div className="fixed inset-0 z-999">
          <PageLoader />
        </div>
      )}

      {/* Desktop Navbar - Hidden on mobile */}
      <div className="max-md:hidden">
        <Navbar />
      </div>

      {/* Main Content - Add padding for fixed navbar */}
      <main className="flex-1 w-full pt-32 md:pt-32 px-4 md:px-8 pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      <MobileNavbar />
    </div>
  );
};
