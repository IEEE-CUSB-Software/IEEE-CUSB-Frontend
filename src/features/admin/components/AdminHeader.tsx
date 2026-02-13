import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiBell, FiChevronRight, FiMenu, FiLogOut } from 'react-icons/fi';
import { useAppSelector } from '@/shared/store/hooks';
import { useLogout } from '@/shared/queries/auth';
import { useTheme } from '@/shared/hooks/useTheme';
import { HiSun, HiMoon } from 'react-icons/hi';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const { user } = useAppSelector(state => state.auth);
  const { mutate: logout, isPending } = useLogout();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-30 px-4 md:px-6 py-4 backdrop-blur-md border-b transition-all duration-300 ${
        isDark
          ? 'bg-gray-950/80 border-gray-800'
          : 'bg-white/80 border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDark
                ? 'text-gray-400 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <nav
            className={`hidden md:flex items-center text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              // Skip 'admin' since we added it manually
              if (name === 'admin') return null;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={name}>
                  <FiChevronRight
                    className={`w-4 h-4 mx-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
                  />
                  {isLast ? (
                    <span
                      className={`capitalize transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      {name}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="hover:text-primary transition-colors capitalize"
                    >
                      {name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          <button
            className={`relative p-2 rounded-full transition-colors ${
              isDark
                ? 'text-gray-400 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiBell className="w-5 h-5" />
            <span
              className={`absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border ${isDark ? 'border-gray-950' : 'border-white'}`}
            ></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDark
                ? 'text-yellow-400 hover:bg-yellow-400/10'
                : 'text-blue-600 hover:bg-blue-600/10'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <HiSun className="w-5 h-5" />
            ) : (
              <HiMoon className="w-5 h-5" />
            )}
          </button>

          <div
            className={`h-8 w-[1px] mx-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
          ></div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-2 md:gap-3 pl-2 pr-2 md:pr-4 py-1.5 rounded-full transition-all border ${
                isDark
                  ? 'hover:bg-gray-800 border-transparent hover:border-gray-700'
                  : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
              }`}
            >
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p
                  className={`text-sm font-semibold leading-none transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {user?.name || 'Admin User'}
                </p>
                <p
                  className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {user?.role.name || 'Administrator'}
                </p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden z-50 transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <div
                    className={`p-4 border-b transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <p
                      className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      {user?.name}
                    </p>
                    <p
                      className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/"
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        isDark
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <span>Back to Website</span>
                    </Link>
                  </div>
                  <div
                    className={`border-t transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      disabled={isPending}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 transition-colors disabled:opacity-50 ${
                        isDark
                          ? 'text-red-400 hover:bg-red-950/20'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>{isPending ? 'Logging out...' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
