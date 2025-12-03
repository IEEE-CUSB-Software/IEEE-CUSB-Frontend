import { Outlet, NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  toggleSidebar,
  selectSidebarOpen,
} from '@/shared/store/slices/uiSlice';

/**
 * Main Layout Component
 * Includes navigation and wraps all pages with Tailwind CSS styling
 */
export const Layout = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-card text-card-foreground p-5 border-r border-border">
          <h3 className="text-xl font-bold mb-4">Navigation</h3>
          <nav className="flex flex-col gap-2">
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.ABOUT}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to={ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to={ROUTES.PROFILE}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to={ROUTES.UI_DEMO}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              🎨 UI Demo
            </NavLink>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {sidebarOpen ? '✕' : '☰'} Menu
            </button>
            <h1 className="text-2xl font-bold">IEEE CUSB</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-background">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-4 text-center">
          <p className="text-muted-foreground">
            © 2025 IEEE CUSB. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
