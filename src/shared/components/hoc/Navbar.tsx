import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '@/shared/hooks/useTheme';
import logo from '@/assets/logo.png';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { useLogout } from '@/shared/queries/auth';
import { RoleName } from '@/shared/types/auth.types';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { mutate: logout } = useLogout();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium transition-colors ${
      isActive
        ? scrolled
          ? isDark
            ? 'text-blue-400'
            : 'text-primary'
          : 'text-primary'
        : scrolled
          ? isDark
            ? 'text-white/90 hover:text-blue-300'
            : 'text-gray-900/90 hover:text-primary'
          : isDark
            ? 'text-gray-300 hover:text-white'
            : 'text-gray-600 hover:text-primary'
    }`;

  const isAdmin =
    user?.role?.name === RoleName.ADMIN ||
    user?.role?.name === RoleName.SUPER_ADMIN;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1237px] h-[74px] rounded-full flex items-center px-4 lg:px-8 transition-all duration-300
        ${
          scrolled
            ? isDark
              ? 'bg-[#010619]/60 backdrop-blur-2xl border border-white/10 shadow-lg shadow-blue-900/10'
              : 'bg-white/80 backdrop-blur-2xl border border-gray-200 shadow-lg shadow-gray-200/50'
            : isDark
              ? 'bg-gray-900/40 backdrop-blur-md border border-white/10'
              : 'bg-white/50 backdrop-blur-md border border-white/20'
        }`}
    >
      {/* Centered Navigation Group */}
      <div className="flex-1 flex justify-center items-center gap-6 lg:gap-10">
        {/* Left Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/committees" className={linkClass}>
            Committees
          </NavLink>
        </div>

        {/* Logo */}
        <Link to="/" className="shrink-0 mx-2">
          <div
            className={`p-1.5 rounded-full shadow-lg transition-all duration-300 ${
              scrolled
                ? isDark
                  ? 'bg-white/90 shadow-primary/20'
                  : 'bg-primary shadow-primary/20'
                : isDark
                  ? 'bg-white/10 shadow-none'
                  : 'bg-primary/5 shadow-none'
            }`}
          >
            <img
              src={logo}
              alt="IEEE Logo"
              className="h-12 w-12 object-contain hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/workshops" className={linkClass}>
            Workshops
          </NavLink>
          <NavLink to="/join" className={linkClass}>
            Join Us
          </NavLink>
        </div>
      </div>

      {/* Right Action (Avatar / Sign In) */}
      <div className="absolute right-6 lg:right-10 flex items-center">
        <button
          onClick={toggleTheme}
          className={`mr-4 p-2 rounded-full transition-all duration-300 ${
            scrolled
              ? isDark
                ? 'text-white hover:bg-white/10'
                : 'text-gray-900 hover:bg-gray-100'
              : isDark
                ? 'text-gray-300 hover:bg-white/10'
                : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <HiSun className="w-6 h-6 text-yellow-400" />
          ) : (
            <HiMoon className="w-6 h-6 text-blue-600" />
          )}
        </button>

        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 transition-colors ${
                scrolled
                  ? isDark
                    ? 'text-white hover:text-accent'
                    : 'text-gray-900 hover:text-primary'
                  : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-secondary hover:text-secondary/80'
              }`}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <FaUserCircle className="w-10 h-10" />
              )}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border overflow-hidden z-50 transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 text-white'
                      : 'bg-white border-gray-100 text-gray-900'
                  }`}
                >
                  {/* User Info */}
                  <div
                    className={`p-4 border-b transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
                  >
                    <p
                      className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      {user.name}
                    </p>
                    <p
                      className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {user.email}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                        isDark
                          ? 'bg-blue-900/30 text-blue-300'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {user?.role?.name}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                          isDark
                            ? 'text-gray-300 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <MdAdminPanelSettings className="w-5 h-5 text-primary" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        isDark
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FiUser className="w-5 h-5 text-primary" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        isDark
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FiSettings className="w-5 h-5 text-primary" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div
                    className={`border-t transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
                  >
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 transition-colors ${
                        isDark
                          ? 'text-red-400 hover:bg-red-950/20'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
